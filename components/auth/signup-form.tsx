"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export function SignupForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [role, setRole] = useState<"patient" | "doctor" | "staff" | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    bloodGroup: "",
    chronicConditions: "",
    specialization: "",
    experience: "",
    licenseNumber: "",
    department: "",
    staffId: "",
    position: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signup({ ...formData, role })
      router.push(`/dashboard/${role}`)
    } catch (error) {
      console.error("Signup failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 1) {
    return (
      <div className="w-full max-w-md mx-auto animate-fade-in">
        <div className="text-center space-y-2 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="gradient-primary rounded-lg p-2">
              <span className="text-2xl text-white">❤️</span>
            </div>
            <h1 className="text-3xl font-bold gradient-text">Med.AI</h1>
          </div>
          <p className="text-muted-foreground">Create Your Account</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-foreground font-semibold mb-4">Select your role:</p>
          {(["patient", "doctor", "staff"] as const).map((r) => (
            <button
              key={r}
              onClick={() => {
                setRole(r)
                setStep(2)
              }}
              className="w-full p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-smooth text-left group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold capitalize text-foreground group-hover:text-primary">{r}</h3>
                  <p className="text-xs text-muted-foreground">
                    {r === "patient" && "Get health insights and manage appointments"}
                    {r === "doctor" && "Manage patients and consultations"}
                    {r === "staff" && "Hospital resource management"}
                  </p>
                </div>
                <span className="text-muted-foreground group-hover:text-primary">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => {
              setStep(1)
              setRole(null)
            }}
            className="text-primary hover:underline text-sm"
          >
            ← Back
          </button>
          <h2 className="font-semibold capitalize text-foreground">Sign up as {role}</h2>
          <div />
        </div>

        {/* Common Fields */}
        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Role-specific Fields */}
        {role === "patient" && (
          <div className="space-y-3">
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Blood Group</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <input
              type="text"
              name="chronicConditions"
              placeholder="Chronic conditions (comma-separated)"
              value={formData.chronicConditions}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        )}

        {role === "doctor" && (
          <div className="space-y-3">
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="number"
              name="experience"
              placeholder="Years of Experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="text"
              name="licenseNumber"
              placeholder="License Number"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        )}

        {role === "staff" && (
          <div className="space-y-3">
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Emergency">Emergency</option>
            </select>
            <input
              type="text"
              name="staffId"
              placeholder="Staff ID"
              value={formData.staffId}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        )}

        {/* Password Fields */}
        <div className="space-y-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-lg font-semibold text-white transition-smooth mt-6 ${
            isLoading ? "bg-primary/60 cursor-not-allowed" : "gradient-primary hover:shadow-lg active:scale-98"
          }`}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button type="button" className="text-primary hover:underline">
            Sign in
          </button>
        </p>
      </form>
    </div>
  )
}
