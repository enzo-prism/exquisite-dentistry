import { expect, test, type Page } from '@playwright/test';

const FORM_ENDPOINT = 'https://formspree.io/f/xkgknpkl';
const USER_FIXTURES = {
  name: 'Privacy Fixture Person',
  email: 'privacy-fixture@example.test',
  phone: '3235550199',
  interest: 'Private fixture note about veneers',
};

const extractFormFields = (raw: string) => {
  const fields: Record<string, string> = {};
  const multipart = raw.matchAll(
    /name="([^"]+)"(?:; filename="[^"]+")?\r\n(?:Content-Type: [^\r]+\r\n)?\r\n([\s\S]*?)(?=\r\n--)/g,
  );
  for (const match of multipart) {
    fields[match[1]] = match[2];
  }
  if (Object.keys(fields).length > 0) return fields;
  return Object.fromEntries(new URLSearchParams(raw));
};

const fillLeadForm = async (page: Page) => {
  await page.locator('#chatgpt-name').fill(USER_FIXTURES.name);
  await page.locator('#chatgpt-email').fill(USER_FIXTURES.email);
  await page.locator('#chatgpt-phone').fill(USER_FIXTURES.phone);
  await page.locator('#chatgpt-interest').fill(USER_FIXTURES.interest);
};

test.describe('ChatGPT ads landing page', () => {
  test('stays separate from scheduling and captures first-touch UTMs plus ad_id', async ({ page }) => {
    const posted: Record<string, string>[] = [];
    await page.route(FORM_ENDPOINT, async (route) => {
      posted.push(extractFormFields(route.request().postData() ?? ''));
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });

    await page.goto(
      '/lp/chatgpt/?utm_source=chatgpt&utm_medium=cpc&utm_campaign=pilot&utm_content=hero&ad_id=ad-fixture-123',
    );

    await expect(page.getByRole('heading', { name: /calm consultation/i })).toBeVisible();
    await expect(page.locator('iframe[title="Online scheduling"]')).toHaveCount(0);
    await expect(page.locator('main a[href^="/schedule-consultation"]')).toHaveCount(0);
    await expect(page.locator('#chatgpt-name')).toBeVisible();

    await fillLeadForm(page);
    await page.getByRole('button', { name: 'Request a callback' }).click();
    await expect(page.getByText('Thank you. Our team will follow up shortly.')).toBeVisible();

    expect(posted).toHaveLength(1);
    expect(posted[0]).toMatchObject({
      name: USER_FIXTURES.name,
      email: USER_FIXTURES.email,
      phone: USER_FIXTURES.phone,
      form_key: 'chatgpt_ads',
      lead_source: 'chatgpt_ads',
      utm_source: 'chatgpt',
      utm_medium: 'cpc',
      utm_campaign: 'pilot',
      utm_content: 'hero',
      ad_id: 'ad-fixture-123',
    });
  });

  test('does not post honeypot or invalid submissions', async ({ page }) => {
    let formspreeRequests = 0;
    await page.route(FORM_ENDPOINT, async (route) => {
      formspreeRequests += 1;
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });

    await page.goto('/lp/chatgpt/');
    await page.getByRole('button', { name: 'Request a callback' }).click();
    await expect(page.getByText('Please enter your name.')).toBeVisible();
    expect(formspreeRequests).toBe(0);

    await fillLeadForm(page);
    await page.locator('#chatgpt-bot-field').evaluate((input: HTMLInputElement) => {
      const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      valueSetter?.call(input, 'spam');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.getByRole('button', { name: 'Request a callback' }).click();
    await expect(page.getByText('Thank you. Our team will follow up shortly.')).toBeVisible();
    expect(formspreeRequests).toBe(0);
  });
});
