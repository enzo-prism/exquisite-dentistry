# Coalition Technologies referral audit

Date: August 23, 2026

## Finding

Coalition Technologies is a former SEO/PPC provider for Exquisite Dentistry and still publishes multiple crawlable pages that identify the practice as a client and link to `https://exquisitedentistryla.com`.

The clearest source is Coalition's live case study:

- `https://coalitiontechnologies.com/portfolio/exquisite-dentistry`

Coalition also features Exquisite Dentistry on its dental SEO landing page and portfolio/category pages:

- `https://coalitiontechnologies.com/professional-dental-seo-services`
- `https://coalitiontechnologies.com/portfolio?_industries=dental`
- `https://coalitiontechnologies.com/local-seo`
- `https://coalitiontechnologies.com/case-study-sitemap`

These public backlinks are sufficient to explain legitimate `coalitiontechnologies.com` referral visits. They can produce both human visits and automated crawls when Coalition's pages are reviewed, indexed, or monitored.

## What was checked

- Repository source contains no Coalition script, tag, API call, or active integration.
- The current site uses its own Google/Vercel analytics instrumentation; there is no Coalition-specific runtime code.
- A retained May 2026 Vercel referrer snapshot recorded five visits/devices from `coalitiontechnologies.com`. That small count is consistent with occasional traffic from the public case study and related portfolio links; it does not by itself indicate an active account connection.

## Conclusion

The most likely source is the still-live Coalition case study/backlink network, not a hidden website integration. The available evidence cannot distinguish every historical visit as a person versus a crawler, but no persistent Coalition code connection was found.

## Recommended action

Keep the backlinks if the practice is comfortable being presented as a former Coalition client; they can carry referral and SEO value. If the public case study is no longer approved, contact Coalition and request removal or updated language. Continue monitoring referrer volume and landing pages, but do not block the domain or broad geography based on these five visits.
