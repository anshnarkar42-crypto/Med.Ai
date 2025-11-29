export interface VoiceRecognitionConfig {
  language: string
  continuous: boolean
  interimResults: boolean
  onResult: (transcript: string, isFinal: boolean) => void
  onError?: (error: string) => void
  onEnd?: () => void
}

export interface EmergencyDetection {
  isEmergency: boolean
  confidence: "high" | "medium" | "low"
  detectedKeywords: string[]
  transcript: string
  language: string
}

const WAKE_WORDS = ["medai", "med.ai", "med ai", "hey medai", "med ai madad", "med ai madad karo", "hey med ai"]

const EMERGENCY_KEYWORDS = [
  "help",
  "dying",
  "can't breathe",
  "cant breathe",
  "fainting",
  "coughing blood",
  "poisoned",
  "severe pain",
  "chest pain",
  "blood",
  "emergency",
  "ambulance",
  "madad",
  "bachao",
]

export class VoiceRecognition {
  private recognition: any
  private isListening = false
  private config: VoiceRecognitionConfig
  private isStopping = false

  constructor(config: VoiceRecognitionConfig) {
    this.config = config
    this.initRecognition()
  }

  private initRecognition() {
    if (typeof window === "undefined") return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      console.warn("[v0] Speech Recognition not supported")
      return
    }

    this.recognition = new SpeechRecognition()
    this.recognition.lang = this.config.language
    this.recognition.continuous = this.config.continuous
    this.recognition.interimResults = this.config.interimResults

    this.recognition.onresult = (event: any) => {
      const last = event.results.length - 1
      const transcript = event.results[last][0].transcript
      const isFinal = event.results[last].isFinal

      this.config.onResult(transcript, isFinal)
    }

    this.recognition.onerror = (event: any) => {
      if (event.error === "aborted" && this.isStopping) {
        // Ignore aborted errors when we're intentionally stopping
        return
      }
      if (event.error !== "no-speech" && event.error !== "aborted") {
        console.error("[v0] Speech recognition error:", event.error)
        this.config.onError?.(event.error)
      }
    }

    this.recognition.onend = () => {
      this.isListening = false
      this.isStopping = false
      this.config.onEnd?.()
    }
  }

  start() {
    if (!this.recognition || this.isListening) return
    try {
      this.isStopping = false
      this.recognition.start()
      this.isListening = true
    } catch (error) {
      console.error("[v0] Failed to start recognition:", error)
    }
  }

  stop() {
    if (!this.recognition || !this.isListening) return
    try {
      this.isStopping = true
      this.recognition.stop()
      this.isListening = false
    } catch (error) {
      console.error("[v0] Failed to stop recognition:", error)
    }
  }

  getIsListening() {
    return this.isListening
  }

  setLanguage(language: string) {
    if (this.recognition) {
      this.recognition.lang = language
    }
  }

  static detectEmergency(transcript: string, language: string): EmergencyDetection {
    const lowerTranscript = transcript.toLowerCase()

    // Check for wake words
    const hasWakeWord = WAKE_WORDS.some((word) => lowerTranscript.includes(word.toLowerCase()))

    // Check for emergency keywords
    const detectedKeywords = EMERGENCY_KEYWORDS.filter((keyword) => lowerTranscript.includes(keyword.toLowerCase()))

    const isEmergency = hasWakeWord || detectedKeywords.length > 0

    // Calculate confidence
    let confidence: "high" | "medium" | "low" = "low"
    if (hasWakeWord && detectedKeywords.length >= 2) {
      confidence = "high"
    } else if (hasWakeWord || detectedKeywords.length >= 1) {
      confidence = "medium"
    }

    return {
      isEmergency,
      confidence,
      detectedKeywords,
      transcript,
      language,
    }
  }
}

export const SUPPORTED_LANGUAGES = [
  { code: "en-US", name: "English", nativeName: "English" },
  { code: "hi-IN", name: "Hindi", nativeName: "हिंदी" },
  { code: "mr-IN", name: "Marathi", nativeName: "मराठी" },
  { code: "ta-IN", name: "Tamil", nativeName: "தமிழ்" },
  { code: "gu-IN", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "bn-IN", name: "Bengali", nativeName: "বাংলা" },
]
