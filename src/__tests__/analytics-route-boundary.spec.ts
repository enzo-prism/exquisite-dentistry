import { expect, test } from '@playwright/test';
import { readIndexHtml, installCanonicalAnalyticsHost } from './analyticsTestHost';

const boundarySnippet = readIndexHtml().match(
  /<!-- Cross the campaign privacy boundary[\s\S]*?<script>([\s\S]*?)<\/script>/,
)?.[1];
if (!boundarySnippet) throw new Error('Missing privacy route boundary bootstrap');

// Exercise the real bootstrap in small documents so history behavior is tested
// independently of third-party SDK availability or React rendering speed.
for (const initialPath of ['/lp/chatgpt/', '/privacy-policy']) {
  const destination = initialPath === '/privacy-policy' ? '/lp/chatgpt/' : '/privacy-policy';
  for (const action of ['click', 'pushState', 'replaceState', 'popstate'] as const) {
    test(`${action} crosses ${initialPath} with a fresh document`, async ({ page }) => {
      await page.route('**/*', async (route) => {
        await route.fulfill({ contentType: 'text/html', body: `<html><head><script>${boundarySnippet}</script></head><body><a href="${destination}?utm_source=chatgpt#details">Continue</a></body></html>` });
      });
      await page.goto(initialPath);
      await page.evaluate(() => { (window as typeof window & { oldDocument?: boolean }).oldDocument = true; });
      if (action === 'click') {
        await page.getByRole('link', { name: 'Continue' }).click();
      } else if (action === 'popstate') {
        // Simulate a legacy same-document history entry predating the guard.
        await page.evaluate((path) => {
          const iframe = document.createElement('iframe');
          document.body.appendChild(iframe);
          iframe.contentWindow!.history.replaceState.call(window.history, null, '', path);
          iframe.remove();
          window.dispatchEvent(new PopStateEvent('popstate'));
        }, `${destination}?utm_source=chatgpt#details`);
      } else {
        await page.evaluate(({ action, destination }) => {
          window.history[action](null, '', destination);
        }, { action, destination: `${destination}?utm_source=chatgpt#details` });
      }
      await expect(page).toHaveURL(new RegExp(`${destination.replace(/\/$/, '')}/?\\?utm_source=chatgpt#details$`));
      await expect.poll(() => page.evaluate(() => (window as typeof window & { oldDocument?: boolean }).oldDocument)).toBeUndefined();
    });
  }
}

test('landing to privacy and browser back preserve Google isolation and denied consent', async ({ page }) => {
  await installCanonicalAnalyticsHost(page);
  await page.addInitScript(() => {
    localStorage.setItem('exquisite_analytics_consent_v1', 'denied');
    localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v1', 'denied');
  });
  const vendorRequests: string[] = [];
  await page.route(/googletagmanager|google-analytics|googleadservices|vercel-insights|\/_vercel\//, async (route) => {
    vendorRequests.push(route.request().url());
    await route.fulfill({ contentType: 'application/javascript', body: '' });
  });
  await page.goto('/lp/chatgpt/');
  await expect(page.getByLabel('Name')).toBeVisible();
  expect(vendorRequests).toEqual([]);
  await page.getByRole('link', { name: 'Privacy Policy', exact: true }).first().click();
  await expect(page).toHaveURL(/\/privacy-policy\/?$/);
  await expect.poll(() => page.evaluate(() => typeof window.gtag)).toBe('function');
  expect(await page.evaluate(() => localStorage.getItem('exquisite_analytics_consent_v1'))).toBe('denied');
  await page.goBack();
  await expect(page.getByLabel('Name')).toBeVisible();
  expect(await page.evaluate(() => typeof window.gtag)).toBe('undefined');
  await expect(page.locator('script[data-name="google-tag"], script[src*="/_vercel/"]')).toHaveCount(0);
  const requestsAfterBack = vendorRequests.length;
  await page.waitForTimeout(300);
  expect(vendorRequests).toHaveLength(requestsAfterBack);
  await page.goForward();
  await expect.poll(() => page.evaluate(() => typeof window.gtag)).toBe('function');
});

for (const alias of ['/LP/CHATGPT/', '/lp/%63hatgpt/']) {
  test(`decoded campaign alias ${alias} keeps the same privacy boundary`, async ({ page }) => {
    await installCanonicalAnalyticsHost(page);
    await page.addInitScript(() => {
      localStorage.setItem('exquisite_analytics_consent_v1', 'denied');
      localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v1', 'denied');
    });
    const requests: string[] = [];
    await page.route(/googletagmanager|google-analytics|googleadservices|vercel-insights|\/_vercel\//, async (route) => {
      requests.push(route.request().url());
      await route.fulfill({ contentType: 'application/javascript', body: '' });
    });
    await page.goto(alias);
    await expect(page.getByLabel('Name')).toBeVisible();
    expect(await page.evaluate(() => typeof window.gtag)).toBe('undefined');
    expect(requests).toEqual([]);
    await expect(page.getByRole('button', { name: 'Open navigation menu' })).toHaveCount(0);
    await page.getByRole('link', { name: 'Privacy Policy', exact: true }).first().click();
    await expect.poll(() => page.evaluate(() => typeof window.gtag)).toBe('function');
    await page.goBack();
    await expect(page.getByLabel('Name')).toBeVisible();
    expect(await page.evaluate(() => typeof window.gtag)).toBe('undefined');
  });
}
