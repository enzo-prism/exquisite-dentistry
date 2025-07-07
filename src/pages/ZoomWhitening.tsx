import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import { ArrowRight, Check, Clock, Shield, Sparkles, Star } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import { Card, CardContent } from '@/components/ui/card';
import { trackComponentRender, trackContentLoad, addBreadcrumb } from '@/lib/sentry';

const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

const ZoomWhitening = () => {
  console.log('ZoomWhitening component rendering');
  
  useEffect(() => {
    // Track component render with detailed context
    trackComponentRender('ZoomWhitening', {
      path: '/services/zoom-whitening',
      timestamp: new Date().toISOString()
    });
    
    // Add breadcrumb for content loading
    addBreadcrumb('ZoomWhitening component mounted', 'component', 'info');
    
    // Track content load success
    trackContentLoad('ZoomWhitening content', true);
    
    console.log('ZoomWhitening: Component fully mounted and tracked');
  }, []);
  
  const benefits = [
    {
      icon: <Clock size={24} />,
      title: "90-Minute Treatment",
      description: "Get dramatically whiter teeth in just one visit"
    },
    {
      icon: <Sparkles size={24} />,
      title: "Up to 8 Shades Whiter",
      description: "Professional-grade results that last"
    },
    {
      icon: <Shield size={24} />,
      title: "Safe & Comfortable",
      description: "Enamel-safe formula with minimal sensitivity"
    },
    {
      icon: <Star size={24} />,
      title: "Immediate Results",
      description: "Walk out with a brilliantly white smile"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Consultation",
      description: "We assess your teeth and discuss your whitening goals"
    },
    {
      step: "2",
      title: "Preparation",
      description: "Teeth are cleaned and gums are protected with a special barrier"
    },
    {
      step: "3",
      title: "Whitening Application",
      description: "Zoom whitening gel is applied to your teeth"
    },
    {
      step: "4",
      title: "Activation",
      description: "Special LED light activates the gel for 15-minute sessions"
    },
    {
      step: "5",
      title: "Final Treatment",
      description: "Fluoride treatment to reduce sensitivity and protect enamel"
    }
  ];

  const faqs = [
    {
      question: "How long do Zoom whitening results last?",
      answer: "With proper care and maintenance, Zoom whitening results typically last 1-3 years. We provide custom take-home trays and whitening gel for touch-ups."
    },
    {
      question: "Will Zoom whitening make my teeth sensitive?",
      answer: "Some patients experience temporary sensitivity, but we use desensitizing treatments before and after to minimize discomfort. Most sensitivity resolves within 24-48 hours."
    },
    {
      question: "Is Zoom whitening safe for my teeth?",
      answer: "Yes, Zoom whitening is completely safe when performed by a dental professional. The pH-balanced formula protects your enamel while removing stains."
    },
    {
      question: "How much whiter will my teeth get?",
      answer: "Most patients see their teeth become 6-8 shades whiter in a single session. Results vary based on the starting shade and type of staining."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Zoom Teeth Whitening Los Angeles | Professional In-Office Whitening</title>
        <meta name="description" content="Get a brilliantly white smile in just 90 minutes with Zoom teeth whitening in Los Angeles. Professional in-office treatment that delivers up to 8 shades whiter teeth. Book your whitening session today!" />
        <meta name="keywords" content="zoom whitening, teeth whitening Los Angeles, professional teeth whitening, in-office whitening, zoom teeth whitening, cosmetic dentistry" />
        <meta property="og:title" content="Zoom Teeth Whitening Los Angeles | 90-Minute Professional Whitening" />
        <meta property="og:description" content="Transform your smile with Zoom professional teeth whitening. Get up to 8 shades whiter in just one visit at Exquisite Dentistry Los Angeles." />
        <link rel="canonical" href="https://exquisitedentistryla.com/services/zoom-whitening" />
      </Helmet>
      <ServiceStructuredData 
        serviceName="Zoom Teeth Whitening"
        description="Professional in-office teeth whitening treatment that delivers up to 8 shades whiter teeth in just 90 minutes."
        url="/services/zoom-whitening"
        image="/lovable-uploads/52dd6454-e5d1-4a7e-aa17-65a34cbc8044.png"
        priceRange="$$"
      />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm text-gold font-medium mb-4">TRANSFORM YOUR SMILE TODAY</span>
          <h1 className="text-5xl font-bold mb-6">
            Professional <span className="text-gold">Zoom Whitening</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get a brilliantly white smile in just 90 minutes with our advanced in-office Zoom teeth whitening treatment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg">Book Your Whitening Session</Button>
            </a>
            <a href="tel:+13103935133">
              <Button size="lg" variant="outline">Call (310) 393-5133</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-sm text-gold font-medium mb-3">WHY CHOOSE ZOOM</span>
            <h2 className="text-4xl font-bold mb-4">The Gold Standard in Teeth Whitening</h2>
            <div className="separator"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Zoom whitening is the #1 patient-requested professional whitening treatment, delivering dramatic results in a single visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-sm text-gold font-medium mb-3">REAL RESULTS</span>
              <h2 className="text-4xl font-bold mb-6">See the Zoom Difference</h2>
              <div className="separator-left mb-6"></div>
              <p className="text-lg text-gray-600 mb-6">
                Our patients consistently achieve remarkable whitening results with Zoom. The advanced LED light-activated technology breaks down even the most stubborn stains from coffee, wine, tea, and tobacco.
              </p>
              
              <div className="bg-gold/10 p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-lg mb-3">What Zoom Whitening Treats:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Coffee & tea stains', 'Wine discoloration', 'Tobacco stains', 'Age-related yellowing', 'Food stains', 'Medication discoloration'].map((item) => (
                    <div key={item} className="flex items-center">
                      <Check size={18} className="text-gold mr-2" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="group"
                >
                  Schedule Your Whitening
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <OptimizedImage
                  src="/lovable-uploads/52dd6454-e5d1-4a7e-aa17-65a34cbc8044.png"
                  alt="Zoom whitening results"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
                <div className="flex items-center mb-2">
                  <Star className="text-gold fill-gold" size={20} />
                  <Star className="text-gold fill-gold" size={20} />
                  <Star className="text-gold fill-gold" size={20} />
                  <Star className="text-gold fill-gold" size={20} />
                  <Star className="text-gold fill-gold" size={20} />
                </div>
                <p className="text-sm italic">"My teeth are 8 shades whiter! The results were immediate and amazing."</p>
                <p className="text-xs text-gray-500 mt-2">- Sarah M., Zoom Patient</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-sm text-gold font-medium mb-3">THE PROCESS</span>
            <h2 className="text-4xl font-bold mb-4">Your 90-Minute Transformation</h2>
            <div className="separator"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-center">Ready for a Brighter Smile?</h3>
            <p className="text-center text-gray-600 mb-6">
              Join thousands of patients who have transformed their smiles with Zoom whitening at Exquisite Dentistry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg">
                  Book Your Session
                </Button>
              </a>
              <a href="tel:+13103935133">
                <Button size="lg" variant="outline">
                  Call (310) 393-5133
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-sm text-gold font-medium mb-3">FREQUENTLY ASKED</span>
            <h2 className="text-4xl font-bold mb-4">Zoom Whitening Questions</h2>
            <div className="separator"></div>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Get Your <span className="text-gold">Brightest Smile</span> Today
          </h2>
          <p className="text-xl mb-8 text-white/80">
            Professional Zoom whitening delivers instant, dramatic results. Schedule your appointment now and walk out with a brilliantly white smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg">
                Book Zoom Whitening
              </Button>
            </a>
            <a href="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Contact Us
              </Button>
            </a>
          </div>
          <p className="mt-8 text-sm text-white/60">
            Or call us directly at (310) 393-5133
          </p>
        </div>
      </section>
    </>
  );
};

export default ZoomWhitening; 