import React from "react";
import { Link } from "react-router-dom";
import PageSEO from "@/components/seo/PageSEO";
import MasterStructuredData from "@/components/seo/MasterStructuredData";
import FAQStructuredData from "@/components/seo/FAQStructuredData";
import WebPageStructuredData from "@/components/WebPageStructuredData";
import ServiceStructuredData from "@/components/ServiceStructuredData";
import VideoHero from "@/components/VideoHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InternalLinkingWidget from "@/components/InternalLinkingWidget";
import LastUpdated from "@/components/LastUpdated";
import { ROUTE_METADATA } from "@/constants/metadata";
import { GOOGLE_MAPS_SHORT_URL, SCHEDULE_CONSULTATION_PATH } from "@/constants/urls";
import { ADDRESS, BUSINESS_HOURS, PHONE_NUMBER_DISPLAY, PHONE_NUMBER_E164 } from "@/constants/contact";
import { Clock, MapPin, Phone, Sparkles, Shield } from "lucide-react";
import { CULVER_CITY_TEETH_WHITENING_FAQS } from "@/data/culver-city-teeth-whitening-faqs";
import {
  CULVER_CITY_TEETH_WHITENING_INTRO_PARAGRAPHS,
  CULVER_CITY_TEETH_WHITENING_REFERENCES
} from "@/data/culver-city-teeth-whitening-hub";

const CulverCityTeethWhitening = () => {
  const meta = ROUTE_METADATA["/culver-city-teeth-whitening"];
  const faqs = CULVER_CITY_TEETH_WHITENING_FAQS;

  return (
    <>
      <MasterStructuredData
        includeBusiness={true}
        includeDoctor={true}
        includeWebsite={true}
      />

      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/culver-city-teeth-whitening"
        ogImage={meta.ogImage}
      />

      <WebPageStructuredData
        title="Culver City Teeth Whitening"
        description={meta.description}
        url="https://exquisitedentistryla.com/culver-city-teeth-whitening"
        breadcrumbs={[
          { name: "Services", url: "https://exquisitedentistryla.com/services/" },
          { name: "Teeth Whitening", url: "https://exquisitedentistryla.com/teeth-whitening/" },
          { name: "Culver City Teeth Whitening", url: "https://exquisitedentistryla.com/culver-city-teeth-whitening/" },
        ]}
      />

      <ServiceStructuredData
        serviceName="Culver City Teeth Whitening"
        description={meta.description}
        url="https://exquisitedentistryla.com/culver-city-teeth-whitening"
      />

      <FAQStructuredData faqs={faqs} about="Culver City Teeth Whitening" />

      <div className="min-h-screen bg-background">
        <VideoHero
          title="Culver City Teeth Whitening"
          subtitle="In-office whitening and custom take-home trays, comfort-first care designed for a natural-looking shade, a short drive from Culver City."
          primaryCta={{
            text: "Schedule Consultation",
            href: SCHEDULE_CONSULTATION_PATH,
          }}
          height="medium"
          preferStaticOnMobile={true}
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <span className="uppercase tracking-[0.35em] text-secondary font-semibold">
                Serving Culver City Patients
              </span>
              <h2 id="overview" className="mt-6 text-3xl md:text-4xl font-bold text-foreground">
                Professional teeth whitening planned for Culver City schedules
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
              {CULVER_CITY_TEETH_WHITENING_INTRO_PARAGRAPHS.map((paragraph) => (
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
                      Whitening options
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#sensitivity">
                      Sensitivity protocol
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#restorations">
                      Veneers & crowns
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#maintenance">
                      Maintenance
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#visit">
                      Plan the visit
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
                      <h2 className="text-lg font-semibold">Plan the Visit</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Most in-office whitening appointments take about 60 to 90 minutes. If you’re coming from Culver City,
                      we can recommend appointment timing that fits your schedule.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button asChild>
                        <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/teeth-whitening/">Compare whitening options</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <p className="mt-8 text-sm text-muted-foreground">
                Looking specifically for in-office Zoom? Explore{" "}
                <Link to="/zoom-whitening/" className="text-secondary underline-offset-4 hover:underline">
                  Zoom Teeth Whitening in Los Angeles
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section id="options" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
                Whitening Options for Culver City Schedules
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="border border-border/60 bg-white shadow-sm">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-secondary" />
                      <h3 className="text-lg font-semibold text-foreground">In-Office Whitening</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Best for fast results ahead of a deadline. We plan gel cycles around comfort, sensitivity, and enamel health.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-border/60 bg-white shadow-sm">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-secondary" />
                      <h3 className="text-lg font-semibold text-foreground">Custom Take‑Home Trays</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Gradual brightening that fits busy weeks. Ideal when you want more control over sensitivity and pace.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-border/60 bg-white shadow-sm">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-secondary" />
                      <h3 className="text-lg font-semibold text-foreground">Hybrid Maintenance</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pair an in-office refresh with take-home touch-ups so your shade stays consistent for the long run.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <p className="mt-10 text-center text-sm text-muted-foreground">
                Not sure which option fits best? Start with the{" "}
                <Link to="/teeth-whitening/" className="text-secondary underline-offset-4 hover:underline">
                  teeth whitening overview
                </Link>{" "}
                and we’ll tailor the plan to sensitivity and existing dental work.
              </p>
            </div>
          </div>
        </section>

        <section id="sensitivity" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                Sensitivity & Comfort Protocol
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border border-border/60 bg-white shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Whitening can cause temporary sensitivity, especially if you’ve experienced cold triggers or past whitening discomfort.
                      We plan gel strength, cycle timing, and aftercare to keep the experience predictable.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Review sensitivity history and enamel condition</li>
                      <li>Timed gel cycles with comfort-first adjustments</li>
                      <li>Desensitizing options and 24 to 48 hour aftercare guidance</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-border/60 bg-white shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      If you’re prone to sensitivity, custom take-home trays let you brighten gradually while controlling the pace.
                      We’ll recommend the option that matches your comfort threshold and timeline.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button variant="outline" asChild>
                        <Link to="/teeth-whitening/">Compare programs</Link>
                      </Button>
                      <Button asChild>
                        <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="restorations" className="py-16 bg-muted/15">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                Whitening with Veneers, Crowns, or Bonding
              </h2>
              <Card className="border border-border/60 bg-white shadow-sm">
                <CardContent className="p-8 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Whitening gels brighten natural enamel, but they don’t change the shade of porcelain or composite restorations. If you have veneers, crowns,
                    or bonding that show when you smile, we’ll plan the target shade so everything looks consistent.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Identify which restorations are in the smile zone</li>
                    <li>Set a realistic target shade for natural teeth</li>
                    <li>Discuss sequencing if replacements are needed for a match</li>
                  </ul>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button variant="outline" asChild>
                      <Link to="/veneers/">Explore veneers</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/cosmetic-dentistry/">Cosmetic dentistry</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="maintenance" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                How Long Results Last & Maintenance
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="border border-border/60 bg-white shadow-sm">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-lg text-foreground">Longevity</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Whitening longevity varies by diet and habits. Many patients refresh in-office whitening about every 12 to 18 months depending on stain exposure.
                  </CardContent>
                </Card>
                <Card className="border border-border/60 bg-white shadow-sm">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-lg text-foreground">Touch-ups</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Custom trays make it easy to do shorter touch-ups when you notice dulling, especially if coffee, tea, or wine are part of your routine.
                  </CardContent>
                </Card>
                <Card className="border border-border/60 bg-white shadow-sm">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-lg text-foreground">Consistency</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    We’ll recommend an aftercare plan that fits real schedules so your shade stays consistent for headshots, meetings, and events.
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="visit" className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                Plan the Visit from Culver City
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border border-border/60 bg-white shadow-sm">
                  <CardContent className="p-8 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Most in-office whitening visits take about 60 to 90 minutes. If you’re working around a deadline, we’ll help you choose the option that fits your
                      timeline and comfort level.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Validated parking is available in our building, and ride-share drop-offs are easy. If you’re unsure what to book, start with a consult. We’ll
                      confirm the best approach for enamel and restorations.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button asChild>
                        <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/contact/">Directions & parking</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border border-border/60 bg-white shadow-sm">
                  <CardContent className="p-8 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Want a faster in-office option? Learn about{" "}
                      <Link to="/zoom-whitening/" className="text-secondary underline-offset-4 hover:underline">
                        Zoom Teeth Whitening in Los Angeles
                      </Link>{" "}
                      and how we personalize the session for sensitivity.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Looking for broader care? Explore our{" "}
                      <Link to="/culver-city-dentist/" className="text-secondary underline-offset-4 hover:underline">
                        Culver City dentist page
                      </Link>{" "}
                      for preventive and cosmetic options patients travel in for.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="location" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
                Location, Hours, and Directions
              </h2>
              <Card className="border border-border/60 bg-white shadow-sm">
                <CardContent className="p-8">
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
                        <a
                          href={`tel:${PHONE_NUMBER_E164}`}
                          className="text-muted-foreground underline-offset-4 hover:underline"
                        >
                          {PHONE_NUMBER_DISPLAY}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-1 h-5 w-5 text-secondary" />
                      <div>
                        <p className="font-semibold text-foreground">Hours</p>
                        <div className="space-y-1 text-muted-foreground">
                          {BUSINESS_HOURS.map(({ label, value }) => (
                            <p key={label}>
                              <span className="font-medium">{label}:</span> {value}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button variant="outline" asChild>
                      <a href={GOOGLE_MAPS_SHORT_URL} target="_blank" rel="noopener noreferrer">
                        Get directions
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={`tel:${PHONE_NUMBER_E164}`}>Call {PHONE_NUMBER_DISPLAY}</a>
                    </Button>
                    <Button asChild>
                      <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-border bg-muted/20 p-6">
                    <p className="text-lg font-semibold text-foreground">{faq.question}</p>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
              <p className="mt-10 text-center text-sm text-muted-foreground">
                Explore our{" "}
                <Link to="/culver-city-dentist/" className="text-secondary underline-offset-4 hover:underline">
                  Culver City dentist page
                </Link>{" "}
                for more services patients travel in for.
              </p>
            </div>
          </div>
        </section>

        <section id="references" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
                References
              </h2>
              <div className="space-y-3 text-muted-foreground">
                {CULVER_CITY_TEETH_WHITENING_REFERENCES.map((reference) => (
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
              <InternalLinkingWidget
                context="whitening"
                variant="expanded"
                currentPage="/culver-city-teeth-whitening"
                title="Explore more whitening resources"
              />
              <LastUpdated date="December 2025" className="text-center" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CulverCityTeethWhitening;
