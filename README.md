# 🌾 KRISHI INTELLIGENCE (कृषि इंटेलिजेंस)
> *"AI-powered agricultural intelligence for a climate-resilient India."*

---

## 🌟 Overview & Problem Statement

Small and marginal farmers across India lack access to data-driven agricultural guidance. Traditional farming decisions made without combining satellite remote sensing, soil health analytics, meteorological forecasting, and AI increase crop failure risks and vulnerability to climate shocks.

**Krishi Intelligence** is a complete, production-ready, interoperable digital agricultural intelligence platform engineered specifically for Indian farmers and state agricultural networks. It synthesizes real-time field coordinates, satellite vegetation indices (NDVI), ICAR Soil Health Card telemetry, and IMD numerical weather predictions via **Google Gemini 1.5** into localized, hazard-aware, actionable agroadvisories.

---

## 🎨 Visual Design & Theme Fidelity

The application strictly implements the design language demonstrated in `theme.png`:
- **Color Palette**: Dark forest charcoal background (`#06130D` / `#0A2016`), radiant emerald indicators (`#10B981` / `#22C55E`), electric cyan telemetry highlights, and warm harvest gold accents.
- **Header & Navigation**: State/District/Village selectors, `🟡 DEMO DATA` / `🟢 LIVE DATA` indicator, multilingual switcher (English, हिन्दी, + 6 Indian regional scripts), voice query mic, notifications, and farmer profile.
- **Hero Section**: *"Intelligence for Every Field."* with tablet-enabled Indian farmer visual, satellite remote sensing overlay, and primary/secondary CTAs.
- **Location Overview**: 6 metric cards for Weather, Soil Health, Crop Health, Soil Moisture, Disease Risk, and Climate Risk.
- **Today's AI Advisory**: Action-oriented advisory card with visual weather artwork, rain alert, and audio read-aloud buttons.
- **Agricultural Intelligence Map**: Interactive SVG map of India with 5 dynamic multi-spectral layers (Crop Health, Rainfall, Soil Moisture, Disease Risk, Climate Risk).
- **How It Works**: 5-stage closed-loop pipeline from Farmer Data ➔ Agricultural Data ➔ Google Gemini ➔ Localized Advisory ➔ Action.

---

## 🚀 Quick Start & How to Run

### Prerequisites
- Node.js (v18+ or v20+ LTS)
- npm (v9+)

### 1. Installation
```bash
git clone <repository_url>
cd hackathon
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Contents of `.env`:
```env
# Google Gemini API Key (Optional for Demo Mode, Mandatory for live Gemini 1.5 inference)
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key_here

# Backend Express Port (Default: 3001)
PORT=3001

# Frontend Vite Port (Default: 5173)
VITE_API_URL=http://localhost:3001
```

### 3. Running the Application

#### Option A: One-Command Full Stack (Recommended)
Builds the frontend and runs the unified Express server serving both the backend API and the frontend dashboard on port `3001`:
```bash
npm run build
node server/index.js
```
Open **[http://localhost:3001](http://localhost:3001)** in your browser.

#### Option B: Development Mode (Hot-Reload)
Run the backend server:
```bash
node server/index.js
```
In a separate terminal, start the Vite development server:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)**.

---

## 🤖 Google Gemini AI Integration

### How Gemini is Configured
- **Server-Side API Proxy**: To safeguard credentials, Google Gemini API keys are never exposed in frontend code. The backend Express server in `/server/index.js` manages all communications with `@google/generative-ai`.
- **Structured JSON Schema**: Prompts are constrained using Gemini's native `responseMimeType: "application/json"` schema, returning rigorous fields for `cropStatus`, `weatherImpact`, `irrigationAdvice`, `soilAdvice`, `nutrientGuidance`, `pestDiseaseRisk`, `regenerativeRecommendation`, `sevenDayPlan`, `riskLevel`, and agronomic `explanation`.
- **Multimodal Computer Vision**: The **Crop Doctor** module accepts plant leaf images via drag-and-drop, camera capture, or file upload, transforming them into base64 payload streams for Gemini Vision leaf pathology diagnosis.

### How Demo Mode Works
- When `GOOGLE_GEMINI_API_KEY` is not present in `.env`, the system **never crashes or blocks the user**.
- It automatically activates the built-in agronomic simulation engine with realistic, internally consistent telemetry for 8 Indian states.
- Responses generated in demo mode are transparently tagged with:
  `✦ AI DEMO RESPONSE` or `AI Generated (Demo)`
- When an API key is configured, the badge updates dynamically to:
  `✦ LIVE GEMINI AI` or `Google Gemini (Live)`

---

## 🗺️ Live vs. Demonstration Data Transparency

| Data Category | Source / Provider | Type | Current Status |
|---|---|---|---|
| **Agro-Meteorology** | India Meteorological Department (IMD) / Open-Meteo | LIVE API / Simulated | Operational 7-Day Grid |
| **Soil Analytics** | ICAR National Soil Bureau / Soil Health Card (SHC) | PUBLIC DATASET | Geo-tagged benchmark repository |
| **Satellite Remote Sensing** | ISRO Bhuvan / ESA Sentinel-2 (10m MSI) | PUBLIC DATASET | NDVI & Moisture Stress Index |
| **AI Inference** | Google Gemini 1.5 Flash / Pro | LIVE API | Active with fallback to Demo Engine |
| **Mandi Price Intelligence** | AGMARKNET / Directorate of Marketing & Inspection | LIVE API | Daily modal prices for APMC mandis |
| **State Knowledge Federation** | Inter-State Cooperative Agricultural Ledger | DEMO DATA | Multi-state model exchange sandbox |

---

## 📱 Features & Page Directory

1. **Global Navigation & Top Bar**: State, district, and village selectors, data mode badge, language switcher, voice mic, notifications drawer, and farmer profile.
2. **Page 1: Landing / Home**: Pixel-perfect realization of `theme.png`, 6 live metric cards, Today's AI Advisory spotlight card, interactive SVG India map with 5 layers, and "How It Works" 5-stage pipeline.
3. **Page 2: Farmer Dashboard**: Personalized farmer telemetry with district weather alerts, crop switchers, and real-time hazard matrix.
4. **Page 3: AI Agroadvisory (Core Feature)**: Complete agronomic form, animated 4-step AI synthesis stepper (🧠 *Krishi AI is analyzing...*), structured advisory dossier, 7-day action matrix, "Why this recommendation?" rationale, and Save/Share/Listen actions.
5. **Page 4: Crop Doctor**: AI computer vision disease screening with image upload/camera support, sample gallery for instant testing (Wheat Leaf Rust, Rice Blight, Cotton Leaf Curl, Tomato Early Blight), confidence %, symptoms, remedies, and expert disclaimer.
6. **Page 5: Satellite Intelligence**: All-India interactive remote sensing map with 8 layers (NDVI, Crop Health, Moisture Stress, Rainfall, Climate Risk) and telemetry breakdown.
7. **Page 6: Soil Health Intelligence**: Interactive gauges for pH, N, P, K, Organic Carbon, and Moisture with an automated AI Soil Regeneration Plan generator.
8. **Page 7: Weather & Climate Intelligence**: 7-day forecast, 4 agro-hazard cards (Rain, Heat, Water Stress, Fungal), and an instant *"How will this weather affect my crop?"* AI explainer.
9. **Page 8: Regenerative Farming**: 7 core pillars with an AI Regenerative Strategy generator utilizing the **What, Why, and Expected Benefit** framework.
10. **Page 9: India Agriculture Network**: Inter-state knowledge exchange, state-to-state model transfer (e.g. Punjab DSR water saving model adopted by UP/Bihar).
11. **Page 10: Digital Public Good (DPG) Architecture**: Interactive 10-layer architectural blueprint built on Digital Public Infrastructure (DPI) and AgriStack standards.
12. **Page 11: Multilingual Engine**: Centralized translation dictionary (`src/i18n/translations.ts`) with active English and Hindi coverage, plus selectors for Bengali, Marathi, Tamil, Telugu, Gujarati, and Punjabi.
13. **Page 12: Voice Assistant (Ask Krishi AI)**: Full Web Speech API speech-to-text recognition in Hindi and English, conversational agronomical answering, and SpeechSynthesis text-to-speech audio reader.
14. **Page 13: Data Sources Registry**: Public catalog documenting all data sources, update cadences, and transparency badges.
15. **Page 14: End-to-End Guided Demo Mode**: Interactive 7-step guided journey (1/7 to 7/7) demonstrating the entire user story with automated progress.
16. **Page 15: About & Impact**: District ➔ State ➔ Multi-State ➔ National scale vision.
17. **Hackathon Judging View**: Interactive verification checklist of all 12 problem statement requirements.

---

## ♿ Accessibility & Mobile Responsiveness

- **Mobile First**: Complete bottom navigation bar (`Home`, `Advisory`, `Doctor`, `Weather`, `More`), touch-friendly targets (>48px), and high contrast text ratios on dark backgrounds.
- **Accessibility**: Screen-reader friendly semantic HTML, ARIA labels, clean keyboard navigation, and bilingual speech synthesis.

---

## 📄 License & Attribution

Designed and engineered for the National Agricultural Intelligence Hackathon. Built as a Digital Public Good (DPG) aligned with India's AgriStack and Digital Public Infrastructure (DPI) vision.
