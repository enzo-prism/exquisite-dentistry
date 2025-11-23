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
      '@id': 'https://exquisitedentistryla.com/#business'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(faqData)}</script>
    </Helmet>
  );
};

export default FAQStructuredData;