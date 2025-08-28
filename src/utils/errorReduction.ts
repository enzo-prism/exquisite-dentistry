/**
 * Error reduction utilities to minimize console noise and improve debugging
 */

// Override console.error for non-critical warnings
const originalConsoleError = console.error;

export const setupErrorReduction = () => {
  console.error = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    
    // Convert non-critical React warnings to warnings instead of errors
    if (
      message.includes('Warning: React does not recognize') ||
      message.includes('Warning: Failed prop type') ||
      message.includes('Warning: validateDOMNesting') ||
      message.includes('ResizeObserver loop limit exceeded') ||
      message.includes('Non-passive event listener')
    ) {
      console.warn(...args);
      return;
    }
    
    // Keep key warnings as errors since they can cause actual issues
    if (message.includes('Warning: Each child in a list should have a unique')) {
      originalConsoleError(...args);
      return;
    }
    
    // Convert third-party library noise to warnings
    if (
      message.includes('THREE.') ||
      message.includes('gsap') ||
      message.includes('locomotive') ||
      message.includes('ScrollTrigger')
    ) {
      console.warn('Third-party library message:', ...args);
      return;
    }
    
    // Allow critical errors through
    originalConsoleError(...args);
  };
};

// Performance monitoring with reduced noise
export const quietPerformanceObserver = () => {
  if (typeof window === 'undefined') return;
  
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const criticalEntries = entries.filter(entry => 
        entry.entryType === 'navigation' || 
        (entry.entryType === 'measure' && entry.duration > 100)
      );
      
      if (criticalEntries.length > 0) {
        console.info('Performance metrics:', criticalEntries);
      }
    });
    
    observer.observe({ entryTypes: ['navigation', 'measure'] });
  } catch (error) {
    // Silently fail if PerformanceObserver is not supported
  }
};