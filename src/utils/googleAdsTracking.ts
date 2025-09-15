// Google Ads Conversion Tracking Utility
// Based on the conversion snippet provided by Google Ads

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    gtagSendEvent: (url?: string) => boolean;
  }
}

/**
 * Helper function to delay opening a URL until a gtag event is sent.
 * Call it in response to an action that should navigate to a URL.
 * Based on Google Ads conversion tracking snippet.
 */
export function gtagSendEvent(url?: string, target?: string): boolean {
  // Ensure gtag is available
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics gtag not available, redirecting immediately');
    if (url) {
      navigateToUrl(url, target);
    }
    return false;
  }

  const callback = function () {
    if (typeof url === 'string') {
      navigateToUrl(url, target);
    }
  };

  try {
    // Send the conversion event
    window.gtag('event', 'ads_conversion_Submit_lead_form_1', {
      'event_callback': callback,
      'event_timeout': 2000,
      // Add additional parameters for better tracking
      'value': 1.0,
      'currency': 'USD',
      'custom_parameters': {
        'conversion_type': 'consultation_booking',
        'source_page': window.location.pathname,
        'timestamp': new Date().toISOString()
      }
    });

    console.log('Google Ads conversion event sent: ads_conversion_Submit_lead_form_1');
    return true;
  } catch (error) {
    console.error('Error sending Google Ads conversion event:', error);
    // Fallback: redirect immediately if tracking fails
    if (url) {
      navigateToUrl(url, target);
    }
    return false;
  }
}

/**
 * Helper function to navigate to URL with proper target handling
 */
function navigateToUrl(url: string, target?: string): void {
  try {
    if (target === '_blank') {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        console.warn('Popup blocked, falling back to same tab navigation');
        window.location.href = url;
      }
    } else {
      window.location.href = url;
    }
  } catch (error) {
    console.error('Error navigating to URL:', error);
    // Final fallback
    window.location.href = url;
  }
}

/**
 * Track phone number clicks as potential conversions
 */
export function trackPhoneClick(phoneNumber: string): void {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics gtag not available for phone tracking');
    return;
  }

  try {
    window.gtag('event', 'phone_click', {
      'event_category': 'engagement',
      'event_label': phoneNumber,
      'custom_parameters': {
        'conversion_type': 'phone_contact',
        'source_page': window.location.pathname,
        'timestamp': new Date().toISOString()
      }
    });

    console.log('Phone click tracked:', phoneNumber);
  } catch (error) {
    console.error('Error tracking phone click:', error);
  }
}

/**
 * Track form submissions as conversions
 */
export function trackFormSubmission(formType: string): void {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics gtag not available for form tracking');
    return;
  }

  try {
    window.gtag('event', 'form_submission', {
      'event_category': 'engagement',
      'event_label': formType,
      'custom_parameters': {
        'conversion_type': 'form_submission',
        'form_type': formType,
        'source_page': window.location.pathname,
        'timestamp': new Date().toISOString()
      }
    });

    console.log('Form submission tracked:', formType);
  } catch (error) {
    console.error('Error tracking form submission:', error);
  }
}

/**
 * Initialize Google Ads conversion tracking
 * This adds the gtagSendEvent function to the global window object
 */
export function initializeGoogleAdsTracking(): void {
  // Make gtagSendEvent available globally
  window.gtagSendEvent = gtagSendEvent;
  
  console.log('Google Ads conversion tracking initialized');
}