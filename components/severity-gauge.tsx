"use client"

import { motion } from "framer-motion"

interface SeverityGaugeProps {
  severity: "mild" | "moderate" | "severe"
  description?: string
}

export function SeverityGauge({ severity, description }: SeverityGaugeProps) {
  const severityConfig = {
    mild: { angle: -45, color: "from-green-400 to-teal-500", label: "Mild (Self-Care)" },
    moderate: { angle: 0, color: "from-orange-400 to-yellow-500", label: "Moderate (Seek Immediate Care)" },
    severe: { angle: 45, color: "from-red-500 to-orange-600", label: "Severe (Emergency)" },
  }

  const config = severityConfig[severity]

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-48 h-24">
        {/* Gauge background */}
        <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
          {/* Gauge arc - green section */}
          <path
            d="M 20 80 A 60 60 0 0 1 65 25"
            stroke="rgb(134 239 172)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          {/* Gauge arc - orange section */}
          <path
            d="M 65 25 A 60 60 0 0 1 135 25"
            stroke="rgb(251 146 60)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          {/* Gauge arc - red section */}
          <path
            d="M 135 25 A 60 60 0 0 1 180 80"
            stroke="rgb(239 68 68)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />

          {/* Needle */}
          <motion.g
            initial={{ rotate: -45 }}
            animate={{ rotate: config.angle }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            style={{ transformOrigin: "100px 80px" }}
          >
            <line x1="100" y1="80" x2="100" y2="30" stroke="#333" strokeWidth="3" />
            <circle cx="100" cy="80" r="6" fill="#333" />
          </motion.g>
        </svg>

        {/* Center value */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0 flex items-end justify-center pb-2"
        >
          <span className="text-sm font-bold text-gray-700">{config.label}</span>
        </motion.div>
      </div>

      {description && <p className="text-center text-sm text-gray-600 max-w-sm">{description}</p>}
    </div>
  )
}
