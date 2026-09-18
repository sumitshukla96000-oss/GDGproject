import React from 'react';
import {
  Home,
  Sprout,
  Microscope,
  Satellite,
  Layers,
  CloudSun,
  Leaf,
  Network,
  Boxes,
  Database,
  Info,
  Award,
} from 'lucide-react';
import { translations, LanguageCode } from '../i18n/translations';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  activeLanguage: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  activeLanguage,
}) => {
  const t = (key: keyof typeof translations['en']) => {
    const dict = (translations as any)[activeLanguage] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  const navItems = [
    { id: 'dashboard', label: t('navDashboard'), icon: Home },
    { id: 'agroadvisory', label: t('navAgroadvisory'), icon: Sprout },
    { id: 'crop-doctor', label: t('navCropDoctor'), icon: Microscope },
    { id: 'satellite', label: t('navSatellite'), icon: Satellite },
    { id: 'soil-health', label: t('navSoilHealth'), icon: Layers },
    { id: 'weather', label: t('navWeather'), icon: CloudSun },
    { id: 'regenerative', label: t('navRegenerative'), icon: Leaf },
    { id: 'india-network', label: t('navIndiaNetwork'), icon: Network },
    { id: 'architecture', label: t('navArchitecture'), icon: Boxes },
    { id: 'about', label: t('navAbout'), icon: Info },
  ];

  return (
    <aside className="w-64 bg-[#06140D] border-r border-emerald-500/20 flex flex-col justify-between shrink-0 min-h-screen text-slate-200 select-none">
      {/* Brand Header matching theme.png */}
      <div className="p-5 border-b border-emerald-500/15">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-lime-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <span className="text-xl">🌾</span>
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5 leading-tight">
              KRISHI INTELLIGENCE
            </h1>
            <p className="text-[9px] font-semibold text-emerald-400 tracking-wider uppercase mt-0.5">
              AI POWERED AGRICULTURE FOR A RESILIENT INDIA
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group text-left ${
                isActive
                  ? 'bg-[#133829] text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                  : 'text-slate-400 hover:text-emerald-200 hover:bg-[#0A2016]'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-300'
                }`}
              />
              <span className="truncate">{item.label}</span>
              {item.id === 'agroadvisory' && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Aesthetic Footer matching theme.png */}
      <div className="p-4 mx-3 mb-4 rounded-2xl bg-gradient-to-b from-[#092217]/90 to-[#06140D] border border-emerald-500/20 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-xl mb-1">🌱</div>
          <p className="text-xs font-bold text-emerald-300 leading-tight">Healthy Soil</p>
          <p className="text-xs font-bold text-emerald-400 leading-tight">Healthy Crops</p>
          <p className="text-[10px] text-slate-400 mt-1">A Sustainable Future</p>
        </div>
        {/* Subtle glowing leaf watermark */}
        <div className="absolute -bottom-4 -right-4 opacity-15 text-6xl text-emerald-400 pointer-events-none">
          🌿
        </div>
      </div>
    </aside>
  );
};
