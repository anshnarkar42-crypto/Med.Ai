"use client"

import { motion } from "framer-motion"
import { AlertCircle, CheckCircle, AlertTriangle, Activity, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Condition {
  name: string
  probability: number
  description: string
}

interface Recommendation {
  type: "medicine" | "consultation" | "emergency"
  text: string
  priority: "low" | "medium" | "high"
}

interface Medicine {
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

interface AIResultProps {
  analysis: {
    severity: "mild" | "moderate" | "severe"
    conditions: Condition[]
    recommendations: Recommendation[]
    medicines: Medicine[]
    nextSteps: string
    warningSignsToWatch: string[]
    requiresImmediateAttention: boolean
  }
  onBookAppointment?: () => void
  onEmergency?: () => void
}

export function AIResultDisplay({ analysis, onBookAppointment, onEmergency }: AIResultProps) {
  const router = useRouter()
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)

  // Severity color scheme
  const severityConfig = {
    mild: {
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      icon: CheckCircle,
      label: "Safe to Self-Care",
    },
    moderate: {
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: AlertTriangle,
      label: "Consult a Doctor",
    },
    severe: {
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      icon: AlertCircle,
      label: "Emergency - Seek Immediate Help",
    },
  }

  const config = severityConfig[analysis.severity]
  const SeverityIcon = config.icon

  return (
    <div className="space-y-6">
      {/* Severity Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${config.bg} border ${config.border} rounded-2xl p-6 glass-card`}
      >
        <div className="flex items-start gap-4">
          <div className={`${config.color} mt-1`}>
            <SeverityIcon className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className={`text-xl font-bold ${config.color} mb-2`}>{config.label}</h3>
            <p className="text-gray-700 mb-4">{analysis.nextSteps}</p>

            {analysis.warningSignsToWatch.length > 0 && (
              <div>
                <p className="font-semibold text-sm text-gray-700 mb-2">⚠️ Watch for these symptoms:</p>
                <ul className="space-y-1">
                  {analysis.warningSignsToWatch.map((sign, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      • {sign}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Possible Conditions */}
      {analysis.conditions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Possible Conditions
          </h3>
          <div className="space-y-3">
            {analysis.conditions.map((condition, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-800">{condition.name}</p>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {Math.round(condition.probability * 100)}% match
                  </span>
                </div>
                <p className="text-sm text-gray-600">{condition.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Medicines for Mild/Moderate */}
      {analysis.severity !== "severe" && analysis.medicines.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Recommended Medicines
          </h3>
          <div className="space-y-3">
            {analysis.medicines.map((medicine, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedMedicine(selectedMedicine?.name === medicine.name ? null : medicine)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="w-full text-left border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{medicine.name}</p>
                    <p className="text-sm text-gray-600">
                      {medicine.dosage} • {medicine.frequency}
                    </p>
                  </div>
                  <span className="text-xl text-blue-600">{selectedMedicine?.name === medicine.name ? "−" : "+"}</span>
                </div>
                {selectedMedicine?.name === medicine.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Duration:</strong> {medicine.duration}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Instructions:</strong> {medicine.instructions}
                    </p>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-3"
      >
        {analysis.severity === "mild" && (
          <Button
            onClick={() => router.push("/dashboard/patient")}
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Follow Home Care & Rest
          </Button>
        )}

        {analysis.severity === "moderate" && (
          <>
            <Button onClick={onBookAppointment} size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
              Book Appointment with Doctor
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard/patient")} size="lg" className="w-full">
              Save Results & Continue
            </Button>
          </>
        )}

        {analysis.severity === "severe" && (
          <>
            <Button
              onClick={onEmergency}
              size="lg"
              className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              Activate Emergency Services
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("tel:112", "_self")}
              size="lg"
              className="w-full text-red-600"
            >
              Call Emergency (112)
            </Button>
          </>
        )}
      </motion.div>
    </div>
  )
}
