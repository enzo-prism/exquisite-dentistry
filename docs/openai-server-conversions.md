# OpenAI server conversion delivery

The authoritative server implementation lives in the private [exquisite-dentistry-leads repository](https://github.com/enzo-prism/exquisite-dentistry-leads), which already owns the authenticated Formspree inbox integration. See its `CONVERSIONS.md` for setup, the browser metadata contract, security checks and activation gates.

This website supplies consent choice/version/timestamp, shared UUID event ID, event time, acquisition classification, safe source URL, explicit test flag and original eligible `oppref` in operational Formspree metadata. Its browser pixel continues separately. GA4 and Vercel Analytics do not forward data to OpenAI.

The server implementation supports a signed Formspree webhook with provider-backed retries, plus optional manual validation-only inbox reconciliation. No independent durable outbox exists. The webhook remains disabled until server credentials, provider signing configuration and deployment verification are complete. Validation-only requests do not create conversions; configuring code or loading the pixel does not prove Ads Manager attribution.
