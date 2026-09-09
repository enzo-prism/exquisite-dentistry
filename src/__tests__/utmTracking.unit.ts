import { afterEach, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getCurrentUTMParameters,
  getStoredUTMAttribution,
  getUTMAttribution,
  initializeUTMTracking,
} from '../utils/utmTracking';

const storage = new Map<string, string>();
const browser = {
  location: { search: '' },
  sessionStorage: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => { storage.set(key, value); },
  },
};
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
beforeEach(() => {
  storage.clear();
  browser.location.search = '';
  Object.defineProperty(globalThis, 'window', { value: browser, configurable: true });
});
afterEach(() => {
  if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow);
  else Reflect.deleteProperty(globalThis, 'window');
});

test('replaces a previous campaign as a whole and retains the new click on untagged routes', () => {
  browser.location.search = '?utm_source=google&utm_campaign=old&gclid=old-click';
  initializeUTMTracking();
  browser.location.search = '?utm_source=chatgpt&oppref=new-reference';
  assert.deepEqual(getUTMAttribution(), { utm_source: 'chatgpt', oppref: 'new-reference' });
  initializeUTMTracking();
  browser.location.search = '';
  initializeUTMTracking();
  assert.deepEqual(getUTMAttribution(), { utm_source: 'chatgpt', oppref: 'new-reference' });
});

test('keeps long click IDs and numeric runs byte-for-byte', () => {
  const token = `opaque_1234567890123456789_${'a'.repeat(300)}-end`;
  browser.location.search = `?oppref=${token}&gclid=12345678901234567890`;
  initializeUTMTracking();
  assert.equal(getCurrentUTMParameters().oppref, token);
  assert.equal(getStoredUTMAttribution()?.oppref, token);
  assert.equal(getStoredUTMAttribution()?.gclid, '12345678901234567890');
});

test('rejects malformed and oversized click IDs without silently repairing them', () => {
  browser.location.search = `?oppref=${'a'.repeat(2049)}&gclid=abc%0Adef&fbclid=user%40example.com`;
  assert.deepEqual(getCurrentUTMParameters(), {});
});

test('continues filtering personal data from freeform campaign values', () => {
  browser.location.search = '?utm_source=chatgpt&utm_term=user%40example.com&utm_content=323-555-0100';
  assert.deepEqual(getCurrentUTMParameters(), { utm_source: 'chatgpt' });
});

test('ignores malformed saved records', () => {
  for (const value of ['null', '[]', '{bad-json', '42']) {
    storage.set('exquisite_session_attribution_v2', value);
    assert.equal(getStoredUTMAttribution(), null);
  }
});

test('current attribution remains usable when storage is blocked', () => {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      location: { search: '?oppref=current-reference' },
      get sessionStorage() { throw new Error('blocked'); },
    },
  });
  assert.doesNotThrow(initializeUTMTracking);
  assert.deepEqual(getUTMAttribution(), { oppref: 'current-reference' });
});
