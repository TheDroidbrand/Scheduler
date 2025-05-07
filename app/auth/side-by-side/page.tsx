"use client"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SideBySideAuthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-5xl space-y-8">
        {/* Logo and Title */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-8 w-8 text-teal-600" />
            <span className="text-2xl font-bold text-teal-700">MediSchedule</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Welcome to MediSchedule</h1>
          <p className="text-gray-500 mt-2">Your healthcare scheduling solution</p>
        </div>

        {/* Side by Side Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Login Card */}
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-role">I am a</Label>
                <RadioGroup defaultValue="patient" id="login-role" className="flex space-x-4">
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
                <Input id="login-email" type="email" placeholder="your.email@example.com" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-teal-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="login-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-teal-600 hover:bg-teal-700" asChild>
                <Link href="/doctor/dashboard">Login</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Signup Card */}
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>Enter your information to create your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-role">I am a</Label>
                <RadioGroup defaultValue="patient" id="signup-role" className="flex space-x-4">
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
                  <Input id="signup-first-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-last-name">Last Name</Label>
                  <Input id="signup-last-name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="your.email@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <Input id="signup-confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-teal-600 hover:bg-teal-700" asChild>
                <Link href="/doctor/dashboard">Create Account</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

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
