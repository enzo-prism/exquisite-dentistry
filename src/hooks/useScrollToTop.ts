
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Global scroll state manager
class ScrollStateManager {
  private static instance: ScrollStateManager;
  private isScrolling = false;
  private scrollTimeout: NodeJS.Timeout | null = null;

  static getInstance() {
    if (!ScrollStateManager.instance) {
      ScrollStateManager.instance = new ScrollStateManager();
    }
    return ScrollStateManager.instance;
  }

  scrollToTop(smooth = false) {
    // Prevent multiple simultaneous scroll operations
    if (this.isScrolling) {
      console.log('Scroll already in progress, skipping');
      return;
    }

    this.isScrolling = true;
    console.log('Scrolling to top');

    // Clear any existing timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // Perform the scroll
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'instant'
    });

    // Reset scroll state after a short delay
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
      console.log('Scroll operation completed');
    }, smooth ? 1000 : 100);
  }

  isCurrentlyScrolling() {
    return this.isScrolling;
  }
}

export const useScrollToTop = () => {
  const { pathname } = useLocation();
  const scrollManager = ScrollStateManager.getInstance();

  useEffect(() => {
    // Debounce scroll operations and add route-specific handling
    const timeoutId = setTimeout(() => {
      // Special handling for blog routes to prevent conflicts
      if (pathname.startsWith('/blog/') && pathname !== '/blog') {
        // For individual blog posts, use smooth scroll with longer delay
        setTimeout(() => {
          scrollManager.scrollToTop(true);
        }, 100);
      } else {
        // For other routes, use instant scroll
        scrollManager.scrollToTop(false);
      }
    }, 50);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname, scrollManager]);
};
