# Exquisite lead tracking — October 19, 2026

## Verified path and deployment

Production repository: https://github.com/enzo-prism/exquisite-dentistry . This repair starts from verified production/main commit `0f591ec68150f9e77a4234cfa18f0992bbf12803`. The parallel deployment audit identified READY deployment `dpl_EBLG6nd9Z9ZPkPjH4bX7D98RczTV`, with apex and www aliases. Earlier local main and cached October 8 source were stale.

Authenticated Ads Manager shows all six launch ads using `https://exquisitedentistryla.com/lp/chatgpt/?utm_source=chatgpt&utm_medium=paid&utm_campaign=la_patient_consults_202610`. Campaign tracking adds campaign/ad IDs. OpenAI supplies its own native `oppref`; do not invent a macro or test click.

The live landing page collects name/email, optional phone and consultation interest, and posts to existing Formspree endpoint `https://formspree.io/f/xkgknpkl`. It has no free-text health field. Local registry maps this endpoint to project `2868303187389971756` (last reconciled August 1; not fresh provider proof). Contact, benefits and callback forms share this endpoint. A successful HTTP response means accepted intake, not booked appointment, delivered notification, qualified lead or attended patient.

## Conversion definition

Existing acquisition reporting includes an accepted, non-test landing consultation and an accepted contact form explicitly selecting the new-patient option. Invalid input, honeypot, failed/timeout POST, existing-patient, vendor and benefits messages are excluded from acquisition conversions. Phone/CTA/scheduling clicks are intent only. Callback intake is operational but is not currently an acquisition conversion; changing that definition needs review rather than silently expanding reporting.

A random UUID is created before POST and placed in operational `measurement_event_id` metadata, then reused by the browser conversion handoff. The prepared repair deduplicates repeated/reentrant receipt handling across optional reporting destinations and isolates their errors. It also reuses the shared 12-second, no-automatic-retry submission helper on the landing page. No new destination, credential, consent, campaign setting or server data flow is added.

Deduplication is per receipt per document, plus the existing OpenAI event ID contract. It cannot identify the same person making separate requests, nor guarantee idempotence when a user retries a POST whose timeout had an unknown outcome. Do not use contact identifiers to deduplicate advertising events.

## Destination inventory

- **Formspree operational intake:** provided contact fields and optional consultation choice; on other website forms, message/benefits/callback details appropriate to those forms; operational form/source/environment/path/referrer tags; allowlisted attribution; random receipt UUID/time; acquisition/test flags; consent choice/version/time. This is the existing intake destination. Do not expand it to clinical records. Provider ownership, recipient routing, spam/quota, retention, and delivery remain unverified while signed out.
- **GA4 (`G-1MZGF2XNB5`) / configured Google Ads destination (`AW-11373090310`):** generic query-sanitized page/event context, acquisition event `generate_lead` with generic form/location labels, and allowlisted campaign parameters. Contact fields, treatment selections, form text and OpenAI click reference are not passed by the conversion helper. Existing Google advanced consent mode may send limited cookieless signals when analytics is declined; advertising storage, user data and personalization are denied. No direct conversion label is newly configured.
- **Vercel Analytics:** consent-gated generic operational form events and acquisition label with restricted generic properties. Its SDK adds native request/page context. No form answers or identity are passed to the custom-event helper.
- **OpenAI:** after explicit consent (GPC/DNT overrides it), the existing sandboxed bridge emits `lead_created`, `{type:'customer_action'}`, UUID `event_id`, `opt_out:true`, consented opaque `oppref` when available, and SDK-generated browser/network/time/source metadata. The bridge has a generic URL, no referrer and an opaque `sandbox=allow-scripts` origin; the SDK cannot access the parent form. No contact hashes/user object/treatment/answers or sensitive page URL are supplied. `opt_out` is not consent or a ban on measurement. Automatic advanced matching is a vendor setting; retain isolation rather than allowing access to parent form inputs.

OpenAI currently mounts its existing consented isolated bridge site-wide; this repair does not broaden its scope. Before any additional activation, prefer limiting ad measurement to the accepted, consented inquiry path and review SDK-generated metadata. Do not deploy an ordinary pixel directly onto treatment/insurance/contact documents.

## Provider and campaign blockers

Authenticated Ads Manager inspection at 18:17 UTC showed the launch campaign **Serving**, ending October 19 at 12:38 PM PDT / 19:38 UTC. Its conversion cell says **Set up**, and its edit panel has no conversion event selected. Account event `ChatGPT Consultation Lead` (`lead_created`) exists and shows use by one campaign, zero events in the previous seven days. The website data source is marked Healthy, but the setup checklist says **Implement and log the event** incomplete. These are not proof of ingestion or attribution.

The Formspree audit is already handling sign-in. No fresh provider proof of recipients, forwarding, domain restriction, quota/spam or notification delivery is available. Do not create live fake leads, contact the practice, or alter routing to hide this gap.

No server-side webhook/CAPI is activated. The local registry says central webhook disabled. A server fallback would need an explicit data contract, dedup storage, authenticated provider ingestion, secret provisioning and approval of the destination/sharing; it is outside this repair.

## Completion plan

1. Complete mocked local tests and publish the small reliability repair only after reviewing its exact diff and checks.
2. Once the existing Formspree session is signed in, verify project ownership, permitted domains, recipients, forwarding, spam/quota and retention without exporting patient submissions. Reconcile accepted receipt IDs/counts locally without sending identity to analytics.
3. Resolve the launch campaign's missing conversion-event association separately. Do not change budget, status or end dates. Confirm the existing pixel ID/runtime configuration corresponds to this account before linking anything.
4. Validate UI and emitted payloads with local mocked Formspree/OpenAI/Google/Vercel endpoints; deny all other network destinations and use fictional sentinel values. Exercise accepted, failed, invalid, honeypot, timeout, duplicate, test-flag, consent denial/revocation, storage failure and callback-error cases on Chromium/WebKit. Never use real patient details.
5. After an approved deployment, use read-only page/source/header checks. Real ingestion and attribution must be read back from the correct Ads Manager source/event/campaign following a genuine consented inquiry. Do not call SDK queue acknowledgment ingestion proof, and do not claim full completion before provider reconciliation.

Official SDK contract: https://developers.openai.com/ads/measurement-pixel . Its documented `event_id` deduplication key uses pixel ID, event name and event ID; `opt_out` limits future personalization. The SDK can automatically hash detected customer information when advanced matching is enabled, which is why isolation must remain.

## Validation of this prepared repair

- 21 unit tests passed (receipt deduplication/error isolation, attribution and consented click retention).
- TypeScript passed; repository ESLint passed with nine existing unrelated warnings.
- Production build passed; `node scripts/test-tracking-build.mjs` passed.
- Focused Chromium/WebKit run covered 56 landing/contact recovery cases: 51 initially passed, two passed on retry, and three passed when rerun serially after the build had stopped regenerating source. No unresolved focused failures remain. The new analytics-exception regression passed in both browsers.
- Browser tests mocked Formspree and measurement collection. No live synthetic inquiry or production conversion was submitted.
- This is a prepared local reliability patch. It is not proof of production deployment, Formspree notification delivery, Ads Manager ingestion or campaign attribution.
