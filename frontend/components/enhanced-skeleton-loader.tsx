import type React from "react"

interface EnhancedSkeletonLoaderProps {
  className?: string
  variant?: "rect" | "circle" | "text" | "wave"
  width?: string | number
  height?: string | number
  lines?: number
  waveHeight?: number
}

export const EnhancedSkeletonLoader: React.FC<EnhancedSkeletonLoaderProps> = ({
  className = "",
  variant = "rect",
  width = "100%",
  height = "100%",
  lines = 1,
  waveHeight = 4,
}) => {
  const baseClasses = "relative overflow-hidden bg-gray-200 dark:bg-gray-800"

  if (variant === "circle") {
    return (
      <div className={`rounded-full ${baseClasses} ${className}`} style={{ width, height }}>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent animate-wave" />
      </div>
    )
  }

  if (variant === "text") {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className={`h-4 mb-2 rounded ${baseClasses} ${index === lines - 1 ? "w-3/4" : "w-full"}`}>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent animate-wave" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === "wave") {
    return (
      <div className={`rounded ${baseClasses} ${className}`} style={{ width, height }}>
        {/* Multiple wave layers for Facebook-like effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 dark:via-white/15 to-transparent animate-wave" />
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent animate-wave-delayed" />
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent animate-wave-slow" />
      </div>
    )
  }

  return (
    <div className={`rounded ${baseClasses} ${className}`} style={{ width, height }}>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent animate-wave" />
    </div>
  )
}

// Enhanced Hero-specific skeleton component with Facebook-style wave animation
export const FacebookStyleHeroSkeleton: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background overlay to match hero styling */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30 dark:from-black/40 dark:via-black/30 dark:to-black/50" />

      {/* Main image skeleton with wave animation */}
      <div className="absolute inset-0">
        <EnhancedSkeletonLoader
          variant="wave"
          className="w-full h-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
        />
      </div>

      {/* Content skeleton overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl space-y-6">
          {/* Title skeleton with staggered wave animation */}
          <div className="space-y-4">
            <EnhancedSkeletonLoader
              variant="wave"
              className="h-12 md:h-16 bg-gray-300/80 dark:bg-gray-600/80 mx-auto w-4/5 max-w-2xl"
            />
            <EnhancedSkeletonLoader
              variant="wave"
              className="h-12 md:h-16 bg-gray-300/60 dark:bg-gray-600/60 mx-auto w-3/5 max-w-xl"
            />
          </div>

          {/* Subtitle skeleton */}
          <div className="space-y-3 mt-8">
            <EnhancedSkeletonLoader
              variant="wave"
              className="h-5 md:h-6 bg-gray-400/70 dark:bg-gray-500/70 w-full max-w-2xl mx-auto"
            />
            <EnhancedSkeletonLoader
              variant="wave"
              className="h-5 md:h-6 bg-gray-400/50 dark:bg-gray-500/50 w-4/5 max-w-xl mx-auto"
            />
          </div>

          {/* Buttons skeleton */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
            <EnhancedSkeletonLoader
              variant="wave"
              className="h-12 bg-gray-400/80 dark:bg-gray-500/80 w-48 mx-auto rounded-lg"
            />
            <EnhancedSkeletonLoader
              variant="wave"
              className="h-12 bg-gray-400/60 dark:bg-gray-500/60 w-48 mx-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Slide indicators skeleton */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <EnhancedSkeletonLoader
            key={index}
            variant="circle"
            width={16}
            height={16}
            className="bg-gray-400/50 dark:bg-gray-500/50"
          />
        ))}
      </div>

      {/* Scroll indicator skeleton */}
      <div className="absolute bottom-4 right-8">
        <div className="flex flex-col items-center gap-2">
          <EnhancedSkeletonLoader variant="wave" className="h-4 w-12 bg-gray-400/60 dark:bg-gray-500/60" />
          <EnhancedSkeletonLoader variant="rect" width={2} height={32} className="bg-gray-400/60 dark:bg-gray-500/60" />
        </div>
      </div>
    </div>
  )
}
