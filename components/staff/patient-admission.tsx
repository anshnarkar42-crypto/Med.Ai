"use client"

import { useState } from "react"
import { Plus, Bed, Users, User, AlertCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

interface AdmittedPatient {
  id: string
  name: string
  age: number
  bedNumber: string
  department: string
  doctor: string
  status: "Critical" | "Stable"
}

const admittedPatients: AdmittedPatient[] = [
  {
    id: "1",
    name: "Robert Wilson",
    age: 65,
    bedNumber: "ICU-101",
    department: "Cardiology",
    doctor: "Dr. Sarah Smith",
    status: "Critical",
  },
  {
    id: "2",
    name: "Maria Garcia",
    age: 42,
    bedNumber: "3-201",
    department: "Neurology",
    doctor: "Dr. James Brown",
    status: "Stable",
  },
]

export function PatientAdmission() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", department: "", bed: "" })

  const handleSubmit = () => {
    if (formData.name && formData.department && formData.bed) {
      // Handle admission logic here
      setFormData({ name: "", department: "", bed: "" })
      setShowForm(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Admitted Patients</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          Admit Patient
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-4 mb-6"
        >
          <input
            type="text"
            placeholder="Patient Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white text-foreground border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <select
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white text-foreground border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="">Select Department</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Emergency">Emergency</option>
            <option value="ICU">ICU</option>
          </select>
          <input
            type="text"
            placeholder="Bed Number"
            value={formData.bed}
            onChange={(e) => setFormData({ ...formData, bed: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white text-foreground border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold hover:shadow-lg transition-all"
            >
              Admit
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 py-2 rounded-lg border border-gray-300 text-foreground hover:bg-gray-100 font-semibold transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Patient List */}
      <div className="space-y-3">
        {admittedPatients.map((patient, idx) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-bold text-lg text-foreground">{patient.name}</p>
                <p className="text-sm text-gray-500">{patient.age} years</p>
              </div>
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  patient.status === "Critical" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                }`}
              >
                {patient.status === "Critical" ? (
                  <AlertCircle className="w-3 h-3" />
                ) : (
                  <CheckCircle className="w-3 h-3" />
                )}
                {patient.status}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Bed className="w-4 h-4 text-blue-600" />
                <span>{patient.bedNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4 text-teal-600" />
                <span>{patient.department}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4 text-purple-600" />
                <span>{patient.doctor}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
