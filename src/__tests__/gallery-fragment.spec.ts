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

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test.describe(`gallery fragments at ${viewport.width}px`, () => {
    test.use({ viewport });

    test('lands on the cases from a fresh fragment URL', async ({ page }) => {
      await page.goto(galleryUrl);
      await expectCasesLanding(page);
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
  });
}
