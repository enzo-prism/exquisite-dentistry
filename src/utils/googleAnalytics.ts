export const ANALYTICS_CONSENT_STORAGE_KEY = 'exquisite_analytics_consent_v1';
export const ANALYTICS_PREFERENCES_EVENT = 'exquisite:open-analytics-preferences';
export const ANALYTICS_CONSENT_CHANGED_EVENT = 'exquisite:analytics-consent-changed';

export type AnalyticsConsent = 'granted' | 'denied' | null;

type SafeEventValue = string | number | boolean;
type SafeEventParameters = Record<string, SafeEventValue | undefined>;

const MAX_DIMENSION_LENGTH = 64;
const EMAIL_LIKE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE_LIKE = /(?:\+?\d[\s().-]*){7,}/;
const recentEvents = new Map<string, number>();
let previousVirtualLocation: string | undefined;
let lastPageViewLocation: string | undefined;

const normalizePath = (pathname: string) => {
  const path = pathname || '/';
  return path === '/' ? '/' : path.replace(/\/+$/, '') || '/';
};

const sanitizePath = (pathname: string) => {
  let decodedPath = pathname;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    // The encoded path is still checked below and normalized if decoding fails.
  }

  if (EMAIL_LIKE.test(decodedPath) || PHONE_LIKE.test(decodedPath)) return '/redacted';
  return normalizePath(pathname);
};

const normalizeDimension = (value: string, fallback: string) => {
  if (EMAIL_LIKE.test(value) || PHONE_LIKE.test(value)) return fallback;
  const normalized = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, MAX_DIMENSION_LENGTH);

  return normalized || fallback;
};

const sanitizeLocation = (value: string) => {
  if (!value.trim()) return undefined;

  try {
    const url = new URL(value, window.location.origin);
    return `${url.origin}${sanitizePath(url.pathname)}`;
  } catch {
    return undefined;
  }
};

const getPageLocation = () => sanitizeLocation(window.location.href) ?? window.location.origin;

const sendEvent = (eventName: string, parameters: SafeEventParameters) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return false;

  const cleanParameters = Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => value !== undefined),
  );

  window.gtag('event', eventName, cleanParameters);
  return true;
};

const sendDedupedEvent = (
  eventName: string,
  parameters: SafeEventParameters,
  dedupeKey: string,
  windowMs = 1_000,
) => {
  const now = Date.now();
  const previous = recentEvents.get(dedupeKey);
  if (previous !== undefined && now - previous < windowMs) return false;
  recentEvents.set(dedupeKey, now);

  if (recentEvents.size > 100) {
    for (const [key, timestamp] of recentEvents) {
      if (now - timestamp >= windowMs) recentEvents.delete(key);
    }
  }

  return sendEvent(eventName, parameters);
};

export const getAnalyticsConsent = (): AnalyticsConsent => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    return null;
  }
};

export const updateAnalyticsConsent = (consent: Exclude<AnalyticsConsent, null>) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent);
  } catch {
    // The consent update below still applies for this page if storage is blocked.
  }

  window.gtag?.('consent', 'update', {
    analytics_storage: consent,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_CHANGED_EVENT, { detail: consent }));
};

export const openAnalyticsPreferences = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(ANALYTICS_PREFERENCES_EVENT));
};

export const trackPageView = ({
  pathname,
  title,
}: {
  pathname: string;
  title: string;
}) => {
  if (typeof window === 'undefined') return false;

  const pagePath = sanitizePath(pathname);
  const pageLocation = sanitizeLocation(`${window.location.origin}${pagePath}`);
  if (!pageLocation || lastPageViewLocation === pageLocation) return false;

  const initialReferrer = previousVirtualLocation ?? sanitizeLocation(document.referrer);

  lastPageViewLocation = pageLocation;
  previousVirtualLocation = pageLocation;

  return sendEvent('page_view', {
    page_location: pageLocation,
    page_path: pagePath,
    page_title: title.slice(0, 100),
    page_referrer: initialReferrer,
  });
};

export const trackGenerateLead = ({
  formType,
  ctaLocation,
}: {
  formType: string;
  ctaLocation?: string;
}) => sendDedupedEvent(
  'generate_lead',
  {
    form_type: 'website_contact',
    interaction_method: 'form',
    cta_location: normalizeDimension(ctaLocation ?? window.location.pathname, 'unknown'),
  },
  `lead|${formType}|${window.location.pathname}`,
  5_000,
);

export const trackGoogleContactClick = ({
  method,
  ctaLocation,
}: {
  method: 'phone' | 'sms' | 'directions' | 'email' | 'social';
  ctaLocation: string;
}) => sendDedupedEvent(
  'contact_click',
  {
    interaction_method: method,
    cta_location: normalizeDimension(ctaLocation, 'unknown'),
  },
  `contact|${method}|${ctaLocation}`,
);

export const trackScheduleClick = ({
  ctaLocation,
}: {
  ctaLocation: string;
}) => sendDedupedEvent(
  'schedule_click',
  {
    interaction_method: 'schedule',
    cta_location: normalizeDimension(ctaLocation, 'unknown'),
  },
  `schedule|${ctaLocation}|${window.location.pathname}`,
);

export const trackGoogleCtaClick = ({
  ctaType,
  ctaLocation,
}: {
  ctaType: string;
  ctaLocation: string;
}) => sendDedupedEvent(
  'cta_click',
  {
    cta_type: normalizeDimension(ctaType, 'site_cta'),
    cta_location: normalizeDimension(ctaLocation, 'unknown'),
  },
  `cta|${ctaType}|${ctaLocation}`,
);

export const trackGoogleFinancingEngagement = ({
  action,
  ctaLocation,
}: {
  action: string;
  ctaLocation: string;
}) => sendDedupedEvent(
  'financing_engagement',
  {
    action: normalizeDimension(action, 'interaction'),
    cta_location: normalizeDimension(ctaLocation, 'unknown'),
  },
  `financing|${action}|${ctaLocation}`,
);

export const trackGoogleVideoEngagement = ({
  action,
  videoType,
  ctaLocation,
}: {
  action: 'start' | 'complete';
  videoType: string;
  ctaLocation: string;
}) => sendDedupedEvent(
  action === 'start' ? 'video_start' : 'video_complete',
  {
    video_type: normalizeDimension(videoType, 'site_video'),
    cta_location: normalizeDimension(ctaLocation, 'unknown'),
  },
  `video|${action}|${videoType}|${ctaLocation}`,
);
