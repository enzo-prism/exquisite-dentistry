const CANONICAL_HOST = "exquisitedentistryla.com";

const CANONICAL_HOST_ALIASES = new Set(["www.exquisitedentistryla.com", "m.exquisitedentistryla.com"]);

const PROBE_HEADER = "x-canonicalize-probe";

const hasExtension = (pathname) => /\.[a-z0-9]+$/i.test(pathname);

export default async (request, context) => {
  if (request.headers.get(PROBE_HEADER) === "1") {
    return context.next();
  }

  const url = new URL(request.url);
  const hostHeader = request.headers.get("host") ?? url.host;
  const hostname = hostHeader.split(":")[0].toLowerCase();

  const shouldEnforceCanonicalHost = hostname === CANONICAL_HOST || CANONICAL_HOST_ALIASES.has(hostname);
  const canonicalOrigin = shouldEnforceCanonicalHost ? `https://${CANONICAL_HOST}` : url.origin;

  let canonicalPathname = url.pathname;

  if (canonicalPathname === "/index.html") {
    canonicalPathname = "/";
  } else if (canonicalPathname.endsWith("/index.html")) {
    const indexProbeRequest = new Request(new URL(`${url.origin}${canonicalPathname}`), {
      method: "HEAD",
      headers: new Headers({ [PROBE_HEADER]: "1" })
    });

    const indexProbeResponse = await fetch(indexProbeRequest);

    if (indexProbeResponse.status === 200) {
      canonicalPathname = canonicalPathname.slice(0, -"index.html".length);
    }
  }

  const shouldProbeForSlashRedirect =
    canonicalPathname !== "/" && !canonicalPathname.endsWith("/") && !hasExtension(canonicalPathname);

  if (shouldProbeForSlashRedirect) {
    const probeUrl = new URL(url.toString());
    probeUrl.pathname = `${canonicalPathname}/index.html`;

    const probeRequest = new Request(probeUrl.toString(), {
      method: "HEAD",
      headers: new Headers({ [PROBE_HEADER]: "1" })
    });

    const probeResponse = await fetch(probeRequest);

    if (probeResponse.status === 200) {
      canonicalPathname = `${canonicalPathname}/`;
    }
  }

  const canonicalUrl = new URL(`${canonicalOrigin}${canonicalPathname}${url.search}`);

  if (canonicalUrl.toString() !== url.toString()) {
    return Response.redirect(canonicalUrl.toString(), 301);
  }

  return context.next();
};
