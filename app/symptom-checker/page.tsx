"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { SymptomCheckerPanel } from "@/components/patient/symptom-checker-panel"

export default function SymptomCheckerPage() {
  const { user, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  if (!user) return null

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span>⚡</span>
              <span className="text-sm text-primary font-medium">AI-Powered Analysis</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Symptom Checker</h1>
            <p className="text-muted-foreground">Describe your symptoms and get AI-powered insights</p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="glass-card p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 text-lg">
                ⚡
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Instant Analysis</p>
                <p className="text-xs text-muted-foreground">Get results in seconds</p>
              </div>
            </div>
            <div className="glass-card p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0 text-lg">
                📊
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Probability Scores</p>
                <p className="text-xs text-muted-foreground">See condition likelihoods</p>
              </div>
            </div>
            <div className="glass-card p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0 text-lg">
                📖
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Medical Guidance</p>
                <p className="text-xs text-muted-foreground">Evidence-based recommendations</p>
              </div>
            </div>
          </div>

          {/* Main Checker */}
          <SymptomCheckerPanel />
        </div>
      </main>
    </>
  )
}
