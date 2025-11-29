"use client"

import { dummyMedicalRecords } from "@/lib/dummy-data"

export function MedicalRecordsSection() {
  const categories = ["All", "Report", "Prescription", "Scan", "Lab"]

  return (
    <div className="glass-card space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Medical Records</h2>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-smooth text-sm text-foreground">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 18a1.5 1.5 0 0 0 0 3h4a1.5 1.5 0 0 0 0-3h-4zM9 5a1 1 0 0 1 2 0v8a1 1 0 1 1-2 0V5zm4 0a1 1 0 0 1 2 0v8a1 1 0 1 1-2 0V5z" />
          </svg>
          Filter
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-smooth ${
              cat === "All" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Records List */}
      <div className="space-y-2">
        {dummyMedicalRecords.map((record) => (
          <div
            key={record.id}
            className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-smooth flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">{record.title}</p>
                <p className="text-xs text-muted-foreground">{new Date(record.uploadedAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
