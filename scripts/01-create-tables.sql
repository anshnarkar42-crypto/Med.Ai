-- Med.AI Comprehensive Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CORE ENTITIES: Hospitals, Doctors, Patients
-- ============================================

-- 1. Hospitals table
CREATE TABLE IF NOT EXISTS hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  registration_number TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  phone TEXT,
  address TEXT NOT NULL,
  city TEXT,
  state TEXT,
  country TEXT,
  postal_code TEXT,
  beds_total INTEGER DEFAULT 0,
  beds_available INTEGER DEFAULT 0,
  admin_name TEXT,
  admin_email TEXT,
  website TEXT,
  established_year INTEGER,
  accreditation TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  specialization TEXT NOT NULL,
  experience INTEGER NOT NULL,
  license_number TEXT UNIQUE NOT NULL,
  phone TEXT,
  gender TEXT,
  age INTEGER,
  qualifications TEXT[],
  consultation_fee INTEGER,
  available_slots INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on-leave')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Patients table
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  blood_group TEXT,
  phone TEXT,
  date_of_birth DATE,
  chronic_conditions TEXT[],
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- NLP & SYMPTOM PROCESSING
-- ============================================

-- 4. Health_Questions table - Master list of all health questionnaire questions
CREATE TABLE IF NOT EXISTS health_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- e.g., 'cardiovascular', 'respiratory', 'digestive'
  severity_indicator BOOLEAN DEFAULT FALSE, -- if True, answer indicates severity
  medical_context TEXT, -- medical explanation for this question
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Patient_Health_Answers table - Stores individual patient responses
CREATE TABLE IF NOT EXISTS patient_health_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES health_questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  answer_value JSONB, -- structured answer data
  confidence_score FLOAT DEFAULT 0.0, -- AI confidence in NLP extraction
  flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(patient_id, question_id, created_at)
);

-- 6. Synonyms table - Alternative phrases for NLP synonym detection
CREATE TABLE IF NOT EXISTS synonyms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_term TEXT NOT NULL, -- main medical term
  synonym_phrase TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- links to symptom or medical category
  confidence_score FLOAT DEFAULT 0.95,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- AI RECOMMENDATIONS & ACTIONS
-- ============================================

-- 7. Recommendations table - AI-generated clinical recommendations
CREATE TABLE IF NOT EXISTS recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  recommendation_text TEXT NOT NULL,
  risk_level TEXT CHECK (risk_level IN ('low', 'moderate', 'high', 'critical')),
  next_steps TEXT,
  trigger_question_id UUID REFERENCES health_questions(id) ON DELETE SET NULL,
  trigger_answer_id UUID REFERENCES patient_health_answers(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'dismissed', 'addressed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- 8. Recommendation_Actions table - Actionable steps from recommendations
CREATE TABLE IF NOT EXISTS recommendation_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recommendation_id UUID NOT NULL REFERENCES recommendations(id) ON DELETE CASCADE,
  action_order INTEGER NOT NULL, -- sequence of actions
  action_description TEXT NOT NULL,
  action_type TEXT NOT NULL, -- e.g., 'appointment', 'medication', 'lifestyle', 'emergency'
  priority INTEGER DEFAULT 1,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- DOCTOR AVAILABILITY & APPOINTMENTS
-- ============================================

-- 9. Doctor_Availability table - Doctor working hours and appointment slots
CREATE TABLE IF NOT EXISTS doctor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL, -- 'monday', 'tuesday', etc.
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  max_appointments INTEGER DEFAULT 10,
  break_start TIME,
  break_end TIME,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Appointments table - Patient-doctor appointment bookings
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  recommendation_id UUID REFERENCES recommendations(id) ON DELETE SET NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  consultation_type TEXT CHECK (consultation_type IN ('in-person', 'video', 'phone')),
  reason TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no-show', 'rescheduled')),
  notes TEXT,
  prescription_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- EMERGENCY HANDLING
-- ============================================

-- 11. Emergency_Records table - Emergency incidents and responses
CREATE TABLE IF NOT EXISTS emergency_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  hospital_id UUID REFERENCES hospitals(id) ON DELETE SET NULL,
  emergency_type TEXT NOT NULL, -- e.g., 'cardiac', 'respiratory', 'trauma', 'other'
  severity_level TEXT CHECK (severity_level IN ('urgent', 'very-urgent', 'critical')),
  trigger_recommendation_id UUID REFERENCES recommendations(id) ON DELETE SET NULL,
  patient_location JSONB, -- {latitude, longitude}
  location_address TEXT,
  ambulance_dispatched BOOLEAN DEFAULT FALSE,
  ambulance_eta_minutes INTEGER,
  selected_hospital TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'admitted', 'transferred', 'resolved')),
  admission_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- MEDICAL RECORDS & HISTORY
-- ============================================

-- 12. Medical_Records table - Patient documents and reports
CREATE TABLE IF NOT EXISTS medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('report', 'prescription', 'scan', 'lab', 'document')),
  document_name TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  file_size INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Prescriptions table - Medication prescriptions
CREATE TABLE IF NOT EXISTS prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  medication JSONB NOT NULL, -- array of medicines with dosage
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  issued_date DATE NOT NULL,
  expiry_date DATE
);

-- ============================================
-- SYSTEM AUDIT & LOGGING
-- ============================================

-- 14. Audit_Log table - Complete system event tracking
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- 'patient_response', 'ai_analysis', 'recommendation_generated', 'appointment_scheduled', etc.
  actor_id UUID, -- user who triggered event
  actor_type TEXT, -- 'patient', 'doctor', 'hospital', 'system'
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  recommendation_id UUID REFERENCES recommendations(id) ON DELETE SET NULL,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  emergency_record_id UUID REFERENCES emergency_records(id) ON DELETE SET NULL,
  action_description TEXT NOT NULL,
  details JSONB, -- additional context
  severity TEXT DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_hospitals_email ON hospitals(email);
CREATE INDEX IF NOT EXISTS idx_hospitals_registration ON hospitals(registration_number);
CREATE INDEX IF NOT EXISTS idx_doctors_email ON doctors(email);
CREATE INDEX IF NOT EXISTS idx_doctors_hospital_id ON doctors(hospital_id);
CREATE INDEX IF NOT EXISTS idx_doctors_license ON doctors(license_number);
CREATE INDEX IF NOT EXISTS idx_doctors_specialization ON doctors(specialization);
CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
CREATE INDEX IF NOT EXISTS idx_patients_phone ON patients(phone);

CREATE INDEX IF NOT EXISTS idx_health_questions_category ON health_questions(category);
CREATE INDEX IF NOT EXISTS idx_patient_health_answers_patient ON patient_health_answers(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_health_answers_question ON patient_health_answers(question_id);
CREATE INDEX IF NOT EXISTS idx_patient_health_answers_created ON patient_health_answers(created_at);
CREATE INDEX IF NOT EXISTS idx_synonyms_category ON synonyms(category);
CREATE INDEX IF NOT EXISTS idx_synonyms_canonical ON synonyms(canonical_term);

CREATE INDEX IF NOT EXISTS idx_recommendations_patient ON recommendations(patient_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_status ON recommendations(status);
CREATE INDEX IF NOT EXISTS idx_recommendations_risk_level ON recommendations(risk_level);
CREATE INDEX IF NOT EXISTS idx_recommendation_actions_recommendation ON recommendation_actions(recommendation_id);

CREATE INDEX IF NOT EXISTS idx_doctor_availability_doctor ON doctor_availability(doctor_id);
CREATE INDEX IF NOT EXISTS idx_doctor_availability_day ON doctor_availability(day_of_week);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

CREATE INDEX IF NOT EXISTS idx_emergency_records_patient ON emergency_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_emergency_records_hospital ON emergency_records(hospital_id);
CREATE INDEX IF NOT EXISTS idx_emergency_records_status ON emergency_records(status);
CREATE INDEX IF NOT EXISTS idx_emergency_records_created ON emergency_records(created_at);

CREATE INDEX IF NOT EXISTS idx_medical_records_patient ON medical_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_type ON medical_records(document_type);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_doctor ON prescriptions(doctor_id);

CREATE INDEX IF NOT EXISTS idx_audit_log_event_type ON audit_log(event_type);
CREATE INDEX IF NOT EXISTS idx_audit_log_patient ON audit_log(patient_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_log_severity ON audit_log(severity);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_health_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Hospital policies
CREATE POLICY "Hospitals can read own data" ON hospitals FOR SELECT USING (true);
CREATE POLICY "Hospitals can update own data" ON hospitals FOR UPDATE USING (auth.uid()::text = id::text);

-- Doctor policies
CREATE POLICY "Doctors can read own data" ON doctors FOR SELECT USING (true);
CREATE POLICY "Doctors can read patients they treat" ON doctors FOR SELECT USING (true);
CREATE POLICY "Doctors can update own data" ON doctors FOR UPDATE USING (auth.uid()::text = id::text);

-- Patient policies
CREATE POLICY "Patients can read own data" ON patients FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Patients can update own data" ON patients FOR UPDATE USING (auth.uid()::text = id::text);

-- Patient answers policies
CREATE POLICY "Patients can read own answers" ON patient_health_answers FOR SELECT USING (auth.uid()::text = patient_id::text);
CREATE POLICY "Patients can insert own answers" ON patient_health_answers FOR INSERT WITH CHECK (auth.uid()::text = patient_id::text);

-- Recommendations policies
CREATE POLICY "Patients can read own recommendations" ON recommendations FOR SELECT USING (auth.uid()::text = patient_id::text);
CREATE POLICY "Doctors can read patient recommendations" ON recommendations FOR SELECT USING (true);

-- Appointments policies
CREATE POLICY "Patients can read own appointments" ON appointments FOR SELECT USING (auth.uid()::text = patient_id::text);
CREATE POLICY "Doctors can read own appointments" ON appointments FOR SELECT USING (auth.uid()::text = doctor_id::text);

-- Emergency policies
CREATE POLICY "Patients can read own emergency records" ON emergency_records FOR SELECT USING (auth.uid()::text = patient_id::text);
CREATE POLICY "Hospitals can read emergency records" ON emergency_records FOR SELECT USING (true);

-- Audit log policies (append-only)
CREATE POLICY "Users can read audit logs" ON audit_log FOR SELECT USING (true);
