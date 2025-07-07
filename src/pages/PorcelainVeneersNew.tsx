import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Smile, Clock, Star, ShieldCheck, Play } from 'lucide-react';
import Button from '@/components/Button';
import OptimizedImage from '@/components/OptimizedImage';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import OfferStructuredData from '@/components/OfferStructuredData';
import { Card, CardContent } from '@/components/ui/card';
import { SCHEDULING_URL } from '@/data/services';

const benefits = [
  {
    icon: <Star className="h-6 w-6" />,
    title: "Natural Appearance",
    description: "Ultra-thin porcelain shells mimic the natural translucency and texture of tooth enamel"
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Stain Resistant",
    description: "High-quality porcelain resists staining from coffee, wine, and other common culprits"
  },
  {
    icon: <Smile className="h-6 w-6" />,
    title: "Instant Transformation",
    description: "Correct multiple imperfections at once - gaps, chips, discoloration, and shape"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Long-Lasting",
    description: "With proper care, porcelain veneers can last 10-15 years or more"
  }
];

const process = [
  {
    step: "01",
    title: "Consultation & Planning",
    description: "Comprehensive examination, digital imaging, and personalized treatment planning to achieve your ideal smile."
  },
  {
    step: "02", 
    title: "Preparation & Impressions",
    description: "Minimal tooth preparation and precise digital impressions to ensure perfect fit and natural appearance."
  },
  {
    step: "03",
    title: "Custom Fabrication",
    description: "Your veneers are handcrafted by master ceramists using premium porcelain materials."
  },
  {
    step: "04",
    title: "Placement & Perfection",
    description: "Careful bonding and final adjustments to achieve your perfect, natural-looking smile."
  }
];

const faqs = [
  {
    question: "How long do porcelain veneers last?",
    answer: "With proper care and regular dental visits, porcelain veneers typically last 10-15 years or even longer. Their longevity depends on factors like oral hygiene, diet, and avoiding habits like teeth grinding."
  },
  {
    question: "Are porcelain veneers reversible?",
    answer: "Porcelain veneers are considered a permanent cosmetic treatment because a small amount of tooth enamel is removed during preparation. However, they can be replaced if needed."
  },
  {
    question: "Do veneers require special care?",
    answer: "Veneers require the same care as natural teeth - regular brushing, flossing, and dental checkups. Avoid biting hard objects and consider a nightguard if you grind your teeth."
  },
  {
    question: "Can veneers fix crooked teeth?",
    answer: "Veneers can address minor alignment issues and create the appearance of straighter teeth. For significant orthodontic problems, clear aligners might be recommended first."
  }
];

const PorcelainVeneersNew = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('PorcelainVeneersNew component loaded successfully');
  }, []);

  return (
    <>
      <Helmet>
        <title>Porcelain Veneers Los Angeles | Custom Smile Makeovers</title>
        <meta name="description" content="Transform your smile with custom porcelain veneers in Los Angeles. Ultra-thin, natural-looking shells that correct chips, gaps, stains, and imperfections. Book your consultation today." />
        <meta name="keywords" content="porcelain veneers Los Angeles, cosmetic dentistry, smile makeover, dental veneers, teeth whitening, cosmetic dentist Beverly Hills" />
        <meta property="og:title" content="Porcelain Veneers Los Angeles | Custom Smile Makeovers" />
        <meta property="og:description" content="Transform your smile with custom porcelain veneers. Natural-looking results that correct multiple imperfections instantly." />
        <meta property="og:image" content="/lovable-uploads/33335962-b99c-4063-aa3c-96dfaf5215bb.png" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://exquisitedentistryla.com/services/porcelain-veneers" />
      </Helmet>
      
      <ServiceStructuredData 
        serviceName="Porcelain Veneers"
        description="Transform your smile with custom-designed, ultra-thin porcelain shells that create naturally beautiful, perfectly aligned teeth."
        url="/services/porcelain-veneers"
        image="/lovable-uploads/33335962-b99c-4063-aa3c-96dfaf5215bb.png"
        priceRange="$$$"
      />
      <WebPageStructuredData
        title="Porcelain Veneers Los Angeles | Custom Smile Makeovers"
        description="Transform your smile with custom porcelain veneers in Los Angeles. Ultra-thin, natural-looking shells that correct chips, gaps, stains, and imperfections."
        url="https://exquisitedentistryla.com/services/porcelain-veneers"
        pageType="WebPage"
        breadcrumbs={[
          { name: 'Services', url: 'https://exquisitedentistryla.com/services' },
          { name: 'Porcelain Veneers', url: 'https://exquisitedentistryla.com/services/porcelain-veneers' }
        ]}
      />
      <OfferStructuredData
        offerName="Custom Porcelain Veneers"
        description="Transform your smile with custom-designed, ultra-thin porcelain shells that create naturally beautiful, perfectly aligned teeth."
        category="Cosmetic Dentistry"
        url="https://exquisitedentistryla.com/services/porcelain-veneers"
        priceCurrency="USD"
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block text-sm text-gold font-medium">PREMIUM COSMETIC DENTISTRY</span>
              <h1 className="heading-lg">
                Porcelain <span className="text-gold">Veneers</span>
              </h1>
              <div className="separator-left"></div>
              <p className="paragraph">
                Transform your smile with custom-designed, ultra-thin porcelain shells that create naturally beautiful, perfectly aligned teeth. Experience the art of cosmetic dentistry at its finest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="group">
                    Schedule Consultation
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="tel:+13103935133">
                  <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/5">
                    Call (310) 393-5133
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-sm overflow-hidden shadow-xl bg-black">
                <OptimizedImage
                  src="/lovable-uploads/33335962-b99c-4063-aa3c-96dfaf5215bb.png"
                  alt="Beautiful porcelain veneers transformation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="bg-gold text-white rounded-full p-4 flex items-center justify-center shadow-lg">
                    <Play className="h-8 w-8 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <section className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-gray-600">
            <Link to="/" className="hover:text-gold">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:text-gold">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-gold">Porcelain Veneers</span>
          </nav>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="inline-block text-sm text-gold font-medium">COSMETIC DENTISTRY</span>
            <h2 className="heading-lg">The Art of Perfect Smiles</h2>
            <div className="separator-left"></div>
            <p className="paragraph">
              Porcelain veneers are ultra-thin, custom-designed shells that are expertly bonded to the front surface of your teeth. They offer an immediate transformation for teeth that are chipped, gapped, stained, or misaligned, creating a naturally beautiful and perfectly symmetrical smile.
            </p>
            <p className="paragraph">
              At Exquisite Dentistry, Dr. Alexie Aguil combines artistic vision with technical precision to create veneers that complement your facial features and achieve your aesthetic goals. Each veneer is meticulously crafted to match the natural translucency and texture of tooth enamel.
            </p>
            <div className="pt-4">
              <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                <Button className="group">
                  Start Your Transformation
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl">
              <OptimizedImage
                src="/lovable-uploads/33335962-b99c-4063-aa3c-96dfaf5215bb.png"
                alt="Beautiful porcelain veneers transformation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-container bg-gray-50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm text-gold font-medium mb-3">BENEFITS</span>
          <h2 className="heading-lg mb-6">Why Choose Porcelain Veneers?</h2>
          <div className="separator mx-auto"></div>
          <p className="paragraph mt-6">
            Porcelain veneers offer unmatched versatility and natural beauty, addressing multiple cosmetic concerns with a single treatment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={benefit.title} className="border-0 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6 mx-auto">
                  {benefit.icon}
                </div>
                <h3 className="heading-sm mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm text-gold font-medium mb-3">THE PROCESS</span>
          <h2 className="heading-lg mb-6">Your Journey to a Perfect Smile</h2>
          <div className="separator mx-auto"></div>
          <p className="paragraph mt-6">
            Our meticulous process ensures your veneers look natural, feel comfortable, and last for years to come.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <div key={step.step} className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold text-white flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                {step.step}
              </div>
              <h3 className="heading-sm mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Before/After Section */}
      <section className="section-container bg-gray-50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm text-gold font-medium mb-3">TRANSFORMATIONS</span>
          <h2 className="heading-lg mb-6">Real Results, Real Smiles</h2>
          <div className="separator mx-auto"></div>
          <p className="paragraph mt-6">
            See the dramatic transformations our patients have achieved with porcelain veneers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Comprehensive Smile Makeover</h3>
            <p className="paragraph">
              This patient wanted to address multiple concerns: discolored teeth, gaps, and an uneven smile line. With a full set of porcelain veneers, we created a perfectly balanced, naturally white smile that complements her facial features beautifully.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <Check size={20} className="text-gold flex-shrink-0 mt-1" />
                <span className="ml-3">Corrected gaps and spacing issues</span>
              </div>
              <div className="flex items-start">
                <Check size={20} className="text-gold flex-shrink-0 mt-1" />
                <span className="ml-3">Achieved uniform color and brightness</span>
              </div>
              <div className="flex items-start">
                <Check size={20} className="text-gold flex-shrink-0 mt-1" />
                <span className="ml-3">Created perfect smile symmetry</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl">
              <OptimizedImage
                src="/lovable-uploads/2ab6ba69-7000-4368-9ec8-1264ebe5cee1.png"
                alt="Porcelain veneer transformation before and after"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-container">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="inline-block text-sm text-gold font-medium mb-3">FREQUENTLY ASKED</span>
          <h2 className="heading-lg mb-6">Questions About Porcelain Veneers</h2>
          <div className="separator mx-auto"></div>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 text-black">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-sans font-semibold text-white leading-tight mb-6">
              Ready for Your <span className="text-gold">Dream Smile?</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 font-light">
              Schedule your porcelain veneer consultation and discover how we can transform your smile with precision and artistry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto">Book Consultation</Button>
              </a>
              <Link to="/smile-gallery">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  View Gallery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PorcelainVeneersNew;