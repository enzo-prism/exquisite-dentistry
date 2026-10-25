# GA4 measurement plan

## Source of truth

- Canonical GA4 property: `498175984` / `G-1MZGF2XNB5`.
- Google Ads destination: `AW-11373090310`.
- GA4 Admin currently marks the client-emitted `generate_lead` event as a key event.
- Unidentified destination `G-RECCC1K9GK` remains disabled until an Analytics Admin proves ownership and need.

## Website and landing-page coverage

As of September 15, 2026, the canonical website and `/lp/chatgpt/` both use GA4, consent-gated Vercel Analytics / Speed Insights, and an isolated consent-gated OpenAI conversion tag. This replaces the former campaign route exclusion at the owner's request. The focused landing layout and noindex behavior remain intact.

Consent keys are versioned to v2 because the measurement scope changed. An old v1 grant is not reused. The banner explicitly names all three tools. Google advanced Consent Mode remains in use: denied visitors may send limited cookieless Google signals; Vercel and OpenAI do not load until granted. These engineering controls are not a claim of HIPAA compliance.

## Preserved veneers documents

The `/veneers/` archive uses full document navigation and an isolated compiled bridge in `src/legacy/veneersMeasurement.tsx`. It reuses the same consent choices, route observability, attribution helpers, and OpenAI transport. The original Google/Site Kit/GTM, Meta, Hotjar, and Crazy Egg embeds remain removed. Footer Analytics preferences reopens the current banner inside a shadow root without applying main-site styles to the original body.

The archived consultation form is an acquisition inquiry. Only an accepted Formspree response may confirm its snapshot and emit an eligible lead; failed, honeypot, noncanonical, flagged QA, and localhost simulation outcomes are excluded. Patient answers stay in the form payload and never become analytics parameters. Measurement tests mock provider transport, so passing tests do not establish live provider delivery or reporting accuracy.

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
| `page_view` | Initial document render and each completed eligible React route change | sanitized location, path, title, and referrer | No |
| `generate_lead` | Confirmed non-test landing consultation, archived veneers inquiry, or new-patient contact request | allowlisted generic form type, interaction method, CTA location | Yes |
| `form_submission_accepted` | Confirmed non-test form intake, including callback and administrative requests | fixed generic form type, interaction method, CTA location | No |
| `schedule_click` | Visitor opens a scheduling path | interaction method, CTA location | No |
| `contact_click` | Phone, SMS, email, directions, or social action | interaction method, CTA location | No |
| `cta_click` | General marketing CTA | CTA type, CTA location | No |
| `financing_engagement` | Broad financing interaction | action, CTA location | No |
| `video_start` / `video_complete` | Broad video engagement | video type, CTA location | No |

Register only low-cardinality, approved parameters as event-scoped custom dimensions. Do not create dimensions from click IDs or user-entered values.

## October 24 implementation and Admin readback

The canonical property now has four event-scoped custom dimensions, created in
Analytics Admin and independently read back through the GA4 reporting metadata API:

| Display name | Event parameter |
| --- | --- |
| CTA location | `cta_location` |
| Interaction method | `interaction_method` |
| Interaction action | `action` |
| Form type | `form_type` |

`form_type` is restricted in source to `website_contact`, `consultation_request`,
`callback_request`, and `website_other`. It describes the form layout, not treatment
interest, clinical information, patient identity, or qualification.

Each accepted provider receipt reports once per document. A repeat callback for
the same receipt is ignored, while distinct receipts accepted within five seconds
remain distinct. Optional analytics provider failures are isolated. Explicit QA
sessions remain excluded after navigating away from their original test URL.

Use `form_submission_accepted` to diagnose intake coverage. Keep `generate_lead`
as the acquisition key event. A callback, existing-patient request, benefits request,
or vendor message must not become a new-patient lead merely because intake succeeded.
Neither event proves email notification delivery, qualification, booking, or attendance.
Appointment outcomes still require the private, evidence-backed workflow in
`docs/appointment-outcomes.md`; no scheduler or practice-management API is invented.

## Analytics Admin checklist

1. Keep website interaction and diagnostic events non-key. The client-emitted `generate_lead` counts confirmed acquisition inquiries, never `/contact` page views. Existing `qualify_lead` and `close_convert_lead` key events are reserved for verified downstream outcomes; this release does not emit them or invent those outcomes.
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
