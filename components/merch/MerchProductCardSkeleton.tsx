"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export const MerchProductCardSkeleton = () => {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
      {/* Image Skeleton */}
      <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 animate-pulse" />

      {/* Product Info Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <Skeleton className="h-7 w-3/4" />

        {/* Reviews */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />

        {/* Price */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>

        {/* Stock Indicator */}
        <Skeleton className="h-5 w-24" />

        {/* Size Selector */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-12" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        {/* Add to Cart Button */}
        <Skeleton className="h-14 w-full" />

        {/* Additional Info */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchProductCardSkeleton;
