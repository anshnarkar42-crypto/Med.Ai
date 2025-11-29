"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const floatingIcons = [
    { icon: "🏥", delay: 0, x: [0, 100, 0], y: [0, -100, 0] },
    { icon: "💊", delay: 0.5, x: [0, -80, 0], y: [0, 80, 0] },
    { icon: "🩺", delay: 1, x: [0, 120, 0], y: [0, -60, 0] },
    { icon: "💉", delay: 1.5, x: [0, -100, 0], y: [0, 100, 0] },
    { icon: "🔬", delay: 2, x: [0, 80, 0], y: [0, -80, 0] },
    { icon: "⚕️", delay: 2.5, x: [0, -120, 0], y: [0, 60, 0] },
  ]

  const getRandomPosition = (index: number) => {
    if (!isMounted) {
      return { x: 0, y: 0 }
    }
    return {
      x: (Math.random() * window.innerWidth) % 1200,
      y: (Math.random() * window.innerHeight) % 800,
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-white" />

      {floatingIcons.map((item, i) => {
        const pos = getRandomPosition(i)
        return (
          <motion.div
            key={i}
            className="absolute text-6xl opacity-10"
            initial={{ x: pos.x, y: pos.y }}
            animate={{
              x: item.x,
              y: item.y,
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            {item.icon}
          </motion.div>
        )
      })}

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-300 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
