"use client"

import { dummyAppointments, dummyDoctor } from "@/lib/dummy-data"

export function AppointmentsSection() {
  return (
    <div className="glass-card space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Appointments</h2>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg gradient-primary text-white text-sm hover:shadow-lg transition-smooth">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          Book New
        </button>
      </div>

      <div className="space-y-3">
        {dummyAppointments.map((apt) => (
          <div
            key={apt.id}
            className={`p-4 rounded-lg border transition-smooth cursor-pointer hover:shadow-md ${
              apt.status === "scheduled" ? "border-primary bg-primary/5" : "border-border bg-muted/30"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-foreground">{dummyDoctor.name}</p>
                <p className="text-sm text-muted-foreground">{dummyDoctor.specialization}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                  apt.status === "scheduled"
                    ? "bg-primary/20 text-primary"
                    : apt.status === "completed"
                      ? "bg-success/20 text-success"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {apt.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.16-2.66c-.44-.53-1.25-.58-1.78-.15-.53.44-.58 1.25-.15 1.78l3 3.67c.28.34.72.54 1.17.54.38 0 .76-.16 1.04-.46l4-5.12c.37-.48.29-1.18-.19-1.55-.48-.37-1.18-.29-1.55.19z" />
                </svg>
                {new Date(apt.dateTime).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11 17h2v-5h-2v5zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H10.5v6h3v-1.5h-1.5v-4.5z" />
                </svg>
                {new Date(apt.dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                {apt.consultationType}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
