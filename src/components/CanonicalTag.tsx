import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useCanonical, UseCanonicalOptions } from '@/hooks/use-canonical';

interface CanonicalTagProps extends UseCanonicalOptions {
  /**
   * Override the canonical URL entirely (use sparingly)
   */
  override?: string;
}

export const CanonicalTag: React.FC<CanonicalTagProps> = ({ 
  override, 
  ...canonicalOptions 
}) => {
  const generatedCanonical = useCanonical(canonicalOptions);
  const canonicalUrl = override || generatedCanonical;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default CanonicalTag; 