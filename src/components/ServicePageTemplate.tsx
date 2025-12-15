import React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import PageSEO from "@/components/seo/PageSEO";
import { ServicePageConfig } from "@/data/servicePages";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";
import { getCanonicalUrl } from "@/utils/schemaValidation";
import { Link } from "react-router-dom";

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

const isHttpUrl = (href: string) => /^https?:\/\//i.test(href);

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

  const canonicalUrl = getCanonicalUrl(`/${config.slug}`);

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

      <section className="relative overflow-hidden bg-gradient-to-br from-black via-black/95 to-primary/20 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),transparent_50%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:py-28">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">{config.hero.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">{config.hero.heading}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{config.hero.subheading}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {config.hero.highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm">
                <CheckCircle2 className="h-5 w-5 text-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            {config.overview.intro.map((paragraph) => (
              <p key={paragraph} className="mb-6 text-lg text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="space-y-4 rounded-2xl border border-border bg-muted/30 p-6">
            {config.overview.callouts.map((callout) => (
              <div key={callout.title}>
                <h3 className="text-lg font-semibold">{callout.title}</h3>
                <p className="text-muted-foreground">{callout.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.4em] text-primary">Why Patients Choose Us</p>
            <h2 className="mt-3 text-3xl font-semibold">Benefits of {config.title}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {config.benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-primary">What to Expect</p>
          <h2 className="mt-3 text-3xl font-semibold">Your Visit Timeline</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
          <div className="space-y-10">
            {config.treatmentSteps.map((step, index) => (
              <div
                key={step.title}
                className={cn(
                  "relative rounded-2xl border border-border bg-card p-6 shadow-sm md:w-1/2",
                  index % 2 === 0 ? "md:ml-auto md:text-left" : "md:text-left"
                )}
                style={{ scrollMarginTop: "120px" }}
              >
                <div className="absolute -left-6 top-6 hidden h-4 w-4 rounded-full border-2 border-primary bg-background md:block" />
                <p className="text-sm font-semibold text-primary">{step.title}</p>
                <p className="mt-2 text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-primary">Answers</p>
            <h2 className="mt-3 text-3xl font-semibold">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full rounded-2xl border border-border bg-background/60">
            {config.faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="px-6 text-left text-lg font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-3xl border border-border bg-muted/30 p-8">
          <p className="text-sm uppercase tracking-[0.4em] text-primary">Explore Related Care</p>
          <h2 className="mt-3 text-3xl font-semibold">Continue Your Smile Plan</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {config.internalLinks.map((link) => (
              <Link
                key={link.href}
                to={normalizeInternalHref(link.href)}
                className="flex items-center justify-between rounded-2xl border border-border/80 bg-background px-5 py-4 text-primary transition hover:border-primary hover:bg-primary/5"
              >
                <span>{link.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/20 p-10 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-primary">Ready</p>
          <h2 className="mt-3 text-3xl font-semibold">{config.cta.heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{config.cta.description}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              {config.cta.primaryHref.startsWith("/") ? (
                <Link to={normalizeInternalHref(config.cta.primaryHref)}>{config.cta.primaryText}</Link>
              ) : (
                <a
                  href={config.cta.primaryHref}
                  target={isHttpUrl(config.cta.primaryHref) ? "_blank" : undefined}
                  rel={isHttpUrl(config.cta.primaryHref) ? "noopener noreferrer" : undefined}
                >
                  {config.cta.primaryText}
                </a>
              )}
            </Button>
            {config.cta.secondaryText && config.cta.secondaryHref && (
              <Button asChild size="lg" variant="outline">
                {config.cta.secondaryHref.startsWith("/") ? (
                  <Link to={normalizeInternalHref(config.cta.secondaryHref)}>{config.cta.secondaryText}</Link>
                ) : (
                  <a href={config.cta.secondaryHref}>{config.cta.secondaryText}</a>
                )}
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePageTemplate;
