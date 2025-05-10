
import React from 'react';
import VideoHero from '@/components/VideoHero';
import ClientExperienceSection from '@/components/PatientExperienceSection';
import { Helmet } from 'react-helmet-async';
import DrAguilGallery from '@/components/DrAguilGallery';
import ServicesSection from '@/components/ServicesSection';
import ReviewWidget from '@/components/ReviewWidget';
import SeasonalTreatments from '@/components/SeasonalTreatments';

const IndexPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Exquisite Dentistry - Los Angeles Cosmetic Dentist</title>
        <meta name="description" content="Experience world-class cosmetic dentistry in Los Angeles with Dr. Alexie Aguil. Specializing in smile transformations and personalized care." />
        <meta property="og:title" content="Exquisite Dentistry - Los Angeles Cosmetic Dentist" />
        <meta property="og:description" content="Experience world-class cosmetic dentistry in Los Angeles with Dr. Alexie Aguil. Specializing in smile transformations and personalized care." />
        <meta property="og:image" content="/lovable-uploads/aaedf2d1-c204-4ff6-9e44-695686f3871c.png" />
        <meta property="og:url" content="https://exquisitedentistry.com" />
      </Helmet>
      
      <VideoHero 
        title={<>Welcome to <span className="text-gold">Exquisite Dentistry</span></>} 
        subtitle="Experience world-class cosmetic dentistry in Los Angeles with Dr. Alexie Aguil." 
        primaryCta={{
          text: "Schedule a Consultation",
          href: "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
        }}
        secondaryCta={{
          text: "Learn More",
          href: "/about"
        }}
      />
      <SeasonalTreatments />
      <ServicesSection />
      <ClientExperienceSection />
      <DrAguilGallery />
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-sm text-gold font-medium mb-3">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Client <span className="text-gold">Reviews</span>
            </h2>
            <div className="separator mx-auto"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              See what our clients are saying about their experience at Exquisite Dentistry
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-sm border border-gray-100 p-8">
            <ReviewWidget />
          </div>
        </div>
      </section>
    </>
  );
};

export default IndexPage;
