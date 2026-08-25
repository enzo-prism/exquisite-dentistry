export const CANONICAL_ANALYTICS_HOSTS = [
  'exquisitedentistryla.com',
  'www.exquisitedentistryla.com',
] as const;

export const ANALYTICS_TEST_HOST_OVERRIDE_KEY = '__EXQUISITE_ANALYTICS_TEST_HOST__';

type CanonicalAnalyticsHost = (typeof CANONICAL_ANALYTICS_HOSTS)[number];

const normalizeHostname = (hostname: string) => hostname.trim().toLowerCase().replace(/\.$/, '');

const isListedCanonicalHost = (hostname: string): hostname is CanonicalAnalyticsHost => (
  CANONICAL_ANALYTICS_HOSTS.includes(hostname as CanonicalAnalyticsHost)
);

const readTestHostOverride = () => {
  if (typeof window === 'undefined') return '';

  const override = window[ANALYTICS_TEST_HOST_OVERRIDE_KEY];
  return typeof override === 'string' ? normalizeHostname(override) : '';
};

export const getAnalyticsHostname = (
  hostname = typeof window === 'undefined' ? '' : window.location.hostname,
) => {
  const actual = normalizeHostname(hostname);
  const override = readTestHostOverride();

  // Playwright can impersonate a host on 127.0.0.1. Production hosts ignore it
  // so a preview or live page cannot opt into a different property via JS.
  if (override && !isListedCanonicalHost(actual)) return override;

  return actual;
};

export const isCanonicalAnalyticsHost = (hostname?: string) => {
  const resolved = hostname === undefined
    ? getAnalyticsHostname()
    : normalizeHostname(hostname);

  return isListedCanonicalHost(resolved);
};
