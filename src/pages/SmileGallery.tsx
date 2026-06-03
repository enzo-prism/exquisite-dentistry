
import React, { useEffect, useRef } from 'react';
import PageSEO from '@/components/seo/PageSEO';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/Breadcrumbs';
import VideoHero from '@/components/VideoHero';
import { patientTransformations } from '@/data/patientTransformations';
import PatientTransformationCard from '@/components/PatientTransformation';
import { closeUpTransformations } from '@/data/closeUpTransformations';
import CloseUpTransformationCard from '@/components/CloseUpTransformation';
import ImageGalleryStructuredData from '@/components/ImageGalleryStructuredData';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { ROUTE_METADATA } from '@/constants/metadata';
import FinancingOptionsSection from '@/components/FinancingOptionsSection';

const SmileGallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const meta = ROUTE_METADATA['/smile-gallery'];
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
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/smile-gallery"
        ogImage={meta.ogImage}
      />
      <WebPageStructuredData
        title="Smile Gallery"
        description={meta.description}
        url="https://exquisitedentistryla.com/smile-gallery"
        breadcrumbs={[
          { name: 'Smile Gallery', url: 'https://exquisitedentistryla.com/smile-gallery/' }
        ]}
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
          text: "Schedule Consultation",
          href: SCHEDULE_CONSULTATION_PATH
        }}
        height="medium" 
        badgeText="SMILE GALLERY" 
        scrollIndicator={true} 
      />

      <div className="container mx-auto px-4 mt-6 max-w-6xl">
        <Breadcrumbs items={[{ label: 'Smile Gallery', to: '/smile-gallery/' }]} />
      </div>

      {/* Patient Stories Section */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Client Smile Transformations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real transformations from our clients who trusted us with their smiles
            </p>
              <p className="mt-4 text-sm text-gray-600 max-w-2xl mx-auto">
              Planning a full transformation? Explore our{" "}
              <Link to="/smile-makeover-los-angeles/" className="text-primary underline underline-offset-4">
                Smile Makeover in Los Angeles guide
              </Link>
              .
            </p>
            <div className="mt-8 border-y border-gold/20 bg-stone-50/80 px-4 py-6 text-left md:px-8">
              <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                    Real Patients, Real Results
                  </p>
                  <p className="mt-3 text-base leading-7 text-gray-600">
                    These are actual Exquisite Dentistry transformations, not AI renderings. Browse
                    the before-and-after cases, then compare them with patient reviews for another
                    layer of trust before planning your own smile goals.
                  </p>
                </div>
                <Link
                  to="/testimonials/"
                  className="inline-flex items-center justify-center rounded-md border border-gold/40 px-5 py-3 text-sm font-semibold text-secondary transition hover:border-gold hover:bg-white"
                >
                  Read Patient Reviews
                </Link>
              </div>
            </div>
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

      <FinancingOptionsSection
        className="bg-white"
        eyebrow="Smile Gallery Financing"
        title="Inspired by a transformation? Review payment options before you book."
        description="If one of these real patient cases helps you picture a larger smile plan, Cherry can help eligible patients review possible monthly payment options for veneers, implants, Invisalign, whitening, or a complete smile makeover."
        disclaimer="Financing is optional, and financing decisions are handled through Cherry. You can explore payment options first or schedule a consultation and talk through treatment details with our team."
        primaryCtaText="Review Payment Options"
        secondaryCtaText="Schedule Consultation"
        secondaryCtaHref={SCHEDULE_CONSULTATION_PATH}
      />

    </>
  );
};

export default SmileGallery;
