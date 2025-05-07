"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { format, addDays } from "date-fns"
import { CalendarIcon, Clock, MapPin, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { StarRating } from "../../dashboard/components/star-rating"

// Sample doctor data
const doctorData = {
  id: "dr-sarah-johnson",
  name: "Dr. Sarah Jay",
  specialization: "Cardiologist",
  image: "/placeholder.svg?height=200&width=200",
  rating: 4.8,
  reviews: 124,
  location: "Main Hospital, Suite 302",
  about:
    "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience. She specializes in preventive cardiology, heart disease management, and cardiac rehabilitation.",
}

// Generate sample time slots
const generateTimeSlots = (date: Date) => {
  // Simulate loading delay
  return new Promise<Array<{ id: string; time: string; available: boolean }>>((resolve) => {
    setTimeout(() => {
      // Generate different slots based on the day of week
      const dayOfWeek = date.getDay()

      // Weekend has fewer slots
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        resolve([
          { id: "1", time: "10:00 AM", available: true },
          { id: "2", time: "11:00 AM", available: true },
          { id: "3", time: "12:00 PM", available: false },
        ])
      } else {
        resolve([
          { id: "1", time: "09:00 AM", available: true },
          { id: "2", time: "10:00 AM", available: true },
          { id: "3", time: "11:00 AM", available: false },
          { id: "4", time: "01:00 PM", available: true },
          { id: "5", time: "02:00 PM", available: true },
          { id: "6", time: "03:00 PM", available: false },
          { id: "7", time: "04:00 PM", available: true },
        ])
      }
    }, 1000) // 1 second delay to simulate loading
  })
}

export default function BookingPage({ params }: { params: { doctorId: string } }) {
  const router = useRouter()
  const [date, setDate] = useState<Date>(new Date())
  const [timeSlots, setTimeSlots] = useState<Array<{ id: string; time: string; available: boolean }>>([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: "",
  })

  // Handle date change
  const handleDateChange = async (newDate: Date | undefined) => {
    if (!newDate) return

    setDate(newDate)
    setSelectedTimeSlot(null)
    setLoadingTimeSlots(true)

    try {
      const slots = await generateTimeSlots(newDate)
      setTimeSlots(slots)
    } catch (error) {
      console.error("Error loading time slots:", error)
    } finally {
      setLoadingTimeSlots(false)
    }
  }

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedTimeSlot) {
      alert("Please select a time slot")
      return
    }

    setSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Booking submitted:", {
        doctorId: params.doctorId,
        date: format(date, "yyyy-MM-dd"),
        timeSlot: selectedTimeSlot,
        patient: formData,
      })

      setSubmitting(false)

      // Redirect to confirmation page
      router.push("/booking/confirmation")
    }, 1500)
  }

  // Load initial time slots
  useState(() => {
    handleDateChange(date)
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl py-8">
        {/* Back button */}
        <Button variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to doctors
        </Button>

        {/* Doctor Profile Card */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="relative h-48 w-full md:h-auto md:w-48 shrink-0">
                <Image
                  src={doctorData.image || "/placeholder.svg"}
                  alt={doctorData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">{doctorData.name}</h1>
                <p className="text-gray-600">{doctorData.specialization}</p>

                <div className="mt-2 flex items-center">
                  <StarRating rating={doctorData.rating} />
                  <span className="ml-2 text-sm text-gray-600">
                    {doctorData.rating} ({doctorData.reviews} reviews)
                  </span>
                </div>

                <div className="mt-2 flex items-center text-gray-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span className="text-sm">{doctorData.location}</span>
                </div>

                <p className="mt-4 text-sm text-gray-700">{doctorData.about}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Date Selection */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select Date</h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  initialFocus
                  disabled={(date) => {
                    // Disable past dates and dates more than 30 days in the future
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    const thirtyDaysFromNow = addDays(today, 30)
                    return date < today || date > thirtyDaysFromNow
                  }}
                />
              </PopoverContent>
            </Popover>

            {/* Time Slots */}
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Available Times</h2>

              {loadingTimeSlots ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 bg-gray-200 animate-pulse rounded-md"></div>
                  ))}
                </div>
              ) : timeSlots.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={selectedTimeSlot === slot.id ? "default" : "outline"}
                      className={cn(
                        "justify-start",
                        selectedTimeSlot === slot.id ? "bg-teal-600 hover:bg-teal-700" : "",
                        !slot.available && "opacity-50 cursor-not-allowed",
                      )}
                      disabled={!slot.available}
                      onClick={() => setSelectedTimeSlot(slot.id)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {slot.time}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No available slots for this date</p>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Your Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Please briefly describe your symptoms or reason for the appointment"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  disabled={!selectedTimeSlot || submitting}
                >
                  {submitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    "Confirm Appointment"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Booking Information */}
        <div className="mt-8 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
          <h3 className="font-medium">Booking Information</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Appointments can be canceled up to 24 hours before the scheduled time.</li>
            <li>Please arrive 15 minutes before your appointment time.</li>
            <li>Bring your insurance card and ID to your appointment.</li>
            <li>Masks are required in all clinical areas.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
