import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, role, ...userData } = body

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

    // Check if user already exists
    const { data: existingUser } = await supabase.from(tableName).select("id").eq("email", email).single()

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // In production, hash the password properly
    // For demo, we'll store a simple hash placeholder
    const password_hash = "$2a$10$demo_hash_" + Math.random().toString(36)

    // Insert new user
    const { data: newUser, error } = await supabase
      .from(tableName)
      .insert({
        ...userData,
        email,
        password_hash,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Signup error:", error)
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    // Return user data without password hash
    const { password_hash: _, ...userResponse } = newUser

    return NextResponse.json({
      success: true,
      user: {
        ...userResponse,
        role,
      },
    })
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
