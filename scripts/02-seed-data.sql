-- Med.AI Sample Data Population Script
-- This script seeds the database with sample data for testing

-- ============================================
-- SAMPLE DATA: Hospitals
-- ============================================

INSERT INTO hospitals (name, registration_number, email, password_hash, phone, address, city, state, country, postal_code, beds_total, beds_available, admin_name, admin_email, website, established_year, accreditation, status)
VALUES
  ('City Central Hospital', 'REG-001', 'hospital1@medai.com', '$2a$10$demo_hash_hospital1', '555-0101', '123 Medical Plaza', 'New York', 'NY', 'USA', '10001', 500, 450, 'Dr. John Anderson', 'admin@cityhospital.com', 'www.cityhospital.com', 2005, 'JCI', 'active'),
  ('Downtown Medical Center', 'REG-002', 'hospital2@medai.com', '$2a$10$demo_hash_hospital2', '555-0102', '456 Healthcare Avenue', 'Los Angeles', 'CA', 'USA', '90001', 350, 320, 'Dr. Sarah Johnson', 'admin@downtownmedical.com', 'www.downtownmedical.com', 2010, 'AABB', 'active'),
  ('Sunrise Wellness Hospital', 'REG-003', 'hospital3@medai.com', '$2a$10$demo_hash_hospital3', '555-0103', '789 Recovery Road', 'Chicago', 'IL', 'USA', '60601', 280, 250, 'Dr. Michael Chen', 'admin@sunrisewellness.com', 'www.sunrisewellness.com', 2008, 'NCLC', 'active');

-- ============================================
-- SAMPLE DATA: Doctors
-- ============================================

INSERT INTO doctors (hospital_id, full_name, email, password_hash, specialization, experience, license_number, phone, gender, age, qualifications, consultation_fee, available_slots, status)
VALUES
  -- City Central Hospital doctors
  ((SELECT id FROM hospitals WHERE registration_number = 'REG-001'), 'Dr. Robert Wilson', 'doctor1@medai.com', '$2a$10$demo_hash_doc1', 'Cardiology', 15, 'LIC-001', '555-1001', 'Male', 48, '["MBBS", "MD Cardiology", "Fellowship - Mayo Clinic"]', 150, 8, 'active'),
  ((SELECT id FROM hospitals WHERE registration_number = 'REG-001'), 'Dr. Emily Davis', 'doctor2@medai.com', '$2a$10$demo_hash_doc2', 'Neurology', 12, 'LIC-002', '555-1002', 'Female', 42, '["MBBS", "MD Neurology"]', 120, 6, 'active'),
  ((SELECT id FROM hospitals WHERE registration_number = 'REG-001'), 'Dr. James Martinez', 'doctor3@medai.com', '$2a$10$demo_hash_doc3', 'Orthopedics', 18, 'LIC-003', '555-1003', 'Male', 52, '["MBBS", "MS Orthopedics", "Fellowship - Boston"]', 130, 7, 'active'),
  
  -- Downtown Medical Center doctors
  ((SELECT id FROM hospitals WHERE registration_number = 'REG-002'), 'Dr. Lisa Thompson', 'doctor4@medai.com', '$2a$10$demo_hash_doc4', 'Pulmonology', 10, 'LIC-004', '555-1004', 'Female', 38, '["MBBS", "MD Pulmonology"]', 110, 5, 'active'),
  ((SELECT id FROM hospitals WHERE registration_number = 'REG-002'), 'Dr. David Kumar', 'doctor5@medai.com', '$2a$10$demo_hash_doc5', 'Gastroenterology', 14, 'LIC-005', '555-1005', 'Male', 45, '["MBBS", "MD Gastroenterology", "Endoscopy Specialist"]', 125, 6, 'active'),
  
  -- Sunrise Wellness Hospital doctors
  ((SELECT id FROM hospitals WHERE registration_number = 'REG-003'), 'Dr. Angela Martinez', 'doctor6@medai.com', '$2a$10$demo_hash_doc6', 'General Medicine', 8, 'LIC-006', '555-1006', 'Female', 36, '["MBBS", "MD General Medicine"]', 100, 8, 'active'),
  ((SELECT id FROM hospitals WHERE registration_number = 'REG-003'), 'Dr. Christopher Lee', 'doctor7@medai.com', '$2a$10$demo_hash_doc7', 'Emergency Medicine', 11, 'LIC-007', '555-1007', 'Male', 41, '["MBBS", "MD Emergency Medicine", "Trauma Certified"]', 140, 10, 'active');

-- ============================================
-- SAMPLE DATA: Patients
-- ============================================

INSERT INTO patients (full_name, email, password_hash, age, gender, blood_group, phone, date_of_birth, chronic_conditions, emergency_contact_name, emergency_contact_phone, status)
VALUES
  ('John Doe', 'patient1@medai.com', '$2a$10$demo_hash_pat1', 35, 'Male', 'O+', '555-2001', '1989-03-15', '["hypertension", "diabetes"]', 'Jane Doe', '555-2001', 'active'),
  ('Maria Garcia', 'patient2@medai.com', '$2a$10$demo_hash_pat2', 28, 'Female', 'A+', '555-2002', '1996-07-22', '["asthma"]', 'Carlos Garcia', '555-2002', 'active'),
  ('Ahmed Hassan', 'patient3@medai.com', '$2a$10$demo_hash_pat3', 52, 'Male', 'B+', '555-2003', '1972-11-08', '["hypertension", "hyperlipidemia", "COPD"]', 'Fatima Hassan', '555-2003', 'active'),
  ('Lisa Wong', 'patient4@medai.com', '$2a$10$demo_hash_pat4', 41, 'Female', 'AB-', '555-2004', '1983-05-30', '["thyroid disorder"]', 'David Wong', '555-2004', 'active'),
  ('Michael Brown', 'patient5@medai.com', '$2a$10$demo_hash_pat5', 67, 'Male', 'A-', '555-2005', '1957-09-12', '["heart disease", "diabetes", "arthritis"]', 'Susan Brown', '555-2005', 'active');

-- ============================================
-- SAMPLE DATA: Health Questions
-- ============================================

INSERT INTO health_questions (question_text, category, severity_indicator, medical_context)
VALUES
  ('Do you experience chest pain or discomfort?', 'cardiovascular', true, 'Chest pain can indicate cardiac issues and requires immediate evaluation.'),
  ('Have you experienced shortness of breath?', 'respiratory', true, 'Dyspnea may indicate pulmonary or cardiac pathology.'),
  ('Do you have persistent cough?', 'respiratory', false, 'Persistent cough lasting more than 2 weeks warrants investigation.'),
  ('Have you experienced dizziness or vertigo?', 'neurological', true, 'Dizziness can indicate various conditions including vestibular disorders.'),
  ('Do you have frequent headaches?', 'neurological', false, 'Frequency and severity of headaches should be documented.'),
  ('Have you experienced abdominal pain?', 'digestive', true, 'Acute abdominal pain requires urgent evaluation.'),
  ('Do you have nausea or vomiting?', 'digestive', false, 'These symptoms can indicate gastrointestinal or systemic conditions.'),
  ('Do you have joint pain or swelling?', 'musculoskeletal', false, 'Joint symptoms may indicate inflammatory or degenerative conditions.'),
  ('Have you experienced fever in the past week?', 'general', true, 'Fever may indicate infection and warrants evaluation.'),
  ('Do you experience fatigue or weakness?', 'general', false, 'Persistent fatigue can indicate various systemic conditions.');

-- ============================================
-- SAMPLE DATA: Patient Health Answers
-- ============================================

INSERT INTO patient_health_answers (patient_id, question_id, answer_text, answer_value, confidence_score, flagged)
VALUES
  ((SELECT id FROM patients WHERE email = 'patient1@medai.com'), 
   (SELECT id FROM health_questions WHERE question_text = 'Do you experience chest pain or discomfort?'), 
   'Mild chest discomfort during physical activity', '{"severity": "mild", "frequency": "occasional", "trigger": "exercise"}', 0.92, false),
  
  ((SELECT id FROM patients WHERE email = 'patient1@medai.com'), 
   (SELECT id FROM health_questions WHERE question_text = 'Have you experienced shortness of breath?'), 
   'Occasional shortness of breath with exertion', '{"severity": "mild", "context": "exercise"}', 0.88, false),
  
  ((SELECT id FROM patients WHERE email = 'patient2@medai.com'), 
   (SELECT id FROM health_questions WHERE question_text = 'Do you have persistent cough?'), 
   'Yes, persistent dry cough for 3 weeks', '{"duration_days": 21, "type": "dry", "severity": "moderate"}', 0.85, true),
  
  ((SELECT id FROM patients WHERE email = 'patient3@medai.com'), 
   (SELECT id FROM health_questions WHERE question_text = 'Have you experienced abdominal pain?'), 
   'Sharp abdominal pain in upper left quadrant', '{"location": "epigastric", "type": "sharp", "severity": "high"}', 0.90, true),
  
  ((SELECT id FROM patients WHERE email = 'patient4@medai.com'), 
   (SELECT id FROM health_questions WHERE question_text = 'Do you experience frequent headaches?'), 
   'Recurring headaches 2-3 times per week', '{"frequency_per_week": 2.5, "severity": "moderate", "duration_hours": 4}', 0.87, false),
  
  ((SELECT id FROM patients WHERE email = 'patient5@medai.com'), 
   (SELECT id FROM health_questions WHERE question_text = 'Do you experience fatigue or weakness?'), 
   'Persistent fatigue throughout the day', '{"duration_days": 30, "severity": "high", "impact": "activities limited"}', 0.89, true);

-- ============================================
-- SAMPLE DATA: Synonyms
-- ============================================

INSERT INTO synonyms (canonical_term, synonym_phrase, category, confidence_score)
VALUES
  ('chest pain', 'chest discomfort', 'cardiovascular', 0.98),
  ('chest pain', 'angina', 'cardiovascular', 0.95),
  ('chest pain', 'pressure in chest', 'cardiovascular', 0.96),
  ('shortness of breath', 'breathlessness', 'respiratory', 0.97),
  ('shortness of breath', 'dyspnea', 'respiratory', 0.99),
  ('persistent cough', 'chronic cough', 'respiratory', 0.96),
  ('persistent cough', 'lingering cough', 'respiratory', 0.95),
  ('abdominal pain', 'stomach pain', 'digestive', 0.94),
  ('abdominal pain', 'belly ache', 'digestive', 0.92),
  ('headache', 'head pain', 'neurological', 0.98),
  ('headache', 'migraine', 'neurological', 0.93),
  ('joint pain', 'arthralgia', 'musculoskeletal', 0.97),
  ('joint pain', 'joint ache', 'musculoskeletal', 0.95),
  ('fever', 'high temperature', 'general', 0.96),
  ('fever', 'elevated temperature', 'general', 0.97),
  ('fatigue', 'tiredness', 'general', 0.96),
  ('fatigue', 'exhaustion', 'general', 0.95);

-- ============================================
-- SAMPLE DATA: Doctor Availability
-- ============================================

INSERT INTO doctor_availability (doctor_id, day_of_week, start_time, end_time, max_appointments, break_start, break_end, available)
VALUES
  -- Dr. Robert Wilson - Cardiology (City Central)
  ((SELECT id FROM doctors WHERE license_number = 'LIC-001'), 'monday', '09:00', '17:00', 8, '13:00', '14:00', true),
  ((SELECT id FROM doctors WHERE license_number = 'LIC-001'), 'wednesday', '09:00', '17:00', 8, '13:00', '14:00', true),
  ((SELECT id FROM doctors WHERE license_number = 'LIC-001'), 'friday', '09:00', '17:00', 8, '13:00', '14:00', true),
  
  -- Dr. Emily Davis - Neurology (City Central)
  ((SELECT id FROM doctors WHERE license_number = 'LIC-002'), 'tuesday', '10:00', '18:00', 6, '13:00', '14:00', true),
  ((SELECT id FROM doctors WHERE license_number = 'LIC-002'), 'thursday', '10:00', '18:00', 6, '13:00', '14:00', true),
  
  -- Dr. James Martinez - Orthopedics (City Central)
  ((SELECT id FROM doctors WHERE license_number = 'LIC-003'), 'monday', '08:00', '16:00', 7, '12:00', '13:00', true),
  ((SELECT id FROM doctors WHERE license_number = 'LIC-003'), 'wednesday', '08:00', '16:00', 7, '12:00', '13:00', true),
  ((SELECT id FROM doctors WHERE license_number = 'LIC-003'), 'friday', '08:00', '16:00', 7, '12:00', '13:00', true),
  
  -- Dr. Christopher Lee - Emergency Medicine (Sunrise Wellness)
  ((SELECT id FROM doctors WHERE license_number = 'LIC-007'), 'monday', '06:00', '18:00', 10, '12:00', '13:00', true),
  ((SELECT id FROM doctors WHERE license_number = 'LIC-007'), 'tuesday', '06:00', '18:00', 10, '12:00', '13:00', true),
  ((SELECT id FROM doctors WHERE license_number = 'LIC-007'), 'wednesday', '06:00', '18:00', 10, '12:00', '13:00', true);

-- ============================================
-- SAMPLE DATA: Recommendations
-- ============================================

INSERT INTO recommendations (patient_id, recommendation_text, risk_level, next_steps, trigger_question_id, trigger_answer_id, status, expires_at)
VALUES
  ((SELECT id FROM patients WHERE email = 'patient1@medai.com'),
   'Cardiac evaluation recommended due to exercise-induced chest discomfort and shortness of breath',
   'moderate',
   'Schedule stress test and echocardiogram with cardiologist',
   (SELECT id FROM health_questions WHERE question_text = 'Do you experience chest pain or discomfort?'),
   (SELECT MAX(id) FROM patient_health_answers WHERE patient_id = (SELECT id FROM patients WHERE email = 'patient1@medai.com')),
   'active',
   CURRENT_TIMESTAMP + INTERVAL '30 days'),
  
  ((SELECT id FROM patients WHERE email = 'patient2@medai.com'),
   'Respiratory evaluation needed for persistent dry cough lasting 3 weeks',
   'high',
   'Chest X-ray and pulmonary function tests recommended',
   (SELECT id FROM health_questions WHERE question_text = 'Do you have persistent cough?'),
   (SELECT MAX(id) FROM patient_health_answers WHERE patient_id = (SELECT id FROM patients WHERE email = 'patient2@medai.com')),
   'active',
   CURRENT_TIMESTAMP + INTERVAL '14 days'),
  
  ((SELECT id FROM patients WHERE email = 'patient3@medai.com'),
   'Urgent gastroenterology consultation for acute abdominal pain',
   'critical',
   'Same-day ultrasound and gastroenterology evaluation required',
   (SELECT id FROM health_questions WHERE question_text = 'Have you experienced abdominal pain?'),
   (SELECT MAX(id) FROM patient_health_answers WHERE patient_id = (SELECT id FROM patients WHERE email = 'patient3@medai.com')),
   'active',
   CURRENT_TIMESTAMP + INTERVAL '1 day');

-- ============================================
-- SAMPLE DATA: Recommendation Actions
-- ============================================

INSERT INTO recommendation_actions (recommendation_id, action_order, action_description, action_type, priority, completed)
VALUES
  ((SELECT id FROM recommendations WHERE risk_level = 'moderate' LIMIT 1),
   1,
   'Schedule appointment with cardiologist Dr. Robert Wilson',
   'appointment',
   1,
   false),
  ((SELECT id FROM recommendations WHERE risk_level = 'moderate' LIMIT 1),
   2,
   'Perform baseline ECG and blood pressure monitoring',
   'lifestyle',
   2,
   false),
  ((SELECT id FROM recommendations WHERE risk_level = 'moderate' LIMIT 1),
   3,
   'Reduce intense physical activity until evaluated',
   'lifestyle',
   1,
   false),
  
  ((SELECT id FROM recommendations WHERE risk_level = 'high' LIMIT 1),
   1,
   'Schedule urgent chest X-ray',
   'appointment',
   1,
   false),
  ((SELECT id FROM recommendations WHERE risk_level = 'high' LIMIT 1),
   2,
   'Pulmonary function testing',
   'appointment',
   2,
   false),
  
  ((SELECT id FROM recommendations WHERE risk_level = 'critical' LIMIT 1),
   1,
   'Emergency department evaluation',
   'emergency',
   1,
   false),
  ((SELECT id FROM recommendations WHERE risk_level = 'critical' LIMIT 1),
   2,
   'Abdominal ultrasound imaging',
   'appointment',
   1,
   false);

-- ============================================
-- SAMPLE DATA: Appointments
-- ============================================

INSERT INTO appointments (patient_id, doctor_id, recommendation_id, appointment_date, consultation_type, reason, status, notes)
VALUES
  ((SELECT id FROM patients WHERE email = 'patient1@medai.com'),
   (SELECT id FROM doctors WHERE license_number = 'LIC-001'),
   (SELECT id FROM recommendations WHERE risk_level = 'moderate' LIMIT 1),
   CURRENT_TIMESTAMP + INTERVAL '3 days',
   'in-person',
   'Cardiac evaluation for exercise-induced chest discomfort',
   'scheduled',
   'Patient reports mild chest discomfort during exercise'),
  
  ((SELECT id FROM patients WHERE email = 'patient2@medai.com'),
   (SELECT id FROM doctors WHERE license_number = 'LIC-004'),
   (SELECT id FROM recommendations WHERE risk_level = 'high' LIMIT 1),
   CURRENT_TIMESTAMP + INTERVAL '1 day',
   'in-person',
   'Persistent cough evaluation',
   'scheduled',
   'Dry cough for 3 weeks, needs pulmonary assessment');

-- ============================================
-- SAMPLE DATA: Emergency Records
-- ============================================

INSERT INTO emergency_records (patient_id, hospital_id, emergency_type, severity_level, patient_location, location_address, ambulance_dispatched, ambulance_eta_minutes, selected_hospital, status, admission_notes)
VALUES
  ((SELECT id FROM patients WHERE email = 'patient3@medai.com'),
   (SELECT id FROM hospitals WHERE registration_number = 'REG-002'),
   'abdominal',
   'critical',
   '{"latitude": 34.0522, "longitude": -118.2437}',
   '456 Healthcare Avenue, Los Angeles, CA',
   true,
   8,
   'Downtown Medical Center',
   'admitted',
   'Acute abdominal pain, admitted for urgent evaluation and imaging');

-- ============================================
-- SAMPLE DATA: Medical Records
-- ============================================

INSERT INTO medical_records (patient_id, doctor_id, document_type, document_name, description, file_url, file_size)
VALUES
  ((SELECT id FROM patients WHERE email = 'patient1@medai.com'),
   (SELECT id FROM doctors WHERE license_number = 'LIC-001'),
   'report',
   'Baseline ECG Report',
   'Baseline electrocardiogram showing normal sinus rhythm',
   '/medical-records/patient1-ecg-baseline.pdf',
   245000),
  
  ((SELECT id FROM patients WHERE email = 'patient2@medai.com'),
   NULL,
   'lab',
   'Blood Work Panel',
   'Complete blood count and metabolic panel',
   '/medical-records/patient2-labs.pdf',
   156000);

-- ============================================
-- SAMPLE DATA: Audit Log
-- ============================================

INSERT INTO audit_log (event_type, actor_id, actor_type, patient_id, recommendation_id, appointment_id, action_description, details, severity)
VALUES
  ('patient_response', (SELECT id FROM patients WHERE email = 'patient1@medai.com'), 'patient', 
   (SELECT id FROM patients WHERE email = 'patient1@medai.com'), NULL, NULL,
   'Patient answered health questionnaire questions', 
   '{"questions_answered": 2, "flagged_responses": 0}', 'info'),
  
  ('ai_analysis', NULL, 'system', 
   (SELECT id FROM patients WHERE email = 'patient1@medai.com'), NULL, NULL,
   'AI analysis completed for patient health answers',
   '{"answers_analyzed": 2, "confidence_average": 0.90}', 'info'),
  
  ('recommendation_generated', NULL, 'system', 
   (SELECT id FROM patients WHERE email = 'patient1@medai.com'), 
   (SELECT id FROM recommendations WHERE risk_level = 'moderate' LIMIT 1), NULL,
   'Recommendation generated for patient based on AI analysis',
   '{"risk_level": "moderate", "condition_suspected": "cardiac"}', 'warning'),
  
  ('appointment_scheduled', (SELECT id FROM patients WHERE email = 'patient1@medai.com'), 'patient', 
   (SELECT id FROM patients WHERE email = 'patient1@medai.com'), 
   (SELECT id FROM recommendations WHERE risk_level = 'moderate' LIMIT 1),
   (SELECT id FROM appointments WHERE reason LIKE '%cardiac%'),
   'Appointment scheduled with Dr. Robert Wilson',
   '{"doctor": "Dr. Robert Wilson", "date": "2025-12-02"}', 'info'),
  
  ('emergency_alert', (SELECT id FROM patients WHERE email = 'patient3@medai.com'), 'patient', 
   (SELECT id FROM patients WHERE email = 'patient3@medai.com'), NULL, NULL,
   'Emergency alert triggered - critical abdominal pain',
   '{"severity": "critical", "location": "Los Angeles", "ambulance_dispatched": true}', 'critical');
