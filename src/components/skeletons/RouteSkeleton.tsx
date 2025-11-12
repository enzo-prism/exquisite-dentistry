import React from 'react';
import { cn } from '@/lib/utils';

interface RouteSkeletonProps {
  title?: string;
  description?: string;
  showCTA?: boolean;
  variant?: 'hero' | 'article' | 'gallery';
}

const shimmer = 'animate-pulse bg-white/10 rounded';

const RouteSkeleton: React.FC<RouteSkeletonProps> = ({
  title = 'Loading experience',
  description = 'Preparing content...',
  showCTA = true,
  variant = 'hero'
}) => {
  const baseSection = 'py-16 sm:py-24 bg-black text-white';
  const gridClass = variant === 'gallery'
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'
    : 'grid grid-cols-1 md:grid-cols-2 gap-8 mt-12';

  return (
    <div className="bg-black min-h-[60vh] text-white">
      <header className={cn(baseSection, 'border-b border-white/10')}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <p className={cn('mx-auto h-4 w-40', shimmer)} aria-hidden="true" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            {description}
          </p>
          {showCTA && (
            <div className="flex justify-center gap-4 pt-4 flex-wrap">
              <span className={cn('h-11 w-48', shimmer)} aria-hidden="true" />
              <span className={cn('h-11 w-36', shimmer)} aria-hidden="true" />
            </div>
          )}
        </div>
      </header>

      <section className="bg-[#0b0b0b] py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={gridClass}>
            {Array.from({ length: variant === 'gallery' ? 6 : 4 }).map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  'rounded-3xl border border-white/5 bg-white/5 p-6 space-y-4',
                  'shadow-[0_25px_60px_-35px_rgba(15,23,42,0.25)]'
                )}
              >
                <div className={cn('w-full h-40', shimmer)} aria-hidden="true" />
                <div className="space-y-2">
                  <div className={cn('h-4 w-3/4', shimmer)} aria-hidden="true" />
                  <div className={cn('h-4 w-2/3', shimmer)} aria-hidden="true" />
                  <div className={cn('h-4 w-1/2', shimmer)} aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RouteSkeleton;
