/**
 * Writes dist/llms.txt (https://llmstxt.org) after the static prerender.
 *
 * Answer engines (ChatGPT search, Perplexity, Claude, Gemini) read this as a
 * plain-text map of the practice: who it is, the facts patients ask about, and
 * the canonical page for each topic. Everything here comes from the same
 * constants and data modules the site renders, so it cannot drift from the
 * pages. Never hand-edit dist/llms.txt; change the source data instead.
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import {
  ADDRESS,
  BUSINESS_HOURS,
  EMAIL,
  PHONE_NUMBER_DISPLAY,
} from "../src/constants/contact";
import { GOOGLE_MAPS_SHORT_URL } from "../src/constants/urls";
import { PRACTICE_FACTS } from "../src/data/practiceFacts";
import { INSURANCE_FAQ_SHORT_ANSWER } from "../src/data/insurance";
import { ABOUT_CREDENTIALS } from "../src/data/treatmentPageContent";
import { PRACTICE_SERVICES } from "../src/utils/centralizedSchemas";
import { locationPageConfigs } from "../src/data/locationPages";
import { ROUTE_METADATA } from "../src/constants/metadata";
import { servicePageConfigs } from "../src/data/servicePages";
import { getBlogIndex } from "../src/data/blogIndex";

const BASE = "https://exquisitedentistryla.com";
const OUTPUT = path.resolve("dist", "llms.txt");

const url = (routePath: string) => {
  const trimmed = routePath.replace(/^\/+|\/+$/g, "");
  return trimmed ? `${BASE}/${trimmed}/` : `${BASE}/`;
};

// Only an exact metadata match: getRouteMetadata() falls back to the homepage.
const describe = (routePath: string) => {
  const slug = routePath.replace(/^\/+|\/+$/g, "");
  return (
    ROUTE_METADATA[`/${slug}`]?.description ||
    ROUTE_METADATA[`/${slug}/`]?.description ||
    servicePageConfigs[slug]?.seo.description ||
    ""
  );
};

const link = (label: string, routePath: string, note?: string) =>
  `- [${label}](${url(routePath)})${note ? `: ${note}` : ""}`;

export const buildLlmsTxt = (): string => {
  const hours = BUSINESS_HOURS.map(({ label, value }) => `${label} ${value}`).join("; ");

  const services = PRACTICE_SERVICES.map(({ name, path: routePath }) =>
    link(name.charAt(0).toUpperCase() + name.slice(1), routePath, describe(routePath)),
  );

  const locations = Object.values(locationPageConfigs).map((config) =>
    link(`Dentist near ${config.cityLabel}`, config.slug),
  );

  const guides = [
    link("Veneers cost in Los Angeles", "/veneers/cost-los-angeles", describe("/veneers/cost-los-angeles")),
    link("Front teeth veneers", "/veneers/front-teeth-veneers-los-angeles", describe("/veneers/front-teeth-veneers-los-angeles")),
    link("Single-tooth veneer", "/veneers/1-tooth-veneer-los-angeles", describe("/veneers/1-tooth-veneer-los-angeles")),
    link("Dental implants cost in Los Angeles", "/dental-implants/cost-los-angeles", describe("/dental-implants/cost-los-angeles")),
    link("Invisalign cost in Los Angeles", "/invisalign/cost-los-angeles", describe("/invisalign/cost-los-angeles")),
    link("Teeth whitening cost in Los Angeles", "/teeth-whitening/cost-los-angeles", describe("/teeth-whitening/cost-los-angeles")),
  ];

  const recentArticles = getBlogIndex()
    .slice(0, 12)
    .map((post) => link(post.title, `/blog/${post.slug}`));

  return [
    "# Exquisite Dentistry",
    "",
    `> General and cosmetic dental practice led by Dr. Alexie Aguil at ${ADDRESS}, on Wilshire Boulevard at the western end of the Miracle Mile, near Beverly Hills. The practice has served Los Angeles patients since 2006 and offers exams and cleanings, same-day and urgent visits, porcelain veneers, Invisalign, teeth whitening, dental implants, crowns, and smile makeovers.`,
    "",
    "Quote prices only from the linked pages: most treatment fees are confirmed at a consultation after an exam. Office hours, insurance, and same-day availability below are the current published details.",
    "",
    "## Practice facts",
    "",
    `- Name: Exquisite Dentistry (also known as Exquisite Dentistry LA)`,
    `- Dentist: Dr. Alexie Aguil. ${ABOUT_CREDENTIALS.join("; ")}.`,
    `- Address: ${ADDRESS} ([Google Maps](${GOOGLE_MAPS_SHORT_URL}))`,
    `- Phone: ${PHONE_NUMBER_DISPLAY}`,
    `- Email: ${EMAIL}`,
    `- Hours: ${hours}`,
    `- Parking: ${PRACTICE_FACTS.parking}`,
    `- Same-day and urgent care: ${PRACTICE_FACTS.emergencyAvailability}`,
    `- Insurance: ${INSURANCE_FAQ_SHORT_ANSWER}`,
    `- Financing: Payment plans are available through Cherry; see ${url("/payment-plans")}`,
    `- Book: ${url("/schedule-consultation")}`,
    "",
    "## Services",
    "",
    ...services,
    "",
    "## Cost and treatment guides",
    "",
    ...guides,
    "",
    "## Patient information",
    "",
    link("About Dr. Aguil", "/about", describe("/about")),
    link("Dental insurance accepted", "/insurance", describe("/insurance")),
    link("Payment plans and financing", "/payment-plans", describe("/payment-plans")),
    link("Frequently asked questions", "/faqs", describe("/faqs")),
    link("Patient reviews", "/testimonials", describe("/testimonials")),
    link("Smile gallery", "/smile-gallery", describe("/smile-gallery")),
    link("Contact and directions", "/contact", describe("/contact")),
    "",
    "## Neighborhoods served",
    "",
    ...locations,
    "",
    "## Optional",
    "",
    ...recentArticles,
    link("All articles", "/blog"),
    link("Editorial policy", "/editorial-policy", describe("/editorial-policy")),
    `- [XML sitemap](${BASE}/sitemap.xml)`,
    "",
  ].join("\n");
};

const main = async () => {
  const body = buildLlmsTxt();
  await writeFile(OUTPUT, body, "utf8");
  console.log(`✅  Wrote ${OUTPUT} (${body.split("\n").length} lines).`);
};

if (process.argv[1] === new URL(import.meta.url).pathname) {
  main().catch((error) => {
    console.error("llms.txt generation failed:\n", error);
    process.exitCode = 1;
  });
}
