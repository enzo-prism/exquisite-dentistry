import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/utils/schemaValidation';

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
  recoveryTime
}) => {
  const canonicalUrl = normalizeUrl(url);
  const procedureData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: procedureName,
    description: description,
    url: canonicalUrl,
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
    ...(recoveryTime && { recoveryTime: recoveryTime }),
    provider: {
      '@id': 'https://exquisitedentistryla.com/#business'
    },
    performer: {
      '@id': 'https://exquisitedentistryla.com/#doctor'
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
