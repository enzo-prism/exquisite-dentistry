import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { servicePageConfigs } from "../src/data/servicePages";
import { locationPageConfigs } from "../src/data/locationPages";

const BASE_URL = "https://exquisitedentistryla.com";
const OUTPUT_DIR = path.resolve("public");

const ensureDir = async (filePath: string) => {
  await mkdir(path.dirname(filePath), { recursive: true });
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const listToHtml = (items: string[], tag: "ul" | "ol" = "ul") => {
  if (!items.length) return "";
  const li = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
  return `<${tag}>${li}</${tag}>`;
};

const linksToHtml = (links: Array<{ label: string; href: string }>) => {
  if (!links.length) return "";
  const items = links
    .map(
      (link) =>
        `<li><a href="${link.href}" rel="noopener">${escapeHtml(link.label)}</a></li>`
    )
    .join("\n");
  return `<section><h2>Continue Exploring</h2><ul>${items}</ul></section>`;
};

const buildHead = (title: string, description: string, canonical: string, schema: object) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
  <style>
    body { font-family: 'Inter', system-ui, -apple-system, sans-serif; margin: 0; padding: 2rem; line-height: 1.6; color: #111827; background: #f9fafb; }
    main { max-width: 800px; margin: 0 auto; background: #fff; border-radius: 24px; padding: 2rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
    h1 { font-size: 2.5rem; margin-bottom: 1rem; }
    h2 { font-size: 1.5rem; margin-top: 2rem; }
    ul { padding-left: 1.5rem; }
    li { margin-bottom: 0.5rem; }
    a { color: #6b21a8; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .cta { margin-top: 3rem; padding: 1.5rem; border-radius: 16px; background: #fef3c7; }
  </style>
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>`;

const buildFooter = () => `</main>
</body>
</html>`;

const buildServiceBody = (slug: string) => {
  const config = servicePageConfigs[slug];
  const canonical = `${BASE_URL}/${slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: config.title,
    description: config.seo.description,
    url: canonical,
    provider: {
      "@type": "Dentist",
      name: "Exquisite Dentistry",
      url: BASE_URL
    }
  };

  const intro = config.overview.intro.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n");
  const callouts = listToHtml(config.overview.callouts.map((c) => `${c.title}: ${c.description}`));
  const benefits = listToHtml(config.benefits.map((b) => `${b.title}: ${b.description}`));
  const steps = listToHtml(config.treatmentSteps.map((step) => `${step.title} — ${step.detail}`), "ol");
  const faqs = config.faqs
    .map((faq) => `<p><strong>${escapeHtml(faq.question)}</strong><br/>${escapeHtml(faq.answer)}</p>`)
    .join("\n");
  const links = linksToHtml(config.internalLinks);

  const head = buildHead(config.seo.title, config.seo.description, canonical, schema);
  const body = `
${head}
<main>
  <h1>${escapeHtml(config.hero.heading)}</h1>
  <p>${escapeHtml(config.hero.subheading)}</p>
  ${intro}
  ${callouts}
  <h2>Benefits</h2>
  ${benefits}
  <h2>Treatment Timeline</h2>
  ${steps}
  <h2>Frequently Asked Questions</h2>
  ${faqs}
  ${links}
  <section class="cta">
    <h2>${escapeHtml(config.cta.heading)}</h2>
    <p>${escapeHtml(config.cta.description)}</p>
    <p><a href="${config.cta.primaryHref}">${escapeHtml(config.cta.primaryText)}</a></p>
  </section>
${buildFooter()}`;

  return body;
};

const buildLocationBody = (slug: string) => {
  const config = locationPageConfigs[slug];
  const canonical = `${BASE_URL}/${slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: `Exquisite Dentistry – ${config.cityLabel}`,
    url: canonical,
    telephone: "+1-323-272-2388",
    address: {
      "@type": "PostalAddress",
      streetAddress: "6227 Wilshire Blvd",
      addressLocality: config.cityLabel,
      addressRegion: "CA",
      postalCode: "90048",
      addressCountry: "US"
    }
  };

  const highlights = listToHtml(config.neighborhoodHighlights);
  const services = listToHtml(config.signatureServices);
  const testimonials = config.testimonials
    .map((t) => `<blockquote>“${escapeHtml(t.quote)}” — ${escapeHtml(t.author)}</blockquote>`)
    .join("\n");
  const faqs = config.faqs
    .map((faq) => `<p><strong>${escapeHtml(faq.question)}</strong><br/>${escapeHtml(faq.answer)}</p>`)
    .join("\n");
  const links = linksToHtml(config.relatedServices);

  const head = buildHead(config.seo.title, config.seo.description, canonical, schema);
  const body = `
${head}
<main>
  <h1>${escapeHtml(config.hero.heading)}</h1>
  <p>${escapeHtml(config.hero.subheading)}</p>
  <h2>Why ${escapeHtml(config.cityLabel)} Chooses Us</h2>
  ${highlights}
  <h2>Signature Services</h2>
  ${services}
  <h2>Testimonials</h2>
  ${testimonials}
  <h2>Frequently Asked Questions</h2>
  ${faqs}
  ${links}
  <section class="cta">
    <h2>${escapeHtml(config.cta.heading)}</h2>
    <p>${escapeHtml(config.cta.description)}</p>
    <p><a href="${config.cta.primaryHref}">${escapeHtml(config.cta.primaryText)}</a></p>
  </section>
${buildFooter()}`;

  return body;
};

const validateHtml = (html: string, slug: string) => {
  if (!html.includes("<h1")) throw new Error(`Generated HTML for ${slug} is missing an <h1>.`);
  if (!html.includes("meta name=\"description\"")) throw new Error(`Generated HTML for ${slug} lacks a meta description.`);
  if (!html.includes("rel=\"canonical\"")) throw new Error(`Generated HTML for ${slug} lacks a canonical tag.`);
  if (!html.includes("application/ld+json")) throw new Error(`Generated HTML for ${slug} is missing schema.`);
};

const main = async () => {
  const entries = [
    ...Object.keys(servicePageConfigs).map((slug) => ({ slug, type: "service" as const })),
    ...Object.keys(locationPageConfigs).map((slug) => ({ slug, type: "location" as const }))
  ];

  for (const entry of entries) {
    const filePath = path.join(OUTPUT_DIR, `${entry.slug}.html`);
    const html = entry.type === "service" ? buildServiceBody(entry.slug) : buildLocationBody(entry.slug);
    validateHtml(html, entry.slug);
    await ensureDir(filePath);
    await writeFile(filePath, html, "utf8");
  }

  console.log(`✅ Generated ${entries.length} fallback HTML files in /public`);
};

main().catch((error) => {
  console.error("Fallback generation failed:\n", error);
  process.exitCode = 1;
});
