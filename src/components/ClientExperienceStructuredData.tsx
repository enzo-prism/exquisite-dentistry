import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/utils/schemaValidation';

const ClientExperienceStructuredData: React.FC = () => {
  const canonicalUrl = getCanonicalUrl('/client-experience');
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Dentist'],
    name: 'Exquisite Dentistry',
    alternateName: 'Exquisite Dentistry LA',
    description: 'Luxury dental practice offering spa-like comfort and advanced cosmetic dentistry in Los Angeles',
    url: canonicalUrl,
    image: 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6227 Wilshire Blvd',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      postalCode: '90048',
      addressCountry: 'US'
    },
    telephone: '(323) 272-2388',
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Spa-Like Amenities',
        value: 'Soft lighting, warm blankets, aromatherapy, noise-canceling headphones'
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Entertainment Options',
        value: 'Streaming services and music during treatment'
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: '24/7 Online Booking',
        value: 'Convenient online scheduling system'
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Flexible Scheduling',
        value: 'Same-day emergency appointments and family block appointments'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Luxury Dental Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Spa-Like Dental Experience',
            description: 'Comfortable dental care with luxury amenities'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Client-Centered Treatment Planning',
            description: 'Collaborative approach to dental treatment decisions'
          }
        }
      ]
    },
    makesOffer: {
      '@type': 'Offer',
      name: 'Luxury Dental Experience',
      description: 'Premium dental care with spa-like comfort and personalized attention',
      category: 'Dental Services'
    }
  };

  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Luxury Dental Experience',
    description: 'Comprehensive dental care delivered in a spa-like environment with advanced technology and personalized comfort',
    provider: {
      '@id': 'https://exquisitedentistryla.com/#business'
    },
    serviceType: 'Luxury Dental Care',
    areaServed: {
      '@type': 'City',
      name: 'Los Angeles'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Client Experience Features',
      itemListElement: [
        'Spa-like amenities',
        'Advanced dental technology',
        'Personalized treatment planning',
        'Anxiety-free environment',
        'Flexible scheduling options',
        'Entertainment during treatment'
      ]
    }
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: getCanonicalUrl('/')
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Client Experience',
        item: canonicalUrl
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organizationData)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceData)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
    </Helmet>
  );
};

export default ClientExperienceStructuredData;
