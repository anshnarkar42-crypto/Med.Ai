"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { HealthHistoryChatbot } from "@/components/health-history-chatbot"
import type { Language } from "@/lib/health-questions"
import type { HealthAnswer } from "@/lib/health-questions"
import { Loader2 } from "lucide-react"

export default function HealthHistoryPage() {
  const { user, role } = useAuth()
  const router = useRouter()
  const [language, setLanguage] = useState<Language | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user || role !== "patient") {
      router.push("/")
    }
  }, [user, role, router])

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang)
  }

  const handleComplete = async (answers: HealthAnswer[]) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/patient/health-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: user?.id,
          language,
          answers,
        }),
      })

      if (response.ok) {
        // Redirect to patient dashboard with success message
        router.push("/dashboard/patient?historyCompleted=true")
      }
    } catch (error) {
      console.error("[v0] Error saving health history:", error)
      alert("Error saving health history. Please try again.")
      setLanguage(null)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  if (language && !isLoading) {
    return <HealthHistoryChatbot language={language} patientId={user.id} onComplete={handleComplete} />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-600" />
          <p className="text-lg text-gray-600">Saving your health history...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8 w-full"
          >
            {/* Header */}
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-4">Health History</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Let's build your complete health profile. This information will help us provide better personalized
                recommendations.
              </p>
            </div>

            {/* Language Selection Cards */}
            <div className="grid md:grid-cols-2 gap-6 w-full">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLanguageSelect("en")}
                className="glass-card p-8 rounded-2xl border-2 border-transparent hover:border-blue-500 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="text-5xl mb-4">🇬🇧</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">English</h2>
                <p className="text-gray-600">Take the health assessment in English</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLanguageSelect("hi")}
                className="glass-card p-8 rounded-2xl border-2 border-transparent hover:border-teal-500 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="text-5xl mb-4">🇮🇳</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">हिंदी (Hindi)</h2>
                <p className="text-gray-600">अपना स्वास्थ्य मूल्यांकन हिंदी में करें</p>
              </motion.button>
            </div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-8 rounded-2xl bg-white border border-gray-200 mt-8"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">What to Expect</h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <div className="text-3xl mb-2">📋</div>
                  <p className="text-gray-600">
                    <strong>12 Questions</strong> about your complete medical history
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-2">⏱️</div>
                  <p className="text-gray-600">
                    <strong>5-10 minutes</strong> to complete the assessment
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🔒</div>
                  <p className="text-gray-600">
                    <strong>Secure & Private</strong> - Your data is encrypted
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
