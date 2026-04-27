import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, ShieldCheck, Star } from 'lucide-react';

import {
  HOMEPAGE_INSURANCE_PANELS,
  INSURANCE_HERO_HOOK,
  INSURANCE_DIRECT_CARRIER_LIST,
  INSURANCE_PARTNER_CARRIER_LIST,
} from '@/data/insurance';
import { Button } from '@/components/ui/button';

const panelIcons = [ShieldCheck, CreditCard, Star] as const;

const InsurancePaymentBand: React.FC = () => {
  return (
    <section className="bg-[linear-gradient(180deg,#faf7f1_0%,#ffffff_100%)] py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
              Insurance & Payment
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {INSURANCE_HERO_HOOK}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
              Direct in-network carriers include {INSURANCE_DIRECT_CARRIER_LIST}. Partner billing
              examples include {INSURANCE_PARTNER_CARRIER_LIST}. If you still have an
              out-of-pocket balance after benefits are reviewed, Cherry can help eligible patients
              explore monthly payment options.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {HOMEPAGE_INSURANCE_PANELS.map((panel, index) => {
              const Icon = panelIcons[index];

              return (
                <article
                  key={panel.title}
                  className="flex h-full flex-col rounded-[1.75rem] border border-gold/15 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.28)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{panel.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                    {panel.description}
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Button asChild>
                      <Link to={panel.primaryCtaHref}>{panel.primaryCtaLabel}</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to={panel.secondaryCtaHref}>{panel.secondaryCtaLabel}</Link>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsurancePaymentBand;
