import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, Images, MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PAYMENT_PLANS_PATH, SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { CHERRY_CREDIT_SCORE_REASSURANCE } from '@/constants/cherry';
import { cn } from '@/lib/utils';

interface TreatmentDecisionBandProps {
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}

const decisionLinks = [
  {
    title: 'See real patient results',
    description: 'Compare before-and-after smile transformations from actual Exquisite patients.',
    href: '/smile-gallery/',
    cta: 'View Smile Gallery',
    Icon: Images,
  },
  {
    title: 'Check payment options',
    description: CHERRY_CREDIT_SCORE_REASSURANCE,
    href: PAYMENT_PLANS_PATH,
    cta: 'Explore Cherry',
    Icon: CreditCard,
  },
  {
    title: 'Ask what fits your case',
    description: 'Book a consultation to review timing, treatment fit, PPO benefits, and next steps.',
    href: SCHEDULE_CONSULTATION_PATH,
    cta: 'Schedule Consultation',
    Icon: MessageCircle,
  },
];

const TreatmentDecisionBand: React.FC<TreatmentDecisionBandProps> = ({
  className,
  eyebrow = 'Next Step',
  title = 'Not sure where to start?',
  description = 'If you are comparing cosmetic options, these three paths help you move from research to a clearer decision.',
}) => (
  <section className={cn('scroll-mt-24 bg-white py-12 sm:py-14', className)}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-black sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-black-light/80">
            {description}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {decisionLinks.map(({ title: itemTitle, description: itemDescription, href, cta, Icon }) => (
            <Link
              key={itemTitle}
              to={href}
              className="group flex h-full flex-col rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-secondary shadow-sm">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-black">{itemTitle}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-black-light/80">
                {itemDescription}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-secondary">
                {cta}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild>
          <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={PAYMENT_PLANS_PATH}>Review Payment Plans</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default TreatmentDecisionBand;
