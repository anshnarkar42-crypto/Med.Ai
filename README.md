
## Deployment
Your project is live at:
**[https://vercel.com/anshnarkar42-5703s-projects/v0-v0medaihealthcareappmainmain-xk](https://vercel.com/anshnarkar42-5703s-projects/v0-v0medaihealthcareappmainmain-xk)**
# Med.AI – Intelligent Healthcare Assistant

<img width="1890" height="919" alt="image" src="https://github.com/user-attachments/assets/caab0ba2-11dc-4ce3-88a6-13bf829aee2d" /># Med.AI - Intelligent Healthcare Assistant

A comprehensive, modern, responsive frontend-only React application for healthcare management with AI-powered features, role-based dashboards, emergency response capabilities, and multi-language support.

## Features

### Core Functionality
- *Multi-Language Support*: English, Hindi, Marathi, Tamil, Gujarati, Bengali with i18next
- *Voice Recognition*: Web Speech API integration with continuous listening mode
- *Role-Based Access*: Patient, Doctor, and Hospital Staff dashboards
- *AI Symptom Checker*: Chat-style interface with body map and voice input
- *Emergency System*: Always-listening wake word detection with authenticity scoring
- *Doctor Consultation*: Patient management, case details, prescription writing
- *Hospital Management*: Resource tracking, task management, emergency alerts
- *Supabase Integration*: Full database backend with authentication

### Authentication System
- *Login & Signup*: Role-based authentication for Patients, Doctors, and Hospital Staff
- *Demo Credentials*: Use any role with email john.doe@example.com and password demo123
- *Role-Specific Registration*: Specialized signup forms with relevant fields for each role
- ![WhatsApp Image 2025-11-29 at 11 13 47_b4cd4735](https://github.com/user-attachments/assets/94bdb85e-416f-4140-977f-3278e64f1846)


### Patient Dashboard
- *AI Symptom Checker*: Interactive chat interface with:
  - Voice input with language selection
  - Body map for pain location selection
  - Patient information panel (age, gender, conditions, medications, allergies)
  - AI clarifying questions
  - Real-time typing indicators
  - <img width="1862" height="927" alt="image" src="https://github.com/user-attachments/assets/eb4aa47b-13ed-4324-a155-ea4a3c2df47c" />

- *AI Result Page*: Comprehensive analysis including:
  - Animated triage meter with urgency levels (0-3)
  - Condition cards with probability scores and confidence levels
  - Expandable condition details with symptoms and reasons
  - Immediate recommendations and OTC suggestions
  - When to seek help guidelines
  - Doctor carousel with filters (specialization, fee range)
  - Care escalation path visualization
  - ![WhatsApp Image 2025-11-29 at 11 51 20_f191581f](https://github.com/user-attachments/assets/7cd97f90-3a76-4bbd-b9bf-287f184ea393)
  - ![WhatsApp Image 2025-11-29 at 11 51 47_35624e9d](https://github.com/user-attachments/assets/85460ca6-e33d-4e7b-92bd-ee792481c622)

- *Emergency Page*: Panic-proof UI with:
  - Large tappable action buttons (Call 108, Notify Hospital, Share Location)
  - Auto-escalation timer with countdown
  - Emergency evidence panel (voice recordings, vitals)
  - Authenticity confidence meter with detailed scoring
  - Hospital notification payload preview
  - Real-time response tracking with timeline
  - ![WhatsApp Image 2025-11-29 at 11 13 47_d002d0ea](https://github.com/user-attachments/assets/bb5777bf-a517-462c-9323-2812e2e8f223)

- *Health Overview*: Quick stats on health status, appointments, and records
- *Appointment Management*: Book, view, and manage consultations
- *Medical Records*: Upload, view, and organize documents
- <img width="1802" height="923" alt="image" src="https://github.com/user-attachments/assets/c8561096-f620-437a-8f7f-5b658a620102" />
- <img width="1656" height="824" alt="image" src="https://github.com/user-attachments/assets/2ad88751-5295-43ed-872e-eceb376187dc" />

### Doctor Dashboard
- *Patient Management*: Browse patient list with urgency indicators
- *Appointments*: Schedule management and calendar view
- *Case Details Modal*: Access complete patient history and prescriptions
- *Clinical Notes*: Add detailed notes and prescriptions
- <img width="1822" height="918" alt="image" src="https://github.com/user-attachments/assets/25f3a77c-be32-4386-9f32-c0b8f4504517" />


### Hospital Staff Dashboard
- *Hospital Statistics*: Overview of patients, discharges, and alerts
- *Task Management*: Daily task tracking with priorities
- *Patient Admission*: Manage admissions and bed assignments
- *Inventory Management*: Track supplies with low-stock alerts

### Emergency Listening System

*Landing Page Integration:*
- Always-listening emergency detector with consent modal
- Bottom-left pill showing listener status
- Real-time audio level visualization
- Automatic emergency pre-triage modal
-<img width="1814" height="920" alt="image" src="https://github.com/user-attachments/assets/55f0dbea-2eef-4395-afd9-8a9a17964150" />

*Wake Words:*
- English: "MedAI", "Med.AI", "Med AI", "Hey MedAI"
- Hindi: "Med AI madad", "Med AI madad karo"

*Emergency Keywords:*
- English: "help", "dying", "can't breathe", "coughing blood", "chest pain", "fainting"
- Hindi: "madad", "bachao"

*Authenticity Scoring:*
- *HIGH* (70%+): Voice + history match + context support
- *MEDIUM* (40-70%): Voice matches but weak history correlation
- *LOW* (<40%): Ambiguous wake word only

*Escalation Behavior:*
- HIGH: Immediate hospital notification + 108 call suggestion
- MEDIUM: Pre-triage questions then escalate
- LOW: Guidance with manual escalate option
- Silent escalation after 7-10 seconds of no response
- <img width="1874" height="898" alt="image" src="https://github.com/user-attachments/assets/a4368964-fe82-42ba-b746-0b7c9dec11b7" />

- -<img width="1826" height="924" alt="image" src="https://github.com/user-attachments/assets/e30850e6-a0e5-479f-a828-cb38cca9a527" />

-<img width="1792" height="885" alt="image" src="https://github.com/user-attachments/assets/88eb15b2-e42c-4766-a095-0d6c6fa1aecc" />

## Pages & Routes

\\\`
/                          - Landing page with role cards and emergency listener
/login                     - Login page (integrated into landing)
/signup                    - Signup page (integrated into landing)
/patient/dashboard         - Patient health cockpit
/patient/symptom-input     - Chat-style symptom input with body map
/patient/ai-result         - AI analysis with triage meter
/patient/emergency         - Emergency UI with authenticity scoring
/appointments              - Appointment history and management
/records                   - Medical records viewer
/history                   - Medical history timeline
/symptom-checker           - Dedicated symptom checker page
/doctor/dashboard          - Doctor patient management
/staff/dashboard           - Hospital staff resource management
\\\`

## Technology Stack

- *Framework*: Next.js 16 (App Router)
- *Language*: TypeScript
- *Styling*: Tailwind CSS v4
- *UI Components*: shadcn/ui
- *Internationalization*: react-i18next
- *Voice Recognition*: Web Speech API
- *Database*: Supabase (configured)
- *Icons*: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

\\\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\\\`

Open [http://localhost:3000](http://localhost:3000)

### Demo Usage

1. *Landing Page*: Choose a role (Patient/Doctor/Staff) or use emergency listener
2. *Emergency Test*: Enable listener and say "Med AI help"
3. *Symptom Check*: Navigate to symptom input and use voice/text
4. *Multi-Language*: Switch language from top navigation

### Demo Credentials

- Email: john.doe@example.com
- Password: demo123
- Role: Any (Patient/Doctor/Staff)

Or click role cards on landing page for instant demo access.

## Environment Variables

Create .env.local:

\\\`env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_SUPABASE_URL=https://nszfgplzdrpgslvvfqai.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\\\`

## Supabase Setup

### Database Schema

Execute SQL scripts in Supabase SQL Editor (in order):

1. scripts/01-create-tables.sql - Create tables (patients, doctors, staff, appointments, etc.)
2. scripts/02-enable-rls.sql - Enable Row Level Security policies
3. scripts/03-seed-data.sql - Insert sample data

### Tables Created
- patients
- doctors  
- staff
- hospitals
- appointments
- medical_records
- prescriptions
- patient_history
- chat
- recommendations

### API Routes

- /api/auth/login - User authentication
- /api/auth/signup - User registration
- /api/symptom-checker - Save symptom analysis
- /api/emergency - Emergency alert endpoint

## Design System

### Colors
- *Medical Blue*: #0B5ED7
- *Teal*: #0CC7BD
- *White*: #FFFFFF
- *Soft Grey*: #F3F6FA
- *Dark Grey*: #1E1E1E

### Custom Animations
- animate-fade-in - Fade in on mount
- animate-slide-up - Slide up transition
- animate-pulse-glow - Glowing pulse effect
- animate-shimmer - Loading shimmer
- Glassmorphic effects with glass and glass-card utilities

### Key Components

*Emergency & Voice:*
- EmergencyListener - Always-on wake word detection
- EmergencyPreTriageModal - Emergency confirmation dialog
- VoiceInput - Voice recognition with language selection

*Medical:*
- BodyMap - Interactive body area selector
- TriageMeter - Animated urgency gauge
- DoctorCarousel - Swipeable doctor suggestions

*UI:*
- LanguageSwitcher - Multi-language toggle
- Navbar - Role-based navigation
- Patient/Doctor/Staff specific components

## Data Structure

### Dummy Data Files (/data)

- doctors.json - Doctor profiles with specializations
- patients.json - Patient medical records
- emergencies.json - Emergency event logs
- inventory.json - Hospital supply inventory

### API Wrapper (/lib/api.ts)

All API calls use placeholder functions:

\\\`typescript
import { api } from '@/lib/api'

// Get doctors with filters
const doctors = await api.getDoctors({ 
  specialization: 'Cardiologist',
  maxFee: 1000 
})

// Analyze symptoms
const result = await api.analyzeSymptoms({
  symptoms: 'chest pain',
  duration: '2 hours'
})

// Report emergency
await api.reportEmergency({
  type: 'voice_wake',
  confidence: 'high',
  location: { lat: 19.076, lng: 72.877 }
})
\\\`

## Replacing with Real Backend

1. Update NEXT_PUBLIC_API_BASE_URL in .env.local
2. Modify /lib/api.ts to use real fetch calls:

\\\`typescript
async getDoctors(filters?: any) {
  const response = await fetch(${API_BASE_URL}/doctors, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters)
  })
  return response.json()
}
\\\`

3. Remove dummy data imports and return API responses

## Project Structure

\\\`
med-ai/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing with emergency listener
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Theme, animations, utilities
│   ├── providers.tsx      # Auth + i18n providers
│   ├── patient/           # Patient pages
│   │   ├── dashboard/
│   │   ├── symptom-input/
│   │   ├── ai-result/
│   │   └── emergency/
│   ├── doctor/            # Doctor pages
│   ├── staff/             # Staff pages
│   ├── appointments/
│   ├── records/
│   ├── history/
│   └── api/               # API routes
├── components/            # React components
│   ├── auth/              # Login/Signup
│   ├── patient/           # Patient-specific
│   ├── doctor/            # Doctor-specific
│   ├── staff/             # Staff-specific
│   ├── ui/                # shadcn components
│   ├── emergency-listener.tsx
│   ├── emergency-pre-triage-modal.tsx
│   ├── voice-input.tsx
│   ├── body-map.tsx
│   ├── triage-meter.tsx
│   ├── doctor-carousel.tsx
│   └── language-switcher.tsx
├── lib/                   # Utilities
│   ├── api.ts             # API wrappers
│   ├── auth-context.tsx   # Auth state
│   ├── i18n.ts            # i18n config
│   ├── voice-recognition.ts
│   ├── types.ts
│   ├── dummy-data.ts
│   └── supabase/          # Supabase clients
├── data/                  # Dummy JSON data
├── locales/               # Translations (en, hi, mr)
├── public/                # Static assets
├── scripts/               # SQL migration scripts
└── package.json
\\\`

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation throughout
- High contrast mode compatible
- Screen reader optimized
- Large touch targets (44x44px minimum)
- Focus indicators on all focusable elements

## Testing Flows

### 1. Emergency Wake Detection
- Enable emergency listener on landing
- Say "Med AI help" or "Med AI madad karo"
- Verify pre-triage modal with countdown
- Check authenticity confidence display
- Test emergency page actions

### 2. Symptom Analysis
- Go to /patient/symptom-input
- Type or use voice for symptoms
- Click body map to select area
- Answer AI clarifying questions
- Analyze and view result with triage meter

### 3. Doctor Booking
- View AI result page
- Browse doctor carousel
- Apply filters (specialization, fee)
- Click "Book Now" button

### 4. Multi-Language
- Change language from top navigation
- Verify all UI text updates
- Test voice input in Hindi/Marathi

### 5. Role Switching
- Log in as Patient
- Use role switcher in navbar
- Switch to Doctor/Staff
- Verify appropriate dashboard loads

## Performance Optimizations

- Lazy loading for heavy components
- Optimized images with Next.js Image
- Code splitting per route
- Debounced voice recognition
- Memoized expensive calculations
- Skeleton loaders for async data

## Browser Support

- Chrome/Edge 90+ (recommended for voice)
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

- Voice recognition requires HTTPS (except localhost)
- Speech API support varies by browser
- Emergency features are UI demonstrations
- No actual backend data persistence (uses sessionStorage)

## Future Enhancements

*Production Ready:*
1. Connect real backend APIs
2. Implement actual voice-to-text service (Google Cloud Speech, Azure)
3. Add payment gateway integration
4. Real hospital/ambulance API integration
5. Video consultation (WebRTC)
6. Real-time chat messaging (WebSocket)
7. Push notifications
8. Mobile apps (React Native)
9. AI model fine-tuning for better predictions
10. EHR system integration

*Features:*
- Medication reminders
- Health tracking (vitals, symptoms over time)
- Insurance integration
- Lab test results viewer
- Prescription refill requests
- Family member management
- Doctor ratings and reviews
- Multi-factor authentication

## Security Considerations

When moving to production:

- Implement proper JWT authentication
- Add rate limiting on API routes
- Encrypt sensitive medical data
- HIPAA compliance measures
- Audit logging for all actions
- Secure file upload validation
- SQL injection prevention
- XSS protection
- CSRF tokens

## License

MIT

## Support

For issues or questions:
- GitHub Issues: [repository-url]
- Email: support@medai.com
- Documentation: docs.medai.com

---

*Important*: This is a frontend demonstration with placeholder APIs and simulated features. All emergency detection, voice recognition, and AI analysis are UI/UX demonstrations for evaluation purposes only. Do not use for actual medical emergencies.
