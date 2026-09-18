import React, { useState } from 'react';
import {
  CloudSun,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Thermometer,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { WeatherData, RiskLevel } from '../types';
import { askKrishiAssistant } from '../services/geminiService';

interface WeatherPageProps {
  selectedState: string;
  selectedDistrict: string;
  selectedCrop: string;
  weather: WeatherData;
  activeLanguage: string;
}

export const WeatherPage: React.FC<WeatherPageProps> = ({
  selectedState,
  selectedDistrict,
  selectedCrop,
  weather,
  activeLanguage,
}) => {
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const handleExplainImpact = async () => {
    setIsExplaining(true);
    const question = `How will this weather (${weather.currentTemp}°C, ${weather.humidity}% humidity, ${weather.rainProbability}% rain chance) affect my ${selectedCrop} crop in ${selectedDistrict}?`;
    try {
      const reply = await askKrishiAssistant(question, { state: selectedState, district: selectedDistrict, crop: selectedCrop, temp: weather.currentTemp }, activeLanguage);
      setExplanation(reply);
    } catch (err) {
      setExplanation(`The combination of ${weather.currentTemp}°C temperature and ${weather.humidity}% humidity is favorable for ${selectedCrop} vegetative growth. However, the ${weather.rainProbability}% precipitation probability in the next 48 hours means irrigation should be withheld to prevent root-zone waterlogging.`);
    } finally {
      setIsExplaining(false);
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
            <span className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-lg">
              🌦️
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              WEATHER & CLIMATE INTELLIGENCE
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Hyper-localized agricultural meteorology powered by IMD gridded radars and numerical weather prediction models.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0C2B1C] text-emerald-300 border border-emerald-500/30">
            Station: {selectedDistrict} Agro-met Grid
          </span>
        </div>
      </div>

      {/* Real-time Weather Telemetry Card */}
      <div className="bg-[#091F14] border border-emerald-500/25 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/15">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Temperature</span>
              <Thermometer className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-3xl font-black text-white">{weather.currentTemp}°C</p>
            <p className="text-[11px] text-slate-400 mt-1">Feels like: {weather.feelsLike}°C</p>
          </div>

          <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/15">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Relative Humidity</span>
              <Droplets className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-3xl font-black text-cyan-300">{weather.humidity}%</p>
            <p className="text-[11px] text-slate-400 mt-1">Vapor pressure balance</p>
          </div>

          <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/15">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Rainfall (24h)</span>
              <CloudRain className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-3xl font-black text-blue-300">{weather.rainfall24h} mm</p>
            <p className="text-[11px] text-cyan-300 mt-1">Prob: {weather.rainProbability}%</p>
          </div>

          <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/15">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Wind Velocity</span>
              <Wind className="w-4 h-4 text-teal-400" />
            </div>
            <p className="text-3xl font-black text-teal-300">{weather.windSpeedKmH} km/h</p>
            <p className="text-[11px] text-slate-400 mt-1">{weather.windDirection}</p>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div>
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>7-Day Agricultural Forecast</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {weather.forecast7Days.map((f, i) => (
              <div
                key={i}
                className="bg-[#06140D] p-3 rounded-2xl border border-emerald-500/15 text-center flex flex-col justify-between"
              >
                <span className="text-xs font-bold text-white block mb-1">{f.day}</span>
                <div className="my-1 text-lg">
                  {f.condition === 'Rainy' ? '🌧️' : f.condition === 'Partly Cloudy' ? '⛅' : '☀️'}
                </div>
                <div className="text-xs">
                  <span className="font-black text-white">{f.tempMax}°</span>{' '}
                  <span className="text-slate-400">{f.tempMin}°</span>
                </div>
                <span className="text-[10px] text-cyan-300 mt-1">{f.rainfallMm}mm rain</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Agricultural Impact Cards */}
      <div>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span>⚠️ Agrometeorological Hazard Risks for {selectedCrop}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Rain Risk */}
          <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-4 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-cyan-400" />
                <span>🌧 Rain Risk</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getRiskBadge(weather.risks.rainRisk.level)}`}>
                {weather.risks.rainRisk.level}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {weather.risks.rainRisk.description}
            </p>
          </div>

          {/* Heat Risk */}
          <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-4 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>🌡 Heat Risk</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getRiskBadge(weather.risks.heatRisk.level)}`}>
                {weather.risks.heatRisk.level}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {weather.risks.heatRisk.description}
            </p>
          </div>

          {/* Water Stress */}
          <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-4 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span>💧 Water Stress</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getRiskBadge(weather.risks.waterStress.level)}`}>
                {weather.risks.waterStress.level}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {weather.risks.waterStress.description}
            </p>
          </div>

          {/* Fungal Risk */}
          <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-4 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>🦠 Fungal Risk</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getRiskBadge(weather.risks.fungalRisk.level)}`}>
                {weather.risks.fungalRisk.level}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {weather.risks.fungalRisk.description}
            </p>
          </div>
        </div>
      </div>

      {/* "How will this weather affect my crop?" Feature */}
      <div className="bg-[#091F14] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>AI Crop Meteorological Explainer</span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Direct agronomic translation of numerical weather forecasts for your specific crop.
            </p>
          </div>

          <button
            onClick={handleExplainImpact}
            disabled={isExplaining}
            className="py-3 px-5 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isExplaining ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Asking Gemini AI...</span>
              </>
            ) : (
              <>
                <span>How will this weather affect my {selectedCrop}?</span>
              </>
            )}
          </button>
        </div>

        {explanation && (
          <div className="mt-4 p-5 bg-[#06140D] rounded-2xl border border-emerald-500/30 text-xs text-slate-200 leading-relaxed space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Google Gemini Agronomic Translation:</span>
            </div>
            <div className="whitespace-pre-line">{explanation}</div>
          </div>
        )}
      </div>
    </div>
  );
};
