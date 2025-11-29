// Placeholder API wrapper functions for Med.AI
// Replace these with real API calls when backend is ready

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""

// Import dummy data
import doctorsData from "@/data/doctors.json"
import patientsData from "@/data/patients.json"
import emergenciesData from "@/data/emergencies.json"
import inventoryData from "@/data/inventory.json"

export const api = {
  // Doctors
  async getDoctors(filters?: { specialization?: string; maxFee?: number }) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    let doctors = doctorsData
    if (filters?.specialization && filters.specialization !== "all") {
      doctors = doctors.filter((d) => d.specialization === filters.specialization)
    }
    if (filters?.maxFee) {
      doctors = doctors.filter((d) => d.fee <= filters.maxFee)
    }

    return doctors
  },

  async getDoctorById(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return doctorsData.find((d) => d.id === id)
  },

  // Patients
  async getPatients() {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return patientsData
  },

  async getPatientById(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return patientsData.find((p) => p.id === id)
  },

  // Symptom Analysis
  async analyzeSymptoms(data: any) {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock AI response
    return {
      triageLevel: 2,
      conditions: [
        {
          name: "Acute Bronchitis",
          probability: 78,
          confidence: "high",
          symptoms: ["Persistent cough", "Chest discomfort", "Fatigue"],
          reasons: ["Matches reported symptoms", "Common seasonal condition"],
        },
      ],
      recommendations: {
        immediate: ["Rest and stay hydrated", "Monitor temperature"],
        medications: ["OTC cough suppressants"],
        whenToSeek: ["If symptoms worsen after 3 days"],
      },
    }
  },

  // Emergency
  async reportEmergency(data: any) {
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log("[v0] Emergency reported:", data)

    // Mock emergency response
    return {
      success: true,
      emergencyId: `emg-${Date.now()}`,
      hospitalNotified: true,
      ambulanceDispatched: true,
      eta: "12 minutes",
    }
  },

  // Medical History
  async getPatientHistory(patientId: string) {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return [
      {
        id: "hist-001",
        date: "2025-01-25",
        type: "symptom_check",
        condition: "Common Cold",
        severity: "low",
        triageLevel: 1,
      },
      {
        id: "hist-002",
        date: "2025-01-20",
        type: "consultation",
        doctor: "Dr. Priya Sharma",
        diagnosis: "Viral Fever",
        severity: "medium",
      },
    ]
  },

  // Appointments
  async getAppointments(patientId?: string) {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return [
      {
        id: "apt-001",
        patientId: "pat-001",
        doctorId: "doc-001",
        date: "2025-02-05",
        time: "10:00 AM",
        status: "upcoming",
        type: "consultation",
      },
    ]
  },

  async bookAppointment(data: any) {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      appointmentId: `apt-${Date.now()}`,
      ...data,
    }
  },

  // Inventory
  async getInventory() {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return inventoryData
  },

  async updateInventory(id: string, quantity: number) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true, id, newQuantity: quantity }
  },

  // Emergencies (for staff)
  async getEmergencies(status?: string) {
    await new Promise((resolve) => setTimeout(resolve, 300))

    let emergencies = emergenciesData
    if (status) {
      emergencies = emergencies.filter((e) => e.status === status)
    }

    return emergencies
  },
}
