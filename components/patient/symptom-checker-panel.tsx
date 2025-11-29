"use client"

import { useState } from "react"
import { Zap, Mic, Activity, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import { dummySymptomAnalysis } from "@/lib/dummy-data"
import { useAuth } from "@/lib/auth-context"

export function SymptomCheckerPanel() {
  const { user } = useAuth()
  const [symptoms, setSymptoms] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return
    setIsAnalyzing(true)

    try {
      const healthHistoryResponse = await fetch(`/api/patient/health-history?patientId=${user?.id}`)
      const healthHistory = await healthHistoryResponse.json()

      // Store health history in sessionStorage for AI context
      if (healthHistory.data) {
        sessionStorage.setItem("patient-health-history", JSON.stringify(healthHistory.data))
      }
    } catch (error) {
      console.error("[v0] Error fetching health history:", error)
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))
    setShowResults(true)
    setIsAnalyzing(false)
  }

  if (showResults) {
    const analysis = dummySymptomAnalysis
    return (
      <div className="glass-card space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">AI Analysis Results</h2>
          <button
            onClick={() => {
              setShowResults(false)
              setSymptoms("")
            }}
            className="text-sm text-primary hover:underline"
          >
            New Analysis
          </button>
        </div>

        {/* Urgency Badge */}
        <div
          className={`p-4 rounded-lg border-l-4 flex items-center gap-3 ${
            analysis.urgency === "emergency"
              ? "bg-destructive/10 border-destructive"
              : analysis.urgency === "opd"
                ? "bg-warning/10 border-warning"
                : "bg-success/10 border-success"
          }`}
        >
          {analysis.urgency === "emergency" && <AlertTriangle className="w-5 h-5 text-destructive" />}
          {analysis.urgency === "opd" && <TrendingUp className="w-5 h-5 text-warning" />}
          {analysis.urgency === "self-care" && <CheckCircle className="w-5 h-5 text-success" />}
          <div>
            <p className="font-semibold capitalize">{analysis.urgency} Treatment</p>
            <p className="text-sm text-muted-foreground">
              {analysis.urgency === "emergency" && "Requires immediate medical attention"}
              {analysis.urgency === "opd" && "Schedule appointment with doctor today"}
              {analysis.urgency === "self-care" && "Self-care advised, monitor symptoms"}
            </p>
          </div>
        </div>

        {/* Possible Conditions */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Possible Conditions</h3>
          <div className="space-y-2">
            {analysis.conditions.map((condition) => (
              <div key={condition.id} className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-foreground">{condition.name}</p>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    {Math.round(condition.probability * 100)}% likely
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                    style={{ width: `${condition.probability * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{condition.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Recommendations</h3>
          <div className="space-y-2">
            {analysis.recommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button className="flex-1 py-2 rounded-lg gradient-primary text-white font-semibold hover:shadow-lg transition-smooth">
            Talk to Doctor
          </button>
          <button className="flex-1 py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/5 transition-smooth">
            Download Report
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card space-y-4">
      <div className="flex items-center gap-2">
        <div className="gradient-primary rounded-lg p-2">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">AI Symptom Checker</h2>
      </div>
      <p className="text-sm text-muted-foreground">Describe your symptoms and let our AI analyze them intelligently</p>

      {/* Input Area */}
      <div className="space-y-3">
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="E.g., I have chest pain and shortness of breath for the last 2 hours..."
          className="w-full px-4 py-3 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-24 resize-none"
        />

        {/* Options Row */}
        <div className="flex gap-3 flex-wrap">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth text-sm text-foreground">
            <Mic className="w-4 h-4" />
            Voice Input
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth text-sm text-foreground">
            <Activity className="w-4 h-4" />
            Body Area
          </button>
        </div>
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing || !symptoms.trim()}
        className={`w-full py-2 rounded-lg font-semibold text-white transition-smooth ${
          isAnalyzing || !symptoms.trim()
            ? "bg-primary/60 cursor-not-allowed"
            : "gradient-primary hover:shadow-lg active:scale-98"
        }`}
      >
        {isAnalyzing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            Analyzing...
          </div>
        ) : (
          "Analyze with Med.AI"
        )}
      </button>
    </div>
  )
}
