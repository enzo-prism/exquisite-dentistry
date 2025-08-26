import React from 'react';
import { Helmet } from 'react-helmet-async';
import { validateItemList, logValidationErrors, getCanonicalUrl } from '@/utils/schemaValidation';

const ServiceCatalogStructuredData: React.FC = () => {
  const serviceCatalogData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://exquisitedentistryla.com/services/#catalog',
    name: 'Dental Services Catalog',
    description: 'Comprehensive dental services offered at Exquisite Dentistry in Los Angeles',
    url: getCanonicalUrl('/services'),
    numberOfItems: 6,
    provider: {
      '@type': ['LocalBusiness', 'Dentist'],
      '@id': 'https://exquisitedentistryla.com/#business',
      name: 'Exquisite Dentistry',
      url: getCanonicalUrl('/')
    },
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'MedicalProcedure',
          name: 'Porcelain Veneers',
          description: 'Ultra-thin porcelain shells designed to cover the front surface of teeth for a perfect smile transformation',
          url: getCanonicalUrl('/veneers'),
          category: 'Cosmetic Dentistry',
          bodyLocation: {
            '@type': 'BodySystem',
            name: 'Oral and Dental System'
          }
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'MedicalProcedure',
          name: 'Teeth Whitening',
          description: 'Professional teeth whitening treatments for a brighter, more confident smile',
          url: getCanonicalUrl('/zoom-whitening'),
          category: 'Cosmetic Dentistry',
          bodyLocation: {
            '@type': 'BodySystem',
            name: 'Oral and Dental System'
          }
        }
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'MedicalProcedure',
          name: 'Dental Implants',
          description: 'Permanent tooth replacement solution using titanium implants for natural-looking results',
          url: getCanonicalUrl('/services'),
          category: 'Restorative Dentistry',
          bodyLocation: {
            '@type': 'BodySystem',
            name: 'Oral and Dental System'
          }
        }
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'MedicalProcedure',
          name: 'Invisalign Clear Aligners',
          description: 'Discreet orthodontic treatment using clear, removable aligners to straighten teeth',
          url: getCanonicalUrl('/services'),
          category: 'Orthodontics',
          bodyLocation: {
            '@type': 'BodySystem',
            name: 'Oral and Dental System'
          }
        }
      },
      {
        '@type': 'ListItem',
        position: 5,
        item: {
          '@type': 'MedicalProcedure',
          name: 'Dental Crowns',
          description: 'Custom-made caps that cover damaged or decayed teeth to restore function and appearance',
          url: getCanonicalUrl('/services'),
          category: 'Restorative Dentistry',
          bodyLocation: {
            '@type': 'BodySystem',
            name: 'Oral and Dental System'
          }
        }
      },
      {
        '@type': 'ListItem',
        position: 6,
        item: {
          '@type': 'MedicalProcedure',
          name: 'Smile Makeover',
          description: 'Comprehensive cosmetic dental treatment combining multiple procedures for complete smile transformation',
          url: getCanonicalUrl('/services'),
          category: 'Cosmetic Dentistry',
          bodyLocation: {
            '@type': 'BodySystem',
            name: 'Oral and Dental System'
          }
        }
      }
    ]
  };

  // Validate schema in development
  const validationResult = validateItemList(serviceCatalogData);
  logValidationErrors('ServiceCatalogStructuredData', validationResult);

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(serviceCatalogData)}</script>
    </Helmet>
  );
};

export default ServiceCatalogStructuredData;