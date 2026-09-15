import { expect, test } from '@playwright/test';

type OpenAIAdsTestWindow = typeof window & {
  __openAIAdsCalls?: unknown[][];
  oaiq?: ((...args: unknown[]) => void) & { q?: unknown[][] };
};

test.describe('ChatGPT Ads landing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googletagmanager|google-analytics|googleadservices|vercel-scripts|vercel-insights|\/_vercel\//, route => route.fulfill({ contentType: 'application/javascript', body: '' }));
    await page.addInitScript(() => {
      if (window !== window.top) return;
      localStorage.setItem('exquisite_analytics_consent_v2', 'denied');
      localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2', 'denied');
      window.__EXQUISITE_ANALYTICS_TEST_HOST__ = 'exquisitedentistryla.com';
      (window as typeof window & { __chatGptAdsEvents?: unknown[] }).__chatGptAdsEvents = [];
      (window as OpenAIAdsTestWindow).__openAIAdsCalls = [];
      window.addEventListener('message', event => {
        if (event.data?.type === 'test-openai-call') {
          (window as OpenAIAdsTestWindow).__openAIAdsCalls?.push(event.data.args);
        }
      });
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
          window.oaiq = (...args) => { calls.push(args); parent.postMessage({ type: 'test-openai-call', args }, '*'); };
          window.oaiq.loaded = true;
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

  test('uses an explicit reversible choice for analytics and OpenAI measurement', async ({ page }) => {
    await page.goto('/lp/chatgpt/');
    await page.getByRole('button', { name: 'Privacy choices' }).click();
    await expect(page.getByRole('region', { name: 'Analytics preferences' })).toContainText(
      'OpenAI Ads conversion tag',
    );
    await page.getByRole('button', { name: 'Allow measurement' }).click();

    await expect.poll(() => page.evaluate(() => (
      localStorage.getItem('exquisite_chatgpt_ads_measurement_consent_v2')
    ))).toBe('granted');
    expect(await page.evaluate(() => localStorage.getItem('exquisite_analytics_consent_v2'))).toBe('granted');

    await page.getByRole('button', { name: 'Privacy choices' }).click();
    await page.getByRole('button', { name: 'Decline' }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect.poll(() => page.evaluate(() => (
      localStorage.getItem('exquisite_chatgpt_ads_measurement_consent_v2')
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
    await page.getByLabel('Email').fill('sample@patient.invalid');
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
      eventId: expect.stringMatching(/^[0-9a-f-]{36}$/),
      form: 'chatgpt_ads_consultation',
      source: 'chatgpt_ads',
    }]);
    expect(JSON.stringify(events)).not.toContain('Local Test');
    expect(JSON.stringify(events)).not.toContain('sample@patient.invalid');
    expect(JSON.stringify(events)).not.toContain('(323) 555-0100');
    expect(JSON.stringify(events)).not.toContain('openai_reference_123');

    const googleEvents = await page.evaluate(() => window.dataLayer ?? []);
    expect(JSON.stringify(googleEvents)).not.toContain('sample@patient.invalid');
    expect(JSON.stringify(googleEvents)).toContain('generate_lead');

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
      localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2', 'granted');
      window.dispatchEvent(new CustomEvent('exquisite:chatgpt-ads-measurement-consent-changed', {
        detail: 'granted',
      }));
      window.dispatchEvent(new CustomEvent('exquisite:chatgpt-ads-lead-confirmed', {
        detail: {
          form: 'chatgpt_ads_consultation',
          source: 'chatgpt_ads',
          eventId: 'd6c13c73-39d5-4b83-874d-a46cbb257ef3',
          ignored_personal_data: 'sample@patient.invalid',
        },
      }));
    });

    await page.waitForFunction(() => (
      (window as OpenAIAdsTestWindow).__openAIAdsCalls?.some((call) => call[0] === 'measure')
    ));

    const pixelCalls = await page.evaluate(() => (
      (window as OpenAIAdsTestWindow).__openAIAdsCalls ?? []
    ));

    expect(pixelCalls).toContainEqual(['consent', true]);
    expect(pixelCalls).toContainEqual([
      'measure',
      'lead_created',
      { type: 'customer_action' },
      { opt_out: true, event_id: 'd6c13c73-39d5-4b83-874d-a46cbb257ef3' },
    ]);
    expect(JSON.stringify(pixelCalls)).not.toContain('sample@patient.invalid');
    expect(JSON.stringify(pixelCalls)).not.toContain('openai_reference_123');
    expect(await page.evaluate(() => typeof window.oaiq)).toBe('undefined');
    await expect(page.locator('#openai-ads-measurement-frame')).toHaveAttribute('sandbox', 'allow-scripts');
  });

  test('does not replay denied leads and deduplicates repeated confirmed signals', async ({ page }) => {
    await page.goto('/lp/chatgpt/');
    const signal = () => page.evaluate(() => window.dispatchEvent(new CustomEvent('exquisite:chatgpt-ads-lead-confirmed', {
      detail: { eventId: '00f6ac65-a477-49b3-b52e-ce10a112e118' },
    })));
    await signal();
    await page.getByRole('button', { name: 'Privacy choices' }).click();
    await page.getByRole('button', { name: 'Allow measurement' }).click();
    await page.waitForFunction(() => (window as OpenAIAdsTestWindow).__openAIAdsCalls?.some(c => c[0] === 'init'));
    expect(await page.evaluate(() => (window as OpenAIAdsTestWindow).__openAIAdsCalls?.filter(c => c[0] === 'measure'))).toEqual([]);
    await signal();
    await signal();
    await expect.poll(() => page.evaluate(() => (window as OpenAIAdsTestWindow).__openAIAdsCalls?.filter(c => c[0] === 'measure').length)).toBe(1);
  });

  test('honors the consent choice when localStorage is blocked', async ({ page }) => {
    await page.addInitScript(() => {
      if (window !== window.top) return;
      Object.defineProperty(window, 'localStorage', { configurable: true, get() { throw new DOMException('Blocked', 'SecurityError'); } });
    });
    await page.goto('/lp/chatgpt/');
    await page.getByRole('button', { name: 'Allow measurement' }).click();
    await expect(page.locator('#openai-ads-measurement-frame')).toHaveCount(1);
    await page.evaluate(() => window.dispatchEvent(new CustomEvent('exquisite:chatgpt-ads-lead-confirmed', {
      detail: { eventId: '00f6ac65-a477-49b3-b52e-ce10a112e119' },
    })));
    await expect.poll(() => page.evaluate(() => (window as OpenAIAdsTestWindow).__openAIAdsCalls?.filter(c => c[0] === 'measure').length)).toBe(1);
  });

  test('uses the latest choice when only consent writes fail', async ({ page }) => {
    await page.addInitScript(() => {
      if (window !== window.top) return;
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function(key, value) {
        if (key === 'exquisite_chatgpt_ads_measurement_consent_v2') throw new DOMException('Full', 'QuotaExceededError');
        return original.call(this, key, value);
      };
    });
    await page.goto('/lp/chatgpt/');
    await page.getByRole('button', { name: 'Privacy choices' }).click();
    await page.getByRole('button', { name: 'Allow measurement' }).click();
    await expect(page.locator('#openai-ads-measurement-frame')).toHaveCount(1);
    expect(await page.evaluate(() => localStorage.getItem('exquisite_chatgpt_ads_measurement_consent_v2'))).toBe('denied');
    await page.getByRole('button', { name: 'Privacy choices' }).click();
    await page.getByRole('button', { name: 'Decline' }).click();
    await expect(page.locator('#openai-ads-measurement-frame')).toHaveCount(0);
  });

  test('does not restore an older grant after a failed consent-revocation write', async ({ page }) => {
    await page.goto('/lp/chatgpt/');
    await page.getByRole('button', { name: 'Privacy choices' }).click();
    await page.getByRole('button', { name: 'Allow measurement' }).click();
    await expect(page.locator('#openai-ads-measurement-frame')).toHaveCount(1);
    await page.evaluate(() => {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function(key, value) {
        if (key === 'exquisite_chatgpt_ads_measurement_consent_v2') throw new DOMException('Full', 'QuotaExceededError');
        return original.call(this, key, value);
      };
    });
    await page.getByRole('button', { name: 'Privacy choices' }).click();
    await page.getByRole('button', { name: 'Decline' }).click();
    await expect(page.locator('#openai-ads-measurement-frame')).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem('exquisite_chatgpt_ads_measurement_consent_v2'))).toBe('granted');
    await page.getByRole('button', { name: 'Privacy choices' }).click();
    await expect(page.getByRole('button', { name: 'Allow measurement' })).toBeVisible();
    await expect(page.locator('#openai-ads-measurement-frame')).toHaveCount(0);
  });

  test('removes the measurement frame when consent is revoked in another tab', async ({ page, context }) => {
    await page.goto('/lp/chatgpt/');
    await page.getByRole('button', { name: 'Privacy choices' }).click();
    await page.getByRole('button', { name: 'Allow measurement' }).click();
    await expect(page.locator('#openai-ads-measurement-frame')).toHaveCount(1);
    const other = await context.newPage();
    await other.goto('/robots.txt');
    await other.evaluate(() => localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2', 'denied'));
    await expect(page.locator('#openai-ads-measurement-frame')).toHaveCount(0);
    await other.close();
  });

  test('recovers a failed SDK download without losing the confirmed lead', async ({ page }) => {
    let attempts = 0;
    await page.route('https://bzrcdn.openai.com/sdk/oaiq.min.js', async route => {
      attempts++;
      if (attempts === 1) { await route.abort(); return; }
      await route.fulfill({ contentType: 'application/javascript', body: `
        const queue = window.oaiq.q;
        window.oaiq = (...args) => parent.postMessage({type:'test-openai-call',args}, '*');
        window.oaiq.loaded = true;
        queue.forEach(args => window.oaiq(...args));
      ` });
    });
    await page.goto('/lp/chatgpt/');
    await page.getByRole('button', { name: 'Privacy choices' }).click();
    await page.getByRole('button', { name: 'Allow measurement' }).click();
    await page.evaluate(() => window.dispatchEvent(new CustomEvent('exquisite:chatgpt-ads-lead-confirmed', {
      detail: { eventId: '00f6ac65-a477-49b3-b52e-ce10a112e120' },
    })));
    await expect.poll(() => page.evaluate(() => (window as OpenAIAdsTestWindow).__openAIAdsCalls?.filter(c => c[0] === 'measure').length)).toBe(1);
    expect(attempts).toBe(2);
  });

  test('loads GA4 on the landing route and gates Vercel on consent', async ({ page }) => {
    await page.goto('/lp/chatgpt/?utm_source=chatgpt&utm_medium=paid&oppref=opaque-click');
    expect(await page.evaluate(() => typeof window.gtag)).toBe('function');
    await expect(page.locator('script[src*="vercel-scripts"], script[src*="/_vercel/"]')).toHaveCount(0);
    await page.getByRole('button', { name: 'Privacy choices' }).click();
    await page.getByRole('button', { name: 'Allow measurement' }).click();
    await expect(page.locator('script[data-sdkn^="@vercel/analytics"]')).toHaveCount(1);
    const layer = await page.evaluate(() => (window.dataLayer ?? []).map(item => Array.from(item as ArrayLike<unknown>)));
    expect(layer.some(item => item[0] === 'config' && item[1] === 'G-1MZGF2XNB5')).toBe(true);
    expect(JSON.stringify(layer)).not.toContain('opaque-click');
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
    await page.getByLabel('Email').fill('sample@patient.invalid');
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
    await page.getByLabel('Email').fill('sample@patient.invalid');
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
    await page.getByLabel('Email').fill('sample@patient.invalid');
    await page.getByLabel('Phone').fill('(323) 555-0100');
    await page.getByLabel('Consultation interest').click();
    await page.getByRole('option', { name: 'Cosmetic consultation' }).click();
    await page.getByRole('button', { name: 'Request my consultation' }).click();

    await expect(page.getByRole('alert')).toContainText("We couldn't send your request");
    await expect(page.getByRole('button', { name: 'Request my consultation' })).toBeEnabled();
  });
  for (const fixture of [
    { name: 'Codex Tracking Test - ignore', email: 'sample@patient.invalid', query: '' },
    { name: 'Sample Person', email: 'sample@example.com', query: '' },
    { name: 'Sample Person', email: 'sample@patient.invalid', query: '?_codex_test=true' },
  ]) {
    test(`marks and excludes test leads: ${fixture.name} ${fixture.email} ${fixture.query}`, async ({ page }) => {
      let body = '';
      await page.route('https://formspree.io/**', route => {
        body = route.request().postData() ?? '';
        return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
      });
      await page.goto(`/lp/chatgpt/${fixture.query}`);
      await page.getByRole('button', { name: 'Privacy choices' }).click();
      await page.getByRole('button', { name: 'Allow measurement' }).click();
      await page.getByLabel('Name').fill(fixture.name);
      await page.getByLabel('Email').fill(fixture.email);
      await page.getByLabel('Phone').fill('(323) 555-0100');
      await page.getByLabel('Consultation interest').click();
      await page.getByRole('option', { name: 'Porcelain veneers' }).click();
      await page.getByRole('button', { name: 'Request my consultation' }).click();
      await expect(page.getByRole('status')).toContainText('Our team will contact you soon');
      expect(body).toMatch(/name="_codex_test"\r?\n\r?\ntrue/);
      expect(JSON.stringify(await page.evaluate(() => window.dataLayer ?? []))).not.toContain('generate_lead');
      expect(await page.evaluate(() => (window as OpenAIAdsTestWindow).__openAIAdsCalls?.filter(c => c[0] === 'measure'))).toEqual([]);
    });
  }

  for (const persona of ['Thinking about becoming a new patient', 'Existing patient', 'Vendor/business']) {
    test(`main website sends acquisition conversions only for eligible leads: ${persona}`, async ({ page }) => {
      let body = '';
      await page.route('https://formspree.io/**', route => {
        body = route.request().postData() ?? '';
        return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
      });
      await page.goto('/contact/?utm_source=chatgpt&utm_medium=paid&oppref=retained-click');
      await page.getByRole('button', { name: 'Privacy choices' }).click();
      await page.getByRole('button', { name: 'Allow measurement' }).click();
      await page.getByRole('radio', { name: persona }).evaluate((radio: HTMLInputElement) => radio.click());
      await page.getByLabel('Name', { exact: true }).fill('Sample Person');
      await page.getByLabel('Email', { exact: true }).fill('sample@patient.invalid');
      await page.getByLabel('Message', { exact: true }).fill('Please contact me.');
      await page.getByRole('button', { name: 'Send Message', exact: true }).click();
      await expect(page.getByText('Thanks for reaching out! We will respond shortly.')).toBeVisible();
      const expected = persona === 'Thinking about becoming a new patient' ? 1 : 0;
      await expect.poll(() => page.evaluate(() => (window as OpenAIAdsTestWindow).__openAIAdsCalls?.filter(c => c[0] === 'measure').length ?? 0)).toBe(expected);
      const calls = await page.evaluate(() => (window as OpenAIAdsTestWindow).__openAIAdsCalls ?? []);
      const leads = calls.filter(c => c[0] === 'measure');
      if (expected) {
        expect(leads[0][1]).toBe('lead_created');
        expect(body).toContain((leads[0][3] as { event_id: string }).event_id);
        expect(body).toContain('retained-click');
      }
      expect(JSON.stringify(calls)).not.toContain('sample@patient.invalid');
    });
  }

});
