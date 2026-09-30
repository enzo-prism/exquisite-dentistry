import React, { useEffect, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import TwoFrontVeneersDocument from './TwoFrontVeneersDocument';
import AnalyticsConsentBanner from '../AnalyticsConsentBanner';
import RouteAwareObservability from '../RouteAwareObservability';
import OpenAIAdsMeasurement from '../OpenAIAdsMeasurement';
import { isTwoFrontVeneersPath } from '../../data/twoFrontVeneers';

export function TreatmentPilotBody() {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    // Existing shared navigation and search use React Router. Other routes use
    // the ordinary App entry, so cross-route navigation reloads the document.
    if (!isTwoFrontVeneersPath(location.pathname)) {
      window.location.replace(`${location.pathname}${location.search}${location.hash}`);
    }
  }, [location.pathname, location.search, location.hash]);
  useEffect(() => {
    document.getElementById('root')?.setAttribute('data-treatment-hydrated', 'true');
  }, []);
  return <><TwoFrontVeneersDocument />{mounted && <><AnalyticsConsentBanner /><RouteAwareObservability /><OpenAIAdsMeasurement /></>}</>;
}

export default function HydratedTreatmentPilot() {
  return <BrowserRouter><TreatmentPilotBody /></BrowserRouter>;
}
