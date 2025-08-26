import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ProcedureStep {
  name: string;
  description: string;
}

interface MedicalProcedureStructuredDataProps {
  procedureName: string;
  description: string;
  url: string;
  image?: string;
  procedureType: string;
  bodyLocation: string;
  preparation?: string[];
  steps?: ProcedureStep[];
  followupCare?: string[];
  risks?: string[];
  benefits?: string[];
  duration?: string;
  recoveryTime?: string;
  priceRange?: string;
}

const MedicalProcedureStructuredData: React.FC<MedicalProcedureStructuredDataProps> = ({
  procedureName,
  description,
  url,
  image,
  procedureType,
  bodyLocation,
  preparation = [],
  steps = [],
  followupCare = [],
  risks = [],
  benefits = [],
  duration,
  recoveryTime,
  priceRange
}) => {
  const procedureData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: procedureName,
    description: description,
    url: `https://exquisitedentistryla.com${url}`,
    ...(image && { image: image }),
    procedureType: procedureType,
    bodyLocation: {
      '@type': 'BodySystem',
      name: bodyLocation
    },
    ...(preparation.length > 0 && { preparation: preparation.join('. ') }),
    ...(followupCare.length > 0 && { followupCare: followupCare.join('. ') }),
    ...(risks.length > 0 && { riskFactor: risks }),
    ...(benefits.length > 0 && { expectedPrognosis: benefits.join('. ') }),
    ...(duration && { estimatedCost: { '@type': 'MonetaryAmount', value: duration } }),
    ...(recoveryTime && { recoveryTime: recoveryTime }),
    ...(priceRange && { priceRange: priceRange }),
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
      url: 'https://exquisitedentistryla.com'
    },
    performer: {
      '@type': 'Person',
      name: 'Dr. Alexie Aguil',
      jobTitle: 'Cosmetic Dentist',
      worksFor: {
        '@type': ['LocalBusiness', 'Dentist'],
        name: 'Exquisite Dentistry'
      }
    }
  };

  // Add procedure steps if provided
  if (steps.length > 0) {
    procedureData['howPerformed'] = steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.description
    }));
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(procedureData)}</script>
    </Helmet>
  );
};

export default MedicalProcedureStructuredData;