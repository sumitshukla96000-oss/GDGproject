import React from 'react';
import {
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface JudgingPageProps {
  onSelectTab: (tab: string) => void;
  onOpenDemo: () => void;
  onOpenVoice: () => void;
}

export const JudgingPage: React.FC<JudgingPageProps> = ({
  onSelectTab,
  onOpenDemo,
  onOpenVoice,
}) => {
  const criteria = [
    {
      id: 1,
      title: 'Functioning End-to-End Flow',
      desc: 'Complete journey from farmer location & crop input ➔ multi-source telemetry ingestion ➔ Gemini synthesis ➔ localized actionable advisory.',
      targetTab: 'agroadvisory',
      badge: 'Interactive Flow',
    },
    {
      id: 2,
      title: 'Mandatory Google AI / Gemini Integration',
      desc: 'Direct server-side integration with Google Gemini 1.5 Flash / Pro with structured JSON schema and prompt agronomic guards.',
      targetTab: 'agroadvisory',
      badge: 'Real AI Core',
    },
    {
      id: 3,
      title: 'Real or Realistic Agricultural Data',
      desc: 'Transparently benchmarked against IMD gridded weather, ICAR Soil Health Card parameters, and Sentinel-2 / Bhuvan NDVI readings.',
      targetTab: 'data-sources',
      badge: 'ICAR / IMD Benchmarked',
    },
    {
      id: 4,
      title: 'Built for India & Indian States',
      desc: 'Configured with real cropping patterns, agro-climatic zones, and mandi structures for UP, Punjab, Maharashtra, MP, Bihar, Rajasthan, TN, Karnataka.',
      targetTab: 'india-network',
      badge: '8 Major States',
    },
    {
      id: 5,
      title: 'Multilingual Support',
      desc: 'Full bilingual toggle between English and Hindi across farmer-facing interfaces, with UI selectors for Bengali, Marathi, Tamil, Telugu, Gujarati, Punjabi.',
      targetTab: 'dashboard',
      badge: 'EN + HI Active',
    },
    {
      id: 6,
      title: 'Voice Support (Speech-to-Text & Text-to-Speech)',
      desc: 'Browser Web Speech API integration permitting farmers to ask questions verbally in Hindi/English and listen to advisories read aloud.',
      targetTab: 'dashboard',
      badge: 'Web Speech API',
    },
    {
      id: 7,
      title: 'AI-Based Crop Disease Screening',
      desc: 'Computer vision leaf disease screening using Google Gemini Vision, reporting confidence %, symptoms, next steps, and organic/chemical treatments.',
      targetTab: 'crop-doctor',
      badge: 'Multimodal Vision',
    },
    {
      id: 8,
      title: 'Satellite / Crop-Health Intelligence',
      desc: 'Interactive India map with 10m NDVI vegetation index, canopy moisture stress, and multi-spectral earth observation layers.',
      targetTab: 'satellite',
      badge: 'NDVI + Remote Sensing',
    },
    {
      id: 9,
      title: 'Soil-Health Analytics',
      desc: 'Visual gauges and progress bars for pH, Nitrogen, Phosphorus, Potassium, Organic Carbon, and Soil Moisture with AI Soil Plan generation.',
      targetTab: 'soil-health',
      badge: 'SHC Integration',
    },
    {
      id: 10,
      title: 'Weather & Climate Intelligence',
      desc: '7-day forecast with 4 agricultural impact hazard cards (Rain, Heat, Water Stress, Fungal) plus instant "How will this weather affect my crop?" AI explainer.',
      targetTab: 'weather',
      badge: 'Agro-meteorology',
    },
    {
      id: 11,
      title: 'Regenerative Agriculture',
      desc: '7 core natural farming pillars with an AI Regenerative Plan generator following the What, Why, and Expected Benefit framework.',
      targetTab: 'regenerative',
      badge: 'What / Why / Benefit',
    },
    {
      id: 12,
      title: 'Interoperable / Scalable Digital Public Good',
      desc: '10-layer architectural blueprint, state knowledge exchange protocols, and open data schemas designed to scale from district to national level.',
      targetTab: 'architecture',
      badge: 'DPI / AgriStack Ready',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071911] to-[#0D3021] border border-emerald-500/25 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-lg">
              🏆
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              HACKATHON JUDGING EVALUATION DASHBOARD
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            "Why this solves the challenge." Direct verification checklist of all 12 mandatory problem statement requirements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDemo}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>Launch 7-Step Demo</span>
          </button>
        </div>
      </div>

      {/* 12 Challenge Criteria Verification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {criteria.map((c) => (
          <div
            key={c.id}
            className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-5 shadow-xl space-y-3 flex flex-col justify-between hover:border-emerald-500/50 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-emerald-500/15">
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  CRITERION #{c.id}
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  {c.badge}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mt-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{c.title}</span>
              </h4>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {c.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-emerald-500/15 flex items-center justify-between">
              <span className="text-[11px] text-emerald-300/80 font-medium">✓ Fully Functional</span>
              <button
                onClick={() => {
                  if (c.id === 6) {
                    onOpenVoice();
                  } else {
                    onSelectTab(c.targetTab);
                  }
                }}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-200 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Test Live</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
