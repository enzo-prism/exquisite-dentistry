import React from 'react';
import { PageSEO } from '@/components/seo/PageSEO';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import TwoFrontVeneersContent from '@/components/treatments/TwoFrontVeneersContent';
import { TWO_FRONT_VENEERS } from '@/data/twoFrontVeneers';
import { createFAQSchema } from '@/utils/centralizedSchemas';

export default function VeneersCostLosAngeles() {
  return (
    <>
      <PageSEO title={TWO_FRONT_VENEERS.title} description={TWO_FRONT_VENEERS.description} path={TWO_FRONT_VENEERS.path} />
      <MasterStructuredData includeBusiness includeWebsite additionalSchemas={[createFAQSchema(TWO_FRONT_VENEERS.faqItems.map((faq) => ({ ...faq }))), { '@type': 'WebPage', name: TWO_FRONT_VENEERS.h1, url: `https://exquisitedentistryla.com${TWO_FRONT_VENEERS.path}/`, description: TWO_FRONT_VENEERS.description }]} />
      <TwoFrontVeneersContent />
    </>
  );
}
