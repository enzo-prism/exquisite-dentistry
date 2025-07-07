import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  const galleryData = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: galleryType === 'smile-transformations' 
      ? 'Smile Transformation Gallery' 
      : galleryType === 'before-after' 
      ? 'Before and After Gallery'
      : 'Dental Gallery',
    description: 'Real patient transformations showcasing the exceptional results achieved at Exquisite Dentistry in Los Angeles',
    url: 'https://exquisitedentistryla.com/smile-gallery',
    provider: {
      '@type': 'DentistPractice',
      name: 'Exquisite Dentistry',
      url: 'https://exquisitedentistryla.com'
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
      encodingFormat: 'image/jpeg',
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
        encodingFormat: 'image/png',
        about: {
          '@type': 'MedicalProcedure',
          name: 'Cosmetic Dentistry'
        }
      }
    ]
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://exquisitedentistryla.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Smile Gallery',
        item: 'https://exquisitedentistryla.com/smile-gallery'
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(galleryData)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
    </Helmet>
  );
};

export default ImageGalleryStructuredData;