import { expect, test } from '@playwright/test';

const preparePage = async (page: import('@playwright/test').Page) => {
  await page.addInitScript(() => {
    localStorage.setItem('exquisite_analytics_consent_v2', 'denied');
    localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2', 'denied');
  });
  await page.route('**/*', (route) => {
    const host = new URL(route.request().url()).hostname;
    return host === '127.0.0.1' || host === 'localhost' ? route.continue() : route.abort();
  });
};

test.beforeEach(async ({ page }) => preparePage(page));

test('homepage introduces the dentist and real patient cases before treatment and payment sections', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const doctor = page.getByRole('heading', { name: 'Meet Dr. Alexie Aguil' });
  const cases = page.getByRole('heading', { name: 'Compare smile transformations' });
  const services = page.getByRole('heading', { name: 'Our Services' });
  const positions = await Promise.all([doctor, cases, services].map((heading) => heading.evaluate((element) => element.getBoundingClientRect().top + window.scrollY)));
  expect(positions[0]).toBeLessThan(positions[1]);
  expect(positions[1]).toBeLessThan(positions[2]);
  expect(positions[0]).toBeLessThan(1500);
  await expect(page.getByText('Love Dr. Aguil! He’s super nice and meticulous. Explains everything clearly and puts you at ease.')).toBeVisible();
  await expect(page.locator('main').getByRole('link', { name: 'Explore Porcelain Veneers', exact: true })).toHaveAttribute('href', '/veneers/');
  await expect(page.locator('main').getByRole('link', { name: 'Explore Invisalign', exact: true }).last()).toHaveAttribute('href', '/invisalign/');
  await expect(page.locator('main').getByRole('link', { name: 'Explore Dental Implants', exact: true })).toHaveAttribute('href', '/dental-implants/');
  expect(await page.locator('main a button, main button a').count()).toBe(0);
});

test('gallery filters expose documented procedures and pass treatment intent to booking', async ({ page }) => {
  await page.goto('/smile-gallery/');
  const cases = page.locator('#patient-cases');
  await expect(cases.locator('article')).toHaveCount(6);
  await page.getByRole('button', { name: 'Veneers', exact: true }).click();
  await expect(cases.locator('article')).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Veneers', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(cases.getByRole('heading', { name: 'Brittany', exact: true })).toBeVisible();
  await expect(cases.getByText('Complete smile transformation with porcelain veneers')).toBeVisible();
  await expect(cases.getByRole('link', { name: 'Discuss this treatment' }).first()).toHaveAttribute('href', '/schedule-consultation/?service=porcelain-veneers');
  await page.getByRole('button', { name: 'Alignment', exact: true }).click();
  await expect(cases.locator('article')).toHaveCount(2);
  await expect(cases.getByRole('heading', { name: 'Ryan', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Implants', exact: true }).click();
  await expect(cases.locator('article')).toHaveCount(1);
  await expect(cases.getByRole('heading', { name: 'Brian', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Combined treatments', exact: true }).click();
  await expect(cases.locator('article')).toHaveCount(3);
  await page.getByRole('button', { name: 'All treatments', exact: true }).click();
  await expect(cases.locator('article')).toHaveCount(6);
});

test('gallery deep links select a treatment and browser history restores its filter', async ({ page }) => {
  await page.goto('/smile-gallery/?treatment=veneers&utm_source=guide');
  await expect(page.locator('#patient-cases article')).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Veneers', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Implants', exact: true }).click();
  await expect(page).toHaveURL(/treatment=implants/);
  await expect(page).toHaveURL(/utm_source=guide/);
  await page.goBack();
  await expect(page.getByRole('button', { name: 'Veneers', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.goto('/smile-gallery/?treatment=unknown');
  await expect(page.locator('#patient-cases article')).toHaveCount(6);
});

test('before and after comparisons work with arrow keys, Home, and End', async ({ page }) => {
  await page.goto('/smile-gallery/?treatment=veneers');
  const slider = page.getByRole('slider', { name: 'Compare Brittany before and after Porcelain Veneers' });
  await slider.scrollIntoViewIfNeeded();
  await slider.focus();
  await expect(slider).toHaveAttribute('aria-valuenow', '50');
  await slider.press('ArrowRight');
  await expect(slider).toHaveAttribute('aria-valuenow', '55');
  await slider.press('Home');
  await expect(slider).toHaveAttribute('aria-valuenow', '0');
  await slider.press('End');
  await expect(slider).toHaveAttribute('aria-valuenow', '100');
  await slider.press('ArrowLeft');
  await expect(slider).toHaveAttribute('aria-valuenow', '95');
});

test.describe('mobile homepage width', () => {
  test.use({ isMobile: true, hasTouch: true, deviceScaleFactor: 3 });

  test('service entry effects do not widen the page on phones', async ({ page }) => {
    for (const width of [320, 375, 390, 430]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.addStyleTag({ content: '*, *::before, *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important; transition-duration: 1ms !important; scroll-behavior: auto !important; }' });
      await page.waitForTimeout(100);
      const documentWidth = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth));
      expect(documentWidth).toBeLessThanOrEqual(width + 1);
    }
  });
});
