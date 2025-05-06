
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SmileGallery = () => {
  return (
    <>
      <Helmet>
        <title>Smile Gallery | Exquisite Dentistry</title>
        <meta name="description" content="View our amazing smile transformations at Exquisite Dentistry. Before and after photos of our cosmetic dentistry work in Los Angeles." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-sm text-gold font-medium mb-3">TRANSFORMATIONS</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">Ryan's Smile Transformation</h1>
            <div className="separator"></div>
            <p className="text-lg text-gray-700 mt-6 mobile-text-balance">
              Witness the remarkable transformation of Ryan's smile. Our commitment to creating 
              natural, beautiful smiles has helped Ryan achieve a brighter, more confident smile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-20 bg-white">
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
