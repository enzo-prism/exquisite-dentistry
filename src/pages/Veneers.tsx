import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Clock, Shield, Sparkles, ArrowRight } from 'lucide-react';
import FinancingOptionsSection from '@/components/FinancingOptionsSection';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';
import RelatedArticles from '@/components/RelatedArticles';
import LastUpdated from '@/components/LastUpdated';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import {
  createFAQSchema,
  createMedicalProcedureSchema,
  createWebPageSchema,
  createBreadcrumbSchema
} from '@/utils/centralizedSchemas';
import { ROUTE_METADATA } from '@/constants/metadata';

const Veneers = () => {
  const meta = ROUTE_METADATA['/veneers'];
  const benefits = [
    {
      icon: <Sparkles className="h-8 w-8 text-secondary" />,
      title: "A Refreshed Smile",
      description: "Improve your smile's appearance in just a few visits"
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Durable & Long-lasting",
      description: "High-quality porcelain veneers can last 10 to 15 years with proper care"
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
      description: "A thorough evaluation and digital smile design to preview your new smile"
    },
    {
      step: "02", 
      title: "Preparation",
      description: "Minimal tooth preparation and precise impressions for custom fabrication"
    },
    {
      step: "03",
      title: "Fabrication",
      description: "Expert craftsmen create your custom veneers using quality porcelain materials"
    },
    {
      step: "04",
      title: "Placement",
      description: "Precise bonding and final adjustments to complete your new smile"
    }
  ];

  const faqs = [
    {
      question: "How long do porcelain veneers last?",
      answer: "With proper care and regular dental visits, porcelain veneers typically last 10 to 15 years. Their longevity depends on factors like oral hygiene, bite habits, and lifestyle choices."
    },
    {
      question: "Are veneers reversible?",
      answer: "Porcelain veneers require minimal tooth preparation, so while the process involves some alteration to your natural teeth, our conservative approach preserves most of your tooth structure."
    },
    {
      question: "Do veneers look natural?",
      answer: "Our custom porcelain veneers are designed to match your facial features, skin tone, and desired aesthetic. They reflect light naturally and blend seamlessly with your existing teeth."
    },
    {
      question: "Can I eat normally with veneers?",
      answer: "Once your veneers are bonded, you can eat most foods normally. We recommend avoiding extremely hard foods and using common sense to protect your investment."
    },
    {
      question: "How do I care for my veneers?",
      answer: "Care for veneers just like your natural teeth, brush twice daily, floss regularly, and visit us for routine cleanings. Avoid using your teeth as tools and consider a nightguard if you grind your teeth."
    }
  ];

  // Generate schemas to pass to MasterStructuredData (single @graph)
  const additionalSchemas = [
    createMedicalProcedureSchema({
      procedureName: "Porcelain Veneers",
      description: "Custom-designed ultra-thin porcelain shells bonded to the front surface of teeth to improve appearance, creating a beautiful and natural-looking smile transformation.",
      url: "/veneers",
      image: "https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png",
      procedureType: "Cosmetic Dental Procedure",
      bodyLocation: "Oral and Dental System",
      preparation: [
        "Comprehensive consultation and examination",
        "Digital impressions and smile design",
        "Color matching to existing teeth"
      ],
      steps: [
        { name: "Consultation & Design", description: "A thorough evaluation and digital smile design to preview your new smile" },
        { name: "Preparation", description: "Minimal tooth preparation and precise impressions for custom fabrication" },
        { name: "Fabrication", description: "Expert craftsmen create your custom veneers using quality porcelain materials" },
        { name: "Placement", description: "Precise bonding and final adjustments to complete your new smile" }
      ],
      followupCare: [
        "Regular dental cleanings and checkups",
        "Avoid using teeth as tools",
        "Consider nightguard if teeth grinding occurs"
      ],
      benefits: [
        "A natural-looking improvement to your smile",
        "Natural-looking results",
        "Long-lasting durability",
        "Stain-resistant surface"
      ],
      recoveryTime: "Immediate return to normal activities"
    }),
    createWebPageSchema({
      title: "Porcelain Veneers Los Angeles",
      description: "Transform your smile with custom porcelain veneers in Los Angeles. Expert craftsmanship, natural results, and personalized care.",
      url: "/veneers"
    }),
    createBreadcrumbSchema([
      { name: "Services", url: "/services" },
      { name: "Porcelain Veneers", url: "/veneers" }
    ]),
    createFAQSchema(faqs, "Porcelain Veneers")
  ];

  return (
    <>
      <MasterStructuredData
        includeBusiness={true}
        includeWebsite={true}
        additionalSchemas={additionalSchemas}
      />

      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/veneers"
        ogImage={meta.ogImage}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <VideoHero 
          title={<>Custom Porcelain Veneers in <span className="text-gold">Los Angeles</span></>}
          subtitle="Ultra-thin, custom-crafted porcelain veneers designed to correct chips, gaps, discoloration, and uneven edges while preserving healthy enamel. Planned by Dr. Alexie Aguil using digital smile design and careful lab fabrication."
          primaryCta={{
            text: "Schedule Consultation",
            href: SCHEDULE_CONSULTATION_PATH
          }}
          height="medium"
        />

        <div className="container mx-auto px-4 mt-6">
          <Breadcrumbs
            items={[
              { label: 'Services', to: '/services/' },
              { label: 'Porcelain Veneers', to: '/veneers/' }
            ]}
          />
        </div>

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Porcelain Veneers, Planned for Natural Results
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Porcelain veneers are thin ceramic shells bonded to the front of teeth to improve shape, color, and minor alignment. We start with digital smile design and conservative preparation to keep as much natural tooth structure as possible. Each veneer is fabricated by a dental lab to match your facial features and bite for a natural-looking finish.
              </p>
            </div>
          </div>
        </section>

        {/* Veneers Designed for Everyday Confidence */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Veneers Designed for Everyday Confidence
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Every veneer plan starts with a smile discovery session. We look at your facial proportions, how you speak, and how you want your smile to feel day to day, then design porcelain that fits your features rather than covering them. The goal is a smile that photographs well, speaks naturally, and still looks like you.
              </p>
              <p>
                Dr. Alexie Aguil works with Los Angeles ceramists to shape each veneer by hand. Layers of porcelain are chosen to match your complexion and the way your teeth catch light. The finished result looks consistent in person and on camera, and is built to hold up over years of everyday use.
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
                <Card key={`benefit-${benefit.title.replace(/[^a-zA-Z0-9]/g, '')}`} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
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

        {/* Front teeth scenarios */}
        <section className="py-14 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Only need your front teeth transformed?
              </h2>
              <p className="text-lg text-muted-foreground">
                Plan for 2 or 4 veneers with transparent pricing, shade strategy, and conservative prep.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border-gold/25 shadow-sm">
                <CardContent className="p-6 space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">2 veneers</p>
                  <h3 className="text-xl font-semibold text-foreground">Targeted front tooth fixes</h3>
                  <p className="text-muted-foreground">A good option for a single dark tooth, chips, or peg laterals after whitening.</p>
                  <Button variant="link" className="px-0" asChild>
                    <Link to="/veneers/front-teeth-veneers-los-angeles/" className="inline-flex items-center">
                      Explore 2 veneer plans
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-gold/25 shadow-sm">
                <CardContent className="p-6 space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">4 veneers</p>
                  <h3 className="text-xl font-semibold text-foreground">Balance the entire smile zone</h3>
                  <p className="text-muted-foreground">Prevent shade mismatch and create even, natural symmetry across your front teeth.</p>
                  <Button variant="link" className="px-0" asChild>
                    <Link to="/veneers/front-teeth-veneers-los-angeles/" className="inline-flex items-center">
                      Explore 4 veneer plans
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <FinancingOptionsSection
          className="bg-background pt-0 md:pt-2"
          title="Comparing 2 veneers, 4 veneers, or a fuller veneer plan?"
          description="Right after reviewing front-teeth veneer options and transparent planning guidance, our Cherry financing page lets you explore monthly payment options before moving into the full treatment process."
        />

        {/* Process Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Veneer Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A careful approach to designing your new smile
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {process.map((step, index) => (
                  <div key={`process-step-${step.step}`} className="flex gap-6">
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

        {/* Los Angeles-Focused Veneer Planning */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
                Los Angeles-Focused Veneer Planning
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In Los Angeles, your smile shows up on video calls, in photos, and in everyday conversation. We look at how your teeth move as you speak, laugh, and smile, and if your gum levels need refining we can pair veneers with gentle laser recontouring. Some patients prefer slightly warmer undertones and others prefer a brighter, cooler shade. We plan the shade with you so it suits your face and the light you are usually in.
              </p>
            </div>
          </div>
        </section>

        {/* Caring for Your Veneers */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Caring for Your Veneers
              </h2>
              <ul className="max-w-3xl mx-auto space-y-4">
                <li className="flex gap-3">
                  <Check className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-muted-foreground">
                    Attend professional cleanings every 3 to 4 months with hygienists trained in veneer-safe polishing paste.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-muted-foreground">
                    Wear your nightguard nightly to protect porcelain edges from clenching and grinding.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-muted-foreground">
                    Use non-abrasive toothpaste and gentle floss to protect the finish and keep the margins clean.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-muted-foreground">
                    Schedule quick bite checks after major orthodontic changes or new restorative work to keep veneers balanced.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-muted-foreground">
                    Keep a travel-safe whitening pen and veneer case in your bag for touch-ups while you travel.
                  </span>
                </li>
              </ul>
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
              {faqs.map((faq, index) => (
                <details
                  key={`veneer-faq-${index}`}
                  className="faq-item"
                >
                  <summary className="text-left font-medium text-foreground">
                    {faq.question}
                  </summary>
                  <p className="faq-answer">
                    {faq.answer}
                  </p>
                </details>
              ))}
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
                    description: "Complement your veneer results with professional whitening",
                    duration: "1 hour",
                    popularity: 75,
                    combination: true
                  },
                  {
                    title: "Gum Contouring",
                    href: "/services#cosmetic",
                    description: "Frame your veneers with balanced gum lines",
                    duration: "30 to 60 min",
                    popularity: 45
                  },
                  {
                    title: "Smile Makeover",
                    href: "/smile-makeover-los-angeles",
                    description: "Complete transformation with multiple procedures",
                    duration: "Multiple visits",
                    popularity: 60
                  }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        <RelatedArticles
          tags={['veneers', 'porcelain veneers', 'cosmetic dentistry', 'smile makeover']}
          category="Cosmetic Dentistry"
          title="Learn More About Veneers"
          subtitle="Explore our blog for expert insights on porcelain veneers, costs, and care"
        />

        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Transform Your Smile?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Schedule a consultation to learn how porcelain veneers could fit your
                smile and your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="default" 
                  size="lg"
                  asChild
                >
                  <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                >
                  <Link to="/contact/">
                    Contact Us
                  </Link>
                </Button>
              </div>

              {/* Additional Internal Links near CTA */}
              <div className="mt-12 pt-8 border-t border-muted">
                <InternalLinkingWidget 
                  context="veneer" 
                  variant="compact"
                  currentPage="/veneers/"
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

export default Veneers;
