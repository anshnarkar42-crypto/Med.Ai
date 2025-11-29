"use client"

import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { Activity, Calendar, FileText, AlertCircle, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FallDetectionModal } from "@/components/fall-detection-modal"
import { PatientPersonalInformation } from "@/components/patient-personal-information"

export default function PatientDashboard() {
  const { user, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || role !== "patient") {
      router.push("/")
    }
  }, [user, role, router])

  if (!user) return null

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back, {user.name}!</h1>
            <p className="text-gray-600">Your personal health dashboard</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: AI Symptom Checker */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-8 rounded-3xl bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 cursor-pointer group relative overflow-hidden"
              onClick={() => router.push("/patient/symptom-input")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3">AI Symptom Checker</h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Describe your symptoms and get instant AI-powered analysis with treatment recommendations
                </p>

                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Diagnosis
                </Button>

                <motion.div
                  className="absolute bottom-4 right-4 w-3 h-3 bg-blue-600 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </div>
            </motion.div>

            {/* Card 2: Patient Health History */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-8 rounded-3xl bg-gradient-to-br from-orange-100 to-orange-50 border border-orange-200 cursor-pointer group relative overflow-hidden"
              onClick={() => router.push("/patient/health-history")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ClipboardList className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3">Patient Health History</h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Build your complete medical profile with our interactive health questionnaire in English or Hindi
                </p>

                <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700">
                  Complete Health Profile
                </Button>
              </div>
            </motion.div>

            {/* Card 3: Medical History */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-8 rounded-3xl bg-gradient-to-br from-teal-100 to-teal-50 border border-teal-200 cursor-pointer group relative overflow-hidden"
              onClick={() => router.push("/history")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3">Medical History</h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  View your complete medical timeline, past diagnoses, and health records
                </p>

                <div className="space-y-3 mb-6">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-teal-600 rounded-full" />
                      <div className="flex-1 h-2 bg-teal-200 rounded" style={{ width: `${100 - i * 20}%` }} />
                    </motion.div>
                  ))}
                </div>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
                >
                  View Timeline
                </Button>
              </div>
            </motion.div>

            {/* Card 4: My Appointments */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-8 rounded-3xl bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200 cursor-pointer group relative overflow-hidden"
              onClick={() => router.push("/appointments")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3">My Appointments</h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Schedule new appointments and manage your upcoming consultations
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                    <div>
                      <p className="font-semibold text-sm text-gray-800">Dr. Sarah Johnson</p>
                      <p className="text-xs text-gray-600">Tomorrow, 10:00 AM</p>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Confirmed
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  View All
                </Button>
              </div>
            </motion.div>

            {/* Card 5: Emergency Assistant */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-8 rounded-3xl bg-gradient-to-br from-red-100 to-red-50 border border-red-200 cursor-pointer group relative overflow-hidden"
              onClick={() => router.push("/patient/emergency")}
            >
              <motion.div
                className="absolute inset-0 bg-red-400/30 blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative">
                  <AlertCircle className="w-8 h-8 text-white" />
                  <motion.div
                    className="absolute inset-0 border-4 border-red-600 rounded-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3">Emergency Assistant</h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Quick access to emergency services and critical health alerts
                </p>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {[
                    { label: "Chest Pain", color: "bg-red-200" },
                    { label: "Bleeding", color: "bg-orange-200" },
                    { label: "Breathing", color: "bg-yellow-200" },
                    { label: "Accident", color: "bg-red-300" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className={`${item.color} p-2 rounded-lg text-xs font-semibold text-gray-800 text-center`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Access Emergency
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Personal Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8"
          >
            <PatientPersonalInformation />
          </motion.div>
        </div>
      </main>

      <FallDetectionModal />
    </>
  )
}
