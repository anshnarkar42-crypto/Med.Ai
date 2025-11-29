"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Doctor {
  id: string
  name: string
  specialization: string
  rating: number
  experience: number
  fee: number
  distance: string
  avatar: string
  available: boolean
}

interface DoctorCarouselProps {
  doctors: Doctor[]
  onBook: (doctor: Doctor) => void
}

export function DoctorCarousel({ doctors, onBook }: DoctorCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filterSpec, setFilterSpec] = useState<string>("all")
  const [filterFee, setFilterFee] = useState<number>(10000)

  const filteredDoctors = doctors.filter((doctor) => {
    const specMatch = filterSpec === "all" || doctor.specialization === filterSpec
    const feeMatch = doctor.fee <= filterFee
    return specMatch && feeMatch
  })

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredDoctors.length)
  }

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredDoctors.length) % filteredDoctors.length)
  }

  const specializations = ["all", ...Array.from(new Set(doctors.map((d) => d.specialization)))]

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Specialization</label>
          <select
            value={filterSpec}
            onChange={(e) => setFilterSpec(e.target.value)}
            className="block w-full mt-1 rounded-md border border-input bg-background px-3 py-2"
          >
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec === "all" ? "All Specializations" : spec}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Max Fee: ₹{filterFee}</label>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={filterFee}
            onChange={(e) => setFilterFee(Number.parseInt(e.target.value))}
            className="block w-full mt-1"
          />
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="min-w-full px-2">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <div className="w-full h-full flex items-center justify-center text-4xl">👨‍⚕️</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1">⭐ {doctor.rating}</span>
                        <span>{doctor.experience} yrs exp</span>
                        <span>{doctor.distance}</span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold">₹{doctor.fee}</span>
                        <Button onClick={() => onBook(doctor)} disabled={!doctor.available}>
                          {doctor.available ? "Book Now" : "Unavailable"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {filteredDoctors.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-transparent"
              onClick={previous}
            >
              ←
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-transparent"
              onClick={next}
            >
              →
            </Button>
          </>
        )}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2">
        {filteredDoctors.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
