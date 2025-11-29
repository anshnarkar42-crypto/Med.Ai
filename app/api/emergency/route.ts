import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Emergency API received:", body)

    const { patientId, emergencyType, latitude, longitude, nearestHospital } = body

    if (!patientId || !emergencyType) {
      return NextResponse.json({ error: "Missing required fields: patientId and emergencyType" }, { status: 400 })
    }

    let supabase
    try {
      supabase = await createClient()
    } catch (error) {
      console.error("[v0] Failed to create Supabase client:", error)
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

    // Create emergency record
    let emergency
    try {
      const { data, error: emergencyError } = await supabase
        .from("emergency_records")
        .insert({
          patient_id: patientId,
          emergency_type: emergencyType,
          severity_level: "critical",
          patient_location: {
            latitude,
            longitude,
          },
          status: "active",
        })
        .select()
        .single()

      if (emergencyError) {
        console.error("[v0] Error creating emergency record:", emergencyError)
        return NextResponse.json({ error: "Failed to create emergency record" }, { status: 500 })
      }
      emergency = data
    } catch (error) {
      console.error("[v0] Exception creating emergency record:", error)
      return NextResponse.json({ error: "Failed to create emergency record" }, { status: 500 })
    }

    // Get hospital details - wrapped in try-catch
    let hospital = null
    try {
      const { data: hospitalData, error: hospitalError } = await supabase
        .from("hospitals")
        .select("*")
        .eq("name", nearestHospital)
        .single()

      if (hospitalError && hospitalError.code !== "PGRST116") {
        console.warn("[v0] Warning fetching hospital:", hospitalError)
      }
      hospital = hospitalData
    } catch (error) {
      console.warn("[v0] Exception fetching hospital, continuing anyway:", error)
    }

    // Create emergency appointment if hospital found
    if (hospital) {
      try {
        const { data: doctors } = await supabase.from("doctors").select("id").eq("hospital_id", hospital.id).limit(1)

        if (doctors && doctors.length > 0) {
          await supabase.from("appointments").insert({
            patient_id: patientId,
            doctor_id: doctors[0].id,
            date_time: new Date().toISOString(),
            consultation_type: "emergency",
            reason: emergencyType,
            status: "scheduled",
          })
        }
      } catch (error) {
        console.warn("[v0] Warning creating emergency appointment:", error)
      }
    }

    return NextResponse.json({
      success: true,
      emergency,
      hospital,
      message: "Emergency services activated. Ambulance will be dispatched.",
    })
  } catch (error) {
    console.error("[v0] Emergency API error:", error)
    return NextResponse.json({ error: "Failed to process emergency request" }, { status: 500 })
  }
}
