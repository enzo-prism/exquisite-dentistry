import { servicePageConfigs } from "../src/data/servicePages";
import { locationPageConfigs } from "../src/data/locationPages";

const MIN_WORDS = 150;
const MIN_SERVICE_LINKS = 2;
const MIN_LOCATION_LINKS = 1;

type Issue = { type: "error" | "warn"; message: string };
const issues: Issue[] = [];

const addError = (message: string) => issues.push({ type: "error", message });
const addWarn = (message: string) => issues.push({ type: "warn", message });

const wordCount = (input: string): number =>
  input
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

const validateLinks = (links: Array<{ label: string; href: string }>, slug: string, minLinks: number, label: string) => {
  if (!Array.isArray(links) || links.length < minLinks) {
    addError(`${label} "${slug}" must define at least ${minLinks} internal link(s).`);
    return;
  }
  links.forEach(({ label: linkLabel, href }) => {
    if (!href || !href.startsWith("/")) {
      addError(`${label} "${slug}" has an invalid href (${href}) for link "${linkLabel}".`);
    }
  });
};

Object.entries(servicePageConfigs).forEach(([slug, config]) => {
  if (!config.seo?.title) addError(`Service "${slug}" is missing seo.title.`);
  if (!config.seo?.description) addError(`Service "${slug}" is missing seo.description.`);
  if (!config.hero?.heading) addError(`Service "${slug}" is missing a hero heading.`);

  validateLinks(config.internalLinks, slug, MIN_SERVICE_LINKS, "Service");

  const textBlocks: string[] = [
    config.hero?.subheading ?? "",
    ...(config.overview?.intro ?? []),
    ...(config.overview?.callouts ?? []).map((c) => c.description),
    ...(config.benefits ?? []).map((b) => b.description),
    ...(config.treatmentSteps ?? []).map((step) => step.detail),
    ...(config.faqs ?? []).map((faq) => faq.answer),
    config.cta?.description ?? ""
  ];

  const totalWords = wordCount(textBlocks.filter(Boolean).join(" "));
  if (totalWords < MIN_WORDS) {
    addWarn(`Service "/${slug}" contains ${totalWords} words (< ${MIN_WORDS}).`);
  }
});

Object.entries(locationPageConfigs).forEach(([slug, config]) => {
  if (!config.seo?.title) addError(`Location "${slug}" is missing seo.title.`);
  if (!config.seo?.description) addError(`Location "${slug}" is missing seo.description.`);
  if (!config.hero?.heading) addError(`Location "${slug}" is missing a hero heading.`);

  validateLinks(config.relatedServices, slug, MIN_LOCATION_LINKS, "Location");

  const textBlocks: string[] = [
    config.hero?.subheading ?? "",
    ...(config.neighborhoodHighlights ?? []),
    ...(config.signatureServices ?? []),
    ...(config.testimonials ?? []).map((t) => t.quote),
    ...(config.faqs ?? []).map((faq) => faq.answer),
    config.cta?.description ?? ""
  ];

  const totalWords = wordCount(textBlocks.filter(Boolean).join(" "));
  if (totalWords < MIN_WORDS) {
    addWarn(`Location "/${slug}" contains ${totalWords} words (< ${MIN_WORDS}).`);
  }
});

const errors = issues.filter((item) => item.type === "error");
const warnings = issues.filter((item) => item.type === "warn");

if (errors.length) {
  console.error("\nContent QA Errors:");
  errors.forEach((issue) => console.error(`  • ${issue.message}`));
}

if (warnings.length) {
  console.warn("\nContent QA Warnings:");
  warnings.forEach((issue) => console.warn(`  • ${issue.message}`));
}

if (!issues.length) {
  console.log("✅ Content QA checks passed for services and location pages.");
} else if (errors.length) {
  process.exitCode = 1;
} else {
  console.log("⚠️  Content QA completed with warnings (see above).");
}
