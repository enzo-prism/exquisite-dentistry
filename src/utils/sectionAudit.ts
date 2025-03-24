
/**
 * Section Audit Utility
 * This utility helps detect and fix spacing issues between sections
 */

// Function to check for gaps between sections
export const checkForSectionGaps = (): {
  hasGaps: boolean;
  gapLocations: string[];
} => {
  const sections = document.querySelectorAll('section');
  const gapLocations: string[] = [];
  let hasGaps = false;

  // Skip if we don't have enough sections to compare
  if (sections.length < 2) {
    return { hasGaps, gapLocations };
  }

  // Loop through adjacent sections to check for gaps
  for (let i = 0; i < sections.length - 1; i++) {
    const currentSection = sections[i];
    const nextSection = sections[i + 1];
    
    const currentBottom = currentSection.getBoundingClientRect().bottom + window.scrollY;
    const nextTop = nextSection.getBoundingClientRect().top + window.scrollY;
    
    // If there's a gap larger than 1px (allowing for rounding errors)
    if (nextTop - currentBottom > 1) {
      hasGaps = true;
      
      // Try to get section IDs or classes for identification
      const currentId = currentSection.id || 
                       Array.from(currentSection.classList).join(', ') ||
                       `Section ${i+1}`;
                       
      const nextId = nextSection.id || 
                    Array.from(nextSection.classList).join(', ') ||
                    `Section ${i+2}`;
      
      gapLocations.push(`Gap of ${Math.round(nextTop - currentBottom)}px between "${currentId}" and "${nextId}"`);
      
      // Fix the gap by adjusting the margin
      (nextSection as HTMLElement).style.marginTop = '0';
    }
  }
  
  return { hasGaps, gapLocations };
};

// Function to fix common background color inconsistencies
export const fixBackgroundConsistency = (): void => {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    // Remove any unwanted margins
    (section as HTMLElement).style.margin = '0';
    
    // Ensure backgrounds extend fully
    if ((section as HTMLElement).style.backgroundColor || 
        window.getComputedStyle(section).backgroundColor !== 'rgba(0, 0, 0, 0)') {
      (section as HTMLElement).classList.add('full-width-section');
    }
  });
};

// For debugging - add to window object
if (typeof window !== 'undefined') {
  (window as any).checkForSectionGaps = checkForSectionGaps;
  (window as any).fixBackgroundConsistency = fixBackgroundConsistency;
}
