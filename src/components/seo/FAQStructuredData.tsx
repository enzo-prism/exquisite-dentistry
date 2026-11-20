import React from 'react';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  // readonly so pages can pass their `as const` FAQ data modules directly.
  faqs: readonly FAQItem[];
  about?: string;
}

const normalizePath = (value: string) => (value.replace(/\/+$/, '') || '/');

/**
 * The static prerender (scripts/prerender-static.ts) already ships an FAQPage in
 * the landing page's JSON-LD graph. That script is never removed, so emitting a
 * second FAQPage from React would give Google two FAQPage entities on one URL.
 */
const hasPrerenderedFaqSchema = (): boolean => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return false;
  const current = normalizePath(window.location.pathname);
  return Array.from(document.querySelectorAll('script[data-prerender-schema]')).some(
    (node) =>
      normalizePath(node.getAttribute('data-prerender-schema') || '') === current &&
      (node.textContent || '').includes('"FAQPage"'),
  );
};

const FAQStructuredData: React.FC<FAQStructuredDataProps> = ({ 
  faqs, 
  about = 'Cosmetic Dentistry Services' 
}) => {
  if (hasPrerenderedFaqSchema()) return null;

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    about: {
      '@type': 'Thing',
      name: about
    },
    mainEntity: faqs.map((faq) => ({
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