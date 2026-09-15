# GA4 measurement plan

## Source of truth

- Canonical GA4 property: `498175984` / `G-1MZGF2XNB5`.
- Google Ads destination: `AW-11373090310`.
- GA4 Admin currently marks the client-emitted `generate_lead` event as a key event.
- Unidentified destination `G-RECCC1K9GK` remains disabled until an Analytics Admin proves ownership and need.

## Website and landing-page coverage

As of September 15, 2026, the canonical website and `/lp/chatgpt/` both use GA4, consent-gated Vercel Analytics / Speed Insights, and an isolated consent-gated OpenAI conversion tag. This replaces the former campaign route exclusion at the owner's request. The focused landing layout and noindex behavior remain intact.

Consent keys are versioned to v2 because the measurement scope changed. An old v1 grant is not reused. The banner explicitly names all three tools. Google advanced Consent Mode remains in use: denied visitors may send limited cookieless Google signals; Vercel and OpenAI do not load until granted. These engineering controls are not a claim of HIPAA compliance.

## Privacy and consent rules

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
| `generate_lead` | Confirmed non-test landing consultation or new-patient contact request | allowlisted generic form type, interaction method, CTA location | Yes |
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

- Eligible canonical routes queue one sanitized `page_view` per completed route.
- Invalid, honeypot, failed, and timed-out eligible forms create zero `generate_lead` events.
- Localhost and preview hosts create no Google or Vercel analytics traffic.
- `/lp/chatgpt/` initializes GA4 with denied storage by default and Vercel only after consent.
- The landing and new-patient contact form create a consented, PII-free OpenAI conversion after confirmed Formspree success. Existing-patient, vendor, benefits-only, known test, and explicitly flagged test submissions do not create acquisition conversions.
- GA event payloads contain no form values, click IDs as custom parameters, full query strings, hashes, or nested parameter objects.

Crossing the campaign layout boundary forces a fresh document before vendor initialization, including browser history navigation. Run `node scripts/test-tracking-build.mjs` after building to check the prerendered documents preserve this guard.

## September 15 verification

- Live GA4 Admin confirmed stream `11536123489`, canonical URL, measurement ID `G-1MZGF2XNB5`, and `generate_lead` marked as a key event.
- Disabled automatic history-based page views, form interactions, site search, outbound clicks, video, and file downloads. Manual safe events cover supported interactions; automatic scroll measurement remains enabled.
- Initial GA4 page locations retain only validated campaign parameters / supported ad click IDs. Later SPA views and referrers are sanitized. OpenAI `oppref` is never sent to Google or Vercel.
- Vercel Web Analytics retains validated UTM parameters for campaign reporting; Speed Insights strips every query parameter. General and sensitive URL parameters and hashes are removed.
- Vercel production Web Analytics was already enabled. The correct project is `prj_AP7khgidjrotghfqfGZ5p46cq2qA` (`exquisite-dentistry`).

- Live `/contact/` verification exposed an existing GA4 custom rule that generated `generate_lead` from `page_view` when `page_path` started with `/contact`. Renamed that rule to the non-key `contact_page_view` and read back the saved definition. The manual confirmed-submission `generate_lead` remains the acquisition key event. Historical lead counts before this correction include page visits and must not be treated as confirmed inquiries. Allow Google's configuration propagation before evaluating the new period.
