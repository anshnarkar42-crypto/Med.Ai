import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      landing: {
        hero: "Med.AI - Intelligent Healthcare Assistant",
        subtitle: "AI-powered triage, symptom analysis & emergency automation",
        patientDesc: "Symptom checker, AI chat, history, emergencies",
        doctorDesc: "Manage cases, triage alerts, respond to patients",
        staffDesc: "Emergency alerts, bed management, patient flow",
        continueAsPatient: "Continue as Patient",
        continueAsDoctor: "Continue as Doctor",
        continueAsStaff: "Continue as Staff",
      },
      roles: {
        patient: "Patient",
        doctor: "Doctor",
        staff: "Staff",
      },
    },
  },
  hi: {
    translation: {
      landing: {
        hero: "Med.AI - बुद्धिमान स्वास्थ्य सहायक",
        subtitle: "AI-संचालित ट्राइएज, लक्षण विश्लेषण और आपातकालीन स्वचालन",
        patientDesc: "लक्षण जांच, AI चैट, इतिहास, आपात स्थिति",
        doctorDesc: "मामलों का प्रबंधन, ट्राइएज अलर्ट, रोगियों को जवाब",
        staffDesc: "आपातकालीन अलर्ट, बिस्तर प्रबंधन, रोगी प्रवाह",
        continueAsPatient: "रोगी के रूप में जारी रखें",
        continueAsDoctor: "डॉक्टर के रूप में जारी रखें",
        continueAsStaff: "स्टाफ के रूप में जारी रखें",
      },
      roles: {
        patient: "रोगी",
        doctor: "डॉक्टर",
        staff: "स्टाफ",
      },
    },
  },
  mr: {
    translation: {
      landing: {
        hero: "Med.AI - बुद्धिमान आरोग्य सहाय्यक",
        subtitle: "AI-चालित ट्रायएज, लक्षण विश्लेषण आणि आपत्कालीन स्वयंचलन",
        patientDesc: "लक्षण तपासणी, AI चॅट, इतिहास, आपत्काल",
        doctorDesc: "प्रकरणे व्यवस्थापित करा, ट्रायएज सूचना, रुग्णांना प्रतिसाद द्या",
        staffDesc: "आपत्कालीन सूचना, बेड व्यवस्थापन, रुग्ण प्रवाह",
        continueAsPatient: "रुग्ण म्हणून सुरू ठेवा",
        continueAsDoctor: "डॉक्टर म्हणून सुरू ठेवा",
        continueAsStaff: "स्टाफ म्हणून सुरू ठेवा",
      },
      roles: {
        patient: "रुग्ण",
        doctor: "डॉक्टर",
        staff: "स्टाफ",
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
})

export default i18n
