import React from 'react';
import { Helmet } from 'react-helmet-async';

const SeoStructuredData: React.FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Exquisite Dentistry',
    image: 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
    '@id': 'https://exquisitedentistryla.com',
    url: 'https://exquisitedentistryla.com',
    telephone: '(323) 272-2388',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6227 Wilshire Blvd',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      postalCode: '90048',
      addressCountry: 'US'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

export default SeoStructuredData;
