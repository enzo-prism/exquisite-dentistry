import { useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { normalizeTrackedRoute, sanitizeTrackedPath, sanitizeTrackedUrl } from "@/utils/vercelAnalytics";
import GlobalIntentTracking from "@/components/GlobalIntentTracking";
import { useEffect, useState } from "react";
import { isCanonicalAnalyticsHost } from "@/utils/analyticsHost";
import {
  ANALYTICS_CONSENT_CHANGED_EVENT,
  getAnalyticsConsent,
  trackPageView,
} from "@/utils/googleAnalytics";

const RouteAwareObservability = () => {
  const { pathname } = useLocation();
  const trackedRoute = normalizeTrackedRoute(pathname);
  const trackedPath = sanitizeTrackedPath(pathname);
  const [optionalAnalyticsAllowed, setOptionalAnalyticsAllowed] = useState(
    () => getAnalyticsConsent() === 'granted' && isCanonicalAnalyticsHost(),
  );

  useEffect(() => {
    const handleConsentChange = () => {
      setOptionalAnalyticsAllowed(getAnalyticsConsent() === 'granted' && isCanonicalAnalyticsHost());
    };
    window.addEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, handleConsentChange);
    return () => window.removeEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, handleConsentChange);
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
            beforeSend={(event) => ({
              ...event,
              url: sanitizeTrackedUrl(event.url),
            })}
          />
          <SpeedInsights
            route={trackedRoute}
            beforeSend={(event) => ({
              ...event,
              url: sanitizeTrackedUrl(event.url),
            })}
          />
        </>
      )}
    </>
  );
};

export default RouteAwareObservability;
