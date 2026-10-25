# Measurement and veneers search metadata release

## Scope

- Add the non-key GA4 event `form_submission_accepted` after provider acceptance,
  including generic callback and administrative intake categories.
- Preserve the narrower new-patient `generate_lead` definition and existing
  qualification/closed-lead key-event settings. Neither intake event is a booking.
- Deduplicate by the existing private receipt reservation, instead of suppressing
  two distinct accepted receipts within an arbitrary five-second GA window.
- Isolate optional analytics failures and exclude marked QA sessions on later SPA routes.
- Register event-scoped `cta_location`, `interaction_method`, `action`, and
  `form_type` dimensions on property `498175984`. Readback confirmed all four.
- Maintain seven veneer-page titles, descriptions, social metadata, WebPage names,
  and search-index titles in the offline archive generator.
- Remove inherited agency Article attribution from service/navigation pages,
  retain actual archived post authors, and correct stale Dentist hours to the
  published Monday–Thursday 8 AM–6 PM schedule. Original body presentation remains.

## Provider and Analytics Admin readback

The authenticated Formspree interface confirmed the Exquisite Dentistry project
and production `xkgknpkl` endpoint. The form and archive storage are enabled,
Formshield is enabled, and the existing email action and webhook are configured.
The webhook's Enabled switch was on. No destination, authentication, recipient,
spam protection, or retention setting was changed; no provider test was sent.

The overview displayed eight submissions in its rolling last-30-days UTC window.
This is an aggregate operational intake count, not eight acquisition leads:
it may include administrative, existing-patient, or test submissions. Patient
submission contents were not opened or exported. It is not directly comparable
with the earlier September 24–October 21 consent-limited GA4 reporting window.

Analytics Admin showed `generate_lead`, `qualify_lead`, and `close_convert_lead`
already marked as key events, with no recent stream data. Those flags were
preserved. `form_submission_accepted` is diagnostic and is not marked as a key event.
The four newly registered custom dimensions may take 24–48 hours to populate
reports after new data arrives, per Google's custom-dimension documentation.

## Integration boundary

This release improves website event coverage and source-controlled reporting
semantics. It does not connect a new scheduler or practice-management system,
prove recipient notification delivery, or establish real lead qualification,
booking, attendance, or treatment acceptance. Those stages require verified
operational evidence through `docs/appointment-outcomes.md`. No fake production
lead or appointment was created to make the counters appear populated.
