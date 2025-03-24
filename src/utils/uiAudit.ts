
// UI Audit Utility
// This utility helps detect potential UI issues across the application

// Types for UI audit checks
type AuditCheckResult = {
  passed: boolean;
  message: string;
  fixSuggestion?: string;
  element?: Element;
};

type AuditCheck = {
  name: string;
  description: string;
  performCheck: () => AuditCheckResult[];
};

// Collection of UI audit checks
const uiChecks: AuditCheck[] = [
  {
    name: 'Navbar Contrast Check',
    description: 'Ensures the navbar has sufficient contrast against the content',
    performCheck: () => {
      const results: AuditCheckResult[] = [];
      const header = document.querySelector('header');
      
      if (!header) {
        results.push({
          passed: false,
          message: 'Cannot find header element',
          fixSuggestion: 'Ensure the header element exists in the DOM'
        });
        return results;
      }
      
      const headerBg = window.getComputedStyle(header).backgroundColor;
      
      // Check if the background is transparent or has low opacity
      if (headerBg === 'transparent' || 
          headerBg.includes('rgba') && 
          parseFloat(headerBg.split(',')[3]) < 0.5) {
        results.push({
          passed: false,
          message: 'Header has transparent or low opacity background',
          fixSuggestion: 'Ensure header has a solid background with sufficient opacity',
          element: header
        });
      } else {
        results.push({
          passed: true,
          message: 'Header has sufficient background opacity'
        });
      }
      
      return results;
    }
  },
  {
    name: 'Navigation Link Visibility',
    description: 'Checks if navigation links have sufficient contrast',
    performCheck: () => {
      const results: AuditCheckResult[] = [];
      const navLinks = document.querySelectorAll('header nav a');
      
      if (navLinks.length === 0) {
        results.push({
          passed: false,
          message: 'No navigation links found',
          fixSuggestion: 'Check if navigation links are properly rendered'
        });
        return results;
      }
      
      navLinks.forEach((link, index) => {
        const linkColor = window.getComputedStyle(link).color;
        const linkBg = window.getComputedStyle(link).backgroundColor;
        
        // Simple check for contrast (we'd need a more sophisticated algorithm for proper WCAG checks)
        if (linkColor === linkBg || 
            (linkColor.includes('rgba') && parseFloat(linkColor.split(',')[3]) < 0.7)) {
          results.push({
            passed: false,
            message: `Navigation link ${index + 1} has insufficient contrast`,
            fixSuggestion: 'Increase contrast between link text and background',
            element: link
          });
        }
      });
      
      if (results.length === 0) {
        results.push({
          passed: true,
          message: 'All navigation links have sufficient contrast'
        });
      }
      
      return results;
    }
  },
  {
    name: 'Mobile Menu Visibility',
    description: 'Ensures the mobile menu is visible and accessible',
    performCheck: () => {
      const results: AuditCheckResult[] = [];
      const mobileMenu = document.querySelector('header button[aria-label*="menu"]');
      
      if (!mobileMenu) {
        results.push({
          passed: false,
          message: 'Mobile menu button not found',
          fixSuggestion: 'Check if the mobile menu button is properly rendered'
        });
        return results;
      }
      
      const menuColor = window.getComputedStyle(mobileMenu).color;
      const headerBg = window.getComputedStyle(document.querySelector('header')!).backgroundColor;
      
      // Simple contrast check
      if (menuColor === headerBg) {
        results.push({
          passed: false,
          message: 'Mobile menu button may have insufficient contrast',
          fixSuggestion: 'Ensure mobile menu button color contrasts with header background',
          element: mobileMenu
        });
      } else {
        results.push({
          passed: true,
          message: 'Mobile menu button appears to have sufficient contrast'
        });
      }
      
      return results;
    }
  }
];

// Main audit function
export const runUIAudit = (): {
  allPassed: boolean;
  results: {check: string; results: AuditCheckResult[]}[];
} => {
  const auditResults = uiChecks.map(check => ({
    check: check.name,
    results: check.performCheck()
  }));
  
  const allPassed = auditResults.every(result => 
    result.results.every(r => r.passed)
  );
  
  return {
    allPassed,
    results: auditResults
  };
};

// Helper to log audit results to console
export const logAuditResults = () => {
  const audit = runUIAudit();
  
  console.group('UI Audit Results');
  console.log(`Overall Status: ${audit.allPassed ? '✅ PASSED' : '❌ FAILED'}`);
  
  audit.results.forEach(checkResult => {
    console.group(`Check: ${checkResult.check}`);
    
    checkResult.results.forEach(result => {
      if (result.passed) {
        console.log(`✅ PASSED: ${result.message}`);
      } else {
        console.log(`❌ FAILED: ${result.message}`);
        if (result.fixSuggestion) {
          console.log(`   Suggestion: ${result.fixSuggestion}`);
        }
        if (result.element) {
          console.log('   Element:', result.element);
        }
      }
    });
    
    console.groupEnd();
  });
  
  console.groupEnd();
  
  return audit;
};

// Add debugging functions to window for easy access from the browser console
if (typeof window !== 'undefined') {
  (window as any).runUIAudit = runUIAudit;
  (window as any).logAuditResults = logAuditResults;
}
