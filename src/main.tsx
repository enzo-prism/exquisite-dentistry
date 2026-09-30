
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { isTwoFrontVeneersPath } from './data/twoFrontVeneers';
import './index.css';
import App from './App.tsx';
import { initializeUTMTracking } from './utils/utmTracking';
import { initializeGoogleAdsTracking } from './utils/googleAdsTracking';

// Capture campaign parameters before React can change the landing URL.
initializeUTMTracking();
initializeGoogleAdsTracking();

const rootElement = document.getElementById('root');

if (rootElement) {
  const renderApp = () => createRoot(rootElement).render(<StrictMode><App /></StrictMode>);
  if (rootElement.dataset.treatmentPilot === 'two-front-veneers' && isTwoFrontVeneersPath(window.location.pathname)) {
    import('./components/treatments/HydratedTreatmentPilot')
      .then(({ default: Pilot }) => {
        hydrateRoot(rootElement, <StrictMode><Pilot /></StrictMode>);
      })
      .catch(() => {
        // A failed pilot chunk uses the established App route rather than
        // leaving the shared navigation/search controls without handlers.
        delete rootElement.dataset.treatmentPilot;
        renderApp();
      });
  } else renderApp();
}
