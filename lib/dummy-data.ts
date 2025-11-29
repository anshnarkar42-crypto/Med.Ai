import type {
  PatientUser,
  DoctorUser,
  StaffUser,
  Appointment,
  SymptomAnalysis,
  MedicalRecord,
  Prescription,
  HospitalPatient,
  Task,
  InventoryItem,
} from "./types"

export const dummyPatient: PatientUser = {
  id: "pat-001",
  email: "john.doe@example.com",
  name: "John Doe",
  role: "patient",
  phone: "+1-555-0101",
  gender: "male",
  age: 32,
  avatar: "/male-patient-avatar.png",
  bloodGroup: "O+",
  chronicConditions: ["Hypertension", "Type 2 Diabetes"],
  createdAt: "2023-01-15",
}

export const dummyDoctor: DoctorUser = {
  id: "doc-001",
  email: "dr.smith@hospital.com",
  name: "Dr. Sarah Smith",
  role: "doctor",
  phone: "+1-555-0102",
  gender: "female",
  avatar: "/female-doctor-avatar.png",
  specialization: "Cardiology",
  experience: 12,
  licenseNumber: "MD-2024-001",
  hospital: "City Medical Center",
  qualifications: ["MD", "Board Certified in Cardiology"],
  createdAt: "2022-03-20",
}

export const dummyStaff: StaffUser = {
  id: "staff-001",
  email: "nurse.jane@hospital.com",
  name: "Jane Wilson",
  role: "staff",
  phone: "+1-555-0103",
  gender: "female",
  avatar: "/female-nurse-avatar.jpg",
  department: "Cardiology",
  staffId: "STAFF-2024-001",
  position: "Registered Nurse",
  shift: "morning",
  createdAt: "2023-06-10",
}

export const dummySymptomAnalysis: SymptomAnalysis = {
  id: "analysis-001",
  patientId: "pat-001",
  symptoms: [
    { id: "1", name: "Chest pain", severity: "high", duration: "2 hours", bodyArea: "chest" },
    { id: "2", name: "Shortness of breath", severity: "moderate", duration: "2 hours", bodyArea: "chest" },
    { id: "3", name: "Dizziness", severity: "moderate", duration: "30 minutes", bodyArea: "head" },
  ],
  conditions: [
    {
      id: "c1",
      name: "Angina",
      probability: 0.85,
      description: "Chest pain due to reduced blood flow to heart",
      icon: "❤️",
    },
    {
      id: "c2",
      name: "Myocardial Infarction",
      probability: 0.65,
      description: "Heart attack - requires immediate attention",
      icon: "⚠️",
    },
    {
      id: "c3",
      name: "Panic Attack",
      probability: 0.4,
      description: "Sudden onset of intense fear or anxiety",
      icon: "😰",
    },
  ],
  urgency: "emergency",
  severity: "high",
  recommendations: [
    "Seek immediate medical attention at nearest hospital",
    "Call emergency services (911)",
    "Chew aspirin if not allergic",
    "Do not drive yourself",
    "Avoid strenuous activity",
  ],
  createdAt: "2024-11-15T10:30:00Z",
  notes: "Symptoms consistent with cardiac event. Immediate evaluation recommended.",
}

export const dummyAppointments: Appointment[] = [
  {
    id: "apt-001",
    patientId: "pat-001",
    doctorId: "doc-001",
    dateTime: "2024-12-05T14:00:00Z",
    reason: "Regular Checkup",
    status: "scheduled",
    consultationType: "in-person",
    notes: "Blood pressure check and medication review",
  },
  {
    id: "apt-002",
    patientId: "pat-001",
    doctorId: "doc-001",
    dateTime: "2024-11-30T10:30:00Z",
    reason: "Follow-up Consultation",
    status: "completed",
    consultationType: "video",
    notes: "Discussed recent ECG results",
  },
]

export const dummyMedicalRecords: MedicalRecord[] = [
  {
    id: "rec-001",
    patientId: "pat-001",
    type: "report",
    title: "Recent Blood Test Report",
    description: "Comprehensive metabolic panel",
    uploadedAt: "2024-11-10",
    doctorId: "doc-001",
  },
  {
    id: "rec-002",
    patientId: "pat-001",
    type: "scan",
    title: "Chest X-Ray",
    description: "Routine chest imaging",
    uploadedAt: "2024-11-05",
    doctorId: "doc-001",
  },
  {
    id: "rec-003",
    patientId: "pat-001",
    type: "prescription",
    title: "Current Medications",
    uploadedAt: "2024-11-15",
    doctorId: "doc-001",
  },
]

export const dummyPrescription: Prescription = {
  id: "presc-001",
  appointmentId: "apt-001",
  patientId: "pat-001",
  doctorId: "doc-001",
  medicines: [
    {
      id: "m1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "90 days",
      instructions: "Take in the morning with water",
    },
    {
      id: "m2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      duration: "180 days",
      instructions: "Take with meals",
    },
  ],
  instructions: "Continue current regimen. Schedule follow-up in 3 months.",
  createdAt: "2024-11-15",
  issuedDate: "2024-11-15",
}

export const dummyHospitalPatients: HospitalPatient[] = [
  {
    id: "hp-001",
    patientId: "pat-001",
    admissionDate: "2024-11-20",
    bedNumber: "ICU-101",
    department: "Cardiology",
    assignedDoctorId: "doc-001",
    status: "icu",
    notes: "Post-operative monitoring",
  },
]

export const dummyTasks: Task[] = [
  {
    id: "task-001",
    assignedToStaffId: "staff-001",
    title: "Monitor patient vitals - Room 101",
    dueDate: "2024-11-29T14:00:00Z",
    priority: "high",
    status: "in-progress",
    createdAt: "2024-11-29",
  },
  {
    id: "task-002",
    assignedToStaffId: "staff-001",
    title: "Medication administration - Room 105",
    dueDate: "2024-11-29T16:00:00Z",
    priority: "high",
    status: "pending",
    createdAt: "2024-11-29",
  },
]

export const dummyInventory: InventoryItem[] = [
  {
    id: "inv-001",
    name: "Surgical Masks (N95)",
    quantity: 250,
    unit: "boxes",
    minThreshold: 500,
    category: "PPE",
    lastRestockDate: "2024-11-15",
  },
  {
    id: "inv-002",
    name: "Medical Gloves (Latex)",
    quantity: 100,
    unit: "boxes",
    minThreshold: 200,
    category: "PPE",
    lastRestockDate: "2024-11-10",
  },
]
