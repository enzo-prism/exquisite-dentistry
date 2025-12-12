import React from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Zap, Clock, Shield, Star, CheckCircle } from 'lucide-react';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import RelatedArticles from '@/components/RelatedArticles';
import LastUpdated from '@/components/LastUpdated';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { SCHEDULING_URL } from '@/constants/urls';
import { ROUTE_METADATA } from '@/constants/metadata';
import { ZOOM_WHITENING_FAQS } from '@/data/zoomWhitening';
import { ADDRESS, PHONE_NUMBER_DISPLAY, PHONE_NUMBER_E164 } from '@/constants/contact';

const ZoomWhitening = () => {
  const meta = ROUTE_METADATA['/zoom-whitening'];
  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-secondary" />,
      title: "Immediate Results",
      description: "See dramatic whitening results in just one 60-90 minute session"
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Safe & Comfortable",
      description: "FDA-approved treatment with minimal sensitivity when properly administered"
    },
    {
      icon: <Star className="h-8 w-8 text-secondary" />,
      title: "Professional Grade",
      description: "Advanced whitening technology available only in dental offices"
    },
    {
      icon: <Clock className="h-8 w-8 text-secondary" />,
      title: "Long-lasting Results",
      description: "Maintain your bright smile for months with proper care and maintenance"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Consultation & Preparation",
      description: "Comprehensive evaluation to ensure you're a good candidate for Zoom whitening"
    },
    {
      step: "02", 
      title: "Protection & Setup",
      description: "Gums and lips are carefully protected while the whitening gel is applied to teeth"
    },
    {
      step: "03",
      title: "Light Activation",
      description: "Special Zoom light activates the whitening gel for optimal results"
    },
    {
      step: "04",
      title: "Results & Maintenance",
      description: "Immediate results with take-home kit to maintain your brilliant smile"
    }
  ];

  const beforeAfter = [
    "Remove years of stains from coffee, tea, and wine",
    "Eliminate yellowing from aging and lifestyle factors", 
    "Brighten teeth up to 8 shades in one visit",
    "Restore confidence in your smile",
    "Prepare for special events and occasions"
  ];

  const faqs = ZOOM_WHITENING_FAQS;

  return (
    <>
      <MasterStructuredData 
        includeBusiness={true}
        includeDoctor={true}
        includeWebsite={true}
        additionalSchemas={[{
          '@context': 'https://schema.org',
          '@type': 'MedicalProcedure',
          name: 'Zoom Teeth Whitening',
          description: 'Professional in-office Zoom teeth whitening in Los Angeles for fast, noticeable stain reduction in one visit.',
          url: getCanonicalUrl('/zoom-whitening'),
          category: 'Cosmetic Dentistry',
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
          expectedPrognosis: 'Teeth become 3-8 shades whiter in one appointment'
        }]}
      />
      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/zoom-whitening"
        ogImage={meta.ogImage}
      />

      <WebPageStructuredData 
        title="Zoom Teeth Whitening Los Angeles"
        description="Get dramatically whiter teeth in just one visit with professional Zoom whitening in Los Angeles. Safe, effective, and immediate results."
        url="https://exquisitedentistryla.com/zoom-whitening"
        breadcrumbs={[
          { name: "Services", url: "https://exquisitedentistryla.com/services" },
          { name: "Teeth Whitening", url: "https://exquisitedentistryla.com/teeth-whitening" },
          { name: "Zoom Whitening", url: "https://exquisitedentistryla.com/zoom-whitening" }
        ]}
      />

      <ServiceStructuredData 
        serviceName="Zoom Teeth Whitening"
        description="Professional teeth whitening treatment that delivers dramatic results in just one office visit, removing years of stains and discoloration."
        url="/zoom-whitening"
        priceRange="$$-$$$"
      />

      <FAQStructuredData 
        faqs={faqs.map(faq => ({ question: faq.question, answer: faq.answer }))} 
        about="Zoom Teeth Whitening Services" 
      />

        <div className="min-h-screen bg-background">
          {/* Hero Section */}
          <VideoHero 
          title="Zoom Teeth Whitening in Los Angeles"
          subtitle="Fast, in-office whitening designed to lift stains and brighten your smile in about one visit at our Wilshire Blvd dental studio."
          primaryCta={{
            text: "Book a Zoom Whitening Appointment",
            href: SCHEDULING_URL,
            target: "_blank",
            rel: "noopener noreferrer"
          }}
          height="medium"
        />

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Brighten Your Smile Today
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Reviewed by{' '}
                <Link to="/about" className="text-secondary underline-offset-4 hover:underline">
                  Dr. Alexie Aguil, DDS
                </Link>{' '}
                ·{' '}
                <Link to="/editorial-policy" className="text-secondary underline-offset-4 hover:underline">
                  Editorial policy
                </Link>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Zoom teeth whitening in Los Angeles is an in-office treatment designed to lift surface stains and brighten natural teeth quickly—often in about 60–90 minutes.
                We personalize each session for your enamel and sensitivity levels, so you can leave with a noticeably brighter shade and a plan to maintain it.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 text-left">
                <Card className="border border-border/60 shadow-sm">
                  <CardContent className="p-6 space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Visit Our Los Angeles Office</h3>
                    <p className="text-sm text-muted-foreground">{ADDRESS}</p>
                    <p className="text-sm text-muted-foreground">
                      Call{' '}
                      <a className="text-secondary underline-offset-4 hover:underline" href={`tel:${PHONE_NUMBER_E164}`}>
                        {PHONE_NUMBER_DISPLAY}
                      </a>{' '}
                      or{' '}
                      <Link to="/contact" className="text-secondary underline-offset-4 hover:underline">
                        request an appointment
                      </Link>
                      .
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-border/60 shadow-sm">
                  <CardContent className="p-6 space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Not Sure Which Whitening Option?</h3>
                    <p className="text-sm text-muted-foreground">
                      Compare Zoom to custom take-home whitening and hybrid plans on our{' '}
                      <Link to="/teeth-whitening" className="text-secondary underline-offset-4 hover:underline">
                        teeth whitening page
                      </Link>
                      .
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Coming from Culver City? Start here:{' '}
                      <Link to="/culver-city-teeth-whitening" className="text-secondary underline-offset-4 hover:underline">
                        teeth whitening near Culver City
                      </Link>
                      .
                    </p>
                    <p className="text-sm text-muted-foreground">
                      If you have veneers or bonding, we’ll plan your shade so everything looks consistent.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Zoom Whitening?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the gold standard in professional teeth whitening
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="pt-8 pb-6">
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    What Zoom Can Do For You
                  </h2>
                  <div className="space-y-4">
                    {beforeAfter.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-8 text-center">
                  <div className="text-6xl font-bold text-secondary mb-4">3-8</div>
                  <div className="text-xl font-semibold text-foreground mb-2">Shades Whiter</div>
                  <div className="text-muted-foreground">In just one visit</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The Zoom Whitening Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A comfortable, professional experience from start to finish
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {process.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-secondary">{step.step}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Answers for Zoom whitening in Los Angeles
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger textClassName="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
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
          tags={['whitening', 'zoom', 'teeth whitening', 'bright']}
          title="Whitening Articles & Tips"
          subtitle="Expert advice on achieving and maintaining your brightest smile"
        />

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready for a Brighter Smile?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Schedule your Zoom whitening appointment today and see immediate results 
                that will boost your confidence and brighten your day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="default" 
                  size="lg"
                  asChild
                >
                  <a 
                    href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule Whitening
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                >
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>

              {/* Additional Internal Links near CTA */}
              <div className="mt-12 pt-8 border-t border-muted">
                <InternalLinkingWidget 
                  context="whitening" 
                  variant="compact"
                  currentPage="/zoom-whitening"
                  title="Explore Related Services"
                />
              </div>

              <LastUpdated date="December 2025" className="text-center" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ZoomWhitening;
