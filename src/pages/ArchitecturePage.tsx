import React from 'react';
import {
  Boxes,
  Layers,
  Smartphone,
  Server,
  Database,
  CloudSun,
  Sprout,
  Satellite,
  Cpu,
  CheckCircle2,
  Share2,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  const layers = [
    {
      level: '1',
      title: 'Farmer Applications & Multimodal Interfaces',
      desc: 'Progressive Web App, Voice Assistant in Devanagari & regional languages, SMS gateway, and KVK kiosks.',
      tech: 'React 18, Web Speech API, Offline LocalStorage, Multilingual i18n Engine',
      icon: Smartphone,
      color: 'border-emerald-500/40 bg-[#0B2519]',
    },
    {
      level: '2',
      title: 'State Data Systems & Agristack Integration',
      desc: 'State Agriculture Departments, Kisan Call Centers, APMC Mandi price nodes, and village panchayat registries.',
      tech: 'State Land Records (Khasra/Khatauni), Farmer ID federated tokens, e-NAM',
      icon: Server,
      color: 'border-emerald-500/40 bg-[#092217]',
    },
    {
      level: '3',
      title: 'Shared Agricultural Data Layer (DPI Core)',
      desc: 'Unified schema bus and data interchange format designed as a Digital Public Good (DPG).',
      tech: 'Open OpenAPI specs, Vector embeddings, Apache Parquet geospatial stores',
      icon: Database,
      color: 'border-cyan-500/40 bg-[#082024]',
    },
    {
      level: '4',
      title: 'Weather & Climate Data Pipelines',
      desc: 'Gridded 3-hour precipitation forecasts, radar Doppler scans, and numerical agro-met models.',
      tech: 'IMD Mausam Open Grids, ECMWF, INSAT-3D Agromet products',
      icon: CloudSun,
      color: 'border-blue-500/40 bg-[#071926]',
    },
    {
      level: '5',
      title: 'Soil Health & Benchmarking Engine',
      desc: 'Geo-tagged Soil Health Card tests, pH titration curves, organic carbon mapping, and NPK thresholds.',
      tech: 'ICAR National Soil Bureau Database, SHC Portal API',
      icon: Layers,
      color: 'border-emerald-500/40 bg-[#0B261A]',
    },
    {
      level: '6',
      title: 'Satellite Remote Sensing Constellation',
      desc: '10m multi-spectral NDVI, vegetation health indices, and microwave soil moisture sensing.',
      tech: 'ISRO Bhuvan Geo-Portal, ESA Sentinel-2 MSI, Landsat-9 surface thermal bands',
      icon: Satellite,
      color: 'border-teal-500/40 bg-[#061E1A]',
    },
    {
      level: '7',
      title: 'Crop Agronomy & Phenology Models',
      desc: 'Crop calendar rules, thermal growing degree days (GDD), critical irrigation stages, and pest incubation curves.',
      tech: 'Indian Agricultural Research Institute (IARI) package of practices',
      icon: Sprout,
      color: 'border-lime-500/40 bg-[#0C2A18]',
    },
    {
      level: '8',
      title: 'AI / ML Services (Google Gemini Multimodal Core)',
      desc: 'High-reasoning agronomic synthesis engine; computer vision disease screening from leaf imagery.',
      tech: 'Google Gemini 1.5 Flash / Pro, Gemini Vision API, Temperature 0.2',
      icon: Cpu,
      color: 'border-emerald-400 bg-emerald-950/80 ring-2 ring-emerald-500/40',
    },
    {
      level: '9',
      title: 'Localized Advisory Engine & Rule Validator',
      desc: 'Transforms high-level AI reasoning into localized, actionable, hazard-aware agricultural directives.',
      tech: 'JSON Schema Validation, Context Sanitization, Fertilizer Unit Standardizer',
      icon: CheckCircle2,
      color: 'border-emerald-500/40 bg-[#0B261A]',
    },
    {
      level: '10',
      title: 'State Knowledge Federation & Farmer Outputs',
      desc: 'Actionable 7-day field plans, audio advisories, WhatsApp broadcasts, and cross-state model sharing.',
      tech: 'WhatsApp Business API, Web Audio API Synthesis, Inter-State Model Registry',
      icon: Share2,
      color: 'border-emerald-500/40 bg-[#0D2D1E]',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071911] to-[#0D3021] border border-emerald-500/25 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-lg">
              🏛️
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              DIGITAL PUBLIC GOOD (DPG) ARCHITECTURE
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            "Designed to scale from one district to multiple Indian states." Open, interoperable, and built on modular digital public infrastructure (DPI) principles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0C2B1C] text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>AgriStack & DPI Compliant</span>
          </span>
        </div>
      </div>

      {/* 5 Architectural Tenets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { title: 'Interoperability', desc: 'Standardized JSON APIs across state departments', icon: Boxes },
          { title: 'Scalability', desc: 'Stateless serverless pipelines handling millions of farmers', icon: Zap },
          { title: 'Reusable Data Models', desc: 'Crop disease & soil models shareable across states', icon: Share2 },
          { title: 'State Collaboration', desc: 'Cooperative federated network without vendor lock-in', icon: Server },
          { title: 'Localized Intelligence', desc: 'Pinpoint advice tailored to village agro-microclimates', icon: Sprout },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-[#091F14] border border-emerald-500/20 rounded-2xl p-4 text-center flex flex-col items-center justify-between space-y-1"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-1">
                <Icon className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">{item.title}</h4>
              <p className="text-[10px] text-slate-400">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* 10 Layer Visual Architecture Stack */}
      <div className="bg-[#091F14] border border-emerald-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          <span>The 10-Layer Digital Public Good Architectural Blueprint</span>
        </h3>
        <p className="text-xs text-slate-300 mb-6">
          Each architectural layer is decoupled, stateless, and published with open data contracts so third-party agtech startups, research universities, and state governments can plug into any layer.
        </p>

        <div className="space-y-3">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <div
                key={layer.level}
                className={`p-4 rounded-2xl border ${layer.color} shadow-md transition-all hover:scale-[1.01]`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-xs font-black text-emerald-400 shrink-0">
                      L{layer.level}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                        <Icon className="w-4 h-4 text-emerald-400" />
                        <span>{layer.title}</span>
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">{layer.desc}</p>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="text-[10px] font-mono text-emerald-300/80 bg-black/40 px-2.5 py-1 rounded-md border border-emerald-500/20 block sm:inline">
                      {layer.tech}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
