/**
 * Privacy-safe handoff point for a future OpenAI Ads conversion integration.
 *
 * A listener may be registered later, after an approved conversion identifier
 * and vendor implementation are available. The event intentionally carries no
 * form contents or patient-identifying data.
 */
export const CHATGPT_ADS_LEAD_CONFIRMED_EVENT = 'exquisite:chatgpt-ads-lead-confirmed';
export const CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY = 'exquisite_chatgpt_ads_measurement_consent_v1';
export const CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT = 'exquisite:chatgpt-ads-measurement-consent-changed';

export type ChatGptAdsMeasurementConsent = 'granted' | 'denied' | null;

export const getChatGptAdsMeasurementConsent = (): ChatGptAdsMeasurementConsent => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    return null;
  }
};

export const updateChatGptAdsMeasurementConsent = (
  consent: Exclude<ChatGptAdsMeasurementConsent, null>,
) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY, consent);
  } catch {
    // Local storage can be blocked; the in-memory event still fires.
  }

  window.dispatchEvent(new CustomEvent(CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT, {
    detail: consent,
  }));
};

export const signalChatGptAdsLeadConfirmed = () => {
  if (typeof window === 'undefined') return false;

  window.dispatchEvent(new CustomEvent(CHATGPT_ADS_LEAD_CONFIRMED_EVENT, {
    detail: {
      form: 'chatgpt_ads_consultation',
      source: 'chatgpt_ads',
    },
  }));

  return true;
};
