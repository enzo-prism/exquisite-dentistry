
import { useEffect } from 'react';
import { checkForSectionGaps, fixBackgroundConsistency } from '@/utils/sectionAudit';

/**
 * Custom hook to automatically fix section gaps and background inconsistencies
 * @param delay Time in ms to wait before fixing (to ensure content is fully loaded)
 */
export function useSectionFix(delay: number = 500) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const { hasGaps, gapLocations } = checkForSectionGaps();
      
      if (hasGaps) {
        console.log('Fixed section gaps:', gapLocations);
      }
      
      fixBackgroundConsistency();
    }, delay);
    
    // Perform another check on window resize
    const handleResize = () => {
      checkForSectionGaps();
      fixBackgroundConsistency();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [delay]);
}
