import { resolve4, resolveCname } from 'node:dns/promises';
import tls from 'node:tls';

const BASE_URL = 'https://exquisitedentistryla.com';
const WWW_URL = 'https://www.exquisitedentistryla.com';
const ROOT_CANONICAL = `${BASE_URL}/`;
const APEX_HOST = 'exquisitedentistryla.com';
const WWW_HOST = 'www.exquisitedentistryla.com';
const EXPECTED_APEX_A_RECORDS = ['216.150.1.1', '216.150.16.1'];
const EXPECTED_WWW_CNAME = '5af90ad8a79c4de1.vercel-dns-017.com';
const MIN_CERT_VALID_DAYS = Number(process.env.MIN_CERT_VALID_DAYS || 30);
const isStagingEnv =
  process.env.VITE_APP_ENV === 'staging' ||
  process.env.VERCEL_GIT_COMMIT_REF === 'staging' ||
  process.env.VERCEL_GIT_BRANCH === 'staging';
const vercelEnv = process.env.VERCEL_ENV;

if (isStagingEnv || (vercelEnv && vercelEnv !== 'production')) {
  console.error('verify-prod is restricted to production runs only.');
  process.exit(1);
}

const results = [];

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const toCanonical = (path) => {
  if (!path || path === '/' || path === '') {
    return ROOT_CANONICAL;
  }
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  const withSlash = withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
  return `${BASE_URL}${withSlash.replace(/\n/g, '')}`;
};

const extractCanonical = (html) => {
  const linkMatch = html.match(/<link\s+[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*>/i);
  if (!linkMatch) {
    return null;
  }
  const hrefMatch = linkMatch[0].match(/href=["']([^"']+)["']/i);
  return hrefMatch ? hrefMatch[1] : null;
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

const normalizeDnsValue = (value) => value.replace(/\.$/, '').toLowerCase();

const getCertificate = (hostname) =>
  new Promise((resolve, reject) => {
    let settled = false;
    const socket = tls.connect(
      {
        host: hostname,
        port: 443,
        servername: hostname,
        rejectUnauthorized: true,
        timeout: 10000,
      },
      () => {
        settled = true;
        const certificate = socket.getPeerCertificate();
        socket.end();
        resolve(certificate);
      }
    );

    socket.setTimeout(10000, () => {
      if (settled) return;
      settled = true;
      socket.destroy();
      reject(new Error(`TLS handshake timed out for ${hostname}`));
    });

    socket.on('error', (error) => {
      if (settled) return;
      settled = true;
      reject(error);
    });
  });

const checkCertificateFreshness = async (hostname) => {
  const certificate = await getCertificate(hostname);
  assert(certificate?.valid_to, `Missing certificate validity data for ${hostname}`);

  const expiresAt = new Date(certificate.valid_to);
  const daysRemaining = (expiresAt.getTime() - Date.now()) / 86_400_000;
  assert(Number.isFinite(daysRemaining), `Could not parse certificate expiry for ${hostname}`);
  assert(
    daysRemaining >= MIN_CERT_VALID_DAYS,
    `${hostname} certificate expires in ${daysRemaining.toFixed(1)} days; expected at least ${MIN_CERT_VALID_DAYS}`
  );
};

const checkPageCanonical = async (path) => {
  const url = `${BASE_URL}${path}`;
  const { response, text } = await fetchText(url);
  assert(response.status === 200, `Expected 200, got ${response.status} for ${url}`);

  const canonical = extractCanonical(text);
  const expected = toCanonical(path);
  assert(canonical, `Missing canonical tag for ${url}`);
  assert(canonical === expected, `Canonical mismatch for ${url}. Expected ${expected}, got ${canonical}`);
};

await runCheck('GET / returns 200 and correct canonical', async () => {
  const { response, text } = await fetchText(`${BASE_URL}/`);
  assert(response.status === 200, `Expected 200, got ${response.status}`);

  const canonical = extractCanonical(text);
  assert(canonical, 'Missing canonical tag on home');
  assert(canonical === ROOT_CANONICAL, `Expected canonical ${ROOT_CANONICAL}, got ${canonical}`);
});

await runCheck('www redirects to apex', async () => {
  const response = await fetch(WWW_URL, { redirect: 'manual' });
  assert([301, 308].includes(response.status), `Expected 301 or 308, got ${response.status}`);
  const location = response.headers.get('location');
  assert(location, 'Missing Location header');
  assert(
    location === BASE_URL || location === ROOT_CANONICAL,
    `Expected redirect to ${BASE_URL} or ${ROOT_CANONICAL}, got ${location}`
  );
});

await runCheck('apex DNS points directly to Vercel', async () => {
  const records = await resolve4(APEX_HOST);
  for (const expectedRecord of EXPECTED_APEX_A_RECORDS) {
    assert(records.includes(expectedRecord), `Missing expected A record ${expectedRecord}; got ${records.join(', ')}`);
  }
});

await runCheck('www DNS points directly to Vercel', async () => {
  const records = (await resolveCname(WWW_HOST)).map(normalizeDnsValue);
  assert(
    records.includes(EXPECTED_WWW_CNAME),
    `Missing expected CNAME ${EXPECTED_WWW_CNAME}; got ${records.join(', ')}`
  );
});

for (const hostname of [APEX_HOST, WWW_HOST]) {
  await runCheck(`${hostname} certificate has at least ${MIN_CERT_VALID_DAYS} days remaining`, async () => {
    await checkCertificateFreshness(hostname);
  });
}

await runCheck('robots.txt references sitemap', async () => {
  const { response, text } = await fetchText(`${BASE_URL}/robots.txt`);
  assert(response.status === 200, `Expected 200, got ${response.status}`);
  assert(
    /sitemap:\s*https:\/\/exquisitedentistryla\.com\/sitemap\.xml/i.test(text),
    'robots.txt missing sitemap line'
  );
});

await runCheck('sitemap.xml is valid and apex-only', async () => {
  const { response, text } = await fetchText(`${BASE_URL}/sitemap.xml`);
  assert(response.status === 200, `Expected 200, got ${response.status}`);

  const contentType = response.headers.get('content-type') || '';
  assert(contentType.toLowerCase().includes('xml'), `Expected xml content-type, got ${contentType}`);
  assert(/<urlset\b/i.test(text), 'Missing <urlset> in sitemap');
  assert(!text.includes(WWW_URL), 'Sitemap contains www URLs');
});

const pagesToCheck = [
  '/veneers/',
  '/invisalign/',
  '/emergency-dentist/',
  '/blog/',
  '/contact/'
];

for (const path of pagesToCheck) {
  await runCheck(`Page ${path} returns 200 with apex canonical`, async () => {
    await checkPageCanonical(path);
  });
}

const failed = results.filter((result) => !result.ok);
const passed = results.length - failed.length;

console.log(`\nSummary: ${passed} passed, ${failed.length} failed.`);

if (failed.length > 0) {
  process.exit(1);
}
