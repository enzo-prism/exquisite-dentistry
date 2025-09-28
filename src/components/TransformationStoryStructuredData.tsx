import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { TransformationStory } from '@/data/transformationStories';

interface TransformationStoryStructuredDataProps {
  transformationStory: TransformationStory;
  canonicalUrl: string;
}

const TransformationStoryStructuredData: React.FC<TransformationStoryStructuredDataProps> = ({
  transformationStory: caseStudy,
  canonicalUrl
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Exquisite Dentistry",
    "description": "Cosmetic and restorative dentistry in Los Angeles",
    "url": "https://exquisitedentistryla.com",
    "telephone": "(323) 272-2388",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Los Angeles",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "review": {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": caseStudy.patientName
      },
      "reviewBody": caseStudy.quotes[0]?.text || caseStudy.shortDescription,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dental Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Smile Transformation",
            "description": "Comprehensive smile enhancement and teeth straightening"
          }
        }
      ]
    }
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": caseStudy.title,
    "description": caseStudy.shortDescription,
    "thumbnailUrl": caseStudy.thumbnailUrl || `https://img.youtube.com/vi/${caseStudy.videoId}/maxresdefault.jpg`,
    "uploadDate": "2024-01-01",
    "duration": "PT3M",
    "embedUrl": caseStudy.videoType === 'youtube' 
      ? `https://www.youtube.com/embed/${caseStudy.videoId}`
      : `https://player.vimeo.com/video/${caseStudy.videoId}`,
    "publisher": {
      "@type": "Organization",
      "name": "Exquisite Dentistry",
      "logo": {
        "@type": "ImageObject",
        "url": "https://exquisitedentistryla.com/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.webp"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(videoStructuredData)}
      </script>
    </Helmet>
  );
};

export default TransformationStoryStructuredData;