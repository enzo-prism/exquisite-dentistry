import React from 'react';
import { Helmet } from 'react-helmet-async';

const ShareYourStoryStructuredData: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Share Your Transformation Story | Exquisite Dentistry',
    description: 'Share your dental transformation story with Exquisite Dentistry and receive rewards. Help future patients by sharing your experience with Dr. Alexie Aguil.',
    url: 'https://exquisitedentistry.com/share-your-story',
    mainEntity: {
      '@type': 'Service',
      name: 'Patient Story Submission Program',
      description: 'A program that rewards patients for sharing their dental transformation stories to help future patients make informed decisions.',
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
        telephone: '(323) 272-2388',
        url: 'https://exquisitedentistry.com'
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Written Testimonial Reward',
          description: '$20 Starbucks Gift Card for written patient testimonials',
          price: '20',
          priceCurrency: 'USD'
        },
        {
          '@type': 'Offer', 
          name: 'Video Testimonial Reward',
          description: 'Apple Watch raffle entry for video testimonials of 30+ seconds',
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            minValue: 30,
            unitText: 'seconds'
          }
        }
      ]
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://exquisitedentistry.com'
        },
        {
          '@type': 'ListItem', 
          position: 2,
          name: 'Share Your Story',
          item: 'https://exquisitedentistry.com/share-your-story'
        }
      ]
    },
    potentialAction: [
      {
        '@type': 'SubmitAction',
        name: 'Submit Written Testimonial',
        target: 'https://form.typeform.com/written-testimonial'
      },
      {
        '@type': 'SubmitAction',
        name: 'Submit Video Testimonial', 
        target: 'https://form.typeform.com/video-testimonial'
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default ShareYourStoryStructuredData;