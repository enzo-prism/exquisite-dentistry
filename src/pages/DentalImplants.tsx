import React from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Shield, Anchor, Building2, Smile, HeartPulse, MapPin, Phone, Clock } from 'lucide-react';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';
import RelatedArticles from '@/components/RelatedArticles';
import LastUpdated from '@/components/LastUpdated';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { GOOGLE_MAPS_SHORT_URL, SCHEDULING_URL } from '@/constants/urls';
import { ROUTE_METADATA } from '@/constants/metadata';
import { DENTAL_IMPLANT_FAQS } from '@/data/dental-implants-faqs';
import {
  ADDRESS,
  BUSINESS_HOURS,
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_E164
} from '@/constants/contact';
import {
  DENTAL_IMPLANTS_HUB_INTRO_PARAGRAPHS,
  DENTAL_IMPLANTS_REFERENCES
} from '@/data/dental-implants-hub';

const DentalImplants = () => {
  const meta = ROUTE_METADATA['/dental-implants'];
  const implantAdvantages = [
    {
      icon: <Anchor className="h-8 w-8 text-secondary" />,
      title: "Stable & Natural",
      description: "Titanium or zirconia implants fuse with bone, delivering a natural bite and confident speech."
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Protects Facial Structure",
      description: "Implants stimulate bone to preserve facial contours, preventing premature aging."
    },
    {
      icon: <Building2 className="h-8 w-8 text-secondary" />,
      title: "Custom Engineering",
      description: "3D imaging, surgical guides, and digital wax-ups create precision restorations tuned to your smile."
    },
    {
      icon: <HeartPulse className="h-8 w-8 text-secondary" />,
      title: "Wellness Driven",
      description: "Sedation options, nutrition guidance, and integrative care ensure a holistic implant journey."
    }
  ];

  const treatmentPathway = [
    {
      stage: "Comprehensive Discovery",
      details: "Cone beam CT scans, digital impressions, and bite analysis chart a roadmap unique to your bone density, gum health, and restorative goals."
    },
    {
      stage: "Biologic Optimization",
      details: "When needed, we elevate the site with platelet-rich fibrin, bone grafting, or sinus lifts curated for West Coast lifestyles and recovery timelines."
    },
    {
      stage: "Guided Placement",
      details: "Surgical guides derived from your 3D plan position implants with millimeter accuracy, reducing chair time and enhancing long-term stability."
    },
    {
      stage: "Restorative Reveal",
      details: "We deliver bespoke crowns, bridges, or overdentures fabricated to mirror natural enamel, supported by micro-adjustments for ideal occlusion."
    }
  ];

  const faqs = DENTAL_IMPLANT_FAQS;

  return (
    <>
      <MasterStructuredData
        includeBusiness={true}
        includeDoctor={true}
        includeWebsite={true}
        additionalSchemas={[{
          '@context': 'https://schema.org',
          '@type': 'MedicalProcedure',
          name: 'Dental Implant Therapy',
          description: 'Dental implants in Los Angeles with 3D imaging, restoration-first planning, and custom implant crowns or bridges.',
          url: getCanonicalUrl('/dental-implants'),
          category: 'Restorative Dentistry',
          provider: {
            '@id': 'https://exquisitedentistryla.com/#business'
          },
          performer: {
            '@id': 'https://exquisitedentistryla.com/#doctor'
          },
          bodyLocation: 'Oral cavity',
          procedureType: 'ImplantPlacement',
          followup: ['Post-operative check at 48 hours', 'Osseointegration assessment at 8-12 weeks', 'Restorative delivery'],
          expectedPrognosis: 'Long-term tooth replacement with proper maintenance and follow-up.'
        }]}
      />

      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/dental-implants"
        ogImage={meta.ogImage}
      />

      <WebPageStructuredData
        title="Dental Implants in Los Angeles"
        description={meta.description}
        url="https://exquisitedentistryla.com/dental-implants"
        breadcrumbs={[
          { name: 'Services', url: 'https://exquisitedentistryla.com/services/' },
          { name: 'Dental Implants', url: 'https://exquisitedentistryla.com/dental-implants/' }
        ]}
      />

      <ServiceStructuredData
        serviceName="Los Angeles Dental Implants"
        description="Permanent tooth replacement using titanium or zirconia implants paired with custom cosmetic restorations."
        url="/dental-implants"
        priceRange="$$$$"
        category="Restorative Dentistry"
      />

      <FAQStructuredData faqs={faqs} about="Dental Implants in Los Angeles" />

      <div className="min-h-screen bg-background">
        <VideoHero
          title="Dental Implants in Los Angeles"
          subtitle="Guided planning, custom implant crowns and bridges, and comfort-first support—built around long-term bite stability."
          primaryCta={{
            text: "Book a Dental Implant Appointment",
            href: SCHEDULING_URL,
            target: "_blank",
            rel: "noopener noreferrer"
          }}
          height="medium"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <span className="uppercase tracking-[0.3em] text-secondary font-semibold">Permanent Tooth Replacement</span>
              <h2 id="overview" className="mt-6 text-3xl md:text-4xl font-bold text-foreground">
                Dental Implant Planning & Restorations in Los Angeles
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Clinically reviewed by{' '}
                <Link to="/about" className="text-secondary underline-offset-4 hover:underline">
                  Dr. Alexie Aguil, DDS
                </Link>{' '}
                ·{' '}
                <Link to="/editorial-policy" className="text-secondary underline-offset-4 hover:underline">
                  Editorial policy
                </Link>
              </p>
              {DENTAL_IMPLANTS_HUB_INTRO_PARAGRAPHS.map((paragraph) => (
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
                      Implant options
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#timeline">
                      Timeline & steps
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#cost">
                      Cost factors
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#aftercare">
                      Recovery & aftercare
                    </a>
                  </li>
                  <li>
                    <a className="text-primary underline-offset-4 hover:underline" href="#location">
                      Location
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

              <div
                id="location"
                className="mx-auto mt-10 max-w-4xl rounded-2xl border border-border bg-white p-6 text-left shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Visit Our Office</p>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">Wilshire Blvd, Los Angeles</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Our office is located at {ADDRESS}. If you have questions about dental implants in Los Angeles, you can call or book online.
                </p>

                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-secondary" />
                    <div>
                      <p className="font-semibold text-foreground">Address</p>
                      <a
                        href={GOOGLE_MAPS_SHORT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground underline-offset-4 hover:underline"
                      >
                        {ADDRESS}
                      </a>
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
                    <a href={`tel:${PHONE_NUMBER_E164}`}>
                      Call {PHONE_NUMBER_DISPLAY}
                    </a>
                  </Button>
                  <Button asChild>
                    <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                      Book online
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {implantAdvantages.map((adv) => (
                <Card key={adv.title} className="border border-border/60 bg-white shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader className="items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                      {adv.icon}
                    </div>
                    <CardTitle className="text-xl text-foreground">{adv.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center leading-relaxed">{adv.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="timeline" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Timeline & Treatment Steps
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Most implant plans follow the same core phases: exam and imaging, planning and any needed foundation work, placement, healing, then the final restoration.
                  We coordinate the surgical and restorative steps so your implant crown or bridge emerges naturally and your bite feels balanced.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Healing timelines vary by case, bone health, and whether grafting is recommended. We’ll outline what changes your timeline and how we keep you comfortable at every visit.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <a
                      href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Begin Implant Planning
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/transformation-stories">
                      View Restoration Stories
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-muted/40 border border-border/60 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Treatment Pathway</h3>
                <div className="space-y-6">
                  {treatmentPathway.map((phase) => (
                    <div key={phase.stage} className="p-4 bg-white rounded-xl shadow-sm border border-border/40">
                      <h4 className="text-lg font-semibold text-foreground mb-2">{phase.stage}</h4>
                      <p className="text-muted-foreground leading-relaxed">{phase.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="options" className="py-16 bg-muted/15">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Implant Options (Single Tooth, Bridge, Full-Arch)
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                A single missing tooth is often replaced with an implant crown designed to match neighboring teeth without relying on adjacent tooth support.
                When multiple teeth are missing, an implant-supported bridge can replace a span efficiently. For full-smile restoration, full-arch options can stabilize a complete set of teeth with a fixed or removable design depending on your needs.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                If you’re comparing implants to other tooth replacement options, a <Link to="/dental-bridge" className="text-secondary underline-offset-4 hover:underline">dental bridge</Link> may be appropriate in select scenarios.
                For a practical comparison, see our <Link to="/blog/dental-implants-vs-bridge-los-angeles" className="text-secondary underline-offset-4 hover:underline">implants vs bridge guide</Link>.
                We’ll review your bite, gum health, and long-term maintenance preferences to recommend the most stable and predictable option for your situation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Many patients coordinate implants with <Link to="/cosmetic-dentistry" className="text-secondary underline-offset-4 hover:underline">cosmetic dentistry</Link>—like whitening or veneers—after foundational function is restored.
              </p>
            </div>
          </div>
        </section>

        <section id="cost" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <Card className="bg-gradient-to-br from-white to-secondary/10 border border-border/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Investment & Financial Guidance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Implant fees vary because every plan is built from your imaging, bone health, and the type of restoration you need.
                    After a consultation, we’ll provide a clear treatment plan and a detailed estimate you can compare confidently.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Number of teeth:</strong> a single crown vs. a multi-tooth bridge vs. full-arch replacement.</li>
                    <li><strong>Foundation work:</strong> extractions, bone grafting, or sinus lift needs when indicated.</li>
                    <li><strong>Materials:</strong> crown and bridge materials, and whether pink esthetic ceramics are needed.</li>
                    <li><strong>Comfort options:</strong> sedation planning and appointment pacing.</li>
                  </ul>
                  <p>
                    If you’d like to spread payments over time, ask about financing options during your visit. If you have dental insurance, we can help submit documentation to support any applicable implant benefits.
                  </p>
                  <p>
                    Want a deeper breakdown? Read our <Link to="/blog/dental-implant-cost-los-angeles" className="text-secondary underline-offset-4 hover:underline">dental implant cost guide for Los Angeles</Link>.
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-6">
                <div id="aftercare" className="bg-white border border-border/60 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Implant Success Essentials</h3>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <Smile className="w-5 h-5 text-secondary mt-1" />
                      <span>Plan for soft foods at first and follow your post-op instructions for diet and activity.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Smile className="w-5 h-5 text-secondary mt-1" />
                      <span>Avoid smoking and vaping during healing; we’ll support you with strategies and alternatives if needed.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Smile className="w-5 h-5 text-secondary mt-1" />
                      <span>Keep the area clean with gentle brushing and flossing; we’ll share the right tools and timing for your case.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Smile className="w-5 h-5 text-secondary mt-1" />
                      <span>Stay on schedule with maintenance visits so we can clean around implants and monitor bite stability.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Smile className="w-5 h-5 text-secondary mt-1" />
                      <span>Wear nightguards or occlusal guards to protect restorations if you grind or clench.</span>
                    </li>
                  </ul>
                </div>

                <ServiceRecommendation
                  currentService="Dental Implants"
                  context="complement"
                  recommendations={[
                    {
                      title: "Cosmetic Dentistry",
                      href: "/cosmetic-dentistry",
                      description: "Blend implants with veneers and bonding for seamless esthetics.",
                      popularity: 61,
                      combination: true
                    },
                    {
                      title: "Emergency Dentist",
                      href: "/emergency-dentist",
                      description: "Immediate care if you experience trauma affecting existing implants or teeth.",
                      popularity: 32
                    },
                    {
                      title: "Client Experience",
                      href: "/client-experience",
                      description: "See how we elevate comfort and support during extensive treatments.",
                      popularity: 54
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Dental Implant FAQs
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`} className="border border-border/60 rounded-lg">
                    <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section id="references" className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-semibold text-foreground">References</h2>
              <p className="mt-3 text-muted-foreground">
                These resources provide additional background on dental implants and oral health.
              </p>
              <ul className="mt-6 list-disc space-y-2 pl-6 text-muted-foreground">
                {DENTAL_IMPLANTS_REFERENCES.map((reference) => (
                  <li key={reference.href}>
                    <a
                      href={reference.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary underline-offset-4 hover:underline"
                    >
                      {reference.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        <RelatedArticles
          tags={['dental implants', 'implants', 'missing teeth', 'restorative']}
          category="Restorative Dentistry"
          title="Dental Implant Resources"
          subtitle="Expert guidance on implant procedures, costs, and what to expect"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Reclaim Confidence with Dental Implants
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Your smile is too important to compromise. Let us craft an implant solution that restores strength, beauty, and peace of mind—right here in Los Angeles.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <a
                    href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule Implant Consultation
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/testimonials">
                    Hear Implant Success Stories
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-5xl rounded-3xl border border-secondary/20 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-foreground">Dental implants near Santa Monica</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Coming from Santa Monica? Explore implant options built around Westside schedules, including 3D imaging, guided placement, and restoration-first planning.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button variant="outline" asChild>
                  <Link to="/santa-monica-dental-implants">Santa Monica Implant Guide</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/west-la-dentist">West LA Dentist Page</Link>
                </Button>
              </div>
            </div>
            <InternalLinkingWidget
              context="implants"
              variant="expanded"
              title="Continue your restorative dentistry research"
            />
            <LastUpdated date="December 2025" className="text-center" />
          </div>
        </section>
      </div>
    </>
  );
};

export default DentalImplants;
