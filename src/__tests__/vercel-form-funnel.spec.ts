import { expect, test, type Page } from '@playwright/test';
import { installCanonicalAnalyticsHost } from './analyticsTestHost';

type RecordedEvent = { name: string; data: Record<string, unknown> };
type MeasurementWindow = Window & {
  va: (...args: unknown[]) => void;
  recordedEvents: RecordedEvent[];
  recordedPageviews: { route: string; path: string }[];
  analyticsBeforeSend?: (event: { type: string; url: string }) => { url: string } | null;
};

const events = (page: Page) => page.evaluate(() => (window as unknown as MeasurementWindow).recordedEvents);
// Development Strict Mode repeats SDK effects. Count distinct navigation
// commands here; production network delivery is verified after deployment.
const pageviewPaths = (page: Page) => page.evaluate(() => (
  [...new Set((window as unknown as MeasurementWindow).recordedPageviews.map(e => e.path))]
));

test.beforeEach(async ({ page }) => {
  await installCanonicalAnalyticsHost(page);
  await page.route(/googletagmanager|google-analytics|googleadservices|vercel-scripts|vercel-insights|\/_vercel\/|bzrcdn.openai.com/, route => route.fulfill({ contentType: 'application/javascript', body: '' }));
  await page.addInitScript(() => {
    localStorage.setItem('exquisite_analytics_consent_v2', 'granted');
    localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2', 'granted');
    const w = window as unknown as MeasurementWindow;
    w.recordedEvents = [];
    w.recordedPageviews = [];
    w.va = (action, value) => {
      if (action === 'event') w.recordedEvents.push(value as RecordedEvent);
      if (action === 'pageview') w.recordedPageviews.push(value as { route: string; path: string });
      if (action === 'beforeSend') w.analyticsBeforeSend = value as MeasurementWindow['analyticsBeforeSend'];
    };
  });
});

test('consultation funnel counts one start, attempts, validation and accepted acquisition without values', async ({ page }) => {
  let submissions = 0;
  await page.route('https://formspree.io/**', route => {
    submissions++;
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await page.goto('/lp/chatgpt/?utm_source=chatgpt&utm_campaign=local_fixture&utm_content=01_practitioner');
  await page.getByLabel('Name', { exact: true }).fill('Privacy Fixture Person');
  await page.getByLabel('Name', { exact: true }).fill('Privacy Fixture Person Updated');
  await page.getByRole('button', { name: 'Request my consultation' }).click();
  expect((await events(page)).filter(e => e.name === 'Contact Form Started')).toEqual([
    { name: 'Contact Form Started', data: { form: 'consultation_request' } },
  ]);
  expect((await events(page)).find(e => e.name === 'Contact Form Validation Failed')?.data)
    .toMatchObject({ form: 'consultation_request', field_count: 1 });
  expect(submissions).toBe(0);
  await page.getByLabel('Email', { exact: true }).fill('private-fixture@example.test');
  await page.getByRole('button', { name: 'Request my consultation' }).click();
  await expect(page.getByRole('heading', { name: 'Request received' })).toBeVisible();
  const recorded = await events(page);
  expect(recorded.filter(e => e.name === 'Contact Form Submit Attempted')).toHaveLength(2);
  expect(recorded.filter(e => e.name === 'Contact Form Submitted')).toEqual([
    { name: 'Contact Form Submitted', data: { form: 'consultation_request' } },
  ]);
  expect(recorded.filter(e => e.name === 'Acquisition Lead')).toHaveLength(1);
  expect(submissions).toBe(1);
  for (const e of recorded) expect(Object.keys(e.data).length).toBeLessThanOrEqual(2);
  expect(JSON.stringify(recorded)).not.toMatch(/Privacy Fixture|private-fixture|example\.test|not_sure|porcelain|event_id|oppref/);
});

test('provider rejection records failure and no accepted request or acquisition', async ({ page }) => {
  await page.route('https://formspree.io/**', route => route.fulfill({ status: 503 }));
  await page.goto('/lp/chatgpt/');
  await page.getByLabel('Name', { exact: true }).fill('Fixture Person');
  await page.getByLabel('Email', { exact: true }).fill('fixture@example.test');
  await page.getByRole('button', { name: 'Request my consultation' }).click();
  await expect(page.getByRole('alert')).toContainText("couldn't confirm");
  expect((await events(page)).find(e => e.name === 'Contact Form Failed')?.data)
    .toEqual({ form: 'consultation_request', reason: 'formspree_request_failed' });
  expect((await events(page)).filter(e => /Submitted|Acquisition/.test(e.name))).toEqual([]);
});

test('main contact form has a distinct label', async ({ page }) => {
  await page.goto('/contact/');
  await page.locator('#name').fill('Fixture Person');
  await page.getByRole('button', { name: 'Send Message', exact: true }).click();
  const recorded = await events(page);
  expect(recorded.find(e => e.name === 'Contact Form Started')?.data.form).toBe('website_contact');
  expect(recorded.find(e => e.name === 'Contact Form Submit Attempted')?.data.form).toBe('website_contact');
  expect(recorded.find(e => e.name === 'Contact Form Validation Failed')?.data.form).toBe('website_contact');
});

test('consent denied blocks funnel; granting later records the next interaction once', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('exquisite_analytics_consent_v2', 'denied');
    localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2', 'denied');
  });
  await page.goto('/lp/chatgpt/');
  await page.getByLabel('Name', { exact: true }).fill('Fixture');
  await page.getByRole('button', { name: 'Request my consultation' }).click();
  expect(await events(page)).toEqual([]);
  await page.getByRole('button', { name: 'Privacy choices' }).click();
  await page.getByRole('button', { name: 'Allow measurement' }).click();
  await page.getByLabel('Name', { exact: true }).fill('Fixture Updated');
  await page.getByLabel('Email', { exact: true }).fill('fixture@example.test');
  expect((await events(page)).filter(e => e.name === 'Contact Form Started')).toHaveLength(1);
});

test('explicit QA visits stay excluded across document navigation', async ({ page }) => {
  await page.goto('/lp/chatgpt/?_codex_test=true');
  await page.getByLabel('Name', { exact: true }).fill('Fixture');
  await page.getByRole('button', { name: 'Request my consultation' }).click();
  expect(await events(page)).toEqual([]);
  await expect(page.locator('script[src*="vercel"]')).toHaveCount(0);
  await page.goto('/contact/');
  await page.locator('#name').fill('Fixture');
  expect(await events(page)).toEqual([]);
  await expect(page.locator('script[src*="vercel"]')).toHaveCount(0);
});

test('campaign context survives navigation and sends no click references or personal query values', async ({ page }) => {
  await page.goto('/lp/chatgpt/?utm_source=chatgpt&utm_medium=paid&utm_campaign=local_fixture&utm_content=02_veneer_intent&oppref=opaque&email=fixture%40example.test#private');
  await expect.poll(() => pageviewPaths(page)).toEqual([
    '/lp/chatgpt?utm_source=chatgpt&utm_medium=paid&utm_campaign=local_fixture&utm_content=02_veneer_intent',
  ]);
  await page.goto('/contact/');
  await expect.poll(() => pageviewPaths(page)).toEqual([
    '/contact?utm_source=chatgpt&utm_medium=paid&utm_campaign=local_fixture&utm_content=02_veneer_intent',
  ]);
  const measuredUrl = await page.evaluate(() => (window as unknown as MeasurementWindow).analyticsBeforeSend?.({
    type: 'event', url: window.location.href,
  })?.url);
  expect(measuredUrl).toBe('http://127.0.0.1:4179/contact?utm_source=chatgpt&utm_medium=paid&utm_campaign=local_fixture&utm_content=02_veneer_intent');
  expect(measuredUrl).not.toMatch(/oppref|email|example\.test|#private/);
});

test('honeypots never emit attempts or starts', async ({ page }) => {
  await page.goto('/lp/chatgpt/');
  await page.locator('#chatgpt-ads-bot-field').evaluate((el: HTMLInputElement) => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(el, 'bot');
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.getByRole('button', { name: 'Request my consultation' }).click();
  await expect(page.getByRole('heading', { name: 'Request received' })).toBeVisible();
  expect(await events(page)).toEqual([]);
});

test('early consented events queue safely before the SDK and redact unsafe properties', async ({ page }) => {
  await page.goto('/lp/chatgpt/');
  const queued = await page.evaluate(async () => {
    const w = window as Window;
    delete w.va;
    delete w.vaq;
    const modulePath = '/src/utils/vercelAnalytics.ts';
    const { trackVercelEvent } = await import(modulePath);
    const accepted = trackVercelEvent('Fixture Event', {
      private: 'person%40example.test', phone: '+1 323 555 0199',
      invalid: Number.NaN, form: 'consultation_request', reason: 'fixture', extra: 'unused',
    });
    return { accepted, queue: w.vaq };
  });
  expect(queued.accepted).toBe(true);
  expect(queued.queue).toEqual([['event', {
    name: 'Fixture Event', data: { form: 'consultation_request', reason: 'fixture' },
  }]]);
});
