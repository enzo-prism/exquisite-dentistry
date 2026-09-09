# ChatGPT Ads landing page

## Production scope

- Route: `/lp/chatgpt/`
- Audience: paid ChatGPT Ads visitors considering a Los Angeles cosmetic or porcelain veneer consultation.
- Campaign: `Exquisite LA Cosmetic Consults 30D Pilot`, scheduled September 1–30, 2026.
- Experience: focused header and footer, approved practice photography, no video, no concierge overlay, and a dedicated consultation form.

The route is paid-only. Runtime and prerendered HTML emit `noindex,nofollow,noarchive`, the route is absent from `sitemap.xml` and site search, and the canonical URL is `https://exquisitedentistryla.com/lp/chatgpt/`.

## Form and privacy contract

The form posts to the established Formspree endpoint with stable operational metadata:

- `form_key=chatgpt_ads_consultation`
- `source=chatgpt_ads`
- `site=exquisite`

It collects name, email, phone, and one non-clinical consultation-interest choice. There is no free-text field. Required-field validation, a honeypot, a synchronous double-submit lock, and a 12-second request timeout protect the flow. OpenAI conversion measurement runs only after Formspree returns success.

The page asks visitors not to submit symptoms, medical history, insurance information, or other health information. Formspree is treated as a non-PHI intake provider unless the practice has separate written vendor and BAA confirmation. The privacy policy names Formspree and explains this limited use.

Attribution uses the allowlist in `src/utils/utmTracking.ts`. Values are length-limited and screened for email- or phone-like data. A submission uses one coherent snapshot: current URL attribution when present, otherwise stored session attribution. The allowlist includes OpenAI's appended `oppref`; never invent an `{oppref}` macro in the campaign URL.

## Measurement contract

Google Analytics, Google Ads tags, Vercel Web Analytics, Vercel Speed Insights, and global intent tracking are intentionally disabled on `/lp/chatgpt/`. Google states that healthcare-service pages may be HIPAA-covered and that Google Analytics must not be used on HIPAA-covered pages. Consent Mode does not remove that restriction.

The campaign uses its configured OpenAI Ads conversion source on this route. After consent and a confirmed Formspree success, the app sends `lead_created` with `{ type: 'customer_action' }`, `{ opt_out: true }`, and a random UUID `event_id`. It never turns page visits, phone clicks, or declined/failed submissions into leads.

The unmodified vendor SDK runs only inside `/measurement/openai.html` in an opaque `sandbox="allow-scripts"` iframe. Never add `allow-same-origin`. Automatic advanced matching is enabled by the current vendor configuration; the sandbox prevents the SDK from accessing the parent form or its fields. Parent/frame messages validate source, channel, origin, and event ID. The SDK receives the consented `oppref` when available and its own generic bridge URL/browser/network metadata; it receives no form values, contact hashes, or manually supplied user object. `opt_out` limits personalization; it does not disable measurement or automatic matching.

This isolation is a tested engineering design, not a vendor-endorsed integration pattern. Both Chromium and WebKit tests run the actual current SDK with matching enabled and intercept all collection. Production ingestion must still be verified in Ads Manager after deployment. Cookie-based browser matching is unavailable inside the opaque frame; click-reference attribution is preserved. Queue acknowledgment is not ingestion confirmation.

The consent banner explicitly names OpenAI Ads. Before consent, the iframe and OpenAI SDK do not load. Declining consent produces no conversion signal. Revocation (including another tab) destroys the frame and discards pending events; route-boundary document navigation removes all prior vendor state. Failed storage writes use the current in-memory choice and never reload into an old stored grant. SDK loading has bounded retries, and duplicate confirmed signals reuse the same event ID. Pending events are memory-only, so navigation or browser termination can still interrupt delivery.

## Operations and routing

A labeled fictional submission on August 30, 2026 returned HTTP 200 and reached Enzo's work inbox. That proves the current endpoint and one recipient lane only. It does not prove delivery to Michael or Nancy.

Before treating routing as final, verify in the authenticated Formspree dashboard:

1. the form belongs to the correct Exquisite Dentistry project;
2. production-domain restriction allows `https://exquisitedentistryla.com`;
3. recipients and forwarding rules reach the approved practice owners;
4. spam settings, retention, and autoresponder behavior match the practice's policy;
5. one labeled fictional, non-PHI submission arrives in every required inbox.

## Acceptance checklist

1. Desktop and 320/390 px mobile views show the primary request CTA and an accessible form.
2. Invalid, honeypot, failed, timed-out, and repeated submissions create no duplicate lead.
3. A confirmed Formspree response creates one PII-free OpenAI `lead_created` signal only when consent is granted.
4. Browser network inspection shows no Google or Vercel analytics requests on this route.
5. Production headers include `nosniff`, strict-origin referrer policy, restricted camera/microphone/geolocation, and same-origin framing.
6. Recipient routing and response ownership are verified with one approved fictional submission.


## September 9 diagnosis

Read-only Ads Manager inspection matched pixel `V7dxjf8kBAWERq3f9VG2wM` to Exquisite Dentistry Website and `ChatGPT Consultation Lead` to base event `lead_created` (one campaign). The selected 14-day overview showed 24 impressions, zero clicks, and $0.00 spend. The warning means no normalized events in the previous 24 complete UTC hours; it is not itself proof of broken JavaScript. No artificial pageview/lead is sent to erase it.

For an approved live diagnostic, distinguish these stages: form accepted by Formspree; SDK request attempted; event visible in the correct data-source stream; event matched to the configured conversion; event attributed to an eligible ad click. A synthetic test without a real click reference must not be presented as an ad-generated patient. `debug:true` is not a sandbox and still sends real events.

Run `npm run test:attribution`, the Playwright suite, `npm run build`, and `node scripts/test-tracking-build.mjs` before release. The latter verifies generated HTML retains route isolation, includes the bridge, and excludes measurement routes from indexing. Recheck the deployed bridge headers and actual event stream after deployment.

Current official references:
- https://developers.openai.com/ads/measurement-pixel
- https://developers.openai.com/ads/api-reference/conversion-setup
- https://help.openai.com/en/articles/20001409-conversion-measurement
