// Google Ads Conversion Tracking Utility
// Based on the conversion snippet provided by Google Ads

/**
 * Helper function to delay opening a URL until a gtag event is sent.
 * Call it in response to an action that should navigate to a URL.
 * Based on Google Ads conversion tracking snippet.
 */
export function gtagSendEvent(url?: string, target?: string): boolean {
  if (typeof window === 'undefined') {
    if (url) {
      console.warn('Window is not available; cannot delay navigation for conversion tracking.');
    }
    return false;
  }

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
  if (typeof window === 'undefined') {
    return;
  }

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
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics gtag not available for phone tracking');
    return;
  }

  try {
    // Enhanced phone click tracking with more detailed attribution
    window.gtag('event', 'phone_click', {
      'event_category': 'engagement',
      'event_label': phoneNumber,
      'value': 1,
      'custom_parameters': {
        'conversion_type': 'phone_contact',
        'source_page': window.location.pathname,
        'timestamp': new Date().toISOString(),
        'user_agent': typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 100) : 'unknown',
        'referrer': typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct'
      }
    });

    // Also track as potential Google Ads conversion
    window.gtag('event', 'conversion', {
      'send_to': 'AW-11373090310/phone_click',
      'value': 1.0,
      'currency': 'USD'
    });

    console.log('Phone click tracked:', phoneNumber);
  } catch (error) {
    console.error('Error tracking phone click:', error);
  }
}

/**
 * Track SMS clicks separately
 */
export function trackSMSClick(phoneNumber: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics gtag not available for SMS tracking');
    return;
  }

  try {
    window.gtag('event', 'sms_click', {
      'event_category': 'engagement',
      'event_label': phoneNumber,
      'custom_parameters': {
        'conversion_type': 'sms_contact',
        'source_page': window.location.pathname,
        'timestamp': new Date().toISOString()
      }
    });

    console.log('SMS click tracked:', phoneNumber);
  } catch (error) {
    console.error('Error tracking SMS click:', error);
  }
}

/**
 * Track form submissions as conversions
 */
export function trackFormSubmission(formType: string, additionalData?: Record<string, unknown>): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics gtag not available for form tracking');
    return;
  }

  try {
    // Enhanced form submission tracking
    window.gtag('event', 'form_submission', {
      'event_category': 'engagement',
      'event_label': formType,
      'value': 1,
      'custom_parameters': {
        'conversion_type': 'form_submission',
        'form_type': formType,
        'source_page': window.location.pathname,
        'timestamp': new Date().toISOString(),
        'user_agent': typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 100) : 'unknown',
        'referrer': typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
        ...additionalData
      }
    });

    // Also track as Google Ads conversion
    window.gtag('event', 'conversion', {
      'send_to': 'AW-11373090310/form_submission',
      'value': 1.0,
      'currency': 'USD'
    });

    console.log('Form submission tracked:', formType, additionalData);
  } catch (error) {
    console.error('Error tracking form submission:', error);
  }
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(ctaType: string, ctaText: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics gtag not available for CTA tracking');
    return;
  }

  try {
    window.gtag('event', 'cta_click', {
      'event_category': 'engagement',
      'event_label': `${ctaType}: ${ctaText}`,
      'custom_parameters': {
        'conversion_type': 'cta_interaction',
        'cta_type': ctaType,
        'cta_text': ctaText,
        'source_page': window.location.pathname,
        'timestamp': new Date().toISOString()
      }
    });

    console.log('CTA click tracked:', ctaType, ctaText);
  } catch (error) {
    console.error('Error tracking CTA click:', error);
  }
}

/**
 * Track service page views with enhanced attribution
 */
export function trackServicePageView(serviceName: string): void {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics gtag not available for service tracking');
    return;
  }

  try {
    window.gtag('event', 'service_page_view', {
      'event_category': 'page_view',
      'event_label': serviceName,
      'custom_parameters': {
        'service_name': serviceName,
        'source_page': window.location.pathname,
        'timestamp': new Date().toISOString()
      }
    });

    console.log('Service page view tracked:', serviceName);
  } catch (error) {
    console.error('Error tracking service page view:', error);
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
