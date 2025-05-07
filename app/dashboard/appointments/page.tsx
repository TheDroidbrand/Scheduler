import { Calendar, Clock } from "lucide-react"
import { PatientSidebar } from "../components/patient-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Sample data for appointments
const upcomingAppointments = [
  {
    id: 1,
    doctorName: "Dr. John Doe",
    specialization: "Cardiologist",
    date: "May 10, 2023",
    time: "10:00 AM",
    location: "Main Hospital, Room 302",
    status: "Confirmed",
  },
  {
    id: 2,
    doctorName: "Dr. Michael Davido",
    specialization: "Dermatologist",
    date: "May 15, 2023",
    time: "2:30 PM",
    location: "Dermatology Clinic, Suite 5",
    status: "Pending",
  },
]

const pastAppointments = [
  {
    id: 3,
    doctorName: "Dr. Emma Adeojo",
    specialization: "Pediatrician",
    date: "April 28, 2023",
    time: "9:15 AM",
    location: "Children's Medical Center",
    status: "Completed",
  },
  {
    id: 4,
    doctorName: "Dr. James Kanu",
    specialization: "Orthopedic Surgeon",
    date: "April 15, 2023",
    time: "11:45 AM",
    location: "Orthopedic Specialists, Room 110",
    status: "Completed",
  },
  {
    id: 5,
    doctorName: "Dr. Sarah Jay",
    specialization: "Cardiologist",
    date: "March 22, 2023",
    time: "3:00 PM",
    location: "Main Hospital, Room 302",
    status: "Completed",
  },
]

export default function AppointmentsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientSidebar />

      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h1>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} isPast={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">No upcoming appointments</h3>
                  <p className="mt-2 text-gray-500">Schedule your next appointment with a doctor</p>
                  <Button className="mt-4 bg-teal-600 hover:bg-teal-700" asChild>
                    <Link href="/dashboard">Find a Doctor</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {pastAppointments.length > 0 ? (
                <div className="space-y-4">
                  {pastAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} isPast={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">No past appointments</h3>
                  <p className="mt-2 text-gray-500">Your appointment history will appear here</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function AppointmentCard({ appointment, isPast }: { appointment: any; isPast: boolean }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-gray-900">{appointment.doctorName}</h3>
              <p className="text-sm text-gray-500">{appointment.specialization}</p>

              <div className="flex items-center mt-2">
                <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-600 mr-3">{appointment.date}</span>
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-600">{appointment.time}</span>
              </div>

              <p className="text-sm text-gray-600 mt-1">{appointment.location}</p>
            </div>

            <div className="flex flex-col sm:items-end gap-2">
              <div
                className={`text-sm font-medium px-2 py-1 rounded-full inline-flex ${
                  appointment.status === "Confirmed"
                    ? "bg-green-100 text-green-800"
                    : appointment.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {appointment.status}
              </div>

              {!isPast && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    Cancel
                  </Button>
                </div>
              )}

              {isPast && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    Book Again
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
