"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { VoiceRecognition } from "@/lib/voice-recognition"
import { EmergencyPreTriageModal } from "@/components/emergency-pre-triage-modal"

export function EmergencyListener() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [showConsent, setShowConsent] = useState(true)
  const [audioLevel, setAudioLevel] = useState(0)
  const recognitionRef = useRef<VoiceRecognition | null>(null)
  const [emergencyDetected, setEmergencyDetected] = useState(false)
  const [emergencyData, setEmergencyData] = useState<any>(null)
  const shouldRestartRef = useRef(false)

  useEffect(() => {
    if (isEnabled && !recognitionRef.current) {
      shouldRestartRef.current = true

      const voiceRecognition = new VoiceRecognition({
        language: "en-US",
        continuous: true,
        interimResults: true,
        onResult: (transcript, isFinal) => {
          if (isFinal) {
            const detection = VoiceRecognition.detectEmergency(transcript, "en-US")

            if (detection.isEmergency) {
              setEmergencyData(detection)
              setEmergencyDetected(true)
              shouldRestartRef.current = false
              voiceRecognition.stop()
            }
          }

          setAudioLevel(Math.random() * 100)
        },
        onError: (error) => {
          if (error !== "aborted") {
            console.error("[v0] Emergency listener error:", error)
          }
        },
        onEnd: () => {
          if (shouldRestartRef.current && isEnabled && !emergencyDetected) {
            setTimeout(() => {
              if (recognitionRef.current && shouldRestartRef.current) {
                recognitionRef.current.start()
              }
            }, 1000)
          }
        },
      })

      voiceRecognition.start()
      recognitionRef.current = voiceRecognition
    } else if (!isEnabled && recognitionRef.current) {
      shouldRestartRef.current = false
      recognitionRef.current.stop()
      recognitionRef.current = null
    }

    return () => {
      if (recognitionRef.current) {
        shouldRestartRef.current = false
        recognitionRef.current.stop()
        recognitionRef.current = null
      }
    }
  }, [isEnabled, emergencyDetected])

  const handleConsent = (allow: boolean) => {
    setShowConsent(false)
    setIsEnabled(allow)

    if (allow && typeof window !== "undefined") {
      localStorage.setItem("emergency-listener-consent", "true")
    }
  }

  const toggleListener = () => {
    if (isEnabled && recognitionRef.current) {
      shouldRestartRef.current = false
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setIsEnabled(!isEnabled)
  }

  return (
    <>
      {/* Consent Modal */}
      <Dialog open={showConsent} onOpenChange={setShowConsent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Emergency Listening Consent</DialogTitle>
            <DialogDescription>
              Allow emergency listening? This simulates a voice-wake flow in the demo. The system will listen for
              emergency keywords like "help", "can't breathe", or wake words like "Med AI". You can toggle it off
              anytime.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleConsent(false)}>
              Deny
            </Button>
            <Button onClick={() => handleConsent(true)}>Allow</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!showConsent && (
        <div className="fixed bottom-6 left-6 z-50">
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 p-4 flex items-center gap-3 rounded-full shadow-2xl shadow-red-500/30">
            <div className="flex items-center gap-3">
              {isEnabled && (
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-red-600 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔴</span>
                <span className="text-sm font-semibold text-red-900">
                  Emergency listening: <span className="uppercase tracking-wide">{isEnabled ? "ON" : "OFF"}</span>
                </span>
              </div>
            </div>
            <Button
              size="sm"
              variant={isEnabled ? "destructive" : "default"}
              onClick={toggleListener}
              className="shadow-lg font-semibold"
            >
              {isEnabled ? "Disable" : "Enable"}
            </Button>
          </div>
        </div>
      )}

      {/* Emergency Pre-Triage Modal */}
      {emergencyDetected && emergencyData && (
        <EmergencyPreTriageModal
          open={emergencyDetected}
          onClose={() => {
            setEmergencyDetected(false)
            setEmergencyData(null)
          }}
          detection={emergencyData}
        />
      )}
    </>
  )
}
