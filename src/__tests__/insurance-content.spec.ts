import { expect, test } from '@playwright/test';

const REQUIRED_COPY = [
  'Dental Insurance Accepted in Los Angeles',
  "If you have a PPO dental insurance plan, there's a strong chance we can help you use your benefits",
  'Guardian PPO',
  'Guardian Advantage PPO',
  'We are preparing to support additional PPO access through the Zealous Network',
  'We may be able to work with MetLife PPO members',
  'Cherry financing',
  'Start with your PPO benefits. Use Cherry only if a balance remains.',
  'Do not send a Social Security number, full member ID, date of birth, medical history, diagnosis, or treatment records',
] as const;

const BANNED_COPY_PATTERNS = [
  /\bdirect in-network\b/i,
  /\bpartner billing\b/i,
  /\bbilling contracts?\b/i,
  /\ball PPO plans accepted\b/i,
  /\bMetLife accepted\b/i,
  /\bwe most likely accept\b/i,
] as const;

test('insurance page follows PPO-first copy, CTA, and schema requirements', async ({ page }) => {
  await page.goto('/insurance/');
  await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => undefined);

  await expect(
    page.getByRole('heading', { level: 1, name: /Dental Insurance Accepted in Los Angeles/i }),
  ).toBeVisible();

  const bodyText = (await page.locator('body').textContent()) ?? '';
  for (const copy of REQUIRED_COPY) {
    expect(bodyText).toContain(copy);
  }

  for (const pattern of BANNED_COPY_PATTERNS) {
    expect(bodyText).not.toMatch(pattern);
  }

  const verifyLinks = page
    .getByRole('link')
    .filter({ hasText: /Verify My Insurance|Verify My Benefits|Confirm My Benefits/i });
  await expect.poll(() => verifyLinks.count()).toBeGreaterThanOrEqual(3);

  const verifyHrefs = await verifyLinks.evaluateAll((links) =>
    links.map((link) => link.getAttribute('href')),
  );
  expect(verifyHrefs.every((href) => href === '/contact/#benefits-verification')).toBe(true);

  const phoneLinks = page.getByRole('link', { name: /Call \(323\) 272-2388/i });
  await expect.poll(() => phoneLinks.count()).toBeGreaterThanOrEqual(3);
  const phoneHrefs = await phoneLinks.evaluateAll((links) =>
    links.map((link) => link.getAttribute('href')),
  );
  expect(phoneHrefs.every((href) => href === 'tel:+13232722388')).toBe(true);

  const faqQuestions = [
    'Do you accept PPO dental insurance?',
    'What if I do not see my insurance carrier listed?',
    'Do you accept MetLife PPO insurance?',
    'Do you work with Guardian PPO?',
    'Do you work with the Zealous Network?',
    'Can you verify my benefits before treatment?',
    'Can I use insurance for cosmetic dentistry?',
    'Do you offer financing if insurance does not cover cosmetic treatment?',
  ];

  for (const question of faqQuestions) {
    await expect(page.getByRole('button', { name: question })).toBeVisible();
  }

  const faqSchemas = await page.evaluate(() =>
    Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
      .map((script) => {
        try {
          return JSON.parse(script.textContent || '{}');
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .filter((schema) => schema['@type'] === 'FAQPage'),
  );

  expect(faqSchemas.length).toBeGreaterThan(0);
  const schemaQuestions = faqSchemas.flatMap((schema) =>
    Array.isArray(schema.mainEntity) ? schema.mainEntity.map((item: { name?: string }) => item.name) : [],
  );

  for (const question of faqQuestions) {
    expect(schemaQuestions).toContain(question);
  }
});

test('insurance verification links reach the privacy-conscious benefits form', async ({ page }) => {
  await page.goto('/insurance/');
  await page
    .getByRole('link', { name: /Verify My Insurance|Verify My Benefits/i })
    .first()
    .click();

  await expect(page).toHaveURL(/\/contact\/#benefits-verification$/);
  const section = page.locator('#benefits-verification');
  await expect(section).toBeVisible();
  await expect
    .poll(() =>
      section.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top >= -1 && rect.top < window.innerHeight;
      }),
    )
    .toBe(true);

  await expect(page.getByLabel('Name *', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Email *', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Insurance carrier *', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Plan name (optional)')).toBeVisible();
  await expect(page.getByText('Protect your privacy')).toBeVisible();

  for (const forbiddenName of ['ssn', 'socialSecurityNumber', 'memberId', 'dateOfBirth', 'diagnosis']) {
    await expect(page.locator(`[name="${forbiddenName}"]`)).toHaveCount(0);
  }
});

test('veneers insurance guide preserves publication date and exposes its real update date', async ({ page }) => {
  await page.goto('/blog/are-veneers-covered-by-insurance/');
  await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => undefined);

  await expect(
    page.getByRole('heading', { name: 'Why the Carrier Name May Not Tell the Whole Story' }),
  ).toBeVisible();
  await expect(page.getByText(/Guardian PPO and Guardian Advantage PPO pathways/)).toBeVisible();

  await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute(
    'content',
    '2020-09-19T00:00:00.000Z',
  );
  await expect(page.locator('meta[property="article:modified_time"]')).toHaveAttribute(
    'content',
    '2026-08-23T00:00:00.000Z',
  );

  const blogPosting = await page.evaluate(() =>
    Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
      .map((script) => {
        try {
          return JSON.parse(script.textContent || '{}');
        } catch {
          return null;
        }
      })
      .find((schema) => schema?.['@type'] === 'BlogPosting'),
  );

  expect(blogPosting?.datePublished).toBe('2020-09-19T00:00:00.000Z');
  expect(blogPosting?.dateModified).toBe('2026-08-23T00:00:00.000Z');
});
