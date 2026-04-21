import { expect, test, type Page } from '@playwright/test';

const mobileViewport = { width: 390, height: 844 };
const desktopViewport = { width: 1024, height: 768 };
const cherryWidgetScriptUrl = 'https://files.withcherry.com/widgets/widget.js';

const cherryWidgetMockScript = `
  (() => {
    const mountId = 'widget-floatingEstimator-mount';

    const render = (containerId) => {
      const container = document.getElementById(containerId);
      if (!container) return;

      container.replaceChildren();

      const mount = document.createElement('div');
      mount.id = mountId;

      const floating = document.createElement('div');
      floating.className = 'floatingEstimator-floatingContainer-mock';

      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', 'Open payment calculator');
      button.className = 'floatingEstimator-floatingButton-mock';

      const content = document.createElement('div');
      content.className = 'floatingEstimator-buttonContent-mock';

      const icon = document.createElement('div');
      icon.className = 'floatingEstimator-iconContainer-mock';
      icon.textContent = '%';

      const textContainer = document.createElement('div');
      textContainer.className = 'floatingEstimator-buttonTextContainer-mock';

      const title = document.createElement('span');
      title.className = 'floatingEstimator-buttonText-mock';
      title.textContent = 'Pay over time';

      const subtext = document.createElement('span');
      subtext.className = 'floatingEstimator-buttonSubtext-mock';

      const desktopValue = document.createElement('span');
      desktopValue.className = 'floatingEstimator-desktopValueProps-mock';
      desktopValue.textContent = 'No hard credit checks • 0% APR options';

      const mobileValue = document.createElement('span');
      mobileValue.className = 'floatingEstimator-mobileValueProp-mock';
      mobileValue.textContent = 'No hard credit checks';

      const useCollapsedCopy = window.innerWidth <= 480;

      Object.assign(button.style, {
        width: useCollapsedCopy ? '140.71875px' : '288.28125px',
        height: useCollapsedCopy ? '32px' : '52px',
        borderRadius: '999px',
        padding: useCollapsedCopy ? '4px 8px' : '8px 12px',
        border: '0',
        background: '#9a8360',
        color: '#fff',
      });

      Object.assign(content.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      });

      Object.assign(textContainer.style, {
        display: 'flex',
        flexDirection: 'column',
      });

      Object.assign(subtext.style, {
        display: useCollapsedCopy ? 'none' : 'block',
        whiteSpace: 'nowrap',
      });

      desktopValue.style.display = useCollapsedCopy ? 'none' : 'inline';
      mobileValue.style.display = useCollapsedCopy ? 'inline' : 'none';

      subtext.appendChild(desktopValue);
      subtext.appendChild(mobileValue);
      textContainer.appendChild(title);
      textContainer.appendChild(subtext);
      content.appendChild(icon);
      content.appendChild(textContainer);
      button.appendChild(content);
      floating.appendChild(button);
      mount.appendChild(floating);
      container.appendChild(mount);
    };

    const api = (...args) => {
      const [command] = args;
      if (typeof command !== 'string' || command === 'init') return;
      render(command);
    };

    const queuedCalls = Array.isArray(window._hw?.q) ? [...window._hw.q] : [];
    window._hw = api;
    window._hw.q = [];
    queuedCalls.forEach((call) => api(...call));
  })();
`;

const mockCherryRuntime = async (page: Page) => {
  await page.route(cherryWidgetScriptUrl, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: cherryWidgetMockScript,
    });
  });
};

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

const getCherryCounts = async (page: Page) =>
  page.evaluate(() => ({
    buttons: document.querySelectorAll('[aria-label="Open payment calculator"]').length,
    mounts: document.querySelectorAll('[id="widget-floatingEstimator-mount"]').length,
  }));

const expectCherryCounts = async (
  page: Page,
  expected: { buttons: number; mounts: number },
) => {
  await expect
    .poll(() => getCherryCounts(page), {
      timeout: 20000,
      message: `expected Cherry counts to be ${JSON.stringify(expected)}`,
    })
    .toEqual(expected);
};

const getCherryVisibilityState = async (page: Page) =>
  page.evaluate(() => {
    const button = document.querySelector('[aria-label="Open payment calculator"]') as HTMLElement | null;
    const container =
      (button?.closest('[class*="floatingEstimator-floatingContainer"]') as HTMLElement | null) ??
      (document.querySelector('[id="widget-floatingEstimator-mount"]') as HTMLElement | null);

    if (!button || !container) {
      return {
        exists: false,
        visibility: null,
        opacity: null,
        pointerEvents: null,
        position: null,
        right: null,
        bottom: null,
      };
    }

    const styles = getComputedStyle(container);

    return {
      exists: true,
      visibility: styles.visibility,
      opacity: styles.opacity,
      pointerEvents: styles.pointerEvents,
      position: styles.position,
      right: styles.right,
      bottom: styles.bottom,
    };
  });

const expectCherryVisible = async (page: Page) => {
  await expect
    .poll(() => getCherryVisibilityState(page), {
      timeout: 10000,
    })
    .toMatchObject({
      exists: true,
      visibility: 'visible',
      opacity: '1',
      pointerEvents: 'auto',
      position: 'fixed',
    });
};

const getCherryResponsiveState = async (page: Page) =>
  page.evaluate(() => {
    const button = document.querySelector('[aria-label="Open payment calculator"]') as HTMLElement | null;
    const desktop = document.querySelector(
      '[class*="floatingEstimator-desktopValueProps"]',
    ) as HTMLElement | null;
    const mobile = document.querySelector(
      '[class*="floatingEstimator-mobileValueProp"]',
    ) as HTMLElement | null;
    const subtext = document.querySelector(
      '[class*="floatingEstimator-buttonSubtext"]',
    ) as HTMLElement | null;

    if (!button || !desktop || !mobile || !subtext) {
      return {
        exists: false,
        desktopDisplay: null,
        mobileDisplay: null,
        subtextDisplay: null,
        overflowsViewport: null,
      };
    }

    const buttonRect = button.getBoundingClientRect();
    const desktopRect = desktop.getBoundingClientRect();
    const mobileRect = mobile.getBoundingClientRect();
    const visibleCopyRect = getComputedStyle(mobile).display !== 'none' ? mobileRect : desktopRect;

    return {
      exists: true,
      desktopDisplay: getComputedStyle(desktop).display,
      mobileDisplay: getComputedStyle(mobile).display,
      subtextDisplay: getComputedStyle(subtext).display,
      overflowsViewport:
        buttonRect.right > window.innerWidth + 0.5 ||
        visibleCopyRect.right > buttonRect.right + 0.5,
    };
  });

test.describe('Cherry widget mobile behavior', () => {
  test.use({ viewport: mobileViewport });

  test.beforeEach(async ({ page }) => {
    await mockCherryRuntime(page);
  });

  test('keeps exactly one floating widget through internal navigation and tears down on non-Cherry routes', async ({
    page,
  }) => {
    await page.goto('/schedule-consultation/');
    await stabilizePage(page);
    await expectCherryCounts(page, { buttons: 1, mounts: 1 });
    await expectCherryVisible(page);

    await page.getByRole('link', { name: 'Open Payment Plans' }).click();
    await expect(page).toHaveURL(/\/payment-plans\/?$/);
    await expectCherryCounts(page, { buttons: 1, mounts: 1 });
    await expectCherryVisible(page);

    const menuDialog = await openMobileMenu(page);
    await menuDialog.getByRole('link', { name: 'About Dr. Aguil' }).click();
    await expect(page).toHaveURL(/\/about\/?$/);
    await expectCherryCounts(page, { buttons: 0, mounts: 0 });

    await page.locator('header a[href="/"]').first().click();
    await expect(page).toHaveURL(/\/$/);
    await expectCherryCounts(page, { buttons: 1, mounts: 1 });
    await expectCherryVisible(page);
  });

  test('keeps the floating widget visible while scrolling through Cherry-enabled sections', async ({
    page,
  }) => {
    await page.goto('/schedule-consultation/');
    await stabilizePage(page);

    const financingHeading = page.getByRole('heading', {
      name: 'If cost is part of your decision, Cherry is available here too.',
    });

    await financingHeading.scrollIntoViewIfNeeded();
    await expect(financingHeading).toBeVisible();
    await expectCherryCounts(page, { buttons: 1, mounts: 1 });
    await expectCherryVisible(page);

    await page.locator('#book-online').scrollIntoViewIfNeeded();
    await expectCherryVisible(page);

    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
    });
    await expectCherryVisible(page);

    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
    await expectCherryVisible(page);
  });

  test('keeps the mobile navigation sheet above Cherry when both are present', async ({ page }) => {
    await page.goto('/');
    await stabilizePage(page);
    await expectCherryCounts(page, { buttons: 1, mounts: 1 });
    await expectCherryVisible(page);

    const menuDialog = await openMobileMenu(page);

    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const button = document.querySelector(
              '[aria-label="Open payment calculator"]',
            ) as HTMLElement | null;

            if (!button) {
              return { exists: false, topElementInsideDialog: false };
            }

            const rect = button.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const topElement = document.elementFromPoint(x, y) as HTMLElement | null;

            return {
              exists: true,
              topElementInsideDialog: Boolean(topElement?.closest('[role="dialog"]')),
            };
          }),
        { timeout: 10000 },
      )
      .toEqual({ exists: true, topElementInsideDialog: true });

    await expect(menuDialog).toBeVisible();
  });
});

test('Cherry stays singular across Cherry-enabled pages on desktop', async ({ page }) => {
  await mockCherryRuntime(page);
  await page.setViewportSize(desktopViewport);
  await page.goto('/schedule-consultation/');
  await stabilizePage(page);
  await expectCherryCounts(page, { buttons: 1, mounts: 1 });

  await page.getByRole('link', { name: 'Open Payment Plans' }).click();
  await expect(page).toHaveURL(/\/payment-plans\/?$/);
  await expectCherryCounts(page, { buttons: 1, mounts: 1 });

  await page.locator('header a[href="/"]').first().click();
  await expect(page).toHaveURL(/\/$/);
  await expectCherryCounts(page, { buttons: 1, mounts: 1 });
});

test('Cherry switches to compact copy when the viewport shrinks after desktop render', async ({
  page,
}) => {
  await mockCherryRuntime(page);
  await page.setViewportSize(desktopViewport);
  await page.goto('/');
  await stabilizePage(page);
  await expectCherryCounts(page, { buttons: 1, mounts: 1 });
  await expectCherryVisible(page);

  await expect
    .poll(() => getCherryResponsiveState(page), { timeout: 10000 })
    .toMatchObject({
      exists: true,
      desktopDisplay: 'inline',
      mobileDisplay: 'none',
      subtextDisplay: 'block',
    });

  await page.setViewportSize({ width: 500, height: desktopViewport.height });

  await expect
    .poll(() => getCherryResponsiveState(page), { timeout: 10000 })
    .toMatchObject({
      exists: true,
      desktopDisplay: 'none',
      mobileDisplay: 'inline',
      subtextDisplay: 'block',
      overflowsViewport: false,
    });

  await page.setViewportSize({ width: 420, height: desktopViewport.height });

  await expect
    .poll(() => getCherryResponsiveState(page), { timeout: 10000 })
    .toMatchObject({
      exists: true,
      desktopDisplay: 'none',
      mobileDisplay: 'none',
      subtextDisplay: 'none',
      overflowsViewport: false,
    });
});
