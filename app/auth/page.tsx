"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Calendar, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { useEffect } from "react"

export default function AuthPage() {
  const { user, login, signup, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || ""

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    role: "patient" as UserRole,
  })

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient" as UserRole,
  })

  // Form errors
  const [errors, setErrors] = useState({
    login: "",
    signup: "",
  })

  // Check if user is already authenticated
  useEffect(() => {
    if (user) {
      const redirectPath = user.role === "doctor" ? "/doctor/dashboard" : "/dashboard"
      router.push(callbackUrl || redirectPath)
    }
  }, [user, router, callbackUrl])

  // Handle login form changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle signup form changes
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignupForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors((prev) => ({ ...prev, login: "" }))

    if (!loginForm.email || !loginForm.password) {
      setErrors((prev) => ({ ...prev, login: "Please fill in all fields" }))
      return
    }

    try {
      const success = await login(loginForm.email, loginForm.password, loginForm.role)

      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to MediSchedule!",
        })

        // Redirect to appropriate dashboard
        const redirectPath = loginForm.role === "doctor" ? "/doctor/dashboard" : "/dashboard"
        router.push(callbackUrl || redirectPath)
      } else {
        setErrors((prev) => ({ ...prev, login: "Invalid email or password" }))
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, login: "An error occurred. Please try again." }))
    }
  }

  // Handle signup submission
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors((prev) => ({ ...prev, signup: "" }))

    // Validate form
    if (
      !signupForm.firstName ||
      !signupForm.lastName ||
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.confirmPassword
    ) {
      setErrors((prev) => ({ ...prev, signup: "Please fill in all fields" }))
      return
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setErrors((prev) => ({ ...prev, signup: "Passwords do not match" }))
      return
    }

    if (signupForm.password.length < 8) {
      setErrors((prev) => ({ ...prev, signup: "Password must be at least 8 characters" }))
      return
    }

    try {
      const success = await signup({
        firstName: signupForm.firstName,
        lastName: signupForm.lastName,
        email: signupForm.email,
        password: signupForm.password,
        role: signupForm.role,
      })

      if (success) {
        toast({
          title: "Account created",
          description: "Welcome to MediSchedule!",
        })

        // Redirect to appropriate dashboard
        const redirectPath = signupForm.role === "doctor" ? "/doctor/dashboard" : "/dashboard"
        router.push(callbackUrl || redirectPath)
      } else {
        setErrors((prev) => ({ ...prev, signup: "Failed to create account. Please try again." }))
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, signup: "An error occurred. Please try again." }))
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-8 w-8 text-teal-600" />
            <span className="text-2xl font-bold text-teal-700">MediSchedule</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Welcome to MediSchedule</h1>
          <p className="text-gray-500 mt-2">Your healthcare scheduling solution</p>
        </div>

        {/* Auth Tabs */}
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login">
            <Card>
              <form onSubmit={handleLoginSubmit}>
                <CardHeader>
                  <CardTitle>Login to your account</CardTitle>
                  <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {errors.login && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{errors.login}</div>}

                  <div className="space-y-2">
                    <Label htmlFor="login-role">I am a</Label>
                    <RadioGroup
                      value={loginForm.role}
                      onValueChange={(value: UserRole) => setLoginForm((prev) => ({ ...prev, role: value }))}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="patient" id="login-patient" />
                        <Label htmlFor="login-patient">Patient</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="doctor" id="login-doctor" />
                        <Label htmlFor="login-doctor">Doctor</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-teal-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Signup Form */}
          <TabsContent value="signup">
            <Card>
              <form onSubmit={handleSignupSubmit}>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Enter your information to create your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {errors.signup && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{errors.signup}</div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="signup-role">I am a</Label>
                    <RadioGroup
                      value={signupForm.role}
                      onValueChange={(value: UserRole) => setSignupForm((prev) => ({ ...prev, role: value }))}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="patient" id="signup-patient" />
                        <Label htmlFor="signup-patient">Patient</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="doctor" id="signup-doctor" />
                        <Label htmlFor="signup-doctor">Doctor</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-first-name">First Name</Label>
                      <Input
                        id="signup-first-name"
                        name="firstName"
                        value={signupForm.firstName}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-last-name">Last Name</Label>
                      <Input
                        id="signup-last-name"
                        name="lastName"
                        value={signupForm.lastName}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={signupForm.email}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      value={signupForm.password}
                      onChange={handleSignupChange}
                      required
                    />
                    <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={signupForm.confirmPassword}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-500">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-teal-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-teal-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  )
}
