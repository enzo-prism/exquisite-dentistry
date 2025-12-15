import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '@/data/blogPosts';
import { getCanonicalUrl } from '@/utils/schemaValidation';

interface BlogStructuredDataProps {
  post: BlogPost;
}

const BlogStructuredData: React.FC<BlogStructuredDataProps> = ({ post }) => {
  const postUrl = getCanonicalUrl(`/blog/${post.slug}`);
  const blogUrl = getCanonicalUrl('/blog');
  const aboutUrl = getCanonicalUrl('/about');

  const toAbsoluteUrl = (value: string | undefined) => {
    if (!value) return undefined;
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    return `https://exquisitedentistryla.com${value.startsWith('/') ? value : `/${value}`}`;
  };

  const toIsoDateTime = (value: string) => {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString();
  };

  const blogPostData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    image:
      toAbsoluteUrl(post.featuredImage) ||
      'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
    author: {
      '@type': 'Person',
      name: post.author,
      url: aboutUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'Exquisite Dentistry',
      logo: {
        '@type': 'ImageObject',
        url: 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
      }
    },
    datePublished: toIsoDateTime(post.date),
    dateModified: toIsoDateTime(post.date),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl
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
      url: blogUrl
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(blogPostData)}</script>
    </Helmet>
  );
};

export default BlogStructuredData;
