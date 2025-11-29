"use client"

import { motion } from "framer-motion"

export function MedAILogoBackground() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.08, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <svg
        width="800"
        height="800"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-5xl"
      >
        <defs>
          <linearGradient id="bgLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B5ED7" />
            <stop offset="50%" stopColor="#0CC7BD" />
            <stop offset="100%" stopColor="#0B5ED7" />
          </linearGradient>
        </defs>

        {/* Large Background Circle */}
        <circle cx="400" cy="400" r="350" fill="url(#bgLogoGradient)" opacity="0.15" />

        {/* Heartbeat + Brainwave Pattern - Larger */}
        <motion.path
          d="M 50 400 L 150 400 L 200 250 L 250 550 L 300 400 L 350 400 L 400 300 L 450 500 L 500 400 L 550 400 L 600 280 L 650 520 L 700 400 L 750 400"
          stroke="url(#bgLogoGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            repeatDelay: 1,
          }}
        />

        {/* AI Neural Nodes */}
        {[
          { cx: 200, cy: 250 },
          { cx: 400, cy: 300 },
          { cx: 600, cy: 280 },
          { cx: 250, cy: 550 },
          { cx: 450, cy: 500 },
          { cx: 650, cy: 520 },
        ].map((node, i) => (
          <motion.circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r="8"
            fill="url(#bgLogoGradient)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 0.8, 0.6] }}
            transition={{
              duration: 0.8,
              delay: i * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
          />
        ))}

        {/* Expanding Pulse Rings */}
        <motion.circle
          cx="400"
          cy="400"
          r="350"
          stroke="url(#bgLogoGradient)"
          strokeWidth="3"
          fill="none"
          opacity="0.3"
          initial={{ scale: 0.8, opacity: 0.3 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{
            duration: 3,
            ease: "easeOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
          }}
        />
      </svg>
    </motion.div>
  )
}
