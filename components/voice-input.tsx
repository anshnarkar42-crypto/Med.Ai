"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { VoiceRecognition, SUPPORTED_LANGUAGES } from "@/lib/voice-recognition"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Mic, MicOff } from "lucide-react"

interface VoiceInputProps {
  onTranscript: (text: string, isFinal: boolean) => void
  continuous?: boolean
  language?: string
}

export function VoiceInput({ onTranscript, continuous = false, language = "en-US" }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const recognitionRef = useRef<VoiceRecognition | null>(null)
  const [audioLevel, setAudioLevel] = useState(0)

  useEffect(() => {
    const voiceRecognition = new VoiceRecognition({
      language: selectedLanguage,
      continuous,
      interimResults: true,
      onResult: (transcript, isFinal) => {
        onTranscript(transcript, isFinal)
        // Simulate audio level animation
        if (!isFinal) {
          setAudioLevel(Math.random() * 100)
        }
      },
      onError: (error) => {
        if (error !== "aborted") {
          console.error("[v0] Voice recognition error:", error)
        }
        setIsListening(false)
      },
      onEnd: () => {
        setIsListening(false)
        setAudioLevel(0)
      },
    })

    recognitionRef.current = voiceRecognition

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [selectedLanguage, continuous, onTranscript])

  const toggleListening = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const handleLanguageChange = (lang: string) => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
    setSelectedLanguage(lang)
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.nativeName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          onClick={toggleListening}
          size="lg"
          className={`relative overflow-hidden ${
            isListening
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
          }`}
        >
          {/* Pulse animation when listening */}
          {isListening && (
            <motion.div
              className="absolute inset-0 bg-white"
              animate={{ opacity: [0, 0.3, 0], scale: [1, 1.5, 2] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          )}

          <div className="relative z-10 flex items-center gap-2">
            {isListening ? (
              <>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <MicOff className="w-5 h-5" />
                </motion.div>
                <span>Stop</span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
                <span>Voice</span>
              </>
            )}
          </div>
        </Button>
      </motion.div>

      {isListening && (
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-blue-600 rounded-full"
              animate={{
                height: [10, 30, 15, 25, 10],
              }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
