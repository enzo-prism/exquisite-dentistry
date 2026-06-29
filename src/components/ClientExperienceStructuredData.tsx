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
    description: 'Dental practice offering a calm, comfortable setting and cosmetic dentistry in Los Angeles',
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
        name: 'Comfort Amenities',
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
      name: 'Comfort-Focused Dental Care',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Comfort-Focused Visit',
            description: 'Comfortable dental care with calming amenities'
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
      name: 'Comfort-Focused Dental Care',
      description: 'Dental care with a calm, comfortable setting and personalized attention',
      category: 'Dental Services'
    }
  };

  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Comfort-Focused Dental Care',
    description: 'Comprehensive dental care delivered in a calm, comfortable setting with modern technology and personalized comfort',
    provider: {
      '@id': 'https://exquisitedentistryla.com/#business'
    },
    serviceType: 'Comfort-Focused Dental Care',
    areaServed: {
      '@type': 'City',
      name: 'Los Angeles'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Client Experience Features',
      itemListElement: [
        'Comfort amenities',
        'Modern dental technology',
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
