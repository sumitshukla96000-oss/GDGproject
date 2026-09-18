import React, { useState } from 'react';
import {
  MapPin,
  Globe,
  Mic,
  Bell,
  User,
  ChevronDown,
  Sparkles,
  Zap,
} from 'lucide-react';
import { INDIAN_STATES, DISTRICTS_BY_STATE } from '../services/mockData';
import { languages, LanguageCode } from '../i18n/translations';

interface NavbarProps {
  selectedState: string;
  selectedDistrict: string;
  selectedVillage: string;
  onStateChange: (state: string) => void;
  onDistrictChange: (district: string) => void;
  onVillageChange: (village: string) => void;
  isLive: boolean;
  activeLanguage: string;
  onLanguageChange: (lang: LanguageCode) => void;
  onOpenVoice: () => void;
  onOpenDemo: () => void;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedState,
  selectedDistrict,
  selectedVillage,
  onStateChange,
  onDistrictChange,
  onVillageChange,
  isLive,
  activeLanguage,
  onLanguageChange,
  onOpenVoice,
  onOpenDemo,
  onOpenNotifications,
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const availableDistricts = DISTRICTS_BY_STATE[selectedState] || DISTRICTS_BY_STATE['Uttar Pradesh'];

  return (
    <header className="sticky top-0 z-40 bg-[#071911]/90 backdrop-blur-md border-b border-emerald-500/20 px-4 lg:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Location Pickers matching theme.png */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* State Dropdown */}
          <div className="relative flex items-center bg-[#0B2519] border border-emerald-500/30 rounded-xl px-2.5 py-1.5 text-xs text-white">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0" />
            <select
              value={selectedState}
              onChange={(e) => {
                const newState = e.target.value;
                onStateChange(newState);
                const firstDist = DISTRICTS_BY_STATE[newState]?.[0] || 'Default';
                onDistrictChange(firstDist);
              }}
              className="bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer pr-4 appearance-none"
            >
              {Object.keys(INDIAN_STATES).map((state) => (
                <option key={state} value={state} className="bg-[#091D14] text-white">
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
          </div>

          {/* District Dropdown */}
          <div className="relative flex items-center bg-[#0B2519] border border-emerald-500/30 rounded-xl px-2.5 py-1.5 text-xs text-white">
            <select
              value={selectedDistrict}
              onChange={(e) => onDistrictChange(e.target.value)}
              className="bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer pr-4 appearance-none"
            >
              {availableDistricts.map((district) => (
                <option key={district} value={district} className="bg-[#091D14] text-white">
                  {district}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
          </div>

          {/* Village Selector */}
          <div className="relative hidden md:flex items-center bg-[#0B2519] border border-emerald-500/30 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
            <input
              type="text"
              value={selectedVillage}
              onChange={(e) => onVillageChange(e.target.value)}
              placeholder="Village / Location"
              className="bg-transparent text-white font-medium text-xs focus:outline-none w-28 placeholder-slate-400"
            />
          </div>

          {/* Data Mode Pill matching theme.png */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border shadow-sm transition-all bg-[#0D2A1C] border-emerald-500/40 text-emerald-300">
            <span
              className={`w-2 h-2 rounded-full ${
                isLive ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
              }`}
            ></span>
            <span>{isLive ? 'LIVE DATA' : 'DEMO DATA'}</span>
          </div>
        </div>

        {/* Right Controls: Try Demo, Language, Voice, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Guided Demo CTA */}
          <button
            onClick={onOpenDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black text-xs font-extrabold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all transform hover:scale-[1.02]"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span className="hidden sm:inline">Try Full Demo</span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0B2519] border border-emerald-500/30 rounded-xl text-xs text-white hover:border-emerald-400 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium">
                {languages.find((l) => l.code === activeLanguage)?.native || 'English'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-[#091D14] border border-emerald-500/30 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-emerald-500/20 transition-colors ${
                      activeLanguage === l.code ? 'text-emerald-300 font-bold bg-emerald-500/15' : 'text-slate-200'
                    }`}
                  >
                    <span>{l.name}</span>
                    <span className="text-[11px] text-emerald-400/80">{l.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mic Button matching theme.png */}
          <button
            onClick={onOpenVoice}
            className="p-2 rounded-xl bg-[#0B2519] border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 hover:text-white transition-all shadow-sm group"
            title="Ask Krishi AI Voice Assistant"
          >
            <Mic className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>

          {/* Notifications Bell matching theme.png */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-[#0B2519] border border-emerald-500/30 hover:border-emerald-400 text-slate-300 hover:text-white transition-all shadow-sm"
            title="Agricultural Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile matching theme.png */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-300 hover:border-emerald-300 transition-all"
              title="Farmer Profile"
            >
              <User className="w-4 h-4" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#091D14] border border-emerald-500/30 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in">
                <div className="flex items-center gap-2 pb-2 border-b border-emerald-500/20">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-xs">
                    RC
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Ram Charan Verma</h4>
                    <p className="text-[10px] text-emerald-300/70">Kisan ID: UP-PRY-894</p>
                  </div>
                </div>
                <div className="py-2 text-[11px] space-y-1 text-slate-300">
                  <p>🌾 Primary Crop: Wheat (HD-2967)</p>
                  <p>📍 {selectedDistrict}, {selectedState}</p>
                  <p>📏 Farm Area: 3.5 Acres</p>
                  <p className="text-emerald-400">🛡 AgriStack Verified: Yes</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
