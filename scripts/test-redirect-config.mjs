/**
 * Static validation of the redirect table in vercel.json.
 *
 * Host-scoped exquisiteveneersla.com expectations are hard-coded here
 * (and in scripts/redirect-tests/legacy-veneers-host-map.json) so a regen
 * from a mutated builder cannot update both sides of the assertion.
 */
import { readFile } from 'node:fs/promises';
import { getTransformedRoutes } from '@vercel/routing-utils';

const EXPECTED_HOST = String.raw`(?:www\.)?exquisiteveneersla\.com`;
const EXPECTED_ORIGIN = 'https://exquisitedentistryla.com';
const EXPECTED_CATCH_ALL = '/(.*)';
const EXPECTED_CATCH_ALL_SRC = '^(?:/(.*))$';
const EXPECTED_INDEX_HTML = '/(.*)/index.html';
const EXPECTED_STATUS = 301;
const NAV_TEST = '/nav-test-page-2/';

const isHostScoped = (rule) =>
  Array.isArray(rule?.has) && rule.has.some((condition) => condition?.type === 'host');

const expectedDestFor = (sourcePath) => {
  if (sourcePath === NAV_TEST || sourcePath === '/') return `${EXPECTED_ORIGIN}/veneers/`;
  return `${EXPECTED_ORIGIN}/veneers${sourcePath}`;
};

const cfg = JSON.parse(await readFile('vercel.json', 'utf8'));
const appSource = await readFile('src/App.tsx', 'utf8');
const blogIndex = JSON.parse(await readFile('src/data/blogIndex.json', 'utf8'));
const veneersManifest = JSON.parse(await readFile('src/constants/legacyVeneersManifest.json', 'utf8'));
const hostFixture = JSON.parse(await readFile('scripts/redirect-tests/legacy-veneers-host-map.json', 'utf8'));

const routes = new Set(
  (appSource.match(/path="[^"]*"/g) ?? []).map((s) => s.slice(6, -1).replace(/\/$/, '')),
);
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
  if (destination.includes('$')) {
    return destination.startsWith(`${EXPECTED_ORIGIN}/veneers/`) && destination.endsWith('/');
  }
  let parsed;
  try {
    parsed = new URL(destination);
  } catch {
    return false;
  }
  if (parsed.origin !== EXPECTED_ORIGIN) return false;
  if (!parsed.pathname.startsWith('/veneers')) return false;
  if (!parsed.pathname.endsWith('/')) return false;
  const d = norm(parsed.pathname);
  return d === '/' || routes.has(d) || blogSlugs.has(d) || routes.has(`${d}/`);
};

if (cfg.trailingSlash !== true) {
  fail('trailingSlash must be true so Vercel 308s no-slash paths before host 301s');
}

if (hostScoped.length === 0) {
  fail('missing host-scoped exquisiteveneersla.com redirects');
} else {
  const prefix = redirects.slice(0, hostScoped.length);
  if (prefix.some((rule) => !isHostScoped(rule)) || redirects.slice(hostScoped.length).some(isHostScoped)) {
    fail('host-scoped redirects must be a contiguous prefix at the top of redirects');
  }
  if (hostScoped.at(-1)?.source !== EXPECTED_CATCH_ALL) {
    fail(`host-scoped catch-all ${EXPECTED_CATCH_ALL} must be the last host-scoped rule`);
  }
}

if (hostFixture.host !== EXPECTED_HOST) {
  fail(`fixture host must be ${EXPECTED_HOST} (www included)`);
}
if (hostFixture.statusCode !== EXPECTED_STATUS) {
  fail(`fixture statusCode must be ${EXPECTED_STATUS}, got ${hostFixture.statusCode}`);
}
if (hostFixture.catchAll !== EXPECTED_CATCH_ALL) {
  fail(`fixture catch-all must be ${EXPECTED_CATCH_ALL}`);
}
if (hostFixture.canonicalOrigin !== EXPECTED_ORIGIN) {
  fail(`fixture canonicalOrigin must be ${EXPECTED_ORIGIN}`);
}
if (hostFixture.trailingSlash !== true) {
  fail('fixture must record trailingSlash: true');
}

const requiredSources = new Map();
for (const page of veneersManifest.pages) {
  const sourcePath = page.sourcePath.endsWith('/') || page.sourcePath === '/' ? page.sourcePath : `${page.sourcePath}/`;
  requiredSources.set(sourcePath, expectedDestFor(sourcePath));
}
requiredSources.set('/nav-test-page-2/index.html', `${EXPECTED_ORIGIN}/veneers/`);
requiredSources.set('/index.html', `${EXPECTED_ORIGIN}/veneers/`);
requiredSources.set(EXPECTED_INDEX_HTML, `${EXPECTED_ORIGIN}/veneers/$1/`);
requiredSources.set(EXPECTED_CATCH_ALL, `${EXPECTED_ORIGIN}/veneers/`);

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

const pinned = {
  '/': `${EXPECTED_ORIGIN}/veneers/`,
  '/about/': `${EXPECTED_ORIGIN}/veneers/about/`,
  '/blog/': `${EXPECTED_ORIGIN}/veneers/blog/`,
  '/contact/': `${EXPECTED_ORIGIN}/veneers/contact/`,
  [NAV_TEST]: `${EXPECTED_ORIGIN}/veneers/`,
  [EXPECTED_CATCH_ALL]: `${EXPECTED_ORIGIN}/veneers/`,
};
for (const [source, destination] of Object.entries(pinned)) {
  if (hostFixture.mappings?.[source] !== destination) {
    fail(`pinned fixture ${source} must be ${destination}`);
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
  if (rule.statusCode !== EXPECTED_STATUS) {
    fail(`host-scoped ${source} must use statusCode ${EXPECTED_STATUS}, got ${rule.statusCode}`);
  }
  if (rule.permanent === true) {
    fail(`host-scoped ${source} must not set permanent: true`);
  }
  if (hostValue(rule) !== EXPECTED_HOST) {
    fail(`host-scoped ${source} host is ${hostValue(rule)} (expected ${EXPECTED_HOST})`);
  }
  if (!destination.endsWith('/')) {
    fail(`host-scoped destination must end with /: ${source} -> ${destination}`);
  }
  if (!destination.startsWith(`${EXPECTED_ORIGIN}/veneers`)) {
    fail(`host-scoped destination must stay on ${EXPECTED_ORIGIN}/veneers: ${source} -> ${destination}`);
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

const { routes: compiled, error: compileError } = getTransformedRoutes(cfg);
if (compileError) {
  fail(`vercel.json failed to compile: ${JSON.stringify(compileError)}`);
} else {
  const compiledCatch = (compiled ?? []).filter(
    (rule) => rule.src === EXPECTED_CATCH_ALL_SRC && rule.has?.some((h) => h.type === 'host'),
  );
  if (compiledCatch.length !== 1) {
    fail(`compiled host catch-all must be exactly one ${EXPECTED_CATCH_ALL_SRC} rule, got ${compiledCatch.length}`);
  } else if (compiledCatch[0].has[0].value !== EXPECTED_HOST) {
    fail(`compiled catch-all host must be ${EXPECTED_HOST}`);
  } else if (compiledCatch[0].status !== EXPECTED_STATUS) {
    fail(`compiled catch-all status must be ${EXPECTED_STATUS}`);
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
