'use client';

import { SkeletonMember } from '@/components/ui/SkeletonCard';
import { Skeleton } from '@/components/ui/Skeleton';

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-rock-black py-20">
      {/* Hero Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="h-20 bg-rock-dark rounded-lg animate-pulse" />
      </div>

      {/* Bio Section */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>

      {/* Band Members */}
      <div className="max-w-7xl mx-auto px-4">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonMember key={i} />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-rock-dark rounded-lg p-6 animate-pulse">
              <Skeleton className="h-12 w-20 mx-auto mb-2" />
              <Skeleton className="h-4 w-24 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
