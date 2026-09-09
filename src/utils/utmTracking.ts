/** Privacy-safe campaign attribution retained for this browser session. */
export const UTM_PARAMETERS = {
  googleBusinessProfile: { utm_source: 'google', utm_medium: 'organic', utm_campaign: 'gbp' },
  socialMedia: {
    instagram: { utm_source: 'instagram', utm_medium: 'social', utm_campaign: 'profile_link' },
    facebook: { utm_source: 'facebook', utm_medium: 'social', utm_campaign: 'profile_link' },
    youtube: { utm_source: 'youtube', utm_medium: 'social', utm_campaign: 'profile_link' },
  },
  email: { utm_source: 'email', utm_medium: 'email', utm_campaign: 'signature' },
  referral: { utm_source: 'referral', utm_medium: 'referral', utm_campaign: 'patient_referral' },
} as const;

const ATTRIBUTION_STORAGE_KEY = 'exquisite_session_attribution_v2';
export const ATTRIBUTION_FIELDS = [
  'utm_id',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'gbraid',
  'wbraid',
  'dclid',
  'msclkid',
  'fbclid',
  'oppref',
] as const;

const MAX_ATTRIBUTION_VALUE_LENGTH = 120;
const MAX_CLICK_ID_LENGTH = 2048;
const CLICK_ID_FIELDS = new Set<string>([
  'gclid', 'gbraid', 'wbraid', 'dclid', 'msclkid', 'fbclid', 'oppref',
]);
const EMAIL_LIKE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE_LIKE = /(?:\+?\d[\s().-]*){7,}/;

const cleanAttributionValue = (field: string, value: string | null) => {
  // Click IDs are opaque tokens: changing or truncating them destroys attribution.
  // Reject malformed/oversized input rather than trying to repair it. Numeric
  // sequences inside an identifier are not evidence of a phone number.
  if (CLICK_ID_FIELDS.has(field)) {
    return value && value.length <= MAX_CLICK_ID_LENGTH && /^[A-Za-z0-9._~+/=-]+$/.test(value)
      ? value
      : undefined;
  }
  if (!value) return undefined;
  const cleaned = Array.from(value)
    .filter((character) => {
      const code = character.charCodeAt(0);
      return code > 31 && code !== 127;
    })
    .join('')
    .trim();
  if (!cleaned || EMAIL_LIKE.test(cleaned) || PHONE_LIKE.test(cleaned)) return undefined;
  return cleaned.slice(0, MAX_ATTRIBUTION_VALUE_LENGTH);
};

export function generateUTMUrl(baseUrl: string, utmParams: Record<string, string>): string {
  const url = new URL(baseUrl);
  Object.entries(utmParams).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

export function getCurrentUTMParameters(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const urlParams = new URLSearchParams(window.location.search);

  return ATTRIBUTION_FIELDS.reduce<Record<string, string>>((result, field) => {
    const value = cleanAttributionValue(field, urlParams.get(field));
    if (value) result[field] = value;
    return result;
  }, {});
}

export function getGBPUrl(baseUrl: string = window.location.origin): string {
  return generateUTMUrl(baseUrl, UTM_PARAMETERS.googleBusinessProfile);
}

export function getSocialMediaUrls(baseUrl: string = window.location.origin) {
  return {
    instagram: generateUTMUrl(baseUrl, UTM_PARAMETERS.socialMedia.instagram),
    facebook: generateUTMUrl(baseUrl, UTM_PARAMETERS.socialMedia.facebook),
    youtube: generateUTMUrl(baseUrl, UTM_PARAMETERS.socialMedia.youtube),
  };
}

export function initializeUTMTracking(): void {
  if (typeof window === 'undefined') return;
  const attribution = getCurrentUTMParameters();
  if (Object.keys(attribution).length === 0) return;

  try {
    // Last tagged visit wins as one complete record. Never combine campaigns.
    window.sessionStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(attribution),
    );
  } catch {
    // Attribution remains available in the current URL if storage is blocked.
  }
}

export function getStoredUTMAttribution(): Record<string, string> | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!stored) return null;
    const parsed: unknown = JSON.parse(stored);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
    const record = parsed as Record<string, unknown>;

    const attribution = ATTRIBUTION_FIELDS.reduce<Record<string, string>>((result, field) => {
      if (typeof record[field] !== 'string') return result;
      const value = cleanAttributionValue(field, record[field] as string);
      if (value) result[field] = value;
      return result;
    }, {});

    return Object.keys(attribution).length > 0 ? attribution : null;
  } catch {
    return null;
  }
}

/** Resolve one campaign record, including when session storage is unavailable. */
export function getUTMAttribution(): Record<string, string> {
  const current = getCurrentUTMParameters();
  return Object.keys(current).length > 0 ? current : getStoredUTMAttribution() ?? {};
}
