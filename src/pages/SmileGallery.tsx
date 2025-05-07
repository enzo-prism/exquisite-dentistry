
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import VideoHero from '@/components/VideoHero';
import { ChevronRight } from 'lucide-react';
import { useBreakpoint } from '@/hooks/use-mobile';
import { patientTransformations } from '@/data/patientTransformations';
import PatientTransformationCard from '@/components/PatientTransformation';

const SmileGallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { isMobile } = useBreakpoint();

  return (
    <>
      <Helmet>
        <title>Smile Gallery | Exquisite Dentistry</title>
        <meta name="description" content="View our amazing smile transformations at Exquisite Dentistry." />
      </Helmet>

      {/* Hero Section with VideoHero */}
      <VideoHero 
        title={<>Smile <span className="text-gold">Transformations</span></>} 
        subtitle="See the incredible results our patients have achieved with our expert dental care." 
        primaryCta={{
          text: "Schedule a Consultation"
        }} 
        height="medium" 
        badgeText="SMILE GALLERY" 
        scrollIndicator={true} 
      />

      {/* Simplified smile transformation gallery */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-semibold mb-8 text-center">Real Patient Results</h2>
          
          {/* Patient transformations grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {patientTransformations.map((patient, index) => (
              <PatientTransformationCard key={`patient-${index}`} patient={patient} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile-optimized CTA section */}
      <section className="bg-gray-50 py-10 md:py-12">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6">Ready for Your Own Transformation?</h2>
          <p className="text-gray-600 mb-6 md:mb-8">Our cosmetic dentistry experts can help you achieve the smile you've always dreamed of.</p>
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 justify-center`}>
            <Button asChild className="bg-gold hover:bg-gold/90 text-white px-6 py-5 w-full md:w-auto">
              <a href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" target="_blank" rel="noopener noreferrer">
                Schedule Your Consultation
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10 w-full md:w-auto">
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
