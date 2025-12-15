#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawn } from 'node:child_process';
import http from 'node:http';

const CANONICAL_BASE = 'https://exquisitedentistryla.com';
const DIST_DIR = path.resolve(process.cwd(), 'dist');

const TARGET_PAGES = [
  { name: 'Home', route: '/' },
  { name: 'Dental Implants', route: '/dental-implants/' },
  { name: 'Porcelain Veneers', route: '/veneers/' },
  { name: 'Beverly Hills Dentist', route: '/beverly-hills-dentist/' },
  { name: 'Schedule Consultation', route: '/schedule-consultation/', expectH1: 'Schedule Consultation' },
  { name: 'Smile Gallery', route: '/smile-gallery/' }
];

const exitWith = (code, lines) => {
  lines.forEach((line) => console.error(line));
  process.exit(code);
};

const stripHtml = (value) =>
  value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const distHtmlPathForRoute = (route) => {
  if (route === '/') return path.join(DIST_DIR, 'index.html');
  const normalized = route.replace(/^\/|\/$/g, '');
  return path.join(DIST_DIR, normalized, 'index.html');
};

const extractFirst = (pattern, html, label) => {
  const match = pattern.exec(html);
  if (!match) return null;
  return (match[1] ?? match[0]).trim();
};

const extractTitle = (html) => {
  const raw = extractFirst(/<title[^>]*>([\s\S]*?)<\/title>/i, html);
  return raw ? stripHtml(raw) : null;
};

const extractMetaDescription = (html) => {
  const match = /<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i.exec(html);
  return match?.[1]?.trim() ?? null;
};

const extractCanonical = (html) => {
  const match = /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i.exec(html);
  return match?.[1]?.trim() ?? null;
};

const extractH1 = (html) => {
  const raw = extractFirst(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i, html);
  return raw ? stripHtml(raw) : null;
};

const hasNoindex = (html) =>
  /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*\bnoindex\b[^"']*["'][^>]*>/i.test(html);

const extractJsonLdBlocks = (html) => {
  const blocks = [];
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html))) {
    blocks.push(match[1].trim());
  }
  return blocks;
};

const flattenJsonLdGraph = (value) => {
  if (!value || typeof value !== 'object') return [];
  if (Array.isArray(value)) return value.flatMap(flattenJsonLdGraph);

  const graph = value['@graph'];
  if (Array.isArray(graph)) return graph;
  return [value];
};

const getTypes = (node) => {
  const types = node?.['@type'];
  if (!types) return [];
  if (Array.isArray(types)) return types.filter((type) => typeof type === 'string');
  if (typeof types === 'string') return [types];
  return [];
};

const assertEqual = (name, actual, expected, errors) => {
  if (actual !== expected) {
    errors.push(`❌ ${name}: expected "${expected}", got "${actual ?? 'null'}"`);
  }
};

const assertTruthy = (name, value, errors) => {
  if (!value || (typeof value === 'string' && value.trim().length === 0)) {
    errors.push(`❌ ${name}: missing or empty`);
  }
};

const assertUnique = (label, valuesByPage, errors) => {
  const map = new Map();
  valuesByPage.forEach(({ page, value }) => {
    if (!value) return;
    const key = value.toLowerCase().trim();
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(page);
  });

  for (const [value, pages] of map.entries()) {
    if (pages.length > 1) {
      errors.push(`❌ ${label} is duplicated across: ${pages.join(', ')} (${value})`);
    }
  }
};

const expectedCanonicalForRoute = (route) => (route === '/' ? `${CANONICAL_BASE}/` : `${CANONICAL_BASE}${route}`);

const validateDistHtml = async () => {
  const errors = [];
  const warnings = [];

  if (!existsSync(DIST_DIR)) {
    errors.push('❌ dist/ not found. Run `npm run build` first.');
    return { errors, warnings, pages: [] };
  }

  const pages = [];

  for (const page of TARGET_PAGES) {
    const filePath = distHtmlPathForRoute(page.route);
    if (!existsSync(filePath)) {
      errors.push(`❌ Missing prerendered HTML: ${filePath} (route ${page.route})`);
      continue;
    }

    const html = await readFile(filePath, 'utf8');
    const title = extractTitle(html);
    const description = extractMetaDescription(html);
    const canonical = extractCanonical(html);
    const h1 = extractH1(html);

    pages.push({ ...page, filePath, html, title, description, canonical, h1 });

    if (hasNoindex(html)) {
      errors.push(`❌ ${page.route}: page is marked noindex`);
    }

    assertTruthy(`${page.route}: <title>`, title, errors);
    assertTruthy(`${page.route}: meta description`, description, errors);
    assertTruthy(`${page.route}: H1`, h1, errors);

    if (page.expectH1) {
      assertEqual(`${page.route}: H1`, h1, page.expectH1, errors);
    }

    const expectedCanonical = expectedCanonicalForRoute(page.route);
    assertEqual(`${page.route}: canonical`, canonical, expectedCanonical, errors);

    if (canonical && canonical.includes('www.')) {
      errors.push(`❌ ${page.route}: canonical must be non-www (${canonical})`);
    }
    if (canonical && !canonical.startsWith(CANONICAL_BASE)) {
      errors.push(`❌ ${page.route}: canonical must use ${CANONICAL_BASE} (${canonical})`);
    }

    const jsonLdBlocks = extractJsonLdBlocks(html);
    if (!jsonLdBlocks.length) {
      errors.push(`❌ ${page.route}: missing JSON-LD`);
      continue;
    }

    const schemaNodes = [];
    for (const block of jsonLdBlocks) {
      try {
        const parsed = JSON.parse(block);
        schemaNodes.push(...flattenJsonLdGraph(parsed));
      } catch (error) {
        errors.push(`❌ ${page.route}: JSON-LD parse error (${error.message})`);
      }
    }

    const types = new Set(schemaNodes.flatMap(getTypes));
    const forbiddenTypes = ['SearchAction', 'AggregateRating', 'Review'];
    forbiddenTypes.forEach((forbidden) => {
      if (types.has(forbidden)) {
        errors.push(`❌ ${page.route}: forbidden schema type detected (${forbidden})`);
      }
    });

    if (page.route === '/') {
      if (!types.has('WebSite')) {
        errors.push('❌ /: missing WebSite schema on homepage');
      }
      if (!types.has('Dentist') && !types.has('LocalBusiness') && !types.has('MedicalBusiness')) {
        errors.push('❌ /: missing Dentist/LocalBusiness schema on homepage');
      }
    } else {
      if (!types.has('BreadcrumbList')) {
        errors.push(`❌ ${page.route}: missing BreadcrumbList schema`);
      }
    }
  }

  assertUnique(
    'Title',
    pages.map((page) => ({ page: page.route, value: page.title })),
    errors
  );
  assertUnique(
    'Meta description',
    pages.map((page) => ({ page: page.route, value: page.description })),
    errors
  );
  assertUnique(
    'H1',
    pages.map((page) => ({ page: page.route, value: page.h1 })),
    errors
  );

  return { errors, warnings, pages };
};

const httpRequest = (url, { headers = {} } = {}) =>
  new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = http.request(
      {
        method: 'GET',
        hostname: parsed.hostname,
        port: parsed.port,
        path: `${parsed.pathname}${parsed.search}`,
        headers
      },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          resolve({
            status: res.statusCode ?? 0,
            headers: res.headers,
            body: Buffer.concat(chunks).toString('utf8')
          });
        });
      }
    );
    req.on('error', reject);
    req.end();
  });

const waitForServer = async (baseUrl, timeoutMs = 30_000) => {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await httpRequest(baseUrl);
      if (response.status) return;
    } catch {
      // ignore
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Timed out waiting for server at ${baseUrl}`);
};

const expectRedirect = async ({ baseUrl, path, headers, expectedLocationEndsWith, expectedStatus = 301, errors, name }) => {
  const response = await httpRequest(`${baseUrl}${path}`, { headers });
  const location = response.headers.location ?? '';

  if (response.status !== expectedStatus) {
    errors.push(`❌ Redirect test "${name}" expected ${expectedStatus}, got ${response.status}`);
    return;
  }
  if (!location) {
    errors.push(`❌ Redirect test "${name}" missing Location header`);
    return;
  }
  if (!location.endsWith(expectedLocationEndsWith)) {
    errors.push(`❌ Redirect test "${name}" expected Location ending with "${expectedLocationEndsWith}", got "${location}"`);
  }
};

const expectStatus = async ({ baseUrl, path, expectedStatus, errors, name }) => {
  const response = await httpRequest(`${baseUrl}${path}`);
  if (response.status !== expectedStatus) {
    errors.push(`❌ Status test "${name}" expected ${expectedStatus}, got ${response.status}`);
  }
};

const validateRedirects = async () => {
  const errors = [];
  const port = Number(process.env.SEO_TEST_PORT || 8899);
  const baseUrl = `http://localhost:${port}`;

  const child = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['netlify', 'dev', '-d', 'dist', '--framework', '#static', '--port', String(port), '--no-open', '--offline'],
    {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'pipe']
    }
  );

  const output = [];
  child.stdout.on('data', (chunk) => output.push(chunk.toString('utf8')));
  child.stderr.on('data', (chunk) => output.push(chunk.toString('utf8')));

  try {
    await waitForServer(baseUrl);

    await expectRedirect({
      baseUrl,
      path: '/robots.txt',
      headers: { Host: 'www.exquisitedentistryla.com' },
      expectedLocationEndsWith: 'https://exquisitedentistryla.com/robots.txt',
      errors,
      name: 'www → non-www (robots.txt)'
    });

    await expectRedirect({
      baseUrl,
      path: '/robots.txt',
      headers: { Host: 'exquisitedentistryla.com' },
      expectedLocationEndsWith: 'https://exquisitedentistryla.com/robots.txt',
      errors,
      name: 'http → https (robots.txt)'
    });

    await expectRedirect({
      baseUrl,
      path: '/dental-implants',
      expectedLocationEndsWith: '/dental-implants/',
      errors,
      name: 'trailing slash enforcement'
    });

    await expectRedirect({
      baseUrl,
      path: '/veneers-los-angeles/',
      expectedLocationEndsWith: '/veneers/',
      errors,
      name: '/veneers-los-angeles/ → /veneers/'
    });

    await expectStatus({
      baseUrl,
      path: '/schedule-consultation/',
      expectedStatus: 200,
      errors,
      name: '/schedule-consultation/ is 200'
    });

    await expectStatus({
      baseUrl,
      path: '/definitely-not-a-real-page/',
      expectedStatus: 404,
      errors,
      name: 'unknown URL is 404'
    });
  } catch (error) {
    errors.push(`❌ Redirect tests failed: ${error.message}`);
    output.slice(-10).forEach((line) => errors.push(`   ${line.trimEnd()}`));
  } finally {
    child.kill('SIGTERM');
  }

  return { errors };
};

const main = async () => {
  const dist = await validateDistHtml();
  const redirects = await validateRedirects();

  const errors = [...dist.errors, ...redirects.errors];
  const warnings = [...dist.warnings];

  if (warnings.length) {
    console.warn('\nWarnings:');
    warnings.forEach((line) => console.warn(`- ${line}`));
  }

  if (errors.length) {
    console.error('\nSEO acceptance checks failed:\n');
    errors.forEach((line) => console.error(line));
    process.exit(1);
  }

  console.log('✅ SEO acceptance checks passed (canonicals, metadata, JSON-LD, redirects).');
};

await main();

