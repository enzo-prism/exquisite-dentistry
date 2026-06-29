import React from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Sun, Sparkles, Droplet, Shield, Timer } from 'lucide-react';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import FinancingOptionsSection from '@/components/FinancingOptionsSection';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';
import RelatedArticles from '@/components/RelatedArticles';
import LastUpdated from '@/components/LastUpdated';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { ROUTE_METADATA } from '@/constants/metadata';

const TeethWhitening = () => {
  const meta = ROUTE_METADATA['/teeth-whitening'];
  const whiteningPrograms = [
    {
      title: "In-Office Zoom Whitening",
      description: "In-office whitening for noticeable results in a single visit, with LED activation and a sensitivity protocol throughout."
    },
    {
      title: "Custom Take-Home Whitening",
      description: "Professional-strength gel in custom-fitted trays, so you can brighten gradually and control the pace and sensitivity."
    },
    {
      title: "Hybrid Whitening Plan",
      description: "Pair an in-office session with take-home touch-ups so your shade stays consistent over time."
    }
  ];

  const faqs = [
    {
      question: "Which whitening option is right for me?",
      answer: "During your consultation, we look at existing restorations, sensitivity history, enamel thickness, and your timeline. If you have an event coming up soon, in-office whitening works well. If you would rather brighten gradually, custom take-home trays give you more control. A hybrid plan helps keep your shade consistent over time."
    },
    {
      question: "How do you reduce sensitivity?",
      answer: "We prep teeth with a desensitizing mousse, use carefully timed gel cycles, and apply fluoride varnish right after whitening. Custom take-home kits include desensitizing gel and clear instructions so you stay comfortable between sessions."
    },
    {
      question: "How often should I whiten?",
      answer: "In-office whitening can be repeated every 12 to 18 months, while take-home touch-ups keep results fresh in between. We will recommend a maintenance plan that fits your routine and stain exposure so your shade stays consistent."
    }
  ];

  return (
    <>
      <MasterStructuredData
        includeBusiness={true}
        includeDoctor={true}
        includeWebsite={true}
        additionalSchemas={[{
          '@context': 'https://schema.org',
          '@type': 'MedicalProcedure',
          name: 'Professional Teeth Whitening',
          description: 'Professional teeth whitening treatments tailored for Los Angeles lifestyles, featuring Zoom in-office whitening and custom take-home programs.',
          url: getCanonicalUrl('/teeth-whitening'),
          category: 'Cosmetic Dentistry',
          provider: {
            '@id': 'https://exquisitedentistryla.com/#business'
          },
          performer: {
            '@id': 'https://exquisitedentistryla.com/#doctor'
          },
          expectedPrognosis: 'Noticeably brighter smile with long-lasting results when paired with maintenance.',
          bodyLocation: 'Teeth'
        }]}
      />

      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/teeth-whitening"
        ogImage={meta.ogImage}
      />

      <WebPageStructuredData
        title="Teeth Whitening in Los Angeles"
        description="Brighten your smile with professional teeth whitening options in Los Angeles. Choose Zoom in-office whitening, hybrid plans, or custom take-home kits."
        url="https://exquisitedentistryla.com/teeth-whitening"
        breadcrumbs={[
          { name: 'Services', url: 'https://exquisitedentistryla.com/services/' },
          { name: 'Teeth Whitening', url: 'https://exquisitedentistryla.com/teeth-whitening/' }
        ]}
      />

      <ServiceStructuredData
        serviceName="Professional Teeth Whitening"
        description="Concierge whitening programs including Zoom in-office treatments and custom take-home kits for long-lasting brightness."
        url="/teeth-whitening"
      />

      <FAQStructuredData faqs={faqs} about="Professional Teeth Whitening in Los Angeles" />

      <div className="min-h-screen bg-background">
        <VideoHero
          title="Teeth Whitening Los Angeles"
          subtitle="In-office whitening, custom take-home trays, and hybrid plans, matched to your sensitivity and schedule."
          primaryCta={{
            text: "Schedule Consultation",
            href: SCHEDULE_CONSULTATION_PATH
          }}
          height="medium"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <span className="uppercase tracking-[0.35em] text-secondary font-semibold">Los Angeles Smile Brightening</span>
              <h2 className="mt-6 text-4xl md:text-5xl font-bold text-foreground">
                Professional Whitening, Planned Around Your Schedule
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Our whitening combines clinical precision with comfort-focused care.
                We offer three whitening pathways designed to brighten noticeably while protecting enamel.
                Each one is supported by a sensitivity protocol and tailored aftercare,
                so the experience stays predictable and your results hold up.
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Dr. Alexie Aguil and our hygiene team review your enamel thickness, existing dentistry, and habits to recommend the right approach.
                We calibrate gel strength, light activation, and session timing to your comfort level.
                You leave with a clear maintenance plan so your results stay consistent over time.
              </p>
              <p className="mt-6 text-base text-muted-foreground">
                Looking specifically for in-office Zoom? Explore{' '}
                <Link to="/zoom-whitening/" className="text-secondary underline-offset-4 hover:underline">
                  Zoom Teeth Whitening in Los Angeles
                </Link>
                . Coming from Culver City? See{' '}
                <Link to="/culver-city-teeth-whitening/" className="text-secondary underline-offset-4 hover:underline">
                  teeth whitening near Culver City
                </Link>
                . Planning around a ceremony or engagement photos? Read our{' '}
                <Link to="/blog/when-to-start-wedding-smile-prep-los-angeles/" className="text-secondary underline-offset-4 hover:underline">
                  wedding smile prep timeline guide
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {whiteningPrograms.map((program) => (
                <Card key={program.title} className="border border-border/60 bg-white shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader className="space-y-4">
                    <CardTitle className="text-xl text-foreground">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{program.description}</p>
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
                  What to Expect During Whitening
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Each visit begins with a gentle polish, and we apply a warm desensitizing mousse before whitening to keep you comfortable.
                  During an in-office session, you can settle in and relax while the gel does its work.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We adjust gel strength for each 15-minute cycle to balance noticeable results with enamel safety.
                  After whitening, you will receive a take-home kit with touch-up pens, aligner-safe gel (if you wear <Link to="/invisalign/" className="text-secondary underline-offset-4 hover:underline">Invisalign</Link>),
                  and dietary guidance for the first 48 hours.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/zoom-whitening/">
                      Learn about Zoom Whitening
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-muted/40 border border-border/60 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Whitening Comfort Protocol</h3>
                <ul className="space-y-4 text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-secondary mt-1" />
                    <span>Pre-treatment evaluation ensures existing restorations and veneers align with whitening goals.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-secondary mt-1" />
                    <span>Micro-applicators deliver gel precisely, protecting gums and minimizing sensitivity flare-ups.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-secondary mt-1" />
                    <span>Cool air fans, vitamin E swabs, and blue-light shielding keep you comfortable throughout the session.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-secondary mt-1" />
                    <span>Post-treatment remineralization strengthens enamel and seals pores for longer-lasting results.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/15">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Whitening Tailored to Your Routine</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We personalize whitening around your habits and goals.
                If coffee, tea, or wine are part of your routine, we will share stain-prevention tips to help your results last.
                If you have an event coming up, we can plan the timing so your shade settles beforehand.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                If you travel often, we can put together a take-home kit and a simple touch-up routine that fits your schedule.
                If you have veneers, implants, or composite bonding, we calibrate whitening so your natural teeth match your existing dental work.
              </p>
	              <p className="text-lg text-muted-foreground leading-relaxed">
		                Whitening also pairs well with <Link to="/veneers/" className="text-secondary underline-offset-4 hover:underline">porcelain veneers</Link>, <Link to="/dental-implants/" className="text-secondary underline-offset-4 hover:underline">dental implants</Link>, or a <Link to="/cosmetic-dentistry/" className="text-secondary underline-offset-4 hover:underline">comprehensive cosmetic plan</Link>
		                when you are planning broader changes.
		              </p>
	              <div className="mt-10 grid gap-6 md:grid-cols-2">
	                <div className="rounded-3xl border border-secondary/20 bg-white p-8 shadow-sm">
	                  <h3 className="text-2xl font-semibold text-foreground">Teeth whitening near Beverly Hills</h3>
	                  <p className="mt-3 text-muted-foreground leading-relaxed">
	                    Coming from Beverly Hills? See whitening options designed around Beverly Hills schedules, including in-office whitening, custom trays, and shade planning for existing restorations.
	                  </p>
		                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
		                    <Button variant="outline" asChild>
		                      <Link to="/teeth-whitening-beverly-hills/">Beverly Hills Whitening Guide</Link>
		                    </Button>
		                    <Button variant="outline" asChild>
		                      <Link to="/beverly-hills-dentist/">Beverly Hills Dentist Page</Link>
		                    </Button>
		                  </div>
	                </div>
	                <div className="rounded-3xl border border-secondary/20 bg-white p-8 shadow-sm">
	                  <h3 className="text-2xl font-semibold text-foreground">Culver City teeth whitening</h3>
	                  <p className="mt-3 text-muted-foreground leading-relaxed">
	                    Coming from Culver City? Compare in-office whitening, custom take-home trays, and sensitivity planning designed for busy Culver City schedules.
	                  </p>
		                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
		                    <Button variant="outline" asChild>
		                      <Link to="/culver-city-teeth-whitening/">Culver City Whitening Guide</Link>
		                    </Button>
		                    <Button variant="outline" asChild>
		                      <Link to="/culver-city-dentist/">Culver City Dentist Page</Link>
		                    </Button>
		                  </div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <Card className="bg-gradient-to-br from-white to-secondary/10 border border-border/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Whitening Investment & Memberships</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In-office Zoom whitening begins at $595 and includes desensitizing care, take-home boosters, and shade tracking. Custom tray systems start at $350, and hybrid pathways range from $650 to $850 depending on the number of gel refills.
                  </p>
                  <p>
                    Members of our Glow Maintenance Club receive quarterly touch-up kits, complimentary gel refills, priority booking, and member rates on cosmetic treatments. We also offer group bookings for weddings and special events.
                  </p>
                  <p>
                    Whitening packages can be bundled with veneers, bonding, and Invisalign, with pricing laid out up front.
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-6">
                <div className="bg-white border border-border/60 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Smile Brightening Checklist</h3>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <Sun className="w-5 h-5 text-secondary mt-1" />
                      <span>Avoid dark foods and drinks for 48 hours; choose light-colored meals and still water for lasting results.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sun className="w-5 h-5 text-secondary mt-1" />
                      <span>Rinse with cool water or straw-sip if you indulge in espresso or red wine during the first week after whitening.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sun className="w-5 h-5 text-secondary mt-1" />
                      <span>Use remineralizing serum nightly for seven days to hydrate enamel and keep the surface smooth.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sun className="w-5 h-5 text-secondary mt-1" />
                      <span>Schedule whitening 7 to 10 days before major events so shade settles and soft tissues look their healthiest.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sun className="w-5 h-5 text-secondary mt-1" />
                      <span>Bring your trays to hygiene visits, we’ll professionally clean them and restock whitening gel refills.</span>
                    </li>
                  </ul>
                </div>

                <ServiceRecommendation
                  currentService="Teeth Whitening"
                  context="complement"
                  recommendations={[
                    {
                      title: "Zoom Whitening",
                      href: "/zoom-whitening/",
                      description: "Learn about our in-office whitening technology for immediate results.",
                      popularity: 88,
                      combination: true
                    },
                    {
                      title: "Wedding Smile Package",
                      href: "/wedding/",
                      description: "Pair whitening with veneers and Invisalign before your celebration.",
                      popularity: 46
                    },
                    {
                      title: "Graduation Smile Prep",
                      href: "/graduation/",
                      description: "Brighten your smile before ceremonies and professional headshots.",
                      popularity: 42
                    },
                    {
                      title: "Client Experience",
                      href: "/client-experience/",
                      description: "See the comfort details that make whitening an easy, low-stress visit.",
                      popularity: 52
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <FinancingOptionsSection
          className="bg-background pt-6 md:pt-8"
          title="See flexible payment options right after the whitening investment breakdown."
          description="If you are comparing Zoom whitening, custom trays, or a whitening package bundled with veneers or Invisalign, our Cherry financing page lets you review monthly options while the pricing details are still top of mind."
        />

        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Teeth Whitening FAQs
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
          tags={['whitening', 'teeth whitening', 'zoom', 'bright smile']}
          title="Whitening Tips & Insights"
          subtitle="Learn how to brighten and maintain your smile"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Talk Through Whitening?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                If you are considering whitening, a consultation is the place to start.
                We will talk through your options, your sensitivity, and your timeline, then recommend the path that fits.
                If you still have questions, that is completely fine too.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                </Button>
	                <Button size="lg" variant="outline" asChild>
	                  <Link to="/testimonials/">
	                    Hear From Whitening Clients
	                  </Link>
	                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4">
            <InternalLinkingWidget
              context="whitening"
              variant="expanded"
              title="Explore more smile-brightening resources"
            />
            <LastUpdated date="December 2025" className="text-center" />
          </div>
        </section>
      </div>
    </>
  );
};

export default TeethWhitening;
