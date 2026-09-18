import React, { useState, useRef } from 'react';
import {
  Upload,
  Camera,
  Microscope,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ShieldAlert,
  Info,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { SAMPLE_CROP_DISEASES } from '../services/mockData';
import { diagnoseCropImage } from '../services/geminiService';
import { CropDiseaseResult, RiskLevel } from '../types';
import { translations } from '../i18n/translations';

interface CropDoctorPageProps {
  selectedCrop: string;
  activeLanguage: string;
}

export const CropDoctorPage: React.FC<CropDoctorPageProps> = ({
  selectedCrop,
  activeLanguage,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<CropDiseaseResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = (key: keyof typeof translations['en']) => {
    const dict = (translations as any)[activeLanguage] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, JPEG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setDiagnosisResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRunAnalysis = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);

    try {
      const result = await diagnoseCropImage(selectedImage, selectedCrop);
      setTimeout(() => {
        setDiagnosisResult(result);
        setIsAnalyzing(false);
      }, 1800);
    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
    }
  };

  const handlePickSample = (sample: CropDiseaseResult) => {
    setSelectedImage(sample.imageUrl || null);
    setDiagnosisResult(sample);
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
              🦠
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">{t('doctorTitle')}</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {t('doctorSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0C2B1C] text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gemini Vision Multimodal</span>
          </span>
        </div>
      </div>

      {/* Main Screening Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Upload & Preview */}
        <div className="lg:col-span-6 bg-[#091F14] border border-emerald-500/25 rounded-3xl p-6 shadow-2xl space-y-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-emerald-500/20">
            <Camera className="w-4 h-4 text-emerald-400" />
            <span>Upload or Capture Crop Leaf</span>
          </h3>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            accept="image/*"
            className="hidden"
          />

          {/* Drag and Drop Zone or Preview */}
          {!selectedImage ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                dragOver
                  ? 'border-emerald-400 bg-emerald-500/10 scale-102'
                  : 'border-emerald-500/30 bg-[#06140D] hover:border-emerald-500/60 hover:bg-[#081B12]'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Upload className="w-6 h-6 text-emerald-300" />
              </div>
              <p className="text-sm font-bold text-white mb-1">{t('uploadPrompt')}</p>
              <p className="text-xs text-slate-400">Supports JPG, PNG, WEBP up to 10MB</p>

              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B2519] border border-emerald-500/30 text-xs font-semibold text-emerald-300 hover:bg-[#0E3222] transition-colors">
                <Camera className="w-3.5 h-3.5" />
                <span>{t('takePhoto')}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 bg-black max-h-72 flex items-center justify-center shadow-lg">
                <img
                  src={selectedImage}
                  alt="Crop Leaf to diagnose"
                  className="max-h-72 w-full object-cover"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setDiagnosisResult(null);
                    }}
                    className="px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-xs font-semibold text-slate-200 hover:text-white border border-white/20 transition-colors"
                  >
                    Upload Another Image
                  </button>
                </div>
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black font-extrabold text-sm rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Gemini Vision Neural Inspection...</span>
                  </>
                ) : (
                  <>
                    <Microscope className="w-4 h-4" />
                    <span>{t('btnAnalyze')}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Preset Sample Gallery for Instant Hackathon Demonstration */}
          <div className="pt-3 border-t border-emerald-500/20">
            <h4 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5">
              <span>{t('sampleImagesTitle')}</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {SAMPLE_CROP_DISEASES.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => handlePickSample(sample)}
                  className="group relative rounded-xl overflow-hidden border border-emerald-500/25 hover:border-emerald-400 cursor-pointer transition-all bg-[#06140D] hover:scale-103"
                >
                  <img
                    src={sample.imageUrl}
                    alt={sample.disease}
                    className="h-16 w-full object-cover opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="p-1.5 text-[10px] font-semibold text-emerald-200 truncate">
                    {sample.disease.split('(')[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Disease Diagnosis Report */}
        <div className="lg:col-span-6">
          {isAnalyzing && (
            <div className="bg-[#091F14] border border-emerald-500/30 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Microscope className="w-8 h-8 text-emerald-300 animate-pulse" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">{t('analyzingImage')}</h4>
                <p className="text-xs text-emerald-300/70 mt-1">
                  Cross-referencing leaf pustules, vein necrosis, and chlorotic ring patterns
                </p>
              </div>
            </div>
          )}

          {!isAnalyzing && diagnosisResult && (
            <div className="bg-[#091F14] border border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in">
              {/* Report Header */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 flex-wrap gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                    DIAGNOSIS REPORT #{diagnosisResult.id.slice(-6)}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {diagnosisResult.disease}
                  </h3>
                  {diagnosisResult.scientificName && (
                    <p className="text-xs text-emerald-300/80 italic font-mono">
                      {diagnosisResult.scientificName}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${getRiskBadge(
                      diagnosisResult.riskLevel
                    )}`}
                  >
                    {diagnosisResult.riskLevel} RISK
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {diagnosisResult.confidence}% {t('confidence')}
                  </span>
                </div>
              </div>

              {/* Observed Symptoms */}
              <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/20 space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{t('symptomsObserved')}</span>
                </h4>
                <ul className="space-y-1 text-xs text-slate-200">
                  {diagnosisResult.observedSymptoms.map((sym, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Immediate Steps */}
              <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/20 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t('immediateSteps')}</span>
                </h4>
                <ul className="space-y-1 text-xs text-slate-200">
                  {diagnosisResult.recommendedNextSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Treatments: Organic vs Chemical Management */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#082216] p-4 rounded-2xl border border-emerald-500/25 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide block">
                    🌿 {t('organicTreatment')}
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {diagnosisResult.organicRemedy}
                  </p>
                </div>

                <div className="bg-[#0A261E] p-4 rounded-2xl border border-cyan-500/25 space-y-1.5">
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wide block">
                    🧪 {t('chemicalTreatment')}
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {diagnosisResult.chemicalRemedy}
                  </p>
                </div>
              </div>

              {/* Expert Disclaimer Requirement */}
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-amber-200">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>IMPORTANT:</strong> {t('doctorDisclaimer')}
                </span>
              </div>
            </div>
          )}

          {!isAnalyzing && !diagnosisResult && (
            <div className="bg-[#091F14]/60 border border-emerald-500/20 rounded-3xl p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-xl">
                🍃
              </div>
              <h4 className="text-sm font-bold text-white">No Leaf Analyzed Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Upload a plant leaf photo on the left or select any of the sample disease specimens to test Google Gemini vision screening.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
