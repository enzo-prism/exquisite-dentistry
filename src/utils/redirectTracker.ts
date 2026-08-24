import { trackLegacyRedirectEvent } from '@/utils/vercelAnalytics';

const getSearchEngineSource = (referrer: string) => {
  if (referrer.includes('google.com')) return 'google';
  if (referrer.includes('bing.com')) return 'bing';
  if (referrer.includes('yahoo.com')) return 'yahoo';
  return 'other_search';
};

export function trackLegacyRedirect(fromUrl?: string) {
  if (typeof window !== 'undefined') {
    const referrer = fromUrl || document.referrer;

    if (fromUrl) {
      trackLegacyRedirectEvent({
        source: 'legacy_route',
        hasHash: Boolean(window.location.hash),
      });
      return;
    }

    // Referrer values are reduced to a fixed source before entering analytics.
    if (referrer && (referrer.includes('google.com') || referrer.includes('bing.com') || referrer.includes('yahoo.com'))) {
      trackLegacyRedirectEvent({
        source: getSearchEngineSource(referrer),
        hasHash: Boolean(window.location.hash),
      });
    }
  }
}
