import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// These checks run after the production build: a working Vite dev route does
// not prove that the independently generated HTML retains tracking safeguards.
const read = (path) => readFileSync(path, 'utf8');
const guard = (html) => html.match(/<!-- Cross the campaign layout boundary[\s\S]*?<script>([\s\S]*?)<\/script>/)?.[1]?.trim();
const sourceGuard = guard(read('index.html'));
assert.ok(sourceGuard, 'Source layout boundary bootstrap is missing');
for (const path of ['dist/index.html', 'dist/lp/chatgpt/index.html', 'dist/privacy-policy/index.html']) {
  const html = read(path);
  assert.equal(guard(html), sourceGuard, `${path} must retain the layout boundary bootstrap`);
}
const landing = read('dist/lp/chatgpt/index.html');
assert.match(landing, /<meta\s+name="robots"\s+content="noindex,nofollow,noarchive"[^>]*>/);
const landingBody = landing.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
assert.ok(landingBody, 'Paid landing must contain useful prerendered content before JavaScript loads');
assert.match(landingBody, /<h1\b[^>]*>Explore your smile options with Dr\. Aguil\.<\/h1>/,
  'Prerendered headline must match the interactive paid landing');
assert.ok(landingBody.includes('Considering porcelain veneers or cosmetic dentistry? Meet Dr. Alexie Aguil in Los Angeles, discuss your goals, and understand your options before deciding on treatment.'),
  'Prerendered core offer must match the interactive paid landing');
assert.ok(landingBody.includes('Ask the team about consultation fees before booking.'),
  'Fee expectations must appear before the appointment request');
assert.ok(landingBody.includes('Submitting a request does not book an appointment.'),
  'Prerendered fallback must not imply an appointment is already booked');
const requestSection = landingBody.match(/<section\b[^>]*>[\s\S]*?<h2\b[^>]*>Request your consultation<\/h2>([\s\S]*?)<\/section>/)?.[1];
assert.ok(requestSection, 'Paid landing must offer a consultation request fallback');
const contactConstants = read('src/constants/contact.ts');
const phoneNumber = contactConstants.match(/PHONE_NUMBER_E164\s*=\s*'([^']+)'/)?.[1];
const phoneDisplay = contactConstants.match(/PHONE_NUMBER_DISPLAY\s*=\s*'([^']+)'/)?.[1];
assert.ok(phoneNumber && phoneDisplay, 'Practice phone constants must be available');
assert.ok(requestSection.includes(`href="tel:${phoneNumber}"`) && requestSection.includes(`Call ${phoneDisplay}`),
  'Request section must provide the actual practice phone without depending on JavaScript');
assert.match(requestSection, /href="\/contact\/"[^>]*>Contact Exquisite Dentistry<\/a>/,
  'Request section must retain a useful contact route');
assert.doesNotMatch(landingBody, /<form\b|<input\b|<button\b[^>]*type="submit"/i,
  'Prerendered fallback must not show an inert consultation form');
assert.doesNotMatch(landingBody, /A thoughtful first step toward the smile you have in mind\./,
  'Retired paid-landing headline must not reappear before JavaScript loads');
const bridge = read('dist/measurement/openai.html');
assert.equal(bridge, read('public/measurement/openai.html'), 'Build must copy the isolated bridge unchanged');
assert.match(bridge, /<meta\s+name="robots"\s+content="noindex,nofollow,noarchive"[^>]*>/);
const sitemap = read('dist/sitemap.xml');
assert.doesNotMatch(sitemap, /\/lp\/chatgpt|\/measurement\//, 'Paid landing and bridge must stay out of the public sitemap');
console.log('Production paid-landing copy, no-JavaScript contact fallback, tracking HTML, layout boundary, bridge copy, and sitemap checks passed.');
