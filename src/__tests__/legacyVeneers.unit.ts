import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  LEGACY_VENEERS_PAGES,
  getLegacyVeneersDocumentUrl,
  getLegacyVeneersPath,
  isLegacyVeneersPath,
} from '../constants/legacyVeneers';
import { generateSitemapData, generateXmlSitemap } from '../utils/sitemapGenerator';

const origin = 'https://exquisitedentistryla.com';

test('client route inventory matches the archive manifest generated from the source', () => {
  const publicManifest = JSON.parse(readFileSync(new URL('../../public/veneers/manifest.json', import.meta.url), 'utf8'));
  assert.deepEqual(LEGACY_VENEERS_PAGES, publicManifest.pages);
  for (const page of LEGACY_VENEERS_PAGES.filter((page) => page.indexable)) {
    assert.ok(page.lastModified && Number.isFinite(Date.parse(page.lastModified)), page.path);
  }
});

test('archived routes use full documents with canonical trailing slashes', () => {
  for (const page of LEGACY_VENEERS_PAGES) {
    assert.equal(getLegacyVeneersPath(page.path), page.path);
    assert.equal(getLegacyVeneersPath(page.path.replace(/\/$/, '')), page.path);
    assert.equal(getLegacyVeneersPath(`${page.path}index.html`), page.path);
  }
  assert.equal(getLegacyVeneersDocumentUrl(new URL('/veneers?utm_source=example#consultation', origin), origin), '/veneers/?utm_source=example#consultation');
  assert.equal(getLegacyVeneersDocumentUrl(new URL('/veneers/process/', 'https://other.example'), origin), null);
});

test('modern veneers treatment guides keep their existing React routes', () => {
  for (const path of [
    '/veneers/front-teeth-veneers-los-angeles/',
    '/veneers/2-front-teeth-veneers-cost-los-angeles/',
    '/veneers/1-tooth-veneer-los-angeles/',
    '/veneers/cost-los-angeles/',
    '/veneers/not-a-real-page/',
    '/services/',
  ]) assert.equal(isLegacyVeneersPath(path), false, path);
});

test('sitemap includes each indexable archive route once with the source modification date', () => {
  const urls = generateSitemapData();
  const xml = generateXmlSitemap();
  for (const page of LEGACY_VENEERS_PAGES) {
    const matches = urls.filter((url) => url.loc === `${origin}${page.path}`);
    assert.equal(matches.length, page.indexable ? 1 : 0, page.path);
    if (page.indexable) assert.equal(matches[0].lastmod, page.lastModified?.split('T')[0]);
  }
  assert.ok(xml.includes('<loc>https://exquisitedentistryla.com/veneers/</loc>'));
  assert.ok(!xml.includes('/veneers/nav-test-page-2/'));
  assert.ok(!xml.includes('<lastmod>undefined</lastmod>'));
  assert.ok(urls.some((url) => url.loc === `${origin}/veneers/cost-los-angeles/`));
});
