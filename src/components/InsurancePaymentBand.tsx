import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, ShieldCheck, Star } from 'lucide-react';

import {
  HOMEPAGE_INSURANCE_PANELS,
  INSURANCE_HERO_HOOK,
} from '@/data/insurance';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/motion/Reveal';

const panelIcons = [ShieldCheck, CreditCard, Star] as const;

const InsurancePaymentBand: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal as="p" variant="fade" className="eyebrow">
              Insurance & Payment
            </Reveal>
            <Reveal as="h2" variant="blur" delay={90} className="mt-4 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
              {INSURANCE_HERO_HOOK}
            </Reveal>
            <Reveal as="p" variant="up" delay={180} className="mt-5 text-base leading-7 text-gray-600 md:text-lg md:leading-8">
              Our team works with many PPO plans and PPO network relationships, and we can help
              verify your benefits before treatment. If you still have an out-of-pocket balance
              after benefits are reviewed, Cherry can help eligible patients explore monthly
              payment options.
            </Reveal>
          </div>

          <div className="grid gap-5">
            {HOMEPAGE_INSURANCE_PANELS.map((panel, index) => {
              const Icon = panelIcons[index];

              return (
                <Reveal key={panel.title} variant="up" delay={index * 120}>
                  <article className="lift-card group flex h-full flex-col gap-5 rounded-2xl border border-gold/15 bg-ivory p-6 sm:flex-row sm:items-start sm:p-7">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-gold/25 bg-white text-gold transition-transform duration-500 group-hover:scale-105">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink md:text-xl">{panel.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-gray-600">
                        {panel.description}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <Button asChild className="h-11 px-6">
                          <Link to={panel.primaryCtaHref}>{panel.primaryCtaLabel}</Link>
                        </Button>
                        <Link
                          to={panel.secondaryCtaHref}
                          className="group/link inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold-dark"
                        >
                          {panel.secondaryCtaLabel}
                          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover/link:translate-x-1" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsurancePaymentBand;
