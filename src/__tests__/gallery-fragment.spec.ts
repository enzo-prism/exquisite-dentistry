import { expect, test, type Page } from '@playwright/test';

const galleryUrl = '/smile-gallery/?treatment=veneers#smile-gallery-cases';

async function expectCasesLanding(page: Page) {
  await expect(page).toHaveURL(galleryUrl);
  const cases = page.locator('section#smile-gallery-cases');
  await expect(cases).toBeInViewport();
  await expect.poll(() => cases.evaluate(section =>
    Math.abs(section.getBoundingClientRect().top - parseFloat(getComputedStyle(section).scrollMarginTop)),
  )).toBeLessThanOrEqual(1);
  await expect(cases.getByRole('heading', { name: 'Client Smile Transformations' }))
    .toBeInViewport({ ratio: 1 });
  await expect.poll(async () => {
    const header = await page.getByRole('banner').boundingBox();
    const section = await cases.boundingBox();
    return header && section ? section.y - (header.y + header.height) : -1;
  }).toBeGreaterThanOrEqual(0);
  await expect(cases.getByRole('button', { name: 'Veneers', exact: true })).toHaveAttribute('aria-pressed', 'true');
}


const slidersUrl = '/smile-gallery/#smile-gallery-sliders';

async function expectSlidersLanding(page: Page) {
  await expect(page).toHaveURL(/\/smile-gallery\/?#smile-gallery-sliders$/);
  const sliders = page.locator('section#smile-gallery-sliders');
  await expect(sliders).toBeInViewport();
  await expect.poll(() => sliders.evaluate(section =>
    Math.abs(section.getBoundingClientRect().top - parseFloat(getComputedStyle(section).scrollMarginTop)),
  ), { timeout: 10_000 }).toBeLessThanOrEqual(1);
  await expect(sliders.getByRole('heading', { name: 'Up Close Transformations' }))
    .toBeInViewport({ ratio: 1 });
  await expect.poll(async () => {
    const header = await page.getByRole('banner').boundingBox();
    const section = await sliders.boundingBox();
    return header && section ? section.y - (header.y + header.height) : -1;
  }).toBeGreaterThanOrEqual(0);
}

const readScrollY = (page: Page) => page.evaluate(() => window.scrollY);

const disableSmoothScroll = async (page: Page) => {
  await page.addStyleTag({ content: 'html, body { scroll-behavior: auto !important; }' });
};


const delayGalleryImages = async (page: Page, delayMs = 1_800) => {
  await page.route(/\.(?:webp|png|jpe?g)(?:\?|$)/i, async route => {
    await new Promise(resolve => setTimeout(resolve, delayMs));
    await route.continue();
  });
};

const injectLateLayoutSpacer = async (page: Page, height = 400) => {
  await page.evaluate((spacerHeight) => {
    const sliders = document.getElementById('smile-gallery-sliders');
    if (!sliders?.parentElement) return;
    const spacer = document.createElement('div');
    spacer.dataset.testid = 'late-layout-spacer';
    spacer.style.height = `${spacerHeight}px`;
    spacer.style.overflowAnchor = 'none';
    sliders.parentElement.style.overflowAnchor = 'none';
    sliders.parentElement.insertBefore(spacer, sliders);
  }, height);
};

const waitFrom = async (startedAt: number, offsetMs: number) => {
  const remaining = offsetMs - (Date.now() - startedAt);
  if (remaining > 0) await new Promise(resolve => setTimeout(resolve, remaining));
};

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test.describe(`gallery fragments at ${viewport.width}px`, () => {
    test.use({ viewport });

    test('lands on the cases from a fresh fragment URL', async ({ page }) => {
      await page.goto(galleryUrl);
      await expectCasesLanding(page);
    });

    test('lands on the close-ups from a fresh fragment URL', async ({ page }) => {
      await page.goto(slidersUrl);
      await expectSlidersLanding(page);
    });

    for (const { path, link } of [
      { path: '/veneers/front-teeth-veneers-los-angeles/', link: 'View veneer transformations' },
      { path: '/blog/the-shapes-and-styles-of-dental-veneers/', link: 'Explore veneer cases in the smile gallery' },
    ]) {
      test(`lands on the cases via “${link}”`, async ({ page }) => {
        await page.goto(path);
        await page.getByRole('link', { name: link, exact: true }).click();
        await expectCasesLanding(page);
      });
    }

    test('lands on the close-ups via “View More Close-Ups”', async ({ page }) => {
      await page.goto('/blog/veneers-before-after-los-angeles/');
      await page.getByRole('link', { name: 'View More Close-Ups', exact: true }).click();
      await expectSlidersLanding(page);
    });

    test('keeps a user wheel from being yanked back after delayed images', async ({ page }) => {
      await delayGalleryImages(page);
      const startedAt = Date.now();
      await page.goto(slidersUrl, { waitUntil: 'domcontentloaded' });
      await disableSmoothScroll(page);
      const sliders = page.locator('section#smile-gallery-sliders');
      await expect(sliders).toBeVisible();
      await waitFrom(startedAt, 1_000);
      const before = await readScrollY(page);
      await page.evaluate(() => {
        window.dispatchEvent(new WheelEvent('wheel', { deltaY: -1200, bubbles: true, cancelable: true }));
        window.scrollTo({ top: Math.max(0, window.scrollY - 1200), behavior: 'instant' });
      });
      const afterUser = await readScrollY(page);
      expect(afterUser).toBeLessThan(before);
      await waitFrom(startedAt, 1_800);
      await injectLateLayoutSpacer(page);
      await waitFrom(startedAt, 2_500);
      expect(Math.abs(await readScrollY(page) - afterUser)).toBeLessThanOrEqual(16);
    });

    test('keeps a PageUp from being yanked back after delayed images', async ({ page }) => {
      await delayGalleryImages(page);
      const startedAt = Date.now();
      await page.goto(slidersUrl, { waitUntil: 'domcontentloaded' });
      await disableSmoothScroll(page);
      const sliders = page.locator('section#smile-gallery-sliders');
      await expect(sliders).toBeVisible();
      await waitFrom(startedAt, 1_000);
      const before = await readScrollY(page);
      await page.evaluate(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', code: 'PageUp', bubbles: true, cancelable: true }));
        window.scrollTo({ top: Math.max(0, window.scrollY - Math.max(400, Math.floor(window.innerHeight * 0.9))), behavior: 'instant' });
      });
      const afterUser = await readScrollY(page);
      expect(afterUser).toBeLessThan(before);
      await waitFrom(startedAt, 1_800);
      await injectLateLayoutSpacer(page);
      await waitFrom(startedAt, 2_500);
      expect(Math.abs(await readScrollY(page) - afterUser)).toBeLessThanOrEqual(16);
    });

    test('follows late injected layout back to the close-ups', async ({ page }) => {
      await page.goto(slidersUrl);
      await expectSlidersLanding(page);
      await injectLateLayoutSpacer(page);
      const sliders = page.locator('section#smile-gallery-sliders');
      await expect.poll(() => sliders.evaluate(section =>
        Math.abs(section.getBoundingClientRect().top - parseFloat(getComputedStyle(section).scrollMarginTop)),
      ), { timeout: 2_000 }).toBeLessThanOrEqual(1);
      await expect.poll(() => sliders.evaluate(section => section.getBoundingClientRect().top))
        .toBeLessThan(200);
    });

    test('scrolls to the close-ups on a synthetic hashchange', async ({ page }) => {
      await page.goto('/smile-gallery/');
      await expect(page.locator('section#smile-gallery-sliders')).toBeVisible();
      await page.evaluate(() => window.scrollTo(0, 0));
      expect(await readScrollY(page)).toBeLessThan(40);
      await page.evaluate(() => {
        history.replaceState(null, '', '#smile-gallery-sliders');
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      });
      await expectSlidersLanding(page);
    });

    test('re-scrolls when the current close-ups hash is clicked again', async ({ page }) => {
      await page.goto(slidersUrl);
      await disableSmoothScroll(page);
      await expectSlidersLanding(page);
      await page.evaluate(() => {
        window.dispatchEvent(new WheelEvent('wheel', { deltaY: -1, bubbles: true, cancelable: true }));
        history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
        window.scrollTo({ top: 0, behavior: 'instant' });
        history.replaceState(null, '', '#smile-gallery-sliders');
      });
      expect(await readScrollY(page)).toBeLessThan(40);
      await page.evaluate(() => {
        const link = document.createElement('a');
        link.href = '#smile-gallery-sliders';
        link.dataset.testid = 'same-hash-again';
        link.textContent = 'Same hash again';
        // Prevent Chromium's native fragment jump so only our same-hash listener can re-scroll.
        link.addEventListener('click', (event) => event.preventDefault());
        document.body.appendChild(link);
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
      });
      await expectSlidersLanding(page);
    });
  });
}
