# Infrastructure

Canonical host: https://exquisitedentistryla.com (no www)

DNS (Cloudflare):
- A @ -> 76.76.21.21 (proxied)
- CNAME www -> cname.vercel-dns.com (proxied)

SSL: Cloudflare Full (strict)

Cloudflare WAF rules (order matters):
1. Allow verified search engines
Expression: (cf.client.bot)
Action: Skip (All managed rules)
2. Block non-US traffic
Expression: (ip.geoip.country ne "US")
Action: Block

Vercel domains added: apex + www

Note: Vercel "Proxy detected" is intentional; do not use 1-click fix.
