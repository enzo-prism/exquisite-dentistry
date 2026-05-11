import { track } from '@vercel/analytics';

type VercelAnalyticsValue = string | number | boolean | null;
type VercelAnalyticsProperties = Record<string, VercelAnalyticsValue | undefined>;

const MAX_PROPERTY_LENGTH = 120;

export const normalizeTrackedRoute = (pathname: string) => {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

  if (normalizedPath.startsWith('/blog/')) {
    return '/blog/[slug]';
  }

  if (normalizedPath.startsWith('/transformation-stories/')) {
    return '/transformation-stories/[slug]';
  }

  return normalizedPath || '/';
};

export const sanitizeTrackedUrl = (value: string) => {
  try {
    const url = new URL(value);
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch {
    return value.split(/[?#]/)[0] || value;
  }
};

const normalizePath = (pathname: string) => {
  const path = pathname || '/';
  return path === '/' ? '/' : path.replace(/\/+$/, '') || '/';
};

const getCurrentPath = () => {
  if (typeof window === 'undefined') return '/';
  return normalizePath(window.location.pathname);
};

const getCurrentRoute = () => normalizeTrackedRoute(getCurrentPath());

const getViewportCategory = () => {
  if (typeof window === 'undefined') return undefined;
  return window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop';
};

const cleanString = (value: string) => {
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

      cleanedProperties[key] = value;
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
      return normalizePath(url.pathname);
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

const normalizePersona = (persona?: string) => {
  const normalizedPersona = persona?.toLowerCase() ?? '';

  if (normalizedPersona.includes('existing')) return 'existing_patient';
  if (normalizedPersona.includes('new patient') || normalizedPersona.includes('becoming')) return 'new_patient';
  if (normalizedPersona.includes('vendor') || normalizedPersona.includes('business')) return 'vendor_business';
  return persona ? 'other' : 'unspecified';
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
  if (typeof window === 'undefined') return;

  track(
    eventName,
    cleanProperties({
      route: getCurrentRoute(),
      path: getCurrentPath(),
      viewport: getViewportCategory(),
      ...properties,
    }),
  );
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
  trackVercelEvent('Consultation Intent', {
    source,
    cta_text: ctaText,
    destination: normalizeAnalyticsDestination(destination),
    destination_type: getDestinationType(destination),
  });
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
    cta_text: ctaText,
    destination: normalizeAnalyticsDestination(destination),
    destination_type: getDestinationType(destination),
  });
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
  trackVercelEvent('Contact Method Clicked', {
    method,
    source,
    destination: normalizeAnalyticsDestination(destination),
  });
};

export const trackContactFormSubmitted = ({
  form,
  persona,
  hasPhone,
}: {
  form: string;
  persona?: string;
  hasPhone?: boolean;
}) => {
  trackVercelEvent('Contact Form Submitted', {
    form,
    persona: normalizePersona(persona),
    has_phone: Boolean(hasPhone),
  });
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
    form,
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
    form,
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
    query_state: queryLength > 0 ? 'query' : 'popular',
    query_length_bucket: getQueryLengthBucket(queryLength),
    token_count: tokenCount,
    result_count_bucket: getResultCountBucket(resultCount),
    result_type: resultType,
    destination: normalizeAnalyticsDestination(destination),
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
  videoId,
}: {
  action: 'start' | 'complete';
  source: string;
  videoId?: string;
}) => {
  trackVercelEvent('Video Engagement', {
    action,
    source,
    video_id: videoId,
  });
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
