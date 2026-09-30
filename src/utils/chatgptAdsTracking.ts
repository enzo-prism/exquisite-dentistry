import { clearOpenAIClickReference } from './openaiClickReference';
/** Consent and confirmed-submission signals for isolated campaign measurement. */
export const CHATGPT_ADS_LEAD_CONFIRMED_EVENT = 'exquisite:chatgpt-ads-lead-confirmed';
export const CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY = 'exquisite_chatgpt_ads_measurement_consent_v2';
export const CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT = 'exquisite:chatgpt-ads-measurement-consent-changed';

export type ChatGptAdsMeasurementConsent = 'granted' | 'denied' | null;
let memoryConsent: ChatGptAdsMeasurementConsent = null;
let useMemoryConsent = false;
export const CHATGPT_ADS_CONSENT_RECORD_KEY = 'exquisite_chatgpt_ads_measurement_consent_record_v2';
let memoryConsentUpdatedAt: string | null = null;

export const clearChatGptAdsMemoryConsent = () => {
  memoryConsent = null;
  memoryConsentUpdatedAt = null;
  useMemoryConsent = false;
};

export const getChatGptAdsMeasurementConsent = (): ChatGptAdsMeasurementConsent => {
  if (typeof window === 'undefined') return null;

  if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true || navigator.doNotTrack === '1') {
    clearOpenAIClickReference();
    return 'denied';
  }
  if (useMemoryConsent) return memoryConsent;
  try {
    const stored = window.localStorage.getItem(CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY);
    if (stored === 'granted') {
      // A persisted grant cannot authorize a new document when storage is now
      // unwritable: a later withdrawal might otherwise leave that grant behind.
      try { window.localStorage.setItem(CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY, stored); }
      catch {
        memoryConsent = 'denied'; useMemoryConsent = true;
        clearOpenAIClickReference();
        try { window.localStorage.removeItem(CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY); } catch { /* Best effort. */ }
        try { window.localStorage.removeItem(CHATGPT_ADS_CONSENT_RECORD_KEY); } catch { /* Best effort. */ }
        return 'denied';
      }
    }
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
      const record = JSON.parse(window.localStorage.getItem(CHATGPT_ADS_CONSENT_RECORD_KEY) ?? 'null');
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

  if (consent === 'denied') clearOpenAIClickReference();
  let previous = memoryConsentUpdatedAt;
  try {
    const record = JSON.parse(window.localStorage.getItem(CHATGPT_ADS_CONSENT_RECORD_KEY) ?? 'null');
    if (typeof record?.updatedAt === 'string' && Number.isFinite(Date.parse(record.updatedAt))
      && (!previous || Date.parse(record.updatedAt) > Date.parse(previous))) previous = record.updatedAt;
  } catch { /* Memory evidence remains available when storage fails. */ }
  const priorTime = previous ? Date.parse(previous) : NaN;
  memoryConsent = consent;
  // Distinct epochs remain distinct even under a fixed or backward wall clock.
  memoryConsentUpdatedAt = new Date(Math.max(Date.now(), Number.isFinite(priorTime) ? priorTime + 1 : 0)).toISOString();
  try {
    window.localStorage.setItem(CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY, consent);
    window.localStorage.setItem(CHATGPT_ADS_CONSENT_RECORD_KEY, JSON.stringify({ choice: consent, updatedAt: memoryConsentUpdatedAt }));
    useMemoryConsent = false;
  } catch {
    // Quota/privacy failures may block writes while reads still return an old choice.
    useMemoryConsent = true;
    if (consent === 'denied') {
      try { window.localStorage.removeItem(CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY); } catch { /* Best effort. */ }
      try { window.localStorage.removeItem(CHATGPT_ADS_CONSENT_RECORD_KEY); } catch { /* Best effort. */ }
    }
  }

  window.dispatchEvent(new CustomEvent(CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT, {
    detail: consent,
  }));
  return !useMemoryConsent;
};

export const signalChatGptAdsLeadConfirmed = (eventId: string = crypto.randomUUID(), openaiClickReference?: string, consentUpdatedAt?: string | null) => {
  if (typeof window === 'undefined') return false;

  window.dispatchEvent(new CustomEvent(CHATGPT_ADS_LEAD_CONFIRMED_EVENT, {
    detail: {
      eventId,
      ...(openaiClickReference ? { openaiClickReference } : {}),
      ...(consentUpdatedAt !== undefined ? { consentUpdatedAt } : {}),
      form: 'chatgpt_ads_consultation',
      source: 'chatgpt_ads',
    },
  }));

  return true;
};
