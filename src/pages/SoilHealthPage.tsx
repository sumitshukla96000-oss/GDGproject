import React, { useState } from 'react';
import {
  Sprout,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Info,
  Calendar,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react';
import { SoilData } from '../types';

interface SoilHealthPageProps {
  selectedState: string;
  selectedDistrict: string;
  soilData: SoilData;
  onSelectTab: (tab: string) => void;
}

export const SoilHealthPage: React.FC<SoilHealthPageProps> = ({
  selectedState,
  selectedDistrict,
  soilData,
  onSelectTab,
}) => {
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [soilPlan, setSoilPlan] = useState<any | null>(null);

  const handleGeneratePlan = () => {
    setIsGeneratingPlan(true);
    setTimeout(() => {
      setSoilPlan({
        targetOrganicCarbon: '0.95% within 2 seasons',
        basalBiofertilizer: 'Incorporate 2 tonnes/acre enriched vermicompost mixed with Trichoderma viride and PSB (Phosphate Solubilizing Bacteria).',
        nitrogenBufferStrategy: 'Adopt split 3-dose urea application and blend with Neem cake powder (5:1 ratio) to slow nitrate nitrification.',
        greenManuring: 'Sow Sesbania aculeata (Dhaincha) immediately after Rabi harvest; incorporate at 45 days during early flowering stage.',
        phCorrection: soilData.pH > 7.5 ? 'Apply agricultural gypsum @ 150 kg/acre to reduce soil sodicity.' : 'pH is balanced; avoid excessive acidifying synthetic chemical fertilizers.',
      });
      setIsGeneratingPlan(false);
    }, 1200);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimal':
      case 'High':
      case 'Healthy':
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'Moderate':
        return 'text-amber-300 bg-amber-500/20 border-amber-500/30';
      case 'Low':
      case 'Deficient':
      default:
        return 'text-red-400 bg-red-500/20 border-red-500/30';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071911] to-[#0D3021] border border-emerald-500/25 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-lg">
              🌱
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">SOIL HEALTH INTELLIGENCE</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Digital Soil Health Card (SHC) telemetry and bio-chemical nutrient benchmarking for Indian agro-climatic zones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0C2B1C] text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Soil Health Card Registry</span>
          </span>
        </div>
      </div>

      {/* Soil Parameter Gauges & Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* pH Gauge */}
        <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">pH Level</span>
            <span className="text-[10px] text-slate-500 font-mono">0-14</span>
          </div>
          <div className="my-3 text-center">
            <p className="text-3xl font-black text-white">{soilData.pH}</p>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${(soilData.pH / 10) * 100}%` }}
              ></div>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border text-center ${getStatusColor(soilData.phStatus)}`}>
            {soilData.phStatus}
          </span>
        </div>

        {/* Nitrogen */}
        <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">Nitrogen (N)</span>
            <span className="text-[10px] text-slate-500 font-mono">kg/ha</span>
          </div>
          <div className="my-3 text-center">
            <p className="text-3xl font-black text-white">{soilData.nitrogenKgHa}</p>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full"
                style={{ width: `${(soilData.nitrogenKgHa / 400) * 100}%` }}
              ></div>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border text-center ${getStatusColor(soilData.nitrogenStatus)}`}>
            {soilData.nitrogenStatus}
          </span>
        </div>

        {/* Phosphorus */}
        <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">Phosphorus (P)</span>
            <span className="text-[10px] text-slate-500 font-mono">kg/ha</span>
          </div>
          <div className="my-3 text-center">
            <p className="text-3xl font-black text-white">{soilData.phosphorusKgHa}</p>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${(soilData.phosphorusKgHa / 60) * 100}%` }}
              ></div>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border text-center ${getStatusColor(soilData.phosphorusStatus)}`}>
            {soilData.phosphorusStatus}
          </span>
        </div>

        {/* Potassium */}
        <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">Potassium (K)</span>
            <span className="text-[10px] text-slate-500 font-mono">kg/ha</span>
          </div>
          <div className="my-3 text-center">
            <p className="text-3xl font-black text-white">{soilData.potassiumKgHa}</p>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${(soilData.potassiumKgHa / 300) * 100}%` }}
              ></div>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border text-center ${getStatusColor(soilData.potassiumStatus)}`}>
            {soilData.potassiumStatus}
          </span>
        </div>

        {/* Organic Carbon */}
        <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">Organic Carbon</span>
            <span className="text-[10px] text-slate-500 font-mono">%</span>
          </div>
          <div className="my-3 text-center">
            <p className="text-3xl font-black text-amber-300">{soilData.organicCarbonPercent}%</p>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full"
                style={{ width: `${(soilData.organicCarbonPercent / 1.2) * 100}%` }}
              ></div>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border text-center ${getStatusColor(soilData.organicCarbonStatus)}`}>
            {soilData.organicCarbonStatus}
          </span>
        </div>

        {/* Moisture */}
        <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">Soil Moisture</span>
            <span className="text-[10px] text-slate-500 font-mono">%</span>
          </div>
          <div className="my-3 text-center">
            <p className="text-3xl font-black text-cyan-300">{soilData.moisturePercent}%</p>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full"
                style={{ width: `${soilData.moisturePercent}%` }}
              ></div>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border text-center ${getStatusColor(soilData.moistureStatus)}`}>
            {soilData.moistureStatus}
          </span>
        </div>
      </div>

      {/* AI Soil Advisory & Action Generation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: AI Soil Advisory Overview */}
        <div className="lg:col-span-6 bg-[#091F14] border border-emerald-500/25 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>AI SOIL ADVISORY</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">ICAR Benchmark Alignment</span>
          </div>

          <p className="text-sm font-medium text-slate-200 leading-relaxed bg-[#06140D] p-4 rounded-2xl border border-emerald-500/20">
            "{soilData.aiAdvisory}"
          </p>

          <div className="p-4 bg-[#0B261A] rounded-2xl border border-emerald-500/20 text-xs text-slate-300 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Soil Classification:</span>
              <span className="font-semibold text-white">{soilData.soilType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Sample Registry ID:</span>
              <span className="font-mono text-emerald-300">{soilData.lastTestedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Geo-tag:</span>
              <span className="font-mono text-slate-300">{selectedDistrict}, {selectedState}</span>
            </div>
          </div>

          <button
            onClick={handleGeneratePlan}
            disabled={isGeneratingPlan}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black font-extrabold text-sm rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGeneratingPlan ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Formulating Soil Carbon Plan...</span>
              </>
            ) : (
              <>
                <Layers className="w-4 h-4" />
                <span>GENERATE SOIL PLAN</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Generated Soil Plan */}
        <div className="lg:col-span-6">
          {soilPlan ? (
            <div className="bg-[#091F14] border border-emerald-500/30 rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <span>🌱 Tailored Soil Regeneration Plan</span>
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Target: {soilPlan.targetOrganicCarbon}
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-200">
                <div className="p-3 bg-[#06140D] rounded-xl border border-emerald-500/20">
                  <strong className="text-emerald-400 block mb-1">1. Basal Biofertilizer Dosing:</strong>
                  <span>{soilPlan.basalBiofertilizer}</span>
                </div>
                <div className="p-3 bg-[#06140D] rounded-xl border border-emerald-500/20">
                  <strong className="text-amber-300 block mb-1">2. Nitrogen Buffer & Slow Release:</strong>
                  <span>{soilPlan.nitrogenBufferStrategy}</span>
                </div>
                <div className="p-3 bg-[#06140D] rounded-xl border border-emerald-500/20">
                  <strong className="text-cyan-300 block mb-1">3. Green Manure Biomass Cycle:</strong>
                  <span>{soilPlan.greenManuring}</span>
                </div>
                <div className="p-3 bg-[#06140D] rounded-xl border border-emerald-500/20">
                  <strong className="text-emerald-400 block mb-1">4. pH Stabilization:</strong>
                  <span>{soilPlan.phCorrection}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectTab('regenerative')}
                className="w-full py-2.5 bg-[#0C2B1B] hover:bg-[#123E28] border border-emerald-500/30 text-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Explore Full Regenerative Framework</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="bg-[#091F14]/60 border border-emerald-500/20 rounded-3xl p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-xl">
                🧪
              </div>
              <h4 className="text-sm font-bold text-white">Click "Generate Soil Plan"</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Synthesize bio-chemical inputs, organic carbon recovery schedules, and green manuring specifically calibrated for {selectedDistrict}'s {soilData.soilType}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
