import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Sparkles, Shield, Star } from 'lucide-react';
import Button from '@/components/Button';

const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

const ZoomWhiteningSimple = () => {
  return (
    <>
      <Helmet>
        <title>Zoom Teeth Whitening Los Angeles | Professional In-Office Whitening</title>
        <meta name="description" content="Get a brilliantly white smile in just 90 minutes with Zoom teeth whitening in Los Angeles. Professional in-office treatment that delivers up to 8 shades whiter teeth." />
        <link rel="canonical" href="https://exquisitedentistryla.com/services/zoom-whitening" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block text-sm font-medium" style={{ color: 'hsl(var(--primary))' }}>TRANSFORM YOUR SMILE TODAY</span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Professional <span style={{ color: 'hsl(var(--primary))' }}>Zoom Whitening</span>
              </h1>
              <div className="w-12 h-1 rounded" style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Get a brilliantly white smile in just 90 minutes with our advanced in-office Zoom teeth whitening treatment. Safe, effective, and immediate results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="group">
                    Book Your Whitening Session
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="tel:+13103935133">
                  <Button size="lg" variant="outline">
                    Call (310) 393-5133
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-sm overflow-hidden shadow-xl">
                <img
                  src="/lovable-uploads/52dd6454-e5d1-4a7e-aa17-65a34cbc8044.png"
                  alt="Zoom whitening treatment results"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:text-primary">Services</Link>
            <span className="mx-2">/</span>
            <span style={{ color: 'hsl(var(--primary))' }}>Zoom Whitening</span>
          </nav>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium mb-3" style={{ color: 'hsl(var(--primary))' }}>WHY CHOOSE ZOOM</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Gold Standard in Teeth Whitening</h2>
            <div className="w-12 h-1 rounded mx-auto" style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Clock size={24} />, title: "90-Minute Treatment", description: "Get dramatically whiter teeth in just one visit" },
              { icon: <Sparkles size={24} />, title: "Up to 8 Shades Whiter", description: "Professional-grade results that last" },
              { icon: <Shield size={24} />, title: "Safe & Comfortable", description: "Enamel-safe formula with minimal sensitivity" },
              { icon: <Star size={24} />, title: "Immediate Results", description: "Walk out with a brilliantly white smile" }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-sm shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white mb-4" style={{ backgroundColor: 'hsl(var(--primary))' }}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get Your <span style={{ color: 'hsl(var(--primary))' }}>Brightest Smile</span> Today
          </h2>
          <p className="text-xl mb-8 text-white/80 max-w-3xl mx-auto">
            Professional Zoom whitening delivers instant, dramatic results. Schedule your appointment now and walk out with a brilliantly white smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg">
                Book Zoom Whitening
              </Button>
            </a>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Contact Us
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/60">
            Or call us directly at (310) 393-5133
          </p>
        </div>
      </section>
    </>
  );
};

export default ZoomWhiteningSimple;