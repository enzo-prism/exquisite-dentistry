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
    "@type": "WebPage",
    name: caseStudy.title,
    description: caseStudy.shortDescription,
    url: canonicalUrl,
    about: {
      "@id": "https://exquisitedentistryla.com/#business"
    }
  };

  const fallbackThumbnail = 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png';
  const rawThumbnail = caseStudy.video.poster || caseStudy.thumbnailUrl;
  const thumbnailUrl = rawThumbnail
    ? rawThumbnail.startsWith('http')
      ? rawThumbnail
      : `https://exquisitedentistryla.com${rawThumbnail}`
    : fallbackThumbnail;

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": caseStudy.title,
    "description": caseStudy.shortDescription,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": "2024-01-01",
    "duration": "PT3M",
    "contentUrl": caseStudy.video.src,
    "embedUrl": caseStudy.video.src,
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
