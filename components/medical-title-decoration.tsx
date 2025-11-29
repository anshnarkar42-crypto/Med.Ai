"use client"

import { motion } from "framer-motion"
import { Heart, Activity, Dna, Pill, Microscope, Droplet } from "lucide-react"

export function MedicalTitleDecoration() {
  const medicalIcons = [
    { Icon: Heart, position: "top-0 left-0", delay: 0.2, color: "text-red-400" },
    { Icon: Activity, position: "top-0 right-0", delay: 0.4, color: "text-blue-400" },
    { Icon: Dna, position: "bottom-0 left-0", delay: 0.6, color: "text-purple-400" },
    { Icon: Pill, position: "bottom-0 right-0", delay: 0.8, color: "text-teal-400" },
    { Icon: Microscope, position: "top-1/2 -left-8", delay: 1.0, color: "text-indigo-400" },
    { Icon: Droplet, position: "top-1/2 -right-8", delay: 1.2, color: "text-cyan-400" },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      {medicalIcons.map(({ Icon, position, delay, color }, i) => (
        <motion.div
          key={i}
          className={`absolute ${position}`}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            delay,
            type: "spring",
            stiffness: 200,
          }}
        >
          <Icon className={`w-16 h-16 md:w-24 md:h-24 ${color}`} strokeWidth={1.5} />
        </motion.div>
      ))}

      {/* DNA Helix Pattern */}
      <motion.div
        className="absolute top-1/4 left-1/4 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05, rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <Dna className="w-32 h-32 text-blue-600" strokeWidth={1} />
      </motion.div>

      {/* Heartbeat Pattern */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <Activity className="w-32 h-32 text-red-600" strokeWidth={1} />
      </motion.div>
    </div>
  )
}
