import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const CHANNEL = '682fe9df-b0b0-4f5f-a027-acf963ad2113';
const EVENT_ID = '2adf0fb4-35eb-4714-923c-2622329ba7d6';
const SDK_URL = 'https://bzrcdn.openai.com/sdk/oaiq.min.js';
const CLICK_REFERENCE = 'gAAAAAb_fake_click_reference_for_isolation_test';
let officialSdk: string;
let bridge: string;

test.beforeAll(async ({ request }) => {
  // Only this public SDK GET leaves the test process. Every browser request is
  // intercepted below, including all OpenAI collection and configuration.
  const response = await request.get(SDK_URL);
  expect(response.ok()).toBe(true);
  officialSdk = await response.text();
  bridge = await readFile(new URL('../../public/measurement/openai.html', import.meta.url), 'utf8');
});

for (const navigateImmediately of [false, true]) {
test(navigateImmediately
  ? 'real SDK flushes a queued lead on immediate full-document navigation'
  : 'real SDK keeps enabled automatic matching away from parent form data', async ({ page }) => {
  const payloads: Array<{ events?: Array<{ type: string; id: string; opt_out?: boolean }>; oppref?: string; user?: unknown }> = [];
  const deniedRequests: string[] = [];
  await page.route('**/*', async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.href === SDK_URL) return route.fulfill({ contentType: 'application/javascript', body: officialSdk });
    if (url.hostname === 'bzrcdn.openai.com' && url.pathname.startsWith('/pixel-config/')) {
      return route.fulfill({ contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body: '{"automatic_advanced_matching_enabled":true}' });
    }
    if (url.hostname === 'bzr.openai.com' && url.pathname === '/v1/sdk/events') {
      if (request.postData()) payloads.push(JSON.parse(request.postData()!));
      return route.fulfill({ status: 200, body: '' });
    }
    if (url.hostname === '127.0.0.1' && url.pathname === '/measurement/openai.html') {
      return route.fulfill({ contentType: 'text/html', body: bridge });
    }
    if (url.hostname === '127.0.0.1' && url.pathname === '/isolation-test') {
      return route.fulfill({ contentType: 'text/html', body: '<!doctype html><form><label>Email<input name="email" type="email" value="sensitive-sentinel@example.test"></label><label>Phone<input name="phone" value="+12125550199"></label><button type="button">Request consultation</button></form>' });
    }
    if (url.hostname === '127.0.0.1' && url.pathname === '/navigation-complete') {
      return route.fulfill({ contentType: 'text/html', body: '<!doctype html><p>Navigation complete</p>' });
    }
    deniedRequests.push(url.origin + url.pathname);
    return route.abort();
  });

  await page.goto('/isolation-test');
  await page.evaluate(({ channel, reference }) => {
    const messages: unknown[] = [];
    Object.assign(window, { bridgeMessages: messages });
    window.addEventListener('message', (event) => messages.push(event.data));
    const frame = document.createElement('iframe');
    frame.id = 'isolated-pixel';
    frame.sandbox.add('allow-scripts');
    frame.src = `/measurement/openai.html?pixel_id=playwright-test-pixel&channel=${channel}&oppref=${encodeURIComponent(reference)}`;
    document.body.appendChild(frame);
  }, { channel: CHANNEL, reference: CLICK_REFERENCE });
  await expect.poll(() => page.evaluate(() => (window as typeof window & { bridgeMessages: Array<{ type: string }> }).bridgeMessages.some((message) => message.type === 'exquisite:openai-ready'))).toBe(true);
  await expect.poll(() => JSON.stringify(payloads).includes('"automatic_advanced_matching":"enabled"')).toBe(true);

  // Interact with recognizable form fields after AAM initialization.
  await page.getByLabel('Email').fill('sensitive-sentinel@example.test');
  await page.getByLabel('Phone').fill('+12125550199');
  await page.getByRole('button', { name: 'Request consultation' }).click();
  const frame = page.frames().find((candidate) => candidate.url().includes('/measurement/openai.html'))!;
  expect(await frame.evaluate(() => {
    try { void parent.document; return false; } catch { return true; }
  })).toBe(true);
  await page.evaluate(({ channel, eventId }) => {
    const target = (document.getElementById('isolated-pixel') as HTMLIFrameElement).contentWindow!;
    target.postMessage({ type: 'exquisite:openai-lead', channel: 'invalid', eventId }, '*');
    target.postMessage({ type: 'exquisite:openai-lead', channel, eventId: 'invalid' }, '*');
    target.postMessage({ type: 'exquisite:openai-lead', channel, eventId }, '*');
    target.postMessage({ type: 'exquisite:openai-lead', channel, eventId }, '*');
  }, { channel: CHANNEL, eventId: EVENT_ID });
  if (navigateImmediately) {
    // Observe only queue acknowledgement, without waiting for SDK batching or
    // transport. Navigating the document must trigger its actual lifecycle.
    await page.waitForFunction(() => (window as typeof window & { bridgeMessages: Array<{ type: string }> }).bridgeMessages.some((message) => message.type === 'exquisite:openai-queued'));
    await page.goto('/navigation-complete');
  }
  await expect.poll(() => payloads.flatMap((payload) => payload.events || []).filter((event) => event.type === 'lead_created').length).toBe(1);
  const leadPayload = payloads.find((payload) => payload.events?.some((event) => event.type === 'lead_created'))!;
  expect(leadPayload.oppref).toBe(CLICK_REFERENCE);
  expect(leadPayload.user).toBeUndefined();
  expect(leadPayload.events?.find((event) => event.type === 'lead_created')).toMatchObject({ id: EVENT_ID, opt_out: true });
  expect(JSON.stringify(payloads)).not.toContain('sensitive-sentinel');
  expect(JSON.stringify(payloads)).not.toContain('12125550199');
  expect(deniedRequests).toEqual([]);
});
}
