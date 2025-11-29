"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Clock, User } from "lucide-react"

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (doctorId: string, dateTime: string, consultationType: string) => void
  isLoading?: boolean
}

export function AppointmentModal({ isOpen, onClose, onConfirm, isLoading }: AppointmentModalProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [consultationType, setConsultationType] = useState<"video" | "in-person">("video")

  // Sample doctors data
  const doctors = [
    { id: "doc-001", name: "Dr. Sarah Smith", specialization: "General Physician" },
    { id: "doc-002", name: "Dr. Rajesh Kumar", specialization: "Internal Medicine" },
    { id: "doc-003", name: "Dr. Anjali Mehta", specialization: "Cardiology" },
  ]

  const handleSubmit = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert("Please fill all fields")
      return
    }

    const dateTime = `${selectedDate}T${selectedTime}`
    onConfirm(selectedDoctor, dateTime, consultationType)
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Book Appointment</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Selection */}
        <div>
          <label className="block text-sm font-semibold mb-3">Select Doctor</label>
          <div className="space-y-2">
            {doctors.map((doctor) => (
              <button
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor.id)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  selectedDoctor === doctor.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <div>
                    <p className="font-semibold">{doctor.name}</p>
                    <p className="text-xs text-gray-600">{doctor.specialization}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-sm font-semibold mb-2">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Select Time
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a time</option>
            {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Consultation Type */}
        <div>
          <label className="block text-sm font-semibold mb-3">Consultation Type</label>
          <div className="flex gap-3">
            {["video", "in-person"].map((type) => (
              <button
                key={type}
                onClick={() => setConsultationType(type as "video" | "in-person")}
                className={`flex-1 py-2 rounded-lg border-2 font-semibold transition-all capitalize ${
                  consultationType === type
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {type === "video" ? "📹 Video" : "🏥 In-Person"}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading} className="flex-1">
            {isLoading ? "Booking..." : "Confirm Booking"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
