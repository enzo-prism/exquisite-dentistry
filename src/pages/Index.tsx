
import React from 'react';
import VideoHero from '@/components/VideoHero';
import ClientExperienceSection from '@/components/PatientExperienceSection';
import { Helmet } from 'react-helmet-async';
import DrAguilGallery from '@/components/DrAguilGallery';
import ServicesSection from '@/components/ServicesSection';
import ReviewWidget from '@/components/ReviewWidget';

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
      <ServicesSection />
      <ClientExperienceSection />
      <DrAguilGallery />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Client <span className="text-gold">Reviews</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              See what our clients are saying about their experience at Exquisite Dentistry
            </p>
          </div>
          <div className="bg-white shadow-md p-8 rounded-sm">
            <ReviewWidget />
          </div>
        </div>
      </section>
    </>
  );
};

export default IndexPage;
