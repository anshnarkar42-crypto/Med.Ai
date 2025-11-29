"use client"

import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Navbar } from "@/components/navbar"

const historyTimeline = [
  {
    id: 1,
    date: "2024-11-25",
    type: "appointment",
    title: "Consultation with Dr. Smith",
    description: "Regular checkup and blood pressure monitoring",
    icon: "💬",
  },
  {
    id: 2,
    date: "2024-11-20",
    type: "symptom",
    title: "Symptom Analysis",
    description: "Chest pain and shortness of breath - Urgency: Emergency",
    icon: "🕐",
  },
  {
    id: 3,
    date: "2024-11-15",
    type: "prescription",
    title: "Prescription Issued",
    description: "Lisinopril 10mg, Metformin 500mg",
    icon: "💊",
  },
  {
    id: 4,
    date: "2024-11-10",
    type: "appointment",
    title: "Consultation with Dr. Smith",
    description: "ECG results discussion",
    icon: "💬",
  },
]

export default function HistoryPage() {
  const { user, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  if (!user) return null

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header with animations */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">Medical History</h1>
            <p className="text-muted-foreground">Timeline of your healthcare events</p>
          </motion.div>

          {/* Timeline with animations */}
          <div className="relative space-y-8">
            {/* Animated timeline line */}
            <motion.div
              className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary"
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1, delay: 0.3 }}
            />

            {/* Animated timeline items */}
            {historyTimeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative pl-20"
              >
                {/* Timeline dot with pulse */}
                <motion.div
                  className="absolute left-0 w-12 h-12 rounded-full bg-card border-4 border-primary/30 flex items-center justify-center text-xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + index * 0.15,
                    type: "spring",
                    bounce: 0.5,
                  }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  {item.icon}
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-primary rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.5 + index * 0.15,
                    }}
                  />
                </motion.div>

                {/* Content with hover effect */}
                <motion.div
                  className="glass-card p-6"
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-foreground text-lg">{item.title}</p>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
                        item.type === "appointment"
                          ? "bg-primary/20 text-primary"
                          : item.type === "symptom"
                            ? "bg-warning/20 text-warning"
                            : "bg-secondary/20 text-secondary"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>📅</span>
                    {new Date(item.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
