import { BIRDEYE_WIDGET_SCRIPT_SRC, BIRDEYE_WIDGET_CONTAINER_ID } from '@/constants/urls';

// Delay third-party scripts to improve initial page load
const THIRD_PARTY_DELAY = 3000; // Reduced delay to 3 seconds

export interface ThirdPartyScript {
  name: string;
  url: string;
  async?: boolean;
  defer?: boolean;
  onLoad?: () => void;
}

// List of third-party scripts to delay
const DELAYED_SCRIPTS: ThirdPartyScript[] = [
  // GA4 is now loaded directly in HTML head for immediate initialization
  // Additional analytics scripts can be added here if needed for delayed loading
];

const preconnectOrigin = (url: string) => {
  if (typeof document === 'undefined') return;

  try {
    const origin = new URL(url).origin;
    if (document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) return;

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  } catch (error) {
    // Ignore invalid URLs
  }
};

// Load a script dynamically
export function loadScript(script: ThirdPartyScript): Promise<void> {
  if (typeof document === 'undefined') {
    return Promise.reject(new Error('Document is not available to load scripts'));
  }

  return new Promise((resolve, reject) => {
    preconnectOrigin(script.url);

    // Check if script already exists
    if (document.querySelector(`script[data-name="${script.name}"]`)) {
      resolve();
      return;
    }
    
    const scriptElement = document.createElement('script');
    scriptElement.src = script.url;
    scriptElement.async = script.async ?? true;
    scriptElement.defer = script.defer ?? false;
    scriptElement.setAttribute('data-name', script.name);
    
    scriptElement.onload = () => {
      script.onLoad?.();
      resolve();
    };
    
    scriptElement.onerror = () => {
      reject(new Error(`Failed to load script: ${script.name}`));
    };
    
    document.head.appendChild(scriptElement);
  });
}

// Load all delayed scripts with better error handling
export function loadDelayedScripts() {
  if (typeof window === 'undefined') {
    return;
  }

  // Use requestIdleCallback if available
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      DELAYED_SCRIPTS.forEach(script => {
        loadScript(script).catch(error => {
          console.error(`Failed to load ${script.name}:`, error);
        });
      });
    }, { timeout: THIRD_PARTY_DELAY });
  } else {
    // Fallback to setTimeout
    setTimeout(() => {
      DELAYED_SCRIPTS.forEach(script => {
        loadScript(script).catch(error => {
          console.error(`Failed to load ${script.name}:`, error);
        });
      });
    }, THIRD_PARTY_DELAY);
  }
}

// Initialize third-party scripts after page load with better error handling
export function initializeThirdPartyScripts() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  try {
    // Verify Hotjar initialization immediately
    setTimeout(() => {
      verifyHotjarInitialization();
    }, 1000);
    
    // Wait for window load event for other scripts
    if (document.readyState === 'complete') {
      loadDelayedScripts();
    } else {
      window.addEventListener('load', loadDelayedScripts);
    }
  } catch (error) {
    console.error('Failed to initialize third-party scripts:', error);
  }
}

// Google Analytics wrapper
export function gtag(...args: unknown[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer!.push(args);
}

// Initialize Google Analytics if needed (GA4 script loads from HTML)
export function initializeGoogleAnalytics() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // GA4 is now initialized directly in HTML head
  // This function can be used for additional GA4 configuration if needed
  window.dataLayer = window.dataLayer || [];
  
  // Optional: Push additional configuration to dataLayer
  window.dataLayer.push({
    event: 'ga4_loaded',
    page_title: document.title,
    page_location: window.location.href,
  });
  
// Initialize Google Ads tracking
  gtag('config', 'AW-11373090310');
  
  // Initialize Google Ads conversion tracking utilities
  import('./googleAdsTracking').then(({ initializeGoogleAdsTracking }) => {
    initializeGoogleAdsTracking();
  }).catch(console.error);
  
  // Initialize UTM tracking
  import('./utmTracking').then(({ initializeUTMTracking }) => {
    initializeUTMTracking();
  }).catch(console.error);
  
  // Initialize analytics validation in development
  import('./analyticsValidation').then(({ initializeAnalyticsValidation }) => {
    initializeAnalyticsValidation();
  }).catch(console.error);
}

// Hotjar verification - check if loaded from HTML
export function verifyHotjarInitialization() {
  try {
    if (typeof window === 'undefined') {
      return false;
    }

    if (typeof window.hj === 'function' && window._hjSettings) {
      console.log('✅ Hotjar tracking initialized successfully', {
        hjid: window._hjSettings.hjid,
        hjsv: window._hjSettings.hjsv,
        timestamp: new Date().toISOString()
      });
      
      // Test Hotjar functionality
      window.hj('identify', { 
        site_verification: true,
        timestamp: Date.now()
      });
      
      return true;
    } else {
      console.warn('⚠️ Hotjar not properly initialized', {
        hj_exists: typeof window.hj,
        settings_exists: !!window._hjSettings
      });
      return false;
    }
  } catch (error) {
    console.error('❌ Failed to verify Hotjar initialization:', error);
    return false;
  }
}

// BirdEye widget facade
export function loadBirdEyeWidget(containerId: string) {
  if (typeof document === 'undefined') {
    return;
  }

  const container = document.getElementById(containerId);
  if (!container) return;

  if (container.querySelector(`#${BIRDEYE_WIDGET_CONTAINER_ID}`)) {
    return;
  }

  preconnectOrigin(BIRDEYE_WIDGET_SCRIPT_SRC);
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = BIRDEYE_WIDGET_SCRIPT_SRC;
  script.async = true;

  const widget = document.createElement('div');
  widget.id = BIRDEYE_WIDGET_CONTAINER_ID;

  container.appendChild(script);
  container.appendChild(widget);
}

// Lazy load BirdEye widgets on intersection
export function initializeBirdEyeWidgets() {
  if (typeof document === 'undefined') {
    return;
  }

  const widgets = document.querySelectorAll('[data-birdeye-widget]');
  
  if (!widgets.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const widget = entry.target as HTMLElement;
        const widgetId = widget.getAttribute('data-birdeye-widget');
        if (widgetId) {
          loadBirdEyeWidget(widgetId);
          observer.unobserve(widget);
        }
      }
    });
  }, {
    rootMargin: '100px',
  });
  
  widgets.forEach(widget => observer.observe(widget));
}
