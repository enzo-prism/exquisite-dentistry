import { useState, useEffect, useRef, useCallback } from 'react';

interface GestureState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  startTime: number;
  isDragging: boolean;
}

interface UseSwipeGesturesProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  preventDefaultTouchmove?: boolean;
  disabled?: boolean;
}

export const useSwipeGestures = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  preventDefaultTouchmove = true,
  disabled = false
}: UseSwipeGesturesProps) => {
  const [gestureState, setGestureState] = useState<GestureState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    startTime: 0,
    isDragging: false
  });

  const elementRef = useRef<HTMLElement>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled) return;
    
    const touch = e.touches[0];
    setGestureState({
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      startTime: Date.now(),
      isDragging: true
    });
  }, [disabled]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (disabled || !gestureState.isDragging) return;
    
    if (preventDefaultTouchmove) {
      e.preventDefault();
    }
    
    const touch = e.touches[0];
    setGestureState(prev => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY
    }));
  }, [disabled, gestureState.isDragging, preventDefaultTouchmove]);

  const handleTouchEnd = useCallback(() => {
    if (disabled || !gestureState.isDragging) return;

    const deltaX = gestureState.currentX - gestureState.startX;
    const deltaY = gestureState.currentY - gestureState.startY;
    const deltaTime = Date.now() - gestureState.startTime;
    
    // Only trigger swipe if gesture was quick enough (< 300ms) or distance was significant
    const isQuickGesture = deltaTime < 300;
    const isSignificantDistance = Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold;
    
    if (isQuickGesture || isSignificantDistance) {
      // Determine primary direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > threshold && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < -threshold && onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (deltaY > threshold && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < -threshold && onSwipeUp) {
          onSwipeUp();
        }
      }
    }

    setGestureState(prev => ({ ...prev, isDragging: false }));
  }, [disabled, gestureState, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    ref: elementRef,
    gestureState,
    isGesturing: gestureState.isDragging
  };
};

// Hook for optimizing touch targets
export const useTouchOptimization = () => {
  const getTouchTargetClasses = (size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizes = {
      sm: 'min-h-[44px] min-w-[44px] p-3',
      md: 'min-h-[48px] min-w-[48px] p-4', 
      lg: 'min-h-[56px] min-w-[56px] p-5'
    };
    
    return `${sizes[size]} touch-manipulation select-none`;
  };

  const getThumbZoneClasses = () => {
    return 'fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8';
  };

  return {
    getTouchTargetClasses,
    getThumbZoneClasses
  };
};