"use client"

import { X } from "lucide-react"
import { useState } from "react"

interface CaseModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CaseModal({ isOpen, onClose }: CaseModalProps) {
  const [notes, setNotes] = useState("")
  const [medicines, setMedicines] = useState([{ id: 1, name: "Lisinopril", dosage: "10mg", frequency: "Once daily" }])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border max-w-2xl w-full max-h-96 overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Case Details - John Doe</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-smooth">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Patient History */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Medical History</h3>
            <div className="p-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground">
              <p>Previous conditions: Hypertension, Type 2 Diabetes</p>
              <p>Current medications: 2 active prescriptions</p>
              <p>Last appointment: 2 days ago</p>
            </div>
          </div>

          {/* Doctor Notes */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Consultation Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your clinical notes here..."
              className="w-full px-4 py-2 rounded-lg bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-20 resize-none"
            />
          </div>

          {/* Prescription */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Prescription</h3>
            <div className="space-y-2">
              {medicines.map((med) => (
                <div key={med.id} className="p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="font-medium text-foreground">{med.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {med.dosage} • {med.frequency}
                  </p>
                </div>
              ))}
            </div>
            <button className="mt-2 text-sm text-primary hover:underline">+ Add Medicine</button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button className="flex-1 py-2 rounded-lg gradient-primary text-white font-semibold hover:shadow-lg transition-smooth">
              Save & Send to Patient
            </button>
            <button className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-smooth">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
