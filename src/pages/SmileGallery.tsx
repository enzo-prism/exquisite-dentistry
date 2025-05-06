
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';

const SmileGallery = () => {
  return (
    <>
      <Helmet>
        <title>Smile Gallery | Exquisite Dentistry</title>
        <meta name="description" content="View our amazing smile transformations at Exquisite Dentistry. Before and after photos of our cosmetic dentistry work in Los Angeles." />
      </Helmet>

      {/* Featured Image Section */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4 text-center">
          <img 
            src="/lovable-uploads/79cfda4c-3311-48c3-ac16-8da387378db8.png" 
            alt="Beautiful smile transformation" 
            className="mx-auto max-w-full h-auto rounded-lg shadow-md"
            style={{ maxHeight: '400px' }}
          />
        </div>
      </section>

      {/* Hero Section - Simplified */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block text-sm text-gold font-medium mb-3">TRANSFORMATIONS</span>
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Smile Transformations</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            See the remarkable difference our dental services can make. 
            Browse our before and after gallery showcasing real results from our patients.
          </p>
        </div>
      </section>

      {/* Gallery Section - Simplified */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <BeforeAfterGallery />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ready to Transform Your Smile?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Schedule your consultation with Dr. Aguil and discover how we can help you 
            achieve the smile you've always wanted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gold hover:bg-gold/90 text-white">
              <a href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" target="_blank" rel="noopener noreferrer">
                Schedule Consultation
              </a>
            </Button>
            <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SmileGallery;
