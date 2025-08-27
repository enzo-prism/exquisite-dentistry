import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Button from '@/components/Button';
import { Check, Star, Clock, Shield, Sparkles } from 'lucide-react';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import FAQPageStructuredData from '@/components/FAQPageStructuredData';
import MedicalProcedureStructuredData from '@/components/seo/MedicalProcedureStructuredData';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';

const Veneers = () => {
  const benefits = [
    {
      icon: <Sparkles className="h-8 w-8 text-secondary" />,
      title: "Instant Transformation",
      description: "Dramatically improve your smile's appearance in just a few visits"
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Durable & Long-lasting",
      description: "High-quality porcelain veneers can last 10-15 years with proper care"
    },
    {
      icon: <Star className="h-8 w-8 text-secondary" />,
      title: "Natural Appearance",
      description: "Custom-crafted to match your facial features and desired aesthetic"
    },
    {
      icon: <Clock className="h-8 w-8 text-secondary" />,
      title: "Minimal Tooth Preparation",
      description: "Conservative approach that preserves most of your natural tooth structure"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Consultation & Design",
      description: "Comprehensive evaluation and digital smile design to visualize your new smile"
    },
    {
      step: "02", 
      title: "Preparation",
      description: "Minimal tooth preparation and precise impressions for custom fabrication"
    },
    {
      step: "03",
      title: "Fabrication",
      description: "Expert craftsmen create your custom veneers using premium porcelain materials"
    },
    {
      step: "04",
      title: "Placement",
      description: "Precise bonding and final adjustments to achieve your perfect smile"
    }
  ];

  const faqs = [
    {
      question: "How long do porcelain veneers last?",
      answer: "With proper care and regular dental visits, porcelain veneers typically last 10-15 years. Their longevity depends on factors like oral hygiene, bite habits, and lifestyle choices."
    },
    {
      question: "Are veneers reversible?",
      answer: "Porcelain veneers require minimal tooth preparation, so while the process involves some alteration to your natural teeth, our conservative approach preserves most of your tooth structure."
    },
    {
      question: "Do veneers look natural?",
      answer: "Yes! Our custom-crafted porcelain veneers are designed to match your facial features, skin tone, and desired aesthetic. They reflect light naturally and blend seamlessly with your existing teeth."
    },
    {
      question: "Can I eat normally with veneers?",
      answer: "Absolutely. Once your veneers are properly bonded, you can eat most foods normally. We recommend avoiding extremely hard foods and using common sense to protect your investment."
    },
    {
      question: "How do I care for my veneers?",
      answer: "Care for veneers just like your natural teeth - brush twice daily, floss regularly, and visit us for routine cleanings. Avoid using your teeth as tools and consider a nightguard if you grind your teeth."
    }
  ];

  return (
    <>
      <PageSEO
        title="Porcelain Veneers Los Angeles | Custom Smile Makeovers | Exquisite Dentistry"
        description="Custom porcelain veneers designed for a natural, brighter smile. Precise planning, minimal prep and beautiful results from our Los Angeles practice."
        keywords="porcelain veneers, Los Angeles veneers, smile makeover, cosmetic dentistry, dental veneers"
        path="/veneers"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
      />

      <MedicalProcedureStructuredData
        procedureName="Porcelain Veneers"
        description="Custom-designed ultra-thin porcelain shells bonded to the front surface of teeth to improve appearance, creating a beautiful and natural-looking smile transformation."
        url="/veneers"
        image="https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
        procedureType="Cosmetic Dental Procedure"
        bodyLocation="Oral and Dental System"
        preparation={[
          "Comprehensive consultation and examination",
          "Digital impressions and smile design",
          "Color matching to existing teeth"
        ]}
        steps={[
          { name: "Consultation & Design", description: "Comprehensive evaluation and digital smile design to visualize your new smile" },
          { name: "Preparation", description: "Minimal tooth preparation and precise impressions for custom fabrication" },
          { name: "Fabrication", description: "Expert craftsmen create your custom veneers using premium porcelain materials" },
          { name: "Placement", description: "Precise bonding and final adjustments to achieve your perfect smile" }
        ]}
        followupCare={[
          "Regular dental cleanings and checkups",
          "Avoid using teeth as tools",
          "Consider nightguard if teeth grinding occurs"
        ]}
        benefits={[
          "Instant smile transformation",
          "Natural-looking results",
          "Long-lasting durability",
          "Stain-resistant surface"
        ]}
        duration="2-3 appointments over 2-3 weeks"
        recoveryTime="Immediate return to normal activities"
        priceRange="$1,500-$3,000 per tooth"
      />

      <WebPageStructuredData 
        title="Porcelain Veneers Los Angeles"
        description="Transform your smile with custom porcelain veneers in Los Angeles. Expert craftsmanship, natural results, and personalized care."
        url="https://exquisitedentistryla.com/veneers"
        breadcrumbs={[
          { name: "Veneers", url: "https://exquisitedentistryla.com/veneers" }
        ]}
      />

      <FAQStructuredData faqs={faqs.map(faq => ({ question: faq.question, answer: faq.answer }))} about="Porcelain Veneers" />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <VideoHero 
          title="Porcelain Veneers"
          subtitle="Transform your smile with custom-crafted porcelain veneers designed to enhance your natural beauty"
          primaryCta={{
            text: "Schedule Consultation",
            onClick: () => window.open('https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null', '_blank')
          }}
          secondaryCta={{
            text: "Contact Us",
            href: "/contact"
          }}
          height="medium"
        />

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Your Perfect Smile Awaits
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Porcelain veneers are ultra-thin, custom-made shells that cover the front surface of your teeth, 
                instantly transforming your smile. Our expertly crafted veneers correct imperfections while 
                maintaining the natural beauty and strength of your teeth.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Veneers?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the transformative benefits of porcelain veneers
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

        {/* Process Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Veneer Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A meticulous approach to creating your perfect smile
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
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about porcelain veneers
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Internal Linking and Service Recommendations */}
            <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-2 gap-8">
              <InternalLinkingWidget 
                context="veneer" 
                variant="expanded"
                currentPage="/veneers"
              />
              <ServiceRecommendation
                currentService="Porcelain Veneers"
                context="complement"
                recommendations={[
                  {
                    title: "Teeth Whitening",
                    href: "/zoom-whitening",
                    description: "Perfect your veneer results with professional whitening",
                    duration: "1 hour",
                    popularity: 75,
                    combination: true
                  },
                  {
                    title: "Gum Contouring",
                    href: "/services#cosmetic",
                    description: "Frame your veneers with perfect gum lines",
                    duration: "30-60 min",
                    popularity: 45
                  },
                  {
                    title: "Smile Makeover",
                    href: "/services#cosmetic",
                    description: "Complete transformation with multiple procedures",
                    duration: "Multiple visits",
                    popularity: 60,
                    priceRange: "$5K-15K"
                  }
                ]}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Transform Your Smile?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Schedule a consultation to discover how porcelain veneers can give you the confident, 
                beautiful smile you've always wanted.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="gold" 
                  size="lg"
                  onClick={() => window.open('https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null', '_blank')}
                >
                  Schedule Consultation
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = '/contact'}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Veneers;