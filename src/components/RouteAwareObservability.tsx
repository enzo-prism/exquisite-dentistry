import { useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { normalizeTrackedRoute, sanitizeTrackedUrl } from "@/utils/vercelAnalytics";
import { initializeUTMTracking } from "@/utils/utmTracking";
import GlobalIntentTracking from "@/components/GlobalIntentTracking";
import { useEffect, useState } from "react";
import { isCanonicalAnalyticsHost } from "@/utils/analyticsHost";
import {
  ANALYTICS_CONSENT_CHANGED_EVENT,
  ANALYTICS_CONSENT_STORAGE_KEY,
  syncAnalyticsConsentFromStorage,
  getAnalyticsConsent,
  trackPageView,
} from "@/utils/googleAnalytics";

const RouteAwareObservability = () => {
  const { pathname, search } = useLocation();
  const trackedRoute = normalizeTrackedRoute(pathname);
  const trackedUrl = new URL(sanitizeTrackedUrl(`${window.location.origin}${pathname}${search}`, true));
  const trackedPath = `${trackedUrl.pathname}${trackedUrl.search}`;
  const [optionalAnalyticsAllowed, setOptionalAnalyticsAllowed] = useState(
    () => getAnalyticsConsent() === 'granted' && isCanonicalAnalyticsHost(),
  );

  useEffect(() => {
    initializeUTMTracking();
  }, [pathname, search]);

  useEffect(() => {
    const handleConsentChange = () => {
      setOptionalAnalyticsAllowed(getAnalyticsConsent() === 'granted' && isCanonicalAnalyticsHost());
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === ANALYTICS_CONSENT_STORAGE_KEY) syncAnalyticsConsentFromStorage();
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, handleConsentChange);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, handleConsentChange);
    };
  }, []);

  useEffect(() => {
    let sent = false;
    let settleTimeout = 0;

    const send = () => {
      if (sent) return;
      sent = true;
      trackPageView({ pathname, title: document.title });
    };

    const scheduleAfterTitleSettles = () => {
      window.clearTimeout(settleTimeout);
      settleTimeout = window.setTimeout(send, 50);
    };

    const titleObserver = new MutationObserver(scheduleAfterTitleSettles);
    titleObserver.observe(document.head, { childList: true, subtree: true, characterData: true });
    const fallback = window.setTimeout(send, 1_000);

    return () => {
      titleObserver.disconnect();
      window.clearTimeout(settleTimeout);
      window.clearTimeout(fallback);
    };
  }, [pathname]);

  return (
    <>
      <GlobalIntentTracking />
      {optionalAnalyticsAllowed && (
        <>
          <Analytics
            mode={import.meta.env.PROD ? "production" : "development"}
            route={trackedRoute}
            path={trackedPath}
            beforeSend={(event) => (
              getAnalyticsConsent() !== 'granted'
                ? null
                : { ...event, url: sanitizeTrackedUrl(event.url, true) }
            )}
          />
          <SpeedInsights
            route={trackedRoute}
            beforeSend={(event) => (
              getAnalyticsConsent() !== 'granted'
                ? null
                : { ...event, url: sanitizeTrackedUrl(event.url) }
            )}
          />
        </>
      )}
    </>
  );
};

export default RouteAwareObservability;
