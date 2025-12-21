import React from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Sparkles, Palette, Layers, Camera, Compass } from 'lucide-react';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';
import RelatedArticles from '@/components/RelatedArticles';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { ROUTE_METADATA } from '@/constants/metadata';

const CosmeticDentistry = () => {
  const meta = ROUTE_METADATA['/cosmetic-dentistry'];
  const pillars = [
    {
      icon: <Palette className="h-8 w-8 text-secondary" />,
      title: "Personalized Smile Design",
      description: "Digital simulations, facial analysis, and mood boards align each treatment with your personality and lifestyle."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-secondary" />,
      title: "Elevated Aesthetic Craftsmanship",
      description: "We combine veneers, whitening, bonding, and alignment techniques for layered results that feel natural and luxurious."
    },
    {
      icon: <Layers className="h-8 w-8 text-secondary" />,
      title: "Integrative Treatment Sequencing",
      description: "We orchestrate restorative, orthodontic, and cosmetic phases to ensure your smile is healthy and stunning at every stage."
    },
    {
      icon: <Camera className="h-8 w-8 text-secondary" />,
      title: "Brand & Media Readiness",
      description: "Professionally lit photo sessions, content creation tips, and ongoing maintenance keep your smile on message."
    }
  ];

  const smilePaths = [
    {
      name: "Signature Smile Makeover",
      details: "Porcelain veneers, Invisalign®, and whitening combined to engineer cinematic, balanced smiles."
    },
    {
      name: "Subtle Glow Upgrade",
      details: "Micro-bonding, gum contouring, and targeted whitening deliver refreshing polish without downtime."
    },
    {
      name: "Confidence Refresh",
      details: "Same-day bonding, professional whitening, and Botox® for gummy smiles transform your look in a single visit."
    }
  ];

  const faqs = [
    {
      question: "How do you plan a cosmetic dentistry makeover?",
      answer: "We start with comprehensive imaging, 3D scans, and a lifestyle interview. Together we review inspiration photos, analyze your facial proportions, and co-create a treatment roadmap. Digital mockups and trial smiles let you preview outcomes before we begin definitive care."
    },
    {
      question: "Can cosmetic dentistry be phased?",
      answer: "Absolutely. Many Los Angeles patients phase treatments around production schedules, weddings, or budget considerations. We prioritize foundational work first—like Invisalign or implants—then deliver veneers, bonding, and whitening when you are ready for the reveal."
    },
    {
      question: "Is cosmetic dentistry only about looks?",
      answer: "Our approach balances esthetics with function. Bite analysis, airway considerations, and gum health are evaluated before recommending treatment. The result is a smile that looks incredible and feels comfortable for years."
    }
  ];

  return (
    <>
      <MasterStructuredData
        includeBusiness={true}
        includeWebsite={true}
        additionalSchemas={[{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': getCanonicalUrl('/cosmetic-dentistry') + '#webpage',
          url: getCanonicalUrl('/cosmetic-dentistry'),
          name: 'Cosmetic Dentistry Los Angeles | Luxury Smile Makeovers',
          description: 'Luxury cosmetic dentistry in Los Angeles offering veneers, Invisalign, whitening, bonding, and smile makeovers tailored to individual brands.',
          isPartOf: {
            '@id': 'https://exquisitedentistryla.com/#website'
          },
          about: {
            '@id': 'https://exquisitedentistryla.com/#business'
          },
          specialty: 'Cosmetic Dentistry'
        }]}
      />

      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/cosmetic-dentistry"
        ogImage={meta.ogImage}
      />

      <WebPageStructuredData
        title="Cosmetic Dentistry in Los Angeles"
        description="Explore comprehensive cosmetic dentistry solutions in Los Angeles including veneers, Invisalign, whitening, and bonding."
        url="https://exquisitedentistryla.com/cosmetic-dentistry"
        breadcrumbs={[
          { name: 'Services', url: 'https://exquisitedentistryla.com/services/' },
          { name: 'Cosmetic Dentistry', url: 'https://exquisitedentistryla.com/cosmetic-dentistry/' }
        ]}
      />

      <ServiceStructuredData
        serviceName="Cosmetic Dentistry Services"
        description="Integrated cosmetic dentistry solutions featuring veneers, Invisalign, whitening, and bonding for bespoke smile transformations."
        url="/cosmetic-dentistry"
      />

      <FAQStructuredData faqs={faqs} about="Cosmetic Dentistry Los Angeles" />

      <div className="min-h-screen bg-background">
        <VideoHero
          title="Cosmetic Dentistry Los Angeles"
          subtitle="Curated smile transformations for tastemakers, entrepreneurs, and artists."
          primaryCta={{
            text: "Schedule Consultation",
            href: SCHEDULE_CONSULTATION_PATH
          }}
          height="medium"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <span className="uppercase tracking-[0.3em] text-secondary font-semibold">Bespoke Smile Studio</span>
              <h2 className="mt-6 text-4xl md:text-5xl font-bold text-foreground">
                Where Aesthetics, Wellness, and Storytelling Unite
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Cosmetic dentistry at Exquisite Dentistry is a collaborative art form.
                We listen to what your smile represents—confidence on camera, leadership in the boardroom, joy at family celebrations—and design a plan that amplifies those moments.
                Every detail is considered: tooth proportion, facial symmetry, lip support, and even how your smile interprets under stage lighting.
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Our team blends cutting-edge technology with human-centered artistry.
                We plan each step with 3D simulations, then craft final results by hand with master ceramists and detail-oriented hygienists.
                The journey feels as elevated as the outcome—with spa-inspired amenities, personalized scheduling, and transparent guidance from consultation through reveal.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {pillars.map((pillar) => (
                <Card key={pillar.title} className="border border-border/60 bg-white shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader className="items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <CardTitle className="text-xl text-foreground">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Tailored Smile Journeys
                </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                  No two smile makeovers look alike. We craft curated pathways that align with your timeline, budget, and aspirations.
                  You may begin with Invisalign to perfect alignment, transition to <Link to="/veneers/" className="text-secondary underline-offset-4 hover:underline">porcelain veneers</Link> for symmetry,
                  and finish with <Link to="/teeth-whitening/" className="text-secondary underline-offset-4 hover:underline">professional whitening</Link> for brilliance.
                  Each step is documented and previewed so you remain excited, informed, and empowered.
                  For a step-by-step overview, explore our <Link to="/smile-makeover-los-angeles/" className="text-secondary underline-offset-4 hover:underline">Smile Makeover in Los Angeles guide</Link>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We embrace collaboration, partnering with dermatologists, facial plastic surgeons, and wellness practitioners to ensure your smile harmonizes with your overall aesthetic goals.
                  Our team coordinates with stylists, photographers, and branding agencies to time your reveal with pivotal milestones such as press tours, product launches, or wedding weekends.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/client-experience/">
                      Discover Our Experience
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-muted/40 border border-border/60 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Signature Smile Paths</h3>
                <div className="space-y-6">
                  {smilePaths.map((path) => (
                    <div key={path.name} className="p-4 bg-white rounded-xl shadow-sm border border-border/40">
                      <h4 className="text-lg font-semibold text-foreground mb-2">{path.name}</h4>
                      <p className="text-muted-foreground leading-relaxed">{path.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/15">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Designed for Los Angeles Lifestyles
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Los Angeles is a convergence of creativity, entrepreneurship, and cultural vibrancy.
                Our cosmetic plans honor your unique rhythm—early-morning visits before production, lunchtime touch-ups between meetings, and virtual check-ins while touring.
                We provide discreet concierge scheduling, private entry options, and sedation dentistry for patients seeking added privacy or comfort.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                For performers and speakers, our phonetic analysis ensures speech clarity after treatment.
                If you frequently appear on camera, we customize shade, translucency, and contour to reduce glare and maintain authenticity under stage lighting.
                Travelers receive travel-friendly maintenance kits and direct lines to our team for urgent assistance while away from Los Angeles.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe cosmetic dentistry should feel like a wellness ritual.
                Aromatherapy, guided breathing, and curated playlists calm your nervous system while we craft your dream smile.
                Post-care kits include lip hydration, customized whitening, and tips for sustaining glow between visits.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <Card className="bg-gradient-to-br from-white to-secondary/10 border border-border/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Investment Transparency</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Cosmetic consultations begin with a comprehensive smile analysis ($195, credited toward treatment). Veneers range from $2,200–$3,000 per tooth, same-day bonding begins at $450 per tooth, and professional whitening packages start at $350. Full smile makeovers are custom quoted with detailed timelines and deliverables.
                  </p>
                  <p>
                    We collaborate with flexible financing partners, accept FSA/HSA payments, and offer loyalty pricing for patients continuing with maintenance memberships. Each proposal includes a breakdown of laboratory costs, chairside artistry, and follow-up care so you can invest with confidence.
                  </p>
                  <p>
                    Elite concierge clients enjoy after-hours appointments, on-set visits, and coordinated services with trusted beauty and wellness providers throughout Los Angeles.
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-6">
                <div className="bg-white border border-border/60 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Cosmetic Care Playbook</h3>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Schedule professional cleanings every 3–4 months to maintain luster and gum health.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Protect enamel and veneers with nightguards, especially if you perform or clench during high-pressure projects.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Use dentist-approved whitening products and avoid abrasive toothpastes that dull cosmetic restorations.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Return for periodic shade refreshes and bonding touch-ups to keep your smile aligned with your evolving brand.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Capture new professional headshots after treatment—our team coordinates mini sessions or provides trusted photographer referrals.</span>
                    </li>
                  </ul>
                </div>

                <ServiceRecommendation
                  currentService="Cosmetic Dentistry"
                  context="combination"
                  recommendations={[
                    {
                      title: "Porcelain Veneers",
                      href: "/veneers/",
                      description: "Handcrafted veneers for cinematic smile transformations.",
                      combination: true,
                      popularity: 76
                    },
                    {
                      title: "Invisalign",
                      href: "/invisalign",
                      description: "Align teeth before cosmetic finishing for balanced results.",
                      popularity: 63
                    },
                    {
                      title: "Smile Gallery",
                      href: "/smile-gallery",
                      description: "See cosmetic dentistry before-and-after journeys across LA.",
                      popularity: 82
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Cosmetic Dentistry FAQs
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

        {/* Related Articles Section */}
        <RelatedArticles
          tags={['cosmetic dentistry', 'smile makeover', 'veneers', 'whitening']}
          category="Cosmetic Dentistry"
          title="Cosmetic Dentistry Resources"
          subtitle="Expert insights on smile makeovers, veneers, whitening, and more"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready for a Smile That Reflects Your Vision?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Whether you are stepping into a new role, launching a brand, or celebrating a milestone,
                we are here to design a smile that matches your ambition and artistry.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/testimonials/">
                    Hear From Cosmetic Patients
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4">
            <InternalLinkingWidget
              context="general"
              variant="expanded"
              title="Discover additional cosmetic resources"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default CosmeticDentistry;
