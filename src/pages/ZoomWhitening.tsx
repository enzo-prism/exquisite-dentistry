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
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { SCHEDULING_URL } from '@/constants/urls';

const ZoomWhitening = () => {
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

  const faqs = [
    {
      question: "How much whiter will my teeth get?",
      answer: "Most patients see their teeth become 3-8 shades whiter after a single Zoom session. Results vary based on your starting shade and the type of stains present."
    },
    {
      question: "Is Zoom whitening safe?",
      answer: "Yes, Zoom whitening is FDA-approved and safe when performed by a dental professional. The treatment has been used successfully for over 20 years with minimal side effects."
    },
    {
      question: "Will my teeth be sensitive after treatment?",
      answer: "Some patients experience mild sensitivity for 24-48 hours after treatment. We provide desensitizing treatments and recommendations to minimize any discomfort."
    },
    {
      question: "How long do Zoom whitening results last?",
      answer: "With proper care, results typically last 1-2 years. Avoiding staining foods and drinks, regular brushing, and periodic touch-ups help maintain your bright smile."
    },
    {
      question: "Who is a good candidate for Zoom whitening?",
      answer: "Most people with healthy teeth and gums are good candidates. We'll evaluate your teeth during consultation to ensure Zoom is right for you and discuss any limitations."
    },
    {
      question: "Can I whiten my teeth if I have crowns or veneers?",
      answer: "Zoom whitening only works on natural teeth. Existing crowns, veneers, or fillings won't change color, so we'll discuss options to match your restoration work to your newly whitened teeth."
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
          name: 'Zoom Teeth Whitening',
          description: 'Professional in-office teeth whitening treatment using advanced Zoom technology for immediate, dramatic results',
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
          priceRange: '$300-$600',
          expectedPrognosis: 'Teeth become 3-8 shades whiter in one appointment'
        }]}
      />
      <PageSEO
        title="Zoom Whitening LA | Professional Teeth Whitening"
        description="Professional Zoom whitening in LA brightens teeth 8+ shades in one visit. Safe, effective, immediate results. Special offers available now!"
        keywords="Zoom whitening, teeth whitening Los Angeles, professional whitening, dental whitening, bright smile"
        path="/zoom-whitening"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
      />

      <WebPageStructuredData 
        title="Zoom Teeth Whitening Los Angeles"
        description="Get dramatically whiter teeth in just one visit with professional Zoom whitening in Los Angeles. Safe, effective, and immediate results."
        url="https://exquisitedentistryla.com/zoom-whitening"
        breadcrumbs={[
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
          title="Zoom Teeth Whitening"
          subtitle="Achieve dramatically whiter teeth in just one visit with professional Zoom whitening technology"
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
              <p className="text-lg text-muted-foreground leading-relaxed">
                Zoom teeth whitening is the most effective professional whitening treatment available, 
                delivering immediate and dramatic results in just one comfortable office visit. 
                Our advanced whitening system safely removes years of stains and discoloration.
              </p>
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
                Everything you need to know about Zoom whitening
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ZoomWhitening;
