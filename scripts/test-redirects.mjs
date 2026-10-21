import { readFile } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';

const BASE_URL = process.env.REDIRECT_TEST_BASE ?? 'http://127.0.0.1:8899';
const LEGACY_FILE = path.resolve('scripts/redirect-tests/legacy-urls.txt');
const MAP_FILE = path.resolve('scripts/redirect-tests/canonical-map.json');
const HOST_FIXTURE_FILE = path.resolve('scripts/redirect-tests/legacy-veneers-host-map.json');

const legacyRows = (await readFile(LEGACY_FILE, 'utf8'))
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.length > 0 && !line.startsWith('#'));

const canonicalMap = JSON.parse(await readFile(MAP_FILE, 'utf8'));
const hostFixture = JSON.parse(await readFile(HOST_FIXTURE_FILE, 'utf8'));
const MAX_REDIRECTS = 5;
const VENEERS_HOSTS = ['exquisiteveneersla.com', 'www.exquisiteveneersla.com'];
const CANONICAL = 'https://exquisitedentistryla.com';

let passed = 0;
let failed = 0;
let missing = 0;

const fetchOptions = { redirect: 'manual' };

const request = (host, requestPath) => {
  const base = new URL(BASE_URL);
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: base.hostname,
        port: base.port,
        path: requestPath,
        method: 'HEAD',
        headers: { Host: host },
      },
      (res) => {
        res.resume();
        resolve({ status: res.statusCode, location: res.headers.location ?? null });
      },
    );
    req.on('error', reject);
    req.end();
  });
};

const assertHop = (label, actual, expectedStatus, expectedLocation) => {
  const loc = actual.location ?? '';
  if (actual.status === expectedStatus && loc === expectedLocation) {
    console.log(`✅ ${label} → ${actual.status} ${expectedLocation}`);
    passed += 1;
    return;
  }
  console.error(
    `❌ ${label} → ${actual.status} ${loc || '(no location)'}, expected ${expectedStatus} ${expectedLocation}`,
  );
  failed += 1;
};

console.log(`🔎 Testing ${legacyRows.length} main-site legacy URLs against ${BASE_URL}`);

for (const legacyPath of legacyRows) {
  const expected = canonicalMap[legacyPath];

  if (!expected) {
    console.warn(`⚠️  ${legacyPath} has no expected mapping in canonical-map.json`);
    missing += 1;
    continue;
  }

  let currentUrl = new URL(
    legacyPath.startsWith('/') ? legacyPath : `/${legacyPath}`,
    BASE_URL,
  ).href;
  const hops = [];
  let response;

  for (let depth = 0; depth <= MAX_REDIRECTS; depth += 1) {
    try {
      response = await fetch(currentUrl, fetchOptions);
    } catch (error) {
      console.error(`❌ ${legacyPath} → request failed (${error.message})`);
      failed += 1;
      response = undefined;
      break;
    }

    const location = response.headers.get('location');
    if (response.status >= 300 && response.status < 400 && location) {
      currentUrl = new URL(location, currentUrl).href;
      hops.push(new URL(currentUrl).pathname);
      continue;
    }

    break;
  }

  if (!response) continue;

  const finalPath = new URL(currentUrl).pathname;

  if (expected === '__200__') {
    if (response.status === 200 && hops.length === 0) {
      console.log(`✅ ${legacyPath} resolved with status 200 as expected`);
      passed += 1;
    } else {
      console.error(`❌ ${legacyPath} resolved as ${finalPath} with status ${response.status}, expected direct 200`);
      failed += 1;
    }
    continue;
  }

  if (hops.length === 0) {
    console.error(`❌ ${legacyPath} responded with ${response.status}, expected redirect to ${expected}`);
    failed += 1;
    continue;
  }

  if (finalPath !== expected) {
    console.error(`❌ ${legacyPath} → ${hops.join(' → ')}, expected ${expected}`);
    failed += 1;
  } else {
    const chain = hops.length > 1 ? hops.join(' → ') : finalPath;
    console.log(`✅ ${legacyPath} → ${chain}`);
    passed += 1;
  }
}

console.log(`\n🔎 Testing host-scoped exquisiteveneersla.com mappings`);

const listedSlash = Object.entries(hostFixture.mappings).filter(
  ([source]) => source !== '/(.*)' && !source.includes('index.html') && !source.includes('('),
);

for (const host of VENEERS_HOSTS) {
  for (const [source, destination] of listedSlash) {
    assertHop(`${host} ${source}`, await request(host, source), 301, destination);
    if (source !== '/') {
      const noSlash = source.slice(0, -1);
      assertHop(`${host} ${noSlash}`, await request(host, noSlash), 308, source);
    }
    if (source !== '/') {
      const withIndex = `${source}index.html`;
      const indexDest =
        source === '/nav-test-page-2/' ? `${CANONICAL}/veneers/` : `${CANONICAL}/veneers${source}`;
      assertHop(`${host} ${withIndex}`, await request(host, withIndex), 301, indexDest);
    }
  }

  assertHop(`${host} /index.html`, await request(host, '/index.html'), 301, `${CANONICAL}/veneers/`);

  const unlistedSlash = [
    '/feed/',
    '/comments/feed/',
    '/tag/veneers/',
    '/wp-admin/',
    '/wp-json/',
    '/page/2/',
    '/blog/page/3/',
    '/category/x/page/2/',
    '/some-unknown-post/',
    '/ABOUT/',
  ];
  for (const source of unlistedSlash) {
    assertHop(`${host} ${source}`, await request(host, source), 301, `${CANONICAL}/veneers/`);
  }

  const wpAndFiles = ['/xmlrpc.php', '/robots.txt', '/sitemap.xml'];
  for (const source of wpAndFiles) {
    assertHop(`${host} ${source}`, await request(host, source), 301, `${CANONICAL}/veneers/`);
  }

  assertHop(`${host} /wp-content/x`, await request(host, '/wp-content/x'), 308, '/wp-content/x/');
  assertHop(`${host} /wp-json/wp/v2/posts`, await request(host, '/wp-json/wp/v2/posts'), 308, '/wp-json/wp/v2/posts/');
  assertHop(`${host} /feed`, await request(host, '/feed'), 308, '/feed/');

  assertHop(
    `${host} /about/?utm_source=fb&x=1`,
    await request(host, '/about/?utm_source=fb&x=1'),
    301,
    `${CANONICAL}/veneers/about/?utm_source=fb&x=1`,
  );
  assertHop(`${host} /about?utm_source=fb`, await request(host, '/about?utm_source=fb'), 308, '/about/?utm_source=fb');
}

console.log('\nSummary');
console.log(`   ✅ Passed: ${passed}`);
console.log(`   ❌ Failed: ${failed}`);
console.log(`   ⚠️  Missing expectations: ${missing}`);

if (failed > 0 || missing > 0) {
  process.exitCode = 1;
}
