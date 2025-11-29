"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface RoleCardProps {
  icon: LucideIcon
  title: string
  subtitle: string
  onClick: () => void
  gradient: string
  delay: number
}

export function RoleCard({ icon: Icon, title, subtitle, onClick, gradient, delay }: RoleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, type: "spring", bounce: 0.4 }}
      whileHover={{
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className={`glass-card p-8 rounded-3xl relative overflow-hidden group ${gradient}`}>
        {/* Glow effect on hover */}
        <motion.div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon with animation */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-lg"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-10 h-10 text-blue-600" />
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">{title}</h3>

        {/* Subtitle */}
        <p className="text-gray-600 text-center leading-relaxed">{subtitle}</p>

        {/* Arrow indicator */}
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ x: 0 }}
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="text-2xl">→</div>
        </motion.div>
      </div>
    </motion.div>
  )
}
