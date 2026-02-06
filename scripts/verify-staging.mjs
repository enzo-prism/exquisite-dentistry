const BASE_URL = 'https://staging.exquisitedentistryla.com';

const results = [];

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const runCheck = async (name, fn) => {
  try {
    await fn();
    results.push({ name, ok: true });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.push({ name, ok: false, message: error.message || String(error) });
    console.log(`FAIL ${name} - ${error.message || String(error)}`);
  }
};

const fetchText = async (url, options = {}) => {
  const response = await fetch(url, options);
  const text = await response.text();
  return { response, text };
};

const extractRobotsContent = (html) => {
  const match = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  return match ? match[1] : null;
};

const checkNoindex = (html, url) => {
  const content = extractRobotsContent(html);
  assert(content, `Missing robots meta for ${url}`);
  const normalized = content.toLowerCase();
  assert(normalized.includes('noindex'), `Robots meta missing noindex for ${url}`);
  assert(normalized.includes('nofollow'), `Robots meta missing nofollow for ${url}`);
};

const pagesToCheck = [
  '/',
  '/veneers/',
  '/invisalign/',
  '/emergency-dentist/',
  '/blog/',
  '/contact/'
];

for (const path of pagesToCheck) {
  await runCheck(`Page ${path} returns 200 with noindex`, async () => {
    const url = `${BASE_URL}${path}`;
    const { response, text } = await fetchText(url);
    assert(response.status === 200, `Expected 200, got ${response.status} for ${url}`);
    checkNoindex(text, url);
  });
}

const failed = results.filter((result) => !result.ok);
const passed = results.length - failed.length;

console.log(`\nSummary: ${passed} passed, ${failed.length} failed.`);

if (failed.length > 0) {
  process.exit(1);
}
