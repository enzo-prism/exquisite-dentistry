import { afterEach, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { annotateLeadSubmission } from '../utils/leadMeasurement';
import { CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY, clearChatGptAdsMemoryConsent, getChatGptAdsConsentSnapshot, updateChatGptAdsMeasurementConsent } from '../utils/chatgptAdsTracking';

const storage = new Map<string, string>();
let blockWrites = false;
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
beforeEach(() => {
  storage.clear(); blockWrites = false; clearChatGptAdsMemoryConsent();
  Object.defineProperty(globalThis, 'window', { configurable: true, value: {
    location: { origin: 'https://exquisitedentistryla.com', pathname: '/contact/', search: '?email=private@example.com' },
    dispatchEvent: () => true,
    localStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => { if (blockWrites) throw new Error('blocked'); storage.set(key, value); },
    },
  } });
});
afterEach(() => {
  clearChatGptAdsMemoryConsent();
  if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow);
  else Reflect.deleteProperty(globalThis, 'window');
});

test('legacy grants do not fabricate consent evidence', () => {
  storage.set(CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY, 'granted');
  const data = new FormData(); annotateLeadSubmission(data, true);
  assert.equal(data.get('measurement_ads_consent'), 'granted');
  assert.equal(data.get('measurement_consent_updated_at'), '');
});

test('new grant records evidence and strips personal query data from source URL', () => {
  updateChatGptAdsMeasurementConsent('granted');
  const data = new FormData(); const result = annotateLeadSubmission(data, true);
  assert.equal(data.get('measurement_event_id'), result.eventId);
  assert.equal(data.get('measurement_acquisition_lead'), 'true');
  assert.equal(data.get('measurement_ads_consent'), 'granted');
  assert.equal(data.get('measurement_consent_version'), 'v2');
  assert.ok(Date.parse(String(data.get('measurement_consent_updated_at'))) <= Number(data.get('measurement_event_timestamp_ms')));
  assert.equal(data.get('measurement_source_url'), 'https://exquisitedentistryla.com/contact/');
});

test('known tests and administrative forms cannot be acquisition leads', () => {
  const data = new FormData(); data.set('email', 'qa@example.com');
  assert.equal(annotateLeadSubmission(data, true).isTest, true);
  assert.equal(data.get('measurement_acquisition_lead'), 'false');
  const admin = new FormData(); annotateLeadSubmission(admin);
  assert.equal(admin.get('measurement_acquisition_lead'), 'false');
  assert.equal(admin.get('measurement_ads_consent'), 'unset');
});

test('revocation overrides a previously persisted grant when storage writes fail', () => {
  updateChatGptAdsMeasurementConsent('granted');
  blockWrites = true;
  updateChatGptAdsMeasurementConsent('denied');
  assert.equal(getChatGptAdsConsentSnapshot().choice, 'denied');
  const data = new FormData(); annotateLeadSubmission(data, true);
  assert.equal(data.get('measurement_ads_consent'), 'denied');
});

test('mismatched or malformed consent records do not authorize server delivery', () => {
  updateChatGptAdsMeasurementConsent('granted');
  storage.set(CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY, 'denied');
  assert.equal(getChatGptAdsConsentSnapshot().updatedAt, null);
  storage.set('exquisite_chatgpt_ads_measurement_consent_record_v2', '{broken');
  assert.equal(getChatGptAdsConsentSnapshot().updatedAt, null);
});
