-- Seed initial data for Med.AI
-- Run this in Supabase SQL Editor

-- Insert sample hospitals
INSERT INTO hospitals (name, address, contact_number) VALUES
  ('City General Hospital', '123 Medical Center Dr, New York, NY 10001', '+1-555-0100'),
  ('St. Mary Medical Center', '456 Healthcare Ave, Los Angeles, CA 90001', '+1-555-0200'),
  ('Memorial Hospital', '789 Wellness Blvd, Chicago, IL 60601', '+1-555-0300')
ON CONFLICT DO NOTHING;

-- Insert sample doctors (password: demo123 - hashed)
INSERT INTO doctors (full_name, email, password_hash, specialization, experience, license_number, hospital_id) VALUES
  ('Dr. Sarah Chen', 'sarah.chen@medai.com', '$2a$10$example_hash_1', 'Cardiology', 10, 'MD-2015-001', (SELECT id FROM hospitals LIMIT 1)),
  ('Dr. James Wilson', 'james.wilson@medai.com', '$2a$10$example_hash_2', 'Neurology', 8, 'MD-2017-002', (SELECT id FROM hospitals LIMIT 1)),
  ('Dr. Emily Rodriguez', 'emily.rodriguez@medai.com', '$2a$10$example_hash_3', 'General Medicine', 12, 'MD-2013-003', (SELECT id FROM hospitals OFFSET 1 LIMIT 1))
ON CONFLICT DO NOTHING;

-- Insert sample patients
INSERT INTO patients (full_name, email, password_hash, age, gender, blood_group, phone) VALUES
  ('John Doe', 'john.doe@example.com', '$2a$10$example_hash_patient', 35, 'Male', 'O+', '+1-555-1234'),
  ('Jane Smith', 'jane.smith@example.com', '$2a$10$example_hash_patient2', 28, 'Female', 'A+', '+1-555-5678')
ON CONFLICT DO NOTHING;
