/**
 * Analytics Validation and Debug Utilities
 * Provides comprehensive validation and debugging for GA4 and conversion tracking
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    gtagSendEvent: (url?: string) => boolean;
  }
}

// Debug mode flag - set to true for development
const DEBUG_MODE = process.env.NODE_ENV === 'development';

/**
 * Validation results interface
 */
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  info: string[];
}

/**
 * Validate Google Analytics setup
 */
export function validateGoogleAnalytics(): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    info: []
  };

  // Check if gtag is available
  if (typeof window.gtag !== 'function') {
    result.isValid = false;
    result.errors.push('Google Analytics gtag function not available');
  } else {
    result.info.push('✅ Google Analytics gtag function available');
  }

  // Check if dataLayer exists
  if (!Array.isArray(window.dataLayer)) {
    result.isValid = false;
    result.errors.push('Google Analytics dataLayer not initialized');
  } else {
    result.info.push(`✅ dataLayer initialized with ${window.dataLayer.length} items`);
  }

  // Check if conversion tracking is available
  if (typeof window.gtagSendEvent !== 'function') {
    result.warnings.push('Google Ads conversion tracking function not available');
  } else {
    result.info.push('✅ Google Ads conversion tracking available');
  }

  return result;
}

/**
 * Test event firing to validate tracking
 */
export function testEventFiring(): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      info: []
    };

    if (typeof window.gtag !== 'function') {
      result.isValid = false;
      result.errors.push('Cannot test events - gtag not available');
      resolve(result);
      return;
    }

    try {
      // Test basic event
      window.gtag('event', 'analytics_validation_test', {
        event_category: 'validation',
        event_label: 'test_event',
        custom_parameters: {
          test_timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent.substring(0, 100)
        }
      });

      result.info.push('✅ Test event fired successfully');

      // Test phone click event
      window.gtag('event', 'phone_click', {
        event_category: 'engagement', 
        event_label: 'test_phone_number',
        custom_parameters: {
          conversion_type: 'phone_contact',
          source_page: window.location.pathname,
          timestamp: new Date().toISOString()
        }
      });

      result.info.push('✅ Phone click event test fired');

      // Test form submission event
      window.gtag('event', 'form_submission', {
        event_category: 'engagement',
        event_label: 'validation_test',
        custom_parameters: {
          conversion_type: 'form_submission',
          form_type: 'validation_test',
          source_page: window.location.pathname,
          timestamp: new Date().toISOString()
        }
      });

      result.info.push('✅ Form submission event test fired');

      resolve(result);
    } catch (error) {
      result.isValid = false;
      result.errors.push(`Event firing test failed: ${error}`);
      resolve(result);
    }
  });
}

/**
 * Validate page tracking setup
 */
export function validatePageTracking(): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    info: []
  };

  // Check page title
  if (!document.title || document.title.trim() === '') {
    result.warnings.push('Page title is empty');
  } else {
    result.info.push(`✅ Page title: "${document.title}"`);
  }

  // Check canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    result.warnings.push('No canonical URL found');
  } else {
    result.info.push(`✅ Canonical URL: ${canonical.getAttribute('href')}`);
  }

  // Check meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    result.warnings.push('No meta description found');
  } else {
    const content = metaDescription.getAttribute('content');
    result.info.push(`✅ Meta description (${content?.length} chars): ${content?.substring(0, 50)}...`);
  }

  return result;
}

/**
 * Log validation results
 */
export function logValidationResults(results: ValidationResult, title: string): void {
  if (!DEBUG_MODE && results.errors.length === 0) return;

  console.group(`🔍 Analytics Validation: ${title}`);
  
  if (results.errors.length > 0) {
    console.group('❌ Errors');
    results.errors.forEach(error => console.error(error));
    console.groupEnd();
  }

  if (results.warnings.length > 0) {
    console.group('⚠️ Warnings');
    results.warnings.forEach(warning => console.warn(warning));
    console.groupEnd();
  }

  if (results.info.length > 0 && DEBUG_MODE) {
    console.group('ℹ️ Information');
    results.info.forEach(info => console.log(info));
    console.groupEnd();
  }

  console.groupEnd();
}

/**
 * Run comprehensive analytics validation
 */
export async function runAnalyticsValidation(): Promise<void> {
  console.log('🚀 Starting comprehensive analytics validation...');

  // Validate Google Analytics setup
  const gaResults = validateGoogleAnalytics();
  logValidationResults(gaResults, 'Google Analytics Setup');

  // Validate page tracking
  const pageResults = validatePageTracking();
  logValidationResults(pageResults, 'Page Tracking Setup');

  // Test event firing
  const eventResults = await testEventFiring();
  logValidationResults(eventResults, 'Event Firing Test');

  // Overall summary
  const hasErrors = gaResults.errors.length > 0 || pageResults.errors.length > 0 || eventResults.errors.length > 0;
  const hasWarnings = gaResults.warnings.length > 0 || pageResults.warnings.length > 0 || eventResults.warnings.length > 0;

  if (hasErrors) {
    console.error('❌ Analytics validation completed with errors');
  } else if (hasWarnings) {
    console.warn('⚠️ Analytics validation completed with warnings');
  } else {
    console.log('✅ Analytics validation completed successfully');
  }
}

/**
 * Initialize analytics validation (only in development)
 */
export function initializeAnalyticsValidation(): void {
  if (DEBUG_MODE) {
    // Run validation after page load
    setTimeout(() => {
      runAnalyticsValidation();
    }, 2000);
  }
}