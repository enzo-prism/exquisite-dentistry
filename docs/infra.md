# Infrastructure

Canonical host: https://exquisitedentistryla.com (no www)

DNS:
- Apex resolves directly to Vercel edge IPs.
- www is a Vercel CNAME and 308 redirects to apex.

TLS: Vercel serves the public edge certificate while web records stay DNS-only. Cloudflare SSL mode is not in the public request path unless the records are deliberately proxied again.

Vercel domains added: apex + www

Note: Keep web records DNS-only/direct-to-Vercel unless there is a deliberate Cloudflare proxy requirement and a monitoring plan for Vercel certificate renewal.
