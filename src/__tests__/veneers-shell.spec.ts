import { expect, test, type Page } from '@playwright/test';

const HEADER = '#veneers-shell-header';
const FOOTER = '#veneers-shell-footer';
const MENU = '#veneers-shell-menu';
const TOGGLE = '#veneers-shell-menu-toggle';
const PANEL = '#veneers-shell-menu-panel';
const ARTICLE = '/veneers/common-questions-about-porcelain-veneers-answered/';
const NAVIGATION = [
  ['Home', '/veneers/'],
  ['Process', '/veneers/process/'],
  ['Results', '/veneers/results/'],
  ['About', '/veneers/about/'],
  ['Resources', '/veneers/resources/'],
  ['Contact', '/veneers/contact/'],
] as const;

const navigateFreshDocument = async (page: Page, path: string, activate: () => Promise<unknown>) => {
  await page.evaluate(() => {
    Object.defineProperty(window, '__veneersShellDocumentMarker', { value: true, configurable: true });
  });
  // Chromium can activate a WordPress-prefetched document without a new page request.
  // A discarded window marker still proves this was a fresh document, even with a null response.
  const [response] = await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    activate(),
  ]);
  if (response) {
    expect(response.status()).toBe(200);
    expect(new URL(response.url()).pathname).toBe(path);
  }
  await expect.poll(() => new URL(page.url()).pathname).toBe(path);
  await expect.poll(() => page.evaluate(() => Reflect.has(window, '__veneersShellDocumentMarker'))).toBe(false);
};

const expectNoHorizontalOverflow = async (page: Page) => {
  await expect.poll(() => page.evaluate(() => Math.max(
    document.documentElement.scrollWidth,
    document.body.scrollWidth,
  ) - window.innerWidth)).toBeLessThanOrEqual(1);
};

const expectClosedMenuLinksCannotReceiveFocus = async (page: Page) => {
  await expect(page.locator(MENU)).toHaveJSProperty('open', false);
  await expect(page.locator(PANEL)).toBeHidden();
  await page.locator(TOGGLE).focus();
  const hiddenLinksFocused = await page.locator(`${PANEL} a`).evaluateAll((links) => {
    return links.filter((link) => {
      (link as HTMLAnchorElement).focus();
      return document.activeElement === link;
    }).length;
  });
  expect(hiddenLinksFocused).toBe(0);
  await expect(page.locator(TOGGLE)).toBeFocused();
};

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

test('one integrated desktop shell preserves the original pages, archive, and article', async ({ page }) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 1440, height: 900 });
  const pages = [
    ['/veneers/', 'Home', 'The Naturally Radiant Smile You’ve Always Dreamed Of'],
    ['/veneers/process/', 'Process', 'Our Process: Experience the Power of Precision'],
    ['/veneers/results/', 'Results', 'Results Beyond Expectations'],
    ['/veneers/about/', 'About', 'About Dr. Alexie Aguil'],
    ['/veneers/resources/', 'Resources', 'Resources'],
    ['/veneers/contact/', 'Contact', /CONTACT US AT .* TO SCHEDULE YOUR VENEER CONSULTATION/],
    ['/veneers/blog/', 'Resources', 'Blog'],
    [ARTICLE, 'Resources', 'Most Common Questions About Porcelain Veneers Answered by Exquisite Veneers'],
  ] as const;

  for (const [path, current, heading] of pages) {
    await test.step(path, async () => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const header = page.locator(HEADER);
      const footer = page.locator(FOOTER);
      await expect(header).toHaveCount(1);
      await expect(footer).toHaveCount(1);
      await expect(header).toBeVisible();
      await expect(footer).toBeVisible();
      await expect(page.locator('#root')).toHaveCount(0);
      await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();

      const navigation = header.getByRole('navigation', { name: 'Veneers navigation', exact: true });
      await expect(navigation).toBeVisible();
      await expect(navigation.locator('a[aria-current]')).toHaveCount(1);
      const currentType = path === '/veneers/blog/' || path === ARTICLE ? 'location' : 'page';
      await expect(navigation.getByRole('link', { name: current, exact: true })).toHaveAttribute('aria-current', currentType);
      for (const [label, href] of NAVIGATION) {
        await expect(navigation.getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href);
      }
      await expect(header.locator('a[href="/veneers/"] img')).toHaveAttribute('src', /positive-positive\.svg$/);
      await expectNoHorizontalOverflow(page);
    });
  }

  for (const heading of [
    'What Are Porcelain Veneers?',
    'How Long Do Porcelain Veneers Last?',
    'Are Porcelain Veneers the Right Choice for Me?',
    'Enhance Your Smile with Exquisite Veneers',
  ]) {
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
  }
  const featuredImage = page.locator('img.wp-image-1785');
  await featuredImage.scrollIntoViewIfNeeded();
  await expect.poll(() => featuredImage.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
});

test('new shell links load documents and expose the current practice contact and legal pages', async ({ page, request, baseURL }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/veneers/');
  const header = page.locator(HEADER);
  await expect(header.getByRole('link', { name: 'Request consultation', exact: true })).toHaveAttribute('href', '/veneers/contact/');
  await navigateFreshDocument(page, '/veneers/process/', () => header.getByRole('navigation', { name: 'Veneers navigation', exact: true }).getByRole('link', { name: 'Process', exact: true }).click());
  await expect(page).toHaveURL(/\/veneers\/process\/$/);
  await expect(page.locator('#root')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Our Process: Experience the Power of Precision', exact: true })).toBeVisible();
  for (const heading of ['Plan Your Transformation', 'Tailored Design', 'Crafted Perfection', 'Detailed Refinement']) {
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
  }

  const footer = page.locator(FOOTER);
  await expect(footer).toContainText('(323) 272-2388');
  await expect(footer).toContainText('6227 Wilshire Blvd');
  await expect(footer).toContainText(/Los Angeles,? CA 90048/);
  await expect(footer.locator('a[href="tel:+13232722388"]')).toHaveCount(1);
  await expect(footer.locator('a[href="mailto:info@exquisitedentistryla.com"]')).toHaveCount(1);
  expect(await footer.innerText()).not.toMatch(/790[-\s]?3637|767[-\s]?0617|West Hollywood/);

  for (const [path, title] of [
    ['/privacy-policy/', 'Privacy Policy'],
    ['/terms-of-service/', 'Terms of Service'],
    ['/hipaa-compliance/', 'HIPAA Compliance'],
  ]) {
    await expect(footer.locator(`a[href="${path}"]`)).toHaveCount(1);
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(await response.text(), path).toMatch(new RegExp(`<h1\\b[^>]*>${title}</h1>`));
  }

  await navigateFreshDocument(page, '/', () => header.getByRole('link', { name: /Main website/ }).click());
  await expect(page).toHaveURL(new URL('/', baseURL).href);
  await expect(page.locator('#root')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1, name: /Los Angeles Cosmetic Dentist/ })).toBeVisible();
  await expect(page.locator(HEADER)).toHaveCount(0);
});

test('390px mobile navigation supports Escape, outside close, and keyboard routes', async ({ page, browserName }) => {
  // macOS WebKit omits anchors with plain Tab; Option+Tab enables full keyboard navigation.
  const tabKey = browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab';
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/veneers/blog/');
  await page.keyboard.press(tabKey);
  await expect(page.getByRole('link', { name: 'Skip to content', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  await expect.poll(() => page.evaluate((headerSelector) => {
    const header = document.querySelector(headerSelector);
    const heading = document.querySelector('#main h1');
    if (!header || !heading) return Number.NEGATIVE_INFINITY;
    return heading.getBoundingClientRect().top - header.getBoundingClientRect().bottom;
  }, HEADER)).toBeGreaterThanOrEqual(0);

  await page.goto('/veneers/');
  const toggle = page.locator(TOGGLE);
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-controls', 'veneers-shell-menu-panel');
  await expectClosedMenuLinksCannotReceiveFocus(page);
  await expectNoHorizontalOverflow(page);

  await toggle.press('Enter');
  await expect(page.locator(PANEL)).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.keyboard.press('Escape');
  await expectClosedMenuLinksCannotReceiveFocus(page);

  await toggle.click();
  await expect(page.locator(PANEL)).toBeVisible();
  await page.mouse.click(2, 842);
  await expect(page.locator(PANEL)).toBeHidden();

  await toggle.focus();
  await page.keyboard.press('Enter');
  const navigation = page.getByRole('navigation', { name: 'Mobile veneers navigation', exact: true });
  for (const [label] of NAVIGATION) {
    await page.keyboard.press(tabKey);
    await expect(navigation.getByRole('link', { name: label, exact: true })).toBeFocused();
  }
  await navigateFreshDocument(page, '/veneers/contact/', () => page.keyboard.press('Enter'));
  await expect(page).toHaveURL(/\/veneers\/contact\/$/);
  await expect(page.locator('h1').first()).toBeVisible();
  await expect(page.locator(MENU)).toHaveJSProperty('open', false);
  await expectNoHorizontalOverflow(page);
});

test('320px shell stays within the viewport with closed and expanded navigation', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/veneers/');
  await expectClosedMenuLinksCannotReceiveFocus(page);
  await expectNoHorizontalOverflow(page);
  await page.locator(TOGGLE).click();
  await expect(page.locator(PANEL)).toBeVisible();
  const navigation = page.getByRole('navigation', { name: 'Mobile veneers navigation', exact: true });
  for (const [label] of NAVIGATION) {
    await expect(navigation.getByRole('link', { name: label, exact: true })).toBeVisible();
  }
  await expectNoHorizontalOverflow(page);
  await page.locator(TOGGLE).click();
  await expectClosedMenuLinksCannotReceiveFocus(page);
  await expect(page.getByRole('heading', { name: 'The Naturally Radiant Smile You’ve Always Dreamed Of', exact: true })).toBeVisible();
  await expect(page.locator(FOOTER)).toBeVisible();
});

test('resizing an open mobile menu restores desktop navigation and keeps it closed on return', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/veneers/process/');
  await page.locator(TOGGLE).click();
  await expect(page.locator(PANEL)).toBeVisible();
  const processLink = page.getByRole('navigation', { name: 'Mobile veneers navigation', exact: true }).getByRole('link', { name: 'Process', exact: true });
  await processLink.focus();
  await expect(processLink).toBeFocused();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator(MENU)).toHaveJSProperty('open', false);
  await expect(page.locator(TOGGLE)).toBeHidden();
  await expect(page.locator(PANEL)).toBeHidden();
  await expect.poll(() => page.locator(PANEL).evaluate((panel) => panel.contains(document.activeElement))).toBe(false);
  const desktopNavigation = page.locator(HEADER).getByRole('navigation', { name: 'Veneers navigation', exact: true });
  await expect(desktopNavigation).toBeVisible();
  await expect(desktopNavigation.getByRole('link', { name: 'Process', exact: true })).toBeFocused();
  await expectNoHorizontalOverflow(page);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(TOGGLE)).toBeVisible();
  await expect(page.locator(TOGGLE)).toBeFocused();
  await expectClosedMenuLinksCannotReceiveFocus(page);
  await expect(page.locator(HEADER).getByRole('navigation', { name: 'Mobile veneers navigation', exact: true })).toBeHidden();
  await expectNoHorizontalOverflow(page);
});
