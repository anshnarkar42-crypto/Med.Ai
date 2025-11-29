"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function RoleRedirect() {
  const { user, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/")
    } else if (role) {
      router.push(`/dashboard/${role}`)
    }
  }, [user, role, router])

  return null
}
