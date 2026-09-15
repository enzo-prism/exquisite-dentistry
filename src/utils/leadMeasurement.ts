import { getChatGptAdsConsentSnapshot } from './chatgptAdsTracking';

/** Only operational form metadata receives these flags. No personal fields leave this helper. */
export const annotateLeadSubmission = (data: FormData, acquisitionLead = false) => {
  const name = String(data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const query = new URLSearchParams(window.location.search);
  const isTest = query.get('_codex_test') === 'true'
    || data.get('_codex_test') === 'true'
    || /^(?:codex tracking test|exquisite launch test)\b/i.test(name)
    || /@(?:example\.(?:com|org|net)|test\.invalid)$/i.test(email);
  const eventId = crypto.randomUUID();
  data.set('_codex_test', String(isTest));
  data.set('measurement_event_id', eventId);
  const consent = getChatGptAdsConsentSnapshot();
  data.set('measurement_event_timestamp_ms', String(Date.now()));
  data.set('measurement_ads_consent', consent.choice);
  data.set('measurement_consent_version', consent.version);
  data.set('measurement_consent_updated_at', consent.updatedAt ?? '');
  data.set('measurement_acquisition_lead', String(acquisitionLead && !isTest));
  data.set('measurement_source_url', window.location.origin + window.location.pathname);
  return { isTest, eventId };
};
