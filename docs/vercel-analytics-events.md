# Vercel Analytics Custom Events

This site uses consent-gated Vercel Web Analytics for pageviews and a small set of custom events for patient-intent signals. Production vendors load only on the canonical production host. The implementation lives in `src/utils/vercelAnalytics.ts`; `docs/ga4-measurement-plan.md` is authoritative for the smaller GA event taxonomy mirrored by selected helpers.

## Privacy Rules

- Do not send patient-entered names, emails, phone numbers, messages, raw search queries, full referrers, timestamps, or user-agent strings to Vercel custom event properties.
- Do not collect Vercel pageviews, Speed Insights, or custom events until analytics consent is explicitly granted.
- Keep event properties flat. Vercel Analytics supports strings, numbers, booleans, and null values; nested objects are intentionally avoided.
- Prefer low-cardinality values such as `source`, `destination`, `action`, `result_type`, and query/result buckets.
- Web Analytics URLs retain only validated UTM campaign fields. Other query parameters, click IDs, and hash fragments are removed; email-like or phone-like paths become `/redacted`. Speed Insights strips all query parameters.

## Current plan and reporting limits

The production project is `exquisite-dentistry` (`prj_AP7khgidjrotghfqfGZ5p46cq2qA`), in `enzo-design-prisms-projects`. Web Analytics and Speed Insights are enabled. As verified October 8, Web Analytics has the ordinary Pro tier, not the Plus add-on. Pro supports two custom properties per event; the helper enforces that limit after sanitizing values. Native page path, route and device context do not consume custom properties. A helper returning true means queued, not ingested or attributed.

The table lists the first two properties retained by the current plan. Other internal arguments remain available for GA4 or a future reviewed plan change, but are not forwarded to Vercel. Web Analytics Plus is a separate paid team-wide add-on, required for native UTM reporting and up to eight custom properties. Do not enable it without spend approval.

Safe UTMs are retained on pageview and event URLs across same-tab navigation from the last tagged visit. Click references, arbitrary queries and hash fragments are removed. Campaign/ad tagging must exist upstream; the site cannot infer which creative was clicked. GA4 can report the campaign dimensions under the existing setup.

The React SDK `path` receives only the normalized pathname. Safe UTMs are restored on the complete event URL in `beforeSend`; putting a query string in `path` makes the collector encode it as pathname text.

Explicit `_codex_test=true` visits suppress Vercel pageviews, events and Speed Insights for the rest of that tab session, including subsequent untagged navigation. Use this marker for production QA, and close that tab after testing. Identified test form submissions also remain excluded from successful acquisition events.

## Event Taxonomy

| Event | Purpose | Common properties |
| --- | --- | --- |
| `Consultation Intent` | Tracks booking intent from navigation, hero CTAs, conversion buttons, the mobile action bar (`mobile_action_bar`), the homepage first-visit band (`homepage_first_visit`), the footer CTA (`footer_cta`), search actions, and service-page CTAs. | `source`, `destination` |
| `CTA Clicked` | Tracks broader high-intent CTAs, especially hero and service-page buttons that are not always booking links. | `source`, `destination` |
| `Contact Method Clicked` | Tracks calls, SMS, directions, email, or social contact intent without sending visitor contact details. | `method`, `source` |
| `Contact Form Started` | First non-honeypot field change per rendered form after analytics consent. No field values are read. | `form` |
| `Contact Form Submit Attempted` | Submit attempt after duplicate/honeypot guards, before validation; not a conversion. | `form` |
| `Contact Form Submitted` | Tracks successful non-test Formspree submissions without sending form contents. Only eligible new-patient requests additionally emit acquisition conversions. | `form` (`consultation_request`, `website_contact`, or generic `website_other`) |
| `Acquisition Lead` | Tracks the successful non-test new-patient inquiry subset, using the same acquisition gate as GA4 `generate_lead`. This is an inquiry, not a staff-qualified lead or booked appointment. | `form` (`consultation_request`, `website_contact`, or generic `website_other`) |
| `Contact Form Validation Failed` | Tracks form friction without sending invalid field values. | `form`, `field_count` |
| `Contact Form Failed` | Tracks failed Formspree requests. | `form`, `reason` |
| `Financing Engagement` | Tracks Cherry financing section views, CTA clicks, widget readiness/errors, and widget clicks. | `action`, `source` |
| `Site Search Opened` | Tracks use of the site search surface. | `source` |
| `Site Search No Results` | Tracks search friction without raw queries. | `query_length_bucket`, `token_count` |
| `Site Search Result Selected` | Tracks selected result category and destination without raw queries. | `result_type`, `destination` |
| `Site Search Action Selected` | Tracks built-in search actions such as scheduling or calling. | `action`, `query_state` |
| `Video Engagement` | Tracks testimonial/proof video starts and completions. | `action`, `source` |
| `Legacy Redirect` | Tracks search-origin legacy redirect indicators without full referrer URLs. | `source`, `has_hash` |

## Verification

Localhost and preview hosts must not load production analytics vendors. After deployment, verify both denied and granted consent states on the canonical host: denied must emit no Vercel collection; granted may emit the approved pageviews and events below.

- Inspect accepted production pageview/event payloads and confirm one pageview per navigation.
- Change a form field twice, submit invalid data, and check one start and a distinct attempt/validation event.
- Test denied consent, later grant, revocation and cross-tab revocation.
- Confirm the explicit QA marker survives document and SPA navigation with no Vercel collection.
- Open search, select a result, and try a no-results query.
- Click a schedule CTA from the header or a service page.
- Click a phone link and directions link.
- Use intercepted requests to test successful forms; explicitly flagged test submissions must never create production conversions.
- Scroll to a financing section, click the payment-plans CTA, and confirm the Cherry widget reaches ready state.

## Reading the consultation funnel

Filter to the production consultation path and compare visitors for `Contact Form Started`, `Contact Form Submit Attempted`, `Contact Form Validation Failed`, `Contact Form Failed`, `Contact Form Submitted`, and `Acquisition Lead`. Use visitor counts alongside event totals: retries are deliberate separate attempts, while one accepted request emits both Submitted and Acquisition Lead. Those two event totals must not be added together as two patients. Main contact and other forms have separate generic layout labels. Form labels do not identify a treatment choice or patient persona. Booked and attended outcomes require private practice reporting; Vercel does not establish them.

Speed Insights retains its default full sample (`sampleRate=1`) for consented eligible visits and strips all query parameters. Results describe measured visits; consent refusals, blockers and small samples prevent complete population coverage.
