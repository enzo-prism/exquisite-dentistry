import React from 'react';
import { Helmet } from 'react-helmet-async';

const WeddingServiceStructuredData: React.FC = () => {
  const weddingServiceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Wedding Smile Makeover',
    description: 'Specialized bridal dentistry packages designed for brides, grooms, and wedding parties to achieve the perfect wedding day smile',
    url: 'https://exquisitedentistryla.com/wedding/',
    image: 'https://exquisitedentistryla.com/lovable-uploads/96c9493a-c97f-4076-b224-591c2e9c50e6.png',
    provider: {
      '@type': 'DentistPractice',
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
    serviceType: 'Wedding Dentistry',
    category: 'Cosmetic Dentistry',
    audience: {
      '@type': 'Audience',
      name: 'Brides and Grooms'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Wedding Smile Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Bridal Radiance Package',
          description: 'Comprehensive package for brides including professional whitening, cosmetic bonding, and complete smile analysis',
          category: 'Bridal Dentistry'
        },
        {
          '@type': 'Offer',
          name: 'Grooms Confidence Package',
          description: 'Tailored for grooms with professional whitening, dental cleaning, and minor cosmetic enhancements',
          category: 'Groom Dentistry'
        },
        {
          '@type': 'Offer',
          name: 'Wedding Party Glow Package',
          description: 'Group rates for wedding party members including professional cleaning and whitening',
          category: 'Group Dentistry'
        },
        {
          '@type': 'Offer',
          name: 'Last-Minute Touch-Up',
          description: 'Quick whitening treatments and cosmetic touch-ups for final weeks before wedding',
          category: 'Emergency Cosmetic'
        }
      ]
    },
    timeRequired: 'P1M',
    availableChannel: {
      '@type': 'ServiceChannel',
      name: 'In-Person Consultation',
      availableLanguage: 'English'
    }
  };

  const eventData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': 'https://exquisitedentistryla.com/wedding/#consultation',
    name: 'Wedding Smile Consultation',
    description: 'Free consultation for wedding smile makeover planning and timeline discussion',
    url: 'https://exquisitedentistryla.com/wedding/',
    startDate: '2024-01-01T09:00:00-08:00',
    endDate: '2025-12-31T17:00:00-08:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Exquisite Dentistry',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '6227 Wilshire Blvd',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90048',
        addressCountry: 'US'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: 'Exquisite Dentistry',
      url: 'https://exquisitedentistryla.com/'
    },
    isAccessibleForFree: true,
    audience: {
      '@type': 'Audience',
      name: 'Engaged Couples'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(weddingServiceData)}</script>
      <script type="application/ld+json">{JSON.stringify(eventData)}</script>
    </Helmet>
  );
};

export default WeddingServiceStructuredData;