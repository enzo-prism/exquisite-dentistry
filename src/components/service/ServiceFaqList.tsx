import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceFaqListProps {
  faqs: Array<{ question: string; answer: React.ReactNode }>;
  className?: string;
  /** Open the first answer by default. */
  openFirst?: boolean;
}

/**
 * Native <details> FAQ list. Answers stay in the DOM while collapsed (crawlable,
 * no JS needed) and the list reads as one calm card.
 */
const ServiceFaqList: React.FC<ServiceFaqListProps> = ({ faqs, className, openFirst = false }) => (
  <div
    className={cn(
      'divide-y divide-gold/10 overflow-hidden rounded-2xl border border-gold/15 bg-white shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]',
      className,
    )}
  >
    {faqs.map((faq, index) => (
      <details key={faq.question} className="group" open={openFirst && index === 0}>
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold leading-snug text-ink transition-colors hover:text-gold-dark sm:px-7 sm:text-lg [&::-webkit-details-marker]:hidden">
          <span className="min-w-0">{faq.question}</span>
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/25 text-gold transition-transform duration-300 group-open:rotate-45"
            aria-hidden="true"
          >
            <Plus className="h-4 w-4" />
          </span>
        </summary>
        <div className="px-5 pb-6 text-base leading-7 text-gray-600 sm:px-7">{faq.answer}</div>
      </details>
    ))}
  </div>
);

export default ServiceFaqList;
