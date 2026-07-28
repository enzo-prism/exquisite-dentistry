import { test, expect, type Page } from '@playwright/test';

/**
 * Guards the reviews UX requested in the 2026-07-27 client sync: ~3 cards in
 * view behind arrows, video and written reviews split into separate sections,
 * a "Read More Reviews" route into /testimonials/, and theme filters there.
 *
 * The scroll assertions matter: CSS `scroll-behavior: smooth` on a
 * `scroll-snap-type: mandatory` track silently prevents programmatic scrolling
 * in Chromium, which is exactly how this carousel first shipped broken.
 */

const revealCarousel = async (page: Page, label: string) => {
  const region = page.getByRole('region', { name: label });
  await region.scrollIntoViewIfNeeded();
  // Let the reveal-on-scroll wrapper finish before measuring geometry.
  await page.waitForTimeout(600);
  return region;
};

test.describe('homepage reviews', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('splits video and written reviews into separate labelled sections', async ({ page }) => {
    // Both headings sit below the fold inside a lazy route chunk, so scroll
    // them in rather than racing the initial paint.
    const video = page.getByRole('heading', { name: 'Video Reviews' });
    await video.scrollIntoViewIfNeeded();
    await expect(video).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Written Reviews' })).toBeVisible();
  });

  test('keeps every card in the DOM so the set stays crawlable', async ({ page }) => {
    const video = await revealCarousel(page, 'Video reviews');
    const written = await revealCarousel(page, 'Written reviews');

    expect(await video.locator('.snap-start').count()).toBe(8);
    expect(await written.locator('.snap-start').count()).toBe(12);
  });

  test('shows about three cards per view on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const region = await revealCarousel(page, 'Video reviews');
    const track = region.locator('.snap-x');

    const perView = await track.evaluate((el) => {
      const card = el.querySelector('.snap-start') as HTMLElement;
      return el.clientWidth / card.getBoundingClientRect().width;
    });

    expect(perView).toBeGreaterThan(2.5);
    expect(perView).toBeLessThan(3.5);
  });

  test('collapses to one card per view on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const region = await revealCarousel(page, 'Video reviews');
    const track = region.locator('.snap-x');

    const perView = await track.evaluate((el) => {
      const card = el.querySelector('.snap-start') as HTMLElement;
      return el.clientWidth / card.getBoundingClientRect().width;
    });

    expect(perView).toBeGreaterThan(0.8);
    expect(perView).toBeLessThan(1.3);
  });

  test('arrows page the track and reflect their disabled state', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const region = await revealCarousel(page, 'Video reviews');
    const track = region.locator('.snap-x');
    const prev = region.getByRole('button', { name: 'Previous video reviews' });
    const next = region.getByRole('button', { name: 'Next video reviews' });

    await expect(prev).toBeDisabled();
    await expect(next).toBeEnabled();

    const startX = await track.evaluate((el) => el.scrollLeft);
    await next.click();
    await page.waitForTimeout(900);

    const afterNext = await track.evaluate((el) => el.scrollLeft);
    expect(afterNext).toBeGreaterThan(startX + 100);
    await expect(prev).toBeEnabled();

    await prev.click();
    await page.waitForTimeout(900);
    expect(await track.evaluate((el) => el.scrollLeft)).toBeLessThan(afterNext);
  });

  test('links through to the full reviews page', async ({ page }) => {
    // Exact match: PracticeVideoSection's compact carousel also renders a
    // lower-case "Read more reviews" link to the same destination.
    const cta = page.getByRole('link', { name: 'Read More Reviews', exact: true });
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeVisible();
    await cta.click();
    await expect(page).toHaveURL(/\/testimonials\/?$/);
  });
});

test.describe('testimonials page', () => {
  test('renders every written review by default and filters by theme', async ({ page }) => {
    await page.goto('/testimonials/');

    const all = page.getByRole('button', { name: 'All Reviews' });
    await all.scrollIntoViewIfNeeded();
    await expect(all).toHaveAttribute('aria-pressed', 'true');

    const cards = page.locator('article').filter({ hasText: 'Patient' });
    const total = await cards.count();
    expect(total).toBeGreaterThan(50);

    const teamFilter = page.getByRole('button', { name: 'The Team' });
    await teamFilter.click();
    await expect(teamFilter).toHaveAttribute('aria-pressed', 'true');

    const filtered = await cards.count();
    expect(filtered).toBeGreaterThan(0);
    expect(filtered).toBeLessThan(total);

    await all.click();
    expect(await cards.count()).toBe(total);
  });
});
