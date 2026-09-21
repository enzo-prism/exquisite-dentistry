import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route(/googletagmanager|google-analytics|googleadservices|vercel-scripts|vercel-insights|\/_vercel\/|bzrcdn.openai.com/, route => route.fulfill({ contentType: 'application/javascript', body: '' }));
  await page.addInitScript(() => { localStorage.clear(); sessionStorage.clear(); });
});

for (const width of [320, 390]) {
  test(`fresh ${width}px visit keeps consent compact and form reachable`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/lp/chatgpt/');
    const banner = page.getByRole('region', { name: 'Analytics preferences' });
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('OpenAI Ads conversion tag');
    await page.evaluate(() => document.fonts.ready);
    const box = await banner.boundingBox();
    expect(box!.height).toBeLessThan(280);
    const cta = page.getByRole('link', { name: 'Request a consultation' }).first();
    await expect(cta).toBeVisible();
    const ctaBox = await cta.boundingBox();
    expect(ctaBox!.y + ctaBox!.height).toBeLessThanOrEqual(box!.y);
    expect(ctaBox!.y).toBeGreaterThanOrEqual(0);
    // Verify the initial view itself: no preparatory scrolling to bypass an overlay.
    expect(await cta.evaluate(el => {
      const bounds = el.getBoundingClientRect();
      return el.contains(document.elementFromPoint(bounds.x + bounds.width / 2, bounds.bottom - 1));
    })).toBe(true);
    await expect(cta).toBeInViewport();
    await cta.click();
    await expect(page.locator('#consultation-form')).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.getByText('Details and privacy', { exact: true }).click();
    await expect(banner.getByText(/Google may still receive limited cookieless signals/)).toBeVisible();
    await page.getByRole('button', { name: 'Decline', exact: true }).click();
    await expect(banner).toHaveCount(0);
  });
}

test('accepted request replaces form with a focused receipt', async ({ page }) => {
  await page.route('https://formspree.io/**', route => route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
  await page.goto('/lp/chatgpt/');
  await page.getByRole('button', { name: 'Decline', exact: true }).click();
  await page.getByLabel('Name', { exact: true }).fill('Local Test');
  await page.getByLabel('Email', { exact: true }).fill('test@example.com');
  await page.getByLabel('Phone', { exact: true }).fill('+44 20 7946 0958');
  await page.getByLabel('Consultation interest').click();
  await page.getByRole('option', { name: 'Not sure yet' }).click();
  await page.getByRole('button', { name: 'Request my consultation' }).click();
  await expect(page.getByRole('heading', { name: 'Request received' })).toBeFocused();
  await expect(page.getByRole('status')).toContainText('Your appointment is not booked yet');
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.getByText(/Tell us how to reach you/)).toHaveCount(0);
  await expect(page.getByRole('status').getByRole('link', { name: /^Call / })).toHaveAttribute('href', /^tel:/);
});

test('failed request preserves details and offers callable recovery', async ({ page }) => {
  await page.route('https://formspree.io/**', route => route.fulfill({ status: 503, body: 'Unavailable' }));
  await page.goto('/lp/chatgpt/');
  await page.getByRole('button', { name: 'Decline', exact: true }).click();
  await page.getByLabel('Name', { exact: true }).fill('Local Test');
  await page.getByLabel('Email', { exact: true }).fill('test@example.com');
  await page.getByLabel('Phone', { exact: true }).fill('+44 20 7946 0958');
  await page.getByLabel('Consultation interest').click();
  await page.getByRole('option', { name: 'Not sure yet' }).click();
  await page.getByRole('button', { name: 'Request my consultation' }).click();
  await expect(page.getByRole('alert')).toContainText("We couldn't confirm your request");
  await expect(page.getByRole('alert').getByRole('link', { name: /^Call / })).toHaveAttribute('href', /^tel:/);
  await expect(page.getByLabel('Name', { exact: true })).toHaveValue('Local Test');
  await expect(page.getByRole('button', { name: 'Request my consultation' })).toBeEnabled();
});
