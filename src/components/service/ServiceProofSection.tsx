import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import PatientTransformationCard from '@/components/PatientTransformation';
import { patientTransformations, type GalleryCategory } from '@/data/patientTransformations';
import { featuredReviews } from '@/data/featuredReviews';
import { cn } from '@/lib/utils';
import { trackConsultationIntent } from '@/utils/vercelAnalytics';

interface ServiceProofSectionProps {
  /** Exact case names to show, in order. Takes precedence over `categories`. */
  caseNames?: string[];
  /** Gallery categories to show first; other cases fill the row up to `caseCount`. */
  categories?: GalleryCategory[];
  caseCount?: number;
  /** Exact reviewer names from featuredReviews (quotes are shown verbatim). */
  reviewNames: string[];
  consultationHref: string;
  /** Analytics source for the booking button. */
  source: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

/**
 * Proof block for treatment pages: real before/after comparisons, a few
 * verbatim patient reviews and one clear next step, placed near the top.
 */
const ServiceProofSection: React.FC<ServiceProofSectionProps> = ({
  caseNames,
  categories = [],
  caseCount = 3,
  reviewNames,
  consultationHref,
  source,
  eyebrow = 'Real patient results',
  title = <>See the work <em>before you decide</em></>,
  description = 'Drag a comparison, or use the arrow keys when it has focus. Results vary by patient.',
  className,
}) => {
  const primary = caseNames?.length
    ? caseNames
        .map((name) => patientTransformations.find((patient) => patient.name === name))
        .filter((patient): patient is NonNullable<typeof patient> => Boolean(patient))
    : patientTransformations.filter((patient) =>
        patient.categories.some((category) => categories.includes(category)),
      );
  const rest = patientTransformations.filter((patient) => !primary.includes(patient));
  const cases = [...primary, ...rest].slice(0, caseCount);

  const reviews = reviewNames
    .map((name) => featuredReviews.find((review) => review.name === name && review.quote))
    .filter((review): review is NonNullable<typeof review> => Boolean(review));

  return (
    <section className={cn('bg-ivory py-16 md:py-24', className)} aria-label="Patient results and reviews">
      <div className="section-container">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cases.map((patient, index) => (
            <Reveal key={patient.name} variant="up" delay={index * 80} className="h-full">
              <PatientTransformationCard patient={patient} />
            </Reveal>
          ))}
        </div>

        {reviews.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 md:gap-6 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <Reveal
                as="figure"
                key={review.name}
                variant="up"
                delay={index * 80}
                className="flex h-full flex-col rounded-2xl sm:[&:nth-child(3)]:col-span-2 lg:[&:nth-child(3)]:col-span-1 border border-gold/15 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]"
              >
                <div className="flex items-center gap-0.5 text-gold" role="img" aria-label={`${review.rating} star review`}>
                  {Array.from({ length: review.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-7 text-ink/85">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-sm font-semibold text-ink">
                  {review.name}
                  <span className="ml-2 font-normal text-gray-500">Patient</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal variant="up" className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:mt-12">
          <Button asChild size="lg" className="group h-auto min-h-12 whitespace-normal py-3">
            <Link
              to={consultationHref}
              onClick={() => trackConsultationIntent({ source, ctaText: 'Schedule Consultation', destination: consultationHref })}
            >
              Schedule Consultation
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-auto min-h-12 whitespace-normal py-3">
            <Link to="/smile-gallery/">Browse cases by treatment</Link>
          </Button>
          <Link
            to="/testimonials/"
            className="group inline-flex min-h-12 items-center justify-center px-2 text-sm font-semibold text-gold-dark"
          >
            <span className="link-sweep pb-0.5">Read more patient reviews</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default ServiceProofSection;
