/** Consent and confirmed-submission signals for isolated campaign measurement. */
export const CHATGPT_ADS_LEAD_CONFIRMED_EVENT = 'exquisite:chatgpt-ads-lead-confirmed';
export const CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY = 'exquisite_chatgpt_ads_measurement_consent_v1';
export const CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT = 'exquisite:chatgpt-ads-measurement-consent-changed';

export type ChatGptAdsMeasurementConsent = 'granted' | 'denied' | null;
let memoryConsent: ChatGptAdsMeasurementConsent = null;
let useMemoryConsent = false;

export const clearChatGptAdsMemoryConsent = () => {
  memoryConsent = null;
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

export const updateChatGptAdsMeasurementConsent = (
  consent: Exclude<ChatGptAdsMeasurementConsent, null>,
) => {
  if (typeof window === 'undefined') return;

  memoryConsent = consent;
  try {
    window.localStorage.setItem(CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY, consent);
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

export const signalChatGptAdsLeadConfirmed = () => {
  if (typeof window === 'undefined') return false;

  window.dispatchEvent(new CustomEvent(CHATGPT_ADS_LEAD_CONFIRMED_EVENT, {
    detail: {
      eventId: crypto.randomUUID(),
      form: 'chatgpt_ads_consultation',
      source: 'chatgpt_ads',
    },
  }));

  return true;
};
