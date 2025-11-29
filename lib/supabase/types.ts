// TypeScript types for Supabase tables

export type Patient = {
  id: string
  full_name: string
  email: string
  password_hash: string
  age?: number
  gender?: string
  blood_group?: string
  phone?: string
  created_at: string
}

export type PatientHistory = {
  id: string
  patient_id: string
  symptoms: string
  analysis?: any
  severity?: string
  created_at: string
}

export type PatientChat = {
  id: string
  patient_id: string
  message_from: "patient" | "ai" | "doctor"
  message_text: string
  timestamp: string
}

export type PatientRecommendation = {
  id: string
  patient_id: string
  recommendation_text: string
  urgency_level?: "low" | "moderate" | "high" | "emergency"
  created_at: string
}

export type Doctor = {
  id: string
  full_name: string
  email: string
  password_hash: string
  specialization?: string
  experience?: number
  license_number?: string
  hospital_id?: string
  created_at: string
}

export type Hospital = {
  id: string
  name: string
  address?: string
  contact_number?: string
  created_at: string
}

export type Staff = {
  id: string
  full_name: string
  email: string
  password_hash: string
  department?: string
  staff_id?: string
  hospital_id?: string
  created_at: string
}

export type Appointment = {
  id: string
  patient_id: string
  doctor_id?: string
  appointment_date: string
  status: "scheduled" | "completed" | "cancelled"
  notes?: string
  created_at: string
}

export type MedicalRecord = {
  id: string
  patient_id: string
  document_type: string
  document_name: string
  file_url?: string
  uploaded_at: string
}

export type Prescription = {
  id: string
  patient_id: string
  doctor_id: string
  medication: string
  dosage: string
  duration: string
  instructions?: string
  created_at: string
}
