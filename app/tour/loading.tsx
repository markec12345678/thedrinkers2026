'use client';

import { SkeletonTourDate } from '@/components/ui/SkeletonCard';

export default function TourLoading() {
  return (
    <div className="min-h-screen bg-rock-black py-20">
      {/* Hero Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="h-20 bg-rock-dark rounded-lg animate-pulse" />
      </div>

      {/* Tour Dates List */}
      <div className="max-w-7xl mx-auto px-4 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonTourDate key={i} />
        ))}
      </div>

      {/* Map Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="h-96 bg-rock-dark rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
