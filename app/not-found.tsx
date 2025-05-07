"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Stethoscope, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Medical Icon */}
        <div className="mb-6 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-red-100 rounded-full opacity-60" />
          <Stethoscope className="h-24 w-24 text-teal-600 mx-auto relative" />
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold text-teal-700 mb-4">404</h1>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Page not found.</h2>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => router.back()} variant="outline" className="flex items-center justify-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Button asChild className="bg-teal-600 hover:bg-teal-700 flex items-center justify-center">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Homepage
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 mt-8">
          If you believe this is an error, please contact our support team at{" "}
          <a href="mailto:support@medischedule.com" className="text-teal-600 hover:underline">
            support@medischedule.com
          </a>
        </p>
      </div>

      {/* Medical-themed decorative elements */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-gradient-to-r from-teal-500/10 to-blue-500/10" />
      <div className="fixed top-10 right-10 opacity-10">
        <Stethoscope className="h-32 w-32 text-teal-600" />
      </div>
      <div className="fixed bottom-10 left-10 opacity-10">
        <Stethoscope className="h-24 w-24 text-teal-600" />
      </div>
    </div>
  )
}
