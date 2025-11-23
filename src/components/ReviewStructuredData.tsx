import React from 'react';
import { Helmet } from 'react-helmet-async';

const ReviewStructuredData: React.FC = () => {
  const aggregateRatingData = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    '@id': 'https://exquisitedentistryla.com/#reviews',
    itemReviewed: {
      '@id': 'https://exquisitedentistryla.com/#business'
    },
    ratingValue: '4.9',
    reviewCount: '150',
    bestRating: '5',
    worstRating: '1'
  };

  const reviewsData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Review',
      '@id': 'https://exquisitedentistryla.com/#review-shannon',
      itemReviewed: {
        '@id': 'https://exquisitedentistryla.com/#business'
      },
      author: {
        '@type': 'Person',
        name: 'Shannon Langhorne'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      reviewBody: 'Exceptional cosmetic dentistry experience with Dr. Alexie Aguil. The staff is professional and the results exceeded my expectations.',
      datePublished: '2024-01-15'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Review',
      '@id': 'https://exquisitedentistryla.com/#review-taylor',
      itemReviewed: {
        '@id': 'https://exquisitedentistryla.com/#business'
      },
      author: {
        '@type': 'Person',
        name: 'Taylor Vasek'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      reviewBody: 'Outstanding service and beautiful results. Dr. Aguil is truly an artist when it comes to cosmetic dentistry.',
      datePublished: '2024-01-10'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Review',
      '@id': 'https://exquisitedentistryla.com/#review-christian',
      itemReviewed: {
        '@id': 'https://exquisitedentistryla.com/#business'
      },
      author: {
        '@type': 'Person',
        name: 'Christian Fernandez'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      reviewBody: 'Amazing transformation! The team at Exquisite Dentistry made me feel comfortable throughout the entire process.',
      datePublished: '2024-01-05'
    }
  ];

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(aggregateRatingData)}</script>
      {reviewsData.map((review, index) => (
        <script key={index} type="application/ld+json">{JSON.stringify(review)}</script>
      ))}
    </Helmet>
  );
};

export default ReviewStructuredData;