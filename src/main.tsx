
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Setup basic data layer for analytics
window.dataLayer = window.dataLayer || [];
window.gtag = function gtag(...args: any[]) {
  window.dataLayer.push(args);
};

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  
  // Defer non-critical initializations until after app is mounted
  setTimeout(() => {
    // Initialize performance optimizations after app load
    import('./utils/preloadResources').then(({ initializePerformanceOptimizations }) => {
      initializePerformanceOptimizations();
    }).catch(console.error);
    
    // Initialize third-party scripts after delay
    import('./utils/thirdPartyLoader').then(({ initializeThirdPartyScripts, initializeGoogleAnalytics }) => {
      initializeThirdPartyScripts();
      
      // Initialize analytics after additional delay
      setTimeout(() => {
        initializeGoogleAnalytics();
      }, 3000);
    }).catch(console.error);
  }, 1000);
}
