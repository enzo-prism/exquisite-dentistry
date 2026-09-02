import { expect, test } from '@playwright/test';

type OpenAIAdsTestWindow = typeof window & {
  __openAIAdsCalls?: unknown[][];
  oaiq?: ((...args: unknown[]) => void) & { q?: unknown[][] };
};

test.describe('ChatGPT Ads landing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('exquisite_analytics_consent_v1', 'denied');
      localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v1', 'denied');
      window.__EXQUISITE_ANALYTICS_TEST_HOST__ = 'exquisitedentistryla.com';
      (window as typeof window & { __chatGptAdsEvents?: unknown[] }).__chatGptAdsEvents = [];
      (window as OpenAIAdsTestWindow).__openAIAdsCalls = [];
      window.addEventListener('exquisite:chatgpt-ads-lead-confirmed', (event) => {
        const customEvent = event as CustomEvent;
        (window as typeof window & { __chatGptAdsEvents?: unknown[] }).__chatGptAdsEvents?.push(customEvent.detail);
      });
    });

    await page.route('https://bzrcdn.openai.com/sdk/oaiq.min.js', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: `(() => {
          const calls = window.__openAIAdsCalls || [];
          const queued = Array.isArray(window.oaiq?.q) ? window.oaiq.q : [];
          window.__openAIAdsCalls = calls;
          window.oaiq = (...args) => calls.push(args);
          queued.forEach((args) => window.oaiq(...args));
        })();`,
      });
    });
  });

  test('is a focused, paid-only, privacy-limited page', async ({ page }) => {
    await page.goto('/lp/chatgpt/');

    await expect(page.getByRole('heading', {
      level: 1,
      name: 'A thoughtful first step toward the smile you have in mind.',
    })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow,noarchive');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://exquisitedentistryla.com/lp/chatgpt/',
    );

    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Phone')).toBeVisible();
    await expect(page.getByLabel('Consultation interest')).toBeVisible();
    await expect(page.getByText('All fields are required.')).toBeVisible();
    await expect(page.getByLabel('Name')).toHaveAttribute('required', '');
    await expect(page.getByLabel('Email')).toHaveAttribute('required', '');
    await expect(page.getByLabel('Phone')).toHaveAttribute('required', '');
    await expect(page.locator('textarea')).toHaveCount(0);
    await expect(page.locator('video, iframe')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Ask the Concierge' })).toHaveCount(0);
    await expect(page.getByText(/do not include symptoms, medical history, insurance details/i)).toBeVisible();
  });

  test('keeps the primary CTA visible and avoids horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/lp/chatgpt/');

    const primaryCta = page.getByRole('link', { name: 'Request a consultation' }).first();
    await expect(primaryCta).toBeVisible();
    const box = await primaryCta.boundingBox();
    expect(box?.y).toBeLessThan(844);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

    await primaryCta.click();
    await expect(page.locator('#consultation-form')).toBeInViewport();
  });

  test('uses a separate, reversible consent choice for OpenAI campaign measurement', async ({ page }) => {
    await page.goto('/lp/chatgpt/');
    await page.getByRole('button', { name: 'Privacy choices' }).click();
    await expect(page.getByRole('region', { name: 'Analytics preferences' })).toContainText(
      'OpenAI Ads conversion tag',
    );
    await page.getByRole('button', { name: 'Allow campaign measurement' }).click();

    await expect.poll(() => page.evaluate(() => (
      localStorage.getItem('exquisite_chatgpt_ads_measurement_consent_v1')
    ))).toBe('granted');
    expect(await page.evaluate(() => localStorage.getItem('exquisite_analytics_consent_v1'))).toBe('denied');

    await page.getByRole('button', { name: 'Privacy choices' }).click();
    await page.getByRole('button', { name: 'Decline' }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect.poll(() => page.evaluate(() => (
      localStorage.getItem('exquisite_chatgpt_ads_measurement_consent_v1')
    ))).toBe('denied');
  });

  test('signals a PII-free conversion handoff only after Formspree confirms success', async ({ page }) => {
    let postData = '';
    await page.route('https://formspree.io/**', async (route) => {
      postData = route.request().postData() ?? '';
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto('/lp/chatgpt/?utm_source=chatgpt&utm_medium=paid&utm_campaign=veneer_pilot&oppref=openai_reference_123');
    await page.getByLabel('Name').fill('Local Test');
    await page.getByLabel('Email').fill('local-test@example.com');
    await page.getByLabel('Phone').fill('(323) 555-0100');
    await page.getByLabel('Consultation interest').click();
    await page.getByRole('option', { name: 'Porcelain veneers' }).click();
    await page.getByRole('button', { name: 'Request my consultation' }).click();

    await expect(page.getByRole('status')).toContainText('Our team will contact you soon');
    expect(postData).toContain('chatgpt_ads_consultation');
    expect(postData).toContain('chatgpt_ads');
    expect(postData).toContain('veneer_pilot');
    expect(postData).toContain('openai_reference_123');

    const events = await page.evaluate(() => (
      (window as typeof window & { __chatGptAdsEvents?: unknown[] }).__chatGptAdsEvents ?? []
    ));
    expect(events).toEqual([{
      form: 'chatgpt_ads_consultation',
      source: 'chatgpt_ads',
    }]);
    expect(JSON.stringify(events)).not.toContain('Local Test');
    expect(JSON.stringify(events)).not.toContain('local-test@example.com');
    expect(JSON.stringify(events)).not.toContain('323');
    expect(JSON.stringify(events)).not.toContain('openai_reference_123');

    const googleEvents = await page.evaluate(() => window.dataLayer ?? []);
    expect(googleEvents).toEqual([]);

    const pixelCalls = await page.evaluate(() => (
      (window as OpenAIAdsTestWindow).__openAIAdsCalls ?? []
    ));
    expect(pixelCalls.some((call) => call[0] === 'measure')).toBe(false);
  });

  test('sends a consented PII-free OpenAI lead event', async ({ page }) => {
    await page.goto('/lp/chatgpt/?oppref=openai_reference_123');
    await expect(page.locator('#openai-ads-measurement-pixel')).toHaveCount(0);
    expect(await page.evaluate(() => typeof window.oaiq)).toBe('undefined');

    await page.evaluate(() => {
      localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v1', 'granted');
      window.dispatchEvent(new CustomEvent('exquisite:chatgpt-ads-measurement-consent-changed', {
        detail: 'granted',
      }));
      window.dispatchEvent(new CustomEvent('exquisite:chatgpt-ads-lead-confirmed', {
        detail: {
          form: 'chatgpt_ads_consultation',
          source: 'chatgpt_ads',
          ignored_personal_data: 'local-test@example.com',
        },
      }));
    });

    await page.waitForFunction(() => (
      (window as OpenAIAdsTestWindow).__openAIAdsCalls?.some((call) => call[0] === 'init')
    ));

    const pixelCalls = await page.evaluate(() => (
      (window as OpenAIAdsTestWindow).__openAIAdsCalls ?? []
    ));

    expect(pixelCalls).toContainEqual(['consent', true]);
    expect(pixelCalls).toContainEqual([
      'measure',
      'lead_created',
      { type: 'customer_action' },
      { opt_out: true },
    ]);
    expect(JSON.stringify(pixelCalls)).not.toContain('local-test@example.com');
    expect(JSON.stringify(pixelCalls)).not.toContain('openai_reference_123');
  });

  test('never loads Google or Vercel analytics on the healthcare landing route', async ({ page }) => {
    const analyticsRequests: string[] = [];
    page.on('request', (request) => {
      if (
        /googletagmanager\.com|google-analytics\.com|va\.vercel-scripts\.com|vitals\.vercel-insights\.com/.test(
          request.url(),
        )
      ) {
        analyticsRequests.push(request.url());
      }
    });

    await page.goto('/lp/chatgpt/');
    expect(await page.evaluate(() => typeof window.gtag)).toBe('undefined');
    await page.evaluate(() => {
      localStorage.setItem('exquisite_analytics_consent_v1', 'granted');
      window.dispatchEvent(new CustomEvent('exquisite:analytics-consent-changed', {
        detail: 'granted',
      }));
    });
    await page.waitForTimeout(150);

    expect(analyticsRequests).toEqual([]);
    expect(await page.evaluate(() => window.dataLayer ?? [])).toEqual([]);
  });

  test('locks rapid duplicate submissions to one Formspree request', async ({ page }) => {
    let requests = 0;
    await page.route('https://formspree.io/**', async (route) => {
      requests += 1;
      await new Promise((resolve) => setTimeout(resolve, 100));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto('/lp/chatgpt/');
    await page.getByLabel('Name').fill('Local Test');
    await page.getByLabel('Email').fill('local-test@example.com');
    await page.getByLabel('Phone').fill('(323) 555-0100');
    await page.getByLabel('Consultation interest').click();
    await page.getByRole('option', { name: 'Cosmetic consultation' }).click();

    await page.getByRole('button', { name: 'Request my consultation' }).evaluate((button) => {
      const form = button.closest('form');
      form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });

    await expect(page.getByRole('status')).toContainText('Our team will contact you soon');
    expect(requests).toBe(1);
  });

  test('keeps attribution from one visit together instead of creating a hybrid record', async ({ page }) => {
    let postData = '';
    await page.route('https://formspree.io/**', async (route) => {
      postData = route.request().postData() ?? '';
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto('/?utm_source=old_source&utm_campaign=old_campaign');
    await page.goto('/lp/chatgpt/?oppref=current_openai_reference');
    await page.getByLabel('Name').fill('Local Test');
    await page.getByLabel('Email').fill('local-test@example.com');
    await page.getByLabel('Phone').fill('(323) 555-0100');
    await page.getByLabel('Consultation interest').click();
    await page.getByRole('option', { name: 'Not sure yet' }).click();
    await page.getByRole('button', { name: 'Request my consultation' }).click();

    await expect(page.getByRole('status')).toContainText('Our team will contact you soon');
    expect(postData).toContain('current_openai_reference');
    expect(postData).not.toContain('old_source');
    expect(postData).not.toContain('old_campaign');
  });

  test('times out a stalled submission and restores the submit action', async ({ page }) => {
    await page.goto('/lp/chatgpt/');
    await page.evaluate(() => {
      const nativeSetTimeout = window.setTimeout.bind(window);
      window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => (
        nativeSetTimeout(handler, timeout === 12_000 ? 20 : timeout, ...args)
      )) as typeof window.setTimeout;
      window.fetch = ((_input: RequestInfo | URL, init?: RequestInit) => new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
      })) as typeof window.fetch;
    });

    await page.getByLabel('Name').fill('Local Test');
    await page.getByLabel('Email').fill('local-test@example.com');
    await page.getByLabel('Phone').fill('(323) 555-0100');
    await page.getByLabel('Consultation interest').click();
    await page.getByRole('option', { name: 'Cosmetic consultation' }).click();
    await page.getByRole('button', { name: 'Request my consultation' }).click();

    await expect(page.getByRole('alert')).toContainText("We couldn't send your request");
    await expect(page.getByRole('button', { name: 'Request my consultation' })).toBeEnabled();
  });
});
