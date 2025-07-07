
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug } from '@/data/blogPosts';
import BlogMeta from './BlogMeta';
import RelatedPosts from './RelatedPosts';
import FrontTeethVeneersBlog from '@/pages/FrontTeethVeneersBlog';
import SingleToothVeneersBlog from '@/pages/SingleToothVeneersBlog';
import VeneerCTA from '@/components/VeneerCTA';
import BlogStructuredData from '@/components/BlogStructuredData';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // For existing blog posts, render the existing components
  // This allows for a gradual migration while maintaining current functionality
  if (post.content === 'front-4-veneers') {
    return <FrontTeethVeneersBlog />;
  }
  
  if (post.content === 'single-tooth-veneers') {
    return <SingleToothVeneersBlog />;
  }

  // For new blog posts, render the dynamic template
  return (
    <>
      <BlogStructuredData post={post} />
      <Helmet>
        <title>{post.seoTitle || post.title}</title>
        <meta name="description" content={post.seoDescription || post.excerpt} />
        {post.seoKeywords && <meta name="keywords" content={post.seoKeywords} />}
        <link rel="canonical" href={`https://exquisitedentistryla.com/blog/${post.slug}`} />
      </Helmet>

      {/* Header */}
      <div className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-gold/15 via-gold/8 to-white">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/25 to-transparent"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-6">
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
            
            <div className="mb-8">
              <BlogMeta post={post} showTags={true} />
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-black leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <p>This is a placeholder for the blog post content. In a real implementation, this would contain the full article content, which could be stored as markdown or rich text in the blog post data structure.</p>
          </div>
          
          {/* Show veneer CTA for cosmetic dentistry posts */}
          {(post.tags?.includes('cosmetic dentistry') || post.tags?.includes('veneers') || post.category === 'Cosmetic Dentistry') && (
            <VeneerCTA variant="banner" />
          )}
          
          <RelatedPosts currentPost={post} />
        </div>
      </article>
    </>
  );
};

export default BlogPost;
