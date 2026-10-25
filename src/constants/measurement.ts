/** Fixed layout labels only. Never derive analytics dimensions from form answers. */
export type AnalyticsFormType = 'consultation_request' | 'website_contact' | 'callback_request' | 'website_other';

export const getAnalyticsFormType = (form: string): AnalyticsFormType => (
  form === 'chatgpt_ads_consultation' ? 'consultation_request'
    : form === 'contact_form' ? 'website_contact'
      : form === 'consultation_callback' ? 'callback_request' : 'website_other'
);
