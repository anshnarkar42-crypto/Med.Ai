"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff } from "lucide-react"
import { SiriWaveAnimation } from "./siri-wave-animation"

interface VoiceButtonWithWaveProps {
  isListening: boolean
  onToggle: () => void
  distressDetected?: boolean
}

export function VoiceButtonWithWave({ isListening, onToggle, distressDetected }: VoiceButtonWithWaveProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Voice Wave */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full"
          >
            <SiriWaveAnimation
              isListening={isListening}
              amplitude={distressDetected ? 1.5 : 1}
              color={distressDetected ? "#EF4444" : "#0B5ED7"}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Microphone Button */}
      <motion.button
        onClick={onToggle}
        className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${
          isListening ? (distressDetected ? "bg-red-500" : "bg-blue-600") : "bg-gray-200"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={
          isListening
            ? {
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.4)",
                  "0 0 0 20px rgba(59, 130, 246, 0)",
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                ],
              }
            : {}
        }
        transition={{
          boxShadow: {
            duration: 1.5,
            repeat: isListening ? Number.POSITIVE_INFINITY : 0,
            ease: "easeOut",
          },
        }}
      >
        {isListening ? <Mic className="w-8 h-8 text-white" /> : <MicOff className="w-8 h-8 text-gray-600" />}
      </motion.button>

      {/* Status Text */}
      <AnimatePresence>
        {isListening && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-sm font-medium ${distressDetected ? "text-red-600" : "text-blue-600"}`}
          >
            {distressDetected ? "⚠️ Distress Detected" : "🎤 Listening..."}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
