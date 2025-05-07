"use client"

import { useState } from "react"
import { format, startOfWeek, addDays, parse } from "date-fns"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DoctorSidebar } from "../components/doctor-sidebar"
import Link from "next/link"

// Sample data for appointments
const appointments = [
  {
    id: 1,
    patientName: "Jessica Brown",
    date: "2023-05-06",
    time: "09:00 AM",
    duration: "30 min",
    reason: "Annual checkup",
    status: "Confirmed",
  },
  {
    id: 2,
    patientName: "Michael Johnson",
    date: "2023-05-06",
    time: "10:30 AM",
    duration: "45 min",
    reason: "Follow-up consultation",
    status: "Confirmed",
  },
  {
    id: 3,
    patientName: "Sarah Williams",
    date: "2023-05-06",
    time: "01:15 PM",
    duration: "30 min",
    reason: "Prescription renewal",
    status: "Confirmed",
  },
  {
    id: 4,
    patientName: "David Miller",
    date: "2023-05-07",
    time: "11:00 AM",
    duration: "60 min",
    reason: "New patient consultation",
    status: "Pending",
  },
  {
    id: 5,
    patientName: "Emily Davis",
    date: "2023-05-07",
    time: "02:30 PM",
    duration: "30 min",
    reason: "Test results review",
    status: "Confirmed",
  },
]

// Sample data for schedule
const generateTimeSlots = () => {
  const today = new Date()
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }) // Start from Monday

  const slots = []

  // Generate some sample time slots for the week
  for (let day = 0; day < 5; day++) {
    // Monday to Friday
    const currentDay = addDays(startOfCurrentWeek, day)

    // Morning slots
    slots.push({
      id: slots.length + 1,
      date: format(currentDay, "yyyy-MM-dd"),
      startTime: "09:00 AM",
      endTime: "12:00 PM",
      status: "Available",
    })

    // Afternoon slots
    slots.push({
      id: slots.length + 1,
      date: format(currentDay, "yyyy-MM-dd"),
      startTime: "01:00 PM",
      endTime: "05:00 PM",
      status: "Available",
    })
  }

  return slots
}

const timeSlots = generateTimeSlots()

export default function DoctorDashboard() {
  const [isAddTimeSlotOpen, setIsAddTimeSlotOpen] = useState(false)
  const [newTimeSlot, setNewTimeSlot] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "17:00",
  })

  const today = new Date()
  const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))

  const handleAddTimeSlot = () => {
    console.log("New time slot:", newTimeSlot)
    setIsAddTimeSlotOpen(false)
    // Here you would typically add the new time slot to your state or send it to an API
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DoctorSidebar />

      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, Dr. Johnson!</h1>
            <p className="text-gray-600">Today is {format(today, "EEEE, MMMM d, yyyy")}</p>
          </div>

          {/* Weekly Schedule Section */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Weekly Schedule</CardTitle>
                <CardDescription>Manage your availability for appointments</CardDescription>
              </div>
              <Dialog open={isAddTimeSlotOpen} onOpenChange={setIsAddTimeSlotOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Time Slot
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Time Slot</DialogTitle>
                    <DialogDescription>Set your availability for patient appointments.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newTimeSlot.date}
                        onChange={(e) => setNewTimeSlot({ ...newTimeSlot, date: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={newTimeSlot.startTime}
                          onChange={(e) => setNewTimeSlot({ ...newTimeSlot, startTime: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="endTime">End Time</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={newTimeSlot.endTime}
                          onChange={(e) => setNewTimeSlot({ ...newTimeSlot, endTime: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select defaultValue="available">
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="unavailable">Unavailable</SelectItem>
                          <SelectItem value="tentative">Tentative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddTimeSlotOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleAddTimeSlot}>
                      Add Slot
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Week days header */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {weekDays.map((day, index) => (
                      <div
                        key={index}
                        className={`text-center p-2 font-medium rounded-md ${
                          format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
                            ? "bg-teal-100 text-teal-800"
                            : "bg-gray-100"
                        }`}
                      >
                        <div>{format(day, "EEE")}</div>
                        <div className="text-sm">{format(day, "MMM d")}</div>
                      </div>
                    ))}
                  </div>

                  {/* Time slots grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {weekDays.map((day, dayIndex) => {
                      const dayFormatted = format(day, "yyyy-MM-dd")
                      const daySlotsFiltered = timeSlots.filter((slot) => slot.date === dayFormatted)

                      return (
                        <div key={dayIndex} className="min-h-[200px] border rounded-md p-2">
                          {daySlotsFiltered.length > 0 ? (
                            daySlotsFiltered.map((slot) => (
                              <div
                                key={slot.id}
                                className="mb-2 p-2 bg-teal-50 border border-teal-200 rounded-md text-sm"
                              >
                                <div className="font-medium text-teal-700">
                                  {slot.startTime} - {slot.endTime}
                                </div>
                                <div className="text-xs text-gray-500">{slot.status}</div>
                              </div>
                            ))
                          ) : (
                            <div className="flex h-full items-center justify-center text-sm text-gray-400">
                              No slots
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments Section */}
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
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.patientName}</TableCell>
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
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
