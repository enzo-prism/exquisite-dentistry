import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const BlogCardSkeleton: React.FC = () => {
  return (
    <Card className="group relative overflow-hidden border border-border/50 shadow-lg bg-card/95 backdrop-blur-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[16/10] w-full bg-muted/50" />
      
      <CardContent className="p-6 md:p-8 space-y-4">
        {/* Meta Information Skeleton */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-5 w-20 bg-muted/50 rounded-full" />
          <div className="h-4 w-24 bg-muted/30 rounded" />
          <div className="h-4 w-20 bg-muted/30 rounded" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-6 w-full bg-muted/50 rounded" />
          <div className="h-6 w-3/4 bg-muted/50 rounded" />
        </div>

        {/* Excerpt Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted/30 rounded" />
          <div className="h-4 w-full bg-muted/30 rounded" />
          <div className="h-4 w-2/3 bg-muted/30 rounded" />
        </div>

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 bg-muted/30 rounded-full" />
          <div className="h-6 w-20 bg-muted/30 rounded-full" />
          <div className="h-6 w-14 bg-muted/30 rounded-full" />
        </div>

        {/* Author and CTA Skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted/50 rounded-full" />
            <div className="space-y-1">
              <div className="h-4 w-20 bg-muted/50 rounded" />
              <div className="h-3 w-16 bg-muted/30 rounded" />
            </div>
          </div>
          <div className="h-8 w-24 bg-muted/50 rounded" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCardSkeleton;