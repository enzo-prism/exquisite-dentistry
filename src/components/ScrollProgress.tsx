import React from 'react';
import { useScrollProgress } from '@/hooks/use-scroll-animations';
import { motion } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const scrollProgress = useScrollProgress();

  return (
    <motion.div
      className="scroll-progress"
      style={{
        scaleX: scrollProgress / 100,
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
    />
  );
};

export default ScrollProgress;