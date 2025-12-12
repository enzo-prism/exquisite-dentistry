import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { servicePageConfigs } from "../src/data/servicePages";
import { locationPageConfigs } from "../src/data/locationPages";
import { getPublishedPosts } from "../src/data/blogPosts";

type StaticLink = { label: string; href: string };
type StaticRoute = {
  path: string;
  title: string;
  description: string;
  h1: string;
  paragraphs: string[];
  links: StaticLink[];
};

const DIST_DIR = path.resolve("dist");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");

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
    title: "Los Angeles Premier Cosmetic Dentist | Dr. Aguil",
    description:
      "Transform your smile with Los Angeles' most trusted cosmetic dentist. Dr. Aguil delivers Hollywood-quality results in a spa-like setting. Book today!",
    h1: "Los Angeles' Premier Cosmetic Dentist",
    paragraphs: [
      "Transform your smile at Los Angeles' most trusted cosmetic dentistry practice near Beverly Hills. Celebrity clientele, spa-like environment, and Hollywood-quality results with Dr. Alexie Aguil.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/about",
    title: "Dr. Alexie Aguil | Award-Winning LA Cosmetic Dentist",
    description:
      "Meet Dr. Alexie Aguil, Los Angeles' award-winning cosmetic dentist with 15+ years creating celebrity smiles. Artistic vision meets gentle care.",
    h1: "Meet Dr. Alexie Aguil",
    paragraphs: [
      "Discover the artistic vision, advanced training, and personalized philosophy that has made Dr. Aguil Beverly Hills' most sought-after cosmetic dentist for over 15 years.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/services",
    title: "Cosmetic Dentistry LA | Veneers, Whitening, Implants",
    description:
      "Complete cosmetic dentistry in LA: porcelain veneers, Zoom whitening, Invisalign & implants. Advanced techniques, natural results. Call today!",
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
    title: "Porcelain Veneers Los Angeles | Custom Smile Design",
    description:
      "Custom porcelain veneers in Los Angeles. Transform 1-8 teeth with ultra-thin shells. Natural results, minimal prep. Free consultation available.",
    h1: "Custom Porcelain Veneers",
    paragraphs: [
      "Experience the ultimate smile transformation with our ultra-thin, custom-crafted porcelain veneers. Achieve the perfect balance of beauty, strength, and natural appearance that has made Los Angeles smiles world-famous.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/invisalign",
    title: "Invisalign Los Angeles | Clear Aligner Dentist",
    description:
      "Invisalign in Los Angeles guided by Dr. Alexie Aguil delivers discreet aligner treatment, digital planning, and concierge check-ins for busy professionals.",
    h1: "Invisalign® Clear Aligners",
    paragraphs: [
      "Discreet, digitally guided smile alignment tailored to Los Angeles lifestyles.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/teeth-whitening",
    title: "Teeth Whitening Los Angeles | Professional Smile Brightening",
    description:
      "Professional teeth whitening in Los Angeles with Zoom power whitening, custom take-home kits, and concierge maintenance plans for lasting radiance.",
    h1: "Teeth Whitening Los Angeles",
    paragraphs: [
      "Three luminous whitening paths designed for fast-paced LA lives.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/zoom-whitening",
    title: "Zoom Whitening LA | Professional Teeth Whitening",
    description:
      "Professional Zoom whitening in LA brightens teeth 8+ shades in one visit. Safe, effective, immediate results. Special offers available now!",
    h1: "Zoom Teeth Whitening",
    paragraphs: [
      "Achieve dramatically whiter teeth in just one visit with professional Zoom whitening technology.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/dental-implants",
    title: "Dental Implants Los Angeles | Permanent Tooth Replacement",
    description:
      "Dental implants in Los Angeles with guided surgery, bone regeneration, and custom restorations that restore chewing power and confident smiles.",
    h1: "Dental Implants Los Angeles",
    paragraphs: [
      "Rebuild your smile with precision-engineered implants and luxury-level care.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/cosmetic-dentistry",
    title: "Cosmetic Dentistry Los Angeles | Luxury Smile Makeovers",
    description:
      "Cosmetic dentistry in Los Angeles with bespoke veneers, Invisalign, whitening, and bonding to create camera-ready smiles that fit your lifestyle.",
    h1: "Cosmetic Dentistry Los Angeles",
    paragraphs: [
      "Curated smile transformations for tastemakers, entrepreneurs, and artists.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/emergency-dentist",
    title: "Emergency Dentist Los Angeles | Same-Day Dental Care",
    description:
      "Emergency dentist in Los Angeles providing same-day appointments, after-hours guidance, and concierge treatment for urgent dental needs.",
    h1: "Emergency Dentist Los Angeles",
    paragraphs: [
      "Immediate, compassionate care when dental emergencies disrupt your day.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/contact",
    title: "Schedule Appointment | Exquisite Dentistry LA",
    description:
      "Schedule your consultation with Dr. Aguil in Los Angeles. Convenient Wilshire Blvd location, flexible hours. Call (323) 272-2388 or book online!",
    h1: "Contact Us",
    paragraphs: [
      "We're here to answer your questions and help you schedule your appointment with Dr. Alexie Aguil.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/testimonials",
    title: "Patient Reviews LA | Real Cosmetic Dentistry Results",
    description:
      "Read verified patient reviews and watch video testimonials. See why patients choose Dr. Aguil for cosmetic dentistry in Los Angeles.",
    h1: "Client Testimonials",
    paragraphs: [
      "See what our clients are saying about their experience at Exquisite Dentistry.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/smile-gallery",
    title: "Before & After Gallery | LA Smile Transformations",
    description:
      "View stunning before & after smile transformations. Real patient results from porcelain veneers, whitening, and full makeovers in LA.",
    h1: "Smile Gallery",
    paragraphs: [
      "See the incredible results our patients have achieved with our expert dental care.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/faqs",
    title: "Dental FAQ Los Angeles | Common Questions Answered",
    description:
      "Get answers to common dental questions: veneer costs, insurance coverage, treatment time, recovery. Expert guidance from our LA dental team.",
    h1: "Dental FAQs",
    paragraphs: [
      "Get comprehensive answers about our Los Angeles practice near Beverly Hills, treatment procedures, insurance coverage, and what to expect during your luxury dental experience.",
    ],
    links: defaultNavLinks,
  },
  {
    path: "/blog",
    title: "Los Angeles Cosmetic Dentistry Blog | Expert Insights & Techniques",
    description:
      "Stay current with Exquisite Dentistry’s Los Angeles cosmetic dental insights. Discover veneers, whitening breakthroughs, patient stories, and advanced oral health techniques.",
    h1: "Expert Dental Insights & Patient Education",
    paragraphs: [
      "Stay informed with the latest in cosmetic dentistry, oral health innovations, and expert guidance from Dr. Alexie Aguil and our Los Angeles dental team near Beverly Hills.",
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

const buildSeoTitle = (title: string) => {
  const brandSuffix = "Exquisite Dentistry Los Angeles";
  const lowerTitle = title.toLowerCase();
  const shouldAppendBrand = !lowerTitle.includes("exquisite dentistry");
  if (!shouldAppendBrand) return stripTrailingSeparators(truncateTitle(title, 70));

  const separator = " | ";
  const maxTitleLength = 70 - separator.length - brandSuffix.length;
  const truncatedTitle = title.length > maxTitleLength
    ? truncateTitle(title, maxTitleLength)
    : title;
  const safeTitle = stripTrailingSeparators(truncatedTitle);
  return truncateTitle(`${safeTitle}${separator}${brandSuffix}`, 70);
};

const uniqueLinks = (links: StaticLink[]) => {
  const map = new Map<string, StaticLink>();
  links.forEach((link) => {
    if (link.href && !map.has(link.href)) map.set(link.href, link);
  });
  return Array.from(map.values());
};

const renderLinks = (links: StaticLink[]) => {
  if (!links.length) return "";
  const items = links
    .map(
      (link) =>
        `<li><a class="text-primary underline hover:no-underline" href="${link.href}">${escapeHtml(
          link.label,
        )}</a></li>`,
    )
    .join("\n");
  return `
  <section class="mt-10">
    <h2 class="text-2xl font-semibold text-foreground mb-4">Explore More</h2>
    <ul class="list-disc pl-6 space-y-2">${items}</ul>
  </section>`;
};

const injectSeo = (template: string, title: string, description: string, routePath: string) => {
  const fullTitle = buildSeoTitle(title);
  const metaDescription = toMeta(description);
  let html = template;

  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`);
  } else {
    html = html.replace(
      /<\/head>/i,
      `  <title>${escapeHtml(fullTitle)}</title>\n  <meta name="description" content="${escapeHtml(metaDescription)}" />\n</head>`,
    );
  }

  if (/<meta[^>]+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<meta[^>]+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${escapeHtml(metaDescription)}" />`,
    );
  }

  // Keep OG/Twitter in sync when present.
  const updateMetaContent = (pattern: RegExp, content: string) => {
    html = html.replace(pattern, (match) =>
      match.replace(/content=["'][^"']*["']/, `content="${escapeHtml(content)}"`),
    );
  };

  updateMetaContent(/<meta[^>]+property=["']og:title["'][^>]*>/i, fullTitle);
  updateMetaContent(/<meta[^>]+property=["']og:description["'][^>]*>/i, metaDescription);
  updateMetaContent(/<meta[^>]+name=["']twitter:title["'][^>]*>/i, fullTitle);
  updateMetaContent(/<meta[^>]+name=["']twitter:description["'][^>]*>/i, metaDescription);

  // Update og:url if present.
  updateMetaContent(/<meta[^>]+property=["']og:url["'][^>]*>/i, `https://exquisitedentistryla.com${routePath}`);

  return html;
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

  const contentHtml = `
  <div class="min-h-screen bg-background">
    <main class="container mx-auto px-4 py-16">
      <h1 class="text-4xl font-semibold tracking-tight text-foreground mb-6">${escapeHtml(
        route.h1,
      )}</h1>
      ${paragraphsHtml}
      ${renderLinks(route.links)}
    </main>
  </div>`;

  let html = injectSeo(template, route.title, route.description, route.path);
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
