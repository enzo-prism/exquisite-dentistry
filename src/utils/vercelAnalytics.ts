import { track } from '@vercel/analytics';
import { isCanonicalAnalyticsHost } from '@/utils/analyticsHost';
import { getUTMAttribution } from '@/utils/utmTracking';
import {
  trackGenerateLead,
  trackGoogleContactClick,
  trackGoogleCtaClick,
  trackGoogleFinancingEngagement,
  trackGoogleVideoEngagement,
  trackScheduleClick,
  getAnalyticsConsent,
} from '@/utils/googleAnalytics';

type VercelAnalyticsValue = string | number | boolean | null;
type VercelAnalyticsProperties = Record<string, VercelAnalyticsValue | undefined>;

const MAX_PROPERTY_LENGTH = 120;
// The team's current Web Analytics Pro plan accepts two custom properties.
// Route, device, and URL campaign dimensions belong to Vercel's native context.
export const MAX_VERCEL_EVENT_PROPERTIES = 2;
const TEST_SESSION_KEY = 'exquisite_vercel_test_session_v1';
const INTENT_DEDUPE_WINDOW_MS = 1_000;
const recentIntentEvents = new Map<string, number>();

export const sanitizeTrackedPath = (pathname: string) => {
  let decodedPath = pathname;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return '/redacted';
  }

  if (
    /[^\s@]+@[^\s@]+\.[^\s@]+/.test(decodedPath)
    || /(?:\+?\d[\s().-]*){7,}/.test(decodedPath)
  ) {
    return '/redacted';
  }

  const path = pathname || '/';
  return path === '/' ? '/' : path.replace(/\/+$/, '') || '/';
};

export const normalizeTrackedRoute = (pathname: string) => {
  const normalizedPath = sanitizeTrackedPath(pathname);

  if (normalizedPath.startsWith('/blog/')) {
    return '/blog/[slug]';
  }

  if (normalizedPath.startsWith('/transformation-stories/')) {
    return '/transformation-stories/[slug]';
  }

  return normalizedPath || '/';
};

export const sanitizeTrackedUrl = (value: string, preserveCampaign = false) => {
  try {
    const url = new URL(value);
    url.pathname = sanitizeTrackedPath(url.pathname);
    const campaign = new URLSearchParams();
    if (preserveCampaign) {
      for (const key of ['utm_id', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
        const value = url.searchParams.get(key);
        if (value && value.length <= 120 && !value.includes('@') && !/(?:\+?\d[\s().-]*){7,}/.test(value)) campaign.set(key, value);
      }
    }
    url.search = campaign.toString();
    url.hash = '';
    return url.toString();
  } catch {
    return value.split(/[?#]/)[0] || value;
  }
};

/** An explicit QA visit stays excluded across navigation within this tab. */
export const isVercelTestTraffic = () => {
  if (typeof window === 'undefined') return false;
  const explicitTest = new URLSearchParams(window.location.search).get('_codex_test') === 'true';
  try {
    if (explicitTest) window.sessionStorage.setItem(TEST_SESSION_KEY, 'true');
    return explicitTest || window.sessionStorage.getItem(TEST_SESSION_KEY) === 'true';
  } catch {
    return explicitTest;
  }
};

/** Keep the last tagged visit on subsequent SPA events without forwarding click IDs. */
export const getVercelAnalyticsUrl = (value: string) => {
  const safeUrl = new URL(sanitizeTrackedUrl(value, true));
  if (!safeUrl.search) {
    const attribution = getUTMAttribution();
    for (const key of ['utm_id', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      if (attribution[key]) safeUrl.searchParams.set(key, attribution[key]);
    }
  }
  return sanitizeTrackedUrl(safeUrl.toString(), true);
};

const getCurrentPath = () => {
  if (typeof window === 'undefined') return '/';
  return sanitizeTrackedPath(window.location.pathname);
};

const getCurrentRoute = () => normalizeTrackedRoute(getCurrentPath());

const shouldTrackIntent = (key: string) => {
  if (typeof window === 'undefined') return false;

  const now = Date.now();
  const previousTimestamp = recentIntentEvents.get(key);

  if (previousTimestamp !== undefined && now - previousTimestamp < INTENT_DEDUPE_WINDOW_MS) {
    return false;
  }

  recentIntentEvents.set(key, now);

  if (recentIntentEvents.size > 50) {
    for (const [eventKey, timestamp] of recentIntentEvents) {
      if (now - timestamp >= INTENT_DEDUPE_WINDOW_MS) {
        recentIntentEvents.delete(eventKey);
      }
    }
  }

  return true;
};

const cleanString = (value: string) => {
  let decoded = value;
  try { decoded = decodeURIComponent(value); } catch { return undefined; }
  if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(decoded) || /(?:\+?\d[\s().-]*){7,}/.test(decoded)) return undefined;
  const cleaned = value.replace(/\s+/g, ' ').trim();
  if (!cleaned) return undefined;
  return cleaned.slice(0, MAX_PROPERTY_LENGTH);
};

const cleanProperties = (properties: VercelAnalyticsProperties) => {
  return Object.entries(properties).reduce<Record<string, VercelAnalyticsValue>>(
    (cleanedProperties, [key, value]) => {
      if (value === undefined) return cleanedProperties;

      if (typeof value === 'string') {
        const cleanedValue = cleanString(value);
        if (cleanedValue) {
          cleanedProperties[key] = cleanedValue;
        }
        return cleanedProperties;
      }

      if (typeof value !== 'number' || Number.isFinite(value)) cleanedProperties[key] = value;
      return cleanedProperties;
    },
    {},
  );
};

export const normalizeAnalyticsDestination = (href?: string) => {
  if (!href) return 'none';

  const trimmedHref = href.trim();
  if (!trimmedHref) return 'none';

  if (trimmedHref.startsWith('#')) return trimmedHref.slice(0, MAX_PROPERTY_LENGTH);

  if (/^tel:/i.test(trimmedHref)) return 'tel';
  if (/^sms:/i.test(trimmedHref)) return 'sms';
  if (/^mailto:/i.test(trimmedHref)) return 'email';

  try {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://exquisitedentistryla.com';
    const url = new URL(trimmedHref, baseUrl);
    const hostname = url.hostname.replace(/^www\./, '');

    if (hostname === 'exquisitedentistryla.com' || url.origin === baseUrl) {
      return sanitizeTrackedPath(url.pathname);
    }

    if (hostname === 'maps.app.goo.gl' || hostname.endsWith('google.com')) {
      return 'google_maps';
    }

    if (hostname === 'formspree.io') {
      return 'formspree';
    }

    if (hostname.endsWith('withcherry.com')) {
      return 'cherry';
    }

    return hostname.slice(0, MAX_PROPERTY_LENGTH);
  } catch {
    return trimmedHref.split(/[?#]/)[0].slice(0, MAX_PROPERTY_LENGTH);
  }
};

const getDestinationType = (href?: string) => {
  if (!href) return 'none';
  if (href.startsWith('#')) return 'anchor';
  if (/^tel:/i.test(href)) return 'phone';
  if (/^sms:/i.test(href)) return 'sms';
  if (/^mailto:/i.test(href)) return 'email';
  if (/^https?:\/\//i.test(href)) return 'external';
  return 'internal';
};

const getQueryLengthBucket = (queryLength: number) => {
  if (queryLength <= 0) return 'empty';
  if (queryLength <= 2) return '1-2';
  if (queryLength <= 5) return '3-5';
  if (queryLength <= 12) return '6-12';
  if (queryLength <= 24) return '13-24';
  return '25_plus';
};

const getResultCountBucket = (resultCount: number) => {
  if (resultCount <= 0) return '0';
  if (resultCount === 1) return '1';
  if (resultCount <= 3) return '2-3';
  if (resultCount <= 10) return '4-10';
  return '11_plus';
};

export const trackVercelEvent = (
  eventName: string,
  properties: VercelAnalyticsProperties = {},
) => {
  if (
    typeof window === 'undefined'
    || !isCanonicalAnalyticsHost()
    || getAnalyticsConsent() !== 'granted'
    || isVercelTestTraffic()
  ) return false;

  // Consent may be granted just before React mounts the SDK. Match the SDK's
  // queue so an immediate interaction is retained instead of silently lost.
  if (!window.va) window.va = (...params) => { (window.vaq ??= []).push(params); };
  track(
    eventName,
    Object.fromEntries(Object.entries(cleanProperties(properties)).slice(0, MAX_VERCEL_EVENT_PROPERTIES)),
  );

  return true;
};

export const trackConsultationIntent = ({
  source,
  ctaText,
  destination,
}: {
  source: string;
  ctaText?: string;
  destination?: string;
}) => {
  const normalizedDestination = normalizeAnalyticsDestination(destination);
  const eventKey = [
    'consultation',
    getCurrentRoute(),
    normalizedDestination,
  ].join('|');

  if (!shouldTrackIntent(eventKey)) return false;

  trackVercelEvent('Consultation Intent', {
    source,
    destination: normalizedDestination,
    cta_text: ctaText,
    destination_type: getDestinationType(destination),
  });
  trackScheduleClick({ ctaLocation: source });

  return true;
};

export const trackCtaClick = ({
  source,
  ctaText,
  destination,
}: {
  source: string;
  ctaText?: string;
  destination?: string;
}) => {
  trackVercelEvent('CTA Clicked', {
    source,
    destination: normalizeAnalyticsDestination(destination),
    cta_text: ctaText,
    destination_type: getDestinationType(destination),
  });
  trackGoogleCtaClick({ ctaType: source, ctaLocation: source });
};

export const trackContactMethodClick = ({
  method,
  source,
  destination,
}: {
  method: 'phone' | 'sms' | 'directions' | 'email' | 'social';
  source: string;
  destination?: string;
}) => {
  const normalizedDestination = normalizeAnalyticsDestination(destination);
  const eventKey = [
    'contact',
    getCurrentRoute(),
    method,
    normalizedDestination,
  ].join('|');

  if (!shouldTrackIntent(eventKey)) return false;

  trackVercelEvent('Contact Method Clicked', {
    method,
    source,
    destination: normalizedDestination,
  });
  trackGoogleContactClick({ method, ctaLocation: source });

  return true;
};

const getSafeFormLabel = (form: string) => (
  form === 'chatgpt_ads_consultation' ? 'consultation_request'
    : form === 'contact_form' ? 'website_contact' : 'website_other'
);

export const trackContactFormStarted = (form: string) => (
  trackVercelEvent('Contact Form Started', { form: getSafeFormLabel(form) })
);

export const trackContactFormAttempted = (form: string) => (
  trackVercelEvent('Contact Form Submit Attempted', { form: getSafeFormLabel(form) })
);

export const trackContactFormSubmitted = ({
  form,
  persona: _persona,
  hasPhone: _hasPhone,
  acquisitionLead = false,
}: {
  form: string;
  persona?: string;
  hasPhone?: boolean;
  acquisitionLead?: boolean;
}) => {
  trackVercelEvent('Contact Form Submitted', {
    form: getSafeFormLabel(form),
  });
  if (acquisitionLead) {
    trackVercelEvent('Acquisition Lead', { form: getSafeFormLabel(form) });
    trackGenerateLead({ formType: 'website_contact', ctaLocation: getCurrentRoute() });
  }
};

export const trackContactFormValidationFailed = ({
  form,
  fieldCount,
  personaMissing,
  nameMissing,
  emailMissing,
  emailInvalid,
  messageMissing,
}: {
  form: string;
  fieldCount: number;
  personaMissing: boolean;
  nameMissing: boolean;
  emailMissing: boolean;
  emailInvalid: boolean;
  messageMissing: boolean;
}) => {
  trackVercelEvent('Contact Form Validation Failed', {
    form: getSafeFormLabel(form),
    field_count: fieldCount,
    persona_missing: personaMissing,
    name_missing: nameMissing,
    email_missing: emailMissing,
    email_invalid: emailInvalid,
    message_missing: messageMissing,
  });
};

export const trackContactFormFailed = ({
  form,
  reason,
}: {
  form: string;
  reason: string;
}) => {
  trackVercelEvent('Contact Form Failed', {
    form: getSafeFormLabel(form),
    reason,
  });
};

export const trackFinancingEngagement = ({
  action,
  source,
  ctaText,
  destination,
  status,
}: {
  action: 'section_viewed' | 'cta_clicked' | 'widget_ready' | 'widget_error' | 'widget_clicked';
  source: string;
  ctaText?: string;
  destination?: string;
  status?: string;
}) => {
  trackVercelEvent('Financing Engagement', {
    action,
    source,
    cta_text: ctaText,
    destination: normalizeAnalyticsDestination(destination),
    status,
  });
  trackGoogleFinancingEngagement({ action, ctaLocation: source });
};

export const trackSiteSearchOpened = ({ source }: { source: string }) => {
  trackVercelEvent('Site Search Opened', { source });
};

export const trackSiteSearchNoResults = ({
  queryLength,
  tokenCount,
}: {
  queryLength: number;
  tokenCount: number;
}) => {
  trackVercelEvent('Site Search No Results', {
    query_length_bucket: getQueryLengthBucket(queryLength),
    token_count: tokenCount,
  });
};

export const trackSiteSearchResultSelected = ({
  queryLength,
  tokenCount,
  resultCount,
  resultType,
  destination,
}: {
  queryLength: number;
  tokenCount: number;
  resultCount: number;
  resultType: string;
  destination: string;
}) => {
  trackVercelEvent('Site Search Result Selected', {
    result_type: resultType,
    destination: normalizeAnalyticsDestination(destination),
    query_state: queryLength > 0 ? 'query' : 'popular',
    query_length_bucket: getQueryLengthBucket(queryLength),
    token_count: tokenCount,
    result_count_bucket: getResultCountBucket(resultCount),
  });
};

export const trackSiteSearchActionSelected = ({
  action,
  queryLength,
}: {
  action: string;
  queryLength: number;
}) => {
  trackVercelEvent('Site Search Action Selected', {
    action,
    query_state: queryLength > 0 ? 'query' : 'empty',
    query_length_bucket: getQueryLengthBucket(queryLength),
  });
};

export const trackVideoEngagement = ({
  action,
  source,
  videoId: _videoId,
}: {
  action: 'start' | 'complete';
  source: string;
  videoId?: string;
}) => {
  trackVercelEvent('Video Engagement', {
    action,
    source,
  });
  trackGoogleVideoEngagement({ action, videoType: source, ctaLocation: getCurrentRoute() });
};

export const trackLegacyRedirectEvent = ({
  source,
  hasHash,
}: {
  source: string;
  hasHash: boolean;
}) => {
  trackVercelEvent('Legacy Redirect', {
    source,
    has_hash: hasHash,
  });
};
