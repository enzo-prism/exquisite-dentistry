import { expect, test, type Page } from '@playwright/test';
import { installCanonicalAnalyticsHost } from './analyticsTestHost';

const prepare = async (page: Page, query = '?service=porcelain-veneers&_codex_test=true', consentChoice: 'Decline' | 'Allow measurement' = 'Decline') => {
  // Keep all tests local, including scheduler, analytics, and form endpoint.
  await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1'
    ? route.continue() : route.abort());
  await page.goto(`/schedule-consultation/${query}`);
  await page.getByRole('button', { name: consentChoice, exact: true }).click();
  return page.locator('#request-callback');
};

const fill = async (page: Page) => {
  await page.locator('#callback-name').fill('Local Fixture');
  await page.locator('#callback-phone').fill('(323) 555-0123');
  await page.locator('#callback-email').fill('fixture@example.com');
};

test('first-visit details, operational service choice, validation, and accepted callback', async ({ page }) => {
  const form = await prepare(page);
  await expect(page.getByRole('heading', { name: 'Plan your first visit' })).toBeVisible();
  await expect(page.getByText(/charges a cash fee/)).toBeVisible();
  await expect(page.locator('iframe[title="Online scheduling"]')).toHaveAttribute('src', /simplifeye/);
  await expect(page.locator('#callback-service')).toHaveValue('porcelain-veneers');
  const submit = form.getByRole('button', { name: 'Request a callback', exact: true });
  await submit.click();
  await expect(page.locator('#callback-name')).toBeFocused();
  await expect(page.locator('#callback-name-error')).toBeVisible();
  await fill(page);
  await page.locator('#callback-phone').fill('123');
  await page.locator('#callback-email').fill('wrong');
  await submit.click();
  await expect(page.locator('#callback-phone')).toBeFocused();
  await expect(page.locator('#callback-email-error')).toBeVisible();
  await fill(page);
  await page.evaluate(() => {
    const state = { requests: 0, leads: 0, payload: {} as Record<string, string> };
    Object.assign(window, { callbackTest: state });
    window.addEventListener('exquisite:chatgpt-ads-lead-confirmed', () => state.leads++);
    window.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      state.requests++;
      state.payload = Object.fromEntries(Array.from((init!.body as FormData).entries()).map(([key, value]) => [key, String(value)]));
      return new Response('{"ok":true}', { status: 200 });
    }) as typeof window.fetch;
  });
  await submit.click();
  await expect(form.getByRole('status')).toContainText('Your appointment is not booked yet.');
  const state = await page.evaluate(() => (window as typeof window & { callbackTest: { requests: number; leads: number; payload: Record<string, string> } }).callbackTest);
  expect(state.requests).toBe(1);
  expect(state.leads).toBe(0);
  expect(state.payload).toMatchObject({ form_key: 'consultation_callback', name: 'Local Fixture', phone: '(323) 555-0123', email: 'fixture@example.com', service_interest: 'porcelain-veneers', _codex_test: 'true', measurement_acquisition_lead: 'false', page_path: '/schedule-consultation/' });
  expect(state.payload.measurement_source_url).not.toContain('service=');
  await expect(page.locator('#callback-name')).toHaveCount(0);
});

test('unknown service input is dropped and email stays optional', async ({ page }) => {
  const form = await prepare(page, '?service=fixture%40patient.invalid&_codex_test=true');
  await expect(page.locator('#callback-service')).toHaveValue('');
  await page.locator('#callback-name').fill('Local Fixture');
  await page.locator('#callback-phone').fill('+44 20 7946 0958');
  await page.evaluate(() => {
    window.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      Object.assign(window, { callbackPayload: Object.fromEntries((init!.body as FormData).entries()) });
      return new Response('{"ok":true}', { status: 200 });
    }) as typeof window.fetch;
  });
  await form.getByRole('button', { name: 'Request a callback', exact: true }).click();
  await expect(form.getByRole('status')).toContainText('request was received');
  const payload = await page.evaluate(() => (window as typeof window & { callbackPayload: Record<string, string> }).callbackPayload);
  expect(payload).not.toHaveProperty('service_interest');
  expect(payload).not.toHaveProperty('email');
});

test('duplicate submits are locked and failed delivery preserves input for manual retry', async ({ page }) => {
  const form = await prepare(page);
  await fill(page);
  await page.evaluate(() => {
    const state = { requests: 0, leads: 0 };
    Object.assign(window, { callbackTest: state });
    window.addEventListener('exquisite:chatgpt-ads-lead-confirmed', () => state.leads++);
    window.fetch = (async () => {
      state.requests++;
      await new Promise(resolve => setTimeout(resolve, 100));
      return new Response('{}', { status: state.requests === 1 ? 500 : 200 });
    }) as typeof window.fetch;
  });
  const submit = form.getByRole('button', { name: 'Request a callback', exact: true });
  await submit.evaluate(button => {
    const form = button.closest('form')!;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
  await expect(form.getByRole('alert')).toContainText('We couldn’t confirm your request.');
  await expect(page.locator('#callback-phone')).toHaveValue('(323) 555-0123');
  expect(await page.evaluate(() => (window as typeof window & { callbackTest: object }).callbackTest)).toEqual({ requests: 1, leads: 0 });
  await submit.click();
  await expect(form.getByRole('status')).toContainText('Your appointment is not booked yet.');
  expect(await page.evaluate(() => (window as typeof window & { callbackTest: object }).callbackTest)).toEqual({ requests: 2, leads: 0 });
});

test('honeypot never sends a form or counts a conversion', async ({ page }) => {
  const form = await prepare(page);
  await page.evaluate(() => {
    const state = { requests: 0, leads: 0 };
    Object.assign(window, { callbackTest: state });
    window.addEventListener('exquisite:chatgpt-ads-lead-confirmed', () => state.leads++);
    window.fetch = (async () => {
      state.requests++;
      throw new Error('Honeypot must never submit');
    }) as typeof window.fetch;
  });
  await page.locator('#callback-honeypot').evaluate((input: HTMLInputElement) => {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
    setter.call(input, 'spam');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await form.getByRole('button', { name: 'Request a callback', exact: true }).click();
  await expect(form.getByRole('status')).toContainText('request was received');
  expect(await page.evaluate(() => (window as typeof window & { callbackTest: object }).callbackTest)).toEqual({ requests: 0, leads: 0 });
});

test('timeout releases the request lock without automatically retrying or claiming success', async ({ page }) => {
  const form = await prepare(page);
  await fill(page);
  await page.evaluate(() => {
    const state = { requests: 0, leads: 0 };
    Object.assign(window, { callbackTest: state });
    window.addEventListener('exquisite:chatgpt-ads-lead-confirmed', () => state.leads++);
    const schedule = window.setTimeout.bind(window);
    window.setTimeout = ((handler: TimerHandler, delay?: number, ...args: unknown[]) =>
      schedule(handler, delay === 12_000 ? 25 : delay, ...args)) as typeof window.setTimeout;
    window.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      state.requests++;
      if (state.requests === 1) return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
      });
      return new Response('{"ok":true}', { status: 200 });
    }) as typeof window.fetch;
  });
  const submit = form.getByRole('button', { name: 'Request a callback', exact: true });
  await submit.click();
  await expect(form.getByRole('alert')).toContainText('We couldn’t confirm your request.');
  await expect(page.locator('#callback-name')).toHaveValue('Local Fixture');
  await expect(submit).toBeEnabled();
  expect(await page.evaluate(() => (window as typeof window & { callbackTest: object }).callbackTest)).toEqual({ requests: 1, leads: 0 });
  await submit.click();
  await expect(form.getByRole('status')).toContainText('request was received');
});

test('mobile visitors can jump to either booking path without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await prepare(page);
  await page.getByRole('link', { name: 'Request a callback', exact: true }).click();
  await expect(page).toHaveURL(/#request-callback$/);
  await expect(page.locator('#callback-name')).toBeInViewport();
  await page.getByRole('link', { name: 'Book Online', exact: true }).click();
  await expect(page).toHaveURL(/#book-online$/);
  await expect(page.getByRole('heading', { name: 'Book Online', exact: true })).toBeInViewport();
  await expect.poll(async () => {
    const heading = await page.getByRole('heading', { name: 'Book Online', exact: true }).boundingBox();
    const header = await page.locator('header').boundingBox();
    return Boolean(heading && header && heading.y >= header.y + header.height);
  }).toBe(true);
  const link = page.getByRole('link', { name: 'Open scheduling in a new tab', exact: true });
  await expect(link).toHaveAttribute('target', '_blank');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

for (const width of [375, 390, 430]) {
  test(`callback treatment choice stays readable and at least 44px tall at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await prepare(page);
    const select = page.locator('#callback-service');
    await select.scrollIntoViewIfNeeded();
    await expect(select).toHaveValue('porcelain-veneers');
    await expect(select.locator('option:checked')).toHaveText('Porcelain veneers');
    const bounds = await select.boundingBox();
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
    expect(bounds!.width).toBeGreaterThan(200);
    expect(await select.evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(16);
    expect(await select.evaluate(element => {
      const styles = getComputedStyle(element);
      const availableHeight = element.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
      return availableHeight >= parseFloat(styles.lineHeight);
    })).toBe(true);
    await select.selectOption('invisalign');
    await expect(select.locator('option:checked')).toHaveText('Invisalign');
  });
}

test('a genuine accepted callback counts as an inquiry without an automatic acquisition conversion', async ({ page }) => {
  await installCanonicalAnalyticsHost(page);
  const form = await prepare(page, '?service=invisalign', 'Allow measurement');
  await fill(page);
  await page.locator('#callback-email').fill('fixture@patient.invalid');
  await page.evaluate(() => {
    const state = { requests: 0, leads: 0, payload: {} as Record<string, string>, analytics: [] as string[] };
    Object.assign(window, { callbackTest: state });
    window.addEventListener('exquisite:chatgpt-ads-lead-confirmed', () => state.leads++);
    Object.assign(window, { va: (action: string, payload?: { name?: string }) => {
      if (action === 'event' && payload?.name) state.analytics.push(payload.name);
    } });
    window.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      state.requests++;
      state.payload = Object.fromEntries(Array.from((init!.body as FormData).entries()).map(([key, value]) => [key, String(value)]));
      return new Response('{"ok":true}', { status: 200 });
    }) as typeof window.fetch;
  });
  await form.getByRole('button', { name: 'Request a callback', exact: true }).click();
  await expect(form.getByRole('status')).toContainText('Your appointment is not booked yet.');
  const state = await page.evaluate(() => (window as typeof window & { callbackTest: { requests: number; leads: number; payload: Record<string, string>; analytics: string[] } }).callbackTest);
  expect(state.requests).toBe(1);
  expect(state.leads).toBe(0);
  expect(state.analytics.filter(name => name === 'Contact Form Submitted')).toHaveLength(1);
  expect(state.analytics).not.toContain('Acquisition Lead');
  expect(await page.evaluate(() => (window.dataLayer ?? []).some(entry => {
    const command = Array.from(entry as ArrayLike<unknown>);
    return command[0] === 'event' && command[1] === 'generate_lead';
  }))).toBe(false);
  expect(state.payload).toMatchObject({ _codex_test: 'false', measurement_acquisition_lead: 'false', form_key: 'consultation_callback', service_interest: 'invisalign' });
});
