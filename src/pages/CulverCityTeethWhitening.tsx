import React from "react";
import { Link } from "react-router-dom";
import PageSEO from "@/components/seo/PageSEO";
import MasterStructuredData from "@/components/seo/MasterStructuredData";
import FAQStructuredData from "@/components/seo/FAQStructuredData";
import WebPageStructuredData from "@/components/WebPageStructuredData";
import VideoHero from "@/components/VideoHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LastUpdated from "@/components/LastUpdated";
import { ROUTE_METADATA } from "@/constants/metadata";
import { SCHEDULING_URL } from "@/constants/urls";
import { getCanonicalUrl } from "@/utils/schemaValidation";
import { ADDRESS, PHONE_NUMBER_DISPLAY, PHONE_NUMBER_E164 } from "@/constants/contact";
import { Clock, MapPin, Sparkles, Shield } from "lucide-react";

const CulverCityTeethWhitening = () => {
  const meta = ROUTE_METADATA["/culver-city-teeth-whitening"];

  const faqs = [
    {
      question: "Do you offer teeth whitening for Culver City patients?",
      answer:
        "Yes. Many patients visit us from Culver City for in-office whitening and custom take-home whitening. Our studio is on Wilshire Blvd in Los Angeles, and we tailor each plan to sensitivity, restorations, and your timeline.",
    },
    {
      question: "How long does in-office whitening take?",
      answer:
        "Most in-office whitening visits take about 60–90 minutes. We start with a shade assessment and comfort steps, then complete timed gel cycles with careful monitoring.",
    },
    {
      question: "Will whitening work if I have veneers or crowns?",
      answer:
        "Whitening gels brighten natural enamel but do not change the shade of porcelain or composite restorations. If you have veneers, bonding, or crowns in the smile zone, we’ll plan your whitening and shade-matching so everything looks consistent.",
    },
    {
      question: "How do you reduce sensitivity?",
      answer:
        "We use a comfort-first protocol: shorter gel cycles when needed, desensitizing options, and clear aftercare instructions. If you’re prone to sensitivity, we can recommend a gradual plan using custom take-home trays.",
    },
    {
      question: "How long do whitening results last?",
      answer:
        "Results vary based on diet and habits, but many patients maintain brightness with periodic touch-ups. We’ll recommend a maintenance schedule based on coffee, tea, wine, and lifestyle factors.",
    },
  ];

  return (
    <>
      <MasterStructuredData
        includeBusiness={true}
        includeDoctor={true}
        includeWebsite={true}
        additionalSchemas={[
          {
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            name: "Professional Teeth Whitening",
            description:
              "Professional teeth whitening near Culver City with in-office treatments and custom take-home options, planned for comfort and enamel health.",
            url: getCanonicalUrl("/culver-city-teeth-whitening"),
            category: "Cosmetic Dentistry",
            provider: { "@id": "https://exquisitedentistryla.com/#business" },
            performer: { "@id": "https://exquisitedentistryla.com/#doctor" },
            bodyLocation: "Teeth",
          },
        ]}
      />

      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/culver-city-teeth-whitening"
        ogImage={meta.ogImage}
      />

      <WebPageStructuredData
        title="Teeth Whitening Near Culver City"
        description="Explore professional teeth whitening options near Culver City, including in-office whitening and custom take-home trays designed for sensitive teeth."
        url="https://exquisitedentistryla.com/culver-city-teeth-whitening"
        breadcrumbs={[
          { name: "Services", url: "https://exquisitedentistryla.com/services/" },
          { name: "Teeth Whitening", url: "https://exquisitedentistryla.com/teeth-whitening/" },
          { name: "Culver City", url: "https://exquisitedentistryla.com/culver-city-teeth-whitening/" },
        ]}
      />

      <FAQStructuredData faqs={faqs} about="Teeth Whitening Near Culver City" />

      <div className="min-h-screen bg-background">
        <VideoHero
          title="Teeth Whitening Near Culver City"
          subtitle="In-office whitening and custom take-home options—planned for comfort and a natural-looking shade."
          primaryCta={{
            text: "Book a Whitening Consultation",
            href: SCHEDULING_URL,
            target: "_blank",
            rel: "noopener noreferrer",
          }}
          height="medium"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <span className="uppercase tracking-[0.35em] text-secondary font-semibold">
                Serving Culver City Patients
              </span>
              <h1 className="mt-6 text-4xl md:text-5xl font-bold text-foreground">
                Teeth Whitening Near Culver City
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                If you’re searching for teeth whitening in Culver City, you don’t need to compromise on comfort or predictability.
                Our Wilshire Blvd dental studio is a straightforward drive from Culver City, and we personalize whitening around sensitivity, existing dental work, and your calendar.
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Choose an in-office whitening visit for a fast refresh, custom take-home trays for gradual brightening, or a hybrid plan that keeps results consistent for photos, presentations, and events.
                You’ll leave with clear aftercare guidance and a maintenance roadmap so your smile stays bright.
              </p>

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
                      <Link to="/contact" className="text-secondary underline-offset-4 hover:underline">
                        directions and hours
                      </Link>
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
                      Most in-office whitening appointments take about 60–90 minutes. If you’re coming from Culver City,
                      we can recommend appointment timing that fits commute patterns.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button asChild>
                        <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                          Book online
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/teeth-whitening">Compare whitening options</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <p className="mt-8 text-sm text-muted-foreground">
                Looking specifically for in-office Zoom? Explore{" "}
                <Link to="/zoom-whitening" className="text-secondary underline-offset-4 hover:underline">
                  Zoom Teeth Whitening in Los Angeles
                </Link>
                .
              </p>
              <LastUpdated date="December 12, 2025" />
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
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
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
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
                <Link to="/culver-city-dentist" className="text-secondary underline-offset-4 hover:underline">
                  Culver City dentist page
                </Link>{" "}
                for more services patients travel in for.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CulverCityTeethWhitening;
