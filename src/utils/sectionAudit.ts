/**
 * Section Audit Utility
 * Read-only, explicitly invoked diagnostic. Layout belongs to component CSS.
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
      
    }
  }
  
  return { hasGaps, gapLocations };
};
