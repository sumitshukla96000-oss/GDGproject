import React, { useState } from 'react';
import {
  Satellite,
  Orbit,
  TrendingUp,
  Droplets,
  CloudRain,
  AlertTriangle,
  Layers,
  Sprout,
  Activity,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { IndiaMapSvg } from '../components/IndiaMapSvg';
import { INDIAN_STATES } from '../services/mockData';
import { SatelliteLayerData } from '../types';

interface SatellitePageProps {
  selectedState: string;
  onSelectState: (state: string) => void;
  satelliteData: SatelliteLayerData;
}

export const SatellitePage: React.FC<SatellitePageProps> = ({
  selectedState,
  onSelectState,
  satelliteData,
}) => {
  const [activeLayer, setActiveLayer] = useState<
    'Crop Health' | 'Rainfall' | 'Soil Moisture' | 'Disease Risk' | 'Climate Risk'
  >('Crop Health');

  const stateData = INDIAN_STATES[selectedState] || INDIAN_STATES['Uttar Pradesh'];

  const layersList = [
    { id: 'Crop Health', icon: Sprout, desc: 'Canopy chlorophyll vigor index (10m resolution)' },
    { id: 'Rainfall', icon: CloudRain, desc: 'TRMM & INSAT-3D precipitation accumulation' },
    { id: 'Soil Moisture', icon: Droplets, desc: 'Root-zone active microwave capillary estimates' },
    { id: 'Disease Risk', icon: Activity, desc: 'Spatial fungal spore dispersal vulnerability' },
    { id: 'Climate Risk', icon: AlertTriangle, desc: 'Multi-hazard composite flood & heat index' },
  ] as const;

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071911] to-[#0D3021] border border-emerald-500/25 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-lg text-cyan-300">
              🛰️
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              SATELLITE CROP INTELLIGENCE
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Earth observation remote sensing combining Sentinel-2 10m multispectral imagery and ISRO Bhuvan geospatial telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Transparency Requirement: Demonstration Satellite Data */}
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>Demonstration Satellite Data</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Layers & Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Map Layers & Telemetry Details */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#091F14] border border-emerald-500/25 rounded-3xl p-5 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-emerald-500/20">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Multi-Spectral Map Layers</span>
            </h3>

            <div className="space-y-2">
              {layersList.map((layer) => {
                const Icon = layer.icon;
                const isActive = activeLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                        : 'bg-[#06140D] border-emerald-500/15 text-slate-300 hover:border-emerald-500/30'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        isActive ? 'bg-emerald-500 text-black' : 'bg-[#0B2519] text-emerald-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{layer.id}</span>
                        {isActive && (
                          <span className="text-[10px] px-2 py-0.2 rounded bg-emerald-500 text-black font-extrabold">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{layer.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected State Telemetry Card */}
          <div className="bg-[#091F14] border border-emerald-500/25 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
              <div>
                <span className="text-[10px] text-slate-400 font-mono">SELECTED PROVINCE</span>
                <h4 className="text-base font-bold text-white">{selectedState}</h4>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                {stateData.id}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#06140D] p-3 rounded-xl border border-emerald-500/15">
                <span className="text-[10px] text-slate-400 block">Crop Health</span>
                <span className="text-lg font-black text-emerald-400">{satelliteData.cropHealthScore}%</span>
              </div>
              <div className="bg-[#06140D] p-3 rounded-xl border border-emerald-500/15">
                <span className="text-[10px] text-slate-400 block">Vegetation Trend</span>
                <span className="text-sm font-bold text-white flex items-center gap-1 mt-0.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{satelliteData.vegetationTrend}</span>
                </span>
              </div>
              <div className="bg-[#06140D] p-3 rounded-xl border border-emerald-500/15">
                <span className="text-[10px] text-slate-400 block">Water Stress</span>
                <span className="text-sm font-bold text-amber-300 mt-0.5">{satelliteData.waterStress}</span>
              </div>
              <div className="bg-[#06140D] p-3 rounded-xl border border-emerald-500/15">
                <span className="text-[10px] text-slate-400 block">Disease Risk</span>
                <span className="text-sm font-bold text-emerald-400 mt-0.5">{satelliteData.diseaseRisk}</span>
              </div>
            </div>

            <div className="p-3 bg-[#06140D] rounded-xl border border-emerald-500/15 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Precipitation:</span>
                <span className="font-semibold text-white">{satelliteData.rainfallStatus}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">NDVI Greenness:</span>
                <span className="font-semibold text-emerald-300">{satelliteData.ndviValue} / 1.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Large Interactive India Satellite Map & Sensor Architecture */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#091F14] border border-emerald-500/25 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 flex-wrap gap-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🛰️ All-India Satellite Surface Reflectance</span>
                </h3>
                <p className="text-xs text-emerald-300/70">
                  Click any state on the map to switch geographic coordinates and regional telemetry.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-300 px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                Active Layer: {activeLayer}
              </span>
            </div>

            <div className="bg-[#05130D] rounded-2xl p-4 border border-emerald-500/20 flex items-center justify-center min-h-[440px]">
              <IndiaMapSvg
                selectedState={selectedState}
                onSelectState={onSelectState}
                activeLayer={activeLayer}
              />
            </div>
          </div>

          {/* Sensor Specs & Extensible Architecture Note */}
          <div className="bg-[#091F14] border border-emerald-500/25 rounded-3xl p-5 shadow-xl text-xs space-y-2">
            <h4 className="font-bold text-emerald-300 flex items-center gap-2 text-sm">
              <Orbit className="w-4 h-4 text-emerald-400" />
              <span>Extensible Remote Sensing Architecture</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Krishi Intelligence is structured with an abstraction layer (`/src/services/satelliteService.ts`) permitting instantaneous drop-in connection of live ISRO Bhuvan Web Map Services (WMS), Sentinel-Hub APIs, or PlanetScope 3m daily constellations without code alterations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
