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
  'Smile Gallery',
  'Patient Reviews',
  'About Dr. Aguil',
  'Financing',
  'Locations',
  'Contact',
] as const;

const CALL_LINK = 'a[aria-label="Call (323) 272-2388"]:visible';

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
      const callButton = header.locator(CALL_LINK).first();
      const menuButton = page
        .locator('button[aria-label="Open navigation menu"]:visible, button[aria-label="Close navigation menu"]:visible')
        .first();

      await expect(header).toBeVisible();
      await expect(logoLink).toBeVisible();
      await expect(callButton).toBeVisible();
      await expect(menuButton).toBeVisible();
      await expect(header.locator('a[href^="/schedule-consultation"]:visible').first()).toHaveCSS(
        'color',
        'rgb(255, 255, 255)',
      );

      const headerOverflow = await header.evaluate((el) => el.scrollWidth - el.clientWidth);
      expect(headerOverflow).toBeLessThanOrEqual(1);

      const pageOverflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth - doc.clientWidth;
      });
      const overflowingElements = await page.evaluate(() => Array.from(document.querySelectorAll('body *')).filter(el => {
        const box = el.getBoundingClientRect();
        return box.right > window.innerWidth + 1 && box.width > 0;
      }).slice(0, 5).map(el => ({ tag: el.tagName, class: el.className, right: el.getBoundingClientRect().right })));
      expect(pageOverflow, JSON.stringify(overflowingElements)).toBeLessThanOrEqual(1);

      const headerBox = await header.boundingBox();
      expect(headerBox).not.toBeNull();
      expect(headerBox!.height).toBeGreaterThanOrEqual(60);
      expect(headerBox!.height).toBeLessThanOrEqual(84);

      const logoBox = await logoLink.boundingBox();
      const callBox = await callButton.boundingBox();
      expect(logoBox).not.toBeNull();
      expect(callBox).not.toBeNull();
      expect(logoBox!.x + logoBox!.width + 6).toBeLessThanOrEqual(callBox!.x);

      for (const control of [callButton, menuButton]) {
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
      await expect(menuDialog.getByRole('button', { name: 'Search site', exact: true })).toBeVisible();

      for (const label of primaryMobileLinks) {
        await expect(menuDialog.getByRole('link', { name: label })).toBeVisible();
      }

      await expectMenuLayoutIsReadable(page);

      const servicesButton = menuDialog.getByRole('button', { name: 'Services', exact: true });
      await expect(servicesButton).toHaveAttribute('aria-expanded', 'false');
      await servicesButton.click();
      await expect(servicesButton).toHaveAttribute('aria-expanded', 'true');
      await expect(menuDialog.getByRole('link', { name: 'All services' })).toBeVisible();
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
    await expect(header.locator(CALL_LINK).first()).toBeVisible();
    await expect(page.locator('button[aria-label="Open navigation menu"]:visible').first()).toBeVisible();

    const headerOverflow = await header.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(headerOverflow).toBeLessThanOrEqual(1);

    const pageOverflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });
    const overflowingElements = await page.evaluate(() => Array.from(document.querySelectorAll('body *')).filter(el => {
        const box = el.getBoundingClientRect();
        return box.right > window.innerWidth + 1 && box.width > 0;
      }).slice(0, 5).map(el => ({ tag: el.tagName, class: el.className, right: el.getBoundingClientRect().right })));
      expect(pageOverflow, JSON.stringify(overflowingElements)).toBeLessThanOrEqual(1);

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
  const bookButton = page.locator('header a[href^="/schedule-consultation"]:visible').first();
  await expect(bookButton).toBeVisible();
  await expect(bookButton).toHaveCSS('color', 'rgb(255, 255, 255)');
  await bookButton.hover();
  await expect(bookButton).toHaveCSS('color', 'rgb(255, 255, 255)');

  const headerOverflow = await header.evaluate((el) => el.scrollWidth - el.clientWidth);
  expect(headerOverflow).toBeLessThanOrEqual(1);
});

test('desktop services mega menu is readable, on-screen and keyboard operable', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await stabilizePage(page);

  const trigger = page.getByRole('button', { name: 'Browse services' });
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');

  const panel = page.locator('#nav-panel-services');
  await expect(panel).toBeVisible();

  const panelBackground = await panel.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(relativeLuminance(parseRgb(panelBackground))).toBeLessThan(40);

  const bounds = await panel.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(1440);
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(900);

  for (const label of ['Porcelain Veneers', 'Dental Implants', 'Invisalign', 'Emergency Dentist', 'iTero Scanner']) {
    const link = panel.getByRole('link', { name: new RegExp(`^${label}`) });
    await expect(link).toBeVisible();
    const box = await link.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
  await expect(panel.getByRole('link', { name: 'View all services' })).toBeVisible();
  await expect(panel.getByRole('link', { name: 'Book a consultation' })).toBeVisible();

  // Escape closes the panel and hands focus back to the trigger.
  await panel.getByRole('link', { name: /^Porcelain Veneers/ }).focus();
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();

  // ArrowDown on the trigger opens it and moves into the first link; choosing a link navigates and closes.
  await page.keyboard.press('ArrowDown');
  await expect(panel).toBeVisible();
  await expect(panel.getByRole('link', { name: /^Porcelain Veneers/ })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/veneers\/?$/);
  await expect(panel).toBeHidden();
  await expect(page.locator('nav[aria-label="Primary"] button[aria-label="Browse services"]')).toHaveAttribute('aria-expanded', 'false');
});

test('desktop More panel opens on hover intent and closes on outside click', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await stabilizePage(page);

  const trigger = page.getByRole('button', { name: 'More pages' });
  await trigger.hover();
  const panel = page.locator('#nav-panel-more');
  await expect(panel).toBeVisible();
  await expect(panel.getByRole('link', { name: 'Insurance' })).toBeVisible();
  await expect(panel.getByRole('link', { name: 'Contact' })).toBeVisible();
  const bounds = await panel.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(1280);

  await page.mouse.click(640, 700);
  await expect(panel).toBeHidden();
});

test('desktop panels survive clicks inside and swallow the dismissing click', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await stabilizePage(page);

  // A press on a non-focusable spot inside the open panel must not close it.
  const trigger = page.getByRole('button', { name: 'Browse services' });
  await trigger.click();
  const panel = page.locator('#nav-panel-services');
  await expect(panel).toBeVisible();
  await panel.getByText('Change how your smile looks.').click();
  await page.waitForTimeout(300);
  await expect(panel).toBeVisible();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();

  // Clicking the dimmed page closes the More panel without activating what lies beneath.
  const heroCta = page.locator('main a[href^="/schedule-consultation"]').first();
  await expect(heroCta).toBeVisible();
  const ctaBox = await heroCta.boundingBox();
  await page.getByRole('button', { name: 'More pages' }).click();
  await expect(page.locator('#nav-panel-more')).toBeVisible();
  await page.mouse.click(ctaBox!.x + ctaBox!.width / 2, ctaBox!.y + ctaBox!.height / 2);
  await expect(page.locator('#nav-panel-more')).toBeHidden();
  await page.waitForTimeout(400);
  await expect(page).toHaveURL(/\/$/);
});

for (const width of [1024, 1100, 1280, 1440, 1920, 2560]) {
  test(`desktop header at ${width}px keeps every control on one row without overlap`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await stabilizePage(page);

    const header = page.locator('header').first();
    expect(await header.evaluate((el) => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);

    const boxes = await page.evaluate(() => {
      const pick = (selector: string) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
      };
      return {
        logo: pick('header a[href="/"]'),
        nav: pick('nav[aria-label="Primary"] > ul'),
        search: pick('header button[aria-label="Search site"]'),
        book: pick('header a[href^="/schedule-consultation"]'),
      };
    });

    expect(boxes.logo && boxes.nav && boxes.search && boxes.book).toBeTruthy();
    expect(boxes.logo!.right).toBeLessThan(boxes.nav!.left);
    expect(boxes.nav!.right).toBeLessThan(boxes.search!.left);
    expect(boxes.book!.right).toBeLessThanOrEqual(width);
    // Single row: all controls share the main bar.
    expect(Math.abs(boxes.nav!.top - boxes.search!.top)).toBeLessThanOrEqual(1);
  });
}

test('desktop utility strip scrolls away without shifting page content', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await stabilizePage(page);

  const header = page.locator('header').first();
  const mainTop = await page.evaluate(() => document.querySelector('main')!.getBoundingClientRect().top + window.scrollY);
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect.poll(() => header.evaluate((el) => Math.round(el.getBoundingClientRect().top))).toBe(-36);
  const mainTopAfter = await page.evaluate(() => document.querySelector('main')!.getBoundingClientRect().top + window.scrollY);
  expect(mainTopAfter).toBe(mainTop);
  await expect(page.locator('nav[aria-label="Primary"]')).toBeInViewport();
});

for (const width of [320, 390, 768]) {
  test(`${width}px enlarged text keeps booking, search and navigation reachable`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.addInitScript(() => {
      localStorage.setItem('exquisite_analytics_consent_v2', 'denied');
      localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2', 'denied');
    });
    await page.route(/player.vimeo.com|files.withcherry.com/, route => route.abort());
    await page.goto('/');
    await stabilizePage(page);
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    const header = page.locator('header');
    const controls = [
      header.getByRole('link', { name: 'Book', exact: true }),
      header.getByRole('link', { name: 'Call (323) 272-2388', exact: true }),
      header.getByRole('button', { name: 'Open navigation menu', exact: true }),
    ];
    expect(await header.evaluate(el => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
    for (const control of controls) {
      await expect(control).toBeVisible();
      const box = await control.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(await control.evaluate(el => {
        const rect = el.getBoundingClientRect();
        return el.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2));
      })).toBe(true);
    }
    // Search lives at the top of the menu.
    const searchMenu = await openMobileMenu(page);
    await searchMenu.getByRole('button', { name: 'Search site', exact: true }).click();
    const searchInput = page.getByPlaceholder('Search services, locations, pages, or blog posts…');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('veneers');
    await expect(searchInput).toHaveValue('veneers');
    await page.getByRole('button', { name: 'Close search', exact: true }).click();
    const menu = await openMobileMenu(page);
    const menuBounds = await menu.boundingBox();
    expect(menuBounds!.x).toBeGreaterThanOrEqual(0);
    expect(menuBounds!.x + menuBounds!.width).toBeLessThanOrEqual(width + 1);
    const booking = menu.getByRole('link', { name: 'Schedule Consultation', exact: true });
    await expect(booking).toBeVisible();
    expect(await booking.evaluate(el => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
    await booking.click();
    await expect(page).toHaveURL(/\/schedule-consultation\/?$/);
    await expect(menu).toBeHidden();
  });
}
