export function trackLegacyRedirect(fromUrl?: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const referrer = fromUrl || document.referrer;
    
    // Only track if coming from Google or other search engines
    if (referrer && (referrer.includes('google.com') || referrer.includes('bing.com') || referrer.includes('yahoo.com'))) {
      window.gtag('event', 'legacy_redirect', {
        'from_url': referrer,
        'to_url': window.location.href,
        'event_category': 'redirect',
        'event_label': 'legacy_url',
        'custom_parameter_1': window.location.hash || 'no_hash'
      });
    }
  }
}

// Check for legacy redirect indicators on page load
export function initializeRedirectTracking() {
  if (typeof window !== 'undefined') {
    // Track if URL has hash (indicating a redirect target)
    if (window.location.hash) {
      trackLegacyRedirect();
    }
    
    // Track specific legacy redirect patterns
    const legacyIndicators = [
      'invisalign',
      'cosmetic-dentist',
      'dentist-west-hollywood',
      'hollywood'
    ];
    
    const currentPath = window.location.pathname + window.location.hash;
    const hasLegacyIndicator = legacyIndicators.some(indicator => 
      currentPath.toLowerCase().includes(indicator)
    );
    
    if (hasLegacyIndicator) {
      trackLegacyRedirect();
    }
  }
}
