'use client';

import { SkeletonGalleryItem } from '@/components/ui/SkeletonCard';

export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-rock-black py-20">
      {/* Hero Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="h-20 bg-rock-dark rounded-lg animate-pulse" />
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <SkeletonGalleryItem key={i} />
        ))}
      </div>
    </div>
  );
}
