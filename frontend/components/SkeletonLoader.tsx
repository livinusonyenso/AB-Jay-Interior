import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className = '',
  variant = 'rect',
  width = '100%',
  height = '100%',
  lines = 1
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer';
  
  if (variant === 'circle') {
    return (
      <div
        className={`rounded-full ${baseClasses} ${className}`}
        style={{ width, height }}
      />
    );
  }

  if (variant === 'text') {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-4 mb-2 rounded ${baseClasses} ${
              index === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`rounded ${baseClasses} ${className}`}
      style={{ width, height }}
    />
  );
};

// Hero-specific skeleton component
export const HeroSkeleton: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      
      {/* Content skeleton */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl">
          {/* Title skeleton */}
          <div className="mb-6">
            <div className="h-16 md:h-20 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 animate-pulse bg-[length:200%_100%] animate-shimmer rounded mb-4 mx-auto w-3/4" />
          </div>
          
          {/* Subtitle skeleton */}
          <div className="mb-8 space-y-3">
            <div className="h-6 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 animate-pulse bg-[length:200%_100%] animate-shimmer rounded w-full max-w-2xl mx-auto" />
            <div className="h-6 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 animate-pulse bg-[length:200%_100%] animate-shimmer rounded w-3/4 max-w-xl mx-auto" />
          </div>
          
          {/* Buttons skeleton */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="h-12 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 animate-pulse bg-[length:200%_100%] animate-shimmer rounded w-48 mx-auto" />
            <div className="h-12 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 animate-pulse bg-[length:200%_100%] animate-shimmer rounded w-48 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};
