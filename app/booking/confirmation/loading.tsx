import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ConfirmationLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Success Icon and Message Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-20 w-20 rounded-full mx-auto mb-4" />
          <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
        </div>

        {/* Appointment Details Card Skeleton */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Skeleton className="h-6 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              <Skeleton className="h-[1px] w-full" />

              <div className="space-y-3">
                <div className="flex items-start">
                  <Skeleton className="h-5 w-5 mr-3" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>

                <div className="flex items-start">
                  <Skeleton className="h-5 w-5 mr-3" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>

                <div className="flex items-start">
                  <Skeleton className="h-5 w-5 mr-3" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>

              <Skeleton className="h-[1px] w-full" />

              <div>
                <Skeleton className="h-4 w-1/3 mb-1" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What to Bring Section Skeleton */}
        <Skeleton className="h-32 w-full mb-8 rounded-lg" />

        {/* Return to Dashboard Button Skeleton */}
        <Skeleton className="h-10 w-full rounded-md" />

        {/* Add to Calendar Options Skeleton */}
        <div className="mt-4 flex justify-center space-x-4">
          <Skeleton className="h-8 w-40 rounded-md" />
          <Skeleton className="h-8 w-40 rounded-md" />
        </div>
      </div>
    </div>
  )
}
