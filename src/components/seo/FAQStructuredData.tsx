import React from 'react';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  faqs: FAQItem[];
  about?: string;
}

const FAQStructuredData: React.FC<FAQStructuredDataProps> = ({ 
  faqs, 
  about = 'Cosmetic Dentistry Services' 
}) => {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    about: {
      '@type': 'Thing',
      name: about
    },
    mainEntity: faqs.map((faq, index) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    })),
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

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(faqData)}</script>
    </Helmet>
  );
};

export default FAQStructuredData;