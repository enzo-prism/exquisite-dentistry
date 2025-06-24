// Critical resources that should be preloaded
export const CRITICAL_RESOURCES = {
  images: [
    '/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.png', // Logo
    '/lovable-uploads/9e823f53-f866-40f9-a3e2-78373640ee8f.png', // Nav logo
    '/lovable-uploads/96c9493a-c97f-4076-b224-591c2e9c50e6.png', // Hero poster
  ],
  fonts: [
    'https://fonts.gstatic.com/s/montserrat/v26/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2',
    'https://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4taVQUwaEQbjB_mQ.woff2'
  ]
};

// Preload critical resources
export function preloadCriticalResources() {
  // Only preload on initial load, not on navigation
  if (window.performance.navigation.type !== 0) return;
  
  // Preload critical images
  CRITICAL_RESOURCES.images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.type = 'image/png';
    document.head.appendChild(link);
  });
}

// Lazy load non-critical images
export function setupLazyImageLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px'
    });
    
    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Resource hints for third-party connections
export function setupResourceHints() {
  const thirdPartyDomains = [
    'https://player.vimeo.com',
    'https://www.youtube.com',
    'https://www.googletagmanager.com',
    'https://static.hotjar.com'
  ];
  
  thirdPartyDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Initialize performance optimizations
export function initializePerformanceOptimizations() {
  // Run immediately
  preloadCriticalResources();
  setupResourceHints();
  
  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLazyImageLoading);
  } else {
    setupLazyImageLoading();
  }
} 