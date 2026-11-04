# Replace llms.txt with a proper AI-readable site guide

The current `public/llms.txt` is a robots-style permission note, not the llms.txt format AI assistants read. Replace it with a real one.

## What changes
1. **Rewrite `public/llms.txt`** (served at `https://exquisitedentistryla.com/llms.txt`) in the llmstxt.org format:
   - `# Exquisite Dentistry Los Angeles` + one-line summary (cosmetic & general dentistry, Dr. Alexie Aguil, address/phone from the contact constants).
   - Short plain paragraph: services offered, area served, how to book. Calm voice, no superlatives, no prices or invented claims.
   - `## Services` — veneers (pillar + cost, front-teeth, single-tooth), Invisalign, whitening, implants, crowns, bridges, cosmetic dentistry, smile makeover, emergency, same-day, root canal, cleaning, oral cancer screening, pain-free dentistry.
   - `## Practice` — about, team, tour, smile gallery, testimonials, transformation stories, FAQs, payment plans, insurance, contact, schedule consultation.
   - `## Locations` — locations page plus a few key neighborhood pages (Beverly Hills, West Hollywood, Culver City).
   - `## Blog` — blog index plus 1–2 representative posts.
   - `## Optional` — remaining neighborhood pages, editorial policy, privacy, terms, HIPAA, sitemap.xml.
   - All links absolute with trailing slashes (matching existing canonical form). Excluded: `/lp/chatgpt`, `/share-your-story`, `/sitemap` HTML page, admin/API.
2. **Add a pointer in `public/robots.txt`**: a comment line `# LLM guide: https://exquisitedentistryla.com/llms.txt` (no rule changes).

## Not changed
Routing, redirects, canonicals, schema, PageSEO, index.html.

## Verification
Fetch `/llms.txt` from the dev server and confirm it serves as plain text, and spot-check every listed path exists in the app's routes.
