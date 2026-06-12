"use client"

import LoadingSpinner3D from "@/components/3d/LoadingSpinner3D"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <LoadingSpinner3D />
      <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse tracking-widest uppercase">
        Initializing Finlytics 3D...
      </p>
    </div>
  )
}
