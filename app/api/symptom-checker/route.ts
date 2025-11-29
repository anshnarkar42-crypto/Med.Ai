import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

async function analyzeSymptoms(
  symptoms: string,
  patientAge: number,
  patientGender: string,
  medicalHistory: string,
  currentMedications: string[],
  allergies: string[],
) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  const prompt = `You are a medical AI assistant. Analyze the following patient symptoms and provide a severity assessment.

Patient Information:
- Age: ${patientAge}
- Gender: ${patientGender}
- Medical History: ${medicalHistory || "None provided"}
- Current Medications: ${currentMedications.join(", ") || "None"}
- Allergies: ${allergies.join(", ") || "None"}

Symptoms: ${symptoms}

Provide your analysis in the following JSON format:
{
  "severity": "mild" | "moderate" | "severe",
  "conditions": [
    {
      "name": "condition name",
      "probability": 0.0-1.0,
      "description": "brief description"
    }
  ],
  "recommendations": [
    {
      "type": "medicine" | "consultation" | "emergency",
      "text": "recommendation text",
      "priority": "low" | "medium" | "high"
    }
  ],
  "medicines": [
    {
      "name": "medicine name",
      "dosage": "dosage",
      "frequency": "frequency",
      "duration": "duration",
      "instructions": "instructions"
    }
  ],
  "nextSteps": "string describing next steps",
  "warningSignsToWatch": ["sign1", "sign2"],
  "requiresImmediateAttention": true | false
}

Make sure to:
1. For MILD symptoms: suggest over-the-counter medicines and home care
2. For MODERATE symptoms: recommend doctor consultation and provide appointment booking option
3. For SEVERE symptoms: indicate emergency and suggest nearest hospital
4. Always consider patient's medical history, allergies, and current medications
5. Be conservative - if unsure, escalate to higher severity`

  const result = await model.generateContent(prompt)
  const response = result.response
  const text = response.text()

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
  } catch (error) {
    console.error("[v0] Error parsing Gemini response:", error)
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const { patientId, symptoms, age, gender, medicalHistory, medications, allergies } = await request.json()

    console.log("[v0] Analyzing symptoms with Gemini (server-side)...")

    const analysis = await analyzeSymptoms(symptoms, age, gender, medicalHistory, medications, allergies)

    if (!analysis) {
      return NextResponse.json({ error: "Failed to analyze symptoms" }, { status: 500 })
    }

    console.log("[v0] Analysis result:", analysis)

    const supabase = await createClient()

    // Save analysis to database
    const { data: record, error: saveError } = await supabase
      .from("patient_history")
      .insert({
        patient_id: patientId,
        symptoms,
        analysis,
        severity: analysis.severity,
        requires_immediate_attention: analysis.requiresImmediateAttention,
      })
      .select()
      .single()

    if (saveError) {
      console.error("[v0] Error saving analysis:", saveError)
    }

    // Save recommendations
    if (analysis.recommendations) {
      for (const rec of analysis.recommendations) {
        const { error } = await supabase.from("patient_recommendations").insert({
          patient_id: patientId,
          recommendation_text: rec.text,
          urgency_level: rec.priority,
          action_type: rec.type,
        })

        if (error) {
          console.error("[v0] Error saving recommendation:", error)
        }
      }
    }

    return NextResponse.json({
      success: true,
      analysis: {
        severity: analysis.severity,
        conditions: analysis.conditions,
        recommendations: analysis.recommendations,
        medicines: analysis.medicines,
        nextSteps: analysis.nextSteps,
        warningSignsToWatch: analysis.warningSignsToWatch,
        requiresImmediateAttention: analysis.requiresImmediateAttention,
      },
      historyId: record?.id,
    })
  } catch (error) {
    console.error("[v0] Symptom checker error:", error)
    return NextResponse.json({ error: "Failed to analyze symptoms" }, { status: 500 })
  }
}
