import React from 'react';
import { Award, Clock, GraduationCap, MapPin, Quote, Sparkles, Star } from 'lucide-react';
import { OptimizedImage } from '@/components/seo';
import OfficeStatus from '@/components/OfficeStatus';
import OpenInMapsButton from '@/components/OpenInMapsButton';
import Reveal from '@/components/motion/Reveal';
import { ADDRESS_LOCALITY, ADDRESS_REGION, POSTAL_CODE, STREET_ADDRESS } from '@/constants/contact';
import { featuredReviews } from '@/data/featuredReviews';

/** Credentials exactly as published on /about/ (see HomepageDoctorProof). */
const CREDENTIALS = [
  { icon: GraduationCap, label: 'UCLA School of Dentistry graduate' },
  { icon: Award, label: 'Invisalign Lifetime Achievement Award' },
  { icon: Sparkles, label: 'Member of the American Academy of Cosmetic Dentistry' },
] as const;

/** A real, first-visit review, rendered verbatim from the bundled source. */
const firstVisitReview = featuredReviews.find((review) => review.name === 'Tyler Miller');

/**
 * The calm "who you will see and where" companion to the booking column:
 * doctor, credentials, live hours, address with maps, and one patient voice.
 */
const ConsultationTrustPanel: React.FC<{ className?: string }> = ({ className }) => (
  <aside aria-labelledby="trust-panel-heading" className={className}>
    <Reveal
      variant="up"
      delay={160}
      className="overflow-hidden rounded-2xl border border-gold/15 bg-white shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]"
    >
      <Reveal variant="wipe" delay={260} className="relative aspect-[16/9] overflow-hidden bg-ivory lg:aspect-[5/2]">
        <div className="absolute inset-0">
          <OptimizedImage
            src="/lovable-uploads/e2d3dd68-6f1f-4361-8749-59f510dfbc6c.png"
            alt="Dr. Alexie Aguil at Exquisite Dentistry"
            className="h-full w-full object-cover object-[100%_22%]"
            sizes="(min-width: 1024px) 460px, 100vw"
          />
        </div>
      </Reveal>

      <div className="p-5 sm:p-6">
        <p className="eyebrow">Your dentist</p>
        <h2 id="trust-panel-heading" className="mt-2 text-xl font-semibold tracking-[-0.02em] text-ink">
          Dr. Alexie Aguil
        </h2>
        <ul className="mt-3.5 space-y-2">
          {CREDENTIALS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-start gap-3 text-sm leading-5 text-gray-700">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>

        <dl className="mt-5 space-y-3.5 border-t border-gold/15 pt-5 text-sm">
          <div className="flex gap-3">
            <dt className="mt-0.5 shrink-0 text-gold">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Hours</span>
            </dt>
            <dd className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 leading-5">
              <span className="font-medium text-ink">Monday–Thursday, 8AM–6PM</span>
              <OfficeStatus tone="light" />
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="mt-0.5 shrink-0 text-gold">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Address</span>
            </dt>
            <dd className="min-w-0 leading-5 text-ink">
              <span className="font-medium">{STREET_ADDRESS}</span>, {ADDRESS_LOCALITY}, {ADDRESS_REGION} {POSTAL_CODE}
              <span className="mt-2.5 block">
                <OpenInMapsButton source="schedule_consultation_panel" />
              </span>
            </dd>
          </div>
        </dl>

        {firstVisitReview?.quote && (
          <figure className="mt-5 border-t border-gold/15 pt-5">
            <div className="flex items-center justify-between gap-3">
              <span className="flex gap-0.5 text-gold" aria-hidden="true">
                {Array.from({ length: firstVisitReview.rating }).map((_, index) => (
                  <Star key={index} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              <Quote className="h-4 w-4 text-gold/50" aria-hidden="true" />
            </div>
            <blockquote className="mt-2.5 text-[15px] leading-6 text-gray-800">“{firstVisitReview.quote}”</blockquote>
            <figcaption className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-gray-500">
              {firstVisitReview.name}, patient review
            </figcaption>
          </figure>
        )}
      </div>
    </Reveal>
  </aside>
);

export default ConsultationTrustPanel;
