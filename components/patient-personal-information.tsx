"use client"

import { motion } from "framer-motion"
import { Heart, Pill, AlertCircle, History, Calendar } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useState, useEffect } from "react"

interface HealthAnswer {
  id: string
  question_id: string
  answer_text: string
  created_at: string
  health_questions?: {
    question_text?: string
    category?: string
  }
}

export function PatientPersonalInformation() {
  const { user } = useAuth()
  const [healthHistory, setHealthHistory] = useState<HealthAnswer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHealthHistory = async () => {
      if (!user?.id) return

      try {
        const response = await fetch(`/api/patient/health-history?patientId=${user.id}`)
        const result = await response.json()

        if (result.success && result.data) {
          // Sort with latest entries at the bottom (ascending by date)
          const sorted = result.data.sort(
            (a: HealthAnswer, b: HealthAnswer) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
          )
          setHealthHistory(sorted)
        }
      } catch (error) {
        console.error("[v0] Error fetching health history:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHealthHistory()
  }, [user?.id])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass-card p-8 rounded-3xl space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
          <p className="text-gray-600">Your complete health profile</p>
        </div>
      </motion.div>

      {/* Basic Info Cards */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Age</p>
          <p className="text-2xl font-bold text-gray-800">32</p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Gender</p>
          <p className="text-2xl font-bold text-gray-800">Male</p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Blood Group</p>
          <p className="text-2xl font-bold text-gray-800">O+</p>
        </div>
      </motion.div>

      {/* Health History Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">Health History (Latest to Oldest)</h3>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-gray-600 mt-2">Loading health history...</p>
          </div>
        ) : healthHistory.length === 0 ? (
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-blue-700">No health history yet. Complete your health profile to get started.</p>
          </div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
            {healthHistory.map((answer, index) => (
              <motion.div
                key={answer.id}
                variants={itemVariants}
                className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-800 truncate">
                        {answer.health_questions?.question_text || "Health Question"}
                      </p>
                      {answer.health_questions?.category && (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full whitespace-nowrap ml-2">
                          {answer.health_questions.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{answer.answer_text}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(answer.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Sample Medical Data Cards */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        {/* Conditions */}
        <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <p className="font-semibold text-gray-800">Pre-existing Conditions</p>
          </div>
          <div className="space-y-2">
            {["Hypertension", "Type 2 Diabetes"].map((condition) => (
              <span
                key={condition}
                className="inline-block px-3 py-1 bg-orange-200 text-orange-800 text-xs rounded-full mr-2"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>

        {/* Medications */}
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <Pill className="w-5 h-5 text-blue-600" />
            <p className="font-semibold text-gray-800">Current Medications</p>
          </div>
          <div className="space-y-2">
            {["Amlodipine 5mg", "Metformin 500mg"].map((med) => (
              <span key={med} className="inline-block px-3 py-1 bg-blue-200 text-blue-800 text-xs rounded-full mr-2">
                {med}
              </span>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div className="p-4 bg-red-50 rounded-xl border border-red-200 md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="font-semibold text-gray-800">Allergies</p>
          </div>
          <div className="space-y-2">
            {["Penicillin", "Shellfish"].map((allergy) => (
              <span key={allergy} className="inline-block px-3 py-1 bg-red-200 text-red-800 text-xs rounded-full mr-2">
                {allergy}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
