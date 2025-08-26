import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ServiceStructuredDataProps {
  serviceName: string;
  description: string;
  url: string;
  image?: string;
  priceRange?: string;
}

const ServiceStructuredData: React.FC<ServiceStructuredDataProps> = ({ 
  serviceName, 
  description, 
  url, 
  image,
  priceRange 
}) => {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: serviceName,
    description: description,
    url: `https://exquisitedentistryla.com${url}`,
    image: image || 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
    provider: {
      '@type': ['LocalBusiness', 'Dentist'],
      name: 'Exquisite Dentistry',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '6227 Wilshire Blvd',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90048',
        addressCountry: 'US'
      },
      telephone: '(323) 272-2388'
    },
    performer: {
      '@type': 'Person',
      name: 'Dr. Alexie Aguil',
      jobTitle: 'Cosmetic Dentist'
    },
    ...(priceRange && { priceRange }),
    category: 'Cosmetic Dentistry',
    bodyLocation: {
      '@type': 'BodySystem',
      name: 'Oral and Dental System'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(serviceData)}</script>
    </Helmet>
  );
};

export default ServiceStructuredData;