
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageSEO from '@/components/seo/PageSEO';
import ReviewWidget from '@/components/ReviewWidget';
import VideoHero from '@/components/VideoHero';
import VideoTestimonial from '@/components/VideoTestimonial';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { VIDEO_TESTIMONIALS } from '@/components/video-hero/video-constants';
import ReviewCarousel from '@/components/reviews/ReviewCarousel';
import WrittenReviewsSection from '@/components/reviews/WrittenReviewsSection';
import { ROUTE_METADATA } from '@/constants/metadata';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import ConsultationCtaBand from '@/components/about/ConsultationCtaBand';
import { bundledReviewCount, reviewArchive } from '@/data/reviewArchive';

const TestimonialsPage: React.FC = () => {
  const SITE_BASE_URL = 'https://exquisitedentistryla.com';
  const LOGO_URL = 'https://exquisitedentistryla.com/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.webp';
  const totalTestimonials = VIDEO_TESTIMONIALS.length;
  const meta = ROUTE_METADATA['/testimonials'];
  const hasPrerenderedSchema =
    typeof document !== 'undefined' &&
    Boolean(document.querySelector('script[data-prerender-schema="/testimonials"]'));

  const toAbsoluteUrl = (url: string) => {
    if (!url) return undefined;
    return url.startsWith('http') ? url : `${SITE_BASE_URL}${url}`;
  };

  const videoSchemaItems = VIDEO_TESTIMONIALS.map((testimonial, index) => {
    const baseVideoObject: Record<string, unknown> = {
      '@type': 'VideoObject',
      name: testimonial.title,
      description: `${testimonial.title} from Exquisite Dentistry LA`,
      uploadDate: testimonial.uploadDate,
      duration: testimonial.duration,
      url: `${SITE_BASE_URL}/testimonials/#${testimonial.id}`,
      publisher: {
        '@type': 'Organization',
        name: 'Exquisite Dentistry',
        url: SITE_BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: LOGO_URL
        }
      }
    };

    const thumbnailUrl = toAbsoluteUrl(testimonial.thumbnailUrl);
    if (thumbnailUrl) {
      baseVideoObject.thumbnailUrl = thumbnailUrl;
    }

    if (testimonial.type === 'vimeo') {
      baseVideoObject.embedUrl = `https://player.vimeo.com/video/${testimonial.vimeoId}`;
      baseVideoObject.contentUrl = `https://vimeo.com/${testimonial.vimeoId}`;
    } else {
      baseVideoObject.contentUrl = testimonial.videoUrl;
    }

    return {
      '@type': 'ListItem',
      position: index + 1,
      item: baseVideoObject
    };
  });

  const writtenReviewSchemaItems = reviewArchive.map((review, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.name
      },
      reviewBody: review.quote,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1
      },
      ...(review.publishedDate ? { datePublished: review.publishedDate } : {}),
      itemReviewed: {
        '@id': `${SITE_BASE_URL}/#business`
      }
    }
  }));

  return (
    <>
      {!hasPrerenderedSchema && (
        <MasterStructuredData
          includeBusiness={true}
          includeWebsite={true}
          additionalSchemas={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': getCanonicalUrl('/testimonials#page'),
            name: 'Patient Reviews & Testimonials | Exquisite Dentistry Los Angeles',
            description: 'Read patient reviews currently published by Exquisite Dentistry and watch video testimonials about care with Dr. Alexie Aguil in Los Angeles',
            url: getCanonicalUrl('/testimonials'),
            isPartOf: {
              '@id': 'https://exquisitedentistryla.com/#website'
            },
            about: {
              '@id': 'https://exquisitedentistryla.com/#business'
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Video Testimonials',
            description: 'Collection of patient video testimonials for Exquisite Dentistry',
            numberOfItems: totalTestimonials,
            itemListElement: videoSchemaItems
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Written Patient Reviews',
            description: 'Written reviews currently published by Exquisite Dentistry',
            numberOfItems: writtenReviewSchemaItems.length,
            itemListElement: writtenReviewSchemaItems
          }
          ]}
        />
      )}
      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/testimonials"
        ogImage={meta.ogImage}
        
      />
      
      <div id="top"></div>
      <VideoHero 
        title="Client Testimonials"
        subtitle="See what our clients are saying about their experience at Exquisite Dentistry"
        primaryCta={{
          text: "Schedule Consultation",
          href: SCHEDULE_CONSULTATION_PATH
        }}
        secondaryCta={{
          text: "Read Testimonials",
          href: "#five-star-proof"
        }}
        phoneCta
      />
      
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            className="mb-12 md:mb-16"
            eyebrow="Reviews"
            title={<>What Our Clients <em>Are Saying</em></>}
          />
          
          {/* Video reviews — carousel keeps the set to ~3 in view instead of a
              nine-card wall, while every card stays in the DOM for crawlers. */}
          <Reveal variant="fade" className="mb-12">
            <h3 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.35em] text-gold-dark">
              Video Reviews
            </h3>
            <ReviewCarousel label="Video reviews" perView={2}>
              {VIDEO_TESTIMONIALS.map((testimonial) => (
                <VideoTestimonial
                  key={testimonial.id}
                  testimonial={testimonial}
                  className="h-full"
                />
              ))}
            </ReviewCarousel>
          </Reveal>
          <div className="mb-16 flex justify-center">
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/transformation-stories/">
                View Transformation Stories
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="five-star-proof" className="mb-10 scroll-mt-28 md:mb-12">
            <div className="text-center max-w-4xl mx-auto">
              <Reveal as="p" variant="fade" className="eyebrow eyebrow--center">
                5-STAR PROOF
              </Reveal>
              <Reveal as="h3" variant="blur" delay={90} className="mt-4 text-[clamp(1.85rem,4.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
                Written Reviews
              </Reveal>
              <Reveal as="p" variant="up" delay={180} className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg md:leading-8">
                Explore {bundledReviewCount} written reviews currently published on this site.
                Filter by what matters to you, then talk with our team about your own visit.
              </Reveal>
            </div>
          </div>

          <WrittenReviewsSection />

          <Reveal variant="fade" className="mt-12">
            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)] sm:p-8">
              <ReviewWidget />
            </div>
          </Reveal>
        </div>
      </section>

      <ConsultationCtaBand
        closing
        id="testimonials-consultation"
        className="bg-white"
        source="testimonials_cta"
        eyebrow="Your visit"
        title={<>Talk with our team about <em className="whitespace-nowrap">your own visit</em></>}
        description="Book a consultation to review timing, treatment fit, PPO benefits, and next steps."
      />
    </>
  );
};

export default TestimonialsPage;
