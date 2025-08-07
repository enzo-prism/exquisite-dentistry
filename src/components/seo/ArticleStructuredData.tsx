import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ArticleStructuredDataProps {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  wordCount?: number;
  readingTime?: string;
  category?: string;
  tags?: string[];
  author?: {
    name: string;
    jobTitle?: string;
  };
}

const ArticleStructuredData: React.FC<ArticleStructuredDataProps> = ({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  wordCount,
  readingTime,
  category,
  tags = [],
  author = { name: 'Dr. Alexie Aguil', jobTitle: 'Cosmetic Dentist' }
}) => {
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: headline,
    description: description,
    url: `https://exquisitedentistryla.com${url}`,
    ...(image && { 
      image: {
        '@type': 'ImageObject',
        url: image,
        width: 1200,
        height: 630
      }
    }),
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    ...(wordCount && { wordCount: wordCount }),
    ...(readingTime && { timeRequired: readingTime }),
    ...(category && { articleSection: category }),
    ...(tags.length > 0 && { keywords: tags.join(', ') }),
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.jobTitle && { jobTitle: author.jobTitle }),
      worksFor: {
        '@type': 'DentistPractice',
        name: 'Exquisite Dentistry'
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Exquisite Dentistry',
      logo: {
        '@type': 'ImageObject',
        url: 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
        width: 400,
        height: 400
      },
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://exquisitedentistryla.com${url}`
    },
    about: {
      '@type': 'Thing',
      name: 'Cosmetic Dentistry'
    },
    mentions: [
      {
        '@type': 'MedicalBusiness',
        name: 'Exquisite Dentistry'
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(articleData)}</script>
    </Helmet>
  );
};

export default ArticleStructuredData;