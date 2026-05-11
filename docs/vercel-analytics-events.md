# Vercel Analytics Custom Events

This site uses Vercel Web Analytics for pageviews and a small set of custom events for patient-intent signals. The implementation lives in `src/utils/vercelAnalytics.ts`.

## Privacy Rules

- Do not send patient-entered names, emails, phone numbers, messages, raw search queries, full referrers, timestamps, or user-agent strings to Vercel custom event properties.
- Keep event properties flat. Vercel Analytics supports strings, numbers, booleans, and null values; nested objects are intentionally avoided.
- Prefer low-cardinality values such as `source`, `destination`, `action`, `persona`, `result_type`, and query/result buckets.
- Pageview and event URLs are stripped of query strings and hash fragments by `RouteAwareObservability`.

## Event Taxonomy

| Event | Purpose | Common properties |
| --- | --- | --- |
| `Consultation Intent` | Tracks booking intent from navigation, hero CTAs, conversion buttons, mobile quick actions, search actions, and service-page CTAs. | `source`, `cta_text`, `destination`, `destination_type`, `route`, `path`, `viewport` |
| `CTA Clicked` | Tracks broader high-intent CTAs, especially hero and service-page buttons that are not always booking links. | `source`, `cta_text`, `destination`, `destination_type` |
| `Contact Method Clicked` | Tracks calls, SMS, directions, email, or social contact intent without sending visitor contact details. | `method`, `source`, `destination` |
| `Contact Form Submitted` | Tracks successful Formspree submissions without sending form contents. | `form`, `persona`, `has_phone` |
| `Contact Form Validation Failed` | Tracks form friction without sending invalid field values. | `form`, `field_count`, field-level booleans |
| `Contact Form Failed` | Tracks failed Formspree requests. | `form`, `reason` |
| `Financing Engagement` | Tracks Cherry financing section views, CTA clicks, widget readiness/errors, and widget clicks. | `action`, `source`, `cta_text`, `destination`, `status` |
| `Site Search Opened` | Tracks use of the site search surface. | `source` |
| `Site Search No Results` | Tracks search friction without raw queries. | `query_length_bucket`, `token_count` |
| `Site Search Result Selected` | Tracks selected result category and destination without raw queries. | `query_state`, `query_length_bucket`, `token_count`, `result_count_bucket`, `result_type`, `destination` |
| `Site Search Action Selected` | Tracks built-in search actions such as scheduling or calling. | `action`, `query_state`, `query_length_bucket` |
| `Video Engagement` | Tracks testimonial/proof video starts and completions. | `action`, `source`, `video_id` |
| `Legacy Redirect` | Tracks search-origin legacy redirect indicators without full referrer URLs. | `source`, `has_hash` |

## Verification

In local development, Vercel Analytics runs in development mode and logs/queues events instead of sending production traffic. After deployment, verify in Vercel by opening production routes and triggering a few high-signal actions:

- Open search, select a result, and try a no-results query.
- Click a schedule CTA from the header or a service page.
- Click a phone link and directions link.
- Submit the contact form with a valid test message and also trigger one validation error.
- Scroll to a financing section, click the payment-plans CTA, and confirm the Cherry widget reaches ready state.
