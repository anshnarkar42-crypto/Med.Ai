"use client"

import { Users, Calendar, AlertTriangle, TrendingUp } from "lucide-react"

export function DoctorStatsCards() {
  const stats = [
    { label: "Total Patients", value: "48", icon: Users, color: "primary" },
    { label: "Today's Appointments", value: "5", icon: Calendar, color: "secondary" },
    { label: "Urgent Cases", value: "3", icon: AlertTriangle, color: "warning" },
    { label: "Patient Growth", value: "+12%", icon: TrendingUp, color: "success" },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        const colorMap = {
          primary: "bg-primary/20 text-primary",
          secondary: "bg-secondary/20 text-secondary",
          warning: "bg-warning/20 text-warning",
          success: "bg-success/20 text-success",
        }

        return (
          <div key={idx} className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[stat.color as keyof typeof colorMap]}`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
