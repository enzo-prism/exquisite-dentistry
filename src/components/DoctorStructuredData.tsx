import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/utils/schemaValidation';

const DoctorStructuredData: React.FC = () => {
  const aboutCanonical = getCanonicalUrl('/about');
  const doctorData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dr. Alexie Aguil',
    jobTitle: 'Cosmetic Dentist',
    description: 'Leading cosmetic dentist in Los Angeles with over 15 years of experience specializing in smile transformations, porcelain veneers, and advanced dental techniques.',
    image: 'https://exquisitedentistryla.com/lovable-uploads/2c190bb5-bec9-4315-b3d6-242677c1a66d.png',
    url: aboutCanonical,
    worksFor: {
      '@id': 'https://exquisitedentistryla.com/#business'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6227 Wilshire Blvd',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      postalCode: '90048',
      addressCountry: 'US'
    },
    telephone: '(323) 272-2388',
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Doctor of Dental Surgery',
        educationalLevel: 'Doctorate'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Invisalign Lifetime Achievement Award',
        credentialCategory: 'Professional Achievement'
      }
    ],
    memberOf: [
      {
        '@type': 'ProfessionalService',
        name: 'American Academy of Cosmetic Dentistry'
      }
    ],
    knowsAbout: [
      'Cosmetic Dentistry',
      'Porcelain Veneers',
      'Teeth Whitening',
      'Dental Implants',
      'Smile Makeover',
      'Invisalign',
      'Dental Crowns',
      'Restorative Dentistry'
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'UCLA School of Dentistry'
    },
    award: [
      'Invisalign Lifetime Achievement Award',
      'Top Cosmetic Dentist Los Angeles'
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Cosmetic Dentist',
      occupationLocation: {
        '@type': 'City',
        name: 'Los Angeles'
      },
      experienceRequirements: '15+ years of experience in cosmetic dentistry'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(doctorData)}</script>
    </Helmet>
  );
};

export default DoctorStructuredData;
