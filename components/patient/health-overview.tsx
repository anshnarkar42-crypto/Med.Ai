"use client"

import { Heart, Calendar, FileText, AlertCircle } from "lucide-react"
import { dummyAppointments, dummyMedicalRecords } from "@/lib/dummy-data"

export function HealthOverview() {
  const upcomingAppointment = dummyAppointments.find((a) => a.status === "scheduled")
  const medicalRecordsCount = dummyMedicalRecords.length

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {/* Health Status Card */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">Health Status</p>
          <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
            <Heart className="w-5 h-5 text-success" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">Good</p>
        <p className="text-xs text-muted-foreground mt-1">All vitals normal</p>
      </div>

      {/* Upcoming Appointment */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">Next Appointment</p>
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">Dec 5</p>
        <p className="text-xs text-muted-foreground mt-1">2:00 PM with Dr. Smith</p>
      </div>

      {/* Medical Records */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">Medical Records</p>
          <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-secondary" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">{medicalRecordsCount}</p>
        <p className="text-xs text-muted-foreground mt-1">Documents uploaded</p>
      </div>

      {/* Active Alerts */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">Medication</p>
          <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-warning" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">2</p>
        <p className="text-xs text-muted-foreground mt-1">Active prescriptions</p>
      </div>
    </div>
  )
}
