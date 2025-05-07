"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PatientSidebar } from "./components/patient-sidebar"
import { StarRating } from "./components/star-rating"
import Link from "next/link"

// Sample data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    rating: 4.8,
    reviews: 124,
    availability: "Available Today",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Dermatologist",
    rating: 4.7,
    reviews: 98,
    availability: "Next Available: Tomorrow",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Pediatrician",
    rating: 4.9,
    reviews: 156,
    availability: "Available Today",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialization: "Orthopedic Surgeon",
    rating: 4.6,
    reviews: 87,
    availability: "Next Available: Friday",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Dr. Olivia Thompson",
    specialization: "Neurologist",
    rating: 4.9,
    reviews: 112,
    availability: "Available Today",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialization: "Family Medicine",
    rating: 4.7,
    reviews: 143,
    availability: "Next Available: Tomorrow",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function PatientDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientSidebar />

      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, Jessica!</h1>
            <p className="text-gray-600">Find and book your next appointment</p>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search doctors by name or specialization..."
                className="pl-10 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Doctors List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden border border-gray-200">
                        <Image
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{doctor.name}</h3>
                        <p className="text-sm text-gray-500">{doctor.specialization}</p>
                        <div className="flex items-center mt-1">
                          <StarRating rating={doctor.rating} />
                          <span className="text-sm text-gray-500 ml-2">
                            {doctor.rating} ({doctor.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <Badge
                        variant={doctor.availability.includes("Available Today") ? "success" : "outline"}
                        className={
                          doctor.availability.includes("Available Today")
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {doctor.availability}
                      </Badge>
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white" asChild>
                        <Link href={`/booking/${doctor.id}`}>Book Appointment</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No doctors found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
