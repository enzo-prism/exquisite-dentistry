import { expect, test } from '@playwright/test';

const parseRgb = (value: string) => {
  const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return null;
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  };
};

const isNearWhite = (value: string) => {
  const rgb = parseRgb(value);
  if (!rgb) return false;
  return rgb.r > 240 && rgb.g > 240 && rgb.b > 240;
};

const isDarkBronze = (value: string) => {
  const rgb = parseRgb(value);
  if (!rgb) return false;
  return rgb.r > 80 && rgb.r < 160 && rgb.g > 60 && rgb.g < 130 && rgb.b < 110 && rgb.r > rgb.b;
};

test('gold booking buttons keep white text on the dark bronze surface', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('exquisite_analytics_consent_v1', 'denied');
  });
  await page.goto('/');

  const heroCta = page.getByRole('link', { name: /schedule consultation/i }).first();
  await expect(heroCta).toBeVisible();

  const heroStyles = await heroCta.evaluate((el) => {
    const styles = getComputedStyle(el);
    return { color: styles.color, backgroundColor: styles.backgroundColor };
  });

  expect(isNearWhite(heroStyles.color)).toBe(true);
  expect(isDarkBronze(heroStyles.backgroundColor)).toBe(true);

  const insuranceCta = page.getByRole('link', { name: 'Verify benefits' }).first();
  await insuranceCta.scrollIntoViewIfNeeded();
  await expect(insuranceCta).toBeVisible();

  const insuranceStyles = await insuranceCta.evaluate((el) => {
    const styles = getComputedStyle(el);
    return { color: styles.color, backgroundColor: styles.backgroundColor };
  });

  expect(isNearWhite(insuranceStyles.color)).toBe(true);
  expect(isDarkBronze(insuranceStyles.backgroundColor)).toBe(true);
});
