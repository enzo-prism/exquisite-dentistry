
// Network request interceptor for debugging redirects
let originalFetch: typeof fetch;

export const initNetworkDebugger = () => {
  if (originalFetch) return; // Already initialized

  originalFetch = window.fetch;
  
  window.fetch = async (...args) => {
    const [input, init] = args;
    const url = typeof input === 'string' ? input : input instanceof Request ? input.url : input.href;
    
    // Special logging for static files
    const isStaticFile = url.includes('sitemap.xml') || url.includes('robots.txt') || url.includes('favicon.ico');
    
    if (isStaticFile) {
      console.group('🌐 Static File Request Debug');
      console.log('Requesting:', url);
      console.log('Method:', init?.method || 'GET');
      console.log('Headers:', init?.headers);
    }

    try {
      const response = await originalFetch(...args);
      
      if (isStaticFile) {
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        console.log('Content-Type:', response.headers.get('content-type'));
        console.log('Was redirected:', response.redirected);
        console.log('Final URL:', response.url);
        
        // Check for redirect chains
        if (response.redirected) {
          console.warn('🔄 REDIRECT DETECTED for static file!');
          console.warn('Original URL:', url);
          console.warn('Final URL:', response.url);
        }
        
        // Check content type for XML files
        if (url.includes('sitemap.xml')) {
          const contentType = response.headers.get('content-type');
          if (!contentType?.includes('xml')) {
            console.error('❌ WRONG CONTENT TYPE for sitemap.xml:', contentType);
            console.error('Expected: application/xml or text/xml');
          }
        }
        
        console.groupEnd();
      }
      
      return response;
    } catch (error) {
      if (isStaticFile) {
        console.error('❌ Static file request failed:', error);
        console.groupEnd();
      }
      throw error;
    }
  };
  
  console.log('🔧 Network debugger initialized');
};

export const cleanupNetworkDebugger = () => {
  if (originalFetch) {
    window.fetch = originalFetch;
    originalFetch = undefined as any;
    console.log('🧹 Network debugger cleaned up');
  }
};

// Specific sitemap testing utility
export const testSitemapAccess = async () => {
  console.group('🧪 Sitemap Access Test');
  
  try {
    const response = await fetch('/sitemap.xml', {
      method: 'GET',
      headers: {
        'Accept': 'application/xml,text/xml,*/*'
      }
    });
    
    console.log('Status:', response.status);
    console.log('Content-Type:', response.headers.get('content-type'));
    console.log('Was redirected:', response.redirected);
    console.log('Final URL:', response.url);
    
    const content = await response.text();
    console.log('Content preview:', content.substring(0, 200) + '...');
    
    // Check if content is XML
    const isXML = content.includes('<?xml') && content.includes('<urlset');
    console.log('Is valid XML:', isXML);
    
    if (!isXML) {
      console.error('❌ Content is not XML! Likely served by React Router');
    } else {
      console.log('✅ Sitemap served correctly as XML');
    }
    
  } catch (error) {
    console.error('❌ Sitemap test failed:', error);
  }
  
  console.groupEnd();
};
