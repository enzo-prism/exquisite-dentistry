import React, { useEffect, useState } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Counts to `value` once when scrolled into view. The final number is what
 * renders on the server, without JS, and for reduced motion.
 */
const CountUp: React.FC<{ value: number; duration?: number; suffix?: string; className?: string }> = ({
  value,
  duration = 1600,
  suffix = '',
  className,
}) => {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    setDisplay(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{display.toLocaleString('en-US')}{suffix}</span>
      <span className="sr-only">{value.toLocaleString('en-US')}{suffix}</span>
    </span>
  );
};

export default CountUp;
