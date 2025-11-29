"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { dummyMedicalRecords } from "@/lib/dummy-data"

export default function RecordsPage() {
  const { user, role } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  const types = ["report", "prescription", "scan", "lab", "document"]

  const filtered = dummyMedicalRecords.filter(
    (record) =>
      (selectedType === null || record.type === selectedType) &&
      record.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!user) return null

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Medical Records</h1>
            <p className="text-muted-foreground">Access and manage your medical documents</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-3">🔍</span>
              <input
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Type Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedType(null)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-smooth ${
                  selectedType === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                All Documents
              </button>
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-smooth capitalize ${
                    selectedType === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Records Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((record) => (
              <div key={record.id} className="glass-card p-6 hover:shadow-lg transition-smooth group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-smooth">
                    <span>📄</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary font-medium capitalize">
                    {record.type}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
                  {record.title}
                </h3>
                {record.description && <p className="text-sm text-muted-foreground mb-3">{record.description}</p>}

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <span>📅</span>
                  {new Date(record.uploadedAt).toLocaleDateString()}
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-muted transition-smooth text-sm text-foreground">
                    👁️ View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-muted transition-smooth text-sm text-foreground">
                    ⬇️ Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📄</div>
              <p className="text-muted-foreground">No records found</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
