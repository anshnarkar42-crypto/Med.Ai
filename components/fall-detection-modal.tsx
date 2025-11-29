"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function FallDetectionModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const router = useRouter()

  // Simulate fall detection (in real app, this would listen to device accelerometer)
  useEffect(() => {
    // Demo: trigger after 30 seconds
    const demoTimer = setTimeout(() => {
      // Simulate random fall detection for demo purposes
      if (Math.random() > 0.8) {
        setIsVisible(true)
      }
    }, 30000)

    return () => clearTimeout(demoTimer)
  }, [])

  useEffect(() => {
    if (isVisible && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && isVisible) {
      handleNeedHelp()
    }
  }, [countdown, isVisible])

  const handleNeedHelp = () => {
    setIsVisible(false)
    router.push("/patient/emergency")
  }

  const handleImOkay = () => {
    setIsVisible(false)
    setCountdown(10)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="glass-card bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-red-500"
          >
            {/* Pulsing alert icon */}
            <motion.div
              className="flex justify-center mb-6"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center relative">
                <AlertTriangle className="w-12 h-12 text-white" />
                {/* Pulsing rings */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 border-4 border-red-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 2],
                      opacity: [0.6, 0.3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.6,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Fall Detected!</h2>

            {/* Message */}
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              A sudden movement was detected. Are you okay?
            </p>

            {/* Countdown */}
            <motion.div
              className="text-center mb-8"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="text-6xl font-bold text-red-600 dark:text-red-400 mb-2">{countdown}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Emergency will be triggered automatically</p>
            </motion.div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleImOkay}
                size="lg"
                variant="outline"
                className="h-20 text-lg font-semibold border-2 border-green-500 text-green-700 hover:bg-green-50 dark:hover:bg-green-950/20 bg-transparent"
              >
                <div className="flex flex-col items-center gap-2">
                  <Check className="w-8 h-8" />
                  <span>I'm Okay</span>
                </div>
              </Button>

              <Button
                onClick={handleNeedHelp}
                size="lg"
                className="h-20 text-lg font-semibold bg-red-600 hover:bg-red-700"
              >
                <div className="flex flex-col items-center gap-2">
                  <AlertTriangle className="w-8 h-8" />
                  <span>I Need Help</span>
                </div>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
