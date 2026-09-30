import React from 'react';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToString } from 'react-dom/server';
import { renderRoute, manualPages } from '../../scripts/prerender-static';
import TwoFrontVeneersContent from '../components/treatments/TwoFrontVeneersContent';
import { TWO_FRONT_VENEERS, isTwoFrontVeneersPath } from '../data/twoFrontVeneers';
import { buildSeoTitle, toMeta } from '../utils/seoText';

const template = '<html><head><title>Old</title><meta name="description" content="Old"><link rel="canonical" href="https://old.example/"></head><body><div id="root"></div></body></html>';
const route = manualPages.find((route) => route.path === TWO_FRONT_VENEERS.path)!;

test('initial indexed page contains exactly the same complete treatment component as the App route', () => {
  const html = renderRoute(template, route);
  const body = renderToString(<TwoFrontVeneersContent />);
  assert.ok(html.includes(body), 'shared React page is rendered, not a parallel text-only approximation');
  assert.ok(html.includes('data-treatment-pilot="two-front-veneers"'));
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.ok(html.includes('What should a quote for two veneers include?'));
  assert.ok(html.includes('service=porcelain-veneers'));
  assert.ok(html.includes('/smile-gallery/?treatment=veneers'));
  assert.ok(html.includes('Skip to content'));
  assert.ok(html.includes('Privacy choices'));
  assert.ok(!body.includes('$'), 'unapproved treatment figures do not leak into patient content');
});

test('canonical, title, description and FAQs use the same records as client navigation', () => {
  const html = renderRoute(template, route);
  assert.ok(html.includes(`<title data-rh="true">${buildSeoTitle(TWO_FRONT_VENEERS.title)}</title>`));
  assert.ok(html.includes(`content="${toMeta(TWO_FRONT_VENEERS.description)}"`));
  assert.ok(html.includes(`href="https://exquisitedentistryla.com${TWO_FRONT_VENEERS.path}/"`));
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.ok(html.includes('"@type":"FAQPage"'));
  assert.ok(!html.includes('https://old.example'));
});

test('pilot is isolated from campaign, legacy and other service routes', () => {
  assert.ok(isTwoFrontVeneersPath(`${TWO_FRONT_VENEERS.path}/`));
  assert.ok(!isTwoFrontVeneersPath('/lp/chatgpt/'));
  assert.ok(!isTwoFrontVeneersPath('/veneers/cost-los-angeles/'));
  const campaign = manualPages.find((route) => route.path === '/lp/chatgpt')!;
  const html = renderRoute(template, campaign);
  assert.ok(!html.includes('data-treatment-pilot'));
  assert.ok(html.includes('noindex'));
});

test('long client and prerender metadata gets the same complete sentence or ellipsis', () => {
  assert.ok(toMeta('a '.repeat(100)).endsWith('…'));
  assert.equal(toMeta('Hello. ' + 'More words '.repeat(40), 40).length <= 41, true);
  assert.equal(toMeta('<script>alert(1)</script><p>Clear answer.</p>'), 'Clear answer.');
});
