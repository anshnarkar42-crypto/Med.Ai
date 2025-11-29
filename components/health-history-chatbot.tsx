"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { getHealthQuestions, type Language, type HealthAnswer } from "@/lib/health-questions"
import { Send } from "lucide-react"

interface Message {
  id: string
  type: "ai" | "user"
  content: string
  timestamp: Date
}

interface HealthHistoryChatbotProps {
  language: Language
  patientId: string
  onComplete: (answers: HealthAnswer[]) => void
}

export function HealthHistoryChatbot({ language, patientId, onComplete }: HealthHistoryChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [answers, setAnswers] = useState<HealthAnswer[]>([])
  const [awaitingDetails, setAwaitingDetails] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState<"yes" | "no" | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const questions = getHealthQuestions(language)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize with greeting
    const greetingText =
      language === "hi"
        ? "नमस्ते! मैं आपसे आपके स्वास्थ्य के बारे में कुछ महत्वपूर्ण सवाल पूछूँगा। कृपया हाँ या नहीं से जवाब दें।"
        : "Hello! I will ask you some important health questions. Please answer with yes or no."

    setMessages([
      {
        id: "0",
        type: "ai",
        content: greetingText,
        timestamp: new Date(),
      },
    ])

    // Ask first question
    setTimeout(() => askQuestion(0), 500)
  }, [language])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const askQuestion = (index: number) => {
    if (index >= questions.length) {
      completeHistory()
      return
    }

    const question = questions[index]
    setMessages((prev) => [
      ...prev,
      {
        id: `q-${index}`,
        type: "ai",
        content: question.question,
        timestamp: new Date(),
      },
    ])
  }

  const handleAnswer = (answer: "yes" | "no") => {
    const question = questions[currentQuestionIndex]

    // Add user response
    setMessages((prev) => [
      ...prev,
      {
        id: `a-${currentQuestionIndex}`,
        type: "user",
        content: language === "hi" ? (answer === "yes" ? "हाँ" : "नहीं") : answer === "yes" ? "Yes" : "No",
        timestamp: new Date(),
      },
    ])

    setCurrentAnswer(answer)

    if (answer === "yes" && question.requiresDetail) {
      // Ask for details
      const detailPrompt = language === "hi" ? "कृपया विवरण दें:" : "Please provide details:"

      setMessages((prev) => [
        ...prev,
        {
          id: `detail-${currentQuestionIndex}`,
          type: "ai",
          content: detailPrompt,
          timestamp: new Date(),
        },
      ])

      setAwaitingDetails(true)
    } else {
      // Move to next question
      saveAnswer(question.id, answer, undefined)
      moveToNextQuestion()
    }
  }

  const handleDetailSubmit = () => {
    if (!userInput.trim()) return

    const question = questions[currentQuestionIndex]

    // Add detail response
    setMessages((prev) => [
      ...prev,
      {
        id: `detail-answer-${currentQuestionIndex}`,
        type: "user",
        content: userInput,
        timestamp: new Date(),
      },
    ])

    saveAnswer(question.id, currentAnswer!, userInput)
    setUserInput("")
    setAwaitingDetails(false)
    setCurrentAnswer(null)

    moveToNextQuestion()
  }

  const saveAnswer = (questionId: string, answer: "yes" | "no", details?: string) => {
    const question = questions.find((q) => q.id === questionId)
    if (!question) return

    setAnswers((prev) => [
      ...prev,
      {
        questionId,
        answer,
        details: answer === "yes" ? details : undefined,
        category: question.category,
      },
    ])
  }

  const moveToNextQuestion = () => {
    setIsLoading(true)

    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1
      setCurrentQuestionIndex(nextIndex)
      setIsLoading(false)

      if (nextIndex < questions.length) {
        askQuestion(nextIndex)
      } else {
        completeHistory()
      }
    }, 800)
  }

  const completeHistory = () => {
    const completionText =
      language === "hi" ? "धन्यवाद! आपका स्वास्थ्य इतिहास सहेजा जा रहा है।" : "Thank you! Your health history is being saved."

    setMessages((prev) => [
      ...prev,
      {
        id: "complete",
        type: "ai",
        content: completionText,
        timestamp: new Date(),
      },
    ])

    setTimeout(() => {
      onComplete(answers)
    }, 1500)
  }

  const handleSkipAll = () => {
    onComplete(answers)
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800">{language === "hi" ? "स्वास्थ्य इतिहास" : "Health History"}</h2>
          <p className="text-sm text-gray-600">
            {language === "hi"
              ? `प्रश्न ${currentQuestionIndex + 1} का ${questions.length}`
              : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-md ${
                  msg.type === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <span className={`text-xs mt-1 block ${msg.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none px-4 py-3 shadow-md">
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {currentQuestionIndex < questions.length && !isLoading && (
        <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-4xl mx-auto">
            {!awaitingDetails ? (
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => handleAnswer("yes")}
                  className="px-8 py-6 text-lg font-semibold bg-green-600 hover:bg-green-700"
                >
                  {language === "hi" ? "हाँ" : "Yes"}
                </Button>
                <Button
                  onClick={() => handleAnswer("no")}
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold border-gray-300"
                >
                  {language === "hi" ? "नहीं" : "No"}
                </Button>
                <Button onClick={handleSkipAll} variant="ghost" className="px-6 text-sm text-gray-600">
                  {language === "hi" ? "छोड़ें" : "Skip"}
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={language === "hi" ? "अपना उत्तर यहाँ लिखें..." : "Enter your answer here..."}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="flex gap-3 justify-end">
                  <Button
                    onClick={() => {
                      setUserInput("")
                      setAwaitingDetails(false)
                      setCurrentAnswer(null)
                    }}
                    variant="outline"
                  >
                    {language === "hi" ? "रद्द करें" : "Cancel"}
                  </Button>
                  <Button
                    onClick={handleDetailSubmit}
                    disabled={!userInput.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {language === "hi" ? "भेजें" : "Send"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
