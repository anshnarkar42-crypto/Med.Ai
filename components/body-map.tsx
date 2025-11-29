"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface BodyMapProps {
  open: boolean
  onClose: () => void
  onSelectArea: (area: string) => void
}

const BODY_AREAS = [
  { id: "head", name: "Head", x: 50, y: 10 },
  { id: "neck", name: "Neck", x: 50, y: 18 },
  { id: "chest", name: "Chest", x: 50, y: 30 },
  { id: "abdomen", name: "Abdomen", x: 50, y: 42 },
  { id: "left-arm", name: "Left Arm", x: 30, y: 35 },
  { id: "right-arm", name: "Right Arm", x: 70, y: 35 },
  { id: "left-leg", name: "Left Leg", x: 40, y: 70 },
  { id: "right-leg", name: "Right Leg", x: 60, y: 70 },
  { id: "back", name: "Back", x: 50, y: 35 },
]

export function BodyMap({ open, onClose, onSelectArea }: BodyMapProps) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)

  const handleSelectArea = (area: string) => {
    setSelectedArea(area)
    onSelectArea(area)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Select Pain/Symptom Location</DialogTitle>
          <DialogDescription>Click on the body area where you're experiencing symptoms</DialogDescription>
        </DialogHeader>

        <div className="relative w-full aspect-[2/3] max-h-[500px] bg-muted/20 rounded-lg overflow-hidden">
          {/* Simple body outline */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Head */}
            <circle cx="50" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />

            {/* Neck */}
            <line x1="50" y1="18" x2="50" y2="22" stroke="currentColor" strokeWidth="0.5" />

            {/* Body */}
            <rect x="40" y="22" width="20" height="30" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />

            {/* Arms */}
            <line x1="40" y1="25" x2="25" y2="45" stroke="currentColor" strokeWidth="0.5" />
            <line x1="60" y1="25" x2="75" y2="45" stroke="currentColor" strokeWidth="0.5" />

            {/* Legs */}
            <line x1="45" y1="52" x2="42" y2="85" stroke="currentColor" strokeWidth="0.5" />
            <line x1="55" y1="52" x2="58" y2="85" stroke="currentColor" strokeWidth="0.5" />

            {/* Interactive hotspots */}
            {BODY_AREAS.map((area) => (
              <g key={area.id}>
                <circle
                  cx={area.x}
                  cy={area.y}
                  r="8"
                  fill={selectedArea === area.id ? "red" : hoveredArea === area.id ? "orange" : "transparent"}
                  fillOpacity="0.3"
                  stroke={selectedArea === area.id ? "red" : "currentColor"}
                  strokeWidth="1"
                  className="cursor-pointer transition-all"
                  onClick={() => handleSelectArea(area.name)}
                  onMouseEnter={() => setHoveredArea(area.id)}
                  onMouseLeave={() => setHoveredArea(null)}
                />
                {(hoveredArea === area.id || selectedArea === area.id) && (
                  <text x={area.x} y={area.y - 10} textAnchor="middle" className="text-xs fill-current font-medium">
                    {area.name}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>

        <div className="flex flex-wrap gap-2">
          {BODY_AREAS.map((area) => (
            <Button
              key={area.id}
              variant={selectedArea === area.name ? "default" : "outline"}
              size="sm"
              onClick={() => handleSelectArea(area.name)}
            >
              {area.name}
            </Button>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose} disabled={!selectedArea}>
            Confirm Selection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
