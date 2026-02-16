import { expect, test, type Page } from '@playwright/test';

const mobileViewports = [
  { name: 'iphone-se', width: 375, height: 667 },
  { name: 'iphone-12', width: 390, height: 844 },
  { name: 'pixel-7', width: 412, height: 915 },
] as const;

const tabletViewports = [
  { name: 'ipad-portrait', width: 768, height: 1024 },
  { name: 'tablet-wide', width: 900, height: 1200 },
] as const;

const primaryMobileLinks = [
  'Services',
  'Smile Gallery',
  'Patient Reviews',
  'About Dr. Aguil',
  'Locations',
  'Contact',
] as const;

const parseRgb = (color: string) => {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) {
    throw new Error(`Unable to parse RGB color: ${color}`);
  }

  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  };
};

const relativeLuminance = ({ r, g, b }: { r: number; g: number; b: number }) =>
  0.2126 * r + 0.7152 * g + 0.0722 * b;

const stabilizePage = async (page: Page) => {
  await page.waitForLoadState('domcontentloaded');
  await page.addStyleTag({
    content: `
      *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
      video { visibility: hidden !important; }
    `,
  });
};

const openMobileMenu = async (page: Page) => {
  const menuButton = page.locator('button[aria-label="Open navigation menu"]:visible').first();
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  const menuDialog = page.locator('[role="dialog"]').filter({ hasText: 'Book Your Visit' }).first();
  await expect(menuDialog).toBeVisible();
  return menuDialog;
};

const expectMenuLayoutIsReadable = async (page: Page) => {
  const layout = await page.evaluate(() => {
    const nav = document.querySelector('[role="dialog"] nav[aria-label="Mobile"]');
    const firstPrimaryLink = document.querySelector('[role="dialog"] nav ul a');
    if (!nav || !firstPrimaryLink) return null;

    const navStyles = getComputedStyle(nav);
    const firstStyles = getComputedStyle(firstPrimaryLink);
    const firstRect = firstPrimaryLink.getBoundingClientRect();

    return {
      navDisplay: navStyles.display,
      navDirection: navStyles.flexDirection,
      navJustify: navStyles.justifyContent,
      linkDisplay: firstStyles.display,
      linkPaddingY: Number.parseFloat(firstStyles.paddingTop),
      linkClassName: firstPrimaryLink.className,
      linkHeight: firstRect.height,
    };
  });

  expect(layout).not.toBeNull();
  expect(layout!.navDisplay).toBe('flex');
  expect(layout!.navDirection).toBe('column');
  expect(layout!.navJustify).toBe('flex-start');
  expect(layout!.linkDisplay).toBe('block');
  expect(layout!.linkPaddingY).toBeGreaterThanOrEqual(10);
  expect(layout!.linkHeight).toBeGreaterThanOrEqual(44);
  expect(layout!.linkClassName).not.toContain('=>');
};

for (const viewport of mobileViewports) {
  test.describe(`navbar mobile (${viewport.name})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await stabilizePage(page);
    });

    test('header fits viewport and controls have adequate touch targets', async ({ page }) => {
      const header = page.locator('header').first();
      const logoLink = page.locator('header a[href="/"]').first();
      const searchButton = page.locator('button[aria-label="Search site"]:visible').first();
      const menuButton = page
        .locator('button[aria-label="Open navigation menu"]:visible, button[aria-label="Close navigation menu"]:visible')
        .first();

      await expect(header).toBeVisible();
      await expect(logoLink).toBeVisible();
      await expect(searchButton).toBeVisible();
      await expect(menuButton).toBeVisible();

      const headerOverflow = await header.evaluate((el) => el.scrollWidth - el.clientWidth);
      expect(headerOverflow).toBeLessThanOrEqual(1);

      const pageOverflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth - doc.clientWidth;
      });
      expect(pageOverflow).toBeLessThanOrEqual(1);

      const headerBox = await header.boundingBox();
      expect(headerBox).not.toBeNull();
      expect(headerBox!.height).toBeGreaterThanOrEqual(60);
      expect(headerBox!.height).toBeLessThanOrEqual(84);

      const logoBox = await logoLink.boundingBox();
      const searchBox = await searchButton.boundingBox();
      expect(logoBox).not.toBeNull();
      expect(searchBox).not.toBeNull();
      expect(logoBox!.x + logoBox!.width + 6).toBeLessThanOrEqual(searchBox!.x);

      for (const control of [searchButton, menuButton]) {
        const controlBox = await control.boundingBox();
        expect(controlBox).not.toBeNull();
        expect(controlBox!.width).toBeGreaterThanOrEqual(44);
        expect(controlBox!.height).toBeGreaterThanOrEqual(44);
      }
    });

    test('mobile menu supports conversion flow and closes on navigation', async ({ page }) => {
      const menuDialog = await openMobileMenu(page);

      await expect(menuDialog.getByRole('link', { name: 'Schedule Consultation' })).toBeVisible();
      await expect(menuDialog.getByRole('link', { name: /Call \(323\) 272-2388/i })).toBeVisible();

      for (const label of primaryMobileLinks) {
        await expect(menuDialog.getByRole('link', { name: label })).toBeVisible();
      }

      await expectMenuLayoutIsReadable(page);

      const popularServicesButton = menuDialog.getByRole('button', { name: 'Popular Services' });
      await popularServicesButton.click();
      await expect(menuDialog.getByRole('link', { name: 'Porcelain Veneers' })).toBeVisible();
      await expect(menuDialog.getByRole('link', { name: 'Emergency Dentist' })).toBeVisible();

      await menuDialog.getByRole('link', { name: 'Porcelain Veneers' }).click();
      await expect(page).toHaveURL(/\/veneers\/?$/);
      await expect(menuDialog).toBeHidden();
    });

    test('header stays sticky after scroll on mobile', async ({ page }) => {
      const header = page.locator('header').first();
      await page.evaluate(() => window.scrollTo(0, 900));
      await expect(header).toBeVisible();

      const top = await header.evaluate((el) => Math.round(el.getBoundingClientRect().top));
      expect(top).toBeLessThanOrEqual(1);
      expect(top).toBeGreaterThanOrEqual(-1);
    });
  });
}

for (const viewport of tabletViewports) {
  test(`tablet nav (${viewport.name}) keeps header controls and readable sheet layout`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    await stabilizePage(page);

    const header = page.locator('header').first();
    await expect(header).toBeVisible();
    await expect(header.locator('a[href^="/schedule-consultation"]:visible').first()).toBeVisible();
    await expect(page.locator('button[aria-label="Search site"]:visible').first()).toBeVisible();
    await expect(page.locator('button[aria-label="Open navigation menu"]:visible').first()).toBeVisible();

    const headerOverflow = await header.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(headerOverflow).toBeLessThanOrEqual(1);

    const pageOverflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });
    expect(pageOverflow).toBeLessThanOrEqual(1);

    const menuDialog = await openMobileMenu(page);
    const menuBox = await menuDialog.boundingBox();
    expect(menuBox).not.toBeNull();
    expect(menuBox!.width).toBeGreaterThanOrEqual(400);
    expect(menuBox!.width).toBeLessThanOrEqual(520);
    expect(menuBox!.x).toBeGreaterThan(150);

    await expectMenuLayoutIsReadable(page);
  });
}

test('narrow desktop viewport keeps mobile nav sheet readable', async ({ page }) => {
  await page.setViewportSize({ width: 443, height: 900 });
  await page.goto('/');
  await stabilizePage(page);

  const menuDialog = await openMobileMenu(page);

  const panelBackground = await menuDialog.evaluate((el) => getComputedStyle(el).backgroundColor);
  const panelTone = relativeLuminance(parseRgb(panelBackground));
  expect(panelTone).toBeLessThan(70);

  const heading = menuDialog.getByText('Book Your Visit');
  await expect(heading).toBeVisible();
  const headingColor = await heading.evaluate((el) => getComputedStyle(el).color);
  const headingTone = relativeLuminance(parseRgb(headingColor));
  expect(headingTone).toBeGreaterThan(180);

  await expect(menuDialog.getByRole('link', { name: 'Schedule Consultation' })).toBeVisible();
  await expect(menuDialog.getByRole('link', { name: /Call \(323\) 272-2388/i })).toBeVisible();
});

test('desktop compact mode uses inline nav and keeps actions unclipped', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('/');
  await stabilizePage(page);

  const header = page.locator('header').first();
  await expect(header).toBeVisible();
  await expect(page.locator('nav[aria-label="Primary"]')).toBeVisible();
  await expect(page.locator('button[aria-label="Open navigation menu"]')).toBeHidden();
  await expect(page.locator('button[aria-label="More pages"]')).toBeVisible();
  await expect(page.locator('header a[href^="/schedule-consultation"]:visible').first()).toBeVisible();

  const headerOverflow = await header.evaluate((el) => el.scrollWidth - el.clientWidth);
  expect(headerOverflow).toBeLessThanOrEqual(1);
});

test('desktop services dropdown keeps readable contrast and remains on-screen', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await stabilizePage(page);

  await page.getByRole('button', { name: 'Browse services' }).click();
  const servicesMenu = page.locator('[role="menu"]').first();
  await expect(servicesMenu).toBeVisible();

  const menuBackground = await servicesMenu.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(menuBackground).not.toContain('255, 255, 255');

  const menuBounds = await servicesMenu.boundingBox();
  expect(menuBounds).not.toBeNull();
  expect(menuBounds!.x).toBeGreaterThanOrEqual(8);
  expect(menuBounds!.x + menuBounds!.width).toBeLessThanOrEqual(1432);

  const serviceCards = servicesMenu.locator('a[href]');
  await expect(serviceCards).toHaveCount(6);

  for (let i = 0; i < 6; i += 1) {
    const card = serviceCards.nth(i);
    const box = await card.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(58);

    const label = card.locator('span').first();
    await expect(label).toBeVisible();
    await expect(label).not.toHaveText('');
  }
});
