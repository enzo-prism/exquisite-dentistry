import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '@/data/blogTypes';

interface BlogStructuredDataProps {
  post: BlogPost;
}

const BlogStructuredData: React.FC<BlogStructuredDataProps> = ({ post }) => {
  const blogPostData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://exquisitedentistryla.com/about/'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Exquisite Dentistry',
      logo: {
        '@type': 'ImageObject',
        url: 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
      }
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://exquisitedentistryla.com/blog/${post.slug}`
    },
    articleSection: post.category,
    keywords: post.tags?.join(', ') || '',
    timeRequired: post.readTime,
    about: {
      '@type': 'Thing',
      name: 'Cosmetic Dentistry'
    },
    isPartOf: {
      '@type': 'Blog',
      name: 'Exquisite Dentistry Blog',
      url: 'https://exquisitedentistryla.com/blog/'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(blogPostData)}</script>
    </Helmet>
  );
};

export default BlogStructuredData;
