"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { dummyAppointments, dummyDoctor } from "@/lib/dummy-data"

export default function AppointmentsPage() {
  const { user, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  if (!user) return null

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Appointments</h1>
            <p className="text-muted-foreground">Manage your medical consultations</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-border">
            {["scheduled", "completed", "cancelled"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 font-medium border-b-2 transition-smooth capitalize ${
                  tab === "scheduled"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {dummyAppointments.map((apt) => (
              <div key={apt.id} className="glass-card p-6 hover:shadow-lg transition-smooth cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={dummyDoctor.avatar || "/placeholder.svg"}
                      alt={dummyDoctor.name}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{dummyDoctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{dummyDoctor.specialization}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      apt.status === "scheduled"
                        ? "bg-primary/20 text-primary"
                        : apt.status === "completed"
                          ? "bg-success/20 text-success"
                          : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>📅</span>
                    {new Date(apt.dateTime).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>🕐</span>
                    {new Date(apt.dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>📹</span>
                    {apt.consultationType}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>💬</span>
                    {apt.reason}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  {apt.status === "scheduled" && (
                    <>
                      <button className="flex-1 py-2 rounded-lg gradient-primary text-white font-semibold hover:shadow-lg transition-smooth">
                        Join Consultation
                      </button>
                      <button className="flex-1 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-smooth">
                        Reschedule
                      </button>
                    </>
                  )}
                  {apt.status === "completed" && (
                    <button className="w-full py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-smooth">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
