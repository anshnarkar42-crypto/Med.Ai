"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Phone, MapPin, MessageSquare, Hospital, AlertTriangle } from "lucide-react"
import { LiveLocationTracker } from "@/components/live-location-tracker"
import { useUser } from "@/hooks/useUser" // Assuming a custom hook to get user data

export default function EmergencyPage() {
  const [autoEscalationTimer, setAutoEscalationTimer] = useState(10)
  const [hospitalNotified, setHospitalNotified] = useState(false)
  const [hospitalResponse, setHospitalResponse] = useState<any>(null)
  const [locationShared, setLocationShared] = useState(false)
  const [smsPreview, setSmsPreview] = useState("")
  const { user } = useUser() // Get user data from the custom hook

  const emergencyData = {
    detectedAt: new Date().toISOString(),
    confidence: "high" as const,
    transcript: "med ai madad karo main khoon khar raha hu",
    keywords: ["madad", "khoon"],
    voiceSnippets: [
      { id: 1, timestamp: "12:30:45", duration: "5s" },
      { id: 2, timestamp: "12:30:52", duration: "3s" },
      { id: 3, timestamp: "12:31:00", duration: "4s" },
    ],
    lastVitals: {
      heartRate: 110,
      bloodPressure: "140/95",
      temperature: "99.2°F",
      spo2: 94,
    },
    historyMatchScore: 0.75,
    predictedCondition: "Severe bleeding / Trauma",
    severity: "Critical",
    location: { lat: 19.076, lng: 72.8777, address: "Andheri West, Mumbai" },
  }

  useEffect(() => {
    if (autoEscalationTimer > 0 && !hospitalNotified) {
      const timer = setTimeout(() => {
        setAutoEscalationTimer(autoEscalationTimer - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (autoEscalationTimer === 0 && !hospitalNotified) {
      handleNotifyHospital(true)
    }
  }, [autoEscalationTimer, hospitalNotified])

  const handleCallAmbulance = () => {
    if (confirm("This will initiate a call to 108 Emergency Services. Continue?")) {
      window.location.href = "tel:108"
    }
  }

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationShared(true)
          alert(`Location shared: ${position.coords.latitude}, ${position.coords.longitude}`)
        },
        (error) => {
          alert("Location permission denied or unavailable")
        },
      )
    }
  }

  const handleSendSMS = () => {
    const smsText = `SOS! I need urgent medical help. Condition: ${emergencyData.predictedCondition}. Location: ${emergencyData.location.address}. Track me: https://maps.google.com/?q=${emergencyData.location.lat},${emergencyData.location.lng}`
    setSmsPreview(smsText)

    setTimeout(() => {
      alert("Emergency SMS sent to contacts!")
    }, 1000)
  }

  const handleNotifyHospital = async (auto = false) => {
    const payload = {
      patientId: user?.id || "demo-patient-123",
      emergencyType: emergencyData.predictedCondition || "Cardiac Emergency",
      latitude: emergencyData.location?.lat || 28.5355,
      longitude: emergencyData.location?.lng || 77.391,
      nearestHospital: "Kokilaben Dhirubhai Ambani Hospital",
    }

    try {
      console.log("[v0] Sending emergency payload:", payload)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/emergency`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        let errorMessage = `API returned ${response.status}`

        if (contentType && contentType.includes("application/json")) {
          try {
            const errorData = await response.json()
            errorMessage = errorData.error || errorMessage
          } catch (e) {
            console.error("[v0] Failed to parse error response:", e)
          }
        } else {
          const text = await response.text()
          console.error("[v0] Non-JSON response received:", text.substring(0, 200))
          errorMessage = "Server returned an invalid response"
        }
        throw new Error(errorMessage)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text()
        console.error("[v0] Expected JSON but got:", text.substring(0, 200))
        throw new Error("Server returned invalid response format")
      }

      const data = await response.json()
      console.log("[v0] Emergency response:", data)

      setHospitalNotified(true)

      setTimeout(() => {
        setHospitalResponse({
          hospital: "Kokilaben Dhirubhai Ambani Hospital",
          doctor: "Dr. Rajesh Kumar",
          nurse: "Nurse Priya Sharma",
          eta: "12 minutes",
          ambulanceId: "AMB-108-7734",
          status: "dispatched",
        })
      }, 2000)
    } catch (error) {
      console.error("[v0] Emergency notification failed:", error)
      alert(`Emergency alert failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  const getAuthenticityColor = (score: number) => {
    if (score >= 0.7) return "text-green-600 dark:text-green-400"
    if (score >= 0.4) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  const getAuthenticityLevel = (score: number) => {
    if (score >= 0.7) return "HIGH"
    if (score >= 0.4) return "MEDIUM"
    return "LOW"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-600 text-white p-6 rounded-lg shadow-lg"
        >
          <motion.div
            className="flex items-center gap-3"
            animate={{
              boxShadow: ["0 0 0 0 rgba(220, 38, 38, 0.7)", "0 0 0 20px rgba(220, 38, 38, 0)"],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              className="text-4xl"
            >
              <AlertTriangle className="w-10 h-10" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold">EMERGENCY ALERT ACTIVATED</h1>
              <p className="text-sm opacity-90">
                AI detected: {emergencyData.predictedCondition} - {emergencyData.severity} severity
              </p>
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {autoEscalationTimer > 0 && !hospitalNotified && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="p-6 border-orange-500 bg-orange-50 dark:bg-orange-950/20">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    className="text-4xl font-bold text-orange-600 dark:text-orange-400"
                  >
                    {autoEscalationTimer}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Auto Escalation Timer</h3>
                    <p className="text-sm text-muted-foreground">
                      Emergency will be automatically reported if no action taken
                    </p>
                    <Progress value={(10 - autoEscalationTimer) * 10} className="mt-2" />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleCallAmbulance}
              size="lg"
              className="h-32 w-full bg-red-600 hover:bg-red-700 text-xl font-bold"
            >
              <div className="text-center">
                <Phone className="w-12 h-12 mx-auto mb-2" />
                <div>Call Ambulance (108)</div>
                <div className="text-xs font-normal opacity-90">Immediate emergency response</div>
              </div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => handleNotifyHospital(false)}
              size="lg"
              variant="destructive"
              className="h-32 w-full text-xl font-bold"
              disabled={hospitalNotified}
            >
              <div className="text-center">
                <Hospital className="w-12 h-12 mx-auto mb-2" />
                <div>{hospitalNotified ? "Hospital Notified" : "Notify Nearest Hospital"}</div>
                <div className="text-xs font-normal opacity-90">
                  {hospitalNotified ? "Waiting for response..." : "Send emergency alert"}
                </div>
              </div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleShareLocation}
              size="lg"
              variant="secondary"
              className="h-32 w-full text-xl font-bold"
              disabled={locationShared}
            >
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <div>{locationShared ? "Location Shared" : "Share Location"}</div>
                <div className="text-xs font-normal opacity-90">
                  {locationShared ? emergencyData.location.address : "Enable GPS tracking"}
                </div>
              </div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleSendSMS}
              size="lg"
              variant="outline"
              className="h-32 w-full text-xl font-bold bg-transparent"
            >
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-2" />
                <div>Send SOS SMS</div>
                <div className="text-xs font-normal opacity-90">Alert emergency contacts</div>
              </div>
            </Button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <LiveLocationTracker />
        </motion.div>

        <AnimatePresence>
          {smsPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-500">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  SMS Preview (Sent to Emergency Contacts)
                </h3>
                <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
                  <p className="text-sm">{smsPreview}</p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Emergency Evidence</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Voice Recordings</h3>
                <div className="space-y-2">
                  {emergencyData.voiceSnippets.map((snippet, index) => (
                    <motion.div
                      key={snippet.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                    >
                      <Button size="icon" variant="outline" className="flex-shrink-0 bg-transparent">
                        ▶️
                      </Button>
                      <div className="flex-1 text-sm">
                        <div className="font-medium">Recording {snippet.id}</div>
                        <div className="text-xs text-muted-foreground">
                          {snippet.timestamp} • {snippet.duration}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Last Known Vitals</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Heart Rate", value: emergencyData.lastVitals.heartRate, unit: "bpm", color: "red" },
                    { label: "BP", value: emergencyData.lastVitals.bloodPressure, unit: "mmHg", color: "orange" },
                    { label: "Temperature", value: emergencyData.lastVitals.temperature, unit: "", color: "yellow" },
                    { label: "SpO2", value: `${emergencyData.lastVitals.spo2}%`, unit: "", color: "blue" },
                  ].map((vital, index) => (
                    <motion.div
                      key={vital.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={`p-3 bg-${vital.color}-50 dark:bg-${vital.color}-950/20 rounded-lg`}
                    >
                      <div className="text-xs text-muted-foreground">{vital.label}</div>
                      <div className={`text-2xl font-bold text-${vital.color}-600 dark:text-${vital.color}-400`}>
                        {vital.value}
                      </div>
                      {vital.unit && <div className="text-xs">{vital.unit}</div>}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Authenticity Confidence</h3>
                <span className={`text-2xl font-bold ${getAuthenticityColor(emergencyData.historyMatchScore)}`}>
                  {getAuthenticityLevel(emergencyData.historyMatchScore)}
                </span>
              </div>
              <Progress value={emergencyData.historyMatchScore * 100} className="h-3 mb-2" />
              <p className="text-xs text-muted-foreground">
                Based on voice analysis, medical history match, and symptom correlation
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-muted-foreground">Voice Match</div>
                  <div className="font-semibold">92%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">History Match</div>
                  <div className="font-semibold">{Math.round(emergencyData.historyMatchScore * 100)}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Context Match</div>
                  <div className="font-semibold">85%</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <Card className="p-6 border-blue-500">
          <h2 className="text-xl font-bold mb-4">Hospital Notification Payload</h2>
          <div className="bg-muted/50 p-4 rounded-lg font-mono text-xs overflow-x-auto">
            <pre>
              {JSON.stringify(
                {
                  patient_name: user?.name || "Demo Patient",
                  location: emergencyData.location.address,
                  predicted_condition: emergencyData.predictedCondition,
                  severity: emergencyData.severity,
                  eta_required: "ASAP",
                  required_resources: ["ICU", "Oxygen", "Blood Bank"],
                  confidence: emergencyData.confidence,
                },
                null,
                2,
              )}
            </pre>
          </div>
          {!hospitalNotified && (
            <Button onClick={() => handleNotifyHospital(false)} className="mt-4 w-full">
              Send Now
            </Button>
          )}
        </Card>

        <AnimatePresence>
          {hospitalResponse && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}>
              <Card className="p-6 bg-green-50 dark:bg-green-950/20 border-green-500">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl"
                  >
                    ✓
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold text-green-700 dark:text-green-400">Hospital Acknowledged</h2>
                    <p className="text-sm text-muted-foreground">{hospitalResponse.hospital}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Assigned Doctor</div>
                    <div className="font-semibold">{hospitalResponse.doctor}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Assigned Nurse</div>
                    <div className="font-semibold">{hospitalResponse.nurse}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Ambulance ETA</div>
                    <div className="font-semibold text-lg">{hospitalResponse.eta}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Ambulance ID</div>
                    <div className="font-semibold">{hospitalResponse.ambulanceId}</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Response Timeline</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Ambulance Assigned", time: "12:31 PM", status: "complete" },
                      { label: "On Route", time: `ETA: ${hospitalResponse.eta}`, status: "progress" },
                      { label: "Arrived", time: "Pending", status: "pending" },
                    ].map((step, index) => (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                            step.status === "complete"
                              ? "bg-green-500"
                              : step.status === "progress"
                                ? "bg-blue-500 animate-pulse"
                                : "bg-muted"
                          }`}
                        >
                          {step.status === "complete" ? "✓" : step.status === "progress" ? "→" : "•"}
                        </div>
                        <div className="flex-1">
                          <div
                            className={`font-medium text-sm ${step.status === "pending" ? "text-muted-foreground" : ""}`}
                          >
                            {step.label}
                          </div>
                          <div className="text-xs text-muted-foreground">{step.time}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
