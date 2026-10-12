
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { isTwoFrontVeneersPath } from './data/twoFrontVeneers';
import './index.css';
// Imported here, not from Navbar: the prerender and unit tests load components in plain Node, which can't import CSS.
import './components/nav/nav.css';
import App from './App.tsx';
import { initializeUTMTracking } from './utils/utmTracking';
import { initializeGoogleAdsTracking } from './utils/googleAdsTracking';
import { enableMotion } from './lib/motion';
import { getLegacyVeneersDocumentUrl } from './constants/legacyVeneers';
import '@fontsource/cormorant-garamond/latin-500-italic.css';

// Capture campaign parameters before React can change the landing URL.
initializeUTMTracking();
initializeGoogleAdsTracking();
enableMotion();

// All main-site entry points, including shared treatment navigation, open the
// standalone archive document before React Router can pushState into its shell.
document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (!(event.target instanceof Element)) return;
  const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
  if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
  const destination = getLegacyVeneersDocumentUrl(new URL(anchor.href, window.location.href), window.location.origin);
  if (!destination) return;

  event.preventDefault();
  event.stopPropagation();
  window.location.assign(destination);
}, true);

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
