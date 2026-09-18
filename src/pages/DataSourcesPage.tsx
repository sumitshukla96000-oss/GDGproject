import React, { useState } from 'react';
import {
  Database,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  ShieldCheck,
  Search,
  Filter,
} from 'lucide-react';
import { DATA_SOURCES } from '../services/mockData';

export const DataSourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Weather', 'Soil', 'Satellite', 'Crop Health', 'Market / Mandi', 'Climate Risk'];

  const filteredSources = DATA_SOURCES.filter((ds) => {
    const matchesCat = selectedCategory === 'All' || ds.category === selectedCategory;
    const matchesSearch =
      ds.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getTypeBadge = (type: 'LIVE API' | 'PUBLIC DATASET' | 'DEMO DATA') => {
    switch (type) {
      case 'LIVE API':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'PUBLIC DATASET':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'DEMO DATA':
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071911] to-[#0D3021] border border-emerald-500/25 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-lg">
              🗄️
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              DATA SOURCES & TRANSPARENCY REGISTRY
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Complete transparency ledger. Real data endpoints, public datasets, and demonstration telemetry are explicitly cataloged.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0C2B1C] text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open Data Governance</span>
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'bg-[#06140D] text-slate-300 hover:text-white border border-emerald-500/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search data source..."
            className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Data Source Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSources.map((ds) => (
          <div
            key={ds.id}
            className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-5 shadow-xl space-y-3 flex flex-col justify-between hover:border-emerald-500/50 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 pb-2 border-b border-emerald-500/15">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase font-mono tracking-wider">
                    {ds.category}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{ds.name}</h4>
                  <p className="text-xs text-slate-300">{ds.provider}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${getTypeBadge(ds.type)}`}>
                  {ds.type}
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {ds.description}
              </p>
            </div>

            <div className="pt-3 border-t border-emerald-500/15 text-xs space-y-1 text-slate-400">
              <div className="flex justify-between">
                <span>Update Cadence:</span>
                <span className="text-white font-medium">{ds.updateFrequency}</span>
              </div>
              <div className="flex justify-between items-center truncate">
                <span>Endpoint / Schema:</span>
                <span className="text-emerald-300 font-mono text-[11px] truncate max-w-[200px]">
                  {ds.endpointOrSource}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transparency Note */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3 text-xs text-amber-200">
        <Eye className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>Hackathon Transparency Commitment:</strong> Whenever a live external government API is unauthenticated or restricted by rate-limits, Krishi Intelligence flags the respective telemetry as <em>"Demo dataset for hackathon demonstration"</em> so judges and evaluators always have full clarity.
        </span>
      </div>
    </div>
  );
};
