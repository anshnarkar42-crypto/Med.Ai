import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json()

    const supabase = await createClient()

    let tableName: string
    if (role === "patient") {
      tableName = "patients"
    } else if (role === "doctor") {
      tableName = "doctors"
    } else if (role === "hospital") {
      tableName = "hospitals"
    } else {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    // Query the appropriate table for user
    const { data: user, error } = await supabase.from(tableName).select("*").eq("email", email).single()

    if (error || !user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // In production, verify password hash
    // For demo, we'll accept any password that matches 'demo123'
    if (password !== "demo123") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Return user data without password hash
    const { password_hash, ...userData } = user

    return NextResponse.json({
      success: true,
      user: {
        ...userData,
        role,
      },
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
