import { Skeleton } from "@/components/ui/skeleton"

// Hero Section Skeleton
export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8 lg:px-16">
      <div className="text-center max-w-4xl mx-auto">
        {/* Navigation skeleton */}
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-100/90 backdrop-blur-md rounded-full px-8 py-3">
            <div className="flex items-center space-x-8">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-4 w-12" />
              ))}
            </div>
          </div>
        </div>

        {/* Hero text skeleton */}
        <div className="space-y-4 mb-8">
          <Skeleton className="h-16 w-full max-w-2xl mx-auto" />
          <Skeleton className="h-16 w-full max-w-3xl mx-auto" />
          <div className="flex items-center justify-center space-x-4">
            <Skeleton className="h-16 w-32" />
            <Skeleton className="h-12 w-32" /> {/* Video placeholder */}
            <Skeleton className="h-16 w-24" />
          </div>
        </div>

        {/* Scroll indicator skeleton */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </div>
  )
}

// Portfolio Grid Skeleton
export function PortfolioGridSkeleton() {
  return (
    <div className="space-y-8">
      {/* Section header skeleton */}
      <div className="flex justify-between items-start mb-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-8" />
      </div>

      {/* Separator line */}
      <Skeleton className="h-px w-full" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-[4/3]">
              <Skeleton className="w-full h-full" />
              {/* Hover overlay placeholder */}
              <div className="absolute inset-0">
                <div className="absolute bottom-4 left-4">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Gallery Grid Skeleton
export function GalleryGridSkeleton() {
  return (
    <div className="space-y-8">
      {/* Section header skeleton */}
      <div className="flex justify-between items-start mb-6">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-8" />
      </div>

      {/* Separator line */}
      <Skeleton className="h-px w-full" />

      {/* Gallery grid - 4x2 layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-[4/3]">
              <Skeleton className="w-full h-full" />
              {/* Hover overlay placeholder */}
              <div className="absolute inset-0">
                <div className="absolute bottom-4 left-4">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// About Section Skeleton
export function AboutSkeleton() {
  return (
    <div className="space-y-12">
      {/* Section header skeleton */}
      <div className="flex justify-between items-start mb-6">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-8" />
      </div>

      {/* Separator line */}
      <Skeleton className="h-px w-full" />

      {/* Personal info grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-20" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-16" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>

      {/* Education & Career */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-l-2 border-gray-200 pl-4 py-2">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-1" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Contact Section Skeleton
export function ContactSkeleton() {
  return (
    <div className="space-y-8">
      {/* Section header skeleton */}
      <div className="flex justify-between items-start mb-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-8" />
      </div>

      {/* Separator line */}
      <Skeleton className="h-px w-full" />

      {/* Contact layout skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[500px]">
        {/* Left Column - Image */}
        <div className="relative">
          <Skeleton className="w-full h-full min-h-[500px]" />
        </div>

        {/* Right Column - Content */}
        <div className="bg-gray-50 p-8 lg:p-16 flex flex-col justify-center">
          <Skeleton className="h-16 w-3/4 mb-8" /> {/* Title */}
          
          <div className="space-y-4 mb-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          
          <Skeleton className="h-12 w-32 rounded-full" /> {/* Button */}
        </div>
      </div>
    </div>
  )
}

// Project Detail Modal Skeleton
export function ProjectDetailSkeleton() {
  return (
    <div className="h-full overflow-y-scroll custom-scrollbar">
      {/* Header */}
      <div className="px-8 lg:px-16 pb-2 pt-16">
        {/* Back button */}
        <div className="mb-8">
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Title and details */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-12 w-3/4" />
            </div>
          </div>

          {/* Header details */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
            <div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 lg:px-16 pb-12">
        {/* Image gallery */}
        <div className="mb-12">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-[4/3] w-full" />
            ))}
          </div>
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>

        {/* Project sections */}
        <div className="space-y-12">
          {[1, 2, 3, 4].map((section) => (
            <div key={section}>
              {/* Section header */}
              <div className="mb-6">
                <Skeleton className="h-5 w-48 mb-4" />
              </div>
              
              {/* Section content */}
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
                
                {/* Grid content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-5/6" />
                        <Skeleton className="h-3 w-4/5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 mt-16 pt-12 pb-12 px-8 lg:px-16">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  )
}