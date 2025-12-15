import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/utils/schemaValidation';

interface ImageGalleryStructuredDataProps {
  galleryType?: 'smile-transformations' | 'before-after' | 'general';
  images?: Array<{
    url: string;
    caption: string;
    description?: string;
  }>;
}

const ImageGalleryStructuredData: React.FC<ImageGalleryStructuredDataProps> = ({ 
  galleryType = 'smile-transformations',
  images = []
}) => {
  const galleryUrl = getCanonicalUrl('/smile-gallery');
  const galleryData = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${galleryUrl}#imagegallery`,
    name: galleryType === 'smile-transformations' 
      ? 'Smile Transformation Gallery' 
      : galleryType === 'before-after' 
      ? 'Before and After Gallery'
      : 'Dental Gallery',
    description: 'Real patient transformations showcasing the exceptional results achieved at Exquisite Dentistry in Los Angeles',
    url: galleryUrl,
    provider: {
      '@id': 'https://exquisitedentistryla.com/#business'
    },
    about: {
      '@type': 'MedicalProcedure',
      name: 'Cosmetic Dentistry',
      category: 'Dental Care'
    },
    associatedMedia: images.length > 0 ? images.map((image, index) => ({
      '@type': 'ImageObject',
      contentUrl: image.url,
      name: image.caption,
      description: image.description || `Patient transformation result ${index + 1}`,
      about: {
        '@type': 'MedicalProcedure',
        name: 'Smile Transformation'
      }
    })) : [
      {
        '@type': 'ImageObject',
        contentUrl: 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
        name: 'Smile Transformation Results',
        description: 'Before and after photos showcasing dramatic smile improvements',
        about: {
          '@type': 'MedicalProcedure',
          name: 'Cosmetic Dentistry'
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(galleryData)}</script>
    </Helmet>
  );
};

export default ImageGalleryStructuredData;
