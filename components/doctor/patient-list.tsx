"use client"

import { useState } from "react"
import { Search, Filter, ChevronRight } from "lucide-react"

const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 32,
    condition: "Hypertension",
    lastVisit: "2024-11-20",
    urgency: "high",
    status: "follow-up needed",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    age: 28,
    condition: "Diabetes Type 2",
    lastVisit: "2024-11-15",
    urgency: "moderate",
    status: "stable",
  },
  {
    id: 3,
    name: "Michael Chen",
    age: 45,
    condition: "Cardiac Assessment",
    lastVisit: "2024-11-25",
    urgency: "high",
    status: "critical",
  },
]

export function PatientList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null)

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="glass-card space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">My Patients</h2>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-smooth text-sm">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Patient List */}
      <div className="space-y-2">
        {filtered.map((patient) => (
          <button
            key={patient.id}
            onClick={() => setSelectedPatient(selectedPatient === patient.id ? null : patient.id)}
            className={`w-full p-4 rounded-lg border transition-smooth text-left ${
              selectedPatient === patient.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-foreground">{patient.name}</p>
                <p className="text-sm text-muted-foreground">
                  {patient.age} years • {patient.condition}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p
                    className={`text-xs font-semibold capitalize px-2 py-1 rounded ${
                      patient.urgency === "high"
                        ? "bg-destructive/20 text-destructive"
                        : patient.urgency === "moderate"
                          ? "bg-warning/20 text-warning"
                          : "bg-success/20 text-success"
                    }`}
                  >
                    {patient.urgency}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Last: {patient.lastVisit}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            {selectedPatient === patient.id && (
              <div className="mt-3 pt-3 border-t border-border animate-slide-in">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button className="px-3 py-1 rounded text-xs font-medium gradient-primary text-white hover:shadow-md transition-smooth">
                    View Case
                  </button>
                  <button className="px-3 py-1 rounded text-xs font-medium border border-primary text-primary hover:bg-primary/5 transition-smooth">
                    Schedule
                  </button>
                </div>
                <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">Status: {patient.status}</p>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
