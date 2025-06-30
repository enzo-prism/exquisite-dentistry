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
const THIRD_PARTY_DELAY = 5000; // 5 seconds after page load

export interface ThirdPartyScript {
  name: string;
  url: string;
  async?: boolean;
  defer?: boolean;
  onLoad?: () => void;
}

// List of third-party scripts to delay
const DELAYED_SCRIPTS: ThirdPartyScript[] = [
  {
    name: 'google-analytics',
    url: 'https://www.googletagmanager.com/gtag/js?id=G-2HKBYNRKYX',
    async: true,
  },
  {
    name: 'hotjar',
    url: 'https://static.hotjar.com/c/hotjar-5272510.js?sv=6',
    async: true,
  },
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

// Load all delayed scripts
export function loadDelayedScripts() {
  // Use requestIdleCallback if available
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      DELAYED_SCRIPTS.forEach(script => {
        loadScript(script).catch(console.error);
      });
    }, { timeout: THIRD_PARTY_DELAY });
  } else {
    // Fallback to setTimeout
    setTimeout(() => {
      DELAYED_SCRIPTS.forEach(script => {
        loadScript(script).catch(console.error);
      });
    }, THIRD_PARTY_DELAY);
  }
}

// Initialize third-party scripts after page load
export function initializeThirdPartyScripts() {
  // Wait for window load event
  if (document.readyState === 'complete') {
    loadDelayedScripts();
  } else {
    window.addEventListener('load', loadDelayedScripts);
  }
}

// Google Analytics wrapper
export function gtag(...args: any[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

// Initialize GTM after script loads
export function initializeGoogleAnalytics() {
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-2HKBYNRKYX', {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
  });
}

// Hotjar initialization
export function initializeHotjar() {
  (function(h: any, o: any, t: string, j: string, a?: any, r?: any) {
    h.hj = h.hj || function() {
      (h.hj.q = h.hj.q || []).push(arguments);
    };
    h._hjSettings = { hjid: 5272510, hjsv: 6 };
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
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
