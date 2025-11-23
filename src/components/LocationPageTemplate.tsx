import React from "react";
import PageSEO from "@/components/seo/PageSEO";
import { LocationPageConfig } from "@/data/locationPages";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getCanonicalUrl } from "@/utils/schemaValidation";
import { Link } from "react-router-dom";

interface LocationPageTemplateProps {
  config: LocationPageConfig;
}


const MIN_WORD_COUNT = 150;

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

  const canonicalUrl = getCanonicalUrl(`/${config.slug}`);

  const combinedText = [
    config.hero.subheading,
    ...(config.neighborhoodHighlights ?? []),
    ...(config.signatureServices ?? []),
    ...(config.testimonials?.map((t) => t.quote) ?? []),
    ...(config.faqs?.map((faq) => faq.answer) ?? []),
    config.cta.description
  ]
    .filter(Boolean)
    .join(" ");

  const bodyWordCount = combinedText.trim().split(/\s+/).filter(Boolean).length;

  if (import.meta.env.DEV && bodyWordCount < MIN_WORD_COUNT) {
    console.warn(`Location page /${config.slug} is thin (${bodyWordCount} words). Target at least ${MIN_WORD_COUNT}+ words.`);
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.seo.title,
    url: canonicalUrl,
    about: {
      "@id": "https://exquisitedentistryla.com/#business"
    }
  };

  return (
    <div className="bg-background text-foreground">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <PageSEO
        title={config.seo.title}
        description={config.seo.description}
        keywords={config.seo.keywords.join(", ")}
        path={`/${config.slug}`}
      />

      <section className="bg-gradient-to-br from-black via-black to-primary/30 text-white">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center md:py-24">
          <p className="text-sm uppercase tracking-[0.4em] text-gold">{config.cityLabel}</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">{config.hero.heading}</h1>
          <p className="mt-4 text-lg text-white/80">{config.hero.subheading}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {config.hero.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-3xl font-bold text-gold">{stat.value}</p>
                <p className="text-sm uppercase tracking-widest text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Why {config.cityLabel} Patients Visit Us</h2>
            <ul className="mt-6 space-y-4 text-muted-foreground">
              {config.neighborhoodHighlights.map((item) => (
                <li key={item} className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Signature Services</h2>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              {config.signatureServices.map((service) => (
                <li key={service} className="rounded-xl border border-border/60 bg-background p-4 shadow-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
          {config.testimonials.map((testimonial) => (
            <div key={testimonial.author} className="rounded-3xl border border-primary/20 bg-background p-8 text-center shadow-sm">
              <Quote className="mx-auto mb-4 h-10 w-10 text-primary" />
              <p className="text-xl text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-4 font-semibold text-primary">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-6">
          {config.faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-border bg-muted/20 p-6">
              <p className="text-lg font-semibold">{faq.question}</p>
              <p className="mt-2 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-12">
        <div className="rounded-3xl border border-border bg-muted/20 p-8">
          <p className="text-sm uppercase tracking-[0.4em] text-primary">Popular Services</p>
          <h2 className="mt-3 text-3xl font-semibold">Plan Your Visit</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {config.relatedServices.map((service) => (
              <Link
                key={service.href}
                to={service.href}
                className="flex items-center justify-between rounded-2xl border border-border/80 bg-background px-5 py-4 text-primary transition hover:border-primary hover:bg-primary/5"
              >
                <span>{service.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 p-10 text-center">
          <h2 className="text-3xl font-semibold">{config.cta.heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{config.cta.description}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <a href={config.cta.primaryHref} target="_blank" rel="noopener noreferrer">
                {config.cta.primaryText}
              </a>
            </Button>
            {config.cta.secondaryText && config.cta.secondaryHref && (
              <Button size="lg" variant="outline" asChild>
                <a href={config.cta.secondaryHref}>{config.cta.secondaryText}</a>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPageTemplate;
