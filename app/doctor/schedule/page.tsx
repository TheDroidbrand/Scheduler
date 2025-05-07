"use client"

import { useState } from "react"
import { format, startOfWeek, addDays } from "date-fns"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
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
import { DoctorSidebar } from "../components/doctor-sidebar"

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

// Time options for the form
const timeOptions = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
]

export default function DoctorSchedulePage() {
  const [isAddTimeSlotOpen, setIsAddTimeSlotOpen] = useState(false)
  const [newTimeSlot, setNewTimeSlot] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    status: "available",
  })

  const today = new Date()
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(today, { weekStartsOn: 1 }))
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))

  const handleAddTimeSlot = () => {
    console.log("New time slot:", newTimeSlot)
    setIsAddTimeSlotOpen(false)
    // Here you would typically add the new time slot to your state or send it to an API
  }

  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7))
  }

  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7))
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DoctorSidebar />

      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Schedule</h1>
              <p className="text-gray-600">Manage your availability for appointments</p>
            </div>

            <div className="flex items-center mt-4 md:mt-0">
              <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="mx-4 text-sm font-medium">
                {format(weekDays[0], "MMM d")} - {format(weekDays[6], "MMM d, yyyy")}
              </div>
              <Button variant="outline" size="icon" onClick={goToNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Weekly Schedule */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>Your availability for the week</CardDescription>
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
                        <Select
                          value={newTimeSlot.startTime}
                          onValueChange={(value) => setNewTimeSlot({ ...newTimeSlot, startTime: value })}
                        >
                          <SelectTrigger id="startTime">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="endTime">End Time</Label>
                        <Select
                          value={newTimeSlot.endTime}
                          onValueChange={(value) => setNewTimeSlot({ ...newTimeSlot, endTime: value })}
                        >
                          <SelectTrigger id="endTime">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newTimeSlot.status}
                        onValueChange={(value) => setNewTimeSlot({ ...newTimeSlot, status: value })}
                      >
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
                        <div key={dayIndex} className="min-h-[300px] border rounded-md p-2">
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
                                <div className="mt-2 flex justify-end">
                                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                    Edit
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-red-600">
                                    Delete
                                  </Button>
                                </div>
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

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-teal-50 border border-teal-200 rounded-sm mr-2"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded-sm mr-2"></div>
              <span className="text-sm">Unavailable</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-50 border border-yellow-200 rounded-sm mr-2"></div>
              <span className="text-sm">Tentative</span>
            </div>
          </div>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule Management Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Block out time for lunch and administrative tasks</li>
                <li>Consider setting aside specific days for certain types of appointments</li>
                <li>Leave buffer time between appointments when possible</li>
                <li>Update your availability regularly to ensure patients can book appointments</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
