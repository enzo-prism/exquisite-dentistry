
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './blog-layout.css';
import App from './App.tsx';
import { initializeUTMTracking } from './utils/utmTracking';
import { initializeGoogleAdsTracking } from './utils/googleAdsTracking';

// Capture campaign parameters before React can change the landing URL.
initializeUTMTracking();
initializeGoogleAdsTracking();

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
