
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Simple static array with direct image paths
const transformations = [
  {
    id: 1,
    before: '/lovable-uploads/12dc2c79-1117-472c-b6f1-ec5f0c10211a.png',
    after: '/lovable-uploads/eb25f991-bf24-480c-8f52-8ad7b5de8822.png'
  },
  {
    id: 2,
    before: '/lovable-uploads/37cdc255-28ce-4666-a15a-77d31eb76918.png',
    after: '/lovable-uploads/bfaf7bd3-d0b6-442a-860a-9e5f488bc85f.png'
  },
  {
    id: 3,
    before: '/lovable-uploads/cad1dd9b-5c06-4e3c-bec8-7d2529902c09.png',
    after: '/lovable-uploads/eaf61f0f-aa5e-488a-ac17-87b4bc3fbf67.png'
  },
  {
    id: 4,
    before: '/lovable-uploads/5f3a041e-ea53-4da8-bc1f-1eeb90b730c1.png',
    after: '/lovable-uploads/f12764ad-4c25-4e5b-9f3c-6d29dad5744c.png'
  },
  {
    id: 5,
    before: '/lovable-uploads/d00303bf-350e-4362-aeb3-6847c830d4ed.png',
    after: '/lovable-uploads/93f1a500-b803-42fa-838f-9442f9bb6935.png'
  },
  {
    id: 6,
    before: '/lovable-uploads/2c732616-978d-4757-b992-b94b8950041d.png',
    after: '/lovable-uploads/5e6b1354-41ce-40e9-ad5a-104165497581.png'
  }
];

const SmileGallery = () => {
  return (
    <>
      <Helmet>
        <title>Smile Gallery | Exquisite Dentistry</title>
        <meta name="description" content="View our amazing smile transformations at Exquisite Dentistry." />
      </Helmet>

      {/* Page title */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-gold">Smile Transformations</h1>
        </div>
      </section>

      {/* Simple, reliable before/after grid */}
      <section className="bg-white py-4 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transformations.map((item) => (
              <div key={item.id} className="flex flex-col gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gold font-medium mb-2 text-center">BEFORE</p>
                  <img 
                    src={item.before} 
                    alt={`Smile transformation before ${item.id}`}
                    className="w-full h-auto rounded-md object-cover"
                    width="400"
                    height="300"
                  />
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gold font-medium mb-2 text-center">AFTER</p>
                  <img 
                    src={item.after} 
                    alt={`Smile transformation after ${item.id}`}
                    className="w-full h-auto rounded-md object-cover"
                    width="400"
                    height="300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Ready for Your Transformation?</h2>
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
