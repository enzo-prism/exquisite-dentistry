import React from 'react';
import { Helmet } from 'react-helmet-async';

interface VideoTestimonial {
  name: string;
  thumbnailUrl: string;
  vimeoId: string;
  description?: string;
}

interface VideoTestimonialStructuredDataProps {
  testimonials?: VideoTestimonial[];
}

const VideoTestimonialStructuredData: React.FC<VideoTestimonialStructuredDataProps> = ({ 
  testimonials = []
}) => {
  const defaultTestimonials = [
    {
      name: 'Shannon Langhorne Patient Testimonial',
      thumbnailUrl: 'https://exquisitedentistryla.com/lovable-uploads/4b013eb9-025b-4762-9fd9-3e1ed6e76587.png',
      vimeoId: '1082192427',
      description: 'Shannon shares her exceptional experience with Dr. Alexie Aguil at Exquisite Dentistry'
    },
    {
      name: 'Taylor Vasek Patient Testimonial',
      thumbnailUrl: 'https://exquisitedentistryla.com/lovable-uploads/94b33bca-4e9c-4e37-9028-82ebe5b81ccf.png',
      vimeoId: '1082192501',
      description: 'Taylor discusses her smile transformation journey and outstanding results'
    },
    {
      name: 'Christian Fernandez Patient Testimonial',
      thumbnailUrl: 'https://exquisitedentistryla.com/lovable-uploads/2bbd4833-a352-4ec7-8bfe-c12d956fbcfa.png',
      vimeoId: '1088876675',
      description: 'Christian talks about his amazing experience and beautiful smile makeover'
    }
  ];

  const videosToUse = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const videoData = videosToUse.map((testimonial, index) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: testimonial.name,
    description: testimonial.description || `Patient testimonial video featuring real results from Exquisite Dentistry in Los Angeles`,
    thumbnailUrl: testimonial.thumbnailUrl,
    contentUrl: `https://vimeo.com/${testimonial.vimeoId}`,
    embedUrl: `https://player.vimeo.com/video/${testimonial.vimeoId}`,
    uploadDate: '2024-01-01',
    duration: 'PT2M',
    publisher: {
      '@type': 'Organization',
      name: 'Exquisite Dentistry',
      logo: {
        '@type': 'ImageObject',
        url: 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
      }
    },
    about: {
      '@type': 'MedicalBusiness',
      name: 'Exquisite Dentistry'
    },
    genre: 'Patient Testimonial',
    inLanguage: 'en-US'
  }));

  return (
    <Helmet>
      {videoData.map((video, index) => (
        <script key={index} type="application/ld+json">{JSON.stringify(video)}</script>
      ))}
    </Helmet>
  );
};

export default VideoTestimonialStructuredData;