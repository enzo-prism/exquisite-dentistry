
// Comprehensive sitemap debugging utility
export const debugSitemap = async () => {
  console.group('🔍 COMPREHENSIVE SITEMAP DEBUG');
  
  // 1. Check if sitemap.xml exists as static file
  console.log('1. Testing direct static file access...');
  try {
    const response = await fetch('/sitemap.xml', { 
      method: 'HEAD',
      cache: 'no-cache'
    });
    console.log('HEAD request status:', response.status);
    console.log('HEAD request headers:', Object.fromEntries(response.headers.entries()));
  } catch (error) {
    console.error('HEAD request failed:', error);
  }
  
  // 2. Check full GET request
  console.log('2. Testing full GET request...');
  try {
    const response = await fetch('/sitemap.xml', {
      cache: 'no-cache',
      headers: {
        'Accept': 'application/xml,text/xml,*/*'
      }
    });
    
    console.log('GET status:', response.status);
    console.log('GET headers:', Object.fromEntries(response.headers.entries()));
    console.log('Was redirected:', response.redirected);
    console.log('Final URL:', response.url);
    
    const content = await response.text();
    console.log('Content length:', content.length);
    console.log('Content starts with XML:', content.startsWith('<?xml'));
    console.log('Contains urlset:', content.includes('<urlset'));
    
    if (content.includes('<!DOCTYPE html')) {
      console.error('❌ Received HTML instead of XML - hitting React Router!');
      console.log('HTML preview:', content.substring(0, 300));
    } else if (content.startsWith('<?xml')) {
      console.log('✅ Received valid XML content');
    } else {
      console.warn('⚠️ Unexpected content format');
      console.log('Content preview:', content.substring(0, 300));
    }
  } catch (error) {
    console.error('GET request failed:', error);
  }
  
  // 3. Check current location and routing state
  console.log('3. Current routing state...');
  console.log('Current pathname:', window.location.pathname);
  console.log('Current search:', window.location.search);
  console.log('Current hash:', window.location.hash);
  console.log('Current href:', window.location.href);
  
  // 4. Test navigation to sitemap
  console.log('4. Testing programmatic navigation...');
  const originalHref = window.location.href;
  
  try {
    // Test if navigating to sitemap triggers React Router
    console.log('Attempting to navigate to /sitemap.xml...');
    window.history.pushState({}, '', '/sitemap.xml');
    
    setTimeout(() => {
      console.log('After navigation, location is:', window.location.href);
      
      // Reset to original location
      window.history.pushState({}, '', originalHref);
      console.log('Reset to original location:', window.location.href);
    }, 1000);
    
  } catch (error) {
    console.error('Navigation test failed:', error);
  }
  
  console.groupEnd();
};

// Add to window for manual testing
if (typeof window !== 'undefined') {
  (window as any).debugSitemap = debugSitemap;
  console.log('🔧 Sitemap debugger available: window.debugSitemap()');
}
