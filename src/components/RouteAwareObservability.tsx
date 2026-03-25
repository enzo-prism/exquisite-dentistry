import { useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const normalizeTrackedRoute = (pathname: string) => {
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

  if (normalizedPath.startsWith("/blog/")) {
    return "/blog/[slug]";
  }

  if (normalizedPath.startsWith("/transformation-stories/")) {
    return "/transformation-stories/[slug]";
  }

  return normalizedPath || "/";
};

const sanitizeTrackedUrl = (value: string) => {
  try {
    const url = new URL(value);
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return value.split(/[?#]/)[0] || value;
  }
};

const RouteAwareObservability = () => {
  const { pathname } = useLocation();
  const trackedRoute = normalizeTrackedRoute(pathname);

  return (
    <>
      <Analytics mode={import.meta.env.PROD ? "production" : "development"} />
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
