/**
 * Static validation of the redirect table in vercel.json.
 *
 * Runs without a server so it can gate every PR. Complements
 * `npm run test:redirects`, which exercises real HTTP against `vercel dev`.
 *
 * Why this exists: the legacy Netlify `public/_redirects` file is INERT on
 * Vercel, and it contains broad wildcards (/*hills*, /*hollywood*,
 * /*-veneers*, /*-whitening*) that would swallow live routes such as
 * /beverly-hills-dentist/ and /zoom-whitening/ if anyone "fixed" the drift by
 * porting that file wholesale. Rule 4 below makes that mistake fail loudly.
 */
import { readFile } from 'node:fs/promises';

const cfg = JSON.parse(await readFile('vercel.json', 'utf8'));
const appSource = await readFile('src/App.tsx', 'utf8');
const blogIndex = JSON.parse(await readFile('src/data/blogIndex.json', 'utf8'));

const routes = new Set(
  (appSource.match(/path="[^"]*"/g) ?? []).map((s) => s.slice(6, -1).replace(/\/$/, '')),
);
const blogSlugs = new Set(
  (Array.isArray(blogIndex) ? blogIndex : blogIndex.posts).map((p) => `/blog/${p.slug}`),
);

const redirects = cfg.redirects ?? [];
const sources = new Set(redirects.map((r) => r.source.replace(/\/$/, '')));
const norm = (p) => p.replace(/\/$/, '') || '/';

let failures = 0;
const fail = (msg) => {
  console.error(`❌ ${msg}`);
  failures += 1;
};

// 1. Every destination must resolve to a real route, blog post, or the root.
for (const { source, destination } of redirects) {
  const d = norm(destination);
  const ok = d === '/' || routes.has(d) || blogSlugs.has(d) || routes.has(`${d}/`);
  if (!ok) fail(`destination does not resolve: ${source} -> ${destination}`);
}

// 2. No redirect chains — a destination must never itself be a source.
for (const { source, destination } of redirects) {
  if (sources.has(norm(destination))) {
    fail(`redirect chain: ${source} -> ${destination} (destination is also a source)`);
  }
}

// 3. No duplicate sources (first match wins, so a dupe is dead config).
const seen = new Set();
for (const { source } of redirects) {
  if (seen.has(source)) fail(`duplicate source: ${source}`);
  seen.add(source);
}

// 4. No wildcard that would capture a live route.
for (const { source } of redirects) {
  if (!/[*]/.test(source)) continue;
  const re = new RegExp(`^${source.replace(/\*/g, '.*')}$`);
  const collisions = [...routes].filter((r) => re.test(r) || re.test(`${r}/`));
  if (collisions.length) {
    fail(`wildcard "${source}" would capture live route(s): ${collisions.join(', ')}`);
  }
}

// 5. Every legacy URL under test must have a rule with the expected target.
const map = JSON.parse(await readFile('scripts/redirect-tests/canonical-map.json', 'utf8'));
const bySource = new Map(redirects.map((r) => [r.source, r.destination]));
for (const [legacy, expected] of Object.entries(map)) {
  const actual = bySource.get(legacy) ?? bySource.get(legacy.replace(/\/$/, ''));
  // Paths without an extension are also reachable via Vercel's trailingSlash
  // normalisation, so only flag a genuinely absent rule.
  if (!actual) {
    if (legacy.endsWith('.html')) fail(`no vercel.json rule for legacy URL: ${legacy}`);
    continue;
  }
  if (norm(actual) !== norm(expected)) {
    fail(`target mismatch for ${legacy}: vercel.json says ${actual}, expected ${expected}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} redirect config problem(s).`);
  process.exit(1);
}
console.log(`✅ Redirect config valid — ${redirects.length} rules, ${Object.keys(map).length} legacy URLs mapped.`);
