"use client"

import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Calendar, CheckCircle2, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// This would typically come from your booking process or API
// For this example, we'll use static data
const appointmentDetails = {
  doctor: {
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
  },
  appointment: {
    date: new Date("2023-05-15"),
    time: "10:00 AM",
    duration: "30 minutes",
    location: "Main Hospital, Suite 302",
    confirmationCode: "APT-12345",
  },
  patient: {
    name: "Jessica Brown",
  },
}

export default function ConfirmationPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Success Icon and Message */}
        <div className="mb-8">
          <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Appointment Booked Successfully!</h1>
          <p className="text-gray-600 mt-2">
            Your appointment has been confirmed. We've sent the details to your email.
          </p>
        </div>

        {/* Appointment Details Card */}
        <Card className="mb-8 text-left">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-gray-900">{appointmentDetails.doctor.name}</h2>
                <p className="text-gray-600">{appointmentDetails.doctor.specialization}</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-teal-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-gray-600">{format(appointmentDetails.appointment.date, "EEEE, MMMM d, yyyy")}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-teal-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-gray-600">
                      {appointmentDetails.appointment.time} ({appointmentDetails.appointment.duration})
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-teal-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{appointmentDetails.appointment.location}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-gray-500">Confirmation Code</p>
                <p className="font-mono font-medium">{appointmentDetails.appointment.confirmationCode}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What to Bring Section */}
        <div className="mb-8 bg-blue-50 rounded-lg p-4 text-left">
          <h3 className="font-medium text-blue-800 mb-2">What to Bring</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc pl-5">
            <li>Photo ID</li>
            <li>Insurance card</li>
            <li>List of current medications</li>
            <li>Any relevant medical records</li>
          </ul>
        </div>

        {/* Return to Dashboard Button */}
        <Button
          onClick={() => router.push("/dashboard")}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md"
        >
          Return to Dashboard
        </Button>

        {/* Add to Calendar Options */}
        <div className="mt-4 flex justify-center space-x-4">
          <Button variant="outline" size="sm" className="text-xs">
            Add to Google Calendar
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Add to Apple Calendar
          </Button>
        </div>
      </div>
    </div>
  )
}
