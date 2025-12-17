import React from 'react';
import { useScrollProgress } from '@/hooks/use-scroll-animations';

const ScrollProgress: React.FC = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-gold/80"
      style={{
        transform: `scaleX(${scrollProgress / 100})`,
        transition: 'transform 100ms ease-out'
      }}
    />
  );
};

export default ScrollProgress;
