
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import PageSEO from '@/components/seo/PageSEO';
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
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import { SCHEDULING_URL } from '@/constants/urls';
import ImageComponent from '@/components/Image';

const SmileGallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { isMobile } = useBreakpoint();
  const sliderSectionRef = useRef<HTMLElement | null>(null);

  const handleViewGallery = () => {
    sliderSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <>
      <MasterStructuredData includeBusiness={true} />
      <ImageGalleryStructuredData galleryType="smile-transformations" />
      <PageSEO
        title="Before & After Gallery | LA Smile Transformations"
        description="View stunning before & after smile transformations. Real patient results from porcelain veneers, whitening, and full makeovers in LA."
        keywords="smile gallery Los Angeles, before after dental photos, smile transformation results, porcelain veneers before after, cosmetic dentistry results, patient transformations"
        path="/smile-gallery"
      />

      {/* Hero Section with VideoHero */}
      <VideoHero 
        title={<>Smile <span className="text-gold">Gallery</span></>} 
        subtitle="See the incredible results our patients have achieved with our expert dental care." 
        primaryCta={{
          text: "View Gallery",
          onClick: handleViewGallery
        }}
        secondaryCta={{
          text: "Schedule a Consultation",
          href: SCHEDULING_URL,
          target: "_blank",
          rel: "noopener noreferrer"
        }}
        height="medium" 
        badgeText="SMILE GALLERY" 
        scrollIndicator={true} 
      />

      {/* Patient Stories Section */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Client Smile Transformations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real transformations from our clients who trusted us with their smiles
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
      <section
        className="bg-gray-50 py-12 md:py-20"
        ref={sliderSectionRef}
        id="smile-gallery-sliders"
      >
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

      <section className="bg-white py-14 md:py-24 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="space-y-5">
            <span className="text-sm font-semibold tracking-[0.35em] text-gold uppercase">THE ARTISTS BEHIND THE SMILES</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-black">Dr. Alexie & Master Ceramist Wilson</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Every transformation you see above started with Dr. Alexie&rsquo;s chairside vision and Wilson&rsquo;s meticulous craftsmanship.
              The duo collaborates on shade, shape, and texture so your veneers, implants, or bonding look luminous on camera and in person.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-gold" />
                <span>Hand-layered ceramics that mimic natural enamel gradients.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-gold" />
                <span>Custom smile design sessions guided by the same technology in our gallery.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-gold" />
                <span>One-on-one delivery appointments so every detail is refined in real time.</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/about">
                <Button className="w-full sm:w-auto">Meet Dr. Alexie</Button>
              </Link>
              <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full sm:w-auto">
                  Book Your Reveal
                </Button>
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
              <ImageComponent
                src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762964432/Screenshot_2025-11-12_at_8.15.13_AM_lycfrz.png"
                alt="Dr. Alexie and Wilson reviewing a smile design together"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-500 text-center">
              Precision happens when the doctor and ceramist design every case side by side.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SmileGallery;
