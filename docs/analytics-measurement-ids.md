# Analytics measurement IDs

## Source-controlled destinations

| ID | Purpose | Status |
| --- | --- | --- |
| `G-1MZGF2XNB5` | GA4 production source of record | Confirmed in Analytics Admin as property `498175984` |
| `G-RECCC1K9GK` | Secondary GA4 destination added in July 2025 | Ownership is not established by repository history; preserve until Analytics Admin confirms it |
| `AW-11373090310` | Google Ads conversion destination | Configured on demand by conversion helpers so the advertising tag does not load before a conversion interaction |

Property `478101252` maps to `G-2HKBYNRKYX`, not `G-RECCC1K9GK`. The `G-2HKBYNRKYX` ID is not present in source. If that property receives website events through a linked Google-tag destination, stop that routing in Google Analytics Admin rather than deleting the unidentified secondary ID from source.

## Search Console verification

The Vite build only emits the `google-site-verification` meta tag when `VITE_GSC_VERIFICATION` contains a valid token. When the variable is unset, no meta tag is emitted and no literal placeholder is shipped. The domain currently has DNS TXT verification records, so an absent HTML token does not remove the authoritative domain-level verification method.
