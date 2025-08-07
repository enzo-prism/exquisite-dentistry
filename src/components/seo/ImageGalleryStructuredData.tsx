import React from 'react';
import { Helmet } from 'react-helmet-async';

interface GalleryImage {
  url: string;
  caption: string;
  description?: string;
  width?: number;
  height?: number;
}

interface ImageGalleryStructuredDataProps {
  galleryName: string;
  description: string;
  images: GalleryImage[];
  galleryType?: 'before-after' | 'smile-transformations' | 'procedure-gallery';
}

const ImageGalleryStructuredData: React.FC<ImageGalleryStructuredDataProps> = ({
  galleryName,
  description,
  images,
  galleryType = 'smile-transformations'
}) => {
  const galleryData = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: galleryName,
    description: description,
    about: {
      '@type': 'MedicalProcedure',
      name: 'Cosmetic Dentistry Procedures'
    },
    associatedMedia: images.map((image, index) => ({
      '@type': 'ImageObject',
      contentUrl: image.url,
      caption: image.caption,
      ...(image.description && { description: image.description }),
      ...(image.width && { width: image.width }),
      ...(image.height && { height: image.height }),
      thumbnailUrl: image.url,
      creator: {
        '@type': 'Person',
        name: 'Dr. Alexie Aguil',
        jobTitle: 'Cosmetic Dentist'
      },
      copyrightHolder: {
        '@type': 'Organization',
        name: 'Exquisite Dentistry'
      },
      keywords: [
        'cosmetic dentistry',
        'smile makeover',
        'dental veneers',
        galleryType.replace('-', ' ')
      ].join(', ')
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
    },
    numberOfItems: images.length,
    genre: galleryType === 'before-after' ? 'Before and After Photos' : 'Smile Transformation Gallery'
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(galleryData)}</script>
    </Helmet>
  );
};

export default ImageGalleryStructuredData;