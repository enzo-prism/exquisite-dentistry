# GA4 measurement plan

## Source of truth

- Canonical GA4 property: `498175984` / `G-1MZGF2XNB5`.
- Unidentified former source destination `G-RECCC1K9GK` is disabled until an Analytics Admin proves ownership and need.
- Property `478101252` receives some site traffic through an Admin-linked destination even though its `G-2HKBYNRKYX` ID is not in source.
- Google Ads destination: `AW-11373090310`. Import the canonical GA4 `generate_lead` event once; do not make both a direct Ads event and the imported GA event primary.

## Privacy and consent rules

- Google Consent Mode defaults are queued before every config command.
- Advanced consent mode is intentional: the Google tag may send cookieless measurement pings when `analytics_storage` is denied. The consent UI and privacy policy disclose this behavior.
- `analytics_storage` starts denied. `ad_storage`, `ad_user_data`, and `ad_personalization` always remain denied.
- Google Signals and ad-personalization signals are disabled.
- Vercel Web Analytics and Speed Insights load only after analytics consent. Hotjar is disabled pending a separate healthcare privacy review.
- Production vendor scripts never load on localhost or preview hosts.
- Never send form answers, names, email addresses, phone numbers, insurance details, free text, exact financing amounts, raw search terms, testimonial IDs/titles, full URLs, timestamps, or user identifiers to GA. Approved campaign and click identifiers may appear only in the sanitized initial tag configuration to preserve attribution; never emit them as custom event parameters or dimensions.
- Do not enable Enhanced Conversions for this healthcare site without a separate legal and Google-policy review.

## Event contract

| Event | Trigger | Safe parameters | Key event? |
| --- | --- | --- | --- |
| `page_view` | Initial render and each completed React route change | `page_location`, `page_path`, `page_title`, sanitized `page_referrer` | No |
| `generate_lead` | Formspree returns a successful response for a real form | generic `form_type`, `interaction_method`, `cta_location` | Yes |
| `schedule_click` | Visitor opens an internal or third-party scheduling path | `interaction_method`, `cta_location` | No |
| `contact_click` | Phone, SMS, email, directions, or social contact action | `interaction_method`, `cta_location` | No |
| `cta_click` | General marketing CTA that is not already a contact or schedule action | `cta_type`, `cta_location` | No |
| `financing_engagement` | Broad financing-section or widget interaction | `action`, `cta_location` | No |
| `video_start` / `video_complete` | Broad video engagement | `video_type`, `cta_location` | No |

Event parameters are flat and low-cardinality. Register only `form_type`, `interaction_method`, `cta_location`, `cta_type`, `action`, and `video_type` as event-scoped custom dimensions if they are needed in reports.

## Attribution

The landing page synchronously captures these values for the current browser session: `utm_id`, the five standard UTM fields, `gclid`, `gbraid`, `wbraid`, `dclid`, `msclkid`, and `fbclid`. They can accompany a voluntary Formspree submission for operational source reconciliation, but they are not emitted as custom GA parameters. Values are length-limited and rejected when they look like an email address or phone number.

## Analytics Admin release checklist

1. Disable or delete the existing custom event that turns a `/contact` page view into `generate_lead`.
2. Mark only the real client-emitted `generate_lead` as a key event.
3. Disable Enhanced Measurement's browser-history page-change option so it cannot duplicate manual SPA page views.
4. Confirm the disabled `G-RECCC1K9GK` should remain off and remove linked routing into property `478101252` unless its ownership and purpose are approved.
5. Link only the canonical property to the correct Google Ads account, enable auto-tagging, and import `generate_lead` once as the primary website lead conversion.
6. Keep phone, schedule, financing, and CTA interactions secondary until an actual booked/qualified outcome can be imported from the scheduler or CRM.
7. Register only the approved custom dimensions listed above; do not create dimensions from click IDs or user-entered values.
8. Review internal-traffic filters and data retention with the practice owner.

## Acceptance checks

- Tag Assistant and GA DebugView show exactly one query-free `page_view` on the landing page and one after each React route change.
- A failed, invalid, or honeypot form creates zero `generate_lead` events; one confirmed Formspree success creates exactly one.
- Browser network tools show no Google requests on localhost or preview hosts and no Vercel analytics requests before consent.
- Default and declined consent keep advertising consent denied; accepting analytics grants only `analytics_storage`.
- GA event payloads contain no form values, click IDs as custom parameters, full query strings, hashes, exact financing amounts, or nested parameter objects.
- After production release, Realtime and DebugView are verified against the canonical property before marketing reports are trusted.
