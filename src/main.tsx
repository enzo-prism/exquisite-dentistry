import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { initializePerformanceOptimizations } from './utils/preloadResources';

// Initialize performance optimizations as early as possible
initializePerformanceOptimizations();

// Use requestIdleCallback to defer non-critical initialization
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    // Any non-critical initialization can go here
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
