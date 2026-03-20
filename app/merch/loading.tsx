'use client';

import { SkeletonMerchItem } from '@/components/ui/SkeletonCard';

export default function MerchLoading() {
  return (
    <div className="min-h-screen bg-rock-black py-20">
      {/* Hero Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="h-20 bg-rock-dark rounded-lg animate-pulse" />
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonMerchItem key={i} />
        ))}
      </div>
    </div>
  );
}
