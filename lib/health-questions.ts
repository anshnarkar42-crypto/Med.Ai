import { hindiHealthQuestions } from "./health-questions-hindi"
import { englishHealthQuestions } from "./health-questions-english"

export type Language = "en" | "hi"

export interface HealthQuestion {
  id: string
  key: string
  question: string
  category: string
  requiresDetail: boolean
}

export interface HealthAnswer {
  questionId: string
  answer: "yes" | "no"
  details?: string
  category: string
}

export const getHealthQuestions = (language: Language): HealthQuestion[] => {
  const questions = language === "hi" ? hindiHealthQuestions : englishHealthQuestions

  return [
    {
      id: "1",
      key: "chronicDiseases",
      question: language === "hi" ? questions.chronicDiseases : questions.chronicConditions,
      category: "Medical History",
      requiresDetail: true,
    },
    {
      id: "2",
      key: "diagnosedConditions",
      question: language === "hi" ? questions.diagnosedConditions : questions.chronicConditionsDetails,
      category: "Medical History",
      requiresDetail: true,
    },
    {
      id: "3",
      key: "pastInfection",
      question: language === "hi" ? questions.pastInfection : questions.pastSickness,
      category: "Medical History",
      requiresDetail: true,
    },
    {
      id: "4",
      key: "surgery",
      question: language === "hi" ? questions.surgery : questions.surgery,
      category: "Surgical History",
      requiresDetail: true,
    },
    {
      id: "5",
      key: "hospitalization",
      question: language === "hi" ? questions.hospitalization : questions.hospitalStay,
      category: "Hospitalization",
      requiresDetail: true,
    },
    {
      id: "6",
      key: "majorInjury",
      question: language === "hi" ? questions.majorInjury : questions.injury,
      category: "Injury History",
      requiresDetail: true,
    },
    {
      id: "7",
      key: "currentMedication",
      question: language === "hi" ? questions.currentMedication : questions.medicineNow,
      category: "Medications",
      requiresDetail: true,
    },
    {
      id: "8",
      key: "allergies",
      question: language === "hi" ? questions.allergies : questions.allergy,
      category: "Allergies",
      requiresDetail: true,
    },
    {
      id: "9",
      key: "familyDiseases",
      question: language === "hi" ? questions.familyDiseases : questions.familyHealth,
      category: "Family History",
      requiresDetail: true,
    },
    {
      id: "10",
      key: "childhoodIllness",
      question: language === "hi" ? questions.childhoodIllness : questions.childhoodSick,
      category: "Childhood History",
      requiresDetail: true,
    },
    {
      id: "11",
      key: "smokingAlcohol",
      question: language === "hi" ? questions.smokingAlcohol : questions.pastSmokeAlcohol,
      category: "Lifestyle",
      requiresDetail: true,
    },
    {
      id: "12",
      key: "lifeStress",
      question: language === "hi" ? questions.lifeStress : questions.smoke,
      category: "Lifestyle",
      requiresDetail: true,
    },
  ]
}
