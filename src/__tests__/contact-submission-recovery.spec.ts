import { expect, test, type Page } from '@playwright/test';

const prepareForm = async (page: Page, benefits: boolean) => {
  // No request from this regression suite may leave the local server.
  await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1'
    ? route.continue() : route.abort());
  await page.goto('/contact/');
  await page.getByRole('button', { name: 'Decline', exact: true }).click();
  const prefix = benefits ? '#benefits-' : '#';
  await page.locator(`${prefix}name`).fill('Local Fixture');
  await page.locator(`${prefix}email`).fill('fixture@patient.invalid');
  if (benefits) await page.locator('#benefits-carrier').fill('Fixture carrier');
  else {
    await page.getByRole('radio', { name: 'Thinking about becoming a new patient' })
      .evaluate((radio: HTMLInputElement) => radio.click());
    await page.locator('#message').fill('Fictional local request');
  }
  return page.getByRole('button', { name: benefits ? 'Request Benefits Review' : 'Send Message', exact: true });
};

for (const benefits of [false, true]) {
  const label = benefits ? 'benefits' : 'contact';

  test(`${label} timeout preserves input, releases the lock, and emits no lead until accepted`, async ({ page }) => {
    const submit = await prepareForm(page, benefits);
    await page.evaluate(() => {
      const state = { requests: 0, leads: 0 };
      Object.assign(window, { submissionTest: state });
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
    await submit.click();
    await expect(page.getByText("We couldn't confirm your request", { exact: false })).toContainText("We couldn't confirm your request");
    await expect(submit).toBeEnabled();
    await expect(page.locator(benefits ? '#benefits-name' : '#name')).toHaveValue('Local Fixture');
    expect(await page.evaluate(() => (window as typeof window & { submissionTest: object }).submissionTest))
      .toEqual({ requests: 1, leads: 0 });
    await submit.click();
    await expect(page.getByText(benefits ? 'Thank you. Our team will follow up about your PPO benefits.' : 'Thanks for reaching out! We will respond shortly.', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => (window as typeof window & { submissionTest: object }).submissionTest))
      .toEqual({ requests: 2, leads: benefits ? 0 : 1 });
  });

  test(`${label} synchronous duplicate submits create only one request and eligible lead`, async ({ page }) => {
    const submit = await prepareForm(page, benefits);
    await page.evaluate(() => {
      const state = { requests: 0, leads: 0 };
      Object.assign(window, { submissionTest: state });
      window.addEventListener('exquisite:chatgpt-ads-lead-confirmed', () => state.leads++);
      window.fetch = (async () => {
        state.requests++;
        await new Promise(resolve => setTimeout(resolve, 100));
        return new Response('{"ok":true}', { status: 200 });
      }) as typeof window.fetch;
    });
    await submit.evaluate(button => {
      const form = button.closest('form')!;
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
    await expect(page.getByText(benefits ? 'Thank you. Our team will follow up about your PPO benefits.' : 'Thanks for reaching out! We will respond shortly.', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => (window as typeof window & { submissionTest: object }).submissionTest))
      .toEqual({ requests: 1, leads: benefits ? 0 : 1 });
  });
}
