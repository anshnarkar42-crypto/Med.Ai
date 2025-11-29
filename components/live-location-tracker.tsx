"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Navigation, Radio } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
  address?: string
}

export function LiveLocationTracker() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startTracking = () => {
    if ("geolocation" in navigator) {
      setIsTracking(true)
      setError(null)

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
            address: "Fetching address...", // In real app, use reverse geocoding
          }
          setLocation(locationData)

          // Simulate address resolution
          setTimeout(() => {
            setLocation({
              ...locationData,
              address: "123 Healthcare Street, Medical District, Mumbai, Maharashtra",
            })
          }, 1500)
        },
        (error) => {
          setError("Unable to get location. Please enable location services.")
          setIsTracking(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      )
    } else {
      setError("Geolocation is not supported by your browser")
    }
  }

  const stopTracking = () => {
    setIsTracking(false)
    setLocation(null)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Navigation className="w-6 h-6 text-blue-600" />
          Live Location Tracking
        </h3>
        {isTracking && (
          <motion.div
            className="flex items-center gap-2 text-sm text-green-600"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <Radio className="w-4 h-4" />
            Live
          </motion.div>
        )}
      </div>

      {!isTracking && !location && (
        <div className="text-center py-8">
          <motion.div
            className="w-24 h-24 mx-auto mb-6 bg-blue-100 dark:bg-blue-950/20 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <MapPin className="w-12 h-12 text-blue-600" />
          </motion.div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Enable live location tracking to share your real-time position with emergency services
          </p>
          <Button onClick={startTracking} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Start Tracking
          </Button>
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400"
        >
          {error}
        </motion.div>
      )}

      {isTracking && location && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* Map preview placeholder */}
          <div className="relative h-48 bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-950/20 dark:to-teal-950/20 rounded-xl overflow-hidden flex items-center justify-center">
            <motion.div
              className="absolute inset-0 bg-blue-400/20"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <MapPin className="w-16 h-16 text-blue-600" />
            </motion.div>
          </div>

          {/* Location details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Latitude</div>
              <div className="font-mono font-semibold">{location.latitude.toFixed(6)}</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Longitude</div>
              <div className="font-mono font-semibold">{location.longitude.toFixed(6)}</div>
            </div>
          </div>

          {location.address && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Current Address</div>
              <div className="font-medium">{location.address}</div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Accuracy: ±{Math.round(location.accuracy)}m</span>
            <span>Updated: {new Date(location.timestamp).toLocaleTimeString()}</span>
          </div>

          <Button onClick={stopTracking} variant="outline" className="w-full bg-transparent">
            Stop Tracking
          </Button>
        </motion.div>
      )}
    </Card>
  )
}
