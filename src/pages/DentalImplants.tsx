import React from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Shield, Anchor, Building2, Smile, HeartPulse } from 'lucide-react';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { SCHEDULING_URL } from '@/constants/urls';

const DentalImplants = () => {
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

  const faqs = [
    {
      question: "Am I a candidate for dental implants?",
      answer: "Most healthy adults qualify for implants if they have sufficient bone density or are willing to complete grafting. During consultation, we evaluate medical history, medications, and lifestyle habits. Many smokers, night grinders, and patients with previous restorations can still pursue implants with the right preparation."
    },
    {
      question: "How long does the implant process take?",
      answer: "Single implants typically require 3–6 months from placement to final crown, while full-arch solutions may take 6–9 months. We phase treatment to maintain your appearance and function at every stage, often providing temporary teeth the same day."
    },
    {
      question: "What is recovery like?",
      answer: "Most patients resume daily routines within 24–48 hours. We provide chilled compresses, soft meal plans, and virtual check-ins to ensure healing stays on track. Pain is usually mild, managed with over-the-counter medication, and downtime is minimal."
    }
  ];

  return (
    <>
      <MasterStructuredData
        includeBusiness={true}
        includeWebsite={true}
        additionalSchemas={[{
          '@context': 'https://schema.org',
          '@type': 'MedicalProcedure',
          name: 'Dental Implant Therapy',
          description: 'Comprehensive dental implant treatment in Los Angeles featuring guided surgery, regenerative support, and bespoke restorations.',
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
        title="Dental Implants Los Angeles | Permanent Tooth Replacement"
        description="Dental implants in Los Angeles with guided surgery, bone regeneration, and custom restorations that restore chewing power and confident smiles."
        keywords="dental implants Los Angeles, implant dentist LA, tooth replacement, full arch implants LA"
        path="/dental-implants"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/dc09fcc1-c9b0-4ab9-9244-4bbdffa8b5cb.webp"
      />

      <WebPageStructuredData
        title="Dental Implants in Los Angeles"
        description="Restore your smile with comprehensive dental implant therapy in Los Angeles. Experience guided surgery, regenerative techniques, and bespoke cosmetic restorations."
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
      />

      <FAQStructuredData faqs={faqs} about="Dental Implants Los Angeles" />

      <div className="min-h-screen bg-background">
        <VideoHero
          title="Dental Implants Los Angeles"
          subtitle="Rebuild your smile with precision-engineered implants and luxury-level care."
          primaryCta={{
            text: "Book an Appointment",
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
              <h1 className="mt-6 text-4xl md:text-5xl font-bold text-foreground">
                Implant Dentistry Tailored to Los Angeles Lives
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                At Exquisite Dentistry, dental implants are more than replacements—they are an opportunity to rewrite your oral health story.
                Our restorative team blends city-leading technology, regenerative biology, and concierge comforts to deliver strong, natural-looking smiles.
                Whether you lost a tooth to sports, decay, or prior dentistry, we rebuild your bite so you can enjoy culinary adventures,
                speak flawlessly in meetings, and smile effortlessly in photos.
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Every implant plan is crafted around your goals. Single-tooth solutions preserve surrounding teeth.
                Implant bridges streamline care for multiple gaps, while overdentures and All-on-4 style arches secure full smiles with minimal downtime.
                We partner with top oral surgeons and periodontists in Los Angeles when collaboration benefits your outcome,
                staying by your side as the restorative conductor from start to long-term maintenance.
              </p>
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

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Your Implant Blueprint
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  From West Hollywood creatives to Mid-Wilshire families, our implant patients trust us to choreograph each detail.
                  We plan surgical and restorative phases simultaneously, preserving gum contours and ensuring crowns emerge naturally.
                  If you need temporary smiles during healing, custom-crafted provisionals maintain esthetics and speech,
                  empowering you to keep filming, presenting, or hosting without interruption.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Nutrition and wellness are integral to success. We provide anti-inflammatory meal guides, supplement recommendations,
                  and lymphatic support resources to accelerate recovery.
                  For patients restoring multiple teeth, we coordinate sedation dentistry, arrange chauffeured transportation,
                  and collaborate with your medical team when needed.
                  The result is a restorative experience that feels as elevated as it is clinically advanced.
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

        <section className="py-16 bg-muted/15">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Implant Solutions for Every Smile
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Missing a single tooth? We anchor a custom crown that mirrors adjacent enamel without touching surrounding teeth.
                Need to stabilize a denture? Mini implants and overdenture bars provide rock-solid security with minimal hardware visibility.
                Considering a dramatic transformation? Full-arch implant bridges engineered with zirconia or nano-ceramic materials deliver magazine-worthy esthetics and decades of durability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We also specialize in implant rescue cases—correcting aging restorations, treating peri-implantitis, and upgrading bulky prosthetics.
                Our lab partners craft lifelike pink ceramics to mimic natural gum tissue, creating seamless transitions even in high-smile patients.
                Pair implants with <Link to="/cosmetic-dentistry" className="text-secondary underline-offset-4 hover:underline">cosmetic dentistry</Link> like veneers or whitening for a complete smile renaissance.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Recovery is supported with guided breathing exercises, herbal compress kits, and 24/7 access to our implant concierge.
                Tele-dentistry check-ins mean you are never without support, even if you are traveling between Los Angeles, New York, or international sets.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <Card className="bg-gradient-to-br from-white to-secondary/10 border border-border/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Investment & Financial Guidance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Single-tooth implants begin at $3,800 and include surgical placement, components, and final crowns.
                    Implant bridges range from $7,500 to $12,000 depending on span and materials.
                    Full-arch implant solutions begin at $19,000 per arch, with transparent pricing for anesthesia, provisionals, and final prosthetics.
                  </p>
                  <p>
                    We collaborate with third-party financing partners offering low-APR and interest-free options.
                    Dental insurance plans with implant benefits are maximized by our billing team, and FSA/HSA reimbursements are supported with detailed documentation.
                  </p>
                  <p>
                    Patients combining implants with orthodontics or cosmetic dentistry receive bundled savings and customized timelines.
                    We also provide corporate invoicing and travel-friendly scheduling for relocating professionals.
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-6">
                <div className="bg-white border border-border/60 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Implant Success Essentials</h3>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <Smile className="w-5 h-5 text-secondary mt-1" />
                      <span>Adopt a soft, nutrient-rich diet for 48 hours—think smoothies, broths, and protein-rich purees.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Smile className="w-5 h-5 text-secondary mt-1" />
                      <span>Avoid smoking and vaping during healing; we’ll support you with strategies and alternatives if needed.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Smile className="w-5 h-5 text-secondary mt-1" />
                      <span>Maintain impeccable hygiene with sonic brushing, water flossing, and antimicrobial rinses we prescribe.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Smile className="w-5 h-5 text-secondary mt-1" />
                      <span>Attend scheduled maintenance visits for professional cleaning around implants and bite adjustments.</span>
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

        <section className="py-16 bg-muted/20">
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
            <InternalLinkingWidget
              context="general"
              variant="expanded"
              title="Continue your restorative dentistry research"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default DentalImplants;
