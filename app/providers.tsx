"use client"

import type React from "react"
import { AuthProvider } from "@/lib/auth-context"
import { TranslationProvider } from "@/lib/translations"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TranslationProvider>
      <AuthProvider>{children}</AuthProvider>
    </TranslationProvider>
  )
}
