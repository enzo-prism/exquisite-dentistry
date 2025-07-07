import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Smile, Clock } from 'lucide-react';
import Button from '@/components/Button';

const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

const PorcelainVeneersSimple = () => {
  return (
    <>
      <Helmet>
        <title>Porcelain Veneers Los Angeles | Custom Smile Makeovers</title>
        <meta name="description" content="Transform your smile with custom porcelain veneers in Los Angeles. Ultra-thin, natural-looking shells that correct chips, gaps, stains, and imperfections." />
        <link rel="canonical" href="https://exquisitedentistryla.com/services/porcelain-veneers" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block text-sm font-medium" style={{ color: 'hsl(var(--primary))' }}>PREMIUM COSMETIC DENTISTRY</span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Porcelain <span style={{ color: 'hsl(var(--primary))' }}>Veneers</span>
              </h1>
              <div className="w-12 h-1 rounded" style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
              <p className="text-lg text-gray-600 leading-relaxed">
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
                  <Button size="lg" variant="outline">
                    Call (310) 393-5133
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-sm overflow-hidden shadow-xl">
                <img
                  src="/lovable-uploads/33335962-b99c-4063-aa3c-96dfaf5215bb.png"
                  alt="Beautiful porcelain veneers transformation"
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
            <span style={{ color: 'hsl(var(--primary))' }}>Porcelain Veneers</span>
          </nav>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block text-sm font-medium" style={{ color: 'hsl(var(--primary))' }}>COSMETIC DENTISTRY</span>
              <h2 className="text-3xl md:text-4xl font-bold">The Art of Perfect Smiles</h2>
              <div className="w-12 h-1 rounded" style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Porcelain veneers are ultra-thin, custom-designed shells that are expertly bonded to the front surface of your teeth. They offer an immediate transformation for teeth that are chipped, gapped, stained, or misaligned.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Exquisite Dentistry, Dr. Alexie Aguil combines artistic vision with technical precision to create veneers that complement your facial features and achieve your aesthetic goals.
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
                <img
                  src="/lovable-uploads/33335962-b99c-4063-aa3c-96dfaf5215bb.png"
                  alt="Beautiful porcelain veneers transformation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm font-medium mb-3" style={{ color: 'hsl(var(--primary))' }}>BENEFITS</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Porcelain Veneers?</h2>
            <div className="w-12 h-1 rounded mx-auto" style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Star size={24} />, title: "Natural Appearance", description: "Ultra-thin porcelain shells mimic natural tooth enamel" },
              { icon: <ShieldCheck size={24} />, title: "Stain Resistant", description: "High-quality porcelain resists staining from coffee and wine" },
              { icon: <Smile size={24} />, title: "Instant Transformation", description: "Correct multiple imperfections at once" },
              { icon: <Clock size={24} />, title: "Long-Lasting", description: "With proper care, veneers can last 10-15 years or more" }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-sm shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white mb-6 mx-auto" style={{ backgroundColor: 'hsl(var(--primary))' }}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Ready for Your <span style={{ color: 'hsl(var(--primary))' }}>Dream Smile?</span>
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Schedule your porcelain veneer consultation and discover how we can transform your smile with precision and artistry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg">Book Consultation</Button>
              </a>
              <Link to="/smile-gallery">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
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

export default PorcelainVeneersSimple;