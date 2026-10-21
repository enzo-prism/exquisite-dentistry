/**
 * Local equivalent of Vercel's vercel.json redirect table.
 *
 * Official `vercel dev` still does not evaluate `has` conditions
 * (https://vercel.com/docs/project-configuration/vercel-json), so host-scoped
 * exquisiteveneersla.com rules would either never fire or — worse — match
 * every hostname. This server applies the same table, including `has` host
 * matching, so curl -H 'Host: …' and `npm run test:redirects` can verify
 * the cutover without talking to Flywheel or changing Vercel domains.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const cfg = JSON.parse(await readFile('vercel.json', 'utf8'));
const redirects = cfg.redirects ?? [];
const trailingSlash = cfg.trailingSlash === true;
const port = Number(process.env.PORT ?? 8899);
const host = process.env.HOST ?? '127.0.0.1';

const hostCondition = (rule) => (rule.has ?? []).find((condition) => condition?.type === 'host');

const hostnameOf = (value) => String(value ?? '').split(':')[0].toLowerCase();

const hostMatches = (rule, requestHost) => {
  const condition = hostCondition(rule);
  if (!condition) return true;
  const hostname = hostnameOf(requestHost);
  const pattern = String(condition.value ?? '');
  try {
    return new RegExp(`^(?:${pattern})$`, 'i').test(hostname);
  } catch {
    return hostname === pattern.toLowerCase();
  }
};

const escapeRegex = (value) => value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

const sourceToRegex = (source) => {
  if (source === '/:path*') return /^\/.*$/;
  let pattern = '';
  const token = /:([A-Za-z0-9_]+)(\*)?/g;
  let lastIndex = 0;
  let match = token.exec(source);
  while (match) {
    pattern += escapeRegex(source.slice(lastIndex, match.index));
    pattern += match[2] ? '.*' : '[^/]+';
    lastIndex = match.index + match[0].length;
    match = token.exec(source);
  }
  pattern += escapeRegex(source.slice(lastIndex));
  return new RegExp(`^${pattern}$`);
};

const compiled = redirects.map((rule) => ({
  rule,
  regex: /[:*]/.test(rule.source) ? sourceToRegex(rule.source) : null,
}));

const matchRedirect = (pathname, requestHost) => {
  for (const { rule, regex } of compiled) {
    if (!hostMatches(rule, requestHost)) continue;
    if (regex ? regex.test(pathname) : pathname === rule.source) return rule;
  }
  return null;
};

const hasFileExtension = (pathname) => /\.[A-Za-z0-9]+$/.test(pathname);

const collapseSlashes = (pathname) => pathname.replace(/\/{2,}/g, '/');

const server = createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? `${host}:${port}`}`);
  const requestHost = req.headers.host ?? '';
  url.pathname = collapseSlashes(url.pathname);
  const matched = matchRedirect(url.pathname, requestHost);

  if (matched) {
    const status = matched.statusCode ?? (matched.permanent === false ? 307 : 308);
    res.writeHead(status, { Location: matched.destination });
    res.end();
    return;
  }

  if (trailingSlash && url.pathname !== '/' && !url.pathname.endsWith('/') && !hasFileExtension(url.pathname)) {
    url.pathname = `${url.pathname}/`;
    res.writeHead(308, { Location: `${url.pathname}${url.search}` });
    res.end();
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});

server.listen(port, host, () => {
  console.log(`vercel.json redirect equivalent listening on http://${host}:${port}`);
});
