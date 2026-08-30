import React, { Suspense, useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import { ArrowLeft } from 'lucide-react';
import {
  BlogPost,
  getBlogPostDateTime,
  getBlogPostModifiedDateTime,
  getPostBySlug,
} from '@/data/blogPosts';
import PageLoader from '@/components/ui/page-loader';
import { toast } from 'sonner';
import BlogMeta from './BlogMeta';
import RelatedPosts from './RelatedPosts';
import VeneerCTA from '@/components/VeneerCTA';
import BlogStructuredData from '@/components/BlogStructuredData';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import BlogErrorBoundary from './BlogErrorBoundary';
import { decodeBlogTitle, sanitizeBlogHtml } from '@/utils/blogContent';
import FAQStructuredData from '@/components/seo/FAQStructuredData';

// Lazy load specific-blog components
const SingleToothVeneersBlog = React.lazy(() => import('@/pages/SingleToothVeneersBlog'));
const VeneersBeforeAfterContent = React.lazy(() => import('@/components/blog/VeneersBeforeAfterContent'));

interface BlogPostContainerProps {
  post: BlogPost;
}

const BlogPostContent: React.FC<BlogPostContainerProps> = ({ post }) => {
  const sanitizedContent = useMemo(() => sanitizeBlogHtml(post), [post]);
  const displayTitle = decodeBlogTitle(post.title);
  const displaySeoTitle = decodeBlogTitle(post.seoTitle || post.title);

  // Handle component-based blog posts
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
      {post.faqs?.length ? <FAQStructuredData faqs={post.faqs} about={displayTitle} /> : null}
      <PageSEO
        title={displaySeoTitle}
        description={post.seoDescription || post.excerpt}
        keywords={post.seoKeywords}
        path={`/blog/${post.slug}`}
        ogType="article"
        articleAuthor={post.author}
        articlePublishedTime={getBlogPostDateTime(post)}
        articleModifiedTime={getBlogPostModifiedDateTime(post)}
      />

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gold/15 via-gold/8 to-white py-12 sm:py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/25 to-transparent"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
            <Link to="/blog/" className="mb-6 inline-flex items-center gap-2 text-gold transition-colors hover:text-gold/80">
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
            
            <div className="mb-8">
              <BlogMeta post={post} showTags={true} />
            </div>

            <h1 className="mb-6 break-words text-balance text-3xl font-bold leading-tight text-black md:text-4xl lg:text-5xl">
              {displayTitle}
            </h1>
            
            <p className="break-words text-lg leading-relaxed text-gray-600 sm:text-xl">
              {post.excerpt}
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Clinically reviewed by{' '}
              <Link to="/about/" className="text-gold underline-offset-4 hover:underline">
                Dr. Alexie Aguil
              </Link>{' '}
              ·{' '}
              <Link to="/editorial-policy/" className="text-gold underline-offset-4 hover:underline">
                Editorial policy
              </Link>
            </p>
        </div>
      </div>

      {post.content === 'veneers-before-after-guide' ? (
        <article className="min-w-0 bg-white">
          <Suspense fallback={<PageLoader />}>
            <VeneersBeforeAfterContent />
          </Suspense>
          <div className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 md:pb-16">
            <BlogPostFooter post={post} />
          </div>
        </article>
      ) : (
        <article className="min-w-0 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div
              className="prose prose-lg prose-neutral mx-auto max-w-3xl min-w-0 break-words py-4 sm:py-8"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
            <BlogPostFooter post={post} />
          </div>
        </article>
      )}
    </>
  );
};

const BlogPostFooter: React.FC<{ post: BlogPost }> = ({ post }) => (
  <>
    {post.faqs?.length ? (
      <section id="faqs" className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-muted/20 px-4 py-8 sm:px-6">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold sm:tracking-[0.35em]">FAQs</p>
          <h2 className="mt-2 break-words text-balance text-2xl font-bold text-foreground md:text-3xl">
            {getFaqHeading(post)}
          </h2>
        </div>
        <div className="space-y-1">
          {post.faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>
                <span>{faq.question}</span>
              </summary>
              <p className="faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    ) : null}

    <InternalLinkingWidget
      currentPage={`/blog/${post.slug}`}
      context={getContext(post)}
      variant="expanded"
    />

    {(post.tags?.includes('cosmetic dentistry') || post.tags?.includes('veneers') || post.category === 'Cosmetic Dentistry') && (
      <VeneerCTA variant="banner" />
    )}

    <RelatedPosts currentPost={post} />
  </>
);

// Helper function to determine context for internal linking
const getContext = (post: BlogPost) => {
  const tags = post.tags?.join(' ').toLowerCase() ?? '';
  const title = post.title.toLowerCase();
  const category = post.category.toLowerCase();

  if (tags.includes('wedding') || title.includes('wedding')) {
    return 'wedding';
  }
  if (tags.includes('graduation') || title.includes('graduation')) {
    return 'graduation';
  }
  if (tags.includes('implant') || tags.includes('bridge') || category.includes('restorative')) {
    return 'implants';
  }
  if (tags.includes('whitening') || title.includes('whitening')) {
    return 'whitening';
  }
  if (tags.includes('invisalign') || tags.includes('aligner') || category.includes('orthodontic')) {
    return 'invisalign';
  }
  if (tags.includes('oral') || tags.includes('health') || tags.includes('gum') || tags.includes('cancer') || category.includes('oral health')) {
    return 'oral-health';
  }
  if (post.tags?.includes('veneer cost') || post.tags?.includes('2 front teeth veneers') || post.tags?.includes('4 front teeth veneers')) {
    return 'cost';
  }
  if (tags.includes('veneer')) {
    return 'veneer';
  }
  if (tags.includes('patient comfort') || tags.includes('entertainment') || tags.includes('experience') || tags.includes('comfort')) {
    return 'experience';
  }
  return 'general';
};

const getFaqHeading = (post: BlogPost) => {
  const tags = post.tags?.join(' ').toLowerCase() ?? '';
  const title = post.title.toLowerCase();

  if (tags.includes('wedding') || title.includes('wedding')) {
    return 'Questions Patients Ask About Wedding Smile Prep';
  }
  if ((tags.includes('invisalign') || title.includes('invisalign')) && (tags.includes('veneer') || title.includes('veneer'))) {
    return 'Questions Patients Ask About Invisalign Before Veneers';
  }
  if ((tags.includes('whitening') || title.includes('whitening')) && (tags.includes('veneer') || title.includes('veneer'))) {
    return 'Questions Patients Ask About Veneers and Whitening';
  }
  if (tags.includes('whitening') || title.includes('whitening')) {
    return 'Questions Patients Ask About Whitening Options';
  }
  if (tags.includes('veneer') || title.includes('veneer')) {
    return 'Questions Patients Ask About Veneers';
  }

  return 'Questions Patients Ask About This Topic';
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
      // Unpublished (retired) posts must not render via client-side navigation
      // either — server 301s in vercel.json only cover hard loads.
      if (!foundPost || !foundPost.published) {
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
    return <Navigate to="/blog/" replace />;
  }

  return (
    <BlogErrorBoundary>
      <BlogPostContent post={post} />
    </BlogErrorBoundary>
  );
};

export default BlogPostContainer;
