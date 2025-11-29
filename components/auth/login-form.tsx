"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Heart, Mail, Lock } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("john.doe@example.com")
  const [password, setPassword] = useState("demo123")
  const [role, setRole] = useState<"patient" | "doctor" | "staff">("patient")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(email, password, role)
      router.push(`/dashboard/${role}`)
    } catch (error) {
      console.error("Login failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="gradient-primary rounded-lg p-2">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Med.AI</h1>
          </div>
          <p className="text-muted-foreground">Intelligent Healthcare Assistant</p>
        </div>

        {/* Role Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Select Your Role</label>
          <div className="grid grid-cols-3 gap-3">
            {(["patient", "doctor", "staff"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-3 px-2 rounded-lg font-medium transition-smooth text-sm capitalize ${
                  role === r
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-foreground">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold text-foreground">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-lg font-semibold text-white transition-smooth ${
            isLoading
              ? "bg-primary/60 cursor-not-allowed"
              : "gradient-primary hover:shadow-lg hover:shadow-primary/50 active:scale-98"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Signing in...
            </div>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Links */}
        <div className="flex items-center justify-between text-sm">
          <button type="button" className="text-primary hover:underline">
            Forgot password?
          </button>
          <button type="button" className="text-primary hover:underline">
            Sign up
          </button>
        </div>

        {/* Demo Info */}
        <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Demo Credentials:</strong> Use any role with email john.doe@example.com and password demo123
          </p>
        </div>
      </form>
    </div>
  )
}
