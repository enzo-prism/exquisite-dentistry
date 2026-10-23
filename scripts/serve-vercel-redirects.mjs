/**
 * Local HTTP front for scripts/vsim.mjs — the same @vercel/routing-utils
 * 6.6.0 transform Vercel uses, including trailingSlash routes before
 * redirects and anchored `has` host matching.
 *
 * Official `vercel dev` still does not evaluate `has`, so this is the
 * local way to exercise Host: exquisiteveneersla.com without talking to
 * Flywheel or changing Vercel domains.
 */
import { createServer } from 'node:http';
import { load } from './vsim.mjs';

const route = load('vercel.json', process.env.DIST_DIR || null);
const port = Number(process.env.PORT ?? 8899);
const listenHost = process.env.HOST ?? '127.0.0.1';

const splitRequest = (raw) => {
  const requestUrl = raw && raw.length > 0 ? raw : '/';
  const q = requestUrl.indexOf('?');
  if (q === -1) return { pathname: requestUrl, search: '' };
  return { pathname: requestUrl.slice(0, q), search: requestUrl.slice(q) };
};

const server = createServer((req, res) => {
  const { pathname, search } = splitRequest(req.url ?? '/');
  const host = String(req.headers.host ?? '').split(':')[0];
  const result = route(host, pathname, search);

  if (result.location) {
    res.writeHead(result.status, { Location: result.location });
    res.end();
    return;
  }

  res.writeHead(result.status || 200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});

server.listen(port, listenHost, () => {
  console.log(`vercel.json routing-utils emulator listening on http://${listenHost}:${port}`);
});
