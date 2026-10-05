import React from "react";
import LocationBreadcrumbs from "@/components/LocationBreadcrumbs";
import DoctorExperienceSection from "@/components/DoctorExperienceSection";
import PageSEO from "@/components/seo/PageSEO";
import PracticeLocationSection from "@/components/PracticeLocationSection";
import { LocationPageConfig } from "@/data/locationPages";
import { ArrowRight, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import ConsultationBand from "@/components/service/ConsultationBand";
import DarkPageHero from "@/components/service/DarkPageHero";
import ServiceFaqList from "@/components/service/ServiceFaqList";
import { SCHEDULE_CONSULTATION_PATH } from "@/constants/urls";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { createBreadcrumbSchema, createWebPageSchema } from "@/utils/centralizedSchemas";
import { normalizeInternalHref } from "@/utils/normalizeInternalHref";

interface LocationPageTemplateProps {
  config: LocationPageConfig;
}

const MIN_WORD_COUNT = 150;

const CARD = "rounded-2xl border border-gold/15 bg-white shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]";

const LOCATION_LINKS = [
  { label: "Miracle Mile Dentist", href: "/miracle-mile-dentist/" },
  { label: "Larchmont Dentist", href: "/larchmont-dentist/" },
  { label: "Hancock Park Dentist", href: "/hancock-park-dentist/" },
  { label: "Mid-Wilshire Dentist", href: "/mid-wilshire-dentist/" },
  { label: "Koreatown Dentist", href: "/koreatown-dentist/" },
  { label: "Fairfax District Dentist", href: "/fairfax-district-dentist/" },
  { label: "Beverly Hills Dentist", href: "/beverly-hills-dentist/" },
  { label: "West Hollywood Dentist", href: "/west-hollywood-dentist/" },
  { label: "Culver City Dentist", href: "/culver-city-dentist/" },
  { label: "West LA Dentist", href: "/west-la-dentist/" },
  { label: "Bel Air Dentist", href: "/bel-air-dentist/" },
  { label: "90048 Dentist", href: "/90048-dentist/" },
  { label: "Melrose Dentist", href: "/melrose-dentist/" },
  { label: "Westwood Dentist", href: "/westwood-dentist/" }
];

const LocationPageTemplate: React.FC<LocationPageTemplateProps> = ({ config }) => {
  if (!config?.seo?.title || !config?.seo?.description) {
    throw new Error(`Location page "${config?.slug}" is missing SEO title/description.`);
  }
  if (!config?.hero?.heading) {
    throw new Error(`Location page "${config.slug}" is missing an H1.`);
  }
  if (!config.relatedServices || config.relatedServices.length === 0) {
    throw new Error(`Location page "${config.slug}" must link to at least one related service.`);
  }

  const combinedText = [
    config.hero.subheading,
    config.practiceLocation?.description,
    ...(config.practiceLocation?.highlights ?? []),
    ...(config.neighborhoodHighlights ?? []),
    ...(config.signatureServices ?? []),
    ...(config.doctorSection?.paragraphs ?? []),
    ...(config.doctorSection?.highlights ?? []),
    ...(config.testimonials?.map((t) => t.quote) ?? []),
    ...(config.faqs?.map((faq) => faq.answer) ?? []),
    config.cta.description
  ]
    .filter(Boolean)
    .join(" ");

  const bodyWordCount = combinedText.trim().split(/\s+/).filter(Boolean).length;
  const filteredLocationLinks = LOCATION_LINKS.filter(
    (link) => normalizeInternalHref(link.href) !== normalizeInternalHref(`/${config.slug}`)
  );

  if (import.meta.env.DEV && bodyWordCount < MIN_WORD_COUNT) {
    console.warn(`Location page /${config.slug} is thin (${bodyWordCount} words). Target at least ${MIN_WORD_COUNT}+ words.`);
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      createWebPageSchema({
        title: config.seo.title,
        description: config.seo.description,
        url: `/${config.slug}`,
        pageType: "WebPage"
      }),
      createBreadcrumbSchema([
        { name: "Locations", url: "/locations" },
        { name: `${config.cityLabel} Dentist`, url: `/${config.slug}` }
      ])
    ]
  };

  // Booking CTAs are internal routes; a non-route href falls back to the consultation page.
  const primaryHref = config.cta.primaryHref.startsWith("/")
    ? normalizeInternalHref(config.cta.primaryHref)
    : SCHEDULE_CONSULTATION_PATH;
  // tel: secondaries are covered by the band's tracked PhoneLink.
  const secondaryLink =
    config.cta.secondaryText && config.cta.secondaryHref?.startsWith("/")
      ? { text: config.cta.secondaryText, href: normalizeInternalHref(config.cta.secondaryHref) }
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
        align="center"
        eyebrow={config.cityLabel}
        title={config.hero.heading}
        subtitle={config.hero.subheading}
        primaryCta={{ text: config.cta.primaryText, href: primaryHref }}
        phoneSource="location_page_hero_phone"
        topSlot={
          <LocationBreadcrumbs
            items={[
              { label: "Locations", to: "/locations/" },
              { label: `${config.cityLabel} Dentist`, to: `/${config.slug}/` }
            ]}
          />
        }
      >
        <dl className="mx-auto grid max-w-4xl divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {config.hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-baseline justify-between gap-4 px-5 py-4 text-left sm:flex-col-reverse sm:items-center sm:justify-end sm:gap-2 sm:px-6 sm:py-7 sm:text-center"
            >
              <dt className="min-w-0 text-xs font-medium uppercase leading-5 tracking-[0.16em] text-white/65">{stat.label}</dt>
              <dd className="shrink-0 text-xl font-semibold tracking-[-0.01em] text-champagne sm:text-3xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </DarkPageHero>

      {config.practiceLocation ? (
        <PracticeLocationSection config={config.practiceLocation} />
      ) : null}

      <section className="bg-ivory py-16 md:py-24">
        <div className="section-container grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
          <div className="min-w-0">
            <SectionHeading align="left" eyebrow="Nearby care" title={`Why ${config.cityLabel} Patients Visit Us`} />
            <Reveal as="ul" variant="up" delay={120} className={cn(CARD, "mt-8 divide-y divide-gold/10 px-5 sm:px-6")}>
              {config.neighborhoodHighlights.map((item) => (
                <li key={item} className="flex gap-3 py-4 text-base leading-7 text-gray-600">
                  <Check className="mt-1.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </Reveal>
          </div>
          <div className="min-w-0">
            <SectionHeading align="left" eyebrow="Treatments" title="Signature Services" />
            <Reveal as="ul" variant="up" delay={120} className={cn(CARD, "mt-8 divide-y divide-gold/10 px-5 sm:px-6")}>
              {config.signatureServices.map((service) => (
                <li key={service} className="flex gap-3 py-4 text-base leading-7 text-gray-600">
                  <Check className="mt-1.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="min-w-0">{service}</span>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {config.doctorSection ? (
        <DoctorExperienceSection config={config.doctorSection} />
      ) : null}

      {config.testimonials.length > 0 ? (
        <section className="bg-ivory py-16 md:py-24">
          <div className="section-container">
            <SectionHeading eyebrow="Patient reviews" title={<>In our patients&rsquo; <em>own words</em></>} />
            <div
              className={cn(
                "mt-12 grid gap-5",
                config.testimonials.length === 1 ? "mx-auto max-w-2xl" : config.testimonials.length === 2
                    ? "sm:grid-cols-2"
                    : "sm:grid-cols-2 lg:grid-cols-3 sm:[&>*:nth-child(3)]:col-span-2 lg:[&>*:nth-child(3)]:col-span-1",
              )}
            >
              {config.testimonials.map((testimonial, index) => (
                <Reveal
                  as="figure"
                  key={testimonial.author}
                  variant="up"
                  delay={index * 80}
                  className={cn(CARD, "flex h-full flex-col p-6 sm:p-7")}
                >
                  <span className="h-8 text-5xl leading-none" aria-hidden="true"><span className="accent-serif text-gold">&ldquo;</span></span>
                  <blockquote className="mt-2 flex-1 text-base leading-7 text-ink/85">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                  <figcaption className="mt-5 text-sm font-semibold text-ink">{testimonial.author}</figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ConsultationBand
        eyebrow="Plan your visit"
        title={<>Plan your first visit <em>from {config.cityLabel}</em></>}
        description="Book a consultation online or call the office. We see patients Monday through Thursday, 8AM to 6PM."
        href={primaryHref}
        ctaText={config.cta.primaryText}
        source="location_page_mid_cta"
      />

      <section className="pb-16 pt-4 md:pb-24 md:pt-8">
        <div className="section-container">
          <SectionHeading eyebrow="Answers" title={<>Frequently Asked <em>Questions</em></>} />
          <Reveal variant="up" className="mx-auto mt-10 max-w-3xl">
            <ServiceFaqList faqs={config.faqs} openFirst />
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="section-container grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <SectionHeading align="left" eyebrow="Popular Services" title="Plan Your Visit" />
            <ul className="mt-8 grid gap-3">
              {config.relatedServices.map((service, index) => (
                <Reveal as="li" key={service.href} variant="up" delay={index * 50}>
                  <Link
                    to={normalizeInternalHref(service.href)}
                    className={cn(CARD, "lift-card group flex min-h-14 items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-ink")}
                  >
                    <span className="link-sweep min-w-0 pb-0.5">{service.label}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>

          {filteredLocationLinks.length > 0 ? (
            <div className="min-w-0">
              <SectionHeading align="left" eyebrow="Nearby Neighborhoods" title="Explore Nearby Locations" />
              <Reveal as="ul" variant="up" delay={120} className="mt-8 flex flex-wrap gap-2.5">
                {filteredLocationLinks.map((location) => (
                  <li key={location.href}>
                    <Link
                      to={normalizeInternalHref(location.href)}
                      className="inline-flex min-h-11 items-center rounded-full border border-gold/20 bg-white px-4 text-sm font-medium text-ink transition-colors hover:border-gold hover:text-gold-dark"
                    >
                      {location.label}
                    </Link>
                  </li>
                ))}
              </Reveal>
            </div>
          ) : null}
        </div>
      </section>

      <ConsultationBand
        closing
        tone="light"
        eyebrow="Visit us"
        title={config.cta.heading}
        description={config.cta.description}
        href={primaryHref}
        ctaText={config.cta.primaryText}
        source="location_page_final_cta"
        secondaryLink={secondaryLink}
        className="pb-16 md:pb-24"
      />
    </div>
  );
};

export default LocationPageTemplate;
