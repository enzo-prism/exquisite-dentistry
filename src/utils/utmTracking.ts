/**
 * UTM Parameter Management for Google Business Profile and Marketing Attribution
 */

// UTM Parameter constants for different traffic sources
export const UTM_PARAMETERS = {
  googleBusinessProfile: {
    utm_source: 'google',
    utm_medium: 'organic',
    utm_campaign: 'gbp'
  },
  socialMedia: {
    instagram: {
      utm_source: 'instagram',
      utm_medium: 'social',
      utm_campaign: 'profile_link'
    },
    facebook: {
      utm_source: 'facebook', 
      utm_medium: 'social',
      utm_campaign: 'profile_link'
    },
    youtube: {
      utm_source: 'youtube',
      utm_medium: 'social', 
      utm_campaign: 'profile_link'
    }
  },
  email: {
    utm_source: 'email',
    utm_medium: 'email',
    utm_campaign: 'signature'
  },
  referral: {
    utm_source: 'referral',
    utm_medium: 'referral',
    utm_campaign: 'patient_referral'
  }
} as const;

/**
 * Generate URL with UTM parameters
 */
export function generateUTMUrl(baseUrl: string, utmParams: Record<string, string>): string {
  const url = new URL(baseUrl);
  
  Object.entries(utmParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  
  return url.toString();
}

/**
 * Get current UTM parameters from URL
 */
export function getCurrentUTMParameters(): Record<string, string> {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      utmParams[param] = value;
    }
  });
  
  return utmParams;
}

/**
 * Track UTM parameters in Google Analytics
 */
export function trackUTMParameters(): void {
  const utmParams = getCurrentUTMParameters();
  
  if (Object.keys(utmParams).length > 0 && typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'utm_attribution', {
        event_category: 'traffic_source',
        custom_parameters: {
          ...utmParams,
          landing_page: window.location.pathname,
          timestamp: new Date().toISOString()
        }
      });
      
      console.log('UTM parameters tracked:', utmParams);
    } catch (error) {
      console.error('Error tracking UTM parameters:', error);
    }
  }
}

/**
 * Generate Google Business Profile URL with UTM parameters
 */
export function getGBPUrl(baseUrl: string = window.location.origin): string {
  return generateUTMUrl(baseUrl, UTM_PARAMETERS.googleBusinessProfile);
}

/**
 * Generate social media URLs with UTM parameters
 */
export function getSocialMediaUrls(baseUrl: string = window.location.origin) {
  return {
    instagram: generateUTMUrl(baseUrl, UTM_PARAMETERS.socialMedia.instagram),
    facebook: generateUTMUrl(baseUrl, UTM_PARAMETERS.socialMedia.facebook),
    youtube: generateUTMUrl(baseUrl, UTM_PARAMETERS.socialMedia.youtube)
  };
}

/**
 * Initialize UTM tracking on page load
 */
export function initializeUTMTracking(): void {
  // Track UTM parameters if present
  trackUTMParameters();
  
  // Store UTM parameters in session storage for cross-page attribution
  const utmParams = getCurrentUTMParameters();
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('utm_attribution', JSON.stringify(utmParams));
  }
}

/**
 * Get stored UTM attribution from session
 */
export function getStoredUTMAttribution(): Record<string, string> | null {
  try {
    const stored = sessionStorage.getItem('utm_attribution');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error retrieving stored UTM attribution:', error);
    return null;
  }
}