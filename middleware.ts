import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.has("medischedule_auth")

  // Define protected routes
  const patientRoutes = ["/dashboard"]
  const doctorRoutes = ["/doctor"]
  const authRoutes = ["/auth"]

  // Check if the current path is a protected route
  const isPatientRoute = patientRoutes.some((route) => pathname.startsWith(route))
  const isDoctorRoute = doctorRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Get user role from cookie if available
  const userRole = request.cookies.get("medischedule_role")?.value

  // Redirect logic
  if (!isAuthenticated && (isPatientRoute || isDoctorRoute)) {
    // Redirect to auth page if trying to access protected routes without authentication
    const url = new URL("/auth", request.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthenticated && isAuthRoute) {
    // Redirect to appropriate dashboard if already authenticated
    const redirectUrl = userRole === "doctor" ? "/doctor/dashboard" : "/dashboard"
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  if (isAuthenticated && isDoctorRoute && userRole !== "doctor") {
    // Redirect to patient dashboard if a patient tries to access doctor routes
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (isAuthenticated && isPatientRoute && userRole !== "patient") {
    // Redirect to doctor dashboard if a doctor tries to access patient routes
    return NextResponse.redirect(new URL("/doctor/dashboard", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
