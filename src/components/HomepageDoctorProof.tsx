import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, GraduationCap, Quote, Sparkles } from 'lucide-react';
import { OptimizedImage } from '@/components/seo';
import Reveal from '@/components/motion/Reveal';
import CountUp from '@/components/motion/CountUp';
import { featuredReviews } from '@/data/featuredReviews';

const planningReview = featuredReviews.find((review) => review.name === 'Nik Nak');

/** Credentials exactly as published on /about/. */
const CREDENTIALS = [
  { icon: GraduationCap, label: 'UCLA School of Dentistry graduate' },
  { icon: Award, label: 'Invisalign Lifetime Achievement Award' },
  { icon: Sparkles, label: 'Member of the American Academy of Cosmetic Dentistry' },
] as const;

/** The dentist and a real patient voice, right after the first action. */
const HomepageDoctorProof = () => (
  <section className="relative overflow-hidden bg-ivory py-16 md:py-24" aria-label="Meet your dentist">
    <div className="section-container grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
      <div className="relative order-2 lg:order-1">
        <Reveal variant="wipe" className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-black/5 shadow-[0_40px_80px_-48px_rgba(23,18,10,0.55)] sm:aspect-[5/4] lg:aspect-[4/5]">
          <div className="absolute inset-0">
            <OptimizedImage
              src="/lovable-uploads/e2d3dd68-6f1f-4361-8749-59f510dfbc6c.png"
              alt="Dr. Alexie Aguil at Exquisite Dentistry"
              className="h-full w-full object-cover object-[72%_center]"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
        </Reveal>

        {planningReview?.quote && (
          <Reveal
            as="figure"
            variant="up"
            delay={350}
            className="relative z-10 -mt-20 ml-4 mr-4 rounded-2xl border border-gold/15 bg-white/95 p-6 shadow-[0_30px_60px_-30px_rgba(23,18,10,0.45)] backdrop-blur sm:ml-auto sm:mr-6 sm:max-w-sm lg:absolute lg:-bottom-10 lg:-right-10 lg:m-0"
          >
            <Quote className="h-6 w-6 text-gold" aria-hidden="true" />
            <blockquote className="mt-3 text-base leading-7 text-gray-800">“{planningReview.quote}”</blockquote>
            <figcaption className="mt-4 flex items-center justify-between gap-3 text-sm text-gray-600">
              <span>{planningReview.name}, patient review</span>
              <Link to="/testimonials/" className="group inline-flex min-h-11 items-center gap-1 font-semibold text-gold-dark">
                <span className="link-sweep">Read patient experiences</span>
              </Link>
            </figcaption>
          </Reveal>
        )}
      </div>

      <div className="order-1 lg:order-2">
        <Reveal as="p" variant="fade" className="eyebrow">Your dentist in Los Angeles</Reveal>
        <Reveal as="h2" variant="blur" delay={90} className="mt-4 text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-ink">
          Meet <em className="accent-serif text-gold">Dr. Alexie Aguil</em>
        </Reveal>
        <Reveal as="p" variant="up" delay={180} className="mt-6 text-base leading-8 text-gray-600 md:text-lg">
          Discuss your goals and compare treatment options in an unhurried consultation. Dr. Aguil starts with
          digital scans and a conversation about what you want to change, so the final result feels like you, not a
          template.
        </Reveal>

        <Reveal variant="up" delay={260} className="mt-8 flex items-end gap-4 border-y border-gold/20 py-6">
          <CountUp value={1000} suffix="+" className="text-5xl font-semibold tracking-[-0.03em] text-ink md:text-6xl" />
          <p className="pb-1.5 text-sm leading-5 text-gray-600">smile transformations<br />completed</p>
        </Reveal>

        <ul className="mt-6 space-y-3">
          {CREDENTIALS.map(({ icon: Icon, label }, index) => (
            <Reveal as="li" key={label} variant="left" delay={320 + index * 90} className="flex items-center gap-3 text-[15px] text-gray-800">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-gold/25 bg-white text-gold">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              {label}
            </Reveal>
          ))}
        </ul>

        <Reveal variant="up" delay={560} className="mt-8">
          <Link to="/about/" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink">
            <span className="link-sweep pb-0.5">About Dr. Aguil</span>
            <ArrowRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

export default HomepageDoctorProof;
