import React from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import PageSEO from "@/components/seo/PageSEO";
import FinancingOptionsSection from "@/components/FinancingOptionsSection";
import { ServicePageConfig } from "@/data/servicePages";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import ConsultationBand from "@/components/service/ConsultationBand";
import DarkPageHero from "@/components/service/DarkPageHero";
import ServiceFaqList from "@/components/service/ServiceFaqList";
import { Helmet } from "react-helmet-async";
import { getCanonicalUrl } from "@/utils/schemaValidation";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SCHEDULE_CONSULTATION_PATH } from "@/constants/urls";
import { trackConsultationIntent, trackCtaClick } from "@/utils/vercelAnalytics";

interface ServicePageTemplateProps {
  config: ServicePageConfig;
}

const MIN_WORD_COUNT = 150;

const normalizeInternalHref = (href: string): string => {
  if (!href.startsWith("/")) return href;
  if (href === "/") return href;

  const [pathPart, hashPart] = href.split("#");
  const normalizedPath = pathPart.endsWith("/") ? pathPart : `${pathPart}/`;
  return hashPart ? `${normalizedPath}#${hashPart}` : normalizedPath;
};

const CARD = "rounded-2xl border border-gold/15 bg-white shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]";

const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({ config }) => {
  if (!config?.seo?.title || !config?.seo?.description) {
    throw new Error(`Service page "${config?.slug}" is missing SEO title/description.`);
  }
  if (!config?.hero?.heading) {
    throw new Error(`Service page "${config.slug}" is missing a hero heading (H1).`);
  }
  if (!config.internalLinks || config.internalLinks.length < 2) {
    throw new Error(`Service page "${config.slug}" must include at least two internal links.`);
  }

  const { secondaryText, secondaryHref } = config.cta;
  const canonicalUrl = getCanonicalUrl(`/${config.slug}`);
  const trackServiceCta = (source: string, ctaText: string, destination: string) => {
    const normalizedDestination = normalizeInternalHref(destination);

    trackCtaClick({
      source,
      ctaText,
      destination: normalizedDestination,
    });

    if (normalizedDestination === SCHEDULE_CONSULTATION_PATH) {
      trackConsultationIntent({
        source,
        ctaText,
        destination: normalizedDestination,
      });
    }
  };

  const combinedText = [
    config.hero.subheading,
    ...(config.overview.intro ?? []),
    ...(config.overview.callouts?.map((callout) => callout.description) ?? []),
    ...(config.benefits?.map((benefit) => benefit.description) ?? []),
    ...(config.treatmentSteps?.map((step) => step.detail) ?? []),
    ...(config.faqs?.map((faq) => faq.answer) ?? []),
    config.cta.description
  ]
    .filter(Boolean)
    .join(" ");

  const bodyWordCount = combinedText.trim().split(/\s+/).filter(Boolean).length;

  if (import.meta.env.DEV && bodyWordCount < MIN_WORD_COUNT) {
    console.warn(`Content on /${config.slug} is thin (${bodyWordCount} words). Target at least ${MIN_WORD_COUNT}+ words.`);
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: config.title,
    description: config.seo.description,
    url: canonicalUrl,
    provider: {
      "@id": "https://exquisitedentistryla.com/#business"
    }
  };

  // Booking CTAs are internal routes; a non-route href falls back to the consultation page.
  const primaryHref = config.cta.primaryHref.startsWith("/")
    ? normalizeInternalHref(config.cta.primaryHref)
    : SCHEDULE_CONSULTATION_PATH;
  // tel: secondaries are covered by the band's tracked PhoneLink.
  const secondaryLink =
    secondaryText && secondaryHref && secondaryHref.startsWith("/")
      ? { text: secondaryText, href: normalizeInternalHref(secondaryHref) }
      : undefined;

  return (
    <div className="bg-background text-ink">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <PageSEO
        title={config.seo.title}
        description={config.seo.description}
        keywords={config.seo.keywords.join(", ")}
        path={`/${config.slug}`}
      />

      <DarkPageHero
        eyebrow={config.hero.eyebrow}
        title={config.hero.heading}
        subtitle={config.hero.subheading}
        primaryCta={{
          text: config.cta.primaryText,
          href: primaryHref,
          onClick: () => trackServiceCta("service_page_hero_cta", config.cta.primaryText, primaryHref),
        }}
        phoneSource="service_page_hero_phone"
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {config.hero.highlights.map((item) => (
            <li
              key={item}
              className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm leading-6 text-white/85"
            >
              <Check className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </DarkPageHero>

      <section className="py-16 md:py-24">
        <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14">
          <Reveal variant="up" className="space-y-6 text-lg leading-8 text-gray-600">
            {config.overview.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal variant="up" delay={120} className={cn(CARD, "h-fit divide-y divide-gold/10 bg-ivory px-6 sm:px-8")}>
            {config.overview.callouts.map((callout) => (
              <div key={callout.title} className="py-6">
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{callout.title}</h3>
                <p className="mt-2 text-base leading-7 text-gray-600">{callout.description}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="section-container">
          <SectionHeading eyebrow="Why Patients Choose Us" title={<>Benefits of <em>{config.title}</em></>} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {config.benefits.map((benefit, index) => (
              <Reveal key={benefit.title} variant="up" delay={index * 80} className={cn(CARD, "h-full p-6 sm:p-7")}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold" aria-hidden="true">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-ink">{benefit.title}</h3>
                <p className="mt-2 text-base leading-7 text-gray-600">{benefit.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="section-container">
          <SectionHeading eyebrow="What to Expect" title={<>Your Visit <em>Timeline</em></>} />
          <ol className="relative mx-auto mt-12 max-w-3xl space-y-5 before:absolute before:bottom-6 before:left-[1.4rem] before:top-6 before:w-px before:bg-gold/25">
            {config.treatmentSteps.map((step, index) => {
              // Step titles are authored as "01. Title"; show the number in the marker.
              const [, stepNumber, stepTitle] = step.title.match(/^(\d+)\.\s*(.+)$/) ?? [null, String(index + 1).padStart(2, "0"), step.title];
              return (
              <Reveal
                as="li"
                key={step.title}
                variant="up"
                delay={index * 60}
                className="relative flex gap-5"
                style={{ scrollMarginTop: "120px" }}
              >
                <span
                  className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-white text-sm font-semibold text-gold-dark"
                  aria-hidden="true"
                >
                  {stepNumber}
                </span>
                <div className={cn(CARD, "min-w-0 flex-1 p-5 sm:p-6")}>
                  <h3 className="text-base font-semibold tracking-[-0.01em] text-ink sm:text-lg">{stepTitle}</h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">{step.detail}</p>
                </div>
              </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <ConsultationBand
        eyebrow="Consultation"
        title={<>Talk it through <em>with Dr. Aguil</em></>}
        description="A consultation is the place to ask questions, review your options, and leave with a clear plan before any treatment begins."
        href={primaryHref}
        ctaText={config.cta.primaryText}
        source="service_page_mid_cta"
        onPrimaryClick={() => trackCtaClick({ source: "service_page_mid_cta", ctaText: config.cta.primaryText, destination: primaryHref })}
        className="pt-0 md:pt-0"
      />

      <section className="bg-ivory py-16 md:py-24">
        <div className="section-container">
          <SectionHeading eyebrow="Answers" title={<>Frequently Asked <em>Questions</em></>} />
          <Reveal variant="up" className="mx-auto mt-10 max-w-3xl">
            <ServiceFaqList faqs={config.faqs} openFirst />
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="section-container">
          <SectionHeading eyebrow="Explore Related Care" title={<>Continue Your <em>Smile Plan</em></>} />
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 md:grid-cols-2">
            {config.internalLinks.map((link, index) => (
              <Reveal as="li" key={link.href} variant="up" delay={(index % 2) * 60}>
                <Link
                  to={normalizeInternalHref(link.href)}
                  className={cn(CARD, "lift-card group flex min-h-14 items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-ink")}
                >
                  <span className="link-sweep min-w-0 pb-0.5">{link.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinancingOptionsSection className="bg-background pt-0 md:pt-0" />

      <ConsultationBand
        closing
        tone="light"
        eyebrow="Ready"
        title={config.cta.heading}
        description={config.cta.description}
        href={primaryHref}
        ctaText={config.cta.primaryText}
        source="service_page_primary_cta"
        onPrimaryClick={() => trackCtaClick({ source: "service_page_primary_cta", ctaText: config.cta.primaryText, destination: primaryHref })}
        secondaryLink={secondaryLink}
        className="pb-16 pt-4 md:pb-24 md:pt-6"
      />
    </div>
  );
};

export default ServicePageTemplate;
