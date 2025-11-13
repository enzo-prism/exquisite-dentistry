import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const BASE_URL = process.env.REDIRECT_TEST_BASE ?? 'http://localhost:8888';
const LEGACY_FILE = path.resolve('scripts/redirect-tests/legacy-urls.txt');
const MAP_FILE = path.resolve('scripts/redirect-tests/canonical-map.json');

const legacyRows = (await readFile(LEGACY_FILE, 'utf8'))
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.length > 0 && !line.startsWith('#'));

const canonicalMap = JSON.parse(await readFile(MAP_FILE, 'utf8'));

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

  const url = legacyPath.startsWith('/') ? `${BASE_URL}${legacyPath}` : `${BASE_URL}/${legacyPath}`;
  let response;
  try {
    response = await fetch(url, fetchOptions);
  } catch (error) {
    console.error(`❌ ${legacyPath} → request failed (${error.message})`);
    failed += 1;
    continue;
  }

  if (expected === '__200__') {
    if (response.status === 200) {
      console.log(`✅ ${legacyPath} resolved with status 200 as expected`);
      passed += 1;
    } else {
      console.error(`❌ ${legacyPath} responded with ${response.status}, expected 200`);
      failed += 1;
    }
    continue;
  }

  const location = response.headers.get('location');
  if (response.status < 300 || response.status >= 400 || !location) {
    console.error(`❌ ${legacyPath} responded with ${response.status} (location: ${location ?? 'n/a'}), expected redirect to ${expected}`);
    failed += 1;
    continue;
  }

  if (location !== expected) {
    console.error(`❌ ${legacyPath} → ${location}, expected ${expected}`);
    failed += 1;
  } else {
    console.log(`✅ ${legacyPath} → ${location}`);
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
