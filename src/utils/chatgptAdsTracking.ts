/** Consent and confirmed-submission signals for isolated campaign measurement. */
export const CHATGPT_ADS_LEAD_CONFIRMED_EVENT = 'exquisite:chatgpt-ads-lead-confirmed';
export const CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY = 'exquisite_chatgpt_ads_measurement_consent_v2';
export const CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT = 'exquisite:chatgpt-ads-measurement-consent-changed';

export type ChatGptAdsMeasurementConsent = 'granted' | 'denied' | null;
let memoryConsent: ChatGptAdsMeasurementConsent = null;
let useMemoryConsent = false;
const CONSENT_RECORD_KEY = 'exquisite_chatgpt_ads_measurement_consent_record_v2';
let memoryConsentUpdatedAt: string | null = null;

export const clearChatGptAdsMemoryConsent = () => {
  memoryConsent = null;
  memoryConsentUpdatedAt = null;
  useMemoryConsent = false;
};

export const getChatGptAdsMeasurementConsent = (): ChatGptAdsMeasurementConsent => {
  if (typeof window === 'undefined') return null;

  if (useMemoryConsent) return memoryConsent;
  try {
    const stored = window.localStorage.getItem(CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    return memoryConsent;
  }
};

/** Legacy choices have no invented timestamp and cannot authorize server delivery. */
export const getChatGptAdsConsentSnapshot = () => {
  const choice = getChatGptAdsMeasurementConsent();
  let updatedAt: string | null = null;
  if (useMemoryConsent) updatedAt = memoryConsentUpdatedAt;
  else if (typeof window !== 'undefined') {
    try {
      const record = JSON.parse(window.localStorage.getItem(CONSENT_RECORD_KEY) ?? 'null');
      if (record?.choice === choice && typeof record.updatedAt === 'string'
        && Number.isFinite(Date.parse(record.updatedAt))) updatedAt = record.updatedAt;
    } catch { /* Missing or malformed evidence must fail closed. */ }
  }
  return { choice: choice ?? 'unset', version: 'v2', updatedAt };
};

export const updateChatGptAdsMeasurementConsent = (
  consent: Exclude<ChatGptAdsMeasurementConsent, null>,
) => {
  if (typeof window === 'undefined') return;

  memoryConsent = consent;
  memoryConsentUpdatedAt = new Date().toISOString();
  try {
    window.localStorage.setItem(CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY, consent);
    window.localStorage.setItem(CONSENT_RECORD_KEY, JSON.stringify({ choice: consent, updatedAt: memoryConsentUpdatedAt }));
    useMemoryConsent = false;
  } catch {
    // Quota/privacy failures may block writes while reads still return an old choice.
    useMemoryConsent = true;
  }

  window.dispatchEvent(new CustomEvent(CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT, {
    detail: consent,
  }));
  return !useMemoryConsent;
};

export const signalChatGptAdsLeadConfirmed = (eventId: string = crypto.randomUUID()) => {
  if (typeof window === 'undefined') return false;

  window.dispatchEvent(new CustomEvent(CHATGPT_ADS_LEAD_CONFIRMED_EVENT, {
    detail: {
      eventId,
      form: 'chatgpt_ads_consultation',
      source: 'chatgpt_ads',
    },
  }));

  return true;
};
