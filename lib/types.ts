export type UserRole = "patient" | "doctor" | "hospital"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  phone?: string
  gender?: string
  age?: number
  createdAt: string
}

export interface PatientUser extends User {
  role: "patient"
  bloodGroup?: string
  chronicConditions?: string[]
  emergencyContact?: string
  dateOfBirth?: string
}

export interface DoctorUser extends User {
  role: "doctor"
  hospitalId: string
  specialization: string
  experience: number
  licenseNumber: string
  hospital?: string
  qualifications?: string[]
  consultationFee?: number
}

export interface HospitalUser extends User {
  role: "hospital"
  registrationNumber: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  bedsTotal: number
  bedsAvailable: number
  adminName: string
  adminEmail: string
  accreditation?: string
}

export interface HealthQuestion {
  id: string
  questionText: string
  category: string
  severityIndicator: boolean
  medicalContext?: string
}

export interface PatientHealthAnswer {
  id: string
  patientId: string
  questionId: string
  answerText: string
  answerValue?: Record<string, any>
  confidenceScore: number
  flagged: boolean
  createdAt: string
}

export interface Synonym {
  id: string
  canonicalTerm: string
  synonymPhrase: string
  category: string
  confidenceScore: number
}

export interface Recommendation {
  id: string
  patientId: string
  recommendationText: string
  riskLevel: "low" | "moderate" | "high" | "critical"
  nextSteps?: string
  triggerQuestionId?: string
  triggerAnswerId?: string
  status: "active" | "dismissed" | "addressed"
  actions?: RecommendationAction[]
  createdAt: string
  expiresAt?: string
}

export interface RecommendationAction {
  id: string
  recommendationId: string
  actionOrder: number
  actionDescription: string
  actionType: "appointment" | "medication" | "lifestyle" | "emergency"
  priority: number
  completed: boolean
  completedAt?: string
}

export interface DoctorAvailability {
  id: string
  doctorId: string
  dayOfWeek: string
  startTime: string
  endTime: string
  maxAppointments: number
  breakStart?: string
  breakEnd?: string
  available: boolean
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  recommendationId?: string
  dateTime: string
  consultationType: "in-person" | "video" | "phone"
  reason?: string
  status: "scheduled" | "completed" | "cancelled" | "no-show" | "rescheduled"
  notes?: string
  prescriptionId?: string
  createdAt: string
}

export interface EmergencyRecord {
  id: string
  patientId: string
  hospitalId?: string
  emergencyType: string
  severityLevel: "urgent" | "very-urgent" | "critical"
  triggerRecommendationId?: string
  patientLocation?: { latitude: number; longitude: number }
  locationAddress?: string
  ambulanceDispatched: boolean
  ambulanceEtaMinutes?: number
  selectedHospital?: string
  status: "active" | "admitted" | "transferred" | "resolved"
  admissionNotes?: string
  createdAt: string
}

export interface MedicalRecord {
  id: string
  patientId: string
  doctorId?: string
  documentType: "report" | "prescription" | "scan" | "lab" | "document"
  documentName: string
  description?: string
  fileUrl?: string
  uploadedAt: string
}

export interface Prescription {
  id: string
  appointmentId?: string
  patientId: string
  doctorId: string
  medication: Array<{
    name: string
    dosage: string
    frequency: string
    duration: string
    instructions?: string
  }>
  instructions?: string
  issuedDate: string
  expiryDate?: string
  createdAt: string
}

export interface AuditLog {
  id: string
  eventType: string
  actorId?: string
  actorType: "patient" | "doctor" | "hospital" | "system"
  patientId?: string
  recommendationId?: string
  appointmentId?: string
  emergencyRecordId?: string
  actionDescription: string
  details?: Record<string, any>
  severity: "info" | "warning" | "error" | "critical"
  ipAddress?: string
  createdAt: string
}

export interface Condition {
  id: string
  name: string
  probability: number
  description: string
  icon?: string
}

export interface SymptomAnalysis {
  id: string
  patientId: string
  symptoms: string[]
  conditions: Condition[]
  urgency: "self-care" | "opd" | "emergency"
  recommendations: string[]
  severity: "low" | "moderate" | "high"
  createdAt: string
  notes?: string
}
