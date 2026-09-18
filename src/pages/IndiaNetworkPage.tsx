import React, { useState } from 'react';
import {
  Network,
  Share2,
  Boxes,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
} from 'lucide-react';
import { IndiaMapSvg } from '../components/IndiaMapSvg';
import { INDIAN_STATES } from '../services/mockData';

interface IndiaNetworkPageProps {
  selectedState: string;
  onSelectState: (state: string) => void;
  onSelectTab: (tab: string) => void;
}

export const IndiaNetworkPage: React.FC<IndiaNetworkPageProps> = ({
  selectedState,
  onSelectState,
  onSelectTab,
}) => {
  const [activeModelTransfer, setActiveModelTransfer] = useState<{
    sourceState: string;
    targetStates: string[];
    modelName: string;
    impact: string;
  } | null>({
    sourceState: 'Punjab',
    targetStates: ['Haryana', 'Uttar Pradesh'],
    modelName: 'Direct Seeded Rice (DSR) Water Optimizer',
    impact: 'Saved 28% tube-well water and 120 kWh electricity per acre in field pilot.',
  });

  const stateData = INDIAN_STATES[selectedState] || INDIAN_STATES['Uttar Pradesh'];

  const modelExchanges = [
    {
      source: 'Punjab',
      targets: ['Haryana', 'Uttar Pradesh'],
      model: 'Direct Seeded Rice (DSR) Water Optimizer',
      benefit: 'Conserves 25-30% groundwater during Kharif seedling stage.',
    },
    {
      source: 'Maharashtra',
      targets: ['Madhya Pradesh', 'Rajasthan'],
      model: 'Vidarbha Rain-Fed Moisture Retaining Seedbed',
      benefit: 'Protects black-soil cotton crops from dry spells exceeding 14 days.',
    },
    {
      source: 'Tamil Nadu',
      targets: ['Karnataka', 'Andhra Pradesh'],
      model: 'Cauvery Coastal Saline Ingress Early Warning',
      benefit: 'Automated alert trigger preventing saline irrigation during high tides.',
    },
    {
      source: 'Uttar Pradesh',
      targets: ['Bihar', 'West Bengal'],
      model: 'Gangetic Alluvial Humus Rebuilding Protocol',
      benefit: 'Bio-compost residue incorporation raising topsoil carbon by 0.12%.',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071911] to-[#0D3021] border border-emerald-500/25 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-lg">
              🇮🇳
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              INDIA AGRICULTURAL INTELLIGENCE NETWORK
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Federated digital public infrastructure for inter-state agricultural model exchange, real-time risk sharing, and cooperative agronomy.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0C2B1C] text-emerald-300 border border-emerald-500/30">
            Interoperable Data Federation
          </span>
        </div>
      </div>

      {/* Interactive Map & State Registry Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Map */}
        <div className="lg:col-span-6 bg-[#091F14] border border-emerald-500/25 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Network className="w-4 h-4 text-emerald-400" />
              <span>National Cooperative Network</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">8 Federated States</span>
          </div>

          <div className="bg-[#05130D] rounded-2xl p-4 border border-emerald-500/20 flex items-center justify-center min-h-[380px]">
            <IndiaMapSvg
              selectedState={selectedState}
              onSelectState={onSelectState}
              activeLayer="Crop Health"
            />
          </div>
        </div>

        {/* Right: State Dossier & Knowledge Exchange */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#091F14] border border-emerald-500/25 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono">STATE PROFILE</span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {stateData.name} ({stateData.hindiName})
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {stateData.id} • Active Hub
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#06140D] p-3 rounded-xl border border-emerald-500/15">
                <span className="text-[10px] text-slate-400 block">Registered Farmers</span>
                <span className="text-base font-black text-white mt-1 block">
                  {(stateData.activeFarmers / 100000).toFixed(1)} Lakh
                </span>
              </div>
              <div className="bg-[#06140D] p-3 rounded-xl border border-emerald-500/15">
                <span className="text-[10px] text-slate-400 block">Advisories Issued</span>
                <span className="text-base font-black text-emerald-400 mt-1 block">
                  {(stateData.advisoriesIssued / 1000).toFixed(0)}k+
                </span>
              </div>
              <div className="bg-[#06140D] p-3 rounded-xl border border-emerald-500/15">
                <span className="text-[10px] text-slate-400 block">Climate Risk</span>
                <span className="text-base font-black text-amber-300 mt-1 block">
                  {stateData.climateRisk}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#06140D] rounded-xl border border-emerald-500/15 flex justify-between items-center">
                <span className="text-slate-400">Major Cropping Systems:</span>
                <span className="font-semibold text-white">{stateData.majorCrops.join(', ')}</span>
              </div>
              <div className="p-3 bg-[#06140D] rounded-xl border border-emerald-500/15">
                <span className="text-slate-400 block mb-1">Contributed AI Models to National Repository:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {stateData.sharedModels.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[11px]"
                    >
                      ✓ {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STATE KNOWLEDGE EXCHANGE PANEL */}
          <div className="bg-[#091F14] border border-emerald-500/25 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-emerald-500/20">
              <Share2 className="w-4 h-4" />
              <span>STATE KNOWLEDGE EXCHANGE</span>
            </h3>
            <p className="text-xs text-slate-300">
              Validated agronomic models created by one Indian state are verified and containerized for deployment across sister states with matching agro-climatic sub-zones.
            </p>

            <div className="space-y-2.5">
              {modelExchanges.map((ex, i) => (
                <div
                  key={i}
                  onClick={() =>
                    setActiveModelTransfer({
                      sourceState: ex.source,
                      targetStates: ex.targets,
                      modelName: ex.model,
                      impact: ex.benefit,
                    })
                  }
                  className="p-3 bg-[#06140D] hover:bg-[#092217] rounded-xl border border-emerald-500/15 hover:border-emerald-500/40 cursor-pointer transition-all text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{ex.model}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Inter-State Feed</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 mt-1">
                    <span className="text-emerald-300 font-semibold">{ex.source}</span>
                    <span>➔</span>
                    <span>Shared with: {ex.targets.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5-Stage Interoperability Architecture Pipeline */}
      <div className="bg-[#091F14] border border-emerald-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Boxes className="w-5 h-5 text-emerald-400" />
          <span>Interoperability Architecture: From Farmer to Federated Advisory</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {[
            { step: '1', title: 'Farmers', desc: '140M+ Indian smallholders via mobile & voice', icon: Users },
            { step: '2', title: 'State Systems', desc: 'State Agri Portals & Krishi Vigyan Kendras', icon: Building2 },
            { step: '3', title: 'Shared Data Layer', desc: 'AgriStack, IMD, SHC, Sentinel-2 remote sensing', icon: Layers },
            { step: '4', title: 'AI / ML Services', desc: 'Google Gemini 1.5 agronomical reasoning engine', icon: Sparkles },
            { step: '5', title: 'Localized Advisory', desc: 'District & village tailored precision guidance', icon: CheckCircle2 },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/20 text-center flex flex-col items-center justify-between space-y-2 hover:border-emerald-500/50 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white">{item.title}</h4>
                <p className="text-[11px] text-slate-400 leading-tight">{item.desc}</p>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">Step {item.step}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
