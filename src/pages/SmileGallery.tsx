
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
            {/* First patient - before image */}
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-sm text-gold font-medium mb-2 text-center">BEFORE</p>
              <div className="w-full overflow-hidden rounded-md">
                <AspectRatio ratio={3/2}>
                  <img 
                    src="/lovable-uploads/7be70408-3316-4a36-8ad0-68fafc9d0e05.png" 
                    alt="Patient smile before transformation"
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
            </div>
            
            {/* First patient - after image */}
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-sm text-gold font-medium mb-2 text-center">AFTER</p>
              <div className="w-full overflow-hidden rounded-md">
                <AspectRatio ratio={3/2}>
                  <img 
                    src="/lovable-uploads/52dd6454-e5d1-4a7e-aa17-65a34cbc8044.png" 
                    alt="Patient smile after transformation"
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
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
