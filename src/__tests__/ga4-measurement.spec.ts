import { expect, test, type Page } from '@playwright/test';
import {
  extractInlineGoogleTagSnippet,
  installAnalyticsHostOverride,
  installCanonicalAnalyticsHost,
  LOCAL_AND_PREVIEW_ANALYTICS_HOSTS,
} from './analyticsTestHost';
import {
  CANONICAL_ANALYTICS_HOSTS,
  isAnalyticsSuppressedPath,
  isCanonicalAnalyticsHost,
} from '../utils/analyticsHost';

type GtagCommand = [string, string | Date | Record<string, unknown>, Record<string, unknown>?];

const FORM_ENDPOINT = 'https://formspree.io/f/xkgknpkl';
const USER_FIXTURES = {
  name: 'Privacy Fixture Person',
  email: 'privacy-fixture@example.test',
  phone: '3235550199',
  message: 'Private fixture message about a dental appointment',
};

const PRODUCTION_GOOGLE_TAG_IDS = ['G-1MZGF2XNB5', 'AW-11373090310'] as const;

const isProductionGoogleAnalyticsUrl = (url: string) => PRODUCTION_GOOGLE_TAG_IDS.some((id) => url.includes(id));

const blockAnalyticsVendors = async (page: Page) => {
  await page.route(/https:\/\/(?:www\.)?googletagmanager\.com\/.*/, (route) => route.abort());
  await page.route(/https:\/\/(?:www\.)?google-analytics\.com\/.*/, (route) => route.abort());
  await page.route(/https:\/\/static\.hotjar\.com\/.*/, (route) => route.abort());
  await page.route(/https:\/\/va\.vercel-scripts\.com\/.*/, (route) => route.abort());
};

const collectProductionGoogleRequests = (page: Page) => {
  const vendorRequests: string[] = [];
  page.on('request', (request) => {
    if (isProductionGoogleAnalyticsUrl(request.url())) {
      vendorRequests.push(request.url());
    }
  });
  return vendorRequests;
};

const readDataLayer = async (page: Page): Promise<GtagCommand[]> => page.evaluate(() => {
  const layer = window.dataLayer ?? [];

  return layer.map((entry) => {
    if (Array.isArray(entry)) return entry;
    if (entry && typeof entry === 'object' && 'length' in entry) {
      return Array.from(entry as ArrayLike<unknown>);
    }
    return entry;
  }) as GtagCommand[];
});

const eventCommands = (commands: GtagCommand[], eventName?: string) => commands.filter(
  (command) => command[0] === 'event' && (!eventName || command[1] === eventName),
);

const consentCommands = (commands: GtagCommand[], action: 'default' | 'update') => commands.filter(
  (command) => command[0] === 'consent' && command[1] === action,
);

const acceptAnalytics = async (page: Page) => {
  const button = page.getByRole('button', {
    name: /accept(?: all| analytics)?|allow analytics/i,
  });
  await expect(button).toBeVisible();
  await button.click();
};

const rejectAnalytics = async (page: Page) => {
  const button = page.getByRole('button', {
    name: /reject(?: all| analytics)?|decline(?: analytics)?|necessary only/i,
  });
  await expect(button).toBeVisible();
  await button.click();
};

const clearDataLayer = async (page: Page) => {
  await page.evaluate(() => {
    window.dataLayer = [];
  });
};

const findStoredAttribution = async (page: Page) => page.evaluate(() => {
  for (let index = 0; index < sessionStorage.length; index += 1) {
    const key = sessionStorage.key(index);
    if (!key) continue;
    const raw = sessionStorage.getItem(key);
    if (!raw) continue;

    try {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      if (parsed.utm_source || parsed.gclid || parsed.click_ids) return parsed;
    } catch {
      // Ignore unrelated session storage values.
    }
  }

  return null;
});

const flattenPrimitiveLeaves = (value: unknown, path = 'root'): Array<{ path: string; value: unknown }> => {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenPrimitiveLeaves(item, `${path}[${index}]`));
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => flattenPrimitiveLeaves(child, `${path}.${key}`));
  }

  return [{ path, value }];
};

const assertPrivacySafeGaEvents = (commands: GtagCommand[]) => {
  const events = eventCommands(commands);
  const serialized = JSON.stringify(events).toLowerCase();

  for (const fixture of Object.values(USER_FIXTURES)) {
    expect(serialized).not.toContain(fixture.toLowerCase());
  }

  expect(serialized).not.toMatch(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  expect(serialized).not.toContain('gclid-fixture-123');
  expect(serialized).not.toContain('gbraid-fixture-456');
  expect(serialized).not.toContain('wbraid-fixture-789');

  for (const command of events) {
    const params = command[2] ?? {};
    expect(params).not.toHaveProperty('custom_parameters');

    for (const [key, value] of Object.entries(params)) {
      expect(value, `GA4 event parameter ${key} must be flat`).not.toEqual(expect.any(Object));
      expect([
        'name',
        'email',
        'phone',
        'phone_number',
        'message',
        'carrier',
        'plan_name',
        'member_id',
        'query',
        'user_agent',
      ]).not.toContain(key.toLowerCase());
    }
  }

  for (const leaf of flattenPrimitiveLeaves(events)) {
    if (typeof leaf.value !== 'string') continue;
    expect(leaf.value, `PII-like email at ${leaf.path}`).not.toMatch(
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i,
    );
    expect(leaf.value, `PII-like US phone at ${leaf.path}`).not.toMatch(
      /(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/,
    );
  }
};

const fillValidContactForm = async (page: Page) => {
  // The native control is intentionally sr-only. DOM click keeps the React
  // change event while avoiding sticky-header and transition hit-testing.
  const persona = page.getByRole('radio', { name: 'Thinking about becoming a new patient' });
  await persona.evaluate((radio: HTMLInputElement) => radio.click());
  await expect(persona).toBeChecked();
  await page.getByLabel('Name', { exact: true }).fill(USER_FIXTURES.name);
  await page.getByLabel('Email', { exact: true }).fill(USER_FIXTURES.email);
  await page.locator('#phone').fill(USER_FIXTURES.phone);
  await page.getByLabel('Message', { exact: true }).fill(USER_FIXTURES.message);
};

test.describe('GA4 measurement on canonical hosts', () => {
test.beforeEach(async ({ page }) => {
  await blockAnalyticsVendors(page);
  await installCanonicalAnalyticsHost(page);
});

test('queues denied consent by default and honors explicit accept or reject', async ({ page }) => {
  const vendorRequests = collectProductionGoogleRequests(page);
  await page.goto('/');

  const initialCommands = await readDataLayer(page);
  const defaults = consentCommands(initialCommands, 'default');
  expect(defaults).toHaveLength(1);
  expect(defaults[0]?.[2]).toMatchObject({
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  const configs = initialCommands.filter((command) => command[0] === 'config');
  expect(configs.map((config) => config[1])).toEqual([
    'G-1MZGF2XNB5',
    'AW-11373090310',
  ]);
  expect(new Set(configs.map((config) => config[1])).size).toBe(configs.length);
  expect(configs.filter((config) => String(config[1]).startsWith('G-')).length).toBeGreaterThan(0);
  for (const config of configs) {
    expect(config[1]).toMatch(/^(?:G|AW)-[A-Z0-9]+$/);
    expect(config[2]).toMatchObject({ send_page_view: false });
    expect(initialCommands.indexOf(defaults[0])).toBeLessThan(initialCommands.indexOf(config));
  }

  await acceptAnalytics(page);
  const accepted = consentCommands(await readDataLayer(page), 'update');
  expect(accepted).toHaveLength(1);
  expect(accepted[0]?.[2]).toMatchObject({
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  await expect.poll(() => page.evaluate(() => localStorage.getItem('exquisite_analytics_consent_v1'))).toBe('granted');
  await page.waitForTimeout(100);
  expect(vendorRequests).toEqual([
    expect.stringContaining('googletagmanager.com/gtag/js?id=G-1MZGF2XNB5'),
  ]);

  await page.context().clearCookies();
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await rejectAnalytics(page);

  const rejected = consentCommands(await readDataLayer(page), 'update');
  expect(rejected.at(-1)?.[2]).toMatchObject({
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  await expect.poll(() => page.evaluate(() => localStorage.getItem('exquisite_analytics_consent_v1'))).toBe('denied');
});

test('reopens privacy choices on mobile and persists consent revocation', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 667 });
  await page.addInitScript(() => {
    if (localStorage.getItem('exquisite_analytics_consent_v1') === null) {
      localStorage.setItem('exquisite_analytics_consent_v1', 'granted');
    }
  });
  await page.goto('/');

  const privacyChoices = page.getByRole('button', { name: 'Privacy choices' });
  await privacyChoices.scrollIntoViewIfNeeded();
  await privacyChoices.click();

  const decline = page.getByRole('button', { name: 'Decline' });
  const allow = page.getByRole('button', { name: 'Allow analytics' });
  await expect(decline).toBeVisible();
  await expect(allow).toBeVisible();
  for (const control of [decline, allow]) {
    const box = await control.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }

  await Promise.all([
    page.waitForLoadState('domcontentloaded'),
    decline.click(),
  ]);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('exquisite_analytics_consent_v1'))).toBe('denied');
  await expect(page.getByRole('region', { name: 'Analytics preferences' })).toBeHidden();
  await expect.poll(async () => {
    const defaults = consentCommands(await readDataLayer(page), 'default');
    return defaults.at(-1)?.[2];
  }).toMatchObject({ analytics_storage: 'denied' });
  await expect(page.locator('script[src*="_vercel/insights"], script[src*="va.vercel"]')).toHaveCount(0);
});

test('emits one sanitized manual page_view per initial and SPA route', async ({ page }) => {
  await page.goto('/?utm_source=google&utm_campaign=veneers&gclid=gclid-fixture-123#private-fragment');

  await expect.poll(async () => eventCommands(await readDataLayer(page), 'page_view').length).toBe(1);
  await page.evaluate(() => {
    history.pushState({}, '', '/veneers/?utm_content=private#results');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  await expect(page).toHaveURL(/\/veneers\//);
  await expect.poll(async () => eventCommands(await readDataLayer(page), 'page_view').length).toBe(2);
  const veneersTitle = await page.title();

  await page.evaluate(() => {
    history.pushState({}, '', '/contact/?email=privacy-fixture%40example.test#contact-form');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  await expect(page).toHaveURL(/\/contact\//);
  await expect.poll(async () => eventCommands(await readDataLayer(page), 'page_view').length).toBe(3);
  const contactTitle = await page.title();

  const views = eventCommands(await readDataLayer(page), 'page_view');
  expect(views.map((view) => view[2]?.page_path)).toEqual(['/', '/veneers', '/contact']);
  expect(views.map((view) => new URL(String(view[2]?.page_location)).pathname.replace(/\/+$/, '') || '/')).toEqual([
    '/',
    '/veneers',
    '/contact',
  ]);
  expect(views[1]?.[2]?.page_title).toBe(veneersTitle);
  expect(views[2]?.[2]?.page_title).toBe(contactTitle);
  expect(views[0]?.[2]).not.toHaveProperty('page_referrer');
  for (const view of views) {
    expect(view[2]?.page_title).toEqual(expect.any(String));
    expect(String(view[2]?.page_location)).not.toMatch(/[?#]/);
    if (view[2]?.page_referrer) {
      expect(String(view[2].page_referrer)).not.toMatch(/[?#]/);
    }
  }
  expect(JSON.stringify(views)).not.toContain('?');
  expect(JSON.stringify(views)).not.toContain('#');
  assertPrivacySafeGaEvents(views);
});

test('redacts PII-like URL paths from config and manual page views', async ({ page }) => {
  await page.goto('/privacy-fixture%40example.test?utm_source=google&gclid=safe-click-id');

  await expect.poll(async () => eventCommands(await readDataLayer(page), 'page_view').length).toBe(1);
  let commands = await readDataLayer(page);
  const configs = commands.filter((command) => command[0] === 'config');
  expect(configs.length).toBeGreaterThan(0);
  for (const config of configs) {
    const location = String(config[2]?.page_location);
    expect(new URL(location).pathname).toBe('/redacted');
    expect(location).toContain('utm_source=google');
    expect(location).toContain('gclid=safe-click-id');
  }
  expect(eventCommands(commands, 'page_view')[0]?.[2]).toMatchObject({
    page_path: '/redacted',
  });
  assertPrivacySafeGaEvents(commands);

  await page.goto('/323-555-0199?utm_source=privacy-fixture%40example.test');
  await expect.poll(async () => eventCommands(await readDataLayer(page), 'page_view').length).toBe(1);
  commands = await readDataLayer(page);
  for (const config of commands.filter((command) => command[0] === 'config')) {
    const location = String(config[2]?.page_location);
    expect(new URL(location).pathname).toBe('/redacted');
    expect(location).not.toContain('privacy-fixture');
  }
  assertPrivacySafeGaEvents(commands);
});

test('captures first-touch UTMs and click IDs immediately without emitting click IDs', async ({ page }) => {
  await page.goto(
    '/?utm_source=google&utm_medium=cpc&utm_campaign=veneers&utm_term=smile&utm_content=hero'
      + '&gclid=gclid-fixture-123&gbraid=gbraid-fixture-456&wbraid=wbraid-fixture-789',
  );

  const firstTouch = await findStoredAttribution(page);
  expect(firstTouch).not.toBeNull();
  expect(firstTouch).toMatchObject({
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'veneers',
    utm_term: 'smile',
    utm_content: 'hero',
  });
  expect(JSON.stringify(firstTouch)).toContain('gclid-fixture-123');
  expect(JSON.stringify(firstTouch)).toContain('gbraid-fixture-456');
  expect(JSON.stringify(firstTouch)).toContain('wbraid-fixture-789');

  await page.evaluate(() => {
    history.pushState({}, '', '/contact/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  expect(await findStoredAttribution(page)).toEqual(firstTouch);

  await page.goto('/?utm_source=replacement&utm_campaign=should-not-overwrite');
  expect(await findStoredAttribution(page)).toEqual(firstTouch);
  assertPrivacySafeGaEvents(await readDataLayer(page));
});

test('dedupes phone and scheduling intent and keeps GA4 parameters flat', async ({ page }) => {
  await page.goto('/schedule-consultation/');
  await clearDataLayer(page);

  const phone = page.locator('a[data-analytics-source][href^="tel:"]').first();
  await phone.evaluate((anchor) => anchor.addEventListener('click', (event) => event.preventDefault()));
  await phone.click();

  const schedule = page.locator('a[href^="/schedule-consultation"]').first();
  await schedule.evaluate((anchor) => anchor.addEventListener('click', (event) => event.preventDefault()));
  await schedule.click();

  const commands = await readDataLayer(page);
  expect(eventCommands(commands, 'contact_click')).toHaveLength(1);
  expect(eventCommands(commands, 'schedule_click')).toHaveLength(1);
  assertPrivacySafeGaEvents(commands);
});

test('plain telephone anchors emit one privacy-safe phone event', async ({ page }) => {
  await page.goto('/client-experience/');
  await clearDataLayer(page);
  const phone = page.locator('a[href^="tel:"]').first();
  await phone.evaluate((anchor) => anchor.addEventListener('click', (event) => event.preventDefault()));
  await phone.click();

  const commands = await readDataLayer(page);
  const phoneEvents = eventCommands(commands, 'contact_click');
  expect(phoneEvents).toHaveLength(1);
  expect(phoneEvents[0]?.[2]).toMatchObject({ interaction_method: 'phone' });
  expect(phoneEvents[0]?.[2]).not.toHaveProperty('custom_parameters');
  expect(JSON.stringify(phoneEvents)).not.toContain('+13232722388');
  assertPrivacySafeGaEvents(commands);
});

test('schedule links without local handlers emit one consultation event', async ({ page }) => {
  await page.goto('/locations/');
  await clearDataLayer(page);
  const schedule = page.locator('a[href^="/schedule-consultation"]').first();
  await schedule.evaluate((anchor) => anchor.addEventListener('click', (event) => event.preventDefault()));
  await schedule.click();

  const commands = await readDataLayer(page);
  const scheduleEvents = eventCommands(commands, 'schedule_click');
  expect(scheduleEvents).toHaveLength(1);
  expect(scheduleEvents[0]?.[2]).toMatchObject({ interaction_method: 'schedule' });
  expect(scheduleEvents[0]?.[2]).not.toHaveProperty('custom_parameters');
  assertPrivacySafeGaEvents(commands);
});

test('testimonial actions stay generic CTAs and never become schedule intent', async ({ page }) => {
  await page.goto('/share-your-story/');
  await clearDataLayer(page);
  await page.evaluate(() => {
    window.open = (() => window) as typeof window.open;
  });
  await page.getByRole('button', { name: 'Start Written Testimonial' }).click();

  const commands = await readDataLayer(page);
  expect(eventCommands(commands, 'cta_click')).toHaveLength(1);
  expect(eventCommands(commands, 'schedule_click')).toHaveLength(0);
  assertPrivacySafeGaEvents(commands);
});

test('successful Formspree response emits exactly one privacy-safe generate_lead', async ({ page }) => {
  let formspreeRequests = 0;
  await page.route(FORM_ENDPOINT, async (route) => {
    formspreeRequests += 1;
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await page.goto('/contact/');
  await acceptAnalytics(page);
  await clearDataLayer(page);
  await fillValidContactForm(page);
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText('Thanks for reaching out!')).toBeVisible();

  const commands = await readDataLayer(page);
  expect(formspreeRequests).toBe(1);
  expect(eventCommands(commands, 'generate_lead')).toHaveLength(1);
  assertPrivacySafeGaEvents(commands);
});

test('successful benefits request emits one generic lead without insurance details', async ({ page }) => {
  await page.route(FORM_ENDPOINT, async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await page.goto('/contact/');
  await acceptAnalytics(page);
  await clearDataLayer(page);

  await page.locator('#benefits-name').fill(USER_FIXTURES.name);
  await page.locator('#benefits-email').fill(USER_FIXTURES.email);
  await page.locator('#benefits-phone').fill(USER_FIXTURES.phone);
  await page.locator('#benefits-carrier').fill('Private Carrier Fixture');
  await page.locator('#benefits-plan-name').fill('Private Plan Fixture');
  await page.getByRole('button', { name: 'Request Benefits Review' }).click();
  await expect(page.getByText('Thank you. Our team will follow up about your PPO benefits.')).toBeVisible();

  const commands = await readDataLayer(page);
  const leads = eventCommands(commands, 'generate_lead');
  expect(leads).toHaveLength(1);
  expect(leads[0]?.[2]).toMatchObject({
    form_type: 'website_contact',
    interaction_method: 'form',
  });
  const serialized = JSON.stringify(leads).toLowerCase();
  expect(serialized).not.toContain('private carrier fixture');
  expect(serialized).not.toContain('private plan fixture');
  expect(serialized).not.toContain('insurance_benefits_request');
  assertPrivacySafeGaEvents(commands);
});

test('failed, invalid, and honeypot submissions emit zero generate_lead events', async ({ page }) => {
  let formspreeRequests = 0;
  await page.route(FORM_ENDPOINT, async (route) => {
    formspreeRequests += 1;
    await route.fulfill({ status: 500, contentType: 'application/json', body: '{"ok":false}' });
  });
  await page.goto('/contact/');
  await acceptAnalytics(page);

  await clearDataLayer(page);
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText('Please correct the highlighted fields')).toBeVisible();
  expect(eventCommands(await readDataLayer(page), 'generate_lead')).toHaveLength(0);
  expect(formspreeRequests).toBe(0);

  await clearDataLayer(page);
  await fillValidContactForm(page);
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText('Something went wrong')).toBeVisible();
  expect(eventCommands(await readDataLayer(page), 'generate_lead')).toHaveLength(0);
  expect(formspreeRequests).toBe(1);

  await page.reload();
  await clearDataLayer(page);
  await fillValidContactForm(page);
  await page.locator('#bot-field').evaluate((input: HTMLInputElement) => {
    const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    valueSetter?.call(input, 'spam');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText('Thanks for reaching out!')).toBeVisible();
  expect(eventCommands(await readDataLayer(page), 'generate_lead')).toHaveLength(0);
  expect(formspreeRequests).toBe(1);

  assertPrivacySafeGaEvents(await readDataLayer(page));
});
});

test.describe('GA4 host gate', () => {
  test.beforeEach(async ({ page }) => {
    await blockAnalyticsVendors(page);
  });

  test('allowlist matches the inline snippet and rejects local/preview hosts', () => {
    expect(CANONICAL_ANALYTICS_HOSTS).toEqual([
      'exquisitedentistryla.com',
      'www.exquisitedentistryla.com',
    ]);

    const snippet = extractInlineGoogleTagSnippet();
    const hostCheckIndex = snippet.indexOf('var canonicalAnalyticsHost =');
    const firstGtagCall = snippet.search(/\bgtag\s*\(/);
    const configIds = [...snippet.matchAll(/gtag\('config', '([^']+)'/g)].map((match) => match[1]);

    expect(hostCheckIndex).toBeGreaterThanOrEqual(0);
    expect(firstGtagCall).toBeGreaterThan(hostCheckIndex);
    expect(snippet.indexOf('if (canonicalAnalyticsHost && !analyticsSuppressedPath)')).toBeLessThan(firstGtagCall);
    expect(snippet.indexOf("analyticsPath === '/lp/chatgpt'")).toBeLessThan(firstGtagCall);
    expect(configIds).toEqual(['G-1MZGF2XNB5', 'AW-11373090310']);
    expect(snippet).toContain('googletagmanager.com/gtag/js?id=G-1MZGF2XNB5');
    expect(snippet).toContain("analyticsHostname === 'exquisitedentistryla.com'");
    expect(snippet).toContain("analyticsHostname === 'www.exquisitedentistryla.com'");
    expect(snippet).toContain('__EXQUISITE_ANALYTICS_TEST_HOST__');

    for (const host of CANONICAL_ANALYTICS_HOSTS) {
      expect(isCanonicalAnalyticsHost(host)).toBe(true);
    }
    for (const host of LOCAL_AND_PREVIEW_ANALYTICS_HOSTS) {
      expect(isCanonicalAnalyticsHost(host)).toBe(false);
    }
    expect(isAnalyticsSuppressedPath('/lp/chatgpt')).toBe(true);
    expect(isAnalyticsSuppressedPath('/lp/chatgpt/')).toBe(true);
    expect(isAnalyticsSuppressedPath('/contact/')).toBe(false);
  });

  test('localhost never queues gtag config/events or loads gtag.js', async ({ page }) => {
    const vendorRequests = collectProductionGoogleRequests(page);

    await page.goto('/');
    await acceptAnalytics(page);
    await page.goto('/schedule-consultation/');
    const phone = page.locator('a[data-analytics-source][href^="tel:"]').first();
    await phone.evaluate((anchor) => anchor.addEventListener('click', (event) => event.preventDefault()));
    await phone.click();

    const commands = await readDataLayer(page);
    expect(commands.filter((command) => command[0] === 'config')).toEqual([]);
    expect(commands.filter((command) => command[0] === 'consent')).toEqual([]);
    expect(eventCommands(commands)).toEqual([]);
    expect(await page.evaluate(() => typeof window.gtag)).toBe('undefined');
    expect(await page.locator('script[src*="gtag/js?id=G-1MZGF2XNB5"]').count()).toBe(0);
    await page.waitForTimeout(100);
    expect(vendorRequests).toEqual([]);
  });

  test('an injected gtag on localhost still receives no consent or events', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      window.dataLayer = [];
      window.gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args);
      };
    });
    await acceptAnalytics(page);
    const phone = page.locator('a[href^="tel:"]').first();
    await phone.evaluate((anchor) => anchor.addEventListener('click', (event) => event.preventDefault()));
    await phone.click();

    const commands = await readDataLayer(page);
    expect(commands.filter((command) => command[0] === 'consent')).toEqual([]);
    expect(eventCommands(commands)).toEqual([]);
  });

  for (const hostname of ['branch-abc.vercel.app', 'preview.lovable.app'] as const) {
    test(`${hostname} never queues gtag config/events or loads gtag.js`, async ({ page }) => {
      const vendorRequests = collectProductionGoogleRequests(page);

      await installAnalyticsHostOverride(page, hostname);
      await page.goto('/');

      const commands = await readDataLayer(page);
      expect(commands.filter((command) => command[0] === 'config')).toEqual([]);
      expect(eventCommands(commands)).toEqual([]);
      expect(await page.evaluate(() => typeof window.gtag)).toBe('undefined');
      expect(await page.locator('script[src*="gtag/js?id=G-1MZGF2XNB5"]').count()).toBe(0);
      await page.waitForTimeout(100);
      expect(vendorRequests).toEqual([]);
    });
  }
});
