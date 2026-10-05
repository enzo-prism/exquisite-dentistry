import React from 'react';
import Reveal from '@/components/motion/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { CONSULTATION_DETAILS } from '@/data/consultation';

/**
 * "Plan your first visit" as three numbered steps. On wide screens a gold
 * hairline draws across the step markers as the row scrolls in; on phones the
 * steps stack along a quiet vertical rule.
 */
const FirstVisitTimeline: React.FC = () => (
  <div>
    <SectionHeading
      as="h2"
      id="first-visit-heading"
      eyebrow="Before you arrive"
      title={<>Plan your <em>first visit</em></>}
      align="center"
    />

    <Reveal variant="fade" className="relative mx-auto mt-12 max-w-5xl md:mt-16">
      <span
        aria-hidden="true"
        className="draw-rule absolute left-[16.667%] right-[16.667%] top-6 hidden md:block"
        style={{ '--reveal-delay': '250ms' } as React.CSSProperties}
      />
      <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-gold/20 md:hidden" />

      <ol className="relative grid gap-9 md:grid-cols-3 md:gap-8 lg:gap-12">
        {CONSULTATION_DETAILS.map((detail, index) => (
          <Reveal
            as="li"
            key={detail.title}
            variant="up"
            delay={200 + index * 140}
            className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-5 md:block md:text-center"
          >
            <span
              aria-hidden="true"
              className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-white text-sm font-semibold tracking-[0.08em] text-gold-dark shadow-[0_12px_30px_-18px_rgba(23,18,10,0.45)] md:mx-auto"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="pt-2.5 md:pt-0">
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink md:mt-6">{detail.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-gray-600 md:mx-auto md:max-w-xs">{detail.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Reveal>
  </div>
);

export default FirstVisitTimeline;
