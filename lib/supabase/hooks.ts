"use client"

import { useEffect, useState } from "react"
import { createClient } from "./client"
import type {
  PatientHistory,
  PatientChat,
  PatientRecommendation,
  Doctor,
  Appointment,
  MedicalRecord,
  Prescription,
} from "./types"

// Hook to fetch patient history
export function usePatientHistory(patientId: string | null) {
  const [history, setHistory] = useState<PatientHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!patientId) {
      setLoading(false)
      return
    }

    const fetchHistory = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("patient_history")
          .select("*")
          .eq("patient_id", patientId)
          .order("created_at", { ascending: false })

        if (error) throw error
        setHistory(data || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [patientId])

  return { history, loading, error }
}

// Hook to fetch patient chat messages
export function useChat(patientId: string | null) {
  const [messages, setMessages] = useState<PatientChat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!patientId) {
      setLoading(false)
      return
    }

    const fetchMessages = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("patient_chat")
          .select("*")
          .eq("patient_id", patientId)
          .order("timestamp", { ascending: true })

        if (error) throw error
        setMessages(data || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [patientId])

  return { messages, loading, error }
}

// Hook to fetch patient recommendations
export function useRecommendations(patientId: string | null) {
  const [recommendations, setRecommendations] = useState<PatientRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!patientId) {
      setLoading(false)
      return
    }

    const fetchRecommendations = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("patient_recommendations")
          .select("*")
          .eq("patient_id", patientId)
          .order("created_at", { ascending: false })

        if (error) throw error
        setRecommendations(data || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [patientId])

  return { recommendations, loading, error }
}

// Hook to fetch all doctors
export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from("doctors").select("*").order("full_name", { ascending: true })

        if (error) throw error
        setDoctors(data || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  return { doctors, loading, error }
}

// Hook to fetch appointments
export function useAppointments(userId: string | null, role: "patient" | "doctor") {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchAppointments = async () => {
      try {
        const supabase = createClient()
        const column = role === "patient" ? "patient_id" : "doctor_id"
        const { data, error } = await supabase
          .from("appointments")
          .select("*")
          .eq(column, userId)
          .order("appointment_date", { ascending: false })

        if (error) throw error
        setAppointments(data || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [userId, role])

  return { appointments, loading, error }
}

// Hook to fetch medical records
export function useMedicalRecords(patientId: string | null) {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!patientId) {
      setLoading(false)
      return
    }

    const fetchRecords = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("medical_records")
          .select("*")
          .eq("patient_id", patientId)
          .order("uploaded_at", { ascending: false })

        if (error) throw error
        setRecords(data || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecords()
  }, [patientId])

  return { records, loading, error }
}

// Hook to fetch prescriptions
export function usePrescriptions(patientId: string | null) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!patientId) {
      setLoading(false)
      return
    }

    const fetchPrescriptions = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("prescriptions")
          .select("*")
          .eq("patient_id", patientId)
          .order("created_at", { ascending: false })

        if (error) throw error
        setPrescriptions(data || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrescriptions()
  }, [patientId])

  return { prescriptions, loading, error }
}
