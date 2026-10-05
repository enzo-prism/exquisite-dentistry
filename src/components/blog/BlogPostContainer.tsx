import React, { Suspense, useEffect, useState, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import ClinicalReviewCredit from '@/components/ClinicalReviewCredit';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageSEO from '@/components/seo/PageSEO';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
import { sanitizeBlogHtml } from '@/utils/blogContent';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { trackConsultationIntent } from '@/utils/vercelAnalytics';
import { BlogConsultationBlock, BlogInlineConsultCard } from './BlogConsultationCta';
import { isVeneerPost } from './blogCta';
import { useInlineArticleSlot } from './useInlineArticleSlot';

// Lazy load specific-blog components
const SingleToothVeneersBlog = React.lazy(() => import('@/pages/SingleToothVeneersBlog'));
const VeneersBeforeAfterContent = React.lazy(() => import('@/components/blog/VeneersBeforeAfterContent'));

interface BlogPostContainerProps {
  post: BlogPost;
}

const BlogPostContent: React.FC<BlogPostContainerProps> = ({ post }) => {
  const sanitizedContent = useMemo(() => sanitizeBlogHtml(post), [post]);
  const articleBodyRef = useRef<HTMLElement>(null);
  const isComponentPost = post.content === 'single-tooth-veneers' || post.content === 'veneers-before-after-guide';
  const inlineCtaSlot = useInlineArticleSlot(articleBodyRef, sanitizedContent, !isComponentPost);
  const veneerPost = isVeneerPost(post);

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
      {post.faqs?.length ? <FAQStructuredData faqs={post.faqs} about={post.title} /> : null}
      <PageSEO
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        keywords={post.seoKeywords}
        path={`/blog/${post.slug}`}
        ogType="article"
        articleAuthor={post.author}
        articlePublishedTime={getBlogPostDateTime(post)}
        articleModifiedTime={getBlogPostModifiedDateTime(post)}
      />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-gold/10 bg-[linear-gradient(180deg,hsl(var(--ivory))_0%,#ffffff_100%)] py-14 md:py-20">
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog/" className="group mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-dark transition-colors hover:text-ink">
              <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
              Back to Blog
            </Link>
            
            <div className="mb-8">
              <BlogMeta post={post} showTags={true} />
            </div>

            <h1 className="mb-6 text-[clamp(2rem,4.6vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
              {post.title}
            </h1>
            
            <p className="text-lg leading-8 text-gray-600 md:text-xl md:leading-9">
              {post.excerpt}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1">
              <ClinicalReviewCredit review={post.clinicalReview} />
              <Link
                to={SCHEDULE_CONSULTATION_PATH}
                onClick={() =>
                  trackConsultationIntent({
                    source: 'blog_post_cta',
                    ctaText: 'Ask Dr. Aguil at a consultation',
                    destination: SCHEDULE_CONSULTATION_PATH,
                  })
                }
                className="group mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink"
              >
                <span className="link-sweep pb-0.5">Ask Dr. Aguil at a consultation</span>
                <ArrowRight size={16} className="text-gold transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {post.content === 'veneers-before-after-guide' ? (
            <Suspense fallback={<PageLoader />}>
              <VeneersBeforeAfterContent />
            </Suspense>
          ) : (
            <div className="prose prose-lg prose-neutral mx-auto max-w-3xl py-8 px-4">
              <article ref={articleBodyRef} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
              {inlineCtaSlot ? createPortal(<BlogInlineConsultCard post={post} />, inlineCtaSlot) : null}
            </div>
          )}

          {post.faqs?.length ? (
            <section id="faqs" className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gold/15 bg-white px-6 py-8 shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)] sm:px-8">
              <div className="mb-6">
                <p className="eyebrow">FAQs</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-ink md:text-3xl">
                  {getFaqHeading(post)}
                </h2>
              </div>
              <div className="space-y-1">
                {post.faqs.map((faq) => (
                  <details key={faq.question} className="faq-item">
                    <summary>{faq.question}</summary>
                    <p className="faq-answer">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          <BlogConsultationBlock post={post} />
          
          <InternalLinkingWidget 
            currentPage={`/blog/${post.slug}`}
            context={getContext(post)}
            variant="expanded"
          />
          
          {/* Veneer posts already link to /veneers/ from the consultation block. */}
          {!veneerPost && (post.tags?.includes('cosmetic dentistry') || post.tags?.includes('veneers') || post.category === 'Cosmetic Dentistry') && (
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
