import { expect, test, type Locator, type Page } from '@playwright/test';

// Before/after comparison slider (src/components/ui/comparison-slider.tsx).
// Each test pins one input path that used to break: native image drag hijacking
// a mouse drag, a page scroll that started on a photo moving the divider, and
// touch drags / taps. See docs/comparison-slider.md.

const SLIDER_NAME = 'Compare Brittany before and after Porcelain Veneers';

const preparePage = async (page: Page) => {
  await page.addInitScript(() => {
    localStorage.setItem('exquisite_analytics_consent_v2', 'denied');
    localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2', 'denied');
  });
  await page.route('**/*', (route) => {
    const host = new URL(route.request().url()).hostname;
    return host === '127.0.0.1' || host === 'localhost' ? route.continue() : route.abort();
  });
};

/** Exact divider position, read from the range input's spoken value. */
const position = async (slider: Locator) => {
  const text = (await slider.getAttribute('aria-valuetext')) ?? '';
  const match = text.match(/^Before photo (\d+)%/);
  if (!match) throw new Error(`Unexpected aria-valuetext: ${text}`);
  return Number(match[1]);
};

/** Opens the gallery with reduced motion so the one-time auto-peek never moves the divider under a test. */
const openSlider = async (page: Page) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/smile-gallery/?treatment=veneers');
  const slider = page.getByRole('slider', { name: SLIDER_NAME });
  const frame = slider.locator('xpath=ancestor::*[@data-comparison-slider][1]');
  await frame.scrollIntoViewIfNeeded();
  // The knob renders once both photos have loaded.
  await expect(frame.locator('svg').first()).toBeVisible();
  return { slider, frame };
};

test.beforeEach(async ({ page }) => preparePage(page));

test('mouse drag from anywhere on the photo follows the pointer and stops on release', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  const { slider, frame } = await openSlider(page);
  await page.evaluate(() => {
    (window as unknown as { __nativeDrag: boolean }).__nativeDrag = false;
    document.addEventListener('dragstart', () => {
      (window as unknown as { __nativeDrag: boolean }).__nativeDrag = true;
    }, true);
  });
  const box = (await frame.boundingBox())!;
  const y = box.y + box.height / 2;

  await page.mouse.move(box.x + box.width * 0.2, y);
  await page.mouse.down();
  await expect.poll(() => position(slider)).toBe(20);
  for (let step = 1; step <= 10; step += 1) {
    await page.mouse.move(box.x + box.width * (0.2 + step * 0.06), y);
  }
  await expect.poll(() => position(slider)).toBe(80);
  await page.mouse.up();

  // After release the divider must ignore further mouse movement.
  await page.mouse.move(box.x + box.width * 0.35, y);
  await page.waitForTimeout(100);
  expect(await position(slider)).toBe(80);
  expect(await page.evaluate(() => (window as unknown as { __nativeDrag: boolean }).__nativeDrag)).toBe(false);
  expect(await page.evaluate(() => String(window.getSelection()))).toBe('');
});

test('both photos share one frame so the layers stay in register', async ({ page }) => {
  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const { frame } = await openSlider(page);
    const boxes = await frame.locator('img').evaluateAll((images) =>
      images.map((image) => {
        const rect = image.getBoundingClientRect();
        return [Math.round(rect.x), Math.round(rect.y), Math.round(rect.width), Math.round(rect.height)];
      })
    );
    expect(boxes).toHaveLength(2);
    expect(boxes[0]).toEqual(boxes[1]);
    const frameBox = (await frame.boundingBox())!;
    expect(Math.round(frameBox.width)).toBe(boxes[0][2]);
  }
});

test.describe('touch', () => {
  // Real touch sequences need CDP Input.dispatchTouchEvent, which only Chromium exposes.
  test.skip(({ browserName }) => browserName !== 'chromium', 'touch synthesis is Chromium-only');
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  const touchSession = async (page: Page) => {
    const cdp = await page.context().newCDPSession(page);
    return (type: 'touchStart' | 'touchMove' | 'touchEnd', x = 0, y = 0) =>
      cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] });
  };

  test('a vertical swipe that starts on a photo scrolls the page and leaves the divider alone', async ({ page }) => {
    const { slider, frame } = await openSlider(page);
    const touch = await touchSession(page);
    const box = (await frame.boundingBox())!;
    const x = box.x + box.width * 0.15;
    const y = box.y + box.height * 0.7;
    const scrollBefore = await page.evaluate(() => window.scrollY);

    await touch('touchStart', x, y);
    for (let step = 1; step <= 8; step += 1) {
      await touch('touchMove', x + step * 1.5, y - step * 18);
      await page.waitForTimeout(16);
    }
    await touch('touchEnd');
    await page.waitForTimeout(300);

    expect(await position(slider)).toBe(50);
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(scrollBefore + 50);
  });

  test('a sideways swipe drags the divider and a tap jumps it', async ({ page }) => {
    const { slider, frame } = await openSlider(page);
    const touch = await touchSession(page);
    let box = (await frame.boundingBox())!;
    const y = box.y + box.height / 2;

    await touch('touchStart', box.x + box.width * 0.5, y);
    for (let step = 1; step <= 10; step += 1) {
      await touch('touchMove', box.x + box.width * (0.5 + step * 0.035), y + (step % 2));
      await page.waitForTimeout(16);
    }
    await touch('touchEnd');
    await expect.poll(() => position(slider)).toBe(85);

    box = (await frame.boundingBox())!;
    await touch('touchStart', box.x + box.width * 0.25, box.y + box.height / 2);
    await page.waitForTimeout(60);
    await touch('touchEnd');
    await expect.poll(() => position(slider)).toBe(25);
  });
});

test('auto-peek runs once and settles back at the midpoint', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/smile-gallery/?treatment=veneers');
  const slider = page.getByRole('slider', { name: SLIDER_NAME });
  await slider.locator('xpath=ancestor::*[@data-comparison-slider][1]').scrollIntoViewIfNeeded();
  const seen = new Set<number>();
  await expect.poll(async () => {
    seen.add(await position(slider));
    return Math.min(...seen);
  }, { timeout: 8_000, intervals: [50] }).toBeLessThan(35);
  await expect.poll(() => position(slider), { timeout: 6_000 }).toBe(50);
});
