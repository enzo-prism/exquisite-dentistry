
import React from 'react';
import VideoHero from '@/components/VideoHero';
import ClientExperienceSection from '@/components/PatientExperienceSection';
import { Helmet } from 'react-helmet-async';
import DrAguilGallery from '@/components/DrAguilGallery';
import GoogleReviews from '@/components/GoogleReviews';
import ServicesSection from '@/components/ServicesSection';

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
      <GoogleReviews />
    </>
  );
};

export default IndexPage;
