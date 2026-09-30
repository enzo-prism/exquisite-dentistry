import { beforeEach, afterEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { getOpenAIClickReference, clearOpenAIClickReference, resetOpenAIClickCache, OPENAI_CLICK_STORAGE_KEY, OPENAI_CLICK_TTL_MS } from '../utils/openaiClickReference';
import { annotateLeadSubmission } from '../utils/leadMeasurement';
import { updateChatGptAdsMeasurementConsent, clearChatGptAdsMemoryConsent, getChatGptAdsMeasurementConsent, getChatGptAdsConsentSnapshot } from '../utils/chatgptAdsTracking';

const local = new Map<string,string>();
const session = new Map<string,string>();
const storage = (map: Map<string,string>) => ({ getItem: (k:string) => map.get(k) ?? null, setItem: (k:string,v:string) => { map.set(k,v); }, removeItem: (k:string) => { map.delete(k); } });
const browser = { location: new URL('https://exquisitedentistryla.com/lp/chatgpt/'), localStorage: storage(local), sessionStorage: storage(session), dispatchEvent: () => true, history: { state: { keep:true }, replaceState: (_state:unknown,_title:string,url:string) => { browser.location = new URL(url); } } };
const oldWindow = Object.getOwnPropertyDescriptor(globalThis,'window');
const oldNavigator = Object.getOwnPropertyDescriptor(globalThis,'navigator');
beforeEach(() => {
  browser.localStorage = storage(local);
  local.clear(); session.clear(); resetOpenAIClickCache(); clearChatGptAdsMemoryConsent();
  browser.location = new URL('https://exquisitedentistryla.com/lp/chatgpt/');
  Object.defineProperty(globalThis,'window',{ configurable:true,value:browser });
  Object.defineProperty(globalThis,'navigator',{ configurable:true,value:{ doNotTrack:'0', globalPrivacyControl:false } });
});
afterEach(() => {
  if(oldWindow) Object.defineProperty(globalThis,'window',oldWindow); else Reflect.deleteProperty(globalThis,'window');
  if(oldNavigator) Object.defineProperty(globalThis,'navigator',oldNavigator); else Reflect.deleteProperty(globalThis,'navigator');
});
test('unknown consent does not persist native identity',() => {
  browser.location.search='?oppref=original-click';
  assert.equal(getOpenAIClickReference(null,1000),undefined);
  assert.equal(local.size,0);
});
test('a new browser session retains the original consented click without extending its lifetime',() => {
  browser.location.search='?oppref=original-click';
  assert.equal(getOpenAIClickReference('granted',1000),'original-click');
  session.clear(); resetOpenAIClickCache(); browser.location.search='';
  assert.equal(getOpenAIClickReference('granted',2000),'original-click');
  assert.equal(JSON.parse(local.get(OPENAI_CLICK_STORAGE_KEY)!).capturedAt,1000);
});
test('new clicks replace identity and timestamp, repeated reads do not renew',() => {
  browser.location.search='?oppref=first'; getOpenAIClickReference('granted',1000);
  getOpenAIClickReference('granted',2000);
  assert.equal(JSON.parse(local.get(OPENAI_CLICK_STORAGE_KEY)!).capturedAt,1000);
  browser.location.search='?oppref=second'; getOpenAIClickReference('granted',3000);
  assert.deepEqual(JSON.parse(local.get(OPENAI_CLICK_STORAGE_KEY)!),{value:'second',capturedAt:3000});
});
test('expired identity cannot revive from the unchanged landing URL',() => {
  browser.location.search='?oppref=old&utm_campaign=pilot'; browser.location.hash='#form'; getOpenAIClickReference('granted',1000);
  assert.equal(getOpenAIClickReference('granted',1000+OPENAI_CLICK_TTL_MS),undefined);
  assert.equal(getOpenAIClickReference('granted',1001+OPENAI_CLICK_TTL_MS),undefined);
  assert.equal(browser.location.search,'?utm_campaign=pilot'); assert.equal(browser.location.hash,'#form');
});
test('withdrawal deletes persistent, session, and URL identity without deleting UTM fields',() => {
  browser.location.search='?oppref=old&utm_campaign=pilot'; getOpenAIClickReference('granted',1000);
  session.set('exquisite_session_attribution_v2',JSON.stringify({oppref:'old',utm_campaign:'pilot'}));
  updateChatGptAdsMeasurementConsent('denied');
  assert.equal(local.has(OPENAI_CLICK_STORAGE_KEY),false);
  assert.deepEqual(JSON.parse(session.get('exquisite_session_attribution_v2')!),{utm_campaign:'pilot'});
  updateChatGptAdsMeasurementConsent('granted');
  assert.equal(getOpenAIClickReference('granted',2000),undefined);
});
test('GPC and DNT override an earlier grant and clear click identity',() => {
  for(const property of ['globalPrivacyControl','doNotTrack']) {
    browser.location.search='?oppref=private'; updateChatGptAdsMeasurementConsent('granted'); getOpenAIClickReference('granted',1000);
    Object.defineProperty(globalThis,'navigator',{configurable:true,value:{[property]:property==='doNotTrack'?'1':true}});
    assert.equal(getChatGptAdsMeasurementConsent(),'denied'); assert.equal(local.has(OPENAI_CLICK_STORAGE_KEY),false);
    Object.defineProperty(globalThis,'navigator',{configurable:true,value:{doNotTrack:'0',globalPrivacyControl:false}});
  }
});
test('form metadata uses the exact unexpired consented native identity rather than a stale session copy',() => {
  updateChatGptAdsMeasurementConsent('granted');
  browser.location.search='?oppref=original_12345678901234567890'; getOpenAIClickReference('granted');
  browser.location.search=''; session.clear(); resetOpenAIClickCache();
  const form = new FormData(); form.set('name','Real request'); form.set('email','qa@prism.invalid'); form.set('oppref','stale');
  annotateLeadSubmission(form,true);
  assert.equal(form.get('oppref'),'original_12345678901234567890');
  clearOpenAIClickReference(); annotateLeadSubmission(form,true); assert.equal(form.get('oppref'),null);
});

test('failed decline removes the old saved grant and a reload cannot restore it', () => {
  updateChatGptAdsMeasurementConsent('granted');
  browser.localStorage.setItem = () => { throw new Error('quota'); };
  updateChatGptAdsMeasurementConsent('denied');
  assert.equal(getChatGptAdsMeasurementConsent(), 'denied');
  assert.equal(local.has('exquisite_chatgpt_ads_measurement_consent_v2'), false);
  assert.equal(local.has('exquisite_chatgpt_ads_measurement_consent_record_v2'), false);
  clearChatGptAdsMemoryConsent();
  assert.equal(getChatGptAdsMeasurementConsent(), null);
});
test('a saved grant fails closed in a new document with unwritable storage', () => {
  updateChatGptAdsMeasurementConsent('granted');
  clearChatGptAdsMemoryConsent();
  browser.localStorage.setItem = () => { throw new Error('quota'); };
  assert.equal(getChatGptAdsMeasurementConsent(), 'denied');
  assert.equal(local.has('exquisite_chatgpt_ads_measurement_consent_v2'), false);
});

test('fixed-time withdrawal and regrant create distinct consent epochs', () => {
  const realNow = Date.now;
  Date.now = () => 1_800_000_000_000;
  try {
    updateChatGptAdsMeasurementConsent('granted');
    const first = getChatGptAdsConsentSnapshot().updatedAt;
    updateChatGptAdsMeasurementConsent('denied');
    const withdrawn = getChatGptAdsConsentSnapshot().updatedAt;
    updateChatGptAdsMeasurementConsent('granted');
    const regranted = getChatGptAdsConsentSnapshot().updatedAt;
    assert.notEqual(first, withdrawn); assert.notEqual(first, regranted);
    assert.equal(Date.parse(regranted!), Date.parse(first!) + 2);
  } finally { Date.now = realNow; }
});
