import { expect, test, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const blogIndex = JSON.parse(
  readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '../data/blogIndex.json'), 'utf8'),
) as Array<{ slug: string; title: string }>;

const POSTS = blogIndex.map((entry) => ({
  slug: entry.slug,
  path: `/blog/${entry.slug}/`,
  title: entry.title,
}));

const VIEWPORTS = [
  { name: 'phone-320', width: 320, height: 568 },
  { name: 'phone-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1280', width: 1280, height: 800 },
] as const;

const TEMPLATE_SAMPLES = [
  'are-veneers-covered-by-insurance',
  'invisalign-before-veneers-los-angeles',
  'single-tooth-veneers-perfect-solutions',
  'veneers-before-after-los-angeles',
  'finding-the-best-cosmetic-dentist-in-the-usa-the-world',
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

type LayoutIssue = {
  kind: 'page-overflow' | 'element-overflow' | 'nested-prose';
  context: string;
  detail: string;
};

const shouldBlockRequest = (url: string) => THIRD_PARTY_HOSTS.some((host) => url.includes(host));

const preparePage = async (page: Page) => {
  await page.addInitScript(() => {
    localStorage.setItem('exquisite_analytics_consent_v1', 'denied');
  });
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (shouldBlockRequest(url)) return route.abort();
    return route.continue();
  });
};

const stabilizePage = async (page: Page) => {
  await page.waitForLoadState('domcontentloaded');
  await page.locator('#main-content h1').first().waitFor({ timeout: 15_000 });
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 1ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: 1ms !important;
      }
    `,
  });
};

const inspectOverflow = async (page: Page, context: string): Promise<LayoutIssue[]> =>
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

    const nestedProse = document.querySelectorAll('.prose .prose').length;
    if (nestedProse > 0) {
      issues.push({
        kind: 'nested-prose',
        context: scanContext,
        detail: `found ${nestedProse} nested .prose wrappers`,
      });
    }

    const ignored = (element: Element) =>
      Boolean(
        element.closest(
          '[id="widget-floatingEstimator-mount"], [class*="floatingEstimator"], [aria-label="Ask the Concierge"], [data-radix-popper-content-wrapper]',
        ),
      );

    const hasClippingOrScrollingAncestor = (element: Element | null) => {
      let current = element?.parentElement ?? null;
      while (current && current !== document.body) {
        const parentStyles = window.getComputedStyle(current);
        if (/(auto|clip|hidden|scroll)/.test(parentStyles.overflowX)) return true;
        current = current.parentElement;
      }
      return false;
    };

    document.body.querySelectorAll('*').forEach((element) => {
      if (ignored(element)) return;
      if (hasClippingOrScrollingAncestor(element)) return;
      const styles = window.getComputedStyle(element);
      if (styles.display === 'none' || styles.visibility === 'hidden') return;
      if (styles.position === 'fixed' || styles.position === 'sticky') return;

      const rect = element.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      if (rect.left < -2 || rect.right > window.innerWidth + 2) {
        const text = (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
        const className = typeof element.className === 'string' ? element.className.slice(0, 80) : '';
        issues.push({
          kind: 'element-overflow',
          context: scanContext,
          detail: `${element.tagName.toLowerCase()}.${className} "${text}" spans ${Math.round(rect.left)}..${Math.round(rect.right)} within ${window.innerWidth}px`,
        });
      }
    });

    return issues.slice(0, 20);
  }, context);

const scanPost = async (page: Page, context: string) => {
  const issues: LayoutIssue[] = [];
  const maxY = await page.evaluate(
    () =>
      Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight,
  );
  const points = maxY <= 0 ? [0] : Array.from(new Set([0, Math.round(maxY / 2), maxY]));

  for (const point of points) {
    await page.evaluate((y) => window.scrollTo(0, y), point);
    await page.waitForTimeout(50);
    issues.push(...(await inspectOverflow(page, `${context} @ ${point}`)));
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  expect(issues, JSON.stringify(issues, null, 2)).toEqual([]);
};

test.describe('blog post layout', () => {
  for (const viewport of VIEWPORTS) {
    test(`every published post fits ${viewport.name}`, async ({ page, browserName }) => {
      test.slow();
      test.setTimeout(browserName === 'webkit' ? 10 * 60_000 : 8 * 60_000);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await preparePage(page);

      const slugs =
        browserName === 'webkit'
          ? POSTS.filter((post) => TEMPLATE_SAMPLES.includes(post.slug as (typeof TEMPLATE_SAMPLES)[number]))
          : POSTS;

      expect(slugs.length).toBeGreaterThan(0);

      for (const post of slugs) {
        await page.goto(post.path);
        await stabilizePage(page);
        await expect(page.locator('#main-content h1').first()).toBeVisible();
        await scanPost(page, `${viewport.name} ${post.path}`);
      }
    });
  }

  test('CTA labels wrap inside the viewport on a 320px phone', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await preparePage(page);

    const samples = [
      '/blog/single-tooth-veneers-perfect-solutions/',
      '/blog/veneers-before-after-los-angeles/',
      '/blog/invisalign-before-veneers-los-angeles/',
    ];

    for (const path of samples) {
      await page.goto(path);
      await stabilizePage(page);

      const overflowing = await page.evaluate(() => {
        const viewportWidth = window.innerWidth;
        const labels = [
          'Schedule Consultation',
          'Learn about veneers',
          'Contact Our Dental Team',
          'Review Veneer Pricing Guides',
        ];
        return labels.flatMap((label) =>
          Array.from(document.querySelectorAll('#main-content a, #main-content button'))
            .filter((element) => (element.textContent || '').includes(label))
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                label,
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
              };
            })
            .filter((box) => box.left < -1 || box.right > viewportWidth + 1),
        );
      });

      expect(overflowing, `${path} ${JSON.stringify(overflowing)}`).toEqual([]);
    }
  });

  test('FAQ rows wrap instead of overflowing on a 320px phone', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await preparePage(page);
    await page.goto('/blog/invisalign-before-veneers-los-angeles/');
    await stabilizePage(page);

    const faq = page.locator('#faqs details.faq-item').first();
    await expect(faq).toBeVisible();
    const box = await faq.locator('summary').boundingBox();
    expect(box).toBeTruthy();
    expect(box!.width).toBeLessThanOrEqual(320);
    expect(box!.x).toBeGreaterThanOrEqual(0);
  });

  test('post titles decode WordPress HTML entities', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await preparePage(page);
    await page.goto('/blog/finding-the-best-cosmetic-dentist-in-the-usa-the-world/');
    await stabilizePage(page);

    const heading = page.locator('#main-content h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/USA & the World/);
    await expect(heading).not.toHaveText(/&#/);
  });
});
