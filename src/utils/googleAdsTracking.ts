// Google Ads Conversion Tracking Utility
// Based on the conversion snippet provided by Google Ads
import {
  trackContactFormSubmitted,
  trackContactMethodClick,
  trackConsultationIntent,
  trackCtaClick,
  trackVercelEvent,
  normalizeTrackedRoute,
} from '@/utils/vercelAnalytics';

const MAX_EVENT_DIMENSION_LENGTH = 64;
let googleAdsConfigured = false;

const ensureGoogleAdsConfigured = () => {
  if (googleAdsConfigured || typeof window.gtag !== 'function') return;
  window.gtag('config', 'AW-11373090310', { send_page_view: false });
  googleAdsConfigured = true;
};

const normalizeEventDimension = (value: string, fallback: string) => {
  const normalized = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, MAX_EVENT_DIMENSION_LENGTH);

  return normalized || fallback;
};

const getSourcePage = () => normalizeTrackedRoute(window.location.pathname);

const getPersonaBucket = (value: unknown) => {
  if (typeof value !== 'string') return 'unspecified';

  const normalized = value.toLowerCase();
  if (normalized.includes('existing')) return 'existing_patient';
  if (normalized.includes('new patient') || normalized.includes('becoming')) return 'new_patient';
  if (normalized.includes('vendor') || normalized.includes('business')) return 'vendor_business';
  return 'other';
};

/**
 * Helper function to delay opening a URL until a gtag event is sent.
 * Call it in response to an action that should navigate to a URL.
 * Based on Google Ads conversion tracking snippet.
 */
export function gtagSendEvent(url?: string, target?: string, source = 'google_ads_conversion_helper'): boolean {
  if (typeof window === 'undefined') {
    if (url) {
      console.warn('Window is not available; cannot delay navigation for conversion tracking.');
    }
    return false;
  }

  trackConsultationIntent({
    source,
    ctaText: 'Consultation booking',
    destination: url,
  });

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
    ensureGoogleAdsConfigured();
    // Send the conversion event
    window.gtag('event', 'ads_conversion_Submit_lead_form_1', {
      'event_callback': callback,
      'event_timeout': 2000,
      // Add additional parameters for better tracking
      'value': 1.0,
      'currency': 'USD',
      'custom_parameters': {
        'conversion_type': 'consultation_booking',
        'source_page': getSourcePage()
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
export function trackPhoneClick(phoneNumber: string, source = 'phone_link'): void {
  if (typeof window === 'undefined') {
    return;
  }

  const shouldSendAnalytics = trackContactMethodClick({
    method: 'phone',
    source,
    destination: `tel:${phoneNumber}`,
  });

  if (!shouldSendAnalytics) return;

  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics gtag not available for phone tracking');
    return;
  }

  try {
    window.gtag('event', 'phone_contact_click', {
      'event_category': 'engagement',
      'event_label': 'practice_phone',
      'value': 1,
      'custom_parameters': {
        'conversion_type': 'phone_contact',
        'interaction_source': normalizeEventDimension(source, 'phone_link'),
        'source_page': getSourcePage()
      }
    });

    // Also track as potential Google Ads conversion
    ensureGoogleAdsConfigured();
    window.gtag('event', 'conversion', {
      'send_to': 'AW-11373090310/phone_click',
      'value': 1.0,
      'currency': 'USD'
    });

    console.log('Practice phone click tracked');
  } catch (error) {
    console.error('Error tracking phone click:', error);
  }
}

/**
 * Track SMS clicks separately
 */
export function trackSMSClick(phoneNumber: string, source = 'sms_link'): void {
  if (typeof window === 'undefined') {
    return;
  }

  const shouldSendAnalytics = trackContactMethodClick({
    method: 'sms',
    source,
    destination: `sms:${phoneNumber}`,
  });

  if (!shouldSendAnalytics) return;

  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics gtag not available for SMS tracking');
    return;
  }

  try {
    window.gtag('event', 'sms_contact_click', {
      'event_category': 'engagement',
      'event_label': 'practice_sms',
      'custom_parameters': {
        'conversion_type': 'sms_contact',
        'interaction_source': normalizeEventDimension(source, 'sms_link'),
        'source_page': getSourcePage()
      }
    });

    console.log('Practice SMS click tracked');
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

  trackContactFormSubmitted({
    form: formType,
    persona: typeof additionalData?.whichBestDescribesYou === 'string'
      ? additionalData.whichBestDescribesYou
      : undefined,
    hasPhone: Boolean(additionalData?.hasPhone),
  });

  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics gtag not available for form tracking');
    return;
  }

  try {
    const normalizedFormType = normalizeEventDimension(formType, 'contact_form');

    window.gtag('event', 'contact_form_submit', {
      'event_category': 'engagement',
      'event_label': normalizedFormType,
      'value': 1,
      'custom_parameters': {
        'conversion_type': 'form_submission',
        'form_type': normalizedFormType,
        'persona': getPersonaBucket(additionalData?.whichBestDescribesYou),
        'has_phone': Boolean(additionalData?.hasPhone),
        'source_page': getSourcePage()
      }
    });

    // Also track as Google Ads conversion
    ensureGoogleAdsConfigured();
    window.gtag('event', 'conversion', {
      'send_to': 'AW-11373090310/form_submission',
      'value': 1.0,
      'currency': 'USD'
    });

    console.log('Contact form submission tracked:', normalizedFormType);
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

  trackCtaClick({
    source: ctaType,
    ctaText,
  });

  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics gtag not available for CTA tracking');
    return;
  }

  try {
    window.gtag('event', 'cta_click', {
      'event_category': 'engagement',
      'event_label': normalizeEventDimension(ctaType, 'site_cta'),
      'custom_parameters': {
        'conversion_type': 'cta_interaction',
        'cta_type': normalizeEventDimension(ctaType, 'site_cta'),
        'source_page': getSourcePage()
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
  trackVercelEvent('Service Page Viewed', {
    service: serviceName,
  });

  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics gtag not available for service tracking');
    return;
  }

  try {
    window.gtag('event', 'service_page_view', {
      'event_category': 'page_view',
      'event_label': normalizeEventDimension(serviceName, 'service'),
      'custom_parameters': {
        'service_name': normalizeEventDimension(serviceName, 'service'),
        'source_page': getSourcePage()
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
