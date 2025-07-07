
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import VideoHero from '@/components/VideoHero';
import { ChevronRight } from 'lucide-react';
import { useBreakpoint } from '@/hooks/use-mobile';
import { patientTransformations } from '@/data/patientTransformations';
import PatientTransformationCard from '@/components/PatientTransformation';
import { closeUpTransformations } from '@/data/closeUpTransformations';
import CloseUpTransformationCard from '@/components/CloseUpTransformation';
import ImageGalleryStructuredData from '@/components/ImageGalleryStructuredData';

const SmileGallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { isMobile } = useBreakpoint();

  return (
    <>
      <ImageGalleryStructuredData galleryType="smile-transformations" />
      <Helmet>
        <title>Before & After Smile Gallery Los Angeles | Real Patient Results</title>
        <meta name="description" content="View amazing before and after smile transformations from Exquisite Dentistry in Los Angeles. Real patient results from veneers, whitening, and cosmetic dental procedures." />
        <meta name="keywords" content="smile gallery Los Angeles, before after dental photos, smile transformation results, porcelain veneers before after, cosmetic dentistry results, patient transformations" />
        <meta property="og:title" content="Before & After Smile Gallery Los Angeles | Real Patient Results" />
        <meta property="og:description" content="View amazing before and after smile transformations from cosmetic dental procedures at Exquisite Dentistry in Los Angeles." />
        <meta property="og:image" content="/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://exquisitedentistryla.com/smile-gallery" />
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

      {/* Patient Stories Section */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Patient Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real transformations from our patients who trusted us with their smiles
            </p>
          </div>
          
          {/* Patient transformations grid - standardized responsive breakpoints */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {patientTransformations.map((patient, index) => (
              <PatientTransformationCard key={`patient-${index}`} patient={patient} />
            ))}
          </div>
        </div>
      </section>

      {/* Up Close Transformations Section */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Up Close Transformations</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              See the incredible detail and precision of our cosmetic dental work. 
              Drag the slider to reveal the dramatic before and after results.
            </p>
          </div>
          
          {/* Close-up transformations grid - standardized responsive breakpoints */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {closeUpTransformations.map((transformation) => (
              <CloseUpTransformationCard 
                key={transformation.id} 
                transformation={transformation}
                className="animate-fade-in"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SmileGallery;
