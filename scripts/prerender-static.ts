import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { servicePageConfigs } from "../src/data/servicePages";
import { locationPageConfigs } from "../src/data/locationPages";
import { getPublishedPosts } from "../src/data/blogPosts";
import { transformationStories } from "../src/data/transformationStories";
import { getRouteMetadata } from "../src/constants/metadata";
import {
  MASTER_BUSINESS_ENTITY,
  MASTER_DOCTOR_ENTITY,
  WEBSITE_ENTITY,
  createBreadcrumbSchema,
  createFAQSchema,
  createMedicalProcedureSchema,
  createWebPageSchema
} from "../src/utils/centralizedSchemas";
import {
  DENTAL_IMPLANTS_HUB_INTRO_PARAGRAPHS,
  DENTAL_IMPLANTS_HUB_SECTIONS,
  DENTAL_IMPLANTS_HUB_SUPPORTING_LINKS
} from "../src/data/dental-implants-hub";
import {
  ADDRESS,
  BUSINESS_HOURS,
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_E164
} from "../src/constants/contact";
import { GOOGLE_MAPS_SHORT_URL } from "../src/constants/urls";
import { faqs } from "../src/data/faqs";
import { VIDEO_TESTIMONIALS } from "../src/components/video-hero/video-constants";
import { ZOOM_WHITENING_FAQS } from "../src/data/zoomWhitening";
import { DENTAL_IMPLANT_FAQS } from "../src/data/dental-implants-faqs";

type StaticLink = { label: string; href: string };
type StaticRouteSection = {
  id?: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: StaticLink[];
};
type StaticRoute = {
  path: string;
  title: string;
  description: string;
  h1: string;
  paragraphs: string[];
  sections?: StaticRouteSection[];
  links: StaticLink[];
};

const DIST_DIR = path.resolve("dist");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");
const SCHEMA_ORG_CONTEXT = "https://schema.org";

const defaultNavLinks: StaticLink[] = [
  { label: "Services", href: "/services" },
  { label: "About Dr. Aguil", href: "/about" },
  { label: "Smile Gallery", href: "/smile-gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const manualPages: StaticRoute[] = [
  {
    path: "/",
    title: getRouteMetadata("/").title,
    description: getRouteMetadata("/").description,
    h1: "Los Angeles' Premier Cosmetic Dentist",
    paragraphs: [
      "Transform your smile at Los Angeles' most trusted cosmetic dentistry practice near Beverly Hills. Celebrity clientele, spa-like environment, and Hollywood-quality results with Dr. Alexie Aguil.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/about",
    title: getRouteMetadata("/about").title,
    description: getRouteMetadata("/about").description,
    h1: "Meet Dr. Alexie Aguil",
    paragraphs: [
      "Discover the artistic vision, advanced training, and personalized philosophy that has made Dr. Aguil Beverly Hills' most sought-after cosmetic dentist for over 15 years.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/services",
    title: getRouteMetadata("/services").title,
    description: getRouteMetadata("/services").description,
    h1: "Advanced Cosmetic & Restorative Dental Services",
    paragraphs: [
      "Experience the full spectrum of modern dentistry with procedures ranging from preventive care to complex smile makeovers. Our Los Angeles practice near Beverly Hills combines artistic vision with cutting-edge technology to deliver exceptional results.",
    ],
    links: [
      { label: "Porcelain Veneers", href: "/veneers" },
      { label: "Invisalign", href: "/invisalign" },
      { label: "Zoom Whitening", href: "/zoom-whitening" },
      { label: "Dental Implants", href: "/dental-implants" },
      ...defaultNavLinks,
    ],
  },
  {
    path: "/veneers",
    title: getRouteMetadata("/veneers").title,
    description: getRouteMetadata("/veneers").description,
    h1: "Custom Porcelain Veneers",
    paragraphs: [
      "Experience the ultimate smile transformation with our ultra-thin, custom-crafted porcelain veneers. Achieve the perfect balance of beauty, strength, and natural appearance that has made Los Angeles smiles world-famous.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/invisalign",
    title: getRouteMetadata("/invisalign").title,
    description: getRouteMetadata("/invisalign").description,
    h1: "Invisalign® Clear Aligners",
    paragraphs: [
      "Discreet, digitally guided smile alignment tailored to Los Angeles lifestyles.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/teeth-whitening",
    title: getRouteMetadata("/teeth-whitening").title,
    description: getRouteMetadata("/teeth-whitening").description,
    h1: "Teeth Whitening Los Angeles",
    paragraphs: [
      "Professional teeth whitening in Los Angeles can remove common coffee, tea, and wine stains while keeping comfort and enamel health in focus.",
      "Explore in-office Zoom whitening, custom take-home options, and hybrid maintenance plans tailored to your timeline and sensitivity level.",
    ],
    links: [{ label: "Zoom Whitening", href: "/zoom-whitening" }, ...defaultNavLinks],
  },
  {
    path: "/culver-city-teeth-whitening",
    title: getRouteMetadata("/culver-city-teeth-whitening").title,
    description: getRouteMetadata("/culver-city-teeth-whitening").description,
    h1: "Teeth Whitening Near Culver City",
    paragraphs: [
      "Searching for teeth whitening in Culver City? Many patients visit our Wilshire Blvd dental studio for in-office whitening and custom take-home options planned for comfort and enamel health.",
      "Compare fast in-office whitening to gradual tray-based brightening, get guidance for sensitivity and existing dental work, and leave with a maintenance plan that fits your schedule.",
    ],
    links: [
      { label: "Compare Teeth Whitening Options", href: "/teeth-whitening" },
      { label: "Zoom Whitening", href: "/zoom-whitening" },
      { label: "Culver City Dentist", href: "/culver-city-dentist" },
      ...defaultNavLinks,
    ],
  },
  {
    path: "/zoom-whitening",
    title: getRouteMetadata("/zoom-whitening").title,
    description: getRouteMetadata("/zoom-whitening").description,
    h1: "Zoom Teeth Whitening in Los Angeles",
    paragraphs: [
      "Looking for Zoom whitening in Los Angeles? Our in-office Zoom Teeth Whitening treatment is designed to lift surface stains and brighten natural teeth in about 60–90 minutes.",
      "Visit Exquisite Dentistry on Wilshire Blvd (near Beverly Hills and West Hollywood) for a shade assessment, comfort-first whitening protocol, and clear aftercare guidance to help results last.",
    ],
    links: [
      { label: "Teeth Whitening Options", href: "/teeth-whitening" },
      ...defaultNavLinks,
    ],
  },
  {
    path: "/dental-implants",
    title: getRouteMetadata("/dental-implants").title,
    description: getRouteMetadata("/dental-implants").description,
    h1: "Dental Implants in Los Angeles",
    paragraphs: [...DENTAL_IMPLANTS_HUB_INTRO_PARAGRAPHS],
    sections: DENTAL_IMPLANTS_HUB_SECTIONS,
    links: [
      ...DENTAL_IMPLANTS_HUB_SUPPORTING_LINKS,
      ...defaultNavLinks,
    ],
  },
  {
    path: "/cosmetic-dentistry",
    title: getRouteMetadata("/cosmetic-dentistry").title,
    description: getRouteMetadata("/cosmetic-dentistry").description,
    h1: "Cosmetic Dentistry Los Angeles",
    paragraphs: [
      "Curated smile transformations for tastemakers, entrepreneurs, and artists.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/emergency-dentist",
    title: getRouteMetadata("/emergency-dentist").title,
    description: getRouteMetadata("/emergency-dentist").description,
    h1: "Emergency Dentist Los Angeles",
    paragraphs: [
      "Immediate, compassionate care when dental emergencies disrupt your day.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/contact",
    title: getRouteMetadata("/contact").title,
    description: getRouteMetadata("/contact").description,
    h1: "Contact Us",
    paragraphs: [
      "We're here to answer your questions and help you schedule your appointment with Dr. Alexie Aguil.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/testimonials",
    title: getRouteMetadata("/testimonials").title,
    description: getRouteMetadata("/testimonials").description,
    h1: "Client Testimonials",
    paragraphs: [
      "See what our clients are saying about their experience at Exquisite Dentistry.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/smile-gallery",
    title: getRouteMetadata("/smile-gallery").title,
    description: getRouteMetadata("/smile-gallery").description,
    h1: "Smile Gallery",
    paragraphs: [
      "See the incredible results our patients have achieved with our expert dental care.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/faqs",
    title: getRouteMetadata("/faqs").title,
    description: getRouteMetadata("/faqs").description,
    h1: "Dental FAQs",
    paragraphs: [
      "Get comprehensive answers about our Los Angeles practice near Beverly Hills, treatment procedures, insurance coverage, and what to expect during your luxury dental experience.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/blog",
    title: getRouteMetadata("/blog").title,
    description: getRouteMetadata("/blog").description,
    h1: "Expert Dental Insights & Patient Education",
    paragraphs: [
      "Stay informed with the latest in cosmetic dentistry, oral health innovations, and expert guidance from Dr. Alexie Aguil and our Los Angeles dental team near Beverly Hills.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/tour",
    title: "Luxury Dental Studio Tour | Exquisite Dentistry LA",
    description:
      "Take a virtual tour of Exquisite Dentistry in Los Angeles. Explore our spa-like dental studio, advanced technology, and comfort-first amenities.",
    h1: "Take a Tour of Our Los Angeles Dental Studio",
    paragraphs: [
      "Step inside Exquisite Dentistry and see how a calm, spa-like environment and modern technology work together to make every visit feel easier.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/client-experience",
    title: "Luxury Dental Spa LA | Comfort‑Focused Dentistry | Exquisite",
    description:
      "Learn what to expect at Exquisite Dentistry: comfort amenities, gentle care, and a concierge patient experience for cosmetic and restorative dentistry in Los Angeles.",
    h1: "A Comfort‑First Dental Experience",
    paragraphs: [
      "From arrival to aftercare, our team focuses on comfort, clear communication, and treatment plans tailored to your goals.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/veneers-los-angeles",
    title: "Veneers Los Angeles | Custom Porcelain Smile Design | Exquisite",
    description:
      "Explore porcelain veneers in Los Angeles. See candidacy, process, and real results with Dr. Alexie Aguil’s custom smile design approach.",
    h1: "Porcelain Veneers in Los Angeles",
    paragraphs: [
      "Porcelain veneers refine color, shape, and symmetry with a conservative approach designed to look natural in real life.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/veneers/front-teeth-veneers-los-angeles",
    title:
      "Front Teeth Veneers in Los Angeles | 2–4 Tooth Smile Zone Makeovers",
    description:
      "Plan front‑teeth veneers in Los Angeles with transparent pricing, minimal‑prep porcelain, and smile‑zone design by Dr. Alexie Aguil, DDS.",
    h1: "Front Teeth Veneers in Los Angeles",
    paragraphs: [
      "This guide covers 2–4 front‑teeth veneers, candidacy, timelines, and what to expect when refining the smile zone.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/itero-scanner",
    title: "iTero Scanner Los Angeles | Digital Dental Impressions | Exquisite",
    description:
      "Discover how iTero 3D scanning improves comfort and precision for Invisalign, crowns, and veneers at our Los Angeles dental studio.",
    h1: "iTero 3D Scanning for Precision Dentistry",
    paragraphs: [
      "Our iTero scanner captures fast, comfortable digital impressions and helps us plan treatments with greater accuracy.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/transformation-stories",
    title:
      "Patient Transformation Stories | Exquisite Dentistry Los Angeles",
    description:
      "Watch real patient transformation stories from Exquisite Dentistry in Los Angeles. Hear what changed, what they experienced, and why they recommend our team.",
    h1: "Patient Transformation Stories",
    paragraphs: [
      "These interviews highlight real people, their goals, and how their dental experience shifted from anxiety or uncertainty to confidence.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/share-your-story",
    title: "Share Your Story | Exquisite Dentistry Los Angeles",
    description:
      "Share your experience with Exquisite Dentistry. Tell us how your smile or comfort changed and help future patients feel prepared.",
    h1: "Share Your Transformation Story",
    paragraphs: [
      "We’re grateful when patients share what stood out in their care — from comfort to results. Your story helps others feel confident booking a visit.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/wedding",
    title: "Bridal Smile Makeover LA | Perfect Wedding Dentistry | Exquisite",
    description:
      "Wedding smile prep in Los Angeles: veneers, whitening, and alignment timed to your big day. Concierge planning with Dr. Alexie Aguil.",
    h1: "Wedding Smile Prep in Los Angeles",
    paragraphs: [
      "We coordinate whitening, veneers, and Invisalign timelines around your wedding so your smile looks natural and photo‑ready.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/graduation",
    title: "Graduation Smile Prep LA | Student Dental Packages | Exquisite",
    description:
      "Graduation smile makeovers in Los Angeles with whitening, Invisalign, and cosmetic upgrades designed for milestone photos and interviews.",
    h1: "Graduation Smile Prep",
    paragraphs: [
      "Celebrate your milestone with a confident smile. Our team helps you choose the right cosmetic plan for your timeline and budget.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | Exquisite Dentistry Los Angeles",
    description:
      "Read how Exquisite Dentistry protects and uses personal information in compliance with HIPAA and California privacy standards.",
    h1: "Privacy Policy",
    paragraphs: [
      "We take privacy seriously. This page explains what data we collect, how it’s used, and your rights as a patient.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service | Exquisite Dentistry Los Angeles",
    description:
      "Review appointment policies, payment terms, and patient responsibilities for care at Exquisite Dentistry in Los Angeles.",
    h1: "Terms of Service",
    paragraphs: [
      "These terms outline how appointments, payments, and treatment plans work at our practice.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/hipaa-compliance",
    title:
      "HIPAA Compliance | Patient Health Information Protection | Exquisite",
    description:
      "Learn how Exquisite Dentistry safeguards protected health information and follows HIPAA best practices in Los Angeles.",
    h1: "HIPAA Compliance",
    paragraphs: [
      "We follow HIPAA guidelines and use secure systems to protect your health information.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/editorial-policy",
    title: "Editorial Policy | Exquisite Dentistry Los Angeles",
    description:
      "How Exquisite Dentistry creates, reviews, and updates dental information to keep our content accurate and patient‑focused.",
    h1: "Editorial Policy",
    paragraphs: [
      "Our clinical content is written for patients and reviewed by licensed dental professionals. Each medical‑adjacent page includes a last‑updated date.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/sitemap",
    title: "Website Directory & Sitemap | Exquisite Dentistry LA",
    description:
      "Browse a full directory of Exquisite Dentistry pages, including services, patient resources, and location guides.",
    h1: "Site Map",
    paragraphs: [
      "Use this directory to find every major service, guide, and patient resource on our website.",
    ],
    links: defaultNavLinks,
  },
];

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const stripHtml = (value: string) =>
  value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const toMeta = (input: string, max = 155) => {
  const text = stripHtml(input || "").replace(/["<>]/g, "").trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "");
};

const truncateTitle = (input: string, max = 70) => {
  if (input.length <= max) return input;
  return input.slice(0, max).replace(/\s+\S*$/, "").trim();
};

const stripTrailingSeparators = (input: string) =>
  input.replace(/[\s|–—:-]+$/g, "").trim();

const normalizeInternalHref = (href: string) => {
  if (!href) return href;
  if (href.startsWith("#")) return href;
  if (/^(https?:)?\/\//i.test(href)) return href;
  if (/^(mailto|tel):/i.test(href)) return href;
  if (!href.startsWith("/")) return href;

  const match = href.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] ?? href;
  const suffix = match?.[2] ?? "";

  if (pathname === "/" || pathname.endsWith("/")) return href;
  if (/\/[^/]+\.[^/]+$/.test(pathname)) return href;

  return `${pathname}/${suffix}`;
};

const buildSeoTitle = (title: string) => {
  const brandSuffix = "Exquisite Dentistry Los Angeles";
  const lowerTitle = title.toLowerCase();
  const shouldAppendBrand = !lowerTitle.includes("exquisite dentistry");
  const separator = " | ";
  const fullTitle = shouldAppendBrand
    ? `${title}${separator}${brandSuffix}`
    : title;
  return stripTrailingSeparators(truncateTitle(fullTitle, 70));
};

const uniqueLinks = (links: StaticLink[]) => {
  const map = new Map<string, StaticLink>();
  links.forEach((link) => {
    if (!link.href) return;
    const normalizedHref = normalizeInternalHref(link.href);
    if (!map.has(normalizedHref)) {
      map.set(normalizedHref, { ...link, href: normalizedHref });
    }
  });
  return Array.from(map.values());
};

const renderLinkList = (links: StaticLink[], className = "") => {
  if (!links.length) return "";
  const items = links
    .map(
      (link) =>
        `<li><a class="text-primary underline hover:no-underline" href="${escapeHtml(
          normalizeInternalHref(link.href),
        )}">${escapeHtml(
          link.label,
        )}</a></li>`,
    )
    .join("\n");
  return `<ul class="list-disc pl-6 space-y-2 ${className}">${items}</ul>`;
};

const renderLinks = (links: StaticLink[]) => {
  if (!links.length) return "";
  return `
  <section class="mt-10">
    <h2 class="text-2xl font-semibold text-foreground mb-4">Explore More</h2>
    ${renderLinkList(links)}
  </section>`;
};

const injectSeo = (template: string, title: string, description: string, routePath: string) => {
  const fullTitle = buildSeoTitle(title);
  const metaDescription = toMeta(description);
  const canonicalUrl =
    routePath === "/"
      ? "https://exquisitedentistryla.com/"
      : `https://exquisitedentistryla.com${routePath}/`;
  let html = template;

  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    html = html.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title data-rh="true">${escapeHtml(fullTitle)}</title>`,
    );
  } else {
    html = html.replace(
      /<\/head>/i,
      `  <title data-rh="true">${escapeHtml(fullTitle)}</title>\n  <meta name="description" content="${escapeHtml(metaDescription)}" data-rh="true" />\n  <link rel="canonical" href="${canonicalUrl}" data-rh="true" />\n</head>`,
    );
  }

  if (/<meta[^>]+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<meta[^>]+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${escapeHtml(metaDescription)}" data-rh="true" />`,
    );
  } else {
    html = html.replace(
      /<\/head>/i,
      `  <meta name="description" content="${escapeHtml(metaDescription)}" data-rh="true" />\n</head>`,
    );
  }

  if (/<link[^>]+rel=["']canonical["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<link[^>]+rel=["']canonical["'][^>]*>/i,
      `<link rel="canonical" href="${canonicalUrl}" data-rh="true" />`,
    );
  } else {
    html = html.replace(
      /<\/head>/i,
      `  <link rel="canonical" href="${canonicalUrl}" data-rh="true" />\n</head>`,
    );
  }

	  // Keep OG/Twitter in sync when present.
	  const updateMetaContent = (pattern: RegExp, content: string) => {
	    html = html.replace(pattern, (match) =>
	      match.replace(/content=("[^"]*"|'[^']*')/i, `content="${escapeHtml(content)}"`),
	    );
	  };

  updateMetaContent(/<meta[^>]+property=["']og:title["'][^>]*>/i, fullTitle);
  updateMetaContent(/<meta[^>]+property=["']og:description["'][^>]*>/i, metaDescription);
  updateMetaContent(/<meta[^>]+name=["']twitter:title["'][^>]*>/i, fullTitle);
  updateMetaContent(/<meta[^>]+name=["']twitter:description["'][^>]*>/i, metaDescription);

  // Update og:url if present.
  updateMetaContent(/<meta[^>]+property=["']og:url["'][^>]*>/i, canonicalUrl);

  return html;
};

const safeJsonLd = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

const buildTestimonialsSchema = () => {
  const toAbsoluteUrl = (url: string) =>
    url.startsWith("http") ? url : `https://exquisitedentistryla.com${url}`;

  const videoObjects = VIDEO_TESTIMONIALS.map((testimonial) => {
    const thumbnailUrl = toAbsoluteUrl(testimonial.thumbnailUrl);
    const base: Record<string, unknown> = {
      "@type": "VideoObject",
      name: testimonial.title,
      description: `${testimonial.title} patient testimonial at Exquisite Dentistry Los Angeles.`,
      thumbnailUrl,
      uploadDate: testimonial.uploadDate,
      duration: testimonial.duration,
      publisher: {
        "@id": "https://exquisitedentistryla.com/#business"
      },
      inLanguage: "en-US"
    };

    if (testimonial.type === "vimeo") {
      base.contentUrl = `https://vimeo.com/${testimonial.vimeoId}`;
      base.embedUrl = `https://player.vimeo.com/video/${testimonial.vimeoId}`;
    } else {
      base.contentUrl = testimonial.videoUrl;
      base.embedUrl = testimonial.videoUrl;
    }

    return base;
  });

  return {
    "@type": "ItemList",
    name: "Video Testimonials",
    description: "Collection of patient video testimonials for Exquisite Dentistry Los Angeles",
    numberOfItems: videoObjects.length,
    itemListElement: videoObjects.map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: video
    }))
  };
};

const getSchemasForRoute = (routePath: string) => {
  const schemas: Record<string, unknown>[] = [
    MASTER_BUSINESS_ENTITY,
    WEBSITE_ENTITY
  ];

  if (routePath === "/about") {
    schemas.push(MASTER_DOCTOR_ENTITY);
  }

  if (routePath === "/zoom-whitening") {
    const meta = getRouteMetadata("/zoom-whitening");
    schemas.push(MASTER_DOCTOR_ENTITY);
    schemas.push(
      createWebPageSchema({
        title: meta.title,
        description: meta.description,
        url: "/zoom-whitening",
        pageType: "WebPage"
      })
    );
    schemas.push(
      createBreadcrumbSchema([
        { name: "Services", url: "/services" },
        { name: "Teeth Whitening", url: "/teeth-whitening" },
        { name: "Zoom Whitening", url: "/zoom-whitening" }
      ])
    );
    schemas.push(
      createMedicalProcedureSchema({
        procedureName: "Zoom Teeth Whitening",
        description:
          "In-office Zoom teeth whitening in Los Angeles designed to lift surface stains and brighten natural teeth quickly, with comfort-first care and aftercare guidance.",
        url: "/zoom-whitening/",
        image: meta.ogImage,
        procedureType: "Cosmetic Dentistry",
        bodyLocation: "Teeth",
        preparation: [
          "Dental exam to confirm healthy enamel and gums",
          "Shade assessment and discussion of expectations"
        ],
        steps: [
          { name: "Preparation", description: "Protect gums and lips, then apply whitening gel in timed cycles." },
          { name: "Activation", description: "Use the Zoom light to activate the gel for consistent whitening." },
          { name: "Aftercare", description: "Review sensitivity management and provide touch-up guidance." }
        ],
        risks: ["Temporary tooth sensitivity", "Temporary gum irritation"],
        benefits: ["Noticeably brighter shade in one visit", "Improved stain reduction with professional supervision"],
        recoveryTime: "No downtime"
      })
    );
    schemas.push(
      createFAQSchema(
        ZOOM_WHITENING_FAQS.map(({ question, answer }) => ({ question, answer })),
        "Zoom Teeth Whitening in Los Angeles"
      )
    );
  }

  if (routePath === "/culver-city-teeth-whitening") {
    const meta = getRouteMetadata("/culver-city-teeth-whitening");
    schemas.push(MASTER_DOCTOR_ENTITY);
    schemas.push(
      createWebPageSchema({
        title: meta.title,
        description: meta.description,
        url: "/culver-city-teeth-whitening",
        pageType: "WebPage"
      })
    );
    schemas.push(
      createBreadcrumbSchema([
        { name: "Services", url: "/services" },
        { name: "Teeth Whitening", url: "/teeth-whitening" },
        { name: "Culver City Teeth Whitening", url: "/culver-city-teeth-whitening" }
      ])
    );
    schemas.push(
      createMedicalProcedureSchema({
        procedureName: "Professional Teeth Whitening",
        description:
          "Professional teeth whitening near Culver City with in-office whitening and custom take-home options planned for comfort and enamel health.",
        url: "/culver-city-teeth-whitening/",
        image: meta.ogImage,
        procedureType: "Cosmetic Dentistry",
        bodyLocation: "Teeth",
        preparation: [
          "Shade assessment and review of sensitivity history",
          "Confirm existing restorations and desired final shade"
        ],
        steps: [
          { name: "Consultation", description: "Review goals, sensitivity, and existing dental work." },
          { name: "Whitening", description: "Complete timed gel cycles with comfort-first adjustments." },
          { name: "Aftercare", description: "Share guidance to reduce sensitivity and help results last." }
        ],
        risks: ["Temporary tooth sensitivity", "Temporary gum irritation"],
        benefits: ["Noticeably brighter shade", "Personalized maintenance plan"],
        recoveryTime: "No downtime"
      })
    );
    schemas.push(
      createFAQSchema(
        [
          {
            question: "Do you offer teeth whitening for Culver City patients?",
            answer:
              "Yes. Many patients visit us from Culver City for in-office whitening and custom take-home whitening. Our studio is on Wilshire Blvd in Los Angeles, and we tailor each plan to sensitivity, restorations, and your timeline."
          },
          {
            question: "How long does in-office whitening take?",
            answer:
              "Most in-office whitening visits take about 60–90 minutes. We start with a shade assessment and comfort steps, then complete timed gel cycles with careful monitoring."
          },
          {
            question: "Will whitening work if I have veneers or crowns?",
            answer:
              "Whitening gels brighten natural enamel but do not change the shade of porcelain or composite restorations. If you have veneers, bonding, or crowns in the smile zone, we’ll plan your whitening and shade-matching so everything looks consistent."
          },
          {
            question: "How do you reduce sensitivity?",
            answer:
              "We use a comfort-first protocol: shorter gel cycles when needed, desensitizing options, and clear aftercare instructions. If you’re prone to sensitivity, we can recommend a gradual plan using custom take-home trays."
          }
        ],
        "Teeth Whitening Near Culver City"
      )
    );
  }

  if (routePath === "/smile-makeover-los-angeles") {
    const meta = getRouteMetadata("/smile-makeover-los-angeles");
    const config = servicePageConfigs["smile-makeover-los-angeles"];
    schemas.push(MASTER_DOCTOR_ENTITY);
    schemas.push(
      createWebPageSchema({
        title: meta.title,
        description: meta.description,
        url: "/smile-makeover-los-angeles",
        pageType: "WebPage"
      })
    );
    schemas.push(
      createBreadcrumbSchema([
        { name: "Services", url: "/services" },
        { name: "Cosmetic Dentistry", url: "/cosmetic-dentistry" },
        { name: "Smile Makeover", url: "/smile-makeover-los-angeles" }
      ])
    );
    schemas.push(
      createMedicalProcedureSchema({
        procedureName: "Smile Makeover",
        description:
          "Smile makeover planning in Los Angeles combining veneers, whitening, Invisalign, bonding, and restorative dentistry into one coordinated treatment plan tailored to your goals and timeline.",
        url: "/smile-makeover-los-angeles/",
        image: meta.ogImage,
        procedureType: "Cosmetic Dentistry",
        bodyLocation: "Teeth",
        preparation: [
          "Consultation to discuss goals, timeline, and sensitivity history",
          "Digital scans and smile analysis when needed"
        ],
        steps: (config?.treatmentSteps ?? []).map((step) => ({
          name: step.title,
          description: step.detail
        })),
        risks: ["Temporary tooth sensitivity (whitening)", "Temporary gum irritation"],
        benefits: [
          "Improved shade and symmetry",
          "A plan sequenced for predictable results",
          "Maintenance guidance to help results last"
        ],
        recoveryTime: "Varies by treatment plan"
      })
    );
    if (config?.faqs?.length) {
      schemas.push(
        createFAQSchema(
          config.faqs.map(({ question, answer }) => ({ question, answer })),
          "Smile Makeover in Los Angeles"
        )
      );
    }
  }

  if (routePath === "/invisalign-beverly-hills") {
    const meta = getRouteMetadata("/invisalign-beverly-hills");
    const config = servicePageConfigs["invisalign-beverly-hills"];
    schemas.push(MASTER_DOCTOR_ENTITY);
    schemas.push(
      createWebPageSchema({
        title: meta.title,
        description: meta.description,
        url: "/invisalign-beverly-hills",
        pageType: "WebPage"
      })
    );
    schemas.push(
      createBreadcrumbSchema([
        { name: "Services", url: "/services" },
        { name: "Invisalign", url: "/invisalign" },
        { name: "Invisalign Near Beverly Hills", url: "/invisalign-beverly-hills" }
      ])
    );
    schemas.push(
      createMedicalProcedureSchema({
        procedureName: "Invisalign Clear Aligners",
        description:
          "Invisalign near Beverly Hills with clear aligners planned using digital scans, staged tooth movement, and concierge-style check-ins for busy schedules.",
        url: "/invisalign-beverly-hills/",
        image: meta.ogImage,
        procedureType: "Orthodontic Procedure",
        bodyLocation: "Teeth",
        preparation: [
          "Consultation to review goals, bite function, and candidacy",
          "Digital iTero scan for precise aligner planning"
        ],
        steps: (config?.treatmentSteps ?? []).map((step) => ({
          name: step.title,
          description: step.detail
        })),
        risks: ["Temporary tooth sensitivity", "Temporary gum irritation"],
        benefits: [
          "Discreet alignment with removable aligners",
          "Predictable planning with digital scans",
          "Finishing options like whitening or bonding when indicated"
        ],
        recoveryTime: "No downtime"
      })
    );
    if (config?.faqs?.length) {
      schemas.push(
        createFAQSchema(
          config.faqs.map(({ question, answer }) => ({ question, answer })),
          "Invisalign Near Beverly Hills"
        )
      );
    }
  }

  if (routePath === "/teeth-whitening-beverly-hills") {
    const meta = getRouteMetadata("/teeth-whitening-beverly-hills");
    const config = servicePageConfigs["teeth-whitening-beverly-hills"];
    schemas.push(MASTER_DOCTOR_ENTITY);
    schemas.push(
      createWebPageSchema({
        title: meta.title,
        description: meta.description,
        url: "/teeth-whitening-beverly-hills",
        pageType: "WebPage"
      })
    );
    schemas.push(
      createBreadcrumbSchema([
        { name: "Services", url: "/services" },
        { name: "Teeth Whitening", url: "/teeth-whitening" },
        { name: "Teeth Whitening Near Beverly Hills", url: "/teeth-whitening-beverly-hills" }
      ])
    );
    schemas.push(
      createMedicalProcedureSchema({
        procedureName: "Professional Teeth Whitening",
        description:
          "Teeth whitening near Beverly Hills with in-office whitening and custom take-home trays, planned for comfort, sensitivity management, and realistic shade matching for existing dental work.",
        url: "/teeth-whitening-beverly-hills/",
        image: meta.ogImage,
        procedureType: "Cosmetic Dentistry",
        bodyLocation: "Teeth",
        preparation: [
          "Shade assessment and review of sensitivity history",
          "Confirm existing restorations and desired target shade"
        ],
        steps: (config?.treatmentSteps ?? []).map((step) => ({
          name: step.title,
          description: step.detail
        })),
        risks: ["Temporary tooth sensitivity", "Temporary gum irritation"],
        benefits: [
          "Noticeably brighter shade with professional supervision",
          "Options that fit your timeline and comfort level",
          "Aftercare guidance to help results last"
        ],
        recoveryTime: "No downtime"
      })
    );
    if (config?.faqs?.length) {
      schemas.push(
        createFAQSchema(
          config.faqs.map(({ question, answer }) => ({ question, answer })),
          "Teeth Whitening Near Beverly Hills"
        )
      );
    }
  }

  if (routePath === "/dental-implants") {
    const meta = getRouteMetadata("/dental-implants");
    schemas.push(MASTER_DOCTOR_ENTITY);
    schemas.push(
      createWebPageSchema({
        title: meta.title,
        description: meta.description,
        url: "/dental-implants",
        pageType: "WebPage"
      })
    );
    schemas.push(
      createBreadcrumbSchema([
        { name: "Services", url: "/services" },
        { name: "Dental Implants", url: "/dental-implants" }
      ])
    );
    schemas.push(
      createMedicalProcedureSchema({
        procedureName: "Dental Implant Therapy",
        description: meta.description,
        url: "/dental-implants/",
        image: meta.ogImage,
        procedureType: "Restorative Dentistry",
        bodyLocation: "Teeth",
        preparation: [
          "Comprehensive exam and CBCT imaging to evaluate bone and gums",
          "Restoration-first planning to define final tooth shape and bite"
        ],
        steps: [
          { name: "Consultation + 3D Imaging", description: "Review goals, medical history, and scans to confirm candidacy and plan the final restoration." },
          { name: "Foundation Planning", description: "Discuss extractions or grafting if needed and map the timeline for placement and healing." },
          { name: "Placement + Healing", description: "Complete surgical placement (often with a specialist when indicated), then allow time for integration." },
          { name: "Final Restoration", description: "Deliver a custom implant crown or bridge and refine bite for comfort and stability." }
        ],
        risks: ["Temporary soreness", "Swelling", "Infection risk (rare with proper care)"],
        benefits: [
          "Stable tooth replacement that feels natural",
          "Preserve bone and support facial structure",
          "Custom restoration designed for bite and esthetics"
        ],
        recoveryTime: "Minimal downtime"
      })
    );
    schemas.push(
      createFAQSchema(
        DENTAL_IMPLANT_FAQS.map(({ question, answer }) => ({ question, answer })),
        "Dental Implants in Los Angeles"
      )
    );
  }

  if (routePath === "/santa-monica-dental-implants") {
    const meta = getRouteMetadata("/santa-monica-dental-implants");
    const config = servicePageConfigs["santa-monica-dental-implants"];
    schemas.push(MASTER_DOCTOR_ENTITY);
    schemas.push(
      createWebPageSchema({
        title: meta.title,
        description: meta.description,
        url: "/santa-monica-dental-implants",
        pageType: "WebPage"
      })
    );
    schemas.push(
      createBreadcrumbSchema([
        { name: "Services", url: "/services" },
        { name: "Dental Implants", url: "/dental-implants" },
        { name: "Dental Implants Near Santa Monica", url: "/santa-monica-dental-implants" }
      ])
    );
    schemas.push(
      createMedicalProcedureSchema({
        procedureName: "Dental Implant Therapy",
        description:
          "Dental implants near Santa Monica with 3D imaging, guided placement, and custom implant crowns or bridges, planned for comfort and long-term function.",
        url: "/santa-monica-dental-implants/",
        image: meta.ogImage,
        procedureType: "Restorative Dentistry",
        bodyLocation: "Teeth",
        preparation: [
          "Comprehensive exam and CBCT imaging to evaluate bone and gums",
          "Restoration-first planning to define final tooth shape and bite"
        ],
        steps: (config?.treatmentSteps ?? []).map((step) => ({
          name: step.title,
          description: step.detail
        })),
        risks: ["Temporary soreness", "Swelling", "Infection risk (rare with proper care)"],
        benefits: [
          "Stable tooth replacement that feels natural",
          "Preserve bone and support facial structure",
          "Custom restoration designed for bite and esthetics"
        ],
        recoveryTime: "Minimal downtime"
      })
    );
    if (config?.faqs?.length) {
      schemas.push(
        createFAQSchema(
          config.faqs.map(({ question, answer }) => ({ question, answer })),
          "Dental Implants Near Santa Monica"
        )
      );
    }
  }

  if (routePath === "/faqs") {
    schemas.push(
      createFAQSchema(
        faqs.map(({ question, answer }) => ({ question, answer })),
        "Exquisite Dentistry Services and Appointments"
      )
    );
  }

  if (routePath === "/testimonials") {
    schemas.push(buildTestimonialsSchema());
  }

  return schemas;
};

const injectJsonLd = (template: string, schemas: Record<string, unknown>[]) => {
  if (!schemas.length) return template;
  const graph = {
    "@context": SCHEMA_ORG_CONTEXT,
    "@graph": schemas
  };
  const jsonLd = safeJsonLd(graph);
  return template.replace(
    /<\/head>/i,
    `  <script type="application/ld+json">${jsonLd}</script>\n</head>`
  );
};

const injectRoot = (template: string, contentHtml: string) => {
  const rootRegex = /<div id=["']root["'][^>]*>[\s\S]*?<\/div>/i;
  if (!rootRegex.test(template)) {
    throw new Error("Could not locate #root element in template.");
  }
  return template.replace(rootRegex, `<div id="root">${contentHtml}</div>`);
};

const routeToOutputPath = (routePath: string) => {
  const normalized = routePath === "/" ? "" : routePath.replace(/^\/|\/$/g, "");
  return normalized
    ? path.join(DIST_DIR, normalized, "index.html")
    : path.join(DIST_DIR, "index.html");
};

const extractBlogParagraphs = (content: string, excerpt: string) => {
  if (content && content.includes("<p")) {
    const matches = content.match(/<p\b[^>]*>[\s\S]*?<\/p>/gi) || [];
    const paragraphs = matches
      .map((p) => stripHtml(p))
      .filter(Boolean)
      .slice(0, 2);
    if (paragraphs.length) return paragraphs;
  }
  return [excerpt];
};

const buildRoutes = (): StaticRoute[] => {
  const routes: StaticRoute[] = [...manualPages];

  Object.values(servicePageConfigs).forEach((config) => {
    routes.push({
      path: `/${config.slug}`,
      title: config.seo.title,
      description: config.seo.description,
      h1: config.hero.heading,
      paragraphs: config.overview.intro.slice(0, 2),
      links: uniqueLinks([...config.internalLinks, ...defaultNavLinks]),
    });
  });

  Object.values(locationPageConfigs).forEach((config) => {
    routes.push({
      path: `/${config.slug}`,
      title: config.seo.title,
      description: config.seo.description,
      h1: config.hero.heading,
      paragraphs: [config.hero.subheading],
      links: uniqueLinks([...config.relatedServices, ...defaultNavLinks]),
    });
  });

  const blogPosts = getPublishedPosts();
  blogPosts.forEach((post) => {
    routes.push({
      path: `/blog/${post.slug}`,
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      h1: post.title,
      paragraphs: extractBlogParagraphs(post.content || "", post.excerpt),
      links: uniqueLinks([{ label: "Back to Blog", href: "/blog" }, ...defaultNavLinks]),
    });
  });

  transformationStories.forEach((story) => {
    routes.push({
      path: `/transformation-stories/${story.slug}`,
      title: story.seo.title,
      description: story.seo.description,
      h1: story.title,
      paragraphs: [story.shortDescription],
      links: uniqueLinks([
        { label: "Back to Transformation Stories", href: "/transformation-stories" },
        ...defaultNavLinks
      ])
    });
  });

  const byPath = new Map<string, StaticRoute>();
  routes.forEach((route) => {
    const normalizedPath = route.path.startsWith("/") ? route.path : `/${route.path}`;
    if (!byPath.has(normalizedPath)) {
      byPath.set(normalizedPath, { ...route, path: normalizedPath });
    }
  });
  return Array.from(byPath.values());
};

const renderRoute = (template: string, route: StaticRoute) => {
  const paragraphsHtml = route.paragraphs
    .filter(Boolean)
    .map(
      (paragraph) =>
        `<p class="text-lg leading-relaxed text-muted-foreground mb-4">${escapeHtml(
          paragraph,
        )}</p>`,
    )
    .join("\n");

  const sectionsHtml = (route.sections ?? [])
    .map((section) => {
      const sectionParagraphs = (section.paragraphs ?? [])
        .filter(Boolean)
        .map(
          (paragraph) =>
            `<p class="text-lg leading-relaxed text-muted-foreground mb-4">${escapeHtml(
              paragraph,
            )}</p>`,
        )
        .join("\n");

      const bullets = (section.bullets ?? []).filter(Boolean);
      const bulletsHtml =
        bullets.length > 0
          ? `<ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-4">${bullets
              .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
              .join("\n")}</ul>`
          : "";

      const links = uniqueLinks(section.links ?? []);
      const linksHtml =
        links.length > 0
          ? `<div class="mt-4">${renderLinkList(links, "text-muted-foreground")}</div>`
          : "";

      const sectionIdAttr = section.id ? ` id="${escapeHtml(section.id)}"` : "";

      return `
      <section class="mt-10"${sectionIdAttr}>
        <h2 class="text-2xl font-semibold text-foreground mb-4">${escapeHtml(section.heading)}</h2>
        ${sectionParagraphs}
        ${bulletsHtml}
        ${linksHtml}
      </section>`;
    })
    .join("\n");

  const hasLocationSection = (route.sections ?? []).some(
    (section) => section.id === "location",
  );
  const visitUsBullets = [
    `Address: ${ADDRESS}`,
    `Phone: ${PHONE_NUMBER_DISPLAY}`,
    ...BUSINESS_HOURS.map(({ label, value }) => `${label}: ${value}`)
  ];
  const visitUsHtml = hasLocationSection
    ? ""
    : `
      <section class="mt-10" id="visit-us">
        <h2 class="text-2xl font-semibold text-foreground mb-4">Visit Exquisite Dentistry</h2>
        <p class="text-lg leading-relaxed text-muted-foreground mb-4">
          Our Los Angeles dental studio is on Wilshire Blvd. Find directions, hours, and contact details below.
        </p>
        <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-4">${visitUsBullets
          .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
          .join("\n")}</ul>
        <div class="mt-4">${renderLinkList(
          [
            { label: "Get Directions (Google Maps)", href: GOOGLE_MAPS_SHORT_URL },
            { label: `Call ${PHONE_NUMBER_DISPLAY}`, href: `tel:${PHONE_NUMBER_E164}` },
            { label: "Contact", href: "/contact" }
          ],
          "text-muted-foreground",
        )}</div>
      </section>`;

  const contentHtml = `
	  <div class="min-h-screen bg-background">
	    <main class="container mx-auto px-4 py-16">
	      <h1 class="text-4xl font-semibold tracking-tight text-foreground mb-6">${escapeHtml(
	        route.h1,
	      )}</h1>
	      ${paragraphsHtml}
	      ${sectionsHtml}
	      ${visitUsHtml}
	      ${renderLinks(route.links)}
	    </main>
	  </div>`;

  const schemas = getSchemasForRoute(route.path);
  let html = injectSeo(template, route.title, route.description, route.path);
  html = injectJsonLd(html, schemas);
  html = injectRoot(html, contentHtml);
  return html;
};

const main = async () => {
  const template = await readFile(TEMPLATE_PATH, "utf8");
  const routes = buildRoutes();

  for (const route of routes) {
    const outputPath = routeToOutputPath(route.path);
    await mkdir(path.dirname(outputPath), { recursive: true });
    const html = renderRoute(template, route);
    await writeFile(outputPath, html, "utf8");
  }

  console.log(`✅  Pre-rendered ${routes.length} static routes into /dist.`);
};

main().catch((error) => {
  console.error("Static prerender failed:\n", error);
  process.exitCode = 1;
});
