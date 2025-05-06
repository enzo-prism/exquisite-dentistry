
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SmileGallery = () => {
  return (
    <>
      <Helmet>
        <title>Smile Gallery | Exquisite Dentistry</title>
        <meta name="description" content="View our amazing smile transformations at Exquisite Dentistry." />
      </Helmet>

      {/* Page title */}
      <section className="bg-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-gold">Smile Transformations</h1>
        </div>
      </section>

      {/* Smile transformation gallery */}
      <section className="bg-white py-4 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Patient 1 - Blonde woman */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">BEFORE</p>
              <img 
                src="/lovable-uploads/6ce2fbc9-ac08-4b7a-83b3-644a80e37c6b.png" 
                alt="Smile transformation before - blonde woman"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">AFTER</p>
              <img 
                src="/lovable-uploads/5bcd552b-6f71-4559-92b9-97dd3e1a2470.png" 
                alt="Smile transformation after - blonde woman with improved smile"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>

            {/* Patient 2 - Man with gray hair */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">BEFORE</p>
              <img 
                src="/lovable-uploads/7641dba4-9185-4856-bc7a-56f7cc3e03cd.png" 
                alt="Smile transformation before - man with gray hair"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">AFTER</p>
              <img 
                src="/lovable-uploads/ee15b843-0c64-42fb-8bb3-3a212d3a5e80.png" 
                alt="Smile transformation after - man with gray hair and improved smile"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Ready for Your Transformation?</h2>
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
