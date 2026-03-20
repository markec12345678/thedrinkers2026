import { Skeleton } from './Skeleton';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`bg-rock-dark rounded-lg overflow-hidden ${className}`}>
      {/* Image placeholder */}
      <Skeleton className="w-full h-48 md:h-64" />
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Subtitle */}
        <Skeleton className="h-4 w-1/2" />
        
        {/* Meta info */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonAlbum({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`bg-rock-dark rounded-lg overflow-hidden ${className}`}>
      {/* Album artwork square */}
      <Skeleton className="w-full aspect-square" />
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Album title */}
        <Skeleton className="h-6 w-full" />
        
        {/* Year */}
        <Skeleton className="h-4 w-24" />
        
        {/* Track count */}
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}

export function SkeletonTourDate({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`bg-rock-dark rounded-lg p-6 ${className}`}>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Date */}
        <Skeleton className="h-16 w-16 md:w-20 rounded-full flex-shrink-0" />
        
        {/* Details */}
        <div className="flex-1 w-full space-y-3">
          {/* City & Venue */}
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        
        {/* Ticket button */}
        <Skeleton className="h-10 w-32 flex-shrink-0" />
      </div>
    </div>
  );
}

export function SkeletonMerchItem({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`bg-rock-dark rounded-lg overflow-hidden ${className}`}>
      {/* Product image */}
      <Skeleton className="w-full h-64" />
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Product name */}
        <Skeleton className="h-5 w-full" />
        
        {/* Price */}
        <Skeleton className="h-6 w-20" />
        
        {/* Sizes */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGalleryItem({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`bg-rock-dark rounded-lg overflow-hidden ${className}`}>
      {/* Image */}
      <Skeleton className="w-full aspect-video" />
    </div>
  );
}

export function SkeletonMember({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`text-center ${className}`}>
      {/* Photo */}
      <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4" />
      
      {/* Name */}
      <Skeleton className="h-6 w-40 mx-auto mb-2" />
      
      {/* Role */}
      <Skeleton className="h-4 w-32 mx-auto" />
    </div>
  );
}
