import { expect, test, type Page } from '@playwright/test';
import { sanitizeTrackedPath, sanitizeTrackedUrl } from '../utils/vercelAnalytics';

type AnalyticsWindow = Window & {
  __gtagTestEvents: unknown[][];
  __vercelTestEvents: unknown[][];
  gtag: (...args: unknown[]) => void;
  va: (...args: unknown[]) => void;
};

const PRODUCTION_GOOGLE_TAG_IDS = ['G-1MZGF2XNB5', 'AW-11373090310'] as const;

const isProductionGoogleAnalyticsUrl = (url: string) => PRODUCTION_GOOGLE_TAG_IDS.some((id) => url.includes(id));

const blockAnalyticsVendors = async (page: Page) => {
  await page.route(/https:\/\/(?:www\.)?googletagmanager\.com\/.*/, (route) => route.abort());
  await page.route(/https:\/\/(?:www\.)?google-analytics\.com\/.*/, (route) => route.abort());
  await page.route(/https:\/\/static\.hotjar\.com\/.*/, (route) => route.abort());
  await page.route('https://va.vercel-scripts.com/**', (route) => route.abort());
};

const collectProductionGoogleRequests = (page: Page) => {
  const vendorRequests: string[] = [];
  page.on('request', (request) => {
    if (isProductionGoogleAnalyticsUrl(request.url())) {
      vendorRequests.push(request.url());
    }
  });
  return vendorRequests;
};

const installAnalyticsRecorders = async (page: Page) => {
  await page.addInitScript(() => {
    const analyticsWindow = window as unknown as AnalyticsWindow;
    analyticsWindow.__gtagTestEvents = [];
    analyticsWindow.__vercelTestEvents = [];
    analyticsWindow.gtag = (...args: unknown[]) => {
      analyticsWindow.__gtagTestEvents.push(args);
    };
    analyticsWindow.va = (...args: unknown[]) => {
      analyticsWindow.__vercelTestEvents.push(args);
    };
  });
};

const resetGtagRecorder = async (page: Page) => {
  await page.evaluate(() => {
    const analyticsWindow = window as unknown as AnalyticsWindow;
    analyticsWindow.__gtagTestEvents = [];
    analyticsWindow.__vercelTestEvents = [];
    analyticsWindow.gtag = (...args: unknown[]) => {
      analyticsWindow.__gtagTestEvents.push(args);
    };
    analyticsWindow.va = (...args: unknown[]) => {
      analyticsWindow.__vercelTestEvents.push(args);
    };
  });
};

const readRecordedEvents = async (page: Page) => page.evaluate(() => {
  const analyticsWindow = window as unknown as AnalyticsWindow;
  return {
    gtagEvents: analyticsWindow.__gtagTestEvents.filter((event) => event[0] === 'event'),
    vercelEvents: analyticsWindow.__vercelTestEvents,
  };
});

const preventAnchorNavigation = async (page: Page, selector: string) => {
  await page.locator(selector).first().evaluate((anchor) => {
    anchor.addEventListener('click', (event) => event.preventDefault(), { once: true });
  });
};

test.beforeEach(async ({ page }) => {
  await blockAnalyticsVendors(page);
  await page.addInitScript(() => {
    localStorage.setItem('exquisite_analytics_consent_v1', 'granted');
  });
  await installAnalyticsRecorders(page);
});

test('127.0.0.1 never requests the production Google tag', async ({ page }) => {
  const vendorRequests = collectProductionGoogleRequests(page);

  await page.goto('/client-experience/');
  await page.goto('/schedule-consultation/');
  await page.waitForTimeout(100);

  expect(vendorRequests).toEqual([]);
  expect(await page.evaluate(() => Array.isArray(window.dataLayer))).toBe(false);
  expect(await page.locator('script[src*="gtag/js?id=G-1MZGF2XNB5"]').count()).toBe(0);
});

test('plain telephone anchors emit no production gtag events on localhost', async ({ page }) => {
  const vendorRequests = collectProductionGoogleRequests(page);
  await page.goto('/client-experience/');
  await resetGtagRecorder(page);
  await preventAnchorNavigation(page, 'a[href^="tel:"]');

  await page.locator('a[href^="tel:"]').first().click();

  const result = await readRecordedEvents(page);
  expect(result.gtagEvents).toEqual([]);
  expect(vendorRequests).toEqual([]);
});

test('PhoneLink local and global handlers stay silent on localhost', async ({ page }) => {
  const vendorRequests = collectProductionGoogleRequests(page);
  await page.goto('/schedule-consultation/');
  await resetGtagRecorder(page);
  await preventAnchorNavigation(page, 'a[data-analytics-source][href^="tel:"]');

  await page.locator('a[data-analytics-source][href^="tel:"]').first().click();

  const result = await readRecordedEvents(page);
  expect(result.gtagEvents).toEqual([]);
  expect(vendorRequests).toEqual([]);
});

test('schedule links emit no production gtag events on localhost', async ({ page }) => {
  const vendorRequests = collectProductionGoogleRequests(page);
  await page.goto('/locations/');
  await resetGtagRecorder(page);
  await preventAnchorNavigation(page, 'a[href^="/schedule-consultation"]');

  await page.locator('a[href^="/schedule-consultation"]').first().click();

  const result = await readRecordedEvents(page);
  expect(result.gtagEvents).toEqual([]);
  expect(vendorRequests).toEqual([]);
});

test('testimonial actions do not emit production gtag events on localhost', async ({ page }) => {
  const vendorRequests = collectProductionGoogleRequests(page);
  await page.goto('/share-your-story/');
  await resetGtagRecorder(page);
  await page.evaluate(() => {
    window.open = (() => window) as typeof window.open;
  });

  await page.getByRole('button', { name: 'Start Written Testimonial' }).click();

  const result = await readRecordedEvents(page);
  expect(result.gtagEvents).toEqual([]);
  expect(vendorRequests).toEqual([]);
});

test('Vercel path helpers redact PII-like routes without a production host', () => {
  expect(sanitizeTrackedPath('/privacy-fixture@example.test')).toBe('/redacted');
  expect(sanitizeTrackedPath('/privacy-fixture%40example.test')).toBe('/redacted');
  expect(sanitizeTrackedUrl('https://127.0.0.1:4179/privacy-fixture@example.test?email=a@b.com#hash'))
    .toBe('https://127.0.0.1:4179/redacted');
});
