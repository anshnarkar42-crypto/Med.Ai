"use client"

import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { HospitalStats } from "@/components/staff/hospital-stats"
import { TaskManager } from "@/components/staff/task-manager"
import { InventoryManagement } from "@/components/staff/inventory-management"
import { PatientAdmission } from "@/components/staff/patient-admission"

export default function StaffDashboard() {
  const { user, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || role !== "staff") {
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
            className="mb-12"
          >
            <h1 className="text-5xl font-bold text-foreground mb-2">{user.name}</h1>
            <p className="text-lg text-muted-foreground font-medium">Hospital resource and patient management</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <HospitalStats />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 space-y-8"
            >
              <TaskManager />
              <PatientAdmission />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <InventoryManagement />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
