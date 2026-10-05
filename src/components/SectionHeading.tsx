import React from 'react';
import { cn } from '@/lib/utils';
import Reveal from '@/components/motion/Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  className?: string;
}

/**
 * Eyebrow + title + supporting line, revealed as one choreographed group:
 * the eyebrow slides in, the title un-blurs, the copy rises, a gold rule draws.
 * Wrap accent words in <em> to get the gold display serif.
 */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
  as: Heading = 'h2',
  id,
  className,
}) => {
  const centered = align === 'center';

  return (
    <div className={cn(centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl', className)}>
      {eyebrow && (
        <Reveal as="p" variant="fade" className={cn('eyebrow', centered && 'eyebrow--center', tone === 'dark' && 'eyebrow--light')}>
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as={Heading}
        variant="blur"
        delay={90}
        id={id}
        className={cn(
          'mt-4 text-[clamp(1.85rem,4.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em]',
          '[&_em]:accent-serif',
          tone === 'dark' ? 'text-white [&_em]:text-champagne' : 'text-ink [&_em]:text-gold',
        )}
      >
        {title}
      </Reveal>
      {description && (
        <Reveal
          as="p"
          variant="up"
          delay={180}
          className={cn(
            'mt-5 text-base leading-7 md:text-lg md:leading-8',
            centered && 'mx-auto max-w-2xl',
            tone === 'dark' ? 'text-white/75' : 'text-gray-600',
          )}
        >
          {description}
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;
