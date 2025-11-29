"use client"

import type React from "react"

import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle, Pill } from "lucide-react"

interface Recommendation {
  type: "do" | "medicine" | "warning"
  text: string
  priority?: "low" | "medium" | "high"
}

interface RecommendationsSectionProps {
  title: string
  items: Recommendation[]
  icon?: React.ReactNode
}

export function RecommendationsSection({ title, items, icon }: RecommendationsSectionProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "do":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "medicine":
        return <Pill className="w-5 h-5 text-blue-600" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      default:
        return null
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors"
          >
            {getIcon(item.type)}
            <div className="flex-1">
              <p className="text-sm text-gray-700">{item.text}</p>
              {item.priority && (
                <span
                  className={`text-xs mt-1 inline-block px-2 py-1 rounded ${
                    item.priority === "high"
                      ? "bg-red-100 text-red-700"
                      : item.priority === "medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.priority.toUpperCase()}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
