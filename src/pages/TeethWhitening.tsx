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
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';
import RelatedArticles from '@/components/RelatedArticles';
import LastUpdated from '@/components/LastUpdated';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { SCHEDULING_URL } from '@/constants/urls';
import { ROUTE_METADATA } from '@/constants/metadata';

const TeethWhitening = () => {
  const meta = ROUTE_METADATA['/teeth-whitening'];
  const whiteningPrograms = [
    {
      title: "In-Office Zoom Whitening",
      description: "Brighten up to eight shades in a single visit with LED-accelerated whitening, sensitivity protection, and spa-level comforts."
    },
    {
      title: "Custom Take-Home Whitening",
      description: "Wear professional-strength gel in perfectly fitted trays to refresh brightness during travel or before big events."
    },
    {
      title: "Hybrid Whitening Plan",
      description: "Combine in-office jumpstarts with home boosters to maintain radiance through film shoots, weddings, and photo sessions."
    }
  ];

  const faqs = [
    {
      question: "Which whitening option is right for me?",
      answer: "During your consultation, we evaluate existing restorations, tooth sensitivity history, enamel thickness, and timeline. Patients preparing for same-week events choose in-office Zoom, while those wanting steady maintenance between meetings opt for custom take-home trays. Many Los Angeles professionals use a hybrid plan for year-round brilliance."
    },
    {
      question: "How do you reduce sensitivity?",
      answer: "We prep teeth with nano-hydroxyapatite mousse, use carefully timed gel cycles, and apply fluoride varnish immediately after whitening. Custom take-home kits include desensitizing gel and precise instructions so you stay comfortable, even with a busy coffee routine or daily green juice habit."
    },
    {
      question: "How often should I whiten?",
      answer: "In-office whitening can be repeated every 12–18 months, while take-home touch-ups keep results fresh every few weeks. We tailor a maintenance plan that considers on-camera obligations, wine tastings, and lifestyle habits so you never lose momentum."
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
        priceRange="$$"
      />

      <FAQStructuredData faqs={faqs} about="Professional Teeth Whitening in Los Angeles" />

      <div className="min-h-screen bg-background">
        <VideoHero
          title="Teeth Whitening Los Angeles"
          subtitle="Three luminous whitening paths designed for fast-paced LA lives."
          primaryCta={{
            text: "Book a Teeth Whitening Appointment",
            href: SCHEDULING_URL,
            target: "_blank",
            rel: "noopener noreferrer"
          }}
          height="medium"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <span className="uppercase tracking-[0.35em] text-secondary font-semibold">Los Angeles Smile Brightening</span>
              <h1 className="mt-6 text-4xl md:text-5xl font-bold text-foreground">
                Radiance That Keeps Pace with Your Calendar
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Our whitening studio combines clinical precision with concierge-level comfort.
                Whether you are preparing for red carpet season, a Malibu wedding, or a branding photoshoot,
                we masterminded three whitening pathways that deliver noticeable brightness without sacrificing enamel integrity.
                Each treatment is supported by a sensitivity protocol, tailored aftercare, and an on-demand support team that understands LA schedules.
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Dr. Alexie Aguil and our hygiene specialists analyze your enamel thickness, existing dentistry, and lifestyle habits to recommend the right formulation.
                Unlike one-size-fits-all whitening bars, we calibrate gel strength, light activation, and session timing to your comfort level.
                You leave with a documented maintenance roadmap so results stay luminous between shoots, investors meetings, and nights on the town.
              </p>
              <p className="mt-6 text-base text-muted-foreground">
                Looking specifically for in-office Zoom? Explore{' '}
                <Link to="/zoom-whitening" className="text-secondary underline-offset-4 hover:underline">
                  Zoom Teeth Whitening in Los Angeles
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
                  Concierge Whitening Experience
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Appointments begin with a sparkling water bar, cozy blankets, and a curated playlist to relax your mind.
                  Our hygienists polish teeth with glaze-protective paste before applying warm desensitizing mousse.
                  During Zoom whitening, you can stream Netflix, meditate, or catch up on emails using our ergonomic chairs and device charging stations.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We customize gel strengths for each 15-minute cycle, ensuring a balance between powerful results and enamel safety.
                  After whitening, you will receive a personalized kit featuring touch-up pens, aligner-safe gel (if you wear <Link to="/invisalign" className="text-secondary underline-offset-4 hover:underline">Invisalign</Link>),
                  and curated dietary guidelines for the first 48 hours.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <a
                      href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Reserve Whitening Session
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/zoom-whitening">
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">LA Brightening Strategies by Lifestyle</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Los Angeles is a city of creative schedules and constant opportunities. We personalize whitening plans based on how you live, work, and celebrate.
                Coffee-lovers visiting Alfred in West Hollywood receive stain-prevention tips, while wine enthusiasts learn how to neutralize tannins after tastings in Malibu.
                If you are prepping for a film shoot, we coordinate with your glam team to sync whitening with makeup trials and hair color refreshes.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                For patients flying frequently, we design TSA-friendly kits, travel-safe shade guides, and reminders that fit your itinerary.
                If you have veneers, implants, or composite bonding, we calibrate whitening so natural teeth harmonize beautifully with existing dentistry.
                Our team also offers executive lunchtime whitening sessions and post-pilates appointments to seamlessly integrate into your routine.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Pair whitening with <Link to="/veneers-los-angeles" className="text-secondary underline-offset-4 hover:underline">porcelain veneers</Link>, <Link to="/dental-implants" className="text-secondary underline-offset-4 hover:underline">dental implants</Link>, or <Link to="/cosmetic-dentistry" className="text-secondary underline-offset-4 hover:underline">comprehensive cosmetic plans</Link>
                to unlock your ideal smile transformation.
              </p>
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
                    In-office Zoom whitening begins at $595 and includes desensitizing care, take-home boosters, and shade tracking. Custom tray systems start at $350, while hybrid pathways range from $650 to $850 depending on the number of gel refills and concierge deliveries.
                  </p>
                  <p>
                    Members of our Glow Maintenance Club receive quarterly touch-up kits, complimentary gel refills, priority booking, and exclusive rates on cosmetic upgrades. We also offer group bookings for bridal parties, production teams, and influencer collaborations.
                  </p>
                  <p>
                    Whitening packages can be bundled with veneers, bonding, and Invisalign treatments for seamless smile makeovers with transparent pricing.
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
                      <span>Use remineralizing serum nightly for seven days to hydrate enamel and maintain a glassy shine.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sun className="w-5 h-5 text-secondary mt-1" />
                      <span>Schedule whitening 7–10 days before major events so shade settles and soft tissues look their healthiest.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sun className="w-5 h-5 text-secondary mt-1" />
                      <span>Bring your trays to hygiene visits—we’ll professionally clean them and restock whitening gel refills.</span>
                    </li>
                  </ul>
                </div>

                <ServiceRecommendation
                  currentService="Teeth Whitening"
                  context="complement"
                  recommendations={[
                    {
                      title: "Zoom Whitening",
                      href: "/zoom-whitening",
                      description: "Learn about our in-office whitening technology for immediate results.",
                      popularity: 88,
                      combination: true
                    },
                    {
                      title: "Wedding Smile Package",
                      href: "/wedding",
                      description: "Pair whitening with veneers and Invisalign before your celebration.",
                      popularity: 46
                    },
                    {
                      title: "Client Experience",
                      href: "/client-experience",
                      description: "See the comfort amenities that make whitening an elevated ritual.",
                      popularity: 52
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
          subtitle="Learn how to achieve and maintain your brightest smile"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Glow Brighter in Los Angeles
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Ready for a luminous upgrade? Our whitening experts are here to help you shine on screen, on stage, and in every candid moment.
                Schedule your consultation to discover the whitening path that matches your timeline and goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <a
                    href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule Whitening
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/testimonials">
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
