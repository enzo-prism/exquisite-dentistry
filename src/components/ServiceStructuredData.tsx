import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/utils/schemaValidation';

interface ServiceStructuredDataProps {
  serviceName: string;
  description: string;
  url: string;
}

const normalizeUrl = (value: string): string => {
  if (!value) {
    return getCanonicalUrl('/');
  }

  try {
    if (value.startsWith('http://') || value.startsWith('https://')) {
      const parsed = new URL(value);
      return getCanonicalUrl(parsed.pathname || '/');
    }
  } catch {
    // Ignore parse errors and fall through
  }

  return getCanonicalUrl(value);
};

const ServiceStructuredData: React.FC<ServiceStructuredDataProps> = ({
  serviceName,
  description,
  url
}) => {
  const canonicalUrl = normalizeUrl(url);
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    url: canonicalUrl,
    provider: {
      '@id': 'https://exquisitedentistryla.com/#business'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(serviceData)}</script>
    </Helmet>
  );
};

export default ServiceStructuredData;
