import React from 'react';
import { Helmet } from 'react-helmet-async';

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

interface FAQPageStructuredDataProps {
  faqs: FAQ[];
}

const FAQPageStructuredData: React.FC<FAQPageStructuredDataProps> = ({ faqs }) => {
  const faqPageData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    })),
    about: {
      '@type': 'MedicalBusiness',
      name: 'Exquisite Dentistry',
      url: 'https://exquisitedentistryla.com'
    },
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
        item: 'https://exquisitedentistryla.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'FAQs',
        item: 'https://exquisitedentistryla.com/faqs/'
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(faqPageData)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
    </Helmet>
  );
};

export default FAQPageStructuredData;