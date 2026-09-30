import { expect, test } from '@playwright/test';

const blockOptionalVendors = async (page: import('@playwright/test').Page) => {
  await page.route(/player.vimeo.com|files.withcherry.com|googletagmanager|google-analytics|googleadservices|vercel-scripts|vercel-insights|\/_vercel\/|bzrcdn.openai.com/, route => route.abort());
};

for (const width of [320, 390, 768]) {
  test(`${width}px homepage reveals content beyond the hero and grows with enlarged text`, async ({ page }) => {
    await blockOptionalVendors(page);
    await page.addInitScript(() => {
      localStorage.setItem('exquisite_analytics_consent_v2', 'denied');
      localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2', 'denied');
    });
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    const heading = page.getByRole('heading', { name: /Los Angeles Cosmetic Dentist/i });
    const hero = heading.locator('xpath=ancestor::section[1]');
    await expect(heading).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const initialHero = await hero.boundingBox();
    expect(initialHero!.y + initialHero!.height).toBeLessThan(844);

    // Simulate enlarged browser text while preserving the device's CSS viewport.
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    const bounds = await hero.boundingBox();
    for (const element of [heading, hero.getByRole('link', { name: 'Schedule Consultation' })]) {
      await expect(element).toBeVisible();
      const box = await element.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(bounds!.x);
      expect(box!.x + box!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width + 1);
      expect(box!.y).toBeGreaterThanOrEqual(bounds!.y);
      expect(box!.y + box!.height).toBeLessThanOrEqual(bounds!.y + bounds!.height + 1);
      const textBounds = await element.evaluate(el => ({ text: el.textContent, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));
      expect(textBounds.scrollWidth, JSON.stringify(textBounds)).toBeLessThanOrEqual(textBounds.clientWidth + 1);
    }
  });
}

test('fresh consent has equal readable choices and accessible privacy detail at enlarged text', async ({ page }) => {
  await blockOptionalVendors(page);
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto('/lp/chatgpt/');
  const banner = page.getByRole('region', { name: 'Analytics preferences' });
  await expect(banner).toBeVisible();
  expect((await banner.boundingBox())!.height).toBeLessThan(220);
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  const decline = banner.getByRole('button', { name: 'Decline', exact: true });
  const allow = banner.getByRole('button', { name: 'Allow measurement', exact: true });
  for (const choice of [decline, allow]) {
    await expect(choice).toBeVisible();
    expect(await choice.evaluate(el => el.scrollWidth <= el.clientWidth + 1 && el.scrollHeight <= el.clientHeight + 1)).toBe(true);
  }
  const choices = await Promise.all([decline.boundingBox(), allow.boundingBox()]);
  expect(choices[0]!.width).toBeCloseTo(choices[1]!.width, 0);
  await banner.getByText('Details and privacy', { exact: true }).click();
  await expect(banner.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
  await decline.click();
  await expect(banner).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('exquisite_analytics_consent_v2'))).toBe('denied');
  expect(await page.evaluate(() => localStorage.getItem('exquisite_chatgpt_ads_measurement_consent_v2'))).toBe('denied');
});

test('initial paint and internal navigation keep route content fully visible', async ({ page }) => {
  await blockOptionalVendors(page);
  await page.addInitScript(() => {
    localStorage.setItem('exquisite_analytics_consent_v2', 'denied');
    localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2', 'denied');
    (window as Window & { __routeOpacity?: string[] }).__routeOpacity = [];
    const sample = () => {
      const wrapper = document.querySelector('[data-page-transition]');
      if (wrapper) (window as Window & { __routeOpacity?: string[] }).__routeOpacity?.push(getComputedStyle(wrapper).opacity);
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.goto('/');
  await page.getByRole('link', { name: 'Schedule Consultation', exact: true }).first().click();
  await expect(page).toHaveURL(/\/schedule-consultation\/?$/);
  await expect(page.locator('[data-page-transition]')).toHaveCSS('opacity', '1');
  const samples = await page.evaluate(() => (window as Window & { __routeOpacity?: string[] }).__routeOpacity);
  expect(samples!.length).toBeGreaterThan(0);
  expect(samples!.every(value => value === '1')).toBe(true);
});
