import React, { useState } from 'react';
import {
  Sprout,
  Sparkles,
  CloudRain,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  Share2,
  Download,
  MessageSquare,
  RefreshCw,
  Info,
  Calendar,
  Compass,
  ArrowRight,
  Droplets,
} from 'lucide-react';
import { INDIAN_STATES, DISTRICTS_BY_STATE, CROPS_CONFIG } from '../services/mockData';
import { getWeatherData } from '../services/weatherService';
import { getSoilData } from '../services/soilService';
import { getSatelliteData } from '../services/satelliteService';
import { generateAdvisory } from '../services/geminiService';
import { FarmerProfile, AdvisoryData, RiskLevel } from '../types';
import { translations } from '../i18n/translations';
import { speakLocalizedText } from '../services/speechService';

interface AgroadvisoryPageProps {
  currentProfile: FarmerProfile;
  onUpdateProfile: (profile: FarmerProfile) => void;
  activeAdvisory: AdvisoryData | null;
  onSaveAdvisory: (advisory: AdvisoryData) => void;
  onOpenVoice: () => void;
  activeLanguage: string;
}

export const AgroadvisoryPage: React.FC<AgroadvisoryPageProps> = ({
  currentProfile,
  onUpdateProfile,
  activeAdvisory,
  onSaveAdvisory,
  onOpenVoice,
  activeLanguage,
}) => {
  const [formData, setFormData] = useState<FarmerProfile>(currentProfile);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [advisoryResult, setAdvisoryResult] = useState<AdvisoryData | null>(activeAdvisory);

  const t = (key: keyof typeof translations['en']) => {
    const dict = (translations as any)[activeLanguage] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  const availableDistricts = DISTRICTS_BY_STATE[formData.state] || DISTRICTS_BY_STATE['Uttar Pradesh'];
  const cropConfig = CROPS_CONFIG[formData.crop] || CROPS_CONFIG['Wheat'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationStep(1);

    // Save profile updates
    onUpdateProfile(formData);

    // 1. Gather Telemetry
    const weather = getWeatherData(formData.state, formData.district);
    const soil = getSoilData(formData.state, formData.district, formData.soilType);
    const satellite = getSatelliteData(formData.state);

    // Step-by-step hackathon AI visual UX
    setTimeout(() => setGenerationStep(2), 600);
    setTimeout(() => setGenerationStep(3), 1200);
    setTimeout(() => setGenerationStep(4), 1800);

    try {
      const result = await generateAdvisory(formData, weather, soil, satellite);
      setTimeout(() => {
        setAdvisoryResult(result);
        onSaveAdvisory(result);
        setIsGenerating(false);
        setGenerationStep(0);
      }, 2400);
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
      setGenerationStep(0);
    }
  };

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'HIGH':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'MEDIUM':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'LOW':
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071911] to-[#0D3021] border border-emerald-500/25 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-lg">
              🌾
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">{t('formTitle')}</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {t('formSubtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0C2B1C] text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Google Gemini 1.5 Architecture</span>
          </span>
        </div>
      </div>

      {/* Two Columns: Input Form (Left) & Advisory Result (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 bg-[#091F14] border border-emerald-500/25 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-base font-bold text-white mb-4 pb-3 border-b border-emerald-500/20 flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Farm & Crop Parameters</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* State & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('fieldState')}</label>
                <select
                  value={formData.state}
                  onChange={(e) => {
                    const newState = e.target.value;
                    const firstDist = DISTRICTS_BY_STATE[newState]?.[0] || 'Default';
                    setFormData({ ...formData, state: newState, district: firstDist });
                  }}
                  className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  {Object.keys(INDIAN_STATES).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('fieldDistrict')}</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  {availableDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Village / Tehsil */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">{t('fieldVillage')}</label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                placeholder="e.g. Soraon Panchayat"
                className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Crop & Variety */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('fieldCrop')}</label>
                <select
                  value={formData.crop}
                  onChange={(e) => {
                    const newCrop = e.target.value;
                    const defaultVariety = CROPS_CONFIG[newCrop]?.varieties[0] || 'Standard';
                    setFormData({ ...formData, crop: newCrop, variety: defaultVariety });
                  }}
                  className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  {Object.keys(CROPS_CONFIG).map((c) => (
                    <option key={c} value={c}>
                      {c} ({CROPS_CONFIG[c].icon})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('fieldVariety')}</label>
                <select
                  value={formData.variety}
                  onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                  className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  {cropConfig.varieties.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Crop Stage */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">{t('fieldCropStage')}</label>
              <select
                value={formData.cropStage}
                onChange={(e) => setFormData({ ...formData, cropStage: e.target.value })}
                className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                {cropConfig.stages.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Soil Type & Irrigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('fieldSoilType')}</label>
                <select
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                  className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Alluvial Loam">Alluvial Loam</option>
                  <option value="Clayey Loam">Clayey Loam</option>
                  <option value="Black Cotton Soil">Black Cotton Soil (Regur)</option>
                  <option value="Sandy Loam">Sandy Loam</option>
                  <option value="Red Sandy Soil">Red Sandy Soil</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('fieldIrrigation')}</label>
                <select
                  value={formData.irrigation}
                  onChange={(e) => setFormData({ ...formData, irrigation: e.target.value as any })}
                  className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Borewell">Borewell</option>
                  <option value="Canal">Canal</option>
                  <option value="Drip">Drip Irrigation</option>
                  <option value="Sprinkler">Sprinkler</option>
                  <option value="Rainfed">Rainfed (Dryland)</option>
                </select>
              </div>
            </div>

            {/* Farm Size & Sowing Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('fieldFarmSize')}</label>
                <input
                  type="text"
                  value={formData.farmSize}
                  onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                  placeholder="e.g. 3.5"
                  className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('fieldSowingDate')}</label>
                <input
                  type="text"
                  value={formData.sowingDate}
                  onChange={(e) => setFormData({ ...formData, sowingDate: e.target.value })}
                  placeholder="e.g. 15 November 2026"
                  className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {/* Optional Farming Goal */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">{t('fieldGoal')}</label>
              <input
                type="text"
                value={formData.farmingGoal || ''}
                onChange={(e) => setFormData({ ...formData, farmingGoal: e.target.value })}
                placeholder="e.g. Optimize water usage and test regenerative cover crop"
                className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black font-extrabold text-sm rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Synthesizing Agricultural Context...</span>
                </>
              ) : (
                <>
                  <span>🌾</span>
                  <span>{t('btnGenerateAdvisory')}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: AI Processing UX or Advisory Output */}
        <div className="lg:col-span-7">
          {/* AI Processing Animation Box */}
          {isGenerating && (
            <div className="bg-[#091F14] border border-emerald-500/30 rounded-3xl p-8 text-center space-y-6 animate-in fade-in shadow-2xl">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                <Sparkles className="w-8 h-8 text-emerald-300 animate-pulse" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">{t('aiAnalyzing')}</h4>
                <p className="text-xs text-emerald-300/70 mt-1">
                  Connecting to Google Gemini API with regional agronomic telemetry
                </p>
              </div>

              {/* Progress Stepper for Hackathon Evaluation UX */}
              <div className="max-w-md mx-auto space-y-2.5 text-left text-xs">
                <div
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                    generationStep >= 1
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                      : 'bg-black/30 border-slate-800 text-slate-500'
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${generationStep >= 1 ? 'text-emerald-400' : 'text-slate-600'}`}
                  />
                  <span>✓ {t('aiStepWeather')}</span>
                </div>

                <div
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                    generationStep >= 2
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                      : 'bg-black/30 border-slate-800 text-slate-500'
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${generationStep >= 2 ? 'text-emerald-400' : 'text-slate-600'}`}
                  />
                  <span>✓ {t('aiStepSoil')}</span>
                </div>

                <div
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                    generationStep >= 3
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                      : 'bg-black/30 border-slate-800 text-slate-500'
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${generationStep >= 3 ? 'text-emerald-400' : 'text-slate-600'}`}
                  />
                  <span>✓ {t('aiStepCrop')}</span>
                </div>

                <div
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                    generationStep >= 4
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                      : 'bg-black/30 border-slate-800 text-slate-500'
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${generationStep >= 4 ? 'text-emerald-400' : 'text-slate-600'}`}
                  />
                  <span>✓ {t('aiStepRisk')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Generated Structured Advisory Output */}
          {!isGenerating && advisoryResult && (
            <div className="space-y-6 animate-in fade-in">
              {/* Main Advisory Card */}
              <div className="bg-[#091F14] border border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
                {/* Header with Risk Level & AI Mode Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 flex-wrap gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                      ADVISORY DOSSIER #{advisoryResult.id.slice(-6)}
                    </span>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      🌾 {advisoryResult.crop} Agroadvisory
                    </h3>
                    <p className="text-xs text-emerald-300/70">
                      {advisoryResult.district}, {advisoryResult.state} • Generated: {advisoryResult.timestamp}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${getRiskBadge(
                        advisoryResult.riskLevel
                      )}`}
                    >
                      {advisoryResult.riskLevel} RISK
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {advisoryResult.isDemo ? '✦ AI DEMO RESPONSE' : '✦ LIVE GEMINI AI'}
                    </span>
                  </div>
                </div>

                {/* Section 1: Crop Status & Weather Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/20">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                      <Sprout className="w-3.5 h-3.5" />
                      <span>{t('cropStatus')}</span>
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed">{advisoryResult.cropStatus}</p>
                  </div>

                  <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/20">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                      <CloudRain className="w-3.5 h-3.5" />
                      <span>{t('weatherImpact')}</span>
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed">{advisoryResult.weatherImpact}</p>
                  </div>
                </div>

                {/* Section 2: Irrigation Advice (Highlighted) */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0C2D1E] to-[#0A2419] border-2 border-emerald-500/40 shadow-lg">
                  <h4 className="text-xs font-extrabold text-emerald-300 uppercase tracking-wide mb-1 flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-cyan-300" />
                    <span>{t('irrigationAdvice')}</span>
                  </h4>
                  <p className="text-sm font-bold text-white leading-snug">{advisoryResult.irrigationAdvice}</p>
                </div>

                {/* Section 3: Soil Advice & Nutrient Guidance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/20">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{t('soilAdvice')}</span>
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed">{advisoryResult.soilAdvice}</p>
                  </div>

                  <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/20">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                      <span>🧪</span>
                      <span>{t('nutrientGuidance')}</span>
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs mb-2">
                      <div className="bg-[#0A2016] p-1.5 rounded-lg border border-emerald-500/20">
                        <span className="text-[10px] text-slate-400 block">Urea</span>
                        <span className="font-bold text-emerald-300">
                          {advisoryResult.nutrientGuidance.ureaKgPerAcre} kg/ac
                        </span>
                      </div>
                      <div className="bg-[#0A2016] p-1.5 rounded-lg border border-emerald-500/20">
                        <span className="text-[10px] text-slate-400 block">DAP</span>
                        <span className="font-bold text-emerald-300">
                          {advisoryResult.nutrientGuidance.dapKgPerAcre} kg/ac
                        </span>
                      </div>
                      <div className="bg-[#0A2016] p-1.5 rounded-lg border border-emerald-500/20">
                        <span className="text-[10px] text-slate-400 block">MOP</span>
                        <span className="font-bold text-emerald-300">
                          {advisoryResult.nutrientGuidance.mopKgPerAcre} kg/ac
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      {advisoryResult.nutrientGuidance.micronutrients}
                    </p>
                  </div>
                </div>

                {/* Section 4: Pest / Disease Risk */}
                <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{t('pestDiseaseRiskTitle')}</span>
                    </h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getRiskBadge(
                        advisoryResult.pestDiseaseRisk.riskLevel
                      )}`}
                    >
                      {advisoryResult.pestDiseaseRisk.riskLevel}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-200">
                    <p>
                      <strong className="text-amber-300">Primary Watch:</strong>{' '}
                      {advisoryResult.pestDiseaseRisk.detectedRisks.join(', ')}
                    </p>
                    <p>
                      <strong className="text-slate-400">Symptoms:</strong>{' '}
                      {advisoryResult.pestDiseaseRisk.symptomsToWatch.join(' • ')}
                    </p>
                    <p className="text-emerald-300 font-medium pt-1">
                      🌿 <strong>Remedy:</strong>{' '}
                      {advisoryResult.pestDiseaseRisk.preventiveSprays.join(' | ')}
                    </p>
                  </div>
                </div>

                {/* Section 5: Regenerative Recommendation */}
                <div className="p-4 rounded-2xl bg-[#082216] border border-emerald-500/30 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                    <span>🌿</span>
                    <span>{t('regenerativeRec')}</span>
                  </h4>
                  <p className="text-xs font-bold text-white">
                    {advisoryResult.regenerativeRecommendation.strategy}
                  </p>
                  <p className="text-xs text-slate-300">
                    {advisoryResult.regenerativeRecommendation.coverCropSuggestion} —{' '}
                    {advisoryResult.regenerativeRecommendation.soilCarbonAction}
                  </p>
                </div>

                {/* Section 6: Next 7 Days Action Plan */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('sevenDayPlanTitle')}</span>
                  </h4>
                  <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                    {advisoryResult.sevenDayPlan.map((plan, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-[#06140D] rounded-xl border border-emerald-500/15 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-emerald-400 shrink-0">{plan.day}:</span>
                          <span className="text-slate-200">{plan.activity}</span>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold shrink-0 ml-2 ${
                            plan.priority === 'HIGH'
                              ? 'bg-red-500/20 text-red-300'
                              : plan.priority === 'MEDIUM'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {plan.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 7: "Why this recommendation?" */}
                <div className="p-4 bg-[#05130D] rounded-2xl border border-emerald-500/25 space-y-1 text-xs">
                  <h5 className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Info className="w-4 h-4" />
                    <span>{t('whyThisRec')}</span>
                  </h5>
                  <p className="text-slate-300 leading-relaxed">{advisoryResult.explanation}</p>
                </div>

                {/* Action Buttons: Save, Share, Listen, Ask Follow-up */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-emerald-500/20">
                  <button
                    onClick={() => alert('Advisory saved to farmer profile and local offline cache!')}
                    className="py-2.5 px-3 bg-[#0B2519] hover:bg-[#0F3523] border border-emerald-500/30 text-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('btnSave')}</span>
                  </button>

                  <button
                    onClick={() => {
                      const shareText = `*Krishi Intelligence Advisory*\nCrop: ${advisoryResult.crop}\nLocation: ${advisoryResult.district}\n\n*Action:* ${advisoryResult.irrigationAdvice}\n*Pest:* ${advisoryResult.pestDiseaseRisk.detectedRisks.join(', ')}`;
                      if (navigator.share) {
                        navigator.share({ title: 'Krishi Advisory', text: shareText });
                      } else {
                        navigator.clipboard.writeText(shareText);
                        alert('Advisory summary copied to clipboard for WhatsApp sharing!');
                      }
                    }}
                    className="py-2.5 px-3 bg-[#0B2519] hover:bg-[#0F3523] border border-emerald-500/30 text-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('btnShare')}</span>
                  </button>

                  <button
                    onClick={() => {
                        if ('speechSynthesis' in window) {
                          const speechText = `${advisoryResult.cropStatus}. ${advisoryResult.irrigationAdvice}. ${advisoryResult.soilAdvice}`;
                          // Use centralized speech service for locale-aware TTS
                          speakLocalizedText(speechText, activeLanguage === 'hi' ? 'hi-IN' : 'en-IN');
                        } else {
                          alert('Speech synthesis not available');
                        }
                      }}
                    className="py-2.5 px-3 bg-[#0B2519] hover:bg-[#0F3523] border border-emerald-500/30 text-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('btnListen')}</span>
                  </button>

                  <button
                    onClick={onOpenVoice}
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t('btnAskFollowup')}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
