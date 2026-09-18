import React from 'react';
import {
  Sprout,
  Sun,
  CloudRain,
  Activity,
  Droplets,
  Bug,
  AlertTriangle,
  Volume2,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { INDIAN_STATES, DISTRICTS_BY_STATE, CROPS_CONFIG } from '../services/mockData';
import { WeatherData, SoilData, SatelliteLayerData, AdvisoryData, FarmerProfile } from '../types';
import { translations } from '../i18n/translations';
import { speakLocalizedText } from '../services/speechService';

interface DashboardPageProps {
  farmerProfile: FarmerProfile;
  onUpdateProfile: (profile: FarmerProfile) => void;
  weather: WeatherData;
  soil: SoilData;
  satellite: SatelliteLayerData;
  activeAdvisory: AdvisoryData | null;
  onSelectTab: (tab: string) => void;
  onOpenVoice: () => void;
  activeLanguage: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  farmerProfile,
  onUpdateProfile,
  weather,
  soil,
  satellite,
  activeAdvisory,
  onSelectTab,
  onOpenVoice,
  activeLanguage,
}) => {
  const availableDistricts = DISTRICTS_BY_STATE[farmerProfile.state] || DISTRICTS_BY_STATE['Uttar Pradesh'];

  const t = (key: keyof typeof translations['en']) => {
    const dict = (translations as any)[activeLanguage] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  const handleStateChange = (state: string) => {
    const firstDist = DISTRICTS_BY_STATE[state]?.[0] || 'Default';
    onUpdateProfile({ ...farmerProfile, state, district: firstDist });
  };

  const handleDistrictChange = (district: string) => {
    onUpdateProfile({ ...farmerProfile, district });
  };

  const handleCropChange = (crop: string) => {
    onUpdateProfile({ ...farmerProfile, crop });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome Bar */}
      <div className="bg-gradient-to-r from-[#071911] to-[#0D3021] border border-emerald-500/25 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-lg">
              🌾
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {farmerProfile.name}'s Farm Dashboard
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time agrometeorological & satellite telemetry for {farmerProfile.district}, {farmerProfile.state}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#0C2B1C] text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Demo Data (High Fidelity)</span>
          </span>
        </div>
      </div>

      {/* Selectors Bar: State, District, Village, Crop */}
      <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-4 shadow-xl grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* State */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">State</label>
          <select
            value={farmerProfile.state}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
          >
            {Object.keys(INDIAN_STATES).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">District</label>
          <select
            value={farmerProfile.district}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
          >
            {availableDistricts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Village */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Village</label>
          <input
            type="text"
            value={farmerProfile.village}
            onChange={(e) => onUpdateProfile({ ...farmerProfile, village: e.target.value })}
            className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
          />
        </div>

        {/* Crop */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Active Crop</label>
          <select
            value={farmerProfile.crop}
            onChange={(e) => handleCropChange(e.target.value)}
            className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
          >
            {['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Pulses', 'Millets'].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dashboard 8 Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-[#091F14] border border-emerald-500/20 rounded-2xl p-3 shadow-lg">
          <span className="text-[10px] text-slate-400 block">Temperature</span>
          <p className="text-xl font-black text-white mt-0.5">{weather.currentTemp}°C</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Feels {weather.feelsLike}°C</span>
        </div>

        <div className="bg-[#091F14] border border-emerald-500/20 rounded-2xl p-3 shadow-lg">
          <span className="text-[10px] text-slate-400 block">Humidity</span>
          <p className="text-xl font-black text-cyan-300 mt-0.5">{weather.humidity}%</p>
          <span className="text-[10px] text-cyan-400 mt-1 block">Relative</span>
        </div>

        <div className="bg-[#091F14] border border-emerald-500/20 rounded-2xl p-3 shadow-lg">
          <span className="text-[10px] text-slate-400 block">Rainfall</span>
          <p className="text-xl font-black text-blue-300 mt-0.5">{weather.rainfall24h}mm</p>
          <span className="text-[10px] text-blue-400 mt-1 block">Prob {weather.rainProbability}%</span>
        </div>

        <div className="bg-[#091F14] border border-emerald-500/20 rounded-2xl p-3 shadow-lg">
          <span className="text-[10px] text-slate-400 block">Soil Moisture</span>
          <p className="text-xl font-black text-cyan-300 mt-0.5">{soil.moisturePercent}%</p>
          <span className="text-[10px] text-emerald-300 mt-1 block">Optimal</span>
        </div>

        <div className="bg-[#091F14] border border-emerald-500/20 rounded-2xl p-3 shadow-lg">
          <span className="text-[10px] text-slate-400 block">Soil Health</span>
          <p className="text-xl font-black text-white mt-0.5">Good</p>
          <span className="text-[10px] text-emerald-300 mt-1 block">pH {soil.pH}</span>
        </div>

        <div className="bg-[#091F14] border border-emerald-500/20 rounded-2xl p-3 shadow-lg">
          <span className="text-[10px] text-slate-400 block">Crop Health</span>
          <p className="text-xl font-black text-emerald-400 mt-0.5">{satellite.cropHealthScore}%</p>
          <span className="text-[10px] text-emerald-300 mt-1 block">NDVI {satellite.ndviValue}</span>
        </div>

        <div className="bg-[#091F14] border border-emerald-500/20 rounded-2xl p-3 shadow-lg">
          <span className="text-[10px] text-slate-400 block">Disease Risk</span>
          <p className="text-xl font-black text-white mt-0.5">Low</p>
          <span className="text-[10px] text-emerald-300 mt-1 block">Scouted</span>
        </div>

        <div className="bg-[#091F14] border border-emerald-500/20 rounded-2xl p-3 shadow-lg">
          <span className="text-[10px] text-slate-400 block">Climate Risk</span>
          <p className="text-xl font-black text-amber-300 mt-0.5">Moderate</p>
          <span className="text-[10px] text-amber-400 mt-1 block">Rain alert</span>
        </div>
      </div>

      {/* TODAY'S AI ADVISORY SPOTLIGHT CARD */}
      <div className="bg-gradient-to-br from-[#092217] to-[#06150E] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 flex-wrap gap-2">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>TODAY'S AI ADVISORY</span>
          </h3>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
            ✦ AI Generated (Demo)
          </span>
        </div>

        <div className="p-4 bg-[#06140D] rounded-2xl border border-emerald-500/20 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
            <CloudRain className="w-6 h-6 text-cyan-300" />
          </div>
          <div className="space-y-1">
            <p className="text-base font-bold text-white leading-snug">
              {activeAdvisory?.irrigationAdvice ||
                "Rainfall is expected in the next 48 hours. Consider delaying irrigation and monitor fungal-risk conditions."}
            </p>
            <p className="text-xs text-slate-300">
              {activeAdvisory?.cropStatus ||
                `Field telemetry shows ${farmerProfile.crop} is in healthy vegetative growth with optimal root moisture.`}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onSelectTab('agroadvisory')}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 fill-black text-emerald-500" />
            <span>View Full Advisory</span>
          </button>

          <button
            onClick={onOpenVoice}
            className="px-4 py-2.5 bg-[#0B2519] hover:bg-[#0F3221] border border-emerald-500/30 text-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ask AI</span>
          </button>

          <button
            onClick={() => {
              const text = activeAdvisory?.irrigationAdvice || (activeLanguage === 'hi' ? 'अगले 48 घंटों में बारिश की संभावना है। सिंचाई टालने पर विचार करें और फफूंद रोग की निगरानी करें।' : "Rainfall is expected in the next 48 hours. Consider delaying irrigation and monitor fungal-risk conditions.");
              speakLocalizedText(text, activeLanguage === 'hi' ? 'hi-IN' : 'en-IN', {
                onError: (err) => {
                  if (err === 'HINDI_VOICE_NOT_AVAILABLE') {
                    alert('हिंदी आवाज़ इस डिवाइस पर उपलब्ध नहीं है।');
                  }
                }
              });
            }}
            className="px-4 py-2.5 bg-[#0B2519] hover:bg-[#0F3221] border border-emerald-500/30 text-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{activeLanguage === 'hi' ? 'सुनें' : 'Listen'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
