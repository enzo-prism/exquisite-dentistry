import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/seo';
import PhoneLink from '@/components/PhoneLink';
import OfficeStatus from '@/components/OfficeStatus';
import Reveal from '@/components/motion/Reveal';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { trackConsultationIntent } from '@/utils/vercelAnalytics';
import type { BlogPost } from '@/data/blogPosts';
import { isVeneerPost } from './blogCta';

const ANALYTICS_SOURCE = 'blog_post_cta';
const DOCTOR_PHOTO = '/lovable-uploads/e2d3dd68-6f1f-4361-8749-59f510dfbc6c.png';


const trackBooking = (ctaText: string) => () =>
  trackConsultationIntent({
    source: ANALYTICS_SOURCE,
    ctaText,
    destination: SCHEDULE_CONSULTATION_PATH,
  });

/**
 * Slim mid-article card. Rendered inside the prose column, so it opts out of
 * typography styles with `not-prose`.
 */
export const BlogInlineConsultCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const veneer = isVeneerPost(post);
  const ctaText = 'Schedule a consultation';

  return (
    <aside
      aria-label="Consultation"
      className="not-prose my-10 rounded-2xl border border-gold/15 bg-ivory px-5 py-5 sm:px-6"
    >
      <Reveal variant="fade" className="flex flex-col gap-3">
        <div className="min-w-0 max-w-xl">
          <p className="text-[15px] font-semibold leading-6 text-ink">
            {veneer ? 'Thinking about veneers for your own smile?' : 'Have a question about your own smile?'}
          </p>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {veneer
              ? 'Bring your reference photos to a consultation and talk through shape, length, and shade with Dr. Aguil.'
              : 'A consultation is a calm place to ask it. Dr. Aguil will look at your teeth and talk through your options.'}
          </p>
        </div>
        <div className="-mb-2 flex flex-wrap items-center gap-x-6">
          <Link
            to={SCHEDULE_CONSULTATION_PATH}
            onClick={trackBooking(ctaText)}
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-dark"
          >
            <span className="link-sweep pb-0.5">{ctaText}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <PhoneLink
            phoneNumber={PHONE_NUMBER_DISPLAY}
            analyticsSource={ANALYTICS_SOURCE}
            className="min-h-11 gap-2 text-sm text-gray-600 transition-colors hover:text-ink"
          >
            <Phone className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            {PHONE_NUMBER_DISPLAY}
          </PhoneLink>
        </div>
      </Reveal>
    </aside>
  );
};

/** End-of-article consultation block with the doctor's photo. */
export const BlogConsultationBlock: React.FC<{ post: BlogPost }> = ({ post }) => {
  const veneer = isVeneerPost(post);
  const ctaText = 'Schedule Consultation';

  return (
    <section
      aria-labelledby="blog-consultation-heading"
      className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-gold/15 bg-ivory shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]"
    >
      <div className="grid sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Reveal variant="wipe" className="relative aspect-[16/10] overflow-hidden bg-black/5 sm:aspect-auto sm:min-h-full">
          <OptimizedImage
            src={DOCTOR_PHOTO}
            alt="Dr. Alexie Aguil at Exquisite Dentistry"
            className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
            sizes="(min-width: 640px) 900px, 100vw"
          />
        </Reveal>

        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <Reveal as="p" variant="fade" className="eyebrow">
            Your next step
          </Reveal>
          <Reveal
            as="h2"
            variant="blur"
            delay={90}
            id="blog-consultation-heading"
            className="mt-4 text-[clamp(1.6rem,3.2vw,2.1rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink"
          >
            Talk with <em className="accent-serif text-gold">Dr. Aguil</em> about your smile
          </Reveal>
          <Reveal as="p" variant="up" delay={160} className="mt-4 text-base leading-7 text-gray-600">
            {veneer
              ? 'Bring the questions and reference photos this article raised. At a consultation, Dr. Aguil looks at your teeth, listens to what you would like to change, and talks through whether veneers fit your case.'
              : 'Bring the questions this article raised. At a consultation, Dr. Aguil looks at your teeth, listens to what you would like to change, and talks through the options that fit your case.'}
          </Reveal>

          <Reveal variant="up" delay={230} className="mt-7 flex flex-col gap-3 sm:max-w-[17rem]">
            <Button asChild size="lg" className="group w-full justify-center">
              <Link to={SCHEDULE_CONSULTATION_PATH} onClick={trackBooking(ctaText)}>
                {ctaText}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full justify-center">
              <PhoneLink phoneNumber={PHONE_NUMBER_DISPLAY} analyticsSource={ANALYTICS_SOURCE}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {PHONE_NUMBER_DISPLAY}
              </PhoneLink>
            </Button>
          </Reveal>
          <OfficeStatus tone="light" className="mt-4 min-h-6" />

          {veneer && (
            <Reveal variant="fade" delay={300} className="mt-6 flex flex-col gap-1 border-t border-gold/20 pt-5 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <Link to="/veneers/" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink">
                <span className="link-sweep pb-0.5">Explore porcelain veneers</span>
                <ArrowRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link to="/smile-gallery/?treatment=veneers" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink">
                <span className="link-sweep pb-0.5">See veneer cases in the smile gallery</span>
                <ArrowRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};
