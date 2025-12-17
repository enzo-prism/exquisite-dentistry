
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Setup basic data layer for analytics
window.dataLayer = window.dataLayer || [];
window.gtag = function gtag(...args: unknown[]) {
  window.dataLayer!.push(args);
};

const rootElement = document.getElementById('root');

const scheduleIdle = (callback: () => void, timeoutMs: number) => {
  if (typeof window === 'undefined') return;

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout: timeoutMs });
    return;
  }

  window.setTimeout(callback, timeoutMs);
};

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  
  // Defer non-critical initializations until after app is mounted
  scheduleIdle(() => {
    import('./utils/thirdPartyLoader')
      .then(({ initializeThirdPartyScripts, initializeGoogleAnalytics }) => {
        initializeThirdPartyScripts();

        scheduleIdle(() => {
          initializeGoogleAnalytics();

          import('./utils/redirectTracker')
            .then(({ initializeRedirectTracking }) => {
              initializeRedirectTracking();
            })
            .catch(() => undefined);
        }, 6000);
      })
      .catch(() => undefined);
  }, 3000);
}
