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
import { Clock, MapPin, Phone, Sparkles } from "lucide-react";
import { INVISALIGN_BEVERLY_HILLS_FAQS } from "@/data/invisalign-beverly-hills-faqs";
import {
  INVISALIGN_BEVERLY_HILLS_HUB_INTRO_PARAGRAPHS,
  INVISALIGN_BEVERLY_HILLS_HUB_SECTIONS,
  INVISALIGN_BEVERLY_HILLS_REFERENCES
} from "@/data/invisalign-beverly-hills-hub";
import { normalizeInternalHref } from "@/utils/normalizeInternalHref";

const InvisalignBeverlyHills = () => {
  const meta = ROUTE_METADATA["/invisalign-beverly-hills"];
  const faqs = INVISALIGN_BEVERLY_HILLS_FAQS;

  const sectionsById = Object.fromEntries(INVISALIGN_BEVERLY_HILLS_HUB_SECTIONS.map((section) => [section.id, section]));

  const isInternalHref = (href: string) => href.startsWith("/");
  const SectionLinkButton = ({ href, label }: { href: string; label: string }) => {
    if (isInternalHref(href)) {
      return (
        <Button key={href} variant="outline" asChild>
          <Link to={normalizeInternalHref(href)}>{label}</Link>
        </Button>
      );
    }

    const isAnchor = href.startsWith("#");
    const shouldOpenNewTab = !isAnchor && href.startsWith("http");

    return (
      <Button key={href} variant="outline" asChild>
        <a href={href} target={shouldOpenNewTab ? "_blank" : undefined} rel={shouldOpenNewTab ? "noopener noreferrer" : undefined}>
          {label}
        </a>
      </Button>
    );
  };

  const HubSectionBlock = ({ sectionId }: { sectionId: string }) => {
    const section = sectionsById[sectionId] as (typeof INVISALIGN_BEVERLY_HILLS_HUB_SECTIONS)[number] | undefined;
    if (!section) return null;

    return (
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
                <SectionLinkButton key={link.href} href={link.href} label={link.label} />
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <MasterStructuredData includeBusiness={true} includeDoctor={true} includeWebsite={true} />

      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/invisalign-beverly-hills"
        ogImage={meta.ogImage}
      />

      <WebPageStructuredData
        title="Invisalign Beverly Hills"
        description={meta.description}
        url="https://exquisitedentistryla.com/invisalign-beverly-hills"
        breadcrumbs={[
          { name: "Services", url: "https://exquisitedentistryla.com/services/" },
          { name: "Invisalign", url: "https://exquisitedentistryla.com/invisalign/" },
          { name: "Invisalign Beverly Hills", url: "https://exquisitedentistryla.com/invisalign-beverly-hills/" }
        ]}
      />

      <ServiceStructuredData
        serviceName="Invisalign Beverly Hills"
        description={meta.description}
        url="https://exquisitedentistryla.com/invisalign-beverly-hills"
      />

      <FAQStructuredData faqs={faqs} about="Invisalign Beverly Hills" />

      <div className="min-h-screen bg-background">
        <VideoHero
          title="Invisalign Beverly Hills"
          subtitle="Clear aligners planned with iTero scans and bite-focused staging—concierge check-ins at our Wilshire Blvd Los Angeles studio near Beverly Hills."
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
              <span className="uppercase tracking-[0.35em] text-secondary font-semibold">Orthodontics</span>
              <h2 id="overview" className="mt-6 text-3xl md:text-4xl font-bold text-foreground">
                Invisalign Beverly Hills: What to Expect
              </h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Clinically reviewed by{" "}
                  <Link to="/about/" className="text-secondary underline-offset-4 hover:underline">
                    Dr. Alexie Aguil, DDS
                  </Link>{" "}
                  ·{" "}
                  <Link to="/editorial-policy/" className="text-secondary underline-offset-4 hover:underline">
                    Editorial policy
                  </Link>
                </p>

              {INVISALIGN_BEVERLY_HILLS_HUB_INTRO_PARAGRAPHS.map((paragraph) => (
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
                    <a className="text-primary underline-offset-4 hover:underline" href="#benefits">
                      Benefits
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#candidacy">
                      Candidacy
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#process">
                      Process
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#attachments">
                      Attachments & refinements
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#visits">
                      Appointments
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
                    <a className="text-primary underline-offset-4 hover:underline" href="#finishing">
                      After Invisalign
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
                      <h2 className="text-lg font-semibold">Near Beverly Hills</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">{ADDRESS}</p>
                    <p className="text-sm text-muted-foreground">
                      Call{" "}
                      <a className="text-secondary underline-offset-4 hover:underline" href={`tel:${PHONE_NUMBER_E164}`}>
                        {PHONE_NUMBER_DISPLAY}
                      </a>
                      {" · "}
                      <a className="text-secondary underline-offset-4 hover:underline" href="#location">
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
                      <h2 className="text-lg font-semibold">Plan the timing</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Most Invisalign check-ins are spaced out. We’ll map treatment around travel, work, and upcoming events.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button asChild>
                        <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/itero-scanner/">Learn about iTero</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-secondary mb-4">
                <Sparkles className="h-5 w-5" />
                <p className="uppercase tracking-[0.35em] text-sm font-semibold">Why Invisalign</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                {sectionsById.benefits?.heading ?? "Why Choose Invisalign"}
              </h2>
              <HubSectionBlock sectionId="benefits" />
            </div>
          </div>
        </section>

        <section id="candidacy" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                {sectionsById.candidacy?.heading ?? "Candidacy"}
              </h2>
              <HubSectionBlock sectionId="candidacy" />
            </div>
          </div>
        </section>

        <section id="process" className="py-16 bg-muted/15">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                {sectionsById.process?.heading ?? "Process"}
              </h2>
              <HubSectionBlock sectionId="process" />
            </div>
          </div>
        </section>

        <section id="attachments" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                {sectionsById.attachments?.heading ?? "Attachments & Refinements"}
              </h2>
              <HubSectionBlock sectionId="attachments" />
            </div>
          </div>
        </section>

        <section id="visits" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                {sectionsById.visits?.heading ?? "Appointments"}
              </h2>
              <HubSectionBlock sectionId="visits" />
            </div>
          </div>
        </section>

        <section id="timeline" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                {sectionsById.timeline?.heading ?? "Timeline"}
              </h2>
              <HubSectionBlock sectionId="timeline" />
            </div>
          </div>
        </section>

        <section id="cost" className="py-16 bg-muted/15">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                {sectionsById.cost?.heading ?? "Cost"}
              </h2>
              <HubSectionBlock sectionId="cost" />
            </div>
          </div>
        </section>

        <section id="finishing" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                {sectionsById.finishing?.heading ?? "After Invisalign"}
              </h2>
              <HubSectionBlock sectionId="finishing" />
            </div>
          </div>
        </section>

        <section id="location" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                Location, Hours, and Directions
              </h2>

              <Card className="border border-border/60 bg-white shadow-sm">
                <CardContent className="p-8 space-y-6">
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
                      <Link to="/beverly-hills-dentist/">Beverly Hills dentist page</Link>
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
                Invisalign Beverly Hills FAQs
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
                {INVISALIGN_BEVERLY_HILLS_REFERENCES.map((reference) => (
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
          tags={["invisalign", "orthodontics", "clear aligners"]}
          title="Invisalign Articles & Tips"
          subtitle="Guidance on wear routines, comfort, and planning for adult alignment"
        />

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Start Invisalign Beverly Hills?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Book a consultation to confirm candidacy, review your timeline, and plan staged tooth movement with clear expectations.
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
                  context="invisalign"
                  variant="compact"
                  currentPage="/invisalign-beverly-hills"
                  title="Explore Related Invisalign Resources"
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

export default InvisalignBeverlyHills;
