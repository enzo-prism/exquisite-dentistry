// Extend Window interface for third-party scripts
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    hj: any;
    _hjSettings: any;
  }
}

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

// Load a script dynamically
export function loadScript(script: ThirdPartyScript): Promise<void> {
  return new Promise((resolve, reject) => {
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
export function gtag(...args: any[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

// Initialize Google Analytics if needed (GA4 script loads from HTML)
export function initializeGoogleAnalytics() {
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
}

// Hotjar verification - check if loaded from HTML
export function verifyHotjarInitialization() {
  try {
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
  const script = document.createElement('script');
  script.src = `https://widgets-v7.birdeye.com/api/widgets?bid=173...&wno=11`;
  script.async = true;
  
  const container = document.getElementById(containerId);
  if (container) {
    container.appendChild(script);
  }
}

// Lazy load BirdEye widgets on intersection
export function initializeBirdEyeWidgets() {
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
