
import React from 'react';
import PageSEO from '@/components/seo/PageSEO';
import ReviewWidget from '@/components/ReviewWidget';
import VideoHero from '@/components/VideoHero';
import VideoTestimonial from '@/components/VideoTestimonial';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { VIDEO_TESTIMONIALS } from '@/components/video-hero/video-constants';

const TestimonialsPage: React.FC = () => {
  const SITE_BASE_URL = 'https://exquisitedentistryla.com';
  const LOGO_URL = 'https://exquisitedentistryla.com/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.webp';
  const totalTestimonials = VIDEO_TESTIMONIALS.length;

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

  return (
    <>
      <MasterStructuredData 
        includeBusiness={true}
        includeReviews={true}
        includeWebsite={true}
        additionalSchemas={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': getCanonicalUrl('/testimonials#page'),
            name: 'Patient Reviews & Testimonials | Exquisite Dentistry Los Angeles',
            description: 'Read verified patient reviews and watch video testimonials from satisfied clients of Dr. Alexie Aguil at Exquisite Dentistry in Los Angeles',
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
          }
        ]}
      />
      <PageSEO
        title="Patient Reviews LA | Real Cosmetic Dentistry Results"
        description="Read verified patient reviews and watch video testimonials. See why patients choose Dr. Aguil for cosmetic dentistry in Los Angeles."
        keywords="dental reviews Los Angeles, patient testimonials, cosmetic dentistry reviews, Dr. Alexie Aguil reviews, dental patient experiences, verified reviews"
        path="/testimonials"
        ogImage="/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
        
      />
      
      <VideoHero 
        title="Client Testimonials"
        subtitle="See what our clients are saying about their experience at Exquisite Dentistry"
        primaryCta={{
          text: "Schedule a Consultation",
          href: "https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
        }}
      />
      
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm text-gold font-medium mb-3">REVIEWS</span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              What Our Clients Are Saying
            </h2>
            <div className="separator mx-auto"></div>
          </div>
          
          {/* Video Testimonials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
            {VIDEO_TESTIMONIALS.map((testimonial, index) => {
              const isCenteredSolo = totalTestimonials % 2 === 1 && index === totalTestimonials - 1;
              return (
                <div
                  key={testimonial.id}
                  className={`h-full ${isCenteredSolo ? 'sm:col-span-2 sm:max-w-3xl sm:mx-auto' : ''}`}
                >
                  <VideoTestimonial
                    testimonial={testimonial}
                    className="h-full"
                  />
                </div>
              );
            })}
          </div>
          
          <div className="bg-white shadow-lg rounded-sm border border-gray-100 p-8">
            <ReviewWidget />
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;
