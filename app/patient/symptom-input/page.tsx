"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { VoiceInput } from "@/components/voice-input"
import { BodyMap } from "@/components/body-map"
import { SiriWave } from "@/components/siri-wave"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Paperclip, UserIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"

interface Message {
  id: string
  role: "user" | "ai"
  content: string
  timestamp: Date
}

interface PatientInfo {
  age?: number
  gender?: string
  conditions?: string[]
  medications?: string[]
  allergies?: string[]
  selectedArea?: string
}

export default function SymptomInputPage() {
  const router = useRouter()
  const { user } = useAuth() // useAuth hook is now declared
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content:
        "Hello! I'm your AI health assistant. Please describe your symptoms in detail, and I'll help analyze them. You can type or use voice input.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showBodyMap, setShowBodyMap] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    age: 35,
    gender: "Male",
    conditions: ["Hypertension"],
    medications: ["Amlodipine 5mg"],
    allergies: ["Penicillin"],
  })
  const [clarifyingStep, setClarifyingStep] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clarifyingQuestions = [
    "When did these symptoms start?",
    "On a scale of 1-10, how would you rate the severity?",
    "Have you experienced this before?",
  ]

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI clarifying questions
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)

      if (clarifyingStep < clarifyingQuestions.length) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: clarifyingQuestions[clarifyingStep],
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
        setClarifyingStep((prev) => prev + 1)
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content:
            'Thank you for providing all the details. I have enough information to analyze your symptoms. Click "Analyze Symptoms" to see the results.',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
      }
    }, 1500)
  }

  const handleVoiceTranscript = (text: string, isFinal: boolean) => {
    if (isFinal) {
      handleSendMessage(text)
    } else {
      setInput(text)
    }
  }

  const handleBodyAreaSelect = (area: string) => {
    setPatientInfo((prev) => ({ ...prev, selectedArea: area }))
    handleSendMessage(`I have pain/symptoms in my ${area}`)
    setShowBodyMap(false)
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setError(null)

    try {
      // Prepare analysis data
      const symptomsText = messages
        .filter((m) => m.role === "user")
        .map((m) => m.content)
        .join(". ")

      console.log("[v0] Starting Gemini analysis with:", {
        symptoms: symptomsText,
        age: patientInfo.age,
        gender: patientInfo.gender,
        conditions: patientInfo.conditions,
        medications: patientInfo.medications,
        allergies: patientInfo.allergies,
      })

      // Call Gemini API via our backend
      const response = await fetch("/api/symptom-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: user?.id,
          symptoms: symptomsText,
          age: patientInfo.age,
          gender: patientInfo.gender,
          medicalHistory: patientInfo.conditions?.join(", "),
          medications: patientInfo.medications,
          allergies: patientInfo.allergies,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to analyze symptoms")
      }

      console.log("[v0] Analysis result:", result.analysis)

      // Store in sessionStorage for the result page
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "symptom-analysis",
          JSON.stringify({
            analysis: result.analysis,
            patientInfo,
            messages,
            timestamp: new Date().toISOString(),
          }),
        )
      }

      // Navigate to result page
      router.push("/patient/ai-result")
    } catch (error) {
      console.error("[v0] Analysis error:", error)
      setError(error instanceof Error ? error.message : "Failed to analyze symptoms")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b"
      >
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => router.back()}>
              ← Back
            </Button>
            <div>
              <h1 className="text-xl font-bold">AI Symptom Checker</h1>
              <p className="text-xs text-gray-600">Powered by Med.AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <VoiceInput onTranscript={handleVoiceTranscript} continuous={false} />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col glass-card rounded-3xl overflow-hidden shadow-xl"
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[500px]">
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 shadow-md ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-blue-600 to-teal-600 text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-70 mt-2 block">{message.timestamp.toLocaleTimeString()}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md">
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {isListening && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 pb-4"
            >
              <SiriWave isActive={isListening} />
            </motion.div>
          )}

          {/* Input Composer */}
          <div className="p-6 border-t bg-gray-50/50">
            <div className="flex gap-2 mb-3">
              <Button variant="outline" size="sm" onClick={() => setShowBodyMap(true)} className="rounded-full">
                🗺️ Body Map
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-transparent"
                onClick={() => {
                  const input = document.createElement("input")
                  input.type = "file"
                  input.accept = "image/*,.pdf"
                  input.click()
                }}
              >
                <Paperclip className="w-4 h-4 mr-1" />
                Attach
              </Button>
            </div>

            <div className="flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your symptoms here..."
                className="flex-1 min-h-[80px] rounded-2xl resize-none border-2 focus:border-blue-500 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(input)
                  }
                }}
              />
              <div className="flex flex-col gap-2">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => handleSendMessage(input)}
                    size="lg"
                    className="h-[80px] w-[80px] rounded-2xl bg-gradient-to-br from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                    disabled={!input.trim()}
                  >
                    <Send className="w-6 h-6" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-4"
            >
              {error}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-96 space-y-4"
        >
          {/* Patient Info Card */}
          <div className="glass-card p-6 rounded-3xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Patient Information</h3>
                <p className="text-xs text-gray-600">Quick reference</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">Age</label>
                <Input
                  type="number"
                  value={patientInfo.age}
                  onChange={(e) => setPatientInfo((prev) => ({ ...prev, age: Number.parseInt(e.target.value) }))}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Gender</label>
                <Input
                  value={patientInfo.gender}
                  onChange={(e) => setPatientInfo((prev) => ({ ...prev, gender: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Pre-existing Conditions</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patientInfo.conditions?.map((condition, idx) => (
                    <span key={idx} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-xs rounded">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Current Medications</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patientInfo.medications?.map((med, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-xs rounded">
                      {med}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Allergies</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patientInfo.allergies?.map((allergy, idx) => (
                    <span key={idx} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-xs rounded">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
              {patientInfo.selectedArea && (
                <div>
                  <label className="text-xs text-muted-foreground">Selected Area</label>
                  <div className="mt-1 px-2 py-1 bg-primary/10 text-sm rounded inline-block">
                    {patientInfo.selectedArea}
                  </div>
                </div>
              )}
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleAnalyze}
              size="lg"
              className="w-full h-20 text-lg font-bold rounded-3xl bg-gradient-to-r from-blue-600 via-teal-600 to-blue-600 bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-xl disabled:opacity-50"
              disabled={messages.length < 3 || isAnalyzing}
            >
              {isAnalyzing ? (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  🔄 Analyzing with Gemini AI...
                </motion.span>
              ) : (
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  Analyze with Med.AI ✨
                </motion.span>
              )}
            </Button>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 rounded-3xl shadow-lg"
          >
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">💡 Tips for better analysis</h4>
            <ul className="text-xs text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Be specific about symptom duration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Describe severity and patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Mention triggering factors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Include relevant medical history</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Body Map Modal */}
      <BodyMap open={showBodyMap} onClose={() => setShowBodyMap(false)} onSelectArea={handleBodyAreaSelect} />
    </div>
  )
}
