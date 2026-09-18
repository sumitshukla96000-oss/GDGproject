import React from 'react';
import {
  Info,
  Users,
  Building2,
  HeartHandshake,
  Flag,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Globe2,
  ArrowRight,
} from 'lucide-react';

interface AboutPageProps {
  onSelectTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onSelectTab }) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071911] to-[#0D3021] border border-emerald-500/25 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-lg">
              🌾
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              KRISHI INTELLIGENCE — PURPOSE & IMPACT
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            "AI-powered agricultural intelligence for a climate-resilient India."
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0C2B1C] text-emerald-300 border border-emerald-500/30">
            Open Digital Agriculture
          </span>
        </div>
      </div>

      {/* 4 Impact Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">For Farmers</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Localized, actionable, microclimate-specific agroadvisories delivered via multilingual text and natural voice to protect livelihoods against climate volatility.
          </p>
        </div>

        <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">For States</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Interoperable data sharing protocols allowing agricultural universities and state departments to deploy and share agronomic models without vendor lock-in.
          </p>
        </div>

        <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-lime-500/15 border border-lime-500/30 flex items-center justify-center text-lime-400">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">For Communities</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Open regenerative farming knowledge that builds soil organic carbon, protects dwindling groundwater aquifers, and terminates stubble burning smog.
          </p>
        </div>

        <div className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Flag className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">For India</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Scalable digital public infrastructure (DPI) establishing India as a global benchmark in climate-resilient, open agricultural artificial intelligence.
          </p>
        </div>
      </div>

      {/* District -> State -> Multi-State -> National Scalability Architecture */}
      <div className="bg-[#091F14] border border-emerald-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>Scalability Roadmap: District to National Scale</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Engineered from Day 1 to scale progressively across jurisdictional hierarchies without requiring architectural redesign.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#06140D] p-5 rounded-2xl border border-emerald-500/20 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400">PHASE 1</span>
            <h4 className="text-sm font-bold text-white">District Level</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prayagraj & Ludhiana pilot validation. High-resolution IMD radar integration and village-level Soil Health Card baseline checks.
            </p>
          </div>

          <div className="bg-[#06140D] p-5 rounded-2xl border border-emerald-500/20 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400">PHASE 2</span>
            <h4 className="text-sm font-bold text-white">State Level</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Full deployment across Uttar Pradesh and Punjab. Krishi Vigyan Kendra (KVK) extension officer verification portal launch.
            </p>
          </div>

          <div className="bg-[#06140D] p-5 rounded-2xl border border-emerald-500/20 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400">PHASE 3</span>
            <h4 className="text-sm font-bold text-white">Multi-State Federation</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cooperative knowledge exchange across 8 agricultural states. Cross-regional crop disease outbreak early-warning networks.
            </p>
          </div>

          <div className="bg-[#06140D] p-5 rounded-2xl border border-emerald-500/20 space-y-2">
            <span className="text-xs font-mono font-bold text-lime-400">PHASE 4</span>
            <h4 className="text-sm font-bold text-white">National Agri-DPI</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Full national integration with AgriStack, ICAR research portals, and e-NAM markets serving 140M+ Indian farming families.
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#0B2519] rounded-2xl border border-emerald-500/20 text-xs text-slate-300 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <em>Note on deployment claims:</em> In accordance with hackathon standards, this diagram represents the architectural scalability blueprint of Krishi Intelligence rather than a claimed national deployment.
          </span>
        </div>
      </div>
    </div>
  );
};
