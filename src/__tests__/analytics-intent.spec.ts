import { expect, test, type Page } from '@playwright/test';

type AnalyticsWindow = Window & {
  __gtagTestEvents: unknown[][];
  __vercelTestEvents: unknown[][];
  gtag: (...args: unknown[]) => void;
  va: (...args: unknown[]) => void;
};

const installAnalyticsRecorders = async (page: Page) => {
  await page.addInitScript(() => {
    const analyticsWindow = window as unknown as AnalyticsWindow;
    analyticsWindow.__vercelTestEvents = [];
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

const preventAnchorNavigation = async (page: Page, selector: string) => {
  await page.locator(selector).first().evaluate((anchor) => {
    anchor.addEventListener('click', (event) => event.preventDefault(), { once: true });
  });
};

test.beforeEach(async ({ page }) => {
  await page.route('https://va.vercel-scripts.com/**', (route) => route.abort());
  await page.addInitScript(() => {
    localStorage.setItem('exquisite_analytics_consent_v1', 'granted');
  });
  await installAnalyticsRecorders(page);
});

test('plain telephone anchors emit one privacy-safe phone event', async ({ page }) => {
  await page.goto('/client-experience/');
  await resetGtagRecorder(page);
  await preventAnchorNavigation(page, 'a[href^="tel:"]');

  await page.locator('a[href^="tel:"]').first().click();

  const result = await page.evaluate(() => {
    const analyticsWindow = window as unknown as AnalyticsWindow;
    return {
      phoneEvents: analyticsWindow.__gtagTestEvents.filter(
        (event) => event[0] === 'event' && event[1] === 'contact_click',
      ),
      contactEvents: analyticsWindow.__vercelTestEvents.filter(
        (event) => event[0] === 'event'
          && (event[1] as { name?: string } | undefined)?.name === 'Contact Method Clicked',
      ),
    };
  });

  expect(result.phoneEvents).toHaveLength(1);
  expect(result.phoneEvents[0]?.[2]).toMatchObject({ interaction_method: 'phone' });
  expect(result.phoneEvents[0]?.[2]).not.toHaveProperty('custom_parameters');
  expect(JSON.stringify(result.phoneEvents)).not.toContain('+13232722388');
  expect(result.contactEvents).toHaveLength(1);
});

test('PhoneLink local and global handlers dedupe the same click', async ({ page }) => {
  await page.goto('/schedule-consultation/');
  await resetGtagRecorder(page);
  await preventAnchorNavigation(page, 'a[data-analytics-source][href^="tel:"]');

  await page.locator('a[data-analytics-source][href^="tel:"]').first().click();

  const result = await page.evaluate(() => {
    const analyticsWindow = window as unknown as AnalyticsWindow;
    return {
      phoneEventCount: analyticsWindow.__gtagTestEvents.filter(
        (event) => event[0] === 'event' && event[1] === 'contact_click',
      ).length,
      contactEventCount: analyticsWindow.__vercelTestEvents.filter(
        (event) => event[0] === 'event'
          && (event[1] as { name?: string } | undefined)?.name === 'Contact Method Clicked',
      ).length,
    };
  });

  expect(result).toEqual({ phoneEventCount: 1, contactEventCount: 1 });
});

test('schedule links without local handlers emit one consultation event', async ({ page }) => {
  await page.goto('/locations/');
  await resetGtagRecorder(page);
  await preventAnchorNavigation(page, 'a[href^="/schedule-consultation"]');

  await page.locator('a[href^="/schedule-consultation"]').first().click();

  const result = await page.evaluate(() => {
    const analyticsWindow = window as unknown as AnalyticsWindow;
    return {
      consultationEvents: analyticsWindow.__vercelTestEvents.filter(
        (event) => event[0] === 'event'
          && (event[1] as { name?: string } | undefined)?.name === 'Consultation Intent',
      ),
      scheduleEvents: analyticsWindow.__gtagTestEvents.filter(
        (event) => event[0] === 'event' && event[1] === 'schedule_click',
      ),
    };
  });

  expect(result.consultationEvents).toHaveLength(1);
  expect(result.scheduleEvents).toHaveLength(1);
  expect(result.scheduleEvents[0]?.[2]).toMatchObject({ interaction_method: 'schedule' });
  expect(result.scheduleEvents[0]?.[2]).not.toHaveProperty('custom_parameters');
});

test('testimonial actions stay generic CTAs and never become schedule intent', async ({ page }) => {
  await page.goto('/share-your-story/');
  await resetGtagRecorder(page);
  await page.evaluate(() => {
    window.open = (() => window) as typeof window.open;
  });

  await page.getByRole('button', { name: 'Start Written Testimonial' }).click();

  const result = await page.evaluate(() => {
    const analyticsWindow = window as unknown as AnalyticsWindow;
    return {
      ctaEvents: analyticsWindow.__gtagTestEvents.filter(
        (event) => event[0] === 'event' && event[1] === 'cta_click',
      ),
      scheduleEvents: analyticsWindow.__gtagTestEvents.filter(
        (event) => event[0] === 'event' && event[1] === 'schedule_click',
      ),
      vercelCtaEvents: analyticsWindow.__vercelTestEvents.filter(
        (event) => event[0] === 'event'
          && (event[1] as { name?: string } | undefined)?.name === 'CTA Clicked',
      ),
    };
  });

  expect(result.ctaEvents).toHaveLength(1);
  expect(result.scheduleEvents).toHaveLength(0);
  expect(result.vercelCtaEvents).toHaveLength(1);
});

test('Vercel analytics redacts PII-like route and path properties', async ({ page }) => {
  await page.goto('/privacy-fixture%40example.test');
  await preventAnchorNavigation(page, 'a[href^="tel:"]');
  await page.locator('a[href^="tel:"]').first().click();

  await expect.poll(() => page.evaluate(() => {
    const analyticsWindow = window as unknown as AnalyticsWindow;
    return analyticsWindow.__vercelTestEvents.length;
  })).toBeGreaterThan(0);

  const serialized = await page.evaluate(() => {
    const analyticsWindow = window as unknown as AnalyticsWindow;
    return JSON.stringify(analyticsWindow.__vercelTestEvents);
  });
  expect(serialized).toContain('/redacted');
  expect(serialized).not.toMatch(/privacy-fixture|%40|@example/i);
});
