import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { initializePerformanceOptimizations } from './utils/preloadResources';
import { initializeThirdPartyScripts, initializeGoogleAnalytics, gtag } from './utils/thirdPartyLoader';

// Initialize performance optimizations as early as possible
initializePerformanceOptimizations();

// Setup Google Analytics data layer
window.dataLayer = window.dataLayer || [];
window.gtag = gtag;

// Initialize third-party scripts (delayed loading)
initializeThirdPartyScripts();

// Use requestIdleCallback to defer non-critical initialization
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    // Initialize analytics after delay
    setTimeout(() => {
      initializeGoogleAnalytics();
    }, 5000);
  });
}

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
