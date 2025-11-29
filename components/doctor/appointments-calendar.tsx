"use client"

import { Clock } from "lucide-react"

const appointments = [
  { id: 1, patientName: "John Doe", time: "09:00 AM", type: "in-person" },
  { id: 2, patientName: "Sarah Johnson", time: "10:30 AM", type: "video" },
  { id: 3, patientName: "Michael Chen", time: "02:00 PM", type: "in-person" },
]

export function AppointmentsCalendar() {
  return (
    <div className="glass-card space-y-4">
      <h2 className="text-xl font-bold text-foreground">Today's Schedule</h2>

      <div className="space-y-3">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-foreground">{apt.patientName}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  apt.type === "video" ? "bg-secondary/20 text-secondary" : "bg-primary/20 text-primary"
                }`}
              >
                {apt.type}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {apt.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-smooth text-sm font-medium">
        View Full Calendar
      </button>
    </div>
  )
}
