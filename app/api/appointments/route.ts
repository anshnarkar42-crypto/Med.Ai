import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { patientId, doctorId, dateTime, consultationType, reason, recommendationId } = await request.json()

    const supabase = await createClient()

    // Create appointment
    const { data: appointment, error: appointmentError } = await supabase
      .from("appointments")
      .insert({
        patient_id: patientId,
        doctor_id: doctorId,
        date_time: dateTime,
        consultation_type: consultationType,
        reason,
        recommendation_id: recommendationId,
        status: "scheduled",
      })
      .select()
      .single()

    if (appointmentError) {
      console.error("[v0] Error creating appointment:", appointmentError)
      return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
    }

    // Get patient and doctor details for confirmation
    const { data: patient } = await supabase.from("patients").select("email, name").eq("id", patientId).single()

    const { data: doctor } = await supabase.from("doctors").select("email, name").eq("id", doctorId).single()

    // Send confirmation (in production, use email service)
    console.log("[v0] Appointment confirmation:", {
      patientEmail: patient?.email,
      doctorEmail: doctor?.email,
      appointmentId: appointment.id,
      dateTime,
    })

    return NextResponse.json({
      success: true,
      appointment,
      confirmation: {
        appointmentId: appointment.id,
        patientName: patient?.name,
        doctorName: doctor?.name,
        dateTime,
        consultationType,
        confirmationMessage: `Your appointment has been confirmed. ${doctor?.name} will see you on ${new Date(dateTime).toLocaleDateString()} at ${new Date(dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      },
    })
  } catch (error) {
    console.error("[v0] Appointment error:", error)
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
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

    const { data: appointments, error } = await supabase
      .from("appointments")
      .select(
        `
        *,
        doctors:doctor_id(name, specialization, email, avatar),
        recommendations:recommendation_id(recommendation_text)
      `,
      )
      .eq("patient_id", patientId)
      .order("date_time", { ascending: true })

    if (error) {
      console.error("[v0] Error fetching appointments:", error)
      return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: appointments || [],
    })
  } catch (error) {
    console.error("[v0] GET appointments error:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}
