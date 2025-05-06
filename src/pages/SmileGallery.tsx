
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

      {/* Super simple image display */}
      <section className="bg-white py-4 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* New uploaded image pair 1 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">BEFORE</p>
              <img 
                src="/lovable-uploads/0cbed633-33a3-4a68-adfc-6478828f2e92.png" 
                alt="Smile transformation before - blonde woman"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">AFTER</p>
              <img 
                src="/lovable-uploads/7738901f-6840-4eaf-beed-66eccb335723.png" 
                alt="Smile transformation after - blonde woman with improved smile"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>

            {/* New uploaded image pair 2 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">BEFORE</p>
              <img 
                src="/lovable-uploads/da378185-9743-4ad1-8ce1-ea01988c9334.png" 
                alt="Smile transformation before - man with gray hair"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">AFTER</p>
              <img 
                src="/lovable-uploads/4675f75a-ae1b-4651-b0b6-19d43b7fa9e4.png" 
                alt="Smile transformation after - man with gray hair and improved smile"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>

            {/* New Image */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">BEFORE</p>
              <img 
                src="/lovable-uploads/51132a46-8cea-4c27-8d9b-e8573ad67aab.png" 
                alt="New smile transformation before"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">AFTER</p>
              <img 
                src="/lovable-uploads/51132a46-8cea-4c27-8d9b-e8573ad67aab.png" 
                alt="New smile transformation after"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>

            {/* Before/After 1 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">BEFORE</p>
              <img 
                src="/lovable-uploads/12dc2c79-1117-472c-b6f1-ec5f0c10211a.png" 
                alt="Smile transformation before 1"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">AFTER</p>
              <img 
                src="/lovable-uploads/eb25f991-bf24-480c-8f52-8ad7b5de8822.png" 
                alt="Smile transformation after 1"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>

            {/* Before/After 2 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">BEFORE</p>
              <img 
                src="/lovable-uploads/37cdc255-28ce-4666-a15a-77d31eb76918.png" 
                alt="Smile transformation before 2"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">AFTER</p>
              <img 
                src="/lovable-uploads/bfaf7bd3-d0b6-442a-860a-9e5f488bc85f.png" 
                alt="Smile transformation after 2"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>

            {/* Before/After 3 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">BEFORE</p>
              <img 
                src="/lovable-uploads/cad1dd9b-5c06-4e3c-bec8-7d2529902c09.png" 
                alt="Smile transformation before 3"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">AFTER</p>
              <img 
                src="/lovable-uploads/eaf61f0f-aa5e-488a-ac17-87b4bc3fbf67.png" 
                alt="Smile transformation after 3"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>

            {/* Before/After 4 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">BEFORE</p>
              <img 
                src="/lovable-uploads/5f3a041e-ea53-4da8-bc1f-1eeb90b730c1.png" 
                alt="Smile transformation before 4"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">AFTER</p>
              <img 
                src="/lovable-uploads/f12764ad-4c25-4e5b-9f3c-6d29dad5744c.png" 
                alt="Smile transformation after 4"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>

            {/* Before/After 5 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">BEFORE</p>
              <img 
                src="/lovable-uploads/d00303bf-350e-4362-aeb3-6847c830d4ed.png" 
                alt="Smile transformation before 5"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">AFTER</p>
              <img 
                src="/lovable-uploads/93f1a500-b803-42fa-838f-9442f9bb6935.png" 
                alt="Smile transformation after 5"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>

            {/* Before/After 6 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">BEFORE</p>
              <img 
                src="/lovable-uploads/2c732616-978d-4757-b992-b94b8950041d.png" 
                alt="Smile transformation before 6"
                className="w-full h-auto rounded-md"
                width="300"
                height="200"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gold font-medium mb-2 text-center">AFTER</p>
              <img 
                src="/lovable-uploads/5e6b1354-41ce-40e9-ad5a-104165497581.png" 
                alt="Smile transformation after 6"
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
