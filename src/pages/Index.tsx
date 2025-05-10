import React from 'react';
import HeroSection from '@/components/HeroSection';
import ClientExperienceSection from '@/components/PatientExperienceSection';
import ServicesSection from '@/components/ServicesSection';
import DrAguilGallery from '@/components/DrAguilGallery';
import TransformationGallery from '@/components/TransformationGallery';
import GoogleReviews from '@/components/GoogleReviews';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exquisite Dentistry - Los Angeles Cosmetic Dentist',
  description: 'Experience world-class cosmetic dentistry in Los Angeles with Dr. Alexie Aguil. Specializing in smile transformations and personalized care.',
  openGraph: {
    title: 'Exquisite Dentistry - Los Angeles Cosmetic Dentist',
    description: 'Experience world-class cosmetic dentistry in Los Angeles with Dr. Alexie Aguil. Specializing in smile transformations and personalized care.',
    images: ['/lovable-uploads/aaedf2d1-c204-4ff6-9e44-695686f3871c.png'],
    url: 'https://exquisitedentistry.com',
  },
};

const IndexPage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ClientExperienceSection />
      <ServicesSection />
      <DrAguilGallery />
      <TransformationGallery />
      <GoogleReviews />
    </>
  );
};

export default IndexPage;
