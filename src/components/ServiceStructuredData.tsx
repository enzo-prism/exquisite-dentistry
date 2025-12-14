import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/utils/schemaValidation';

interface ServiceStructuredDataProps {
  serviceName: string;
  description: string;
  url: string;
  image?: string;
  priceRange?: string;
  category?: string;
}

const normalizeUrl = (value: string): string => {
  if (!value) {
    return getCanonicalUrl('/');
  }

  try {
    if (value.startsWith('http://') || value.startsWith('https://')) {
      const parsed = new URL(value);
      return getCanonicalUrl(parsed.pathname || '/');
    }
  } catch {
    // Ignore parse errors and fall through
  }

  return getCanonicalUrl(value);
};

const ServiceStructuredData: React.FC<ServiceStructuredDataProps> = ({ 
  serviceName, 
  description, 
  url, 
  image,
  priceRange,
  category = 'Cosmetic Dentistry'
}) => {
  const canonicalUrl = normalizeUrl(url);
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': ['Service', 'MedicalProcedure'],
    serviceType: serviceName,
    name: serviceName,
    description: description,
    url: canonicalUrl,
    image: image || 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
    provider: {
      '@id': 'https://exquisitedentistryla.com/#business'
    },
    performer: {
      '@type': 'Person',
      name: 'Dr. Alexie Aguil',
      jobTitle: 'Dentist'
    },
    ...(priceRange && { priceRange }),
    category,
    areaServed: [
      { '@type': 'City', name: 'Los Angeles' },
      { '@type': 'City', name: 'Beverly Hills' },
      { '@type': 'City', name: 'Culver City' },
      { '@type': 'City', name: 'West Hollywood' }
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceLocation: {
        '@id': 'https://exquisitedentistryla.com/#business'
      },
      servicePhone: '(323) 272-2388'
    },
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
