"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { DoctorStatsCards } from "@/components/doctor/stats-cards"
import { PatientList } from "@/components/doctor/patient-list"
import { AppointmentsCalendar } from "@/components/doctor/appointments-calendar"
import { CaseModal } from "@/components/doctor/case-modal"

export default function DoctorDashboard() {
  const { user, role } = useAuth()
  const router = useRouter()
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false)

  useEffect(() => {
    if (!user || role !== "doctor") {
      router.push("/")
    }
  }, [user, role, router])

  if (!user) return null

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
            <h1 className="text-4xl font-bold text-foreground mb-2">Dr. {user.name}</h1>
            <p className="text-muted-foreground">Manage your patients and consultations</p>
          </motion.div>
          {/* </CHANGE> */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <DoctorStatsCards />
          </motion.div>
          {/* </CHANGE> */}

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <PatientList />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <AppointmentsCalendar />
            </motion.div>
          </div>
          {/* </CHANGE> */}

          <CaseModal isOpen={isCaseModalOpen} onClose={() => setIsCaseModalOpen(false)} />
        </div>
      </main>
    </>
  )
}
