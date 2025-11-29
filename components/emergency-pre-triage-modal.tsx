"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { EmergencyDetection } from "@/lib/voice-recognition"

interface EmergencyPreTriageModalProps {
  open: boolean
  onClose: () => void
  detection: EmergencyDetection
}

export function EmergencyPreTriageModal({ open, onClose, detection }: EmergencyPreTriageModalProps) {
  const router = useRouter()
  const [countdown, setCountdown] = useState(7)
  const [silentEscalation, setSilentEscalation] = useState(false)

  useEffect(() => {
    if (open && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !silentEscalation) {
      setSilentEscalation(true)
      handleEmergency(true)
    }
  }, [open, countdown])

  const handleEmergency = async (isSilent = false) => {
    const payload = {
      type: "voice_wake",
      patient_id: null,
      timestamp: new Date().toISOString(),
      detected_language: detection.language,
      transcript: detection.transcript,
      keywords: detection.detectedKeywords,
      history_match_score: 0.5,
      confidence: detection.confidence,
      location: { lat: 19.076, lng: 72.8777 },
      authenticity_flag: isSilent ? "low" : detection.confidence,
      silent_escalation: isSilent,
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/emergency`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } catch (error) {
      console.error("[v0] Emergency API call failed:", error)
    }

    router.push("/patient/emergency")
  }

  const handleImOk = () => {
    onClose()
  }

  const handleCall108 = () => {
    // Simulate calling 108
    if (
      typeof window !== "undefined" &&
      window.confirm("This will initiate a call to 108 Emergency Services. Continue?")
    ) {
      window.location.href = "tel:108"
    }
  }

  const handleShareLocation = async () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Location shared: ${position.coords.latitude}, ${position.coords.longitude}`)
        },
        (error) => {
          alert("Location permission denied or unavailable")
        },
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-600">Emergency Wake Word Detected</DialogTitle>
          <DialogDescription>The system detected potential emergency keywords in your voice input.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Detection Summary */}
          <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Detected:</span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  detection.confidence === "high"
                    ? "bg-red-500 text-white"
                    : detection.confidence === "medium"
                      ? "bg-orange-500 text-white"
                      : "bg-yellow-500 text-white"
                }`}
              >
                {detection.confidence.toUpperCase()} Confidence
              </span>
            </div>
            <p className="text-sm mb-2">{detection.transcript}</p>
            {detection.detectedKeywords.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {detection.detectedKeywords.map((keyword, idx) => (
                  <span key={idx} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Countdown Timer */}
          {countdown > 0 && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <div className="w-8 h-8 rounded-full border-4 border-orange-500 flex items-center justify-center font-bold animate-pulse">
                  {countdown}
                </div>
                <span className="text-sm">Silent escalation in {countdown} seconds...</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button size="lg" variant="destructive" onClick={() => handleEmergency(false)} className="h-20">
              <div className="text-center">
                <div className="font-bold text-lg">Confirm Emergency</div>
                <div className="text-xs">Yes, I need help</div>
              </div>
            </Button>

            <Button size="lg" variant="outline" onClick={handleImOk} className="h-20 bg-transparent">
              <div className="text-center">
                <div className="font-bold text-lg">I'm OK</div>
                <div className="text-xs">False alarm</div>
              </div>
            </Button>

            <Button size="lg" onClick={handleCall108} className="h-16 bg-red-600 hover:bg-red-700">
              📞 Call 108 Now
            </Button>

            <Button size="lg" variant="secondary" onClick={handleShareLocation} className="h-16">
              📍 Share Location
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
