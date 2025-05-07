"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Check, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

export default function ValidationAuthPage() {
  // State for form values and validation
  const [loginForm, setLoginForm] = useState({ email: "", password: "", role: "patient" })
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const router = useRouter()

  // Password validation
  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters"
    }
    return ""
  }

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address"
    }
    return ""
  }

  // Handle signup form changes
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignupForm((prev) => ({ ...prev, [name]: value }))

    // Validate on change
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }))
    } else if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value),
        confirmPassword: value !== signupForm.confirmPassword ? "Passwords do not match" : "",
      }))
    } else if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value !== signupForm.password ? "Passwords do not match" : "",
      }))
    }
  }

  // Handle login form changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your login logic here
    console.log("Login submitted:", loginForm)

    // Redirect to dashboard
    router.push("/dashboard")
  }

  // Handle signup submission
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields before submission
    const emailError = validateEmail(signupForm.email)
    const passwordError = validatePassword(signupForm.password)
    const confirmPasswordError = signupForm.password !== signupForm.confirmPassword ? "Passwords do not match" : ""

    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    })

    // If no errors, proceed with signup
    if (!emailError && !passwordError && !confirmPasswordError) {
      // Add your signup logic here
      console.log("Signup submitted:", signupForm)

      // Redirect to dashboard
      router.push("/dashboard")
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
                  <div className="space-y-2">
                    <Label htmlFor="login-role">I am a</Label>
                    <RadioGroup
                      defaultValue={loginForm.role}
                      onValueChange={(value) => setLoginForm((prev) => ({ ...prev, role: value }))}
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
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      placeholder="your.email@example.com"
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
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                    Login
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
                  <div className="space-y-2">
                    <Label htmlFor="signup-role">I am a</Label>
                    <RadioGroup
                      defaultValue={signupForm.role}
                      onValueChange={(value) => setSignupForm((prev) => ({ ...prev, role: value }))}
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
                      value={signupForm.email}
                      onChange={handleSignupChange}
                      placeholder="your.email@example.com"
                      className={errors.email ? "border-red-500" : ""}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <X className="h-3 w-3 mr-1" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      value={signupForm.password}
                      onChange={handleSignupChange}
                      className={errors.password ? "border-red-500" : ""}
                      required
                    />
                    {errors.password ? (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <X className="h-3 w-3 mr-1" /> {errors.password}
                      </p>
                    ) : (
                      signupForm.password.length > 0 && (
                        <p className="text-green-500 text-xs mt-1 flex items-center">
                          <Check className="h-3 w-3 mr-1" /> Password meets requirements
                        </p>
                      )
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={signupForm.confirmPassword}
                      onChange={handleSignupChange}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                      required
                    />
                    {errors.confirmPassword ? (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <X className="h-3 w-3 mr-1" /> {errors.confirmPassword}
                      </p>
                    ) : (
                      signupForm.confirmPassword.length > 0 && (
                        <p className="text-green-500 text-xs mt-1 flex items-center">
                          <Check className="h-3 w-3 mr-1" /> Passwords match
                        </p>
                      )
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                    Create Account
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
