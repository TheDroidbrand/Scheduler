"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Define user types
export type UserRole = "patient" | "doctor"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
}

// Define auth context type
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  signup: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>
  logout: () => void
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Sample user data for demo purposes
const SAMPLE_USERS = {
  patient: {
    id: "p1",
    email: "patient@example.com",
    firstName: "Jessica",
    lastName: "Brown",
    role: "patient" as UserRole,
  },
  doctor: {
    id: "d1",
    email: "doctor@example.com",
    firstName: "Sarah",
    lastName: "Johnson",
    role: "doctor" as UserRole,
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("medischedule_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("medischedule_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll use sample users
      // In a real app, this would be an API call to validate credentials
      let loggedInUser: User | null = null

      if (role === "patient" && email.includes("patient")) {
        loggedInUser = SAMPLE_USERS.patient
      } else if (role === "doctor" && email.includes("doctor")) {
        loggedInUser = SAMPLE_USERS.doctor
      }

      if (loggedInUser) {
        setUser(loggedInUser)
        localStorage.setItem("medischedule_user", JSON.stringify(loggedInUser))
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Signup function
  const signup = async (userData: Omit<User, "id"> & { password: string }): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll create a new user with a random ID
      // In a real app, this would be an API call to create a user
      const newUser: User = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
      }

      setUser(newUser)
      localStorage.setItem("medischedule_user", JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("medischedule_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
