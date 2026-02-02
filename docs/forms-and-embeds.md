# Forms and Embeds

## Formspree Contact Form
- Endpoint: https://formspree.io/f/xkgknpkl
- Location: `src/pages/Contact.tsx`
- Required fields: persona selection, name, email, message (phone optional)

How to test:
- Submit the contact form in production with a clear test message.
- Optional curl test:
```sh
curl -X POST https://formspree.io/f/xkgknpkl \
  -H "Accept: application/json" \
  -F "whichBestDescribesYou=Existing patient" \
  -F "name=Test Submission" \
  -F "email=test@example.com" \
  -F "message=Formspree test from verify checklist"
```

## Scheduler Embed
- Scheduler URL: https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null
- Location: `src/pages/ScheduleConsultation.tsx`
- Embed is an iframe with a visible "Open scheduling in a new tab" fallback.

Iframe limitations:
- Third-party iframes can be blocked by browser privacy settings or ad blockers.
- Any CSP changes must allow `frame-src` for the scheduling domain.
- The embed requires HTTPS; mixed content will break the iframe.

## Post-Infra Change Checks
- Cloudflare WAF: ensure form submissions and scheduler loads are not blocked (check Security → Events).
- CSP: confirm `frame-src` includes `https://scheduling.simplifeye.co` and `connect-src` allows `https://formspree.io` if CSP is enabled.
- Mixed content: verify all embeds and form posts use HTTPS.
