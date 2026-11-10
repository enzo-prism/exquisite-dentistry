import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isLegacyVeneersPath } from '../constants/legacyVeneers';
import { ROUTE_METADATA } from '../constants/metadata';
import {
  VENEER_GUIDE_PAGE_LIST,
  getVeneerGuidePage,
  type VeneerGuideId,
} from '../data/veneerGuidePages';
import { generateSitemapData } from '../utils/sitemapGenerator';
import { toMeta } from '../utils/seoText';
import { consultationHref } from '../data/consultation';

const origin = 'https://exquisitedentistryla.com';
const bookingHref = consultationHref('porcelain-veneers');

const flattenGuideText = (id: VeneerGuideId): string => {
  const guide = getVeneerGuidePage(id);
  return [
    guide.h1,
    guide.subtitle,
    ...guide.introParagraphs,
    ...guide.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
      ...(section.tips ?? []),
      ...(section.cards ?? []).flatMap((card) => [card.title, card.body]),
      ...(section.steps ?? []).flatMap((step) => [step.title, step.description]),
    ]),
    ...guide.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' ');
};

test('new veneer guides are unique cluster pages, not archive documents', () => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const h1s = new Set<string>();

  for (const guide of VENEER_GUIDE_PAGE_LIST) {
    assert.equal(isLegacyVeneersPath(`${guide.path}/`), false, guide.path);
    assert.ok(ROUTE_METADATA[guide.path], `metadata for ${guide.path}`);
    assert.equal(ROUTE_METADATA[guide.path].title, guide.title);
    assert.equal(ROUTE_METADATA[guide.path].description, guide.description);
    assert.equal(toMeta(guide.description), guide.description, `meta stays untruncated: ${guide.path}`);
    assert.ok(!titles.has(guide.title), `duplicate title: ${guide.title}`);
    assert.ok(!descriptions.has(guide.description), `duplicate description: ${guide.description}`);
    assert.ok(!h1s.has(guide.h1), `duplicate h1: ${guide.h1}`);
    titles.add(guide.title);
    descriptions.add(guide.description);
    h1s.add(guide.h1);

    const text = flattenGuideText(guide.id);
    const words = text.trim().split(/\s+/).filter(Boolean);
    assert.ok(words.length >= 300, `${guide.path} has ${words.length} words`);
    assert.match(text, /Dr\. Alexie Aguil/);
    assert.doesNotMatch(text, /Dr\. Michael Churchill/);
    assert.doesNotMatch(text, /\$\d/);
    assert.doesNotMatch(text.toLowerCase(), /0% apr|world-class|premier|finest/);
    assert.doesNotMatch(text.toLowerCase(), /\bguaranteed?\b/);

    const hrefs = guide.sections.flatMap((section) => section.links ?? []).map((link) => link.href);
    assert.ok(hrefs.includes('/veneers/'), `${guide.path} links to /veneers/`);
    assert.ok(hrefs.includes(bookingHref), `${guide.path} links to the booking CTA`);
  }
});

test('sitemap lists each new veneer guide once', () => {
  const urls = generateSitemapData();
  for (const guide of VENEER_GUIDE_PAGE_LIST) {
    const matches = urls.filter((url) => url.loc === `${origin}${guide.path}/`);
    assert.equal(matches.length, 1, guide.path);
  }
});
