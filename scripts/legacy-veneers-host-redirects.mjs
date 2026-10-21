/**
 * Host-scoped 301s for the retired exquisiteveneersla.com site.
 *
 * Generated into vercel.json from src/constants/legacyVeneersManifest.json.
 * Each archived path P on (?:www\.)?exquisiteveneersla\.com maps to
 * https://exquisitedentistryla.com/veneers{P}. The nav-test page is the one
 * exception (it lands on /veneers/). A final /:path* catch-all covers
 * WordPress leftovers such as /wp-content/ and /feed/.
 *
 * Uses statusCode: 301 (not permanent: true, which is a 308) and a `has`
 * host condition so /about/, /blog/, /contact/ on exquisitedentistryla.com
 * stay untouched.
 */
export const LEGACY_VENEERS_HOST = String.raw`(?:www\.)?exquisiteveneersla\.com`;
export const CANONICAL_ORIGIN = 'https://exquisitedentistryla.com';
export const LEGACY_VENEERS_CATCH_ALL = '/:path*';
export const NAV_TEST_SOURCE_PATH = '/nav-test-page-2/';

const hostHas = () => [{ type: 'host', value: LEGACY_VENEERS_HOST }];

export const isHostScoped = (rule) =>
  Array.isArray(rule?.has) && rule.has.some((condition) => condition?.type === 'host');

export const withTrailingSlash = (pathname) => {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
};

export const destinationForLegacyVeneersPath = (sourcePath) => {
  const path = withTrailingSlash(sourcePath);
  if (path === NAV_TEST_SOURCE_PATH) return `${CANONICAL_ORIGIN}/veneers/`;
  return `${CANONICAL_ORIGIN}/veneers${path === '/' ? '/' : path}`;
};

export const buildLegacyVeneersHostRedirects = (pages) => {
  const rules = [];
  const seen = new Set();

  const add = (source, destination) => {
    if (seen.has(source)) return;
    seen.add(source);
    rules.push({
      source,
      has: hostHas(),
      destination,
      statusCode: 301,
    });
  };

  for (const page of pages) {
    const sourcePath = withTrailingSlash(page.sourcePath);
    const destination = destinationForLegacyVeneersPath(sourcePath);
    add(sourcePath, destination);
    if (sourcePath !== '/') add(sourcePath.slice(0, -1), destination);
  }

  add(LEGACY_VENEERS_CATCH_ALL, `${CANONICAL_ORIGIN}/veneers/`);
  return rules;
};

export const buildLegacyVeneersHostFixture = (pages) => {
  const mappings = {};
  for (const rule of buildLegacyVeneersHostRedirects(pages)) {
    mappings[rule.source] = rule.destination;
  }
  return {
    host: LEGACY_VENEERS_HOST,
    statusCode: 301,
    canonicalOrigin: CANONICAL_ORIGIN,
    catchAll: LEGACY_VENEERS_CATCH_ALL,
    mappings,
  };
};
