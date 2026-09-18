import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  CloudRain,
  Sprout,
  Activity,
  Cpu,
  Share2,
  Download,
  Volume2,
  MessageSquare,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { speakLocalizedText } from '../services/speechService';

interface GuidedDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteDemo: (advisory: AdvisoryData) => void;
  onOpenVoice: () => void;
}

export const GuidedDemoModal: React.FC<GuidedDemoModalProps> = ({
  isOpen,
  onClose,
  onCompleteDemo,
  onOpenVoice,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Demo profile
  const demoProfile: FarmerProfile = {
    name: 'Ram Charan Verma',
    state: 'Uttar Pradesh',
    district: 'Prayagraj',
    village: 'Soraon Panchayat',
    crop: 'Wheat',
    variety: 'HD-2967 (Pusa Gautami)',
    soilType: 'Gangetic Alluvial Loam',
    sowingDate: '15 November 2026',
    cropStage: 'Tillering (42 Days After Sowing)',
    irrigation: 'Borewell',
    farmSize: '3.5',
    farmingGoal: 'Minimize climate risks, protect tillering yield, and reduce synthetic urea consumption.',
  };

  // Demo Advisory
  const demoAdvisory: AdvisoryData = {
    id: 'adv-demo-flow-01',
    timestamp: 'Today, 11:45 AM (Synchronized)',
    crop: 'Wheat',
    state: 'Uttar Pradesh',
    district: 'Prayagraj',
    cropStatus: "Wheat is in peak Tillering vegetative development. Root elongation (crown roots) has penetrated 18cm into the Gangetic alluvial silt. Leaf area index (LAI) is 2.8 with NDVI recorded at 0.74 by Sentinel-2.",
    weatherImpact: "IMD Mausam radar scans detect incoming convective cloud formations with 42% probability of 8-12mm precipitation within 48 hours. Night-time humidity will reach 82%, lowering thermal stress but elevating fungal infection risk.",
    irrigationAdvice: "HOLD IRRIGATION IMMEDIATELY for the next 72 hours. Subsurface moisture is optimal at 64%. Supplementary watering now will result in water-logging around crown roots and promote root asphyxiation.",
    soilAdvice: "Soil testing reveals available Nitrogen is deficient at 220 kg/ha, while Organic Carbon is moderate at 0.72%. Do not broadcast urea prior to rainfall. Prepare for split application once the field returns to workable moisture (Vapsa).",
    nutrientGuidance: {
      ureaKgPerAcre: 28,
      dapKgPerAcre: 0,
      mopKgPerAcre: 12,
      micronutrients: "Foliar spray of Zinc Sulphate (0.5%) + Urea (2%) after rainfall to counteract root-zone leaching.",
      applicationTiming: "Split top-dressing scheduled on Day 4 after field drains naturally.",
    },
    pestDiseaseRisk: {
      riskLevel: 'MEDIUM',
      detectedRisks: ['Yellow Rust (Puccinia striiformis)', 'Aphid colonies along field margins'],
      symptomsToWatch: [
        'Linear yellow-orange fungal pustules on upper leaves',
        'Leaf tip chlorosis caused by sap-sucking nymphs',
      ],
      preventiveSprays: [
        'Preventive spray: 5% Neem Seed Kernel Extract (NSKE)',
        'Curative if rust pustules spread: Propiconazole 25% EC @ 1ml/L',
      ],
    },
    regenerativeRecommendation: {
      strategy: 'In-Situ Straw Mulching & Legume Green Manuring',
      coverCropSuggestion: 'Intercrop fast-growing Green Gram (Moong) along bunds to fix biological nitrogen.',
      soilCarbonAction: 'Retain 4-inch stubble cover to shield beneficial mycorrhizal fungal colonies from direct insolation.',
      waterConservationTip: 'Laser leveling and alternate furrow irrigation saves 35% aquifer water.',
    },
    sevenDayPlan: [
      { day: 'Day 1', activity: 'Suspend tube-well irrigation; clear field drainage ditches.', priority: 'HIGH' },
      { day: 'Day 2', activity: 'Scout northern field boundary for initial yellow rust pustules.', priority: 'HIGH' },
      { day: 'Day 3', activity: 'Rainfall occurrence monitoring; prevent standing puddles.', priority: 'MEDIUM' },
      { day: 'Day 4', activity: 'Apply foliar bio-fertilizer once sunlight breaks through clouds.', priority: 'MEDIUM' },
      { day: 'Day 5', activity: 'Top-dress split dose of Urea (28 kg/acre) in dry morning hours.', priority: 'HIGH' },
      { day: 'Day 6', activity: 'Erect 10 yellow sticky insect traps per acre.', priority: 'LOW' },
      { day: 'Day 7', activity: 'Log crop tiller density in Krishi Intelligence mobile app.', priority: 'LOW' },
    ],
    riskLevel: 'MEDIUM',
    explanation: "Synthesized using Google Gemini 1.5 agronomical reasoning. By integrating IMD 48h rain alerts with 64% soil moisture readings, the recommendation safeguards the farmer from ₹900 wasted diesel pumping and mitigates crown root rot.",
    isDemo: true,
    modelUsed: 'Google Gemini 1.5 Flash (Demo Mode)',
  };

  const steps = [
    { number: 1, title: 'Farmer Profile', desc: 'Spatio-temporal crop context' },
    { number: 2, title: 'Ingest Telemetry', desc: 'Weather + Soil + Satellite' },
    { number: 3, title: 'Context Packaging', desc: 'Synthesize structured prompt' },
    { number: 4, title: 'Google Gemini AI', desc: 'Neural reasoning engine' },
    { number: 5, title: 'Advisory Engine', desc: 'Generate localized actions' },
    { number: 6, title: 'Multi-Domain Plan', desc: 'Irrigation, Soil & Pest matrix' },
    { number: 7, title: 'Farmer Execution', desc: 'Save, Listen, Share & Track' },
  ];

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      onCompleteDemo(demoAdvisory);
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#091D14] border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2519] border-b border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xl">
              🚀
            </div>
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                Krishi Intelligence: End-to-End Guided Demo
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  Step {currentStep} of 7
                </span>
              </h3>
              <p className="text-xs text-emerald-200/70">
                Witness how raw Indian field telemetry transforms into actionable climate-resilient agroadvisory via Google Gemini.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="px-6 py-3 bg-[#06140D] border-b border-emerald-500/15 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[620px] gap-2">
            {steps.map((s) => (
              <div
                key={s.number}
                onClick={() => setCurrentStep(s.number)}
                className={`flex items-center gap-2 cursor-pointer transition-all ${
                  currentStep === s.number
                    ? 'text-emerald-400 font-bold scale-105'
                    : currentStep > s.number
                    ? 'text-emerald-300/80 font-medium'
                    : 'text-slate-500'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                    currentStep === s.number
                      ? 'bg-emerald-500 text-black border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.8)]'
                      : currentStep > s.number
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {currentStep > s.number ? '✓' : s.number}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs tracking-tight">{s.title}</span>
                </div>
                {s.number < 7 && <span className="text-slate-600 text-xs ml-2">➔</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#071710]">
          {/* STEP 1: Farmer Profile */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-400" /> Step 1: Farmer Profile & Geography
                </h4>
                <span className="text-xs text-emerald-300/70 font-mono">Location ID: UP-PRY-042</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0B261A] p-4 rounded-xl border border-emerald-500/20">
                  <span className="text-xs text-emerald-300/70 block">Location Coordinates</span>
                  <p className="font-semibold text-white text-base mt-1">Uttar Pradesh</p>
                  <p className="text-sm text-emerald-200">District: Prayagraj</p>
                  <p className="text-xs text-slate-400 mt-1">Village: Soraon Panchayat</p>
                </div>
                <div className="bg-[#0B261A] p-4 rounded-xl border border-emerald-500/20">
                  <span className="text-xs text-emerald-300/70 block">Crop & Phenology</span>
                  <p className="font-semibold text-white text-base mt-1">Wheat (गेहूं)</p>
                  <p className="text-sm text-emerald-200">Variety: HD-2967 (Pusa Gautami)</p>
                  <p className="text-xs text-amber-300 mt-1">Stage: Tillering (42 DAS)</p>
                </div>
                <div className="bg-[#0B261A] p-4 rounded-xl border border-emerald-500/20">
                  <span className="text-xs text-emerald-300/70 block">Agronomic Parameters</span>
                  <p className="font-semibold text-white text-base mt-1">Farm Size: 3.5 Acres</p>
                  <p className="text-sm text-emerald-200">Soil: Gangetic Alluvial Loam</p>
                  <p className="text-xs text-slate-400 mt-1">Irrigation: Borewell + Canal</p>
                </div>
              </div>
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  Farmer profile validated against national Agristack digital registry. Ready to fetch real-time spatial telemetry.
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: Ingest Telemetry */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" /> Step 2: Multi-Source Telemetry Ingestion
                </h4>
                <span className="text-xs text-cyan-300/70 font-mono">Status: Synced 100%</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#0B261A] p-3 rounded-xl border border-cyan-500/25">
                  <span className="text-xs text-slate-400">🌦 Weather (IMD)</span>
                  <p className="text-xl font-bold text-white mt-1">29°C</p>
                  <p className="text-xs text-cyan-300">Rain Prob: 42% (48h)</p>
                </div>
                <div className="bg-[#0B261A] p-3 rounded-xl border border-emerald-500/25">
                  <span className="text-xs text-slate-400">🌱 Soil Health (ICAR)</span>
                  <p className="text-xl font-bold text-emerald-300 mt-1">pH 6.8</p>
                  <p className="text-xs text-emerald-400">Organic C: 0.72%</p>
                </div>
                <div className="bg-[#0B261A] p-3 rounded-xl border border-emerald-500/25">
                  <span className="text-xs text-slate-400">🛰 Satellite NDVI (ISRO)</span>
                  <p className="text-xl font-bold text-white mt-1">0.74</p>
                  <p className="text-xs text-emerald-400">Vigor: 82% (High)</p>
                </div>
                <div className="bg-[#0B261A] p-3 rounded-xl border border-blue-500/25">
                  <span className="text-xs text-slate-400">💧 Soil Moisture</span>
                  <p className="text-xl font-bold text-cyan-300 mt-1">64%</p>
                  <p className="text-xs text-cyan-400">Optimal Range</p>
                </div>
              </div>
              <div className="bg-[#081F15] p-4 rounded-xl border border-emerald-500/20 text-xs text-slate-300 space-y-1 font-mono">
                <p className="text-emerald-400">✓ [IMD-API] Fetched gridded precipitation forecasts for 25.4358° N, 81.8463° E</p>
                <p className="text-emerald-400">✓ [SHC-API] Retrieved soil test record #SHC-UP-2026-894 (Nitrogen: 220 kg/ha)</p>
                <p className="text-emerald-400">✓ [Sentinel-2] Processed 10-meter resolution Band 4 & Band 8 surface reflectance</p>
              </div>
            </div>
          )}

          {/* STEP 3: Context Packaging */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-amber-400" /> Step 3: Structured Context Assembly
                </h4>
                <span className="text-xs text-amber-300 font-mono">Tokens: 1,248</span>
              </div>
              <div className="bg-[#040E0A] p-4 rounded-xl border border-emerald-500/30 text-xs font-mono text-emerald-300 space-y-1 overflow-x-auto max-h-[220px]">
                <p className="text-slate-400">// Context payload dispatched to Google Gemini 1.5</p>
                <p>&#123;</p>
                <p className="pl-4">"location": &#123; "state": "Uttar Pradesh", "district": "Prayagraj", "village": "Soraon" &#125;,</p>
                <p className="pl-4">"crop": &#123; "name": "Wheat", "variety": "HD-2967", "stage": "Tillering (42 DAS)" &#125;,</p>
                <p className="pl-4">"meteorology": &#123; "temp": 29, "rainProbability": 42, "rainfallExpected": "8-12mm in 48h", "humidity": 68 &#125;,</p>
                <p className="pl-4">"soil": &#123; "pH": 6.8, "nitrogenKgHa": 220, "organicCarbon": 0.72, "moisture": 64 &#125;,</p>
                <p className="pl-4">"satellite": &#123; "ndvi": 0.74, "healthScore": 82, "waterStress": "Moderate" &#125;</p>
                <p>&#125;</p>
              </div>
              <p className="text-xs text-slate-300">
                The platform cleans, normalizes, and injects ICAR agronomic rules into the prompt schema, ensuring Google Gemini reasons over verified agricultural science rather than generic approximations.
              </p>
            </div>
          )}

          {/* STEP 4: Google Gemini AI Analysis */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" /> Step 4: Google Gemini AI Reasoning
                </h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                  Gemini 1.5 Flash
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0B261A] p-4 rounded-xl border border-emerald-500/20 space-y-2">
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Agronomic Deduction #1</span>
                  <h5 className="font-bold text-white text-sm">Precipitation vs Irrigation Conflict</h5>
                  <p className="text-xs text-slate-300">
                    Soil moisture is 64% (optimal). Applying tube-well irrigation right before a 42% probability rain event will induce root hypoxia and waste electricity.
                  </p>
                </div>
                <div className="bg-[#0B261A] p-4 rounded-xl border border-emerald-500/20 space-y-2">
                  <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Agronomic Deduction #2</span>
                  <h5 className="font-bold text-white text-sm">Fungal Rust Incubation Window</h5>
                  <p className="text-xs text-slate-300">
                    Humid post-rain environment (82% humidity, 22-26°C) aligns with the infection curve of Puccinia striiformis (Yellow Stripe Rust). Immediate prophylactic scouting is required.
                  </p>
                </div>
              </div>
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>JSON response parsed and validated against schema with 0 validation warnings.</span>
              </div>
            </div>
          )}

          {/* STEP 5: Advisory Engine Generation */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Step 5: Localized Advisory Synthesis
                </h4>
                <span className="text-xs text-emerald-300 font-mono">Engine: AdvisoryCore v2.4</span>
              </div>
              <div className="bg-[#0B261A] p-4 rounded-xl border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Primary Advisory Directive</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                    MEDIUM RISK
                  </span>
                </div>
                <p className="text-base font-bold text-white leading-snug">
                  "Hold irrigation for 72 hours due to incoming 48h rain event. Scout crop borders for yellow rust spores."
                </p>
                <div className="p-3 bg-[#06140D] rounded-lg border border-emerald-500/15 text-xs text-slate-300">
                  <strong className="text-emerald-300">Why this recommendation?</strong> {demoAdvisory.explanation}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Multi-Domain Plan */}
          {currentStep === 6 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <CloudRain className="w-5 h-5 text-blue-400" /> Step 6: 7-Day Precision Action Matrix
                </h4>
                <span className="text-xs text-blue-300 font-mono">7 Action Items</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto">
                {demoAdvisory.sevenDayPlan.slice(0, 4).map((plan, idx) => (
                  <div key={idx} className="bg-[#0B261A] p-3 rounded-xl border border-emerald-500/20 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{plan.day}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                          plan.priority === 'HIGH' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {plan.priority}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{plan.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#081F15] p-3 rounded-xl border border-emerald-500/20 text-xs text-emerald-200">
                🌿 <strong>Regenerative Recommendation:</strong> {demoAdvisory.regenerativeRecommendation.strategy} — {demoAdvisory.regenerativeRecommendation.waterConservationTip}
              </div>
            </div>
          )}

          {/* STEP 7: Farmer Execution */}
          {currentStep === 7 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Step 7: Farmer Action & Knowledge Federation
                </h4>
                <span className="text-xs text-emerald-400 font-bold">READY TO ACT</span>
              </div>
              <p className="text-sm text-slate-200">
                The advisory is now active and accessible via mobile offline storage, SMS dispatch, voice playback, and state network sharing.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => alert('Advisory saved to offline storage for remote field access!')}
                  className="p-3 bg-[#0B261A] hover:bg-[#0E3222] border border-emerald-500/30 rounded-xl flex flex-col items-center gap-2 text-center text-xs text-emerald-200"
                >
                  <Download className="w-5 h-5 text-emerald-400" />
                  <span>Save Advisory</span>
                </button>
                <button
                  onClick={() => alert('Advisory text formatted and ready for WhatsApp / SMS broadcast!')}
                  className="p-3 bg-[#0B261A] hover:bg-[#0E3222] border border-emerald-500/30 rounded-xl flex flex-col items-center gap-2 text-center text-xs text-emerald-200"
                >
                  <Share2 className="w-5 h-5 text-emerald-400" />
                  <span>Share (WhatsApp)</span>
                </button>
                <button
                  onClick={() => {
                    if ('speechSynthesis' in window) {
                      const u = new SpeechSynthesisUtterance(demoAdvisory.cropStatus + ' ' + demoAdvisory.irrigationAdvice);
                      window.speechSynthesis.speak(u);
                    } else {
                      alert('Speech synthesis not available in this browser');
                    }
                  }}
                  className="p-3 bg-[#0B261A] hover:bg-[#0E3222] border border-emerald-500/30 rounded-xl flex flex-col items-center gap-2 text-center text-xs text-emerald-200"
                >
                  <Volume2 className="w-5 h-5 text-emerald-400" />
                  <span>Listen Aloud</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenVoice();
                  }}
                  className="p-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl flex flex-col items-center gap-2 text-center text-xs text-white shadow-lg"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Ask AI Assistant</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-[#0B2519] border-t border-emerald-500/20 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Step {currentStep} of 7: {steps[currentStep - 1].title}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-xl flex items-center gap-1 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all"
          >
            {currentStep === 7 ? 'Load Into Dashboard' : 'Next Step'} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
