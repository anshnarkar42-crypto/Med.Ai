"use client"

import { Users, Activity, Check, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

export function HospitalStats() {
  const stats = [
    {
      label: "Total Patients",
      value: "156",
      icon: Users,
      color: "primary",
      bgColor: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-200",
    },
    {
      label: "Currently Admitted",
      value: "42",
      icon: Activity,
      color: "secondary",
      bgColor: "from-teal-50 to-teal-100",
      iconBg: "bg-teal-200",
    },
    {
      label: "Discharged Today",
      value: "8",
      icon: Check,
      color: "success",
      bgColor: "from-green-50 to-green-100",
      iconBg: "bg-green-200",
    },
    {
      label: "Critical Cases",
      value: "3",
      icon: AlertTriangle,
      color: "warning",
      bgColor: "from-orange-50 to-orange-100",
      iconBg: "bg-orange-200",
    },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        const colorMap = {
          primary: "text-blue-600",
          secondary: "text-teal-600",
          warning: "text-orange-600",
          success: "text-green-600",
        }

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-white/40 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-700">{stat.label}</p>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                <Icon className={`w-6 h-6 ${colorMap[stat.color as keyof typeof colorMap]}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
