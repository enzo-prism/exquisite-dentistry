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
import FinancingOptionsSection from '@/components/FinancingOptionsSection';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';
import RelatedArticles from '@/components/RelatedArticles';
import FeaturedReviewWall from '@/components/FeaturedReviewWall';
import SmileGalleryPreview from '@/components/SmileGalleryPreview';
import { featuredReviews } from '@/data/featuredReviews';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { ROUTE_METADATA } from '@/constants/metadata';

const CosmeticDentistry = () => {
  const meta = ROUTE_METADATA['/cosmetic-dentistry'];
  const pillars = [
    {
      icon: <Palette className="h-8 w-8 text-secondary" />,
      title: "Personalized Smile Design",
      description: "Digital simulations and facial analysis help match each treatment to your features and goals."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-secondary" />,
      title: "Natural-Looking Results",
      description: "We combine veneers, whitening, bonding, and alignment so the work blends with the rest of your teeth."
    },
    {
      icon: <Layers className="h-8 w-8 text-secondary" />,
      title: "Planned in the Right Order",
      description: "We sequence restorative, orthodontic, and cosmetic steps so your smile stays healthy at every stage."
    },
    {
      icon: <Camera className="h-8 w-8 text-secondary" />,
      title: "On-Camera and Photo Detail",
      description: "If you appear on camera, we fine-tune shade, translucency, and contour so your teeth look natural under lighting."
    }
  ];

  const smilePaths = [
    {
      name: "Full Smile Makeover",
      details: "Porcelain veneers, Invisalign®, and whitening combined for a balanced, even smile."
    },
    {
      name: "Minor Refinements",
      details: "Bonding, gum contouring, and targeted whitening for small changes with little or no downtime."
    },
    {
      name: "Single-Visit Options",
      details: "Same-day bonding, professional whitening, and Botox® for a gummy smile, often done in one visit."
    }
  ];

  const faqs = [
    {
      question: "How do you plan a cosmetic dentistry makeover?",
      answer: "We start with imaging, 3D scans, and a conversation about what you want to change. We review your photos, look at your facial proportions, and build a treatment plan together. Digital mockups and trial smiles let you preview the result before treatment begins."
    },
    {
      question: "Can cosmetic dentistry be phased?",
      answer: "Yes. Many patients phase treatment around their schedule, an upcoming event, or budget. We handle foundational work first, such as Invisalign or implants, then move to veneers, bonding, and whitening when you are ready."
    },
    {
      question: "Is cosmetic dentistry only about looks?",
      answer: "No. We balance appearance with function. We check your bite, airway, and gum health before recommending treatment, so the result looks good and stays comfortable."
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
          name: 'Cosmetic Dentistry Los Angeles | Smile Makeovers',
          description: 'Cosmetic dentistry in Los Angeles offering veneers, Invisalign, whitening, bonding, and smile makeovers tailored to each patient.',
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
        description="Integrated cosmetic dentistry featuring veneers, Invisalign, whitening, and bonding, tailored to each patient."
        url="/cosmetic-dentistry"
      />

      <FAQStructuredData faqs={faqs} about="Cosmetic Dentistry Los Angeles" />

      <div className="min-h-screen bg-background">
        <VideoHero
          title="Cosmetic Dentistry Los Angeles"
          subtitle="Veneers, whitening, bonding, and Invisalign, planned and finished to look natural."
          primaryCta={{
            text: "Schedule Consultation",
            href: SCHEDULE_CONSULTATION_PATH
          }}
          height="medium"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <span className="uppercase tracking-[0.3em] text-secondary font-semibold">Cosmetic Dentistry</span>
              <h2 className="mt-6 text-4xl md:text-5xl font-bold text-foreground">
                How We Plan a Smile Makeover
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Cosmetic dentistry covers the treatments that change how your teeth look, including veneers, whitening, bonding, and alignment.
                We start by listening to what you want to change, then plan around tooth proportion, facial symmetry, and lip support so the result fits your face.
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                We plan each case with 3D simulations and trial smiles, so you can see the direction before treatment begins.
                Final work is made by our ceramists and refined chairside.
                You receive clear guidance at every step, from the first consultation through the final result.
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
                  Building Your Treatment Plan
                </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                  No two smile makeovers are the same. We build a plan around your timeline, budget, and goals.
                  You might begin with Invisalign to align teeth, move to <Link to="/veneers/" className="text-secondary underline-offset-4 hover:underline">porcelain veneers</Link> for symmetry,
                  and finish with <Link to="/teeth-whitening/" className="text-secondary underline-offset-4 hover:underline">professional whitening</Link>.
                  Each step is documented and previewed, so you know what is coming.
                  For a step-by-step overview, see our <Link to="/smile-makeover-los-angeles/" className="text-secondary underline-offset-4 hover:underline">Smile Makeover in Los Angeles guide</Link>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  When it helps, we coordinate with dermatologists, facial plastic surgeons, and other providers so your smile fits your broader goals.
                  If you are working toward a specific date, such as a wedding, we can plan treatment around it.
                  If your target date is a ceremony or engagement shoot, see our{' '}
                  <Link to="/blog/when-to-start-wedding-smile-prep-los-angeles/" className="text-secondary underline-offset-4 hover:underline">
                    wedding smile prep timeline guide
                  </Link>
                  .
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/client-experience/">
                      See the Patient Experience
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-muted/40 border border-border/60 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Ways to Combine Treatments</h3>
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
                Scheduling and Comfort
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We try to fit treatment around your schedule, with early-morning visits, shorter touch-ups between meetings, and flexible timing when you travel.
                We also offer private scheduling, quiet entry options, and sedation dentistry for patients who want added comfort.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                If you speak or perform, we check speech clarity after treatment.
                If you appear on camera often, we adjust shade, translucency, and contour so your teeth look natural under lighting.
                If you travel, we send you home with a maintenance kit and a way to reach us if something comes up.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Appointments are calm and unhurried.
                After treatment, we explain how to care for your results and what to use between visits.
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
                    A cosmetic consultation begins with a smile analysis ($195, credited toward treatment). Veneers range from $2,200 to $3,000 per tooth, same-day bonding begins at $450 per tooth, and professional whitening packages start at $350. Full smile makeovers are quoted individually, with a timeline and details.
                  </p>
                  <p>
                    We work with financing partners, accept FSA/HSA payments, and offer loyalty pricing for patients who continue with maintenance memberships. Each proposal breaks down lab costs, chairside work, and follow-up care so you can see what you are paying for.
                  </p>
                  <p>
                    After-hours appointments and on-set visits can be arranged when scheduling requires it.
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-6">
                <div className="bg-white border border-border/60 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Caring for Your Results</h3>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Schedule professional cleanings every 3 to 4 months to keep your teeth and gums healthy.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Protect enamel and veneers with a nightguard, especially if you clench or grind.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Use dentist-approved whitening products and avoid abrasive toothpastes, which can dull cosmetic restorations.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Come back for periodic shade refreshes and bonding touch-ups to keep your smile looking consistent.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>If you want new photos after treatment, we can recommend a photographer.</span>
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
                      description: "Custom veneers to even out shape, color, and spacing.",
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
                      description: "See cosmetic dentistry before-and-after results.",
                      popularity: 82
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <FinancingOptionsSection
          className="bg-background pt-6 md:pt-8"
          title="See monthly options while cosmetic treatment investment is top of mind."
          description="If you are comparing veneers, bonding, whitening, or a full smile makeover, our Cherry financing page lets you review monthly payment options right after the investment conversation."
        />

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

        {/* Social Proof: Patient Reviews */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Our Patients Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A selection of reviews from patients at Exquisite Dentistry.
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <FeaturedReviewWall reviews={featuredReviews.slice(0, 6)} />
            </div>
          </div>
        </section>

        {/* Before & After Transformations */}
        <SmileGalleryPreview />

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
                Ready to Talk Through a Smile Makeover?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Whatever your reason for considering cosmetic treatment, we can help you plan a smile that looks natural and fits your goals.
                A consultation is the place to start.
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
