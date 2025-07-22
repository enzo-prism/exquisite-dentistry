
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
    // Small delay to ensure page content is ready
    const timeoutId = setTimeout(() => {
      scrollManager.scrollToTop(false);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname, scrollManager]);
};
