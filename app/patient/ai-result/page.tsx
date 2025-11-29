"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { motion, AnimatePresence } from "framer-motion"
import { AppointmentModal } from "@/components/appointment-modal"
import { Loader2, ArrowLeft, Download, Share2, Save } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { SeverityGauge } from "@/components/severity-gauge"

interface AnalysisData {
  severity: "mild" | "moderate" | "severe"
  conditions: Array<{ name: string; probability: number; description: string }>
  recommendations: Array<{ type: string; text: string; priority: string }>
  medicines: Array<{ name: string; dosage: string; frequency: string; duration: string; instructions: string }>
  nextSteps: string
  warningSignsToWatch: string[]
  requiresImmediateAttention: boolean
}

export default function AIResultPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [analysisData, setAnalysisData] = useState<{ analysis: AnalysisData } | null>(null)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [appointmentConfirmation, setAppointmentConfirmation] = useState<any>(null)
  const [isBookingAppointment, setIsBookingAppointment] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem("symptom-analysis")
      if (data) {
        setAnalysisData(JSON.parse(data))
      } else {
        router.push("/patient/symptom-input")
      }
    }
  }, [router])

  const handleBookAppointment = async (doctorId: string, dateTime: string, consultationType: string) => {
    if (!user) return

    setIsBookingAppointment(true)
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: user.id,
          doctorId,
          dateTime,
          consultationType,
          reason: "AI Symptom Analysis Follow-up",
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setAppointmentConfirmation(result.confirmation)
        setShowAppointmentModal(false)
        setTimeout(() => router.push("/dashboard/patient?appointmentBooked=true"), 3000)
      }
    } catch (error) {
      console.error("[v0] Booking error:", error)
    } finally {
      setIsBookingAppointment(false)
    }
  }

  const handleEmergency = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            await fetch("/api/emergency", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                patientId: user?.id,
                emergencyType: "AI-Detected Severe Symptoms",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }),
            })
            router.push("/patient/emergency")
          } catch (error) {
            console.error(error)
          }
        },
        () => router.push("/patient/emergency"),
      )
    }
  }

  if (!analysisData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-600" />
            <p className="text-lg text-gray-600">Loading analysis results...</p>
          </div>
        </div>
      </>
    )
  }

  const { analysis } = analysisData

  // Prepare escalation path based on severity
  const escalationSteps = [
    {
      number: 1,
      title: "AI Self-Care",
      description: "Follow recommendations and monitor symptoms",
      icon: "🏠",
    },
    {
      number: 2,
      title: "Consult Doctor",
      description: "If symptoms persist, book appointment",
      icon: "👨‍⚕️",
    },
    {
      number: 3,
      title: "Emergency Care",
      description: "Immediate medical attention if needed",
      icon: "🚑",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Analysis Results</h1>
              <p className="text-gray-600">Based on your symptom input</p>
            </div>
          </motion.div>

          {/* Severity Gauge Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 glass-card p-8 rounded-3xl shadow-lg text-center"
          >
            <SeverityGauge severity={analysis.severity} description={analysis.nextSteps} />
          </motion.div>

          {/* Main Content - 3 Column Layout */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Column 1: Possible Conditions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-2xl"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Possible Conditions</h3>
              <div className="space-y-3">
                {analysis.conditions.map((condition, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                    className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-800 text-sm">{condition.name}</p>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          condition.probability > 0.7
                            ? "bg-red-100 text-red-700"
                            : condition.probability > 0.4
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {Math.round(condition.probability * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full"
                        style={{ width: `${condition.probability * 100}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">✓ Immediate Do's</h3>
                  <div className="space-y-2">
                    {analysis.recommendations
                      .filter((r) => r.priority === "high")
                      .map((rec, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35 + i * 0.05 }}
                          className="flex gap-2 text-sm p-2 rounded bg-green-50"
                        >
                          <span className="text-green-600 font-bold">•</span>
                          <span className="text-gray-700">{rec.text}</span>
                        </motion.div>
                      ))}
                  </div>
                </div>

                {analysis.medicines.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">🔴 OTC Suggestions</h4>
                    <div className="space-y-2">
                      {analysis.medicines.slice(0, 2).map((med, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.38 + i * 0.05 }}
                          className="text-xs p-2 rounded bg-blue-50 border border-blue-100"
                        >
                          <p className="font-semibold text-blue-900">{med.name}</p>
                          <p className="text-blue-700">
                            {med.dosage} • {med.frequency}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      <em>Note: These are non-prescriptive suggestions. Consult a pharmacist.</em>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Column 3: Warning Signs & Care Path */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* When to Seek Help */}
              {analysis.warningSignsToWatch.length > 0 && (
                <motion.div className="glass-card p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">⚠️ When to Seek Help</h3>
                  <div className="space-y-2">
                    {analysis.warningSignsToWatch.map((sign, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.43 + i * 0.05 }}
                        className="text-xs p-2 rounded bg-orange-50 border border-orange-100"
                      >
                        <p className="text-orange-900">• {sign}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Care Escalation Path */}
              <motion.div className="glass-card p-6 rounded-2xl">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Care Escalation Path</h3>
                <div className="space-y-3">
                  {escalationSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.45 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0 ${
                          i === 0 ? "bg-green-500" : i === 1 ? "bg-orange-500" : "bg-red-500"
                        }`}
                      >
                        {step.number}
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-gray-800">{step.title}</p>
                        <p className="text-gray-600 text-xs">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <Button onClick={() => {}} variant="outline" className="flex-1 rounded-xl">
              <Save className="w-4 h-4 mr-2" />
              Save to History
            </Button>
            <Button onClick={() => {}} variant="outline" className="flex-1 rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button onClick={() => {}} className="flex-1 bg-teal-600 hover:bg-teal-700 rounded-xl">
              <Share2 className="w-4 h-4 mr-2" />
              Share with Doctor
            </Button>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-col gap-3"
          >
            {analysis.severity === "mild" && (
              <Button
                onClick={() => router.push("/dashboard/patient")}
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 h-12 rounded-xl text-base"
              >
                Follow Home Care & Rest
              </Button>
            )}

            {analysis.severity === "moderate" && (
              <>
                <Button
                  onClick={() => setShowAppointmentModal(true)}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl text-base"
                >
                  📅 Book Appointment with Doctor
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/dashboard/patient")}
                  size="lg"
                  className="w-full h-12 rounded-xl text-base"
                >
                  Continue
                </Button>
              </>
            )}

            {analysis.severity === "severe" && (
              <>
                <Button
                  onClick={handleEmergency}
                  size="lg"
                  className="w-full bg-red-600 hover:bg-red-700 h-12 rounded-xl text-base"
                >
                  🚑 Activate Emergency Services
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open("tel:112", "_self")}
                  size="lg"
                  className="w-full text-red-600 h-12 rounded-xl text-base border-red-200"
                >
                  ☎️ Call Emergency (112)
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </main>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        onConfirm={handleBookAppointment}
        isLoading={isBookingAppointment}
      />

      {/* Appointment Confirmation */}
      <AnimatePresence>
        {appointmentConfirmation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-2xl p-8 max-w-md shadow-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-3xl">✓</span>
              </motion.div>
              <h2 className="text-2xl font-bold text-center mb-2">Appointment Confirmed!</h2>
              <p className="text-gray-600 text-center mb-6">{appointmentConfirmation?.confirmationMessage}</p>
              <Button onClick={() => router.push("/dashboard/patient")} className="w-full">
                Go to Dashboard
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
