/**
 * Privacy-safe handoff point for a future OpenAI Ads conversion integration.
 *
 * A listener may be registered later, after an approved conversion identifier
 * and vendor implementation are available. The event intentionally carries no
 * form contents or patient-identifying data.
 */
export const CHATGPT_ADS_LEAD_CONFIRMED_EVENT = 'exquisite:chatgpt-ads-lead-confirmed';

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
