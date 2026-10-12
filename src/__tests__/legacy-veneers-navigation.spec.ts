import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  await page.addInitScript(() => {
    localStorage.setItem('exquisite_analytics_consent_v2', 'denied');
    localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2', 'denied');
  });
  await page.route('**/*', (route) => {
    const origin = new URL(route.request().url()).origin;
    return origin === new URL(baseURL!).origin ? route.continue() : route.abort();
  });
});

test('main-site veneers links open the preserved standalone site', async ({ page }) => {
  await page.goto('/services/');
  const link = page.locator('main').locator('a[href="/veneers"], a[href="/veneers/"]').first();
  await expect(link).toBeVisible();
  const documentRequest = page.waitForRequest((request) => request.isNavigationRequest() && new URL(request.url()).pathname === '/veneers/');
  await link.click();
  await documentRequest;
  await expect(page).toHaveURL(/\/veneers\/$/);
  await expect(page.locator('body')).toHaveClass(/elementor/);
  await expect(page.locator('#root')).toHaveCount(0);
});

test('directory routes retain campaign queries and bypass the React shell', async ({ page }) => {
  await page.goto('/veneers/process?utm_source=local-test');
  await expect(page).toHaveURL(/\/veneers\/process\/\?utm_source=local-test$/);
  await expect(page.locator('#root')).toHaveCount(0);
  await expect(page.locator('h1').first()).toBeVisible();
});

test('main-site search opens an archived page through a fresh document load', async ({ page }) => {
  await page.route('**/search-index.json', (route) => route.fulfill({
    json: { version: 1, items: [{
      id: 'page:legacy-veneers-process',
      type: 'page',
      title: 'Legacy veneers process',
      href: '/veneers/process/?utm_source=search-integration',
      description: 'The original step-by-step veneer consultation and treatment process.',
    }] },
  }));
  await page.goto('/services/');
  await page.getByRole('button', { name: 'Search site', exact: true }).click();
  await page.getByPlaceholder('Search services, locations, pages, or blog posts…').fill('Legacy veneers process');
  const documentRequest = page.waitForRequest((request) => request.isNavigationRequest() && new URL(request.url()).pathname === '/veneers/process/');
  await page.getByRole('option').filter({ hasText: 'Legacy veneers process' }).click();
  await documentRequest;
  await expect(page).toHaveURL(/\/veneers\/process\/\?utm_source=search-integration$/);
  await expect(page.locator('#root')).toHaveCount(0);
});

test('existing veneers cost guide remains a main-site page', async ({ page }) => {
  await page.goto('/veneers/cost-los-angeles/');
  await expect(page.locator('#root')).toHaveCount(1);
  await expect(page.locator('h1').first()).toBeVisible();
});

test('missing archive CSS and static documents return 404 while preserved CSS is served normally', async ({ page, request }) => {
  for (const missingPath of [
    '/veneers/assets/not-present/dialog.min.css?ver=1.0',
    '/veneers/assets/not-present/script.js',
    '/veneers/not-present.html',
  ]) {
    const response = await request.get(missingPath);
    expect(response.status(), missingPath).toBe(404);
    expect(await response.text()).not.toContain('<div id="root">');
  }

  const missingHead = await request.head('/veneers/assets/not-present/dialog.min.css');
  expect(missingHead.status()).toBe(404);
  expect(await missingHead.body()).toHaveLength(0);

  await page.goto('/veneers/');
  const stylesheetUrl = await page.locator('link[rel="stylesheet"][href^="/veneers/assets/"]').first().getAttribute('href');
  expect(stylesheetUrl).toBeTruthy();
  const stylesheet = await request.get(stylesheetUrl!);
  expect(stylesheet.status()).toBe(200);
  expect(stylesheet.headers()['content-type']).toContain('text/css');
  expect(await stylesheet.text()).not.toContain('<div id="root">');
});
