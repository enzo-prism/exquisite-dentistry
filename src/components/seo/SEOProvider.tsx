import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import PerformanceOptimizer from './PerformanceOptimizer';

interface SEOProviderProps {
  children: React.ReactNode;
}

const SEOProvider: React.FC<SEOProviderProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <PerformanceOptimizer>
        {children}
      </PerformanceOptimizer>
    </HelmetProvider>
  );
};

export default SEOProvider;