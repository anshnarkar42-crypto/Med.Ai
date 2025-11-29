"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SiriWaveAnimationProps {
  isListening: boolean
  amplitude?: number
  color?: string
}

export function SiriWaveAnimation({ isListening, amplitude = 1, color = "#0B5ED7" }: SiriWaveAnimationProps) {
  const [waves, setWaves] = useState<number[]>([])

  useEffect(() => {
    setWaves(Array.from({ length: 50 }, () => Math.random()))
  }, [])

  return (
    <div className="flex items-center justify-center h-32 gap-1">
      {waves.map((randomHeight, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{
            background: color,
            opacity: 0.6,
          }}
          initial={{ height: 4 }}
          animate={{
            height: isListening ? [4, randomHeight * 80 * amplitude + 20, 4] : 4,
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.4,
            repeat: isListening ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
            delay: i * 0.02,
          }}
        />
      ))}
    </div>
  )
}
