import React from "react";
import { Link } from "react-router-dom";
import PageSEO from "@/components/seo/PageSEO";
import MasterStructuredData from "@/components/seo/MasterStructuredData";
import FAQStructuredData from "@/components/seo/FAQStructuredData";
import WebPageStructuredData from "@/components/WebPageStructuredData";
import ServiceStructuredData from "@/components/ServiceStructuredData";
import VideoHero from "@/components/VideoHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InternalLinkingWidget from "@/components/InternalLinkingWidget";
import RelatedArticles from "@/components/RelatedArticles";
import LastUpdated from "@/components/LastUpdated";
import { ROUTE_METADATA } from "@/constants/metadata";
import { GOOGLE_MAPS_SHORT_URL, SCHEDULE_CONSULTATION_PATH } from "@/constants/urls";
import { ADDRESS, BUSINESS_HOURS, PHONE_NUMBER_DISPLAY, PHONE_NUMBER_E164 } from "@/constants/contact";
import { Clock, MapPin, Phone } from "lucide-react";
import { SMILE_MAKEOVER_LOS_ANGELES_FAQS } from "@/data/smile-makeover-los-angeles-faqs";
import {
  SMILE_MAKEOVER_HUB_INTRO_PARAGRAPHS,
  SMILE_MAKEOVER_HUB_SECTIONS,
  SMILE_MAKEOVER_REFERENCES
} from "@/data/smile-makeover-hub";
import { normalizeInternalHref } from "@/utils/normalizeInternalHref";

type HubLink = { label: string; href: string };
type HubSection = (typeof SMILE_MAKEOVER_HUB_SECTIONS)[number];

const isInternalHref = (href: string) => href.startsWith("/");

const SectionLinkButton = ({ link }: { link: HubLink }) => {
  if (isInternalHref(link.href)) {
    return (
      <Button key={link.href} variant="outline" asChild>
        <Link to={normalizeInternalHref(link.href)}>{link.label}</Link>
      </Button>
    );
  }

  const isAnchor = link.href.startsWith("#");
  const shouldOpenNewTab = !isAnchor && link.href.startsWith("http");

  return (
    <Button key={link.href} variant="outline" asChild>
      <a
        href={link.href}
        target={shouldOpenNewTab ? "_blank" : undefined}
        rel={shouldOpenNewTab ? "noopener noreferrer" : undefined}
      >
        {link.label}
      </a>
    </Button>
  );
};

const HubSectionBlock = ({ section }: { section: HubSection }) => (
  <Card className="border border-border/60 bg-white shadow-sm">
    <CardContent className="p-8 space-y-4">
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="text-muted-foreground leading-relaxed">
          {paragraph}
        </p>
      ))}
      {section.bullets?.length ? (
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {section.links?.length ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {section.links.map((link) => (
            <SectionLinkButton key={link.href} link={link} />
          ))}
        </div>
      ) : null}
    </CardContent>
  </Card>
);

const SmileMakeoverLosAngeles = () => {
  const meta = ROUTE_METADATA["/smile-makeover-los-angeles"];
  const faqs = SMILE_MAKEOVER_LOS_ANGELES_FAQS;

  const sectionsById = Object.fromEntries(SMILE_MAKEOVER_HUB_SECTIONS.map((section) => [section.id, section]));

  return (
    <>
      <MasterStructuredData includeBusiness={true} includeDoctor={true} includeWebsite={true} />

      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/smile-makeover-los-angeles"
        ogImage={meta.ogImage}
      />

      <WebPageStructuredData
        title="Smile Makeover Los Angeles"
        description={meta.description}
        url="https://exquisitedentistryla.com/smile-makeover-los-angeles"
        breadcrumbs={[
          { name: "Services", url: "https://exquisitedentistryla.com/services/" },
          { name: "Cosmetic Dentistry", url: "https://exquisitedentistryla.com/cosmetic-dentistry/" },
          { name: "Smile Makeover", url: "https://exquisitedentistryla.com/smile-makeover-los-angeles/" }
        ]}
      />

      <ServiceStructuredData
        serviceName="Smile Makeover Los Angeles"
        description={meta.description}
        url="https://exquisitedentistryla.com/smile-makeover-los-angeles"
      />

      <FAQStructuredData faqs={faqs} about="Smile Makeover Los Angeles" />

      <div className="min-h-screen bg-background">
        <VideoHero
          title="Smile Makeover Los Angeles"
          subtitle="A personalized plan that can combine veneers, whitening, Invisalign, bonding, and restorative care, sequenced for natural-looking results and bite stability."
          primaryCta={{
            text: "Schedule Consultation",
            href: SCHEDULE_CONSULTATION_PATH
          }}
          height="medium"
          preferStaticOnMobile={true}
          useGradient={true}
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <span className="uppercase tracking-[0.35em] text-secondary font-semibold">Cosmetic Dentistry</span>
              <h2 id="overview" className="mt-6 text-3xl md:text-4xl font-bold text-foreground">
                Smile Makeover Los Angeles: What to Expect
              </h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Clinically reviewed by{" "}
                  <Link to="/about/" className="text-secondary underline-offset-4 hover:underline">
                    Dr. Alexie Aguil
                  </Link>{" "}
                  ·{" "}
                  <Link to="/editorial-policy/" className="text-secondary underline-offset-4 hover:underline">
                    Editorial policy
                  </Link>
                </p>

              {SMILE_MAKEOVER_HUB_INTRO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph} className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <nav
                aria-label="On this page"
                className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-muted/30 p-6 text-left"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">On this page</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#options">
                      Options
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#process">
                      Planning process
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#timeline">
                      Timeline
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#cost">
                      Cost factors
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#natural-results">
                      Natural results
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#maintenance">
                      Maintenance
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#location">
                      Location & hours
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#faqs">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#references">
                      References
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="mt-10 grid gap-4 md:grid-cols-2 text-left">
                <Card className="border border-border/60 shadow-sm">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-foreground">
                      <MapPin className="h-5 w-5 text-secondary" />
                      <h2 className="text-lg font-semibold">Our Location</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">{ADDRESS}</p>
                    <p className="text-sm text-muted-foreground">
                      Prefer a call?{" "}
                      <a className="text-secondary underline-offset-4 hover:underline" href={`tel:${PHONE_NUMBER_E164}`}>
                        {PHONE_NUMBER_DISPLAY}
                      </a>
                      {" · "}
                      <a href="#location" className="text-secondary underline-offset-4 hover:underline">
                        directions and hours
                      </a>
                      .
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-border/60 shadow-sm">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-foreground">
                      <Clock className="h-5 w-5 text-secondary" />
                      <h2 className="text-lg font-semibold">Start with a Smile Analysis</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We’ll review your goals, timeline, and existing dental work, then recommend a sequenced plan for predictable results.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button asChild>
                        <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/smile-gallery/">See results</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="options" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                {sectionsById.options?.heading ?? "Smile Makeover Options"}
              </h2>
              {sectionsById.options ? <HubSectionBlock section={sectionsById.options} /> : null}
            </div>
          </div>
        </section>

        <section id="process" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                {sectionsById.process?.heading ?? "Our Smile Makeover Process"}
              </h2>
              {sectionsById.process ? <HubSectionBlock section={sectionsById.process} /> : null}
            </div>
          </div>
        </section>

        <section id="timeline" className="py-16 bg-muted/15">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                {sectionsById.timeline?.heading ?? "Timeline"}
              </h2>
              {sectionsById.timeline ? <HubSectionBlock section={sectionsById.timeline} /> : null}
            </div>
          </div>
        </section>

        <section id="cost" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                {sectionsById.cost?.heading ?? "Cost Factors"}
              </h2>
              {sectionsById.cost ? <HubSectionBlock section={sectionsById.cost} /> : null}
            </div>
          </div>
        </section>

        <section id="natural-results" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                {sectionsById["natural-results"]?.heading ?? "Natural Results"}
              </h2>
              {sectionsById["natural-results"] ? <HubSectionBlock section={sectionsById["natural-results"]} /> : null}
            </div>
          </div>
        </section>

        <section id="maintenance" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                {sectionsById.maintenance?.heading ?? "Maintenance"}
              </h2>
              {sectionsById.maintenance ? <HubSectionBlock section={sectionsById.maintenance} /> : null}
            </div>
          </div>
        </section>

        <section id="location" className="py-16 bg-muted/15">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                Location, Hours, and Directions
              </h2>

              <Card className="border border-border/60 bg-white shadow-sm">
                <CardContent className="p-8 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {sectionsById.location?.paragraphs?.[0] ??
                      "Visit Exquisite Dentistry on Wilshire Blvd in Los Angeles for smile makeover planning and a comfort-first experience."}
                  </p>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 text-secondary" />
                      <div>
                        <p className="font-semibold text-foreground">Address</p>
                        <p className="text-muted-foreground">{ADDRESS}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="mt-1 h-5 w-5 text-secondary" />
                      <div>
                        <p className="font-semibold text-foreground">Phone</p>
                        <a className="text-muted-foreground underline-offset-4 hover:underline" href={`tel:${PHONE_NUMBER_E164}`}>
                          {PHONE_NUMBER_DISPLAY}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-1 h-5 w-5 text-secondary" />
                      <div>
                        <p className="font-semibold text-foreground">Hours</p>
                        <div className="space-y-1 text-muted-foreground">
                          {BUSINESS_HOURS.map((hours) => (
                            <p key={hours.label}>
                              {hours.label}: {hours.value}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button variant="outline" asChild>
                      <a href={GOOGLE_MAPS_SHORT_URL} target="_blank" rel="noopener noreferrer">
                        Get directions
                      </a>
                    </Button>
                    <Button asChild>
                      <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/contact/">Contact</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
                Smile Makeover FAQs
              </h2>
              <Accordion type="single" collapsible className="w-full rounded-2xl border border-border bg-muted/30">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger className="px-6 text-left text-lg font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section id="references" className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
                References
              </h2>
              <div className="space-y-3 text-muted-foreground">
                {SMILE_MAKEOVER_REFERENCES.map((reference) => (
                  <p key={reference.href}>
                    <a
                      className="text-secondary underline-offset-4 hover:underline"
                      href={reference.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {reference.label}
                    </a>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <RelatedArticles
          tags={["smile makeover", "cosmetic dentistry", "veneers", "teeth whitening"]}
          title="Smile Makeover Articles & Tips"
          subtitle="Explore veneers, whitening, and planning guidance for natural-looking results"
        />

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Plan Your Smile Makeover?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Book a consultation to review your goals, timeline, and best options. We’ll map the most predictable sequence for a natural-looking result.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={`tel:${PHONE_NUMBER_E164}`}>Call {PHONE_NUMBER_DISPLAY}</a>
                </Button>
              </div>

              <div className="mt-12 pt-8 border-t border-muted">
                <InternalLinkingWidget
                  context="veneer"
                  variant="compact"
                  currentPage="/smile-makeover-los-angeles"
                  title="Explore Related Services"
                />
              </div>

              <LastUpdated date="December 2025" className="text-center" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SmileMakeoverLosAngeles;
