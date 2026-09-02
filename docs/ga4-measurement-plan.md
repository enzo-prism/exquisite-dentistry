# GA4 measurement plan

## Source of truth

- Canonical GA4 property: `498175984` / `G-1MZGF2XNB5`.
- Google Ads destination: `AW-11373090310`.
- GA4 Admin currently marks the client-emitted `generate_lead` event as a key event.
- Unidentified destination `G-RECCC1K9GK` remains disabled until an Analytics Admin proves ownership and need.

## Healthcare route exclusion

The paid ChatGPT Ads landing route `/lp/chatgpt/` is excluded from Google Analytics, Google Ads tags, Vercel Web Analytics, Vercel Speed Insights, and global intent tracking. The inline Google tag checks the normalized path before creating `dataLayer`, defining `gtag`, loading `gtag.js`, or issuing config commands. Runtime event helpers use the same route exclusion.

This is intentional. Google's healthcare guidance says healthcare-service pages may be HIPAA-covered, Google does not offer a BAA for Google Analytics, and Consent Mode does not make Analytics appropriate for a HIPAA-covered page. The OpenAI Ads consent-gated conversion source is the campaign-specific measurement path. No Formspree form answers are sent to it.

Official references:

- <https://support.google.com/analytics/answer/13297105>
- <https://support.google.com/analytics/answer/6366371>
- <https://support.google.com/analytics/answer/2700409>

## Remaining-site privacy and consent rules

- Google Consent Mode defaults are queued before config commands on eligible routes.
- `analytics_storage` starts denied. `ad_storage`, `ad_user_data`, and `ad_personalization` remain denied.
- Vercel Web Analytics and Speed Insights load only after analytics consent.
- Google Signals, ad-personalization signals, and Hotjar remain disabled.
- Vendor scripts never load on localhost or preview hosts.
- Never send form answers, names, email addresses, phone numbers, insurance details, free text, raw search terms, full URLs, timestamps, user identifiers, or click IDs as custom event parameters.
- Do not enable Enhanced Conversions without a separate legal and Google-policy review.

## Eligible-route event contract

| Event | Trigger | Safe parameters | Key event? |
| --- | --- | --- | --- |
| `page_view` | Initial render and each completed eligible React route change | sanitized location, path, title, and referrer | No |
| `generate_lead` | Formspree success on an eligible site form | allowlisted generic form type, interaction method, CTA location | Yes |
| `schedule_click` | Visitor opens a scheduling path | interaction method, CTA location | No |
| `contact_click` | Phone, SMS, email, directions, or social action | interaction method, CTA location | No |
| `cta_click` | General marketing CTA | CTA type, CTA location | No |
| `financing_engagement` | Broad financing interaction | action, CTA location | No |
| `video_start` / `video_complete` | Broad video engagement | video type, CTA location | No |

Register only low-cardinality, approved parameters as event-scoped custom dimensions. Do not create dimensions from click IDs or user-entered values.

## Analytics Admin checklist

1. Keep only the real client-emitted `generate_lead` as a key event; remove any custom event that converts a `/contact` page view into a lead.
2. Disable Enhanced Measurement browser-history page changes so manual SPA page views are not duplicated.
3. Confirm `G-RECCC1K9GK` remains disabled and remove unexplained routing to property `478101252` unless ownership and purpose are approved.
4. Link only the canonical property to the correct Google Ads account, enable auto-tagging, and import `generate_lead` once if Google Ads uses GA lead reporting.
5. Keep phone, schedule, financing, and CTA interactions secondary until booked or qualified outcomes can be imported.
6. Review internal-traffic filters and data retention with the practice owner.

## Acceptance checks

- Eligible canonical routes queue one query-free `page_view` per completed route.
- Invalid, honeypot, failed, and timed-out eligible forms create zero `generate_lead` events.
- Localhost and preview hosts create no Google or Vercel analytics traffic.
- `/lp/chatgpt/` creates no Google or Vercel analytics traffic before or after consent.
- The ChatGPT landing creates only the consented, PII-free OpenAI conversion after confirmed Formspree success.
- GA event payloads contain no form values, click IDs as custom parameters, full query strings, hashes, or nested parameter objects.
