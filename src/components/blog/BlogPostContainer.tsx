import React, { Suspense, useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageSEO from '@/components/seo/PageSEO';
import { ArrowLeft } from 'lucide-react';
import { BlogPost, getPostBySlug } from '@/data/blogPosts';
import PageLoader from '@/components/ui/page-loader';
import { toast } from 'sonner';
import BlogMeta from './BlogMeta';
import RelatedPosts from './RelatedPosts';
import VeneerCTA from '@/components/VeneerCTA';
import BlogStructuredData from '@/components/BlogStructuredData';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import BlogErrorBoundary from './BlogErrorBoundary';
import { sanitizeBlogHtml } from '@/utils/blogContent';

// Lazy load specific-blog components
const FrontTeethVeneersBlog = React.lazy(() => import('@/pages/FrontTeethVeneersBlog'));
const SingleToothVeneersBlog = React.lazy(() => import('@/pages/SingleToothVeneersBlog'));
const VeneersBeforeAfterContent = React.lazy(() => import('@/components/blog/VeneersBeforeAfterContent'));

interface BlogPostContainerProps {
  post: BlogPost;
}

const BlogPostContent: React.FC<BlogPostContainerProps> = ({ post }) => {
  const sanitizedContent = useMemo(() => sanitizeBlogHtml(post), [post]);

  // Handle component-based blog posts
  if (post.content === 'front-4-veneers') {
    return (
      <Suspense fallback={<PageLoader />}>
        <FrontTeethVeneersBlog />
      </Suspense>
    );
  }
  
  if (post.content === 'single-tooth-veneers') {
    return (
      <Suspense fallback={<PageLoader />}>
        <SingleToothVeneersBlog />
      </Suspense>
    );
  }

  // For other posts, render the full blog template
  return (
    <>
      <BlogStructuredData post={post} />
      <PageSEO
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        keywords={post.seoKeywords}
        path={`/blog/${post.slug}`}
        ogType="article"
        articleAuthor={post.author}
        articlePublishedTime={new Date(post.date).toISOString()}
      />

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
          {post.content === 'veneers-before-after-guide' ? (
            <Suspense fallback={<PageLoader />}>
              <VeneersBeforeAfterContent />
            </Suspense>
          ) : (
            <div className="prose prose-lg prose-neutral mx-auto max-w-3xl py-8 px-4">
              <article dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </div>
          )}
          
          <InternalLinkingWidget 
            currentPage={`/blog/${post.slug}`}
            context={getContext(post)}
            variant="expanded"
          />
          
          {(post.tags?.includes('cosmetic dentistry') || post.tags?.includes('veneers') || post.category === 'Cosmetic Dentistry') && (
            <VeneerCTA variant="banner" />
          )}
          
          <RelatedPosts currentPost={post} />
        </div>
      </article>
    </>
  );
};

// Helper function to determine context for internal linking
const getContext = (post: BlogPost) => {
  if (post.tags?.includes('veneer cost') || post.tags?.includes('2 front teeth veneers') || post.tags?.includes('4 front teeth veneers')) {
    return 'cost';
  }
  if (post.tags?.includes('veneers') || post.tags?.includes('porcelain veneers')) {
    return 'veneer';
  }
  if (post.tags?.includes('patient comfort') || post.tags?.includes('entertainment')) {
    return 'experience';
  }
  return 'general';
};

const BlogPostContainer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('No blog post specified');
      setLoading(false);
      return;
    }

    try {
      const foundPost = getPostBySlug(slug);
      if (!foundPost) {
        setError('Blog post not found');
        setLoading(false);
        return;
      }
      
      setPost(foundPost);
      setError(null);
    } catch (err) {
      console.error('Error loading blog post:', err);
      setError('Failed to load blog post');
      toast.error('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return <PageLoader />;
  }

  if (error || !post) {
    console.log(`Blog post error: ${error}, redirecting to blog list`);
    return <Navigate to="/blog" replace />;
  }

  return (
    <BlogErrorBoundary>
      <BlogPostContent post={post} />
    </BlogErrorBoundary>
  );
};

export default BlogPostContainer;
