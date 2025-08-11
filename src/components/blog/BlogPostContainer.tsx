import React, { Suspense, useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { BlogPost, getPostBySlug } from '@/data/blogPosts';
import PageLoader from '@/components/ui/page-loader';
import { toast } from 'sonner';

// Lazy load specific blog components with proper error boundaries
const FrontTeethVeneersBlog = React.lazy(() => import('@/pages/FrontTeethVeneersBlog'));
const SingleToothVeneersBlog = React.lazy(() => import('@/pages/SingleToothVeneersBlog'));

interface BlogPostContainerProps {
  post: BlogPost;
}

const BlogPostContent: React.FC<BlogPostContainerProps> = ({ post }) => {
  const [loadingComponent, setLoadingComponent] = useState(false);
  
  // Handle specific blog post components
  if (post.content === 'FrontTeethVeneersBlog') {
    return (
      <Suspense fallback={<PageLoader />}>
        <FrontTeethVeneersBlog />
      </Suspense>
    );
  }
  
  if (post.content === 'SingleToothVeneersBlog') {
    return (
      <Suspense fallback={<PageLoader />}>
        <SingleToothVeneersBlog />
      </Suspense>
    );
  }

  // Handle dynamic content rendering
  if (typeof post.content === 'string' && 
      (post.content.startsWith('<div') || post.content.includes('<h'))) {
    return (
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    );
  }

  // Fallback for other content types
  return (
    <div className="prose prose-lg max-w-none">
      <p className="text-muted-foreground">
        Content for this blog post is being prepared. Please check back soon.
      </p>
    </div>
  );
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

  return <BlogPostContent post={post} />;
};

export default BlogPostContainer;