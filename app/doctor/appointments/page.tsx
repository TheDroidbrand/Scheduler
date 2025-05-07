"use client"

import { useState } from "react"
import { format, parse } from "date-fns"
import { Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DoctorSidebar } from "../components/doctor-sidebar"
import Link from "next/link"

// Sample data for appointments
const appointments = [
  {
    id: 1,
    patientName: "Anu Oloride",
    patientId: "P-1001",
    date: "2023-05-06",
    time: "09:00 AM",
    duration: "30 min",
    reason: "Annual checkup",
    status: "Confirmed",
  },
  {
    id: 2,
    patientName: "Michael Kanu",
    patientId: "P-1002",
    date: "2023-05-06",
    time: "10:30 AM",
    duration: "45 min",
    reason: "Follow-up consultation",
    status: "Confirmed",
  },
  {
    id: 3,
    patientName: "Sarah Aliyu",
    patientId: "P-1003",
    date: "2023-05-06",
    time: "01:15 PM",
    duration: "30 min",
    reason: "Prescription renewal",
    status: "Confirmed",
  },
  {
    id: 4,
    patientName: "David Chidebere",
    patientId: "P-1004",
    date: "2023-05-07",
    time: "11:00 AM",
    duration: "60 min",
    reason: "New patient consultation",
    status: "Pending",
  },
  {
    id: 5,
    patientName: "Emily Arinze",
    patientId: "P-1005",
    date: "2023-05-07",
    time: "02:30 PM",
    duration: "30 min",
    reason: "Test results review",
    status: "Confirmed",
  },
  {
    id: 6,
    patientName: "Robert Kiyosaki",
    patientId: "P-1006",
    date: "2023-05-08",
    time: "09:30 AM",
    duration: "45 min",
    reason: "Follow-up consultation",
    status: "Confirmed",
  },
  {
    id: 7,
    patientName: "Jennifer Achebe",
    patientId: "P-1007",
    date: "2023-05-08",
    time: "11:15 AM",
    duration: "30 min",
    reason: "Prescription renewal",
    status: "Confirmed",
  },
  {
    id: 8,
    patientName: "Thomas Madueke",
    patientId: "P-1008",
    date: "2023-05-09",
    time: "10:00 AM",
    duration: "60 min",
    reason: "Annual physical",
    status: "Pending",
  },
]

// Past appointments
const pastAppointments = [
  {
    id: 101,
    patientName: "Anu Oloride",
    patientId: "P-1001",
    date: "2023-04-28",
    time: "10:00 AM",
    duration: "30 min",
    reason: "Follow-up consultation",
    status: "Completed",
    notes: "Patient reported improvement in symptoms. Continue current medication.",
  },
  {
    id: 102,
    patientName: "Michael Kanu",
    patientId: "P-1002",
    date: "2023-04-27",
    time: "02:30 PM",
    duration: "45 min",
    reason: "Test results review",
    status: "Completed",
    notes: "Discussed test results. All values within normal range.",
  },
  {
    id: 103,
    patientName: "Sarah Aliyu",
    patientId: "P-1003",
    date: "2023-04-25",
    time: "11:15 AM",
    duration: "30 min",
    reason: "Prescription renewal",
    status: "Completed",
    notes: "Renewed prescription for 3 months.",
  },
  {
    id: 104,
    patientName: "David Chidebere",
    patientId: "P-1004",
    date: "2023-04-20",
    time: "09:30 AM",
    duration: "60 min",
    reason: "Initial consultation",
    status: "Completed",
    notes: "New patient intake. Ordered basic lab work.",
  },
]

export default function DoctorAppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter appointments based on search term and status
  const filteredUpcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || appointment.status.toLowerCase() === statusFilter.toLowerCase()),
  )

  const filteredPastAppointments = pastAppointments.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DoctorSidebar />

      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
            <p className="text-gray-600">Manage your patient appointments</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search patients..."
                className="pl-10 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Appointments Tabs */}
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            {/* Upcoming Appointments */}
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled appointments with patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUpcomingAppointments.length > 0 ? (
                          filteredUpcomingAppointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{appointment.patientName}</div>
                                  <div className="text-xs text-gray-500">{appointment.patientId}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {format(parse(appointment.date, "yyyy-MM-dd", new Date()), "MMM d, yyyy")}
                              </TableCell>
                              <TableCell>{appointment.time}</TableCell>
                              <TableCell>{appointment.duration}</TableCell>
                              <TableCell>{appointment.reason}</TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                    appointment.status === "Confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {appointment.status}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/doctor/appointments/${appointment.id}`}>View</Link>
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                                    Cancel
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                              No appointments found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Past Appointments */}
            <TabsContent value="past">
              <Card>
                <CardHeader>
                  <CardTitle>Past Appointments</CardTitle>
                  <CardDescription>Your completed appointments with patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPastAppointments.length > 0 ? (
                          filteredPastAppointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{appointment.patientName}</div>
                                  <div className="text-xs text-gray-500">{appointment.patientId}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {format(parse(appointment.date, "yyyy-MM-dd", new Date()), "MMM d, yyyy")}
                              </TableCell>
                              <TableCell>{appointment.time}</TableCell>
                              <TableCell>{appointment.reason}</TableCell>
                              <TableCell className="max-w-xs truncate">{appointment.notes}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/doctor/appointments/${appointment.id}`}>View</Link>
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    Edit Notes
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                              No past appointments found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
