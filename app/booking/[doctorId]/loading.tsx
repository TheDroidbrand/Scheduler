import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function BookingLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl py-8">
        {/* Back button skeleton */}
        <Skeleton className="h-10 w-24 mb-6" />

        {/* Doctor Profile Card Skeleton */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <Skeleton className="h-48 w-full md:h-auto md:w-48 shrink-0" />
              <div className="p-6 w-full">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Date Selection Skeleton */}
          <div className="md:col-span-1">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-10 w-full mb-6" />

            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-10" />
              ))}
            </div>
          </div>

          {/* Booking Form Skeleton */}
          <div className="md:col-span-2">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-24 w-full" />
              </div>

              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </div>
        </div>

        {/* Booking Information Skeleton */}
        <Skeleton className="h-32 w-full mt-8 rounded-lg" />
      </div>
    </div>
  )
}
