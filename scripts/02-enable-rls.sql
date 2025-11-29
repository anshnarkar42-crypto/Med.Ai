-- Enable Row Level Security (RLS) on all tables
-- Run this in Supabase SQL Editor after creating tables

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_chat ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for patients table
CREATE POLICY "Patients can view own data" ON patients
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Patients can update own data" ON patients
  FOR UPDATE USING (auth.uid()::text = id::text);

-- RLS Policies for patient_history
CREATE POLICY "Patients can view own history" ON patient_history
  FOR SELECT USING (patient_id IN (SELECT id FROM patients WHERE id::text = auth.uid()::text));

CREATE POLICY "Patients can insert own history" ON patient_history
  FOR INSERT WITH CHECK (patient_id IN (SELECT id FROM patients WHERE id::text = auth.uid()::text));

-- RLS Policies for patient_chat
CREATE POLICY "Patients can view own chat" ON patient_chat
  FOR SELECT USING (patient_id IN (SELECT id FROM patients WHERE id::text = auth.uid()::text));

CREATE POLICY "Patients can insert own chat" ON patient_chat
  FOR INSERT WITH CHECK (patient_id IN (SELECT id FROM patients WHERE id::text = auth.uid()::text));

-- RLS Policies for appointments
CREATE POLICY "Users can view own appointments" ON appointments
  FOR SELECT USING (
    patient_id IN (SELECT id FROM patients WHERE id::text = auth.uid()::text) OR
    doctor_id IN (SELECT id FROM doctors WHERE id::text = auth.uid()::text)
  );

CREATE POLICY "Patients can create appointments" ON appointments
  FOR INSERT WITH CHECK (patient_id IN (SELECT id FROM patients WHERE id::text = auth.uid()::text));

-- RLS Policies for doctors
CREATE POLICY "Doctors can view own data" ON doctors
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Anyone can view all doctors" ON doctors
  FOR SELECT USING (true);

-- RLS Policies for hospitals
CREATE POLICY "Anyone can view hospitals" ON hospitals
  FOR SELECT USING (true);
