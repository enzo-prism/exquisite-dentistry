#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const fallbackSeoPage = resolve(process.cwd(), 'dist/index.html');

if (!existsSync(fallbackSeoPage)) {
  console.error('❌  Could not locate dist/index.html for SEO smoke test. Run `npm run build` first.');
  process.exit(1);
}

const html = readFileSync(fallbackSeoPage, 'utf8');

const checks = [
  { name: 'canonical link', pattern: /<link[^>]+rel=["']canonical["'][^>]+>/i },
  { name: 'meta description', pattern: /<meta[^>]+name=["']description["'][^>]+>/i },
  { name: 'Open Graph title', pattern: /<meta[^>]+property=["']og:title["'][^>]+>/i },
  { name: 'Open Graph image', pattern: /<meta[^>]+property=["']og:image["'][^>]+>/i },
  { name: 'Twitter card', pattern: /<meta[^>]+name=["']twitter:card["'][^>]+>/i },
  { name: 'JSON-LD block', pattern: /<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i }
];

const missing = checks.filter(({ pattern }) => !pattern.test(html));

if (missing.length > 0) {
  console.error('❌  SEO smoke check failed. Missing:');
  missing.forEach(({ name }) => console.error(`   - ${name}`));
  process.exit(1);
}

console.log('✅  SEO smoke check passed – canonical, OG, and JSON-LD tags detected in dist/index.html.');
