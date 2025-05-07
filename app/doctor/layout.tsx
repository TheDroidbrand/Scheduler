import type React from "react"
import { ProtectedRoute } from "@/components/protected-route"

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedRoute allowedRoles={["doctor"]}>{children}</ProtectedRoute>
}
