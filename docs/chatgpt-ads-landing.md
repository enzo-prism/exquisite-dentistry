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

The campaign uses only the approved OpenAI Ads conversion source on this route. After consent and a confirmed Formspree success, the app sends the standard `lead_created` event with `{ type: 'customer_action' }` and `{ opt_out: true }`. The Pixel receives no form values, click identifiers, URLs, or manually supplied user object. Automatic advanced matching must remain disabled.

The consent banner explicitly names OpenAI Ads. Before consent, the OpenAI SDK is not loaded and the Pixel is not initialized. Declining consent produces no conversion signal.

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
