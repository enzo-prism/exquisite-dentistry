import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogPost, getBlogPostDateTime } from '@/data/blogPosts';
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

  const toIsoDuration = (value: string | undefined) => {
    if (!value) return undefined;
    const match = value.match(/(\d+)\s*min/i);
    return match ? `PT${match[1]}M` : undefined;
  };

  const getAboutTopic = () => {
    const tags = post.tags.join(' ').toLowerCase();
    const title = post.title.toLowerCase();

    if (tags.includes('wedding') || title.includes('wedding')) {
      return 'Wedding smile preparation';
    }
    if ((tags.includes('whitening') || title.includes('whitening')) && (tags.includes('veneer') || title.includes('veneer'))) {
      return 'Veneers and teeth whitening comparison';
    }
    if (tags.includes('invisalign') || tags.includes('aligner')) {
      return 'Invisalign treatment';
    }
    if (tags.includes('whitening') || title.includes('whitening')) {
      return 'Professional teeth whitening';
    }
    if (tags.includes('veneer')) {
      return 'Porcelain veneers';
    }

    return post.category;
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
    datePublished: getBlogPostDateTime(post),
    dateModified: getBlogPostDateTime(post),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl
    },
    articleSection: post.category,
    keywords: post.tags?.join(', ') || '',
    timeRequired: toIsoDuration(post.readTime),
    about: {
      '@type': 'Thing',
      name: getAboutTopic()
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
