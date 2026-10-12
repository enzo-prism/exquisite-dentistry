import { expect, test, type Page } from '@playwright/test';

const productionOrigin = 'https://exquisitedentistryla.com';
const endpoint = 'https://formspree.io/f/xkgknpkl';
const privateFixtures = ['Measurement Fixture', 'fixture@example.test', 'Private appointment message'];
const campaignId = 'cmpn_1234567890abcdef1234567890abcdef';
const adId = 'ad_abcdef1234567890abcdef1234567890';

type TestWindow = Window & {
  __mockLeads?: string[];
  __veneersDocument?: boolean;
};

async function installMockProviders(page: Page, baseURL: string, production = true, documentOrigin = productionOrigin) {
  const submissions: string[] = [];
  let status = 200;
  await page.addInitScript(() => {
    (window as TestWindow).__mockLeads = [];
    window.addEventListener('message', event => {
      if (event.data?.type === 'fixture:lead') (window as TestWindow).__mockLeads!.push(event.data.eventId);
    });
  });
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.href === endpoint) {
      submissions.push(route.request().postData() ?? '');
      return route.fulfill({ status, json: status === 200 ? { ok: true } : { errors: ['Mocked failure'] } });
    }
    if (url.pathname === '/measurement/openai.html') {
      return route.fulfill({ contentType: 'text/html', body: `<!doctype html><script>
const channel = new URLSearchParams(location.search).get('channel');
addEventListener('message', event => {
  if (event.data?.type !== 'exquisite:openai-lead' || event.data.channel !== channel) return;
  parent.postMessage({type:'fixture:lead',eventId:event.data.eventId}, '*');
  parent.postMessage({type:'exquisite:openai-queued',channel,eventId:event.data.eventId}, '*');
});
parent.postMessage({type:'exquisite:openai-ready',channel}, '*');
</script>` });
    }
    // A published-site run already has the correct document origin. Proxy only
    // virtual origins used by local fixtures; late asset fulfillment can race
    // with WebKit reload cancellation when the actual origin is proxied.
    if (url.origin === new URL(baseURL).origin) return route.continue();
    if (url.origin === documentOrigin && production) {
      const response = await page.request.get(`${baseURL}${url.pathname}${url.search}`, { maxRedirects: 0 });
      return route.fulfill({ response });
    }
    return route.abort();
  });
  return { submissions, setStatus: (value: number) => { status = value; } };
}

// Document reloads can leave mocked font fetches in flight in WebKit. Drain
// their handlers before closing the page so teardown cannot mask assertions.
test.afterEach(async ({ page }) => {
  await page.unrouteAll({ behavior: 'wait' });
});

async function readCommands(page: Page) {
  return page.evaluate(() => (window.dataLayer ?? []).map(entry => Array.from(entry as ArrayLike<unknown>)));
}

async function fillContact(page: Page, email = privateFixtures[1]) {
  const form = page.locator('form[name="Main Contact Form"]');
  await form.locator('[name="form_fields[first_name]"]').fill('Measurement');
  await form.locator('[name="form_fields[last_name]"]').fill('Fixture');
  await form.locator('[name="form_fields[email]"]').fill(email);
  await form.locator('[name="form_fields[message]"]').fill(privateFixtures[2]);
  return form;
}

test('new visitor gets default-denied consent, one safe pageview, and isolated banner styles', async ({ page, baseURL }) => {
  await installMockProviders(page, baseURL!);
  const moduleResponse = await page.request.get(`${baseURL}/veneers/measurement-entry.js`);
  expect(moduleResponse.status()).toBe(200);
  expect(moduleResponse.headers()['content-type']).toMatch(/(?:text|application)\/javascript/);
  expect(await moduleResponse.text()).not.toContain('<div id="root">');
  await page.goto(`${productionOrigin}/veneers/?utm_source=ad&utm_term=fixture%40example.test&email=fixture%40example.test&oppref=click-reference`);
  await expect(page.getByRole('button', { name: 'Allow measurement', exact: true })).toBeVisible();
  await expect(page.locator('#veneers-measurement')).toHaveCount(1);
  await expect.poll(async () => (await readCommands(page)).filter(c => c[0] === 'event' && c[1] === 'page_view').length).toBe(1);
  const commands = await readCommands(page);
  expect(commands.find(c => c[0] === 'consent' && c[1] === 'default')?.[2]).toMatchObject({
    analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  });
  const configs = commands.filter(c => c[0] === 'config');
  expect(configs.map(c => c[1])).toEqual(['G-1MZGF2XNB5', 'AW-11373090310']);
  for (const command of configs) expect(command[2]).toMatchObject({ send_page_view: false, allow_google_signals: false });
  expect(JSON.stringify(commands)).not.toContain('fixture@example.test');
  expect(JSON.stringify(commands)).not.toContain('click-reference');
  expect(await page.locator('iframe[id^="openai-ads-measurement-frame"]').count()).toBe(0);
  expect(await page.evaluate(() => localStorage.getItem('exquisite_openai_click_v1'))).toBeNull();
  expect(await page.evaluate(() => [...document.querySelectorAll('script[src]')].filter(s => /facebook|hotjar|crazyegg|googlesitekit|gtm\.js/.test(s.getAttribute('src') ?? '')).length)).toBe(0);
  expect(await page.evaluate(() => [...document.querySelectorAll('style')].some(s => s.textContent?.includes('Your analytics choice') || s.textContent?.includes('.veneers-preferences')))).toBe(false);
  expect(await page.locator('#veneers-measurement').evaluate(host => host.shadowRoot?.querySelector('style')?.textContent?.includes('.veneers-preferences'))).toBe(true);
  await page.getByRole('button', { name: 'Allow measurement', exact: true }).click();
  await expect(page.locator('iframe[id^="openai-ads-measurement-frame"]')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Allow measurement', exact: true })).toHaveCount(0);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('exquisite_openai_click_v1') ?? 'null')?.value)).toBe('click-reference');
  await page.getByRole('button', { name: 'Analytics preferences', exact: true }).click();
  const reload = page.waitForEvent('framenavigated', frame => frame === page.mainFrame());
  await page.getByRole('button', { name: 'Decline', exact: true }).click();
  await reload;
  await expect(page.getByRole('button', { name: 'Analytics preferences', exact: true })).toBeVisible();
  await expect(page.locator('iframe[id^="openai-ads-measurement-frame"]')).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('exquisite_analytics_consent_v2'))).toBe('denied');
  expect(await page.evaluate(() => localStorage.getItem('exquisite_openai_click_v1'))).toBeNull();
  await expect(page).not.toHaveURL(/oppref=/);
});

test('consent privacy link opens a full main-site document', async ({ page, baseURL }) => {
  await installMockProviders(page, baseURL!);
  await page.goto(`${productionOrigin}/veneers/`);
  await page.getByText('Details and privacy', { exact: true }).click();
  await page.evaluate(() => { (window as TestWindow).__veneersDocument = true; });
  await page.getByRole('link', { name: 'Privacy Policy', exact: true }).click();
  await expect(page).toHaveURL(/\/privacy-policy\/?$/);
  await page.waitForLoadState('networkidle');
  expect(await page.evaluate(() => (window as TestWindow).__veneersDocument)).toBeUndefined();
  await expect(page.locator('#veneers-measurement')).toHaveCount(0);
  await expect(page.locator('#root')).toHaveCount(1);
});

test('confirmed real response records one lead with consented attribution and no form answers', async ({ page, baseURL }) => {
  const mock = await installMockProviders(page, baseURL!);
  await page.goto(`${productionOrigin}/veneers/contact/?utm_source=chatgpt&utm_id=${campaignId}&utm_content=${adId}&gclid=exact-click-reference&oppref=openai-reference`);
  await page.getByRole('button', { name: 'Allow measurement', exact: true }).click();
  const form = await fillContact(page);
  await form.locator('button[type="submit"]').click();
  await expect(form.locator('.elementor-message-success')).toBeVisible();
  expect(mock.submissions).toHaveLength(1);
  const body = mock.submissions[0];
  for (const value of ['chatgpt', 'exact-click-reference', 'openai-reference', 'measurement_acquisition_lead', 'measurement_ads_consent', 'measurement_event_id']) expect(body).toContain(value);
  expect(body).toContain(`name="utm_id"\r\n\r\n${campaignId}`);
  expect(body).toContain(`name="utm_content"\r\n\r\n${adId}`);
  await expect.poll(async () => (await readCommands(page)).filter(c => c[0] === 'event' && c[1] === 'generate_lead').length).toBe(1);
  await expect.poll(() => page.evaluate(() => (window as TestWindow).__mockLeads!.length)).toBe(1);
  const events = (await readCommands(page)).filter(c => c[0] === 'event');
  for (const fixture of privateFixtures) expect(JSON.stringify(events)).not.toContain(fixture);
  expect(JSON.stringify(events.filter(c => c[1] !== 'page_view'))).not.toContain('openai-reference');
  expect(JSON.stringify(events.filter(c => c[1] !== 'page_view'))).not.toContain('exact-click-reference');
});

test('provider failure and explicit QA success do not record leads', async ({ page, baseURL }) => {
  const mock = await installMockProviders(page, baseURL!);
  await page.goto(`${productionOrigin}/veneers/contact/`);
  await page.getByRole('button', { name: 'Allow measurement', exact: true }).click();
  mock.setStatus(422);
  const form = await fillContact(page);
  await form.locator('button[type="submit"]').click();
  await expect(form.locator('.elementor-message-danger')).toBeVisible();
  expect((await readCommands(page)).filter(c => c[0] === 'event' && c[1] === 'generate_lead')).toHaveLength(0);
  expect(await page.evaluate(() => (window as TestWindow).__mockLeads!.length)).toBe(0);
  mock.setStatus(200);
  await page.goto(`${productionOrigin}/veneers/contact/?_codex_test=true`);
  const qaForm = await fillContact(page);
  await qaForm.locator('button[type="submit"]').click();
  await expect(qaForm.locator('.elementor-message-success')).toBeVisible();
  expect(mock.submissions).toHaveLength(2);
  expect(mock.submissions[1]).toMatch(/name="_codex_test"\r?\n\r?\ntrue/);
  expect(mock.submissions[1]).toMatch(/name="measurement_acquisition_lead"\r?\n\r?\nfalse/);
  expect((await readCommands(page)).filter(c => c[0] === 'event' && c[1] === 'generate_lead')).toHaveLength(0);
  expect(await page.evaluate(() => (window as TestWindow).__mockLeads!.length)).toBe(0);
});

test('localhost simulation sends no request or lead and optional vendors stay off', async ({ page, baseURL }) => {
  test.skip(!['localhost', '127.0.0.1', '[::1]'].includes(new URL(baseURL!).hostname), 'Local simulation is only exercised on localhost.');
  const mock = await installMockProviders(page, baseURL!, false);
  await page.goto('/veneers/contact/?utm_source=local-review&oppref=local-click');
  await page.getByRole('button', { name: 'Allow measurement', exact: true }).click();
  const form = await fillContact(page);
  await form.locator('button[type="submit"]').click();
  await expect(form.locator('.elementor-message-success')).toHaveText('Local preview successful. No data was sent.');
  expect(mock.submissions).toHaveLength(0);
  expect(await page.locator('script[data-name="google-tag"]')).toHaveCount(0);
  expect(await page.locator('iframe[id^="openai-ads-measurement-frame"]')).toHaveCount(0);
  expect((await readCommands(page)).filter(c => c[0] === 'event' && c[1] === 'generate_lead')).toHaveLength(0);
  expect(await page.evaluate(() => (window as TestWindow).__mockLeads!.length)).toBe(0);
});

test('honeypot never sends a request and preview inquiries are marked as test traffic', async ({ page, baseURL }) => {
  const previewOrigin = 'https://exquisite-review.vercel.app';
  const mock = await installMockProviders(page, baseURL!, true, previewOrigin);
  await page.goto(`${previewOrigin}/veneers/contact/?utm_source=preview-fixture`);
  await page.getByRole('button', { name: 'Allow measurement', exact: true }).click();
  const form = await fillContact(page);
  await form.locator('[name="_gotcha"]').evaluate((field: HTMLInputElement) => { field.value = 'spam'; });
  await form.locator('button[type="submit"]').click();
  await expect(form).toHaveAttribute('data-submitting', 'false');
  expect(mock.submissions).toHaveLength(0);
  await form.locator('[name="_gotcha"]').evaluate((field: HTMLInputElement) => { field.value = ''; });
  await form.locator('button[type="submit"]').click();
  await expect(form.locator('.elementor-message-success')).toBeVisible();
  expect(mock.submissions).toHaveLength(1);
  expect(mock.submissions[0]).toMatch(/name="_codex_test"\r?\n\r?\ntrue/);
  expect(mock.submissions[0]).toMatch(/name="measurement_acquisition_lead"\r?\n\r?\nfalse/);
  expect(mock.submissions[0]).toContain('preview-fixture');
  expect(await page.locator('script[data-name="google-tag"]')).toHaveCount(0);
  expect(await page.locator('iframe[id^="openai-ads-measurement-frame"]')).toHaveCount(0);
  expect((await readCommands(page)).filter(c => c[0] === 'event' && c[1] === 'generate_lead')).toHaveLength(0);
});

test('optional measurement failures cannot prevent or misreport provider acceptance', async ({ page, baseURL }) => {
  const mock = await installMockProviders(page, baseURL!);
  for (const method of ['annotate', 'confirmed'] as const) {
    await page.goto(`${productionOrigin}/veneers/contact/`);
    const allow = page.getByRole('button', { name: 'Allow measurement', exact: true });
    if (await allow.isVisible()) await allow.click();
    await expect(page.getByRole('button', { name: 'Analytics preferences', exact: true })).toBeVisible();
    await page.evaluate(method => {
      window.exquisiteVeneersMeasurement![method] = () => { throw new Error('Mocked optional measurement failure'); };
    }, method);
    const form = await fillContact(page);
    await form.locator('button[type="submit"]').click();
    await expect(form.locator('.elementor-message-success')).toBeVisible();
    await expect(form.locator('.elementor-message-danger')).toHaveCount(0);
  }
  expect(mock.submissions).toHaveLength(2);
  expect((await readCommands(page)).filter(c => c[0] === 'event' && c[1] === 'generate_lead')).toHaveLength(0);
});
