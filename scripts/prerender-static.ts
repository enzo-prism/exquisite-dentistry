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
  CULVER_CITY_TEETH_WHITENING_HUB_SECTIONS,
  CULVER_CITY_TEETH_WHITENING_INTRO_PARAGRAPHS,
  CULVER_CITY_TEETH_WHITENING_SUPPORTING_LINKS
} from "../src/data/culver-city-teeth-whitening-hub";
import {
  ZOOM_WHITENING_HUB_INTRO_PARAGRAPHS,
  ZOOM_WHITENING_HUB_SECTIONS,
  ZOOM_WHITENING_REFERENCES,
  ZOOM_WHITENING_SUPPORTING_LINKS
} from "../src/data/zoom-whitening-hub";
import {
  SMILE_MAKEOVER_HUB_INTRO_PARAGRAPHS,
  SMILE_MAKEOVER_HUB_SECTIONS,
  SMILE_MAKEOVER_HUB_SUPPORTING_LINKS,
  SMILE_MAKEOVER_REFERENCES
} from "../src/data/smile-makeover-hub";
import {
  INVISALIGN_BEVERLY_HILLS_HUB_INTRO_PARAGRAPHS,
  INVISALIGN_BEVERLY_HILLS_HUB_SECTIONS,
  INVISALIGN_BEVERLY_HILLS_REFERENCES,
  INVISALIGN_BEVERLY_HILLS_SUPPORTING_LINKS
} from "../src/data/invisalign-beverly-hills-hub";
import {
  ADDRESS,
  BUSINESS_HOURS,
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_E164
} from "../src/constants/contact";
import { GOOGLE_MAPS_SHORT_URL, SCHEDULING_URL } from "../src/constants/urls";
import { faqs } from "../src/data/faqs";
import { VIDEO_TESTIMONIALS } from "../src/components/video-hero/video-constants";
import { ZOOM_WHITENING_FAQS } from "../src/data/zoomWhitening";
import { DENTAL_IMPLANT_FAQS } from "../src/data/dental-implants-faqs";
import { CULVER_CITY_TEETH_WHITENING_FAQS } from "../src/data/culver-city-teeth-whitening-faqs";
import { SMILE_MAKEOVER_LOS_ANGELES_FAQS } from "../src/data/smile-makeover-los-angeles-faqs";
import { INVISALIGN_BEVERLY_HILLS_FAQS } from "../src/data/invisalign-beverly-hills-faqs";

export type StaticLink = { label: string; href: string };
export type StaticRouteSection = {
  id?: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: StaticLink[];
};
export type StaticRoute = {
  path: string;
  title: string;
  description: string;
  h1: string;
  paragraphs: string[];
  sections?: StaticRouteSection[];
  faqItems?: Array<{ question: string; answer: string }>;
  links: StaticLink[];
};

const DIST_DIR = path.resolve("dist");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");
const SCHEMA_ORG_CONTEXT = "https://schema.org";

export const defaultNavLinks: StaticLink[] = [
  { label: "Dental Implants", href: "/dental-implants" },
  { label: "Porcelain Veneers", href: "/veneers" },
  { label: "Beverly Hills Dentist", href: "/beverly-hills-dentist" },
  { label: "Smile Gallery", href: "/smile-gallery" },
  { label: "Schedule Consultation", href: "/schedule-consultation" },
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations/" },
  { label: "About Dr. Aguil", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export const manualPages: StaticRoute[] = [
  {
    path: "/",
    title: getRouteMetadata("/").title,
    description: getRouteMetadata("/").description,
    h1: "Los Angeles' Premier Cosmetic Dentist",
    paragraphs: [
      "Transform your smile at Los Angeles' most trusted cosmetic dentistry practice near Beverly Hills. Celebrity clientele, spa-like environment, and Hollywood-quality results with Dr. Alexie Aguil.",
    ],
    sections: [
      {
        id: "most-requested",
        heading: "Most Requested",
        paragraphs: [
          "Start with our most requested pages for porcelain veneers, dental implants, Beverly Hills care, and booking.",
        ],
        links: [
          { label: "Dental Implants", href: "/dental-implants" },
          { label: "Porcelain Veneers", href: "/veneers" },
          { label: "Beverly Hills Dentist", href: "/beverly-hills-dentist" },
          { label: "Smile Gallery", href: "/smile-gallery" },
          { label: "Schedule Consultation", href: "/schedule-consultation" },
        ],
      },
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
    path: "/locations",
    title: getRouteMetadata("/locations").title,
    description: getRouteMetadata("/locations").description,
    h1: "Locations",
    paragraphs: [
      "Our Wilshire Blvd Los Angeles studio is a quick drive from Beverly Hills and nearby neighborhoods. Explore location pages below to find concierge dental care and popular services by area.",
    ],
    sections: [
      {
        heading: "Service Areas",
        links: [
          { label: "Beverly Hills Dentist", href: "/beverly-hills-dentist" },
          { label: "West Hollywood Dentist", href: "/west-hollywood-dentist" },
          { label: "Culver City Dentist", href: "/culver-city-dentist" },
          { label: "West LA Dentist", href: "/west-la-dentist" },
          { label: "Bel Air Dentist", href: "/bel-air-dentist" },
          { label: "90048 Dentist", href: "/90048-dentist" },
          { label: "Melrose Dentist", href: "/melrose-dentist" },
          { label: "Westwood Dentist", href: "/westwood-dentist" }
        ]
      }
    ],
    links: defaultNavLinks,
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
    h1: "Culver City Teeth Whitening",
    paragraphs: [...CULVER_CITY_TEETH_WHITENING_INTRO_PARAGRAPHS],
    sections: CULVER_CITY_TEETH_WHITENING_HUB_SECTIONS,
    faqItems: CULVER_CITY_TEETH_WHITENING_FAQS.map(({ question, answer }) => ({ question, answer })),
    links: [...CULVER_CITY_TEETH_WHITENING_SUPPORTING_LINKS, ...defaultNavLinks],
  },
  {
    path: "/zoom-whitening",
    title: getRouteMetadata("/zoom-whitening").title,
    description: getRouteMetadata("/zoom-whitening").description,
    h1: "Zoom Whitening in Los Angeles",
    paragraphs: [...ZOOM_WHITENING_HUB_INTRO_PARAGRAPHS],
    sections: [
      ...ZOOM_WHITENING_HUB_SECTIONS,
      {
        id: "references",
        heading: "References",
        links: [...ZOOM_WHITENING_REFERENCES]
      }
    ],
    faqItems: ZOOM_WHITENING_FAQS.map(({ question, answer }) => ({ question, answer })),
    links: [...ZOOM_WHITENING_SUPPORTING_LINKS, ...defaultNavLinks],
  },
  {
    path: "/dental-implants",
    title: getRouteMetadata("/dental-implants").title,
    description: getRouteMetadata("/dental-implants").description,
    h1: "Dental Implants in Los Angeles",
    paragraphs: [...DENTAL_IMPLANTS_HUB_INTRO_PARAGRAPHS],
    sections: DENTAL_IMPLANTS_HUB_SECTIONS,
    faqItems: DENTAL_IMPLANT_FAQS.map(({ question, answer }) => ({ question, answer })),
    links: [
      ...DENTAL_IMPLANTS_HUB_SUPPORTING_LINKS,
      ...defaultNavLinks,
    ],
  },
  {
    path: "/smile-makeover-los-angeles",
    title: getRouteMetadata("/smile-makeover-los-angeles").title,
    description: getRouteMetadata("/smile-makeover-los-angeles").description,
    h1: "Smile Makeover Los Angeles",
    paragraphs: [...SMILE_MAKEOVER_HUB_INTRO_PARAGRAPHS],
    sections: [
      {
        id: "on-this-page",
        heading: "On this page",
        links: [
          { label: "Options", href: "#options" },
          { label: "Planning process", href: "#process" },
          { label: "Timeline", href: "#timeline" },
          { label: "Cost factors", href: "#cost" },
          { label: "Natural results", href: "#natural-results" },
          { label: "Maintenance", href: "#maintenance" },
          { label: "Location & hours", href: "#location" },
          { label: "FAQs", href: "#faqs" },
          { label: "References", href: "#references" }
        ]
      },
      ...SMILE_MAKEOVER_HUB_SECTIONS,
      {
        id: "references",
        heading: "References",
        links: [...SMILE_MAKEOVER_REFERENCES]
      }
    ],
    faqItems: SMILE_MAKEOVER_LOS_ANGELES_FAQS.map(({ question, answer }) => ({ question, answer })),
    links: [...SMILE_MAKEOVER_HUB_SUPPORTING_LINKS, ...defaultNavLinks],
  },
  {
    path: "/invisalign-beverly-hills",
    title: getRouteMetadata("/invisalign-beverly-hills").title,
    description: getRouteMetadata("/invisalign-beverly-hills").description,
    h1: "Invisalign Beverly Hills",
    paragraphs: [...INVISALIGN_BEVERLY_HILLS_HUB_INTRO_PARAGRAPHS],
    sections: [
      {
        id: "on-this-page",
        heading: "On this page",
        links: [
          { label: "Benefits", href: "#benefits" },
          { label: "Candidacy", href: "#candidacy" },
          { label: "Process", href: "#process" },
          { label: "Attachments & refinements", href: "#attachments" },
          { label: "Appointments", href: "#visits" },
          { label: "Timeline", href: "#timeline" },
          { label: "Cost factors", href: "#cost" },
          { label: "After Invisalign", href: "#finishing" },
          { label: "Location & hours", href: "#location" },
          { label: "FAQs", href: "#faqs" },
          { label: "References", href: "#references" }
        ]
      },
      ...INVISALIGN_BEVERLY_HILLS_HUB_SECTIONS,
      {
        id: "references",
        heading: "References",
        links: [...INVISALIGN_BEVERLY_HILLS_REFERENCES]
      }
    ],
    faqItems: INVISALIGN_BEVERLY_HILLS_FAQS.map(({ question, answer }) => ({ question, answer })),
    links: [...INVISALIGN_BEVERLY_HILLS_SUPPORTING_LINKS, ...defaultNavLinks],
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
    path: "/schedule-consultation",
    title: getRouteMetadata("/schedule-consultation").title,
    description: getRouteMetadata("/schedule-consultation").description,
    h1: "Schedule Consultation",
    paragraphs: [
      "Planning porcelain veneers or dental implants near Beverly Hills? Use this page to book time with our team at Exquisite Dentistry on Wilshire Blvd in Los Angeles.",
    ],
    sections: [
      {
        id: "book-online",
        heading: "Book Online",
        paragraphs: [
          "Use our online scheduler to request a consultation. Prefer to speak with someone first? Call our office and we’ll help you find a time that fits your schedule.",
        ],
        links: [
          { label: "Book Online", href: SCHEDULING_URL },
          { label: `Call ${PHONE_NUMBER_DISPLAY}`, href: `tel:${PHONE_NUMBER_E164}` },
        ],
      },
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
    h1: "Client Transformation Stories",
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

const getBreadcrumbLinksForRoute = (routePath: string): StaticLink[] => {
  switch (routePath) {
    case "/dental-implants":
      return [
        { label: "Services", href: "/services" },
        { label: "Dental Implants", href: "/dental-implants" }
      ];
    case "/veneers":
      return [
        { label: "Services", href: "/services" },
        { label: "Porcelain Veneers", href: "/veneers" }
      ];
    case "/beverly-hills-dentist":
      return [
        { label: "Locations", href: "/locations" },
        { label: "Beverly Hills Dentist", href: "/beverly-hills-dentist" }
      ];
    case "/locations":
      return [{ label: "Locations", href: "/locations" }];
    case "/schedule-consultation":
      return [{ label: "Schedule Consultation", href: "/schedule-consultation" }];
    case "/smile-gallery":
      return [{ label: "Smile Gallery", href: "/smile-gallery" }];
    default:
      return [];
  }
};

const renderBreadcrumbs = (routePath: string) => {
  const trail = getBreadcrumbLinksForRoute(routePath);
  if (!trail.length) return "";

  const all = [{ label: "Home", href: "/" }, ...trail];
  const itemsHtml = all
    .map((item, index) => {
      const isLast = index === all.length - 1;
      const label = escapeHtml(item.label);
      const href = escapeHtml(normalizeInternalHref(item.href));

      if (index === 0) {
        return `<li><a class="hover:text-foreground" href="${href}">${label}</a></li>`;
      }

      if (isLast) {
        return `<li class="flex items-center gap-2"><span aria-hidden="true" class="text-muted-foreground/60">/</span><span aria-current="page" class="text-foreground">${label}</span></li>`;
      }
      return `<li class="flex items-center gap-2"><span aria-hidden="true" class="text-muted-foreground/60">/</span><a class="hover:text-foreground" href="${href}">${label}</a></li>`;
    })
    .join("\n");

  return `
      <nav aria-label="Breadcrumb" class="mb-6">
        <ol class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          ${itemsHtml}
        </ol>
      </nav>`;
};

const renderFaqSection = (faqItems: Array<{ question: string; answer: string }>) => {
  const itemsHtml = faqItems
    .filter((item) => item.question && item.answer)
    .map(
      (item) => `
      <details class="rounded-2xl border border-border bg-muted/30 px-6 py-4">
        <summary class="cursor-pointer text-lg font-semibold text-foreground">${escapeHtml(
          item.question,
        )}</summary>
        <p class="mt-3 text-lg leading-relaxed text-muted-foreground">${escapeHtml(item.answer)}</p>
      </details>`,
    )
    .join("\n");

  if (!itemsHtml) return "";

  return `
  <section class="mt-10" id="faqs">
    <h2 class="text-2xl font-semibold text-foreground mb-4">FAQs</h2>
    <div class="space-y-4">${itemsHtml}</div>
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

  if (routePath === "/locations") {
    const meta = getRouteMetadata("/locations");
    schemas.push(
      createWebPageSchema({
        title: meta.title,
        description: meta.description,
        url: "/locations",
        pageType: "WebPage"
      })
    );
    schemas.push(createBreadcrumbSchema([{ name: "Locations", url: "/locations" }]));
  }

  if (routePath === "/schedule-consultation") {
    const meta = getRouteMetadata("/schedule-consultation");
    schemas.push(
      createWebPageSchema({
        title: meta.title,
        description: meta.description,
        url: "/schedule-consultation",
        pageType: "WebPage"
      })
    );
    schemas.push(
      createBreadcrumbSchema([
        { name: "Schedule Consultation", url: "/schedule-consultation" }
      ])
    );
  }

  if (routePath === "/veneers") {
    const meta = getRouteMetadata("/veneers");
    schemas.push(MASTER_DOCTOR_ENTITY);
    schemas.push(
      createWebPageSchema({
        title: meta.title,
        description: meta.description,
        url: "/veneers",
        pageType: "WebPage"
      })
    );
    schemas.push(
      createBreadcrumbSchema([
        { name: "Services", url: "/services" },
        { name: "Porcelain Veneers", url: "/veneers" }
      ])
    );
  }

  if (routePath === "/smile-gallery") {
    const meta = getRouteMetadata("/smile-gallery");
    schemas.push(
      createWebPageSchema({
        title: meta.title,
        description: meta.description,
        url: "/smile-gallery",
        pageType: "WebPage"
      })
    );
    schemas.push(
      createBreadcrumbSchema([{ name: "Smile Gallery", url: "/smile-gallery" }])
    );
  }

  if (routePath === "/beverly-hills-dentist") {
    const config = locationPageConfigs["beverly-hills-dentist"];
    schemas.push(
      createWebPageSchema({
        title: config.seo.title,
        description: config.seo.description,
        url: "/beverly-hills-dentist",
        pageType: "WebPage"
      })
    );
    schemas.push(
      createBreadcrumbSchema([
        { name: "Locations", url: "/locations" },
        { name: "Beverly Hills Dentist", url: "/beverly-hills-dentist" }
      ])
    );
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
        procedureName: "Zoom Whitening",
        description: meta.description,
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
        "Zoom Whitening in Los Angeles"
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
        description: meta.description,
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
        CULVER_CITY_TEETH_WHITENING_FAQS.map(({ question, answer }) => ({
          question,
          answer
        })),
        "Culver City Teeth Whitening"
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
        description: meta.description,
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
          "Smile Makeover Los Angeles"
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
        { name: "Invisalign Beverly Hills", url: "/invisalign-beverly-hills" }
      ])
    );
    schemas.push(
      createMedicalProcedureSchema({
        procedureName: "Invisalign Clear Aligners",
        description: meta.description,
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
          "Invisalign Beverly Hills"
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

export const buildRoutes = (): StaticRoute[] => {
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

  const faqHtml =
    route.faqItems?.length && route.faqItems.some((item) => item.question && item.answer)
      ? renderFaqSection(route.faqItems)
      : "";

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
		      ${renderBreadcrumbs(route.path)}
		      <h1 class="text-4xl font-semibold tracking-tight text-foreground mb-6">${escapeHtml(
		        route.h1,
		      )}</h1>
		      ${paragraphsHtml}
		      ${sectionsHtml}
		      ${faqHtml}
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

if (process.argv[1] === new URL(import.meta.url).pathname) {
  main().catch((error) => {
    console.error("Static prerender failed:\n", error);
    process.exitCode = 1;
  });
}
