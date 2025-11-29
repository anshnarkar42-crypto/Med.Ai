"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Heart, Menu, X, Moon, Sun, LogOut, User, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { user, role, logout, switchRole } = useAuth()
  const router = useRouter()

  const handleThemeToggle = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleRoleSwitch = (newRole: "patient" | "doctor" | "staff") => {
    switchRole(newRole)
    router.push(`/dashboard/${newRole}`)
  }

  if (!user) return null

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/dashboard/${role}`} className="flex items-center gap-2 group">
            <div className="gradient-primary rounded-lg p-2 group-hover:shadow-lg transition-smooth">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg gradient-text hidden sm:inline">Med.AI</span>
          </Link>

          {/* Center - Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href={`/dashboard/${role}`} className="text-sm text-foreground hover:text-primary transition-smooth">
              Dashboard
            </Link>
            {role === "patient" && (
              <Link href="/symptom-checker" className="text-sm text-foreground hover:text-primary transition-smooth">
                Symptom Checker
              </Link>
            )}
            <Link href="/appointments" className="text-sm text-foreground hover:text-primary transition-smooth">
              Appointments
            </Link>
            <Link href="/records" className="text-sm text-foreground hover:text-primary transition-smooth">
              Records
            </Link>
          </div>

          {/* Right - Controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Role Switcher - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {(["patient", "doctor", "staff"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleSwitch(r)}
                  className={`text-xs px-3 py-1 rounded-full transition-smooth capitalize ${
                    role === r ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-smooth"
              >
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="font-semibold text-sm text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{role}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 hover:bg-muted transition-smooth flex items-center gap-2 text-sm text-foreground">
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-muted transition-smooth flex items-center gap-2 text-sm text-foreground">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-destructive/10 transition-smooth flex items-center gap-2 text-sm text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-fade-in">
            <Link
              href={`/dashboard/${role}`}
              className="block px-4 py-2 rounded-lg hover:bg-muted transition-smooth text-sm"
            >
              Dashboard
            </Link>
            {role === "patient" && (
              <Link
                href="/symptom-checker"
                className="block px-4 py-2 rounded-lg hover:bg-muted transition-smooth text-sm"
              >
                Symptom Checker
              </Link>
            )}
            <Link href="/appointments" className="block px-4 py-2 rounded-lg hover:bg-muted transition-smooth text-sm">
              Appointments
            </Link>
            <Link href="/records" className="block px-4 py-2 rounded-lg hover:bg-muted transition-smooth text-sm">
              Records
            </Link>
            <div className="px-4 py-2 flex gap-2">
              {(["patient", "doctor", "staff"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    handleRoleSwitch(r)
                    setIsOpen(false)
                  }}
                  className={`text-xs px-3 py-1 rounded-full transition-smooth capitalize ${
                    role === r ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
