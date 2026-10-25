# October 25 launch-preflight engineering changes

The paid healthcare landing currently allows general site analytics despite its documented campaign-specific boundary. This draft restores exclusion of Google tags, Vercel Analytics/Speed Insights and global intent tracking on `/lp/chatgpt/`, including case and decoded aliases. The separately consented OpenAI success event and operational Formspree intake remain intact. Explicit QA traffic retains its session marker across the document boundary.

The archived veneers contact heading and submission-error fallback use the current shared practice phone number. The offline archive generator applies the heading correction, and archive hashes are regenerated. Existing redirects are unchanged.

Validation: lint, standalone typecheck, production build, attribution/receipt unit tests, tracking-build assertions, archive integrity, focused Chromium/WebKit form/privacy tests, and built-preview archive tests. Browser tests mock collection and never create real conversions. See the PR for exact results.

This is an unmerged draft. Production deployment requires explicit approval of the final commit and its deployment through the existing production project. No campaign publication, activation, spend, new tracking credential or new data-sharing destination is part of this change. Operational routing and campaign evidence remain in the private launch checklist rather than this public repository.
