'use client';

import { SkeletonAlbum } from '@/components/ui/SkeletonCard';

export default function MusicLoading() {
  return (
    <div className="min-h-screen bg-rock-black py-20">
      {/* Hero Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="h-20 bg-rock-dark rounded-lg animate-pulse" />
      </div>

      {/* Albums Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonAlbum key={i} />
        ))}
      </div>

      {/* Videos Section */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="h-10 bg-rock-dark rounded-lg animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="aspect-video bg-rock-dark rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
