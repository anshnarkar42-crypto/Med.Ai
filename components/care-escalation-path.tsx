"use client"

import { motion } from "framer-motion"

interface PathStep {
  number: number
  title: string
  description: string
  icon: string
}

interface CareEscalationPathProps {
  steps: PathStep[]
}

export function CareEscalationPath({ steps }: CareEscalationPathProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800">Care Escalation Path</h3>
      <div className="space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4"
          >
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                  i === 0 ? "bg-green-500" : i === 1 ? "bg-orange-500" : "bg-red-500"
                }`}
              >
                {step.number}
              </motion.div>
              {i < steps.length - 1 && <div className="w-1 h-12 bg-gradient-to-b from-gray-300 to-gray-200 mt-2" />}
            </div>

            {/* Step content */}
            <div className="pb-4">
              <h4 className="font-semibold text-gray-800">{step.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
