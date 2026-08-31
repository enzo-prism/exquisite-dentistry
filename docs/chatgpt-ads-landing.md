# ChatGPT Ads landing page

## Scope

- Route: `/lp/chatgpt/`
- Audience: paid ChatGPT Ads visitors considering a Los Angeles cosmetic or porcelain veneer consultation.
- Status: local, review-ready implementation. Do not publish or send traffic until the campaign, conversion event, and final copy are approved.
- Experience: focused header and footer, existing practice photography, no video, no concierge overlay, and a dedicated consultation form.

## Search and discovery controls

The route is intentionally paid-only:

- runtime and prerendered HTML both emit `noindex,nofollow,noarchive`;
- the route is not added to `sitemap.xml`;
- the route is excluded from the site search index;
- its canonical URL is `https://exquisitedentistryla.com/lp/chatgpt/`.

## Form and privacy contract

The form uses the established Formspree endpoint but is operationally separated with:

- `form_key=chatgpt_ads_consultation`
- `source=chatgpt_ads`
- `site=exquisite`

It collects only:

- name;
- email;
- phone;
- one non-clinical consultation-interest choice.

There is no free-text field. The page explicitly asks visitors not to submit symptoms, medical history, insurance information, or other health information. Campaign attribution is limited to the existing allowlist in `src/utils/utmTracking.ts`, values are length-limited and screened for email- or phone-like data, and analytics events never receive form contents. The allowlist includes OpenAI's appended `oppref` value for Formspree-side source reconciliation. Do not invent or place an `{oppref}` macro in the destination URL; Ads Manager appends the real value.

The page uses the site's shared Formspree endpoint and separates the request with stable form and source metadata. A labeled fictional submission on August 30, 2026 returned HTTP 200 and delivered to Enzo's work inbox. That proves the current recipient lane, but it does not prove delivery to Michael or Nancy; additional forwarding must be configured in the Formspree account if the practice wants direct copies.

The existing `generate_lead` path runs only after Formspree returns success. Validation failures, honeypots, and failed requests do not generate leads.

## OpenAI conversion measurement

After a confirmed Formspree success, the page dispatches:

`exquisite:chatgpt-ads-lead-confirmed`

The event detail contains only the stable form key and source. It contains no patient-identifying information. `OpenAIAdsMeasurement` listens for the event and sends the standard `lead_created` event only when all of these conditions are true:

- the visitor is on the canonical `/lp/chatgpt/` route;
- `VITE_OPENAI_ADS_PIXEL_ID` contains the approved Ads Manager Pixel ID;
- the visitor granted the site's analytics consent;
- Formspree confirmed the lead successfully.

The Pixel receives no form contents or manually supplied user object. The conversion call uses `{ opt_out: true }`, and the Ads Manager data source should keep automatic advanced matching disabled for this health-care landing page. The Pixel sets consent before initialization because the vendor defaults consent to granted. The source identifier is a public measurement ID, not an API key or secret.

## Review checklist

1. Review the page locally at `/lp/chatgpt/` on desktop and mobile.
2. Confirm the ad destination preserves approved UTM parameters.
3. Submit only a clearly labeled test lead and confirm it arrives under the dedicated form key.
4. Verify no lead event occurs for invalid, honeypot, or failed requests.
5. Before launch, set the real `VITE_OPENAI_ADS_PIXEL_ID`, keep automatic advanced matching disabled, and verify `lead_created` with fictional data only.
6. Confirm that the approved clinician portrait and brand assets have the necessary paid-media usage rights. The page avoids patient, visitor, testimonial, and treatment-result imagery.
7. Confirm the shared Formspree endpoint's real notification recipients and downstream routing with a labeled test submission before sending campaign traffic.
