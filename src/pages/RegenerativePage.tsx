import React, { useState } from 'react';
import {
  Leaf,
  Sprout,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Droplets,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { REGENERATIVE_PRACTICES } from '../services/mockData';

interface RegenerativePageProps {
  selectedCrop: string;
  selectedState: string;
  activeLanguage: string;
}

export const RegenerativePage: React.FC<RegenerativePageProps> = ({
  selectedCrop,
  selectedState,
  activeLanguage,
}) => {
  const [currentCrop, setCurrentCrop] = useState(selectedCrop);
  const [soilType, setSoilType] = useState('Alluvial Loam');
  const [waterAvailability, setWaterAvailability] = useState('Moderate (Canal + Tube-well)');
  const [farmSize, setFarmSize] = useState('3.5');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any | null>(null);

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedPlan({
        nextCrop: {
          what: 'Short-duration Moong Bean (Vigna radiata - Pusa Vishal) or Chickpea.',
          why: 'Breaks monoculture cereal cycle, fixes 30-40 kg atmospheric nitrogen per hectare into soil nodules, and reduces nematode populations.',
          expectedBenefit: 'Provides secondary cash crop within 65 days while lowering subsequent synthetic nitrogen fertilizer requirements by ~25%.',
        },
        rotationStrategy: {
          what: 'Three-tier rotation: Wheat (Rabi) ➔ Summer Moong (Zaid green manure) ➔ Basmati Rice or Maize (Kharif).',
          why: 'Maintains live microbial root activity across 10 months of the year, preventing topsoil crusting and wind erosion.',
          expectedBenefit: 'Improves soil organic matter, suppresses grassy weed seed banks, and stabilizes farmer net revenue.',
        },
        soilImprovement: {
          what: 'In-situ straw mulching with happy seeder and bio-decomposer fungal spray.',
          why: 'Preserves earthworm burrows, cools soil root zone by 3-4°C during March heat waves, and cycles organic potassium.',
          expectedBenefit: 'Elevates soil organic carbon sustainably over 3 seasons without crop stubble burning.',
        },
        waterStrategy: {
          what: 'Furrow-irrigated raised beds (FIRB) with laser land leveling.',
          why: 'Laser leveled beds ensure uniform hydraulic spread, eliminating stagnant water pockets in field corners.',
          expectedBenefit: 'Conserves 25-30% irrigation water while speeding up field draining after heavy rains.',
        },
        biodiversityStrategy: {
          what: 'Boundary planting of Marigolds (Tagetes erecta) and Neem trees.',
          why: 'Marigold root exudates naturally repel root-knot nematodes; flowering heads attract hoverflies and native pollinators.',
          expectedBenefit: 'Natural biological pest predation, minimizing broad-spectrum synthetic chemical insecticide use.',
        },
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071911] to-[#0D3021] border border-emerald-500/25 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-lime-500/20 border border-lime-400/40 flex items-center justify-center text-lg">
              🌿
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">REGENERATIVE FARMING</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Restoring Indian soil biology, preserving aquifers, and building climate-resilient agro-ecosystems.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0C2B1C] text-emerald-300 border border-emerald-500/30">
            Natural & Conservation Farming
          </span>
        </div>
      </div>

      {/* 7 Core Practices Grid */}
      <div>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span>🌱 7 Core Pillars of Regenerative Agriculture</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REGENERATIVE_PRACTICES.map((prac, i) => (
            <div
              key={i}
              className="bg-[#091F14] border border-emerald-500/25 rounded-2xl p-5 shadow-xl space-y-3 flex flex-col justify-between hover:border-emerald-500/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-emerald-500/15">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{prac.icon}</span>
                    <h4 className="text-xs font-bold text-white leading-snug">{prac.practice}</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-[#06140D] text-emerald-400 border border-emerald-500/20">
                    {prac.difficulty}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{prac.what}</p>

                <div className="mt-3 p-3 bg-[#06140D] rounded-xl border border-emerald-500/15 space-y-1 text-xs">
                  <p>
                    <strong className="text-emerald-400">Why:</strong>{' '}
                    <span className="text-slate-300">{prac.why}</span>
                  </p>
                  <p className="pt-1">
                    <strong className="text-amber-300">Benefit:</strong>{' '}
                    <span className="text-slate-300">{prac.expectedBenefit}</span>
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-500/15 text-[11px] text-emerald-300/80 font-medium">
                💰 {prac.costEfficiency}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Regenerative Plan Generator */}
      <div className="bg-[#091F14] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>GENERATE REGENERATIVE PLAN</span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Formulate a phased agronomic transition strategy based on What, Why, and Expected Benefit frameworks.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-300 px-3 py-1 bg-emerald-500/15 rounded-full border border-emerald-500/30">
            ICAR-Natural Farming Guideline
          </span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Current Crop</label>
            <input
              type="text"
              value={currentCrop}
              onChange={(e) => setCurrentCrop(e.target.value)}
              className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Soil Type</label>
            <input
              type="text"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Water Availability</label>
            <select
              value={waterAvailability}
              onChange={(e) => setWaterAvailability(e.target.value)}
              className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="Ample (Canal + Tube-well)">Ample (Canal + Tube-well)</option>
              <option value="Moderate (Canal + Tube-well)">Moderate (Canal + Tube-well)</option>
              <option value="Rainfed (Dryland)">Rainfed (Dryland)</option>
              <option value="Drip / Micro-irrigation">Drip / Micro-irrigation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Farm Size (Acres)</label>
            <input
              type="text"
              value={farmSize}
              onChange={(e) => setFarmSize(e.target.value)}
              className="w-full bg-[#06140D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <button
          onClick={handleGeneratePlan}
          disabled={isGenerating}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-black" />
              <span>Synthesizing Regenerative Strategy...</span>
            </>
          ) : (
            <>
              <Leaf className="w-4 h-4 fill-black" />
              <span>GENERATE REGENERATIVE PLAN</span>
            </>
          )}
        </button>

        {/* AI Output Framework: WHAT, WHY, EXPECTED BENEFIT */}
        {generatedPlan && (
          <div className="mt-6 space-y-4 pt-6 border-t border-emerald-500/20 animate-in fade-in">
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Regenerative Transition Strategy for {currentCrop} ({farmSize} Acres)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Next Crop Recommendation */}
              <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/20 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide block">
                  1. Next Crop Recommendation
                </span>
                <p className="text-xs text-slate-200">
                  <strong className="text-white">WHAT:</strong> {generatedPlan.nextCrop.what}
                </p>
                <p className="text-xs text-slate-300">
                  <strong className="text-slate-400">WHY:</strong> {generatedPlan.nextCrop.why}
                </p>
                <p className="text-xs text-emerald-300">
                  <strong>EXPECTED BENEFIT:</strong> {generatedPlan.nextCrop.expectedBenefit}
                </p>
              </div>

              {/* Rotation Strategy */}
              <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/20 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide block">
                  2. Rotation Strategy
                </span>
                <p className="text-xs text-slate-200">
                  <strong className="text-white">WHAT:</strong> {generatedPlan.rotationStrategy.what}
                </p>
                <p className="text-xs text-slate-300">
                  <strong className="text-slate-400">WHY:</strong> {generatedPlan.rotationStrategy.why}
                </p>
                <p className="text-xs text-emerald-300">
                  <strong>EXPECTED BENEFIT:</strong> {generatedPlan.rotationStrategy.expectedBenefit}
                </p>
              </div>

              {/* Soil Improvement */}
              <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/20 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide block">
                  3. Soil Organic Matter & Biology
                </span>
                <p className="text-xs text-slate-200">
                  <strong className="text-white">WHAT:</strong> {generatedPlan.soilImprovement.what}
                </p>
                <p className="text-xs text-slate-300">
                  <strong className="text-slate-400">WHY:</strong> {generatedPlan.soilImprovement.why}
                </p>
                <p className="text-xs text-emerald-300">
                  <strong>EXPECTED BENEFIT:</strong> {generatedPlan.soilImprovement.expectedBenefit}
                </p>
              </div>

              {/* Water & Biodiversity */}
              <div className="bg-[#06140D] p-4 rounded-2xl border border-emerald-500/20 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide block">
                  4. Water & Habitat Conservation
                </span>
                <p className="text-xs text-slate-200">
                  <strong className="text-white">WHAT:</strong> {generatedPlan.waterStrategy.what}
                </p>
                <p className="text-xs text-slate-300">
                  <strong className="text-slate-400">WHY:</strong> {generatedPlan.waterStrategy.why}
                </p>
                <p className="text-xs text-cyan-300">
                  <strong>EXPECTED BENEFIT:</strong> {generatedPlan.waterStrategy.expectedBenefit}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
