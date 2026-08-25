# Analytics measurement IDs

## Source-controlled destinations

| ID | Purpose | Status |
| --- | --- | --- |
| `G-1MZGF2XNB5` | GA4 production source of record | Confirmed in Analytics Admin as property `498175984` |
| `AW-11373090310` | Google Ads destination | Configured at landing time under denied advertising consent; no unverified direct-conversion labels are emitted |

The unidentified source destination `G-RECCC1K9GK` has been removed until an Analytics Admin proves ownership and need. Property `478101252` maps to `G-2HKBYNRKYX`, which is not present in source. If that property continues receiving website events, stop its linked routing in Google Analytics Admin.

All source-controlled destinations use `send_page_view: false`. The React router emits one manual, query-free page view per route. Every Google tag command — script load, consent defaults, both `config` destinations, and later events — is restricted to `exquisitedentistryla.com` and `www.exquisitedentistryla.com`. Localhost, `127.0.0.1`, `*.vercel.app`, and `*.lovable.app` never initialize `gtag`. Vercel Web Analytics and Speed Insights require an explicit analytics opt-in and the same canonical host. Hotjar is disabled pending a separate healthcare privacy review.

## Search Console verification

The Vite build only emits the `google-site-verification` meta tag when `VITE_GSC_VERIFICATION` contains a valid token. When the variable is unset, no meta tag is emitted and no literal placeholder is shipped. The domain currently has DNS TXT verification records, so an absent HTML token does not remove the authoritative domain-level verification method.
