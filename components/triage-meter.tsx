"use client"

import { useEffect, useState } from "react"

interface TriageMeterProps {
  level: number // 0-3
  label: string
}

export function TriageMeter({ level, label }: TriageMeterProps) {
  const [rotation, setRotation] = useState(-90)

  useEffect(() => {
    // Animate needle to position
    const targetRotation = -90 + level * 60
    setTimeout(() => {
      setRotation(targetRotation)
    }, 300)
  }, [level])

  const getColor = () => {
    switch (level) {
      case 0:
        return "#10B981" // Green
      case 1:
        return "#F59E0B" // Yellow
      case 2:
        return "#F97316" // Orange
      case 3:
        return "#EF4444" // Red
      default:
        return "#10B981"
    }
  }

  const getLevelText = () => {
    switch (level) {
      case 0:
        return "Self-Care"
      case 1:
        return "Consult Doctor"
      case 2:
        return "Seek Immediate Care"
      case 3:
        return "Emergency"
      default:
        return "Normal"
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-32">
        {/* Semi-circle background */}
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Color bands */}
          <path d="M 20 80 A 60 60 0 0 1 80 20" fill="none" stroke="#10B981" strokeWidth="20" />
          <path d="M 80 20 A 60 60 0 0 1 120 20" fill="none" stroke="#F59E0B" strokeWidth="20" />
          <path d="M 120 20 A 60 60 0 0 1 180 80" fill="none" stroke="#F97316" strokeWidth="20" />
          <path d="M 170 85 A 5 5 0 0 1 180 80" fill="none" stroke="#EF4444" strokeWidth="20" />

          {/* Needle */}
          <line
            x1="100"
            y1="80"
            x2="100"
            y2="30"
            stroke={getColor()}
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              transformOrigin: "100px 80px",
              transform: `rotate(${rotation}deg)`,
              transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* Center dot */}
          <circle cx="100" cy="80" r="6" fill={getColor()} />
        </svg>
      </div>

      {/* Level indicator */}
      <div className="mt-4 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white"
          style={{ backgroundColor: getColor() }}
        >
          <span className="text-2xl">Level {level}</span>
          <span className="text-sm">({getLevelText()})</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{label}</p>
      </div>
    </div>
  )
}
