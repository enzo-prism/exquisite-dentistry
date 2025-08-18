import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '@/data/blogPosts';

interface BlogListingStructuredDataProps {
  posts: BlogPost[];
}

const BlogListingStructuredData: React.FC<BlogListingStructuredDataProps> = ({ posts }) => {
  const blogData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Exquisite Dentistry Blog',
    description: 'Expert insights, tips, and advice for optimal oral health and beautiful smiles from Dr. Alexie Aguil',
    url: 'https://exquisitedentistryla.com/blog/',
    publisher: {
      '@type': 'Organization',
      name: 'Exquisite Dentistry',
      logo: {
        '@type': 'ImageObject',
        url: 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
      }
    },
    author: {
      '@type': 'Person',
      name: 'Dr. Alexie Aguil',
      url: 'https://exquisitedentistryla.com/about/'
    },
    inLanguage: 'en-US',
    about: {
      '@type': 'Thing',
      name: 'Dental Care and Oral Health'
    },
    blogPost: posts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://exquisitedentistryla.com/blog/${post.slug}`,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: post.author
      },
      description: post.excerpt,
      image: post.featuredImage || 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
      articleSection: post.category,
      keywords: post.tags?.join(', ') || ''
    }))
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
        name: 'Blog',
        item: 'https://exquisitedentistryla.com/blog/'
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(blogData)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
    </Helmet>
  );
};

export default BlogListingStructuredData;