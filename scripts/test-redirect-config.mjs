/**
 * Static validation of the redirect table in vercel.json.
 *
 * Runs without a server so it can gate every PR. Complements
 * `npm run test:redirects`, which exercises real HTTP against `vercel dev`
 * (or scripts/serve-vercel-redirects.mjs, which honors `has` host rules).
 *
 * Why this exists: the legacy Netlify `public/_redirects` file is INERT on
 * Vercel, and it contains broad wildcards (/*hills*, /*hollywood*,
 * /*-veneers*, /*-whitening*) that would swallow live routes such as
 * /beverly-hills-dentist/ and /zoom-whitening/ if anyone "fixed" the drift by
 * porting that file wholesale. Rule 4 below makes that mistake fail loudly.
 *
 * Host-scoped exquisiteveneersla.com rules are validated separately: they
 * intentionally reuse live main-site paths (/about/, /blog/, /contact/) and
 * an absolute destination, so they must not run through rules 1–5.
 */
import { readFile } from 'node:fs/promises';
import {
  CANONICAL_ORIGIN,
  LEGACY_VENEERS_CATCH_ALL,
  LEGACY_VENEERS_HOST,
  destinationForLegacyVeneersPath,
  isHostScoped,
  withTrailingSlash,
} from './legacy-veneers-host-redirects.mjs';

const cfg = JSON.parse(await readFile('vercel.json', 'utf8'));
const appSource = await readFile('src/App.tsx', 'utf8');
const blogIndex = JSON.parse(await readFile('src/data/blogIndex.json', 'utf8'));
const veneersManifest = JSON.parse(await readFile('src/constants/legacyVeneersManifest.json', 'utf8'));
const hostFixture = JSON.parse(await readFile('scripts/redirect-tests/legacy-veneers-host-map.json', 'utf8'));

const routes = new Set(
  (appSource.match(/path="[^"]*"/g) ?? []).map((s) => s.slice(6, -1).replace(/\/$/, '')),
);
// Static archive routes are generated from the manifest rather than JSX paths.
for (const page of veneersManifest.pages) routes.add(page.path.replace(/\/$/, ''));
const blogSlugs = new Set(
  (Array.isArray(blogIndex) ? blogIndex : blogIndex.posts).map((p) => `/blog/${p.slug}`),
);

const redirects = cfg.redirects ?? [];
const hostScoped = redirects.filter(isHostScoped);
const pathScoped = redirects.filter((rule) => !isHostScoped(rule));
const sources = new Set(pathScoped.map((r) => r.source.replace(/\/$/, '')));
const norm = (p) => p.replace(/\/$/, '') || '/';

let failures = 0;
const fail = (msg) => {
  console.error(`❌ ${msg}`);
  failures += 1;
};

const hostValue = (rule) => rule.has?.find((condition) => condition?.type === 'host')?.value;

const isLiveVeneersDestination = (destination) => {
  let parsed;
  try {
    parsed = new URL(destination);
  } catch {
    return false;
  }
  if (parsed.origin !== CANONICAL_ORIGIN) return false;
  if (!parsed.pathname.startsWith('/veneers')) return false;
  const d = norm(parsed.pathname);
  return d === '/' || routes.has(d) || blogSlugs.has(d) || routes.has(`${d}/`);
};

// Host-scoped block must sit at the top so the retired domain is classified
// before any path-only rule, and the catch-all must be last in that block.
if (hostScoped.length === 0) {
  fail('missing host-scoped exquisiteveneersla.com redirects');
} else {
  const prefix = redirects.slice(0, hostScoped.length);
  if (prefix.some((rule) => !isHostScoped(rule)) || redirects.slice(hostScoped.length).some(isHostScoped)) {
    fail('host-scoped redirects must be a contiguous prefix at the top of redirects');
  }
  if (hostScoped.at(-1)?.source !== LEGACY_VENEERS_CATCH_ALL) {
    fail(`host-scoped catch-all ${LEGACY_VENEERS_CATCH_ALL} must be the last host-scoped rule`);
  }
}

if (hostFixture.host !== LEGACY_VENEERS_HOST) {
  fail(`fixture host ${hostFixture.host} does not match ${LEGACY_VENEERS_HOST}`);
}
if (hostFixture.statusCode !== 301) {
  fail(`fixture statusCode must be 301, got ${hostFixture.statusCode}`);
}
if (hostFixture.catchAll !== LEGACY_VENEERS_CATCH_ALL) {
  fail(`fixture catch-all must be ${LEGACY_VENEERS_CATCH_ALL}`);
}

const requiredSources = new Map();
for (const page of veneersManifest.pages) {
  const sourcePath = withTrailingSlash(page.sourcePath);
  const destination = destinationForLegacyVeneersPath(sourcePath);
  requiredSources.set(sourcePath, destination);
  if (sourcePath !== '/') requiredSources.set(sourcePath.slice(0, -1), destination);
}
requiredSources.set(LEGACY_VENEERS_CATCH_ALL, `${CANONICAL_ORIGIN}/veneers/`);

for (const [source, destination] of requiredSources) {
  if (hostFixture.mappings?.[source] !== destination) {
    fail(`fixture mapping mismatch for ${source}: ${hostFixture.mappings?.[source]} (expected ${destination})`);
  }
}
for (const source of Object.keys(hostFixture.mappings ?? {})) {
  if (!requiredSources.has(source)) {
    fail(`fixture has unexpected mapping: ${source}`);
  }
}

const hostRulesBySource = new Map(hostScoped.map((rule) => [rule.source, rule]));
for (const [source, destination] of Object.entries(hostFixture.mappings ?? {})) {
  const rule = hostRulesBySource.get(source);
  if (!rule) {
    fail(`no host-scoped vercel.json rule for ${source}`);
    continue;
  }
  if (rule.destination !== destination) {
    fail(`host-scoped target mismatch for ${source}: ${rule.destination} (expected ${destination})`);
  }
  if (rule.statusCode !== 301) {
    fail(`host-scoped ${source} must use statusCode 301, got ${rule.statusCode}`);
  }
  if (rule.permanent === true) {
    fail(`host-scoped ${source} must not set permanent: true`);
  }
  if (hostValue(rule) !== LEGACY_VENEERS_HOST) {
    fail(`host-scoped ${source} host is ${hostValue(rule)} (expected ${LEGACY_VENEERS_HOST})`);
  }
  if (!isLiveVeneersDestination(rule.destination)) {
    fail(`host-scoped destination is not a live /veneers route: ${source} -> ${rule.destination}`);
  }
}

for (const rule of hostScoped) {
  if (!(rule.source in (hostFixture.mappings ?? {}))) {
    fail(`unexpected host-scoped rule: ${rule.source} -> ${rule.destination}`);
  }
}

// 1. Every path-scoped destination must resolve to a real route, blog post, or the root.
for (const { source, destination } of pathScoped) {
  const d = norm(destination);
  const ok = d === '/' || routes.has(d) || blogSlugs.has(d) || routes.has(`${d}/`);
  if (!ok) fail(`destination does not resolve: ${source} -> ${destination}`);
}

// 2. No redirect chains — a path-scoped destination must never itself be a path-scoped source.
for (const { source, destination } of pathScoped) {
  if (sources.has(norm(destination))) {
    fail(`redirect chain: ${source} -> ${destination} (destination is also a source)`);
  }
}

// 3. No duplicate sources (first match wins, so a dupe is dead config).
const seen = new Set();
for (const { source } of pathScoped) {
  if (seen.has(source)) fail(`duplicate source: ${source}`);
  seen.add(source);
}
const seenHost = new Set();
for (const { source } of hostScoped) {
  if (seenHost.has(source)) fail(`duplicate host-scoped source: ${source}`);
  seenHost.add(source);
}

// 4. No path-scoped wildcard that would capture a live route.
for (const { source } of pathScoped) {
  if (!/[*]/.test(source)) continue;
  const re = new RegExp(`^${source.replace(/\*/g, '.*')}$`);
  const collisions = [...routes].filter((r) => re.test(r) || re.test(`${r}/`));
  if (collisions.length) {
    fail(`wildcard "${source}" would capture live route(s): ${collisions.join(', ')}`);
  }
}

// 5. A path-scoped redirect source must not also be a live route or a published post.
//    Otherwise the sitemap and prerenderer advertise a URL that immediately
//    301s away — wasted crawl budget and a contradictory signal. Retiring a
//    post means unpublishing it (published: false, or UNPUBLISHED_SLUGS for
//    Blog-Content posts) as well as adding the redirect.
for (const { source, destination } of pathScoped) {
  const s = norm(source);
  if (routes.has(s) || routes.has(`${s}/`)) {
    fail(`redirect source is still a live route: ${source} -> ${destination}`);
  } else if (blogSlugs.has(s)) {
    fail(
      `redirect source is still a published post: ${source} -> ${destination}` +
        ` (unpublish the post so it leaves the sitemap and prerender)`,
    );
  }
}

// 6. Every legacy URL under test must have a rule with the expected target.
const map = JSON.parse(await readFile('scripts/redirect-tests/canonical-map.json', 'utf8'));
const bySource = new Map(pathScoped.map((r) => [r.source, r.destination]));
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
console.log(
  `✅ Redirect config valid — ${hostScoped.length} host-scoped + ${pathScoped.length} path-scoped rules` +
    `, ${Object.keys(hostFixture.mappings).length} veneers-host mappings, ${Object.keys(map).length} legacy URLs mapped.`,
);
