/** Read-only release proof. Never submits a form or opens a booking. */
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';

const origin = new URL(process.env.VENEERS_VERIFY_ORIGIN || 'https://exquisitedentistryla.com').origin;
const canonicalOrigin = 'https://exquisitedentistryla.com';
const manifest = JSON.parse(await fs.readFile('public/veneers/manifest.json', 'utf8'));
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const get = async (pathname, options = {}) => fetch(new URL(pathname, origin), {
  signal: AbortSignal.timeout(30_000),
  headers: { 'Cache-Control': 'no-cache' },
  ...options,
});
const files = new Map();
for (const page of manifest.pages) {
  files.set(page.path, { ...page, document: true });
}
for (const file of [...manifest.assets, ...manifest.integrationFiles]) {
  const existing = files.get(file.path);
  if (existing) assert.equal(existing.sha256, file.sha256, `Consistent duplicate asset: ${file.path}`);
  files.set(file.path, file);
}

// Six concurrent read-only requests keep the full asset proof bounded.
const pending = [...files.entries()];
let checked = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (pending.length) {
    const [pathname, expected] = pending.shift();
    const response = await get(pathname);
    assert.equal(response.status, 200, `Published file returns 200: ${pathname}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.equal(digest(bytes), expected.sha256, `Published bytes match release: ${pathname}`);
    const type = response.headers.get('content-type') || '';
    if (expected.document) {
      assert.match(type, /text\/html/, `HTML MIME: ${pathname}`);
      const markup = bytes.toString();
      assert.ok(markup.includes(`href="${canonicalOrigin}${pathname}"`), `Canonical: ${pathname}`);
      assert.equal((markup.match(/data-veneers-shell="header"/g) || []).length, 1);
      assert.equal((markup.match(/data-veneers-shell="footer"/g) || []).length, 1);
      assert.ok(!markup.includes('<div id="root">'), `Independent archive document: ${pathname}`);
      if (!expected.indexable) assert.match(markup, /noindex/);
    } else if (pathname.endsWith('.css')) {
      assert.match(type, /text\/css/, `CSS MIME: ${pathname}`);
    } else if (pathname.endsWith('.js')) {
      assert.match(type, /(?:javascript|ecmascript)/, `JavaScript MIME: ${pathname}`);
    }
    checked += 1;
  }
}));

const remoteManifestResponse = await get('/veneers/manifest.json');
assert.equal(remoteManifestResponse.status, 200);
const remoteManifest = await remoteManifestResponse.json();
assert.deepEqual(remoteManifest.pages, manifest.pages, 'Published route manifest matches release');
assert.deepEqual(remoteManifest.integrationFiles, manifest.integrationFiles, 'Published integration hashes match release');

const redirect = await get('/veneers/process?utm_source=release-check', { redirect: 'manual' });
assert.ok([301, 308].includes(redirect.status), 'Directory slash redirect');
assert.equal(new URL(redirect.headers.get('location'), origin).pathname, '/veneers/process/');
assert.equal(new URL(redirect.headers.get('location'), origin).search, '?utm_source=release-check');

for (const pathname of ['/veneers/assets/not-present.css', '/veneers/not-present.html']) {
  assert.equal((await get(pathname)).status, 404, `Missing archive resource: ${pathname}`);
}
const measurement = await get('/veneers/measurement-entry.js');
assert.equal(measurement.status, 200, 'Built modern measurement entry is published');
assert.match(measurement.headers.get('content-type') || '', /(?:javascript|ecmascript)/);

for (const pathname of ['/veneers/cost-los-angeles/', '/veneers/1-tooth-veneer-los-angeles/', '/veneers/front-teeth-veneers-los-angeles/', '/veneers/2-front-teeth-veneers-cost-los-angeles/']) {
  const response = await get(pathname);
  assert.equal(response.status, 200, `Existing main-site guide: ${pathname}`);
  assert.match(await response.text(), /id="root"/, `Guide retains React document: ${pathname}`);
}
const sitemap = await (await get('/sitemap.xml')).text();
const search = await (await get('/search-index.json')).json();
const searchablePaths = new Set(search.items.map(item => item.href));
for (const page of manifest.pages.filter(page => page.indexable)) {
  assert.ok(sitemap.includes(`<loc>${canonicalOrigin}${page.path}</loc>`), `Sitemap: ${page.path}`);
  assert.ok(searchablePaths.has(page.path), `Main-site search: ${page.path}`);
}
console.log(JSON.stringify({
  status: 'passed',
  origin,
  verifiedAt: new Date().toISOString(),
  archiveDocuments: manifest.pages.length,
  originalAssetRecords: manifest.assets.length,
  uniquePublishedFilesVerified: checked,
  indexableArchivePages: manifest.pages.filter(page => page.indexable).length,
  realFormSubmissions: 0,
}, null, 2));
