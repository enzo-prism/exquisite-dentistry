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
import RelatedArticles from '@/components/RelatedArticles';
import LastUpdated from '@/components/LastUpdated';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { SCHEDULING_URL } from '@/constants/urls';
import PracticeVideoPlayer from '@/components/PracticeVideoPlayer';
import { ROUTE_METADATA } from '@/constants/metadata';

const Invisalign = () => {
  const meta = ROUTE_METADATA['/invisalign'];
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
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/invisalign"
        ogImage={meta.ogImage}
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
            text: "Book an Invisalign Appointment",
            href: SCHEDULING_URL,
            target: "_blank",
            rel: "noopener noreferrer"
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
              <div className="mt-8 rounded-2xl border border-secondary/30 bg-secondary/5 p-6 text-center">
                <p className="text-secondary font-semibold text-sm uppercase tracking-[0.35em] mb-2">Powered by iTero 3D Scanning</p>
                <p className="text-muted-foreground">
                  Every Invisalign plan begins with a{' '}
                  <Link to="/itero-scanner" className="text-secondary underline-offset-4 hover:underline">
                    high-definition iTero scan
                  </Link>
                  , delivering digital impressions that sync instantly with ClinCheck for faster trays and more predictable movement.
                </p>
              </div>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Whether you are preparing for a major career milestone, recovering from years of grinding, or pursuing a healthier bite after veneers,
                Invisalign aligners deliver precise movements without the brackets and wires of traditional orthodontics.
                You will swap to a fresh set of trays every 7 to 10 days, meeting virtually or in-person for progress checks that keep you on track.
                When paired with cosmetic finishing touches like whitening or edge recontouring, Invisalign becomes the centerpiece of a full smile glow-up.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
              <div className="rounded-3xl border border-secondary/20 bg-white p-8 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">Transformation Story</p>
                <h2 className="mt-3 text-3xl font-bold text-foreground">
                  Confidence in Every Smile: Nick’s Invisalign Journey
                </h2>
                <p className="mt-4 text-muted-foreground">
                  A lifetime of hiding his smile—until Invisalign with Dr. Aguil gave him the confidence to show it off.
                </p>
                <div className="mt-6 space-y-4 text-sm text-foreground">
                  <div>
                    <p className="font-semibold uppercase tracking-[0.3em] text-secondary mb-2">Key Takeaways</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-secondary">•</span>
                        <span>“I’ve been concerned with my teeth my whole life… the work Dr. Aguil did has impacted my life significantly.”</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary">•</span>
                        <span>Confidence through care—every visit focused on trust, comfort, and self-esteem.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary">•</span>
                        <span>What started as concern ended as confidence with results that feel as good as they look.</span>
                      </li>
                    </ul>
                  </div>
                  <blockquote className="rounded-2xl bg-muted/50 p-6 text-base italic text-foreground">
                    “I’ve been concerned with my teeth my whole life. Dr. Alexie Aguil told me that Invisalign would help. The work that he’s done on my teeth and my smile has impacted my life significantly. I’m happier with my smile, I’m more confident. The experience was fantastic.”
                  </blockquote>
                  <Button size="lg" asChild className="w-full sm:w-auto">
                    <Link to="/transformation-stories/nick-invisalign">Read Full Story</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-3xl border border-secondary/30 bg-secondary/5 p-8 text-center flex flex-col">
                <PracticeVideoPlayer
                  source="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1761590081/Nick_homviy.mp4"
                  poster="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761590343/Nick_phiely.png"
                  title="Nick’s Invisalign Story"
                  className="!rounded-2xl !bg-black mb-6"
                  appearance="minimal"
                />
                <p className="text-secondary font-semibold text-sm uppercase tracking-[0.35em] mb-4">Confidence Video Spotlight</p>
                <p className="text-lg text-muted-foreground mb-6">
                  Watch Nick describe how Invisalign changed the way he shows up at work, in photos, and on camera.
                </p>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/transformation-stories/nick-invisalign">See Nick’s Journey</Link>
                </Button>
              </div>
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
                <ol className="relative border-l border-secondary/20 pl-6">
                  {milestones.map((milestone, index) => (
                    <li
                      key={milestone.step}
                      className={`relative pl-6 ${index !== milestones.length - 1 ? 'pb-10' : ''}`}
                    >
                      <div className="absolute -left-6 top-0 flex items-center justify-center w-12 h-12 rounded-full border-2 border-secondary bg-white text-secondary font-semibold text-sm">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-secondary">
                        {milestone.step}
                      </span>
                      <h4 className="mt-3 text-lg font-semibold text-foreground">{milestone.title}</h4>
                      <p className="mt-2 text-muted-foreground leading-relaxed">{milestone.description}</p>
                    </li>
                  ))}
                </ol>
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
              <div className="mt-10 rounded-3xl border border-secondary/20 bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-foreground">Invisalign near Beverly Hills</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  If you’re coming from Beverly Hills, explore our location guide and a dedicated overview of Invisalign planning designed for Beverly Hills schedules.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button variant="outline" asChild>
                    <Link to="/invisalign-beverly-hills">Beverly Hills Invisalign Guide</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/beverly-hills-dentist">Beverly Hills Dentist Page</Link>
                  </Button>
                </div>
              </div>
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

        {/* Related Articles Section */}
        <RelatedArticles
          tags={['invisalign', 'orthodontics', 'teeth straightening', 'clear aligners']}
          category="Orthodontics"
          title="Invisalign Resources & Guides"
          subtitle="Expert answers to your questions about clear aligner treatment"
        />

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
            <LastUpdated date="December 2025" className="text-center" />
          </div>
        </section>
      </div>
    </>
  );
};

export default Invisalign;
