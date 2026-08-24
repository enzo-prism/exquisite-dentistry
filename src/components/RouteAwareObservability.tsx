import { useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { normalizeTrackedRoute, sanitizeTrackedUrl } from "@/utils/vercelAnalytics";
import GlobalIntentTracking from "@/components/GlobalIntentTracking";

const RouteAwareObservability = () => {
  const { pathname } = useLocation();
  const trackedRoute = normalizeTrackedRoute(pathname);

  return (
    <>
      <GlobalIntentTracking />
      <Analytics
        mode={import.meta.env.PROD ? "production" : "development"}
        route={trackedRoute}
        path={pathname}
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
  );
};

export default RouteAwareObservability;
