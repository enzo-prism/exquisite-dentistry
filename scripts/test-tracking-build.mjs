import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// These checks run after the production build: a working Vite dev route does
// not prove that the independently generated HTML retains tracking safeguards.
const read = (path) => readFileSync(path, 'utf8');
const guard = (html) => html.match(/<!-- Cross the campaign privacy boundary[\s\S]*?<script>([\s\S]*?)<\/script>/)?.[1]?.trim();
const sourceGuard = guard(read('index.html'));
assert.ok(sourceGuard, 'Source privacy boundary bootstrap is missing');
for (const path of ['dist/index.html', 'dist/lp/chatgpt/index.html', 'dist/privacy-policy/index.html']) {
  const html = read(path);
  assert.equal(guard(html), sourceGuard, `${path} must retain the privacy boundary bootstrap`);
}
const landing = read('dist/lp/chatgpt/index.html');
assert.match(landing, /<meta\s+name="robots"\s+content="noindex,nofollow,noarchive"[^>]*>/);
const bridge = read('dist/measurement/openai.html');
assert.equal(bridge, read('public/measurement/openai.html'), 'Build must copy the isolated bridge unchanged');
assert.match(bridge, /<meta\s+name="robots"\s+content="noindex,nofollow,noarchive"[^>]*>/);
const sitemap = read('dist/sitemap.xml');
assert.doesNotMatch(sitemap, /\/lp\/chatgpt|\/measurement\//, 'Paid landing and bridge must stay out of the public sitemap');
console.log('Production tracking HTML, privacy boundary, bridge copy, and sitemap checks passed.');
