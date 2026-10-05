import React from 'react';
import { useInView } from '@/hooks/use-in-view';

export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'fade' | 'wipe';

type RevealProps<T extends React.ElementType> = {
  as?: T;
  variant?: RevealVariant;
  /** Milliseconds; use for staggering siblings (index * 80 reads well). */
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className' | 'style'>;

/**
 * Scroll-triggered entrance. Visible by default; hidden pre-reveal only while
 * `html.motion-ok` is set, so it can never strand content off-screen.
 */
export function Reveal<T extends React.ElementType = 'div'>({
  as,
  variant = 'up',
  delay = 0,
  className,
  style,
  children,
  ...rest
}: RevealProps<T>) {
  const Component = (as ?? 'div') as React.ElementType;
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Component
      ref={ref}
      data-reveal={variant}
      data-shown={inView ? '' : undefined}
      className={className}
      style={delay ? { ...style, '--reveal-delay': `${delay}ms` } as React.CSSProperties : style}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Reveal;
