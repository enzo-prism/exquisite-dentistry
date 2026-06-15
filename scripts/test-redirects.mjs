import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const BASE_URL = process.env.REDIRECT_TEST_BASE ?? 'http://127.0.0.1:8899';
const LEGACY_FILE = path.resolve('scripts/redirect-tests/legacy-urls.txt');
const MAP_FILE = path.resolve('scripts/redirect-tests/canonical-map.json');

const legacyRows = (await readFile(LEGACY_FILE, 'utf8'))
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.length > 0 && !line.startsWith('#'));

const canonicalMap = JSON.parse(await readFile(MAP_FILE, 'utf8'));
const MAX_REDIRECTS = 5;

let passed = 0;
let failed = 0;
let missing = 0;

const fetchOptions = { redirect: 'manual' };

console.log(`🔎 Testing ${legacyRows.length} legacy URLs against ${BASE_URL}`);

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

console.log('\nSummary');
console.log(`   ✅ Passed: ${passed}`);
console.log(`   ❌ Failed: ${failed}`);
console.log(`   ⚠️  Missing expectations: ${missing}`);

if (failed > 0 || missing > 0) {
  process.exitCode = 1;
}
