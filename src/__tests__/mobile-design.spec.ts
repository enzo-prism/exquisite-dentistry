import { expect, test, type Page } from '@playwright/test';

const CRITICAL_ROUTES = [
  { path: '/', expectedText: 'Los Angeles Cosmetic Dentist' },
  { path: '/services/', expectedText: 'Advanced Cosmetic' },
  { path: '/veneers/', expectedText: 'Custom Porcelain Veneers' },
  { path: '/smile-gallery/', expectedText: 'Smile Gallery' },
  { path: '/schedule-consultation/', expectedText: 'Schedule Consultation' },
  { path: '/payment-plans/', expectedText: 'Payment Plans' },
  { path: '/contact/', expectedText: 'Send Us a Message' },
  { path: '/blog/are-veneers-covered-by-insurance/', expectedText: 'Are Veneers Covered by Insurance' },
] as const;

const MOBILE_VIEWPORTS = [
  { name: 'legacy-small-phone', width: 320, height: 568 },
  { name: 'iphone-se', width: 375, height: 667 },
  { name: 'iphone-modern', width: 390, height: 844 },
  { name: 'large-phone', width: 430, height: 932 },
  { name: 'phone-landscape', width: 667, height: 375 },
] as const;

const THIRD_PARTY_HOSTS = [
  'birdeye.com',
  'cdn.gpteng.co',
  'files.withcherry.com',
  'googletagmanager.com',
  'google-analytics.com',
  'hotjar.com',
  'player.vimeo.com',
  'static.hotjar.com',
  'youtube.com',
] as const;

const MOBILE_CONTEXT = {
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 3,
  locale: 'en-US',
  timezoneId: 'America/Los_Angeles',
  colorScheme: 'light' as const,
};

type LayoutIssue = {
  kind: 'page-overflow' | 'element-overflow' | 'touch-target';
  context: string;
  detail: string;
};

test.use(MOBILE_CONTEXT);

const shouldBlockRequest = (url: string) => THIRD_PARTY_HOSTS.some((host) => url.includes(host));

const preparePage = async (page: Page) => {
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (shouldBlockRequest(url)) {
      return route.abort();
    }

    return route.continue();
  });
};

const stabilizePage = async (page: Page) => {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => undefined);
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 1ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: 1ms !important;
      }

      iframe[src*="vimeo"],
      iframe[src*="youtube"],
      video {
        visibility: hidden !important;
      }
    `,
  });
};

const getScrollSamplePoints = async (page: Page) =>
  page.evaluate(() => {
    const maxY = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    ) - window.innerHeight;

    if (maxY <= 0) return [0];

    return Array.from(
      new Set([
        0,
        Math.min(720, maxY),
        Math.round(maxY / 2),
        maxY,
      ]),
    );
  });

const inspectCurrentMobileViewport = async (page: Page, context: string): Promise<LayoutIssue[]> =>
  page.evaluate((scanContext) => {
    const issues: LayoutIssue[] = [];
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    const documentOverflow =
      Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - viewportWidth;

    if (documentOverflow > 2) {
      issues.push({
        kind: 'page-overflow',
        context: scanContext,
        detail: `document is ${Math.round(documentOverflow)}px wider than the viewport`,
      });
    }

    const ignoredTags = new Set([
      'BODY',
      'HEAD',
      'HTML',
      'LINK',
      'META',
      'NOSCRIPT',
      'SCRIPT',
      'STYLE',
      'TITLE',
    ]);

    const isVisibleInViewport = (element: Element, rect: DOMRect) => {
      const styles = window.getComputedStyle(element);
      return (
        styles.display !== 'none' &&
        styles.visibility !== 'hidden' &&
        Number(styles.opacity) !== 0 &&
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.top < window.innerHeight
      );
    };

    const hasClippingOrScrollingAncestor = (element: Element | null) => {
      let current = element;
      while (current && current !== document.body) {
        const styles = window.getComputedStyle(current);
        if (/(auto|clip|hidden|scroll)/.test(styles.overflowX)) return true;
        current = current.parentElement;
      }

      return false;
    };

    const descriptor = (element: Element) => {
      const tag = element.tagName.toLowerCase();
      const role = element.getAttribute('role');
      const aria = element.getAttribute('aria-label');
      const text = (aria || element.textContent || '').replace(/\s+/g, ' ').trim();
      return `${tag}${role ? `[role="${role}"]` : ''}${text ? ` "${text.slice(0, 80)}"` : ''}`;
    };

    document.body.querySelectorAll('*').forEach((element) => {
      if (ignoredTags.has(element.tagName)) return;
      if (element.closest('[data-radix-popper-content-wrapper]')) return;

      const rect = element.getBoundingClientRect();
      if (!isVisibleInViewport(element, rect)) return;
      if (hasClippingOrScrollingAncestor(element)) return;

      if (rect.left < -2 || rect.right > window.innerWidth + 2) {
        issues.push({
          kind: 'element-overflow',
          context: scanContext,
          detail: `${descriptor(element)} spans ${Math.round(rect.left)}..${Math.round(rect.right)} within ${window.innerWidth}px viewport`,
        });
      }
    });

    const interactiveSelector = [
      'a[href]',
      'button',
      'input:not([type="hidden"])',
      'select',
      'textarea',
      '[role="button"]',
      '[role="link"]',
      '[role="option"]',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    document.body.querySelectorAll(interactiveSelector).forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (!isVisibleInViewport(element, rect)) return;
      if (element.getAttribute('aria-hidden') === 'true') return;
      if (element.classList.contains('sr-only')) return;

      const styles = window.getComputedStyle(element);
      if (styles.clip !== 'auto' || styles.clipPath !== 'none') return;

      const parentTag = element.parentElement?.tagName;
      const isInlineTextLink =
        element.tagName === 'A' &&
        styles.display === 'inline' &&
        (parentTag === 'P' || parentTag === 'LI');

      if (isInlineTextLink) return;

      if (rect.width < 24 || rect.height < 24) {
        issues.push({
          kind: 'touch-target',
          context: scanContext,
          detail: `${descriptor(element)} is ${Math.round(rect.width)}x${Math.round(rect.height)}px`,
        });
      }
    });

    return issues;
  }, context);

const scanMobilePage = async (page: Page, context: string) => {
  const issues: LayoutIssue[] = [];
  const points = await getScrollSamplePoints(page);

  for (const point of points) {
    await page.evaluate((y) => window.scrollTo(0, y), point);
    await page.waitForTimeout(80);
    issues.push(...(await inspectCurrentMobileViewport(page, `${context} @ scrollY=${point}`)));
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  expect(issues, JSON.stringify(issues, null, 2)).toEqual([]);
};

test('mobile viewport metadata supports responsive layout, safe areas, and user zoom', async ({
  page,
}) => {
  await preparePage(page);
  await page.goto('/');

  const viewportContent = await page.locator('meta[name="viewport"]').getAttribute('content');
  expect(viewportContent).toContain('width=device-width');
  expect(viewportContent).toContain('initial-scale=1');
  expect(viewportContent).toContain('viewport-fit=cover');
  expect(viewportContent).not.toMatch(/user-scalable\s*=\s*no/i);
  expect(viewportContent).not.toMatch(/maximum-scale\s*=\s*1/i);
});

for (const viewport of MOBILE_VIEWPORTS) {
  test(`critical pages fit and keep tappable controls on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await preparePage(page);

    for (const route of CRITICAL_ROUTES) {
      await page.goto(route.path);
      await stabilizePage(page);
      await expect(page.locator('main')).toContainText(route.expectedText, { timeout: 15_000 });
      await expect(page.locator('header')).toBeVisible();
      await scanMobilePage(page, `${viewport.name} ${route.path}`);
    }
  });
}

test('mobile search drawer fits, accepts input, and navigates from a result', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await preparePage(page);
  await page.goto('/');
  await stabilizePage(page);

  await page.getByRole('button', { name: 'Search site' }).click();

  const searchInput = page.getByRole('combobox');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('veneers');
  await expect(page.getByRole('option', { name: /Custom Porcelain Veneers/i })).toBeVisible();

  const drawer = page.locator('[role="dialog"], [data-vaul-drawer]').first();
  const drawerBox = await drawer.boundingBox();
  expect(drawerBox).not.toBeNull();
  expect(drawerBox!.x).toBeGreaterThanOrEqual(-1);
  expect(drawerBox!.x + drawerBox!.width).toBeLessThanOrEqual(391);
  expect(drawerBox!.height).toBeLessThanOrEqual(844);

  const searchIssues = await inspectCurrentMobileViewport(page, 'mobile search drawer');
  expect(searchIssues, JSON.stringify(searchIssues, null, 2)).toEqual([]);
  await page.getByRole('option', { name: /Custom Porcelain Veneers/i }).click();
  await expect(page).toHaveURL(/\/veneers\/?$/);
});

test('mobile menu remains scrollable, readable, and closes after navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 667 });
  await preparePage(page);
  await page.goto('/');
  await stabilizePage(page);

  await page.getByRole('button', { name: 'Open navigation menu' }).click();

  const menuDialog = page.locator('[role="dialog"]').filter({ hasText: 'Book Your Visit' }).first();
  await expect(menuDialog).toBeVisible();
  await expect(menuDialog.getByRole('link', { name: 'Schedule Consultation' })).toBeVisible();
  await expect(menuDialog.getByRole('link', { name: /Call \(323\) 272-2388/i })).toBeVisible();

  const menuBox = await menuDialog.boundingBox();
  expect(menuBox).not.toBeNull();
  expect(menuBox!.x).toBeGreaterThanOrEqual(-1);
  expect(menuBox!.x + menuBox!.width).toBeLessThanOrEqual(391);
  expect(menuBox!.height).toBeLessThanOrEqual(667);

  await menuDialog.getByRole('button', { name: 'Popular Services' }).click();
  await expect(menuDialog.getByRole('link', { name: 'Emergency Dentist' })).toBeVisible();
  const menuIssues = await inspectCurrentMobileViewport(page, 'mobile navigation sheet');
  expect(menuIssues, JSON.stringify(menuIssues, null, 2)).toEqual([]);

  await menuDialog.getByRole('link', { name: 'Emergency Dentist' }).click();
  await expect(page).toHaveURL(/\/emergency-dentist\/?$/);
  await expect(menuDialog).toBeHidden();
});

test('mobile contact form validation stays visible and does not break the layout', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await preparePage(page);
  await page.goto('/contact/');
  await stabilizePage(page);

  const form = page.locator('form').first();
  await form.scrollIntoViewIfNeeded();
  await expect(form.getByLabel('Name')).toBeVisible();
  await expect(form.getByLabel('Email')).toBeVisible();
  await expect(form.getByLabel('Phone (optional)')).toBeVisible();
  await expect(form.getByLabel('Message')).toBeVisible();

  await form.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText('Please select one option.')).toBeVisible();
  await expect(page.getByText('Please enter your name.')).toBeVisible();
  await expect(page.getByText('Please enter your email address.')).toBeVisible();
  await expect(page.getByText('Please enter a message.')).toBeVisible();
  const formIssues = await inspectCurrentMobileViewport(page, 'mobile contact validation');
  expect(formIssues, JSON.stringify(formIssues, null, 2)).toEqual([]);
});

test('mobile floating actions appear after scroll and stay inside the thumb zone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await preparePage(page);
  await page.goto('/');
  await stabilizePage(page);

  await page.evaluate(() => window.scrollTo(0, 900));
  const quickActions = page.getByRole('button', { name: 'Open quick actions' });
  await expect(quickActions).toBeVisible({ timeout: 10_000 });

  const buttonBox = await quickActions.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    };
  });
  expect(buttonBox).not.toBeNull();
  expect(buttonBox.width).toBeGreaterThanOrEqual(48);
  expect(buttonBox.height).toBeGreaterThanOrEqual(48);
  expect(buttonBox.x + buttonBox.width).toBeLessThanOrEqual(390);
  expect(buttonBox.y + buttonBox.height).toBeLessThanOrEqual(844);

  await quickActions.click();
  await expect(page.getByRole('link', { name: 'Call Now' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Text Us' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Directions' })).toBeVisible();
  await scanMobilePage(page, 'mobile expanded quick actions');
});

test.describe('reduced motion mobile behavior', () => {
  test.use({ ...MOBILE_CONTEXT, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });

  test('homepage hero uses a static mobile fallback instead of autoplay media', async ({ page }) => {
    await preparePage(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await stabilizePage(page);

    await expect
      .poll(() => page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches))
      .toBe(true);
    await expect(page.locator('main')).toContainText('Los Angeles Cosmetic Dentist');
    const heroMediaCount = await page
      .getByRole('heading', { name: /Los Angeles Cosmetic Dentist/i })
      .evaluate((heading) => heading.closest('section')?.querySelectorAll('iframe[title="Background video"], video').length ?? -1);
    expect(heroMediaCount).toBe(0);
    await scanMobilePage(page, 'reduced motion homepage');
  });
});
