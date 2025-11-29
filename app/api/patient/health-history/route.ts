import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import type { HealthAnswer } from "@/lib/health-questions"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { patientId, language, answers } = body as {
      patientId: string
      language: "en" | "hi"
      answers: HealthAnswer[]
    }

    if (!patientId || !answers || answers.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // Save each answer to patient_health_answers table
    for (const answer of answers) {
      const { error } = await supabase.from("patient_health_answers").insert({
        patient_id: patientId,
        question_id: answer.questionId,
        answer_text: answer.answer,
        answer_value: {
          details: answer.details,
          category: answer.category,
          language,
        },
        created_at: new Date().toISOString(),
      })

      if (error) {
        console.error("[v0] Error saving answer:", error)
      }
    }

    // Update patient profile with last_health_history_date
    await supabase.from("patients").update({ last_health_history_date: new Date().toISOString() }).eq("id", patientId)

    return NextResponse.json({
      success: true,
      message: "Health history saved successfully",
      answersCount: answers.length,
    })
  } catch (error) {
    console.error("[v0] Health history API error:", error)
    return NextResponse.json({ error: "Failed to save health history" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const patientId = searchParams.get("patientId")

    if (!patientId) {
      return NextResponse.json({ error: "Patient ID is required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Fetch all health answers for the patient
    const { data: answers, error } = await supabase
      .from("patient_health_answers")
      .select(
        `
        id,
        question_id,
        answer_text,
        answer_value,
        created_at,
        health_questions(id, question_text, category)
      `,
      )
      .eq("patient_id", patientId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching health history:", error)
      return NextResponse.json({ error: "Failed to fetch health history" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: answers || [],
    })
  } catch (error) {
    console.error("[v0] Health history GET error:", error)
    return NextResponse.json({ error: "Failed to fetch health history" }, { status: 500 })
  }
}
