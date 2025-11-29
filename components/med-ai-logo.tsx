"use client"

import { motion } from "framer-motion"

export function MedAILogo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* Background Circle with Gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B5ED7" />
            <stop offset="50%" stopColor="#0CC7BD" />
            <stop offset="100%" stopColor="#0B5ED7" />
          </linearGradient>
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0CC7BD" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0B5ED7" stopOpacity="1" />
            <stop offset="100%" stopColor="#0CC7BD" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Outer Circle */}
        <circle cx="28" cy="28" r="26" fill="url(#logoGradient)" opacity="0.1" />
        <circle cx="28" cy="28" r="26" stroke="url(#logoGradient)" strokeWidth="0.5" opacity="0.3" />

        {/* Inner Circle - Main Container */}
        <circle cx="28" cy="28" r="22" fill="url(#logoGradient)" />

        {/* Heartbeat + Brainwave Line forming AI Circuit */}
        <motion.path
          d="M 8 28 L 14 28 L 17 20 L 20 36 L 23 28 L 26 28 L 28 24 L 30 32 L 33 28 L 36 28 L 39 22 L 42 34 L 45 28 L 48 28"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            repeatDelay: 0.5,
          }}
        />

        {/* AI Neural Node Points */}
        <motion.circle
          cx="17"
          cy="20"
          r="1.5"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 0.3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
        />
        <motion.circle
          cx="28"
          cy="24"
          r="1.5"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 0.6, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
        />
        <motion.circle
          cx="39"
          cy="22"
          r="1.5"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 0.9, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
        />

        {/* Subtle Pulse Ring */}
        <motion.circle
          cx="28"
          cy="28"
          r="22"
          stroke="white"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ scale: 1.1, opacity: 0 }}
          transition={{
            duration: 2,
            ease: "easeOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 0.5,
          }}
        />
      </svg>
    </motion.div>
  )
}
