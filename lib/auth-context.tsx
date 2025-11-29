"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { User, UserRole } from "./types"
import { dummyPatient, dummyDoctor, dummyStaff } from "./dummy-data"

interface AuthContextType {
  user: User | null
  role: UserRole | null
  isAuthenticated: boolean
  login: (email: string, password: string, role: UserRole) => Promise<void>
  signup: (data: any) => Promise<void>
  logout: () => void
  switchRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)

  const login = useCallback(async (email: string, password: string, userRole: UserRole) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    let userData: User
    if (userRole === "patient") userData = dummyPatient
    else if (userRole === "doctor") userData = dummyDoctor
    else userData = dummyStaff

    setUser(userData)
    setRole(userRole)
  }, [])

  const signup = useCallback(async (data: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role,
      createdAt: new Date().toISOString(),
    }

    setUser(newUser)
    setRole(data.role)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setRole(null)
  }, [])

  const switchRole = useCallback((newRole: UserRole) => {
    setRole(newRole)
    if (newRole === "patient") setUser(dummyPatient)
    else if (newRole === "doctor") setUser(dummyDoctor)
    else setUser(dummyStaff)
  }, [])

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated: !!user, login, signup, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
