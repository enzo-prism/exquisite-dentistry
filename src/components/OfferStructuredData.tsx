import React from 'react';
import { Helmet } from 'react-helmet-async';

interface OfferStructuredDataProps {
  offerName: string;
  description: string;
  category: string;
  url?: string;
  validFrom?: string;
  validThrough?: string;
  price?: string;
  priceCurrency?: string;
}

const OfferStructuredData: React.FC<OfferStructuredDataProps> = ({
  offerName,
  description,
  category,
  url,
  validFrom,
  validThrough,
  price,
  priceCurrency = 'USD'
}) => {
  const offerData = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: offerName,
    description: description,
    category: category,
    ...(url && { url: url }),
    ...(price && { 
      price: price,
      priceCurrency: priceCurrency 
    }),
    ...(validFrom && { validFrom: validFrom }),
    ...(validThrough && { validThrough: validThrough }),
    seller: {
      '@id': 'https://exquisitedentistryla.com/#business'
    },
    itemOffered: {
      '@type': 'Service',
      name: offerName,
      description: description,
      provider: {
        '@id': 'https://exquisitedentistryla.com/#business'
      }
    },
    availability: 'https://schema.org/InStock',
    priceValidUntil: validThrough || '2024-12-31'
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(offerData)}</script>
    </Helmet>
  );
};

export default OfferStructuredData;