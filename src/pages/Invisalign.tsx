import React from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Clock, Sparkles, Shield, Smile, Compass } from 'lucide-react';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';
import { getCanonicalUrl } from '@/utils/schemaValidation';

const Invisalign = () => {
  const benefits = [
    {
      icon: <Smile className="h-8 w-8 text-secondary" />,
      title: "Discreet & Confident",
      description: "Crystal-clear aligners keep treatment virtually invisible in photos, meetings, and nights out in Los Angeles."
    },
    {
      icon: <Clock className="h-8 w-8 text-secondary" />,
      title: "Predictable Timelines",
      description: "Digital treatment plans and weekly aligner changes get most adults to the finish line in 6–12 months."
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Comfortable Progress",
      description: "Smooth medical-grade plastic minimizes irritation and eliminates emergencies from broken brackets."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-secondary" />,
      title: "Lifestyle Friendly",
      description: "Remove aligners to enjoy restaurant tastings, audition work, and daily coffee without restrictions."
    }
  ];

  const milestones = [
    {
      step: "Week 0",
      title: "Digital Smile Mapping",
      description: "iTero 3D scans create a precise model of your bite, while we preview tooth movements with ClinCheck simulations."
    },
    {
      step: "Weeks 2-6",
      title: "Trackable Progress",
      description: "Receive micro-adjusted aligners that guide teeth gently into position; virtual check-ins keep you on pace between in-person visits."
    },
    {
      step: "Weeks 12-24",
      title: "Refinements & Detailing",
      description: "Attachments and IPR, when indicated, sculpt finishing details for film-ready symmetry and balanced occlusion."
    },
    {
      step: "Graduation",
      title: "Retention & Glow-Up",
      description: "Whitening touch-ups, Vivera retainers, and smile contouring deliver camera-ready confidence and lasting stability."
    }
  ];

  const faqs = [
    {
      question: "How does Invisalign® treatment compare to braces?",
      answer: "Both systems move teeth with controlled force, but Invisalign uses removable aligners instead of fixed brackets. You can eat normally, brush easily, and avoid emergencies from broken wires while still achieving precise, orthodontist-driven tooth movement."
    },
    {
      question: "What is the typical Invisalign timeline in Los Angeles?",
      answer: "Most cosmetic alignment cases finish within 6–12 months, while more complex bite corrections may take 18 months. We stage your plan around work, production schedules, and major life events so treatment never interrupts the moments that matter."
    },
    {
      question: "Is Invisalign comfortable for speaking on camera or at events?",
      answer: "Yes. The trays hug teeth closely, so you can present, sing, or record podcasts without the speech changes caused by bulky appliances. Regular wear—20 to 22 hours per day—keeps your articulation crisp after just a day or two of acclimating."
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
          name: 'Invisalign Treatment',
          description: 'Clear aligner orthodontic therapy designed for busy Los Angeles professionals seeking discreet smile alignment.',
          url: getCanonicalUrl('/invisalign'),
          category: 'Orthodontic Procedure',
          bodyLocation: {
            '@type': 'BodySystem',
            name: 'Oral and Dental System'
          },
          provider: {
            '@id': 'https://exquisitedentistryla.com/#business'
          },
          performer: {
            '@id': 'https://exquisitedentistryla.com/#doctor'
          },
          recognizesCondition: [
            'Crowded teeth',
            'Spacing issues',
            'Overbite',
            'Crossbite',
            'Open bite'
          ],
          expectedPrognosis: 'Straighter teeth and balanced bite in 6-18 months with proper aligner wear.',
          procedureType: 'Clear Aligner Therapy'
        }]}
      />

      <PageSEO
        title="Invisalign Los Angeles | Clear Aligner Dentist"
        description="Invisalign in Los Angeles guided by Dr. Alexie Aguil delivers discreet aligner treatment, digital planning, and concierge check-ins for busy professionals."
        keywords="Invisalign Los Angeles, clear aligners LA, Invisalign dentist LA, adult orthodontics, clear braces"
        path="/invisalign"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/dc09fcc1-c9b0-4ab9-9244-4bbdffa8b5cb.webp"
      />

      <WebPageStructuredData
        title="Invisalign Treatment in Los Angeles"
        description="Experience Invisalign clear aligners in Los Angeles with precision digital planning, concierge check-ins, and flexible scheduling that fits your lifestyle."
        url="https://exquisitedentistryla.com/invisalign"
        breadcrumbs={[
          { name: 'Services', url: 'https://exquisitedentistryla.com/services/' },
          { name: 'Invisalign', url: 'https://exquisitedentistryla.com/invisalign/' }
        ]}
      />

      <ServiceStructuredData
        serviceName="Invisalign Clear Aligners"
        description="Discreet clear aligner therapy designed to align teeth comfortably while fitting perfectly into fast-paced Los Angeles schedules."
        url="/invisalign"
        priceRange="$$$"
      />

      <FAQStructuredData
        faqs={faqs}
        about="Invisalign Clear Aligners Los Angeles"
      />

      <div className="min-h-screen bg-background">
        <VideoHero
          title="Invisalign® Clear Aligners"
          subtitle="Discreet, digitally guided smile alignment tailored to Los Angeles lifestyles."
          primaryCta={{
            text: "Start Your Smile Scan",
            href: "https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null",
            target: "_blank",
            rel: "noopener noreferrer"
          }}
          secondaryCta={{
            text: "Virtual Invisalign Consult",
            href: "/contact"
          }}
          height="medium"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="mb-10 text-center">
                <span className="uppercase tracking-widest text-secondary font-semibold">Los Angeles Invisalign Experts</span>
                <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">
                  Confident Smiles, Zero Compromise
                </h1>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Clear aligner therapy at Exquisite Dentistry pairs world-class Invisalign technology with bespoke concierge care.
                Dr. Alexie Aguil plans every movement with iTero digital scans, so you can preview results before wearing your first tray.
                We map treatment around filming schedules, launch events, red-carpet appearances, and long production days, ensuring your smile journey enhances—not interrupts—your Los Angeles lifestyle.
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Whether you are preparing for a major career milestone, recovering from years of grinding, or pursuing a healthier bite after veneers,
                Invisalign aligners deliver precise movements without the brackets and wires of traditional orthodontics.
                You will swap to a fresh set of trays every 7 to 10 days, meeting virtually or in-person for progress checks that keep you on track.
                When paired with cosmetic finishing touches like whitening or edge recontouring, Invisalign becomes the centerpiece of a full smile glow-up.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Professionals Choose Invisalign</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Every aligner set is custom-trimmed for comfort, stain-resistant for on-camera confidence, and supported by a concierge dental team that anticipates your needs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="border border-border/60 bg-white shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader className="space-y-4 pb-4">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl text-center text-foreground">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {benefit.description}
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
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Concierge Orthodontics with Local Flair
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Invisalign patients at our Wilshire Boulevard studio benefit from flexible morning and late-afternoon appointments, same-day attachment repairs, and aligner delivery directly to your home or production lot.
                  We coordinate with talent managers, stylists, and event planners so your transformation aligns with brand partnerships and public appearances.
                  Our in-office streaming lounge, noise-canceling headphones, and aromatherapy menu make every visit feel like a treat, not a clinical obligation.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Dr. Aguil has completed hundreds of clear aligner cases across West Hollywood, Beverly Hills, and central Los Angeles.
                  Because she personally reviews each ClinCheck stage, refinements are minimized, and you stay confident that every detail contributes to a polished, balanced smile.
                  Pair Invisalign with <Link to="/veneers" className="text-secondary underline-offset-4 hover:underline">hand-layered porcelain veneers</Link> or <Link to="/teeth-whitening" className="text-secondary underline-offset-4 hover:underline">LED-accelerated whitening</Link> for a comprehensive cosmetic plan.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <a href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" target="_blank" rel="noopener noreferrer">
                      Reserve Consultation
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/transformation-stories/nick-invisalign">
                      See Nick&apos;s Invisalign Journey
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-muted/40 border border-border/60 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Invisalign Timeline</h3>
                <p className="text-muted-foreground mb-6">
                  A clear roadmap keeps your treatment efficient and empowers you to maintain momentum while juggling Los Angeles life.
                </p>
                <div className="space-y-6">
                  {milestones.map((milestone) => (
                    <div key={milestone.step} className="relative pl-12">
                      <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full border border-secondary flex items-center justify-center font-semibold text-secondary">
                        {milestone.step}
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">{milestone.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Customized for Downtown, West Hollywood, and Beverly Hills Smiles
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Every aligner case starts with a deep dive into your functional goals, airway considerations, and aesthetic preferences.
                We analyze facial proportions, lip dynamics, and even how your smile photographs under direct lighting.
                Aligners are trimmed below the gumline for comfort and optimized pressure, while etched attachments blend into enamel so closely that HD cameras barely detect them.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                For professionals managing demanding travel schedules, we bundle aligner sets and ship replacements when you are on-location.
                Musicians and voice-over artists appreciate the speech coaching we provide during initial delivery, ensuring aligner transitions do not compromise performance quality.
                If you are pairing Invisalign with restorative dentistry, our restorative-phasing protocols coordinate aligner wear with implant surgery or veneer delivery to avoid unnecessary delays.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We also curate transformation packages that integrate smile whitening, <Link to="/testimonials" className="text-secondary underline-offset-4 hover:underline">patient-proven comfort amenities</Link>, and Vivera retainer subscriptions.
                After treatment, our team schedules quarterly digital check-ins to ensure retainers fit perfectly and to plan any enhancements before important events.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <Card className="bg-gradient-to-br from-white to-secondary/5 shadow-lg border-border/60">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Investment & Flexible Payments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Comprehensive Invisalign treatment with Dr. Aguil ranges from $4,500 to $6,800 depending on case complexity and whether refinements or whitening are bundled into your plan.
                    We honor FSA/HSA payments, accept major insurances with orthodontic benefits, and collaborate with third-party lenders for 0% promotional financing.
                  </p>
                  <p>
                    Because your smile is a long-term asset, we outline every cost in a transparent treatment calendar that covers aligners, attachments, refinements, retainers, and in-office comfort upgrades.
                    A dedicated treatment concierge acts as your point of contact for scheduling, billing questions, and lifestyle adjustments throughout the process.
                  </p>
                  <p>
                    Clients who combine Invisalign with veneers, implants, or whitening receive bundled pricing and prioritized appointment blocks.
                    Ask about our &ldquo;LA Smile Set&rdquo; package, which integrates Invisalign, in-office Zoom whitening, and cosmetic bonding for a camera-ready debut.
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-6">
                <div className="bg-white border border-border/60 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">The Invisalign Essentials</h3>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Wear aligners 20–22 hours daily, removing them only for meals, coffee tastings, and your brushing routine.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Switch to the next set every 7–10 days as directed; the MyInvisalign app keeps you on schedule with tailored reminders.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Clean aligners morning and night using fragrance-free foam or gentle soap to keep them clear and odor-free.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Store trays in ventilated cases when dining out in West Hollywood or attending red-carpet events to avoid warping or misplacing them.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Update us promptly if a tray cracks or is lost—we 3D print backups quickly to keep you on track without losing progress.</span>
                    </li>
                  </ul>
                </div>

                <ServiceRecommendation
                  currentService="Invisalign"
                  context="complement"
                  recommendations={[
                    {
                      title: "Porcelain Veneers",
                      href: "/veneers",
                      description: "Refine tooth shape and brightness after alignment for a flawless finish.",
                      combination: true,
                      priceRange: "$$$$",
                      popularity: 62
                    },
                    {
                      title: "Teeth Whitening",
                      href: "/teeth-whitening",
                      description: "Boost brightness with LED-accelerated whitening once aligners come off.",
                      combination: true,
                      priceRange: "$$",
                      popularity: 74
                    },
                    {
                      title: "Dental Implants",
                      href: "/dental-implants",
                      description: "Replace missing teeth before or after alignment for a complete bite.",
                      priceRange: "$$$$",
                      popularity: 38
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/15">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Invisalign FAQs from Los Angeles Patients
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
                Start Your Los Angeles Invisalign Journey
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Ready to begin? Our team will help you photograph your current smile, schedule a digital scan,
                and map out a timeline that fits your career and personal goals.
                We offer in-office and virtual consultations, making it simple to start, whether you reside in Hancock Park,
                commute from Santa Monica, or split time between cities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <a href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" target="_blank" rel="noopener noreferrer">
                    Book Invisalign Consultation
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/testimonials">
                    Read Invisalign Testimonials
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4">
            <InternalLinkingWidget
              context="invisalign"
              variant="expanded"
              title="Continue Exploring Invisalign Resources"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Invisalign;
