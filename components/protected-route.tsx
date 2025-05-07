"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !user) {
      // Store the attempted URL to redirect back after login
      sessionStorage.setItem("redirectAfterLogin", pathname)
      router.push("/auth")
    } else if (!isLoading && user && allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard if user doesn't have the required role
      router.push(user.role === "patient" ? "/dashboard" : "/doctor/dashboard")
    }
  }, [user, isLoading, router, pathname, allowedRoles])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        <span className="ml-2 text-lg text-gray-700">Loading...</span>
      </div>
    )
  }

  if (!user) {
    return null // Don't render children if not authenticated
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null // Don't render children if user doesn't have the required role
  }

  return <>{children}</>
}
