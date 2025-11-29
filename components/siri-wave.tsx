"use client"
import { motion } from "framer-motion"

interface SiriWaveProps {
  isActive: boolean
  audioLevel?: number
}

export function SiriWave({ isActive, audioLevel = 0 }: SiriWaveProps) {
  return (
    <div className="relative w-full h-24 flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-blue-500/10 rounded-2xl">
      {isActive ? (
        <div className="flex items-center gap-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-blue-600 to-teal-500 rounded-full"
              animate={{
                height: [
                  Math.random() * 20 + 10,
                  Math.random() * 60 + 20,
                  Math.random() * 40 + 15,
                  Math.random() * 50 + 20,
                ],
                scaleY: [1, 1.5, 1, 1.2],
              }}
              transition={{
                duration: 0.8 + Math.random() * 0.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
      ) : (
        <motion.div
          className="text-gray-400 text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Tap microphone to start voice input
        </motion.div>
      )}
    </div>
  )
}
