"use client"

import Link from "next/link"
import { Calendar, Home, LogOut, User, FileText, MessageSquare, Bell, Settings, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function DoctorSidebar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  const getInitials = () => {
    if (!user) return "U"
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar className="border-r border-gray-200">
        <SidebarHeader className="border-b border-gray-200 px-6 py-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">MediSchedule</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <div className="px-6 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border border-gray-200">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user?.firstName || "User"} />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user ? `${user.firstName} ${user.lastName}` : "User"}</p>
                <p className="text-xs text-gray-500">Doctor</p>
              </div>
            </div>
          </div>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <Link href="/doctor/dashboard">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/doctor/schedule">
                  <Calendar className="h-4 w-4" />
                  <span>My Schedule</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/doctor/appointments">
                  <Users className="h-4 w-4" />
                  <span>Appointments</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/doctor/patients">
                  <User className="h-4 w-4" />
                  <span>My Patients</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/doctor/messages">
                  <MessageSquare className="h-4 w-4" />
                  <span>Messages</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/doctor/records">
                  <FileText className="h-4 w-4" />
                  <span>Medical Records</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/doctor/notifications">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/doctor/settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t border-gray-200 p-4">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </SidebarFooter>

        <SidebarTrigger className="absolute right-0 top-3 translate-x-1/2" />
      </Sidebar>
    </SidebarProvider>
  )
}
