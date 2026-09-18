import React from 'react';
import { INDIAN_STATES } from '../services/mockData';
import { RiskLevel } from '../types';

interface IndiaMapSvgProps {
  selectedState: string;
  onSelectState: (stateName: string) => void;
  activeLayer: 'Crop Health' | 'Rainfall' | 'Soil Moisture' | 'Disease Risk' | 'Climate Risk';
}

export const IndiaMapSvg: React.FC<IndiaMapSvgProps> = ({
  selectedState,
  onSelectState,
  activeLayer,
}) => {
  // Simplified stylized polygon paths for major Indian states to render cleanly on all devices
  const statePaths: Record<string, { path: string; center: [number, number]; label: string }> = {
    'Punjab': {
      path: 'M 140,80 L 175,95 L 165,130 L 130,120 Z',
      center: [152, 105],
      label: 'Punjab',
    },
    'Rajasthan': {
      path: 'M 80,120 L 140,110 L 160,170 L 120,230 L 70,180 Z',
      center: [115, 165],
      label: 'Rajasthan',
    },
    'Uttar Pradesh': {
      path: 'M 175,95 L 280,115 L 270,175 L 180,165 L 160,120 Z',
      center: [220, 138],
      label: 'Uttar Pradesh',
    },
    'Bihar': {
      path: 'M 280,115 L 340,125 L 330,180 L 270,175 Z',
      center: [305, 148],
      label: 'Bihar',
    },
    'Madhya Pradesh': {
      path: 'M 160,170 L 270,175 L 280,240 L 180,250 L 140,210 Z',
      center: [210, 210],
      label: 'Madhya Pradesh',
    },
    'Maharashtra': {
      path: 'M 130,235 L 210,245 L 250,310 L 170,335 L 120,280 Z',
      center: [175, 285],
      label: 'Maharashtra',
    },
    'Karnataka': {
      path: 'M 150,335 L 205,325 L 195,410 L 140,390 Z',
      center: [175, 365],
      label: 'Karnataka',
    },
    'Tamil Nadu': {
      path: 'M 195,400 L 235,390 L 220,470 L 170,460 Z',
      center: [205, 430],
      label: 'Tamil Nadu',
    },
  };

  const getFillColor = (stateName: string) => {
    const data = INDIAN_STATES[stateName];
    if (!data) return '#1e293b';

    const isSelected = selectedState === stateName;

    if (activeLayer === 'Crop Health') {
      // Health 65% - 90%
      if (data.cropHealth >= 80) return isSelected ? '#10B981' : '#059669';
      if (data.cropHealth >= 75) return isSelected ? '#34D399' : '#10B981';
      return isSelected ? '#FBBF24' : '#D97706';
    }

    if (activeLayer === 'Soil Moisture') {
      if (data.soilMoisture >= 60) return isSelected ? '#06B6D4' : '#0891B2';
      if (data.soilMoisture >= 50) return isSelected ? '#38BDF8' : '#0284C7';
      return isSelected ? '#F59E0B' : '#B45309';
    }

    if (activeLayer === 'Rainfall') {
      if (data.rainfall.includes('Excess')) return isSelected ? '#3B82F6' : '#2563EB';
      if (data.rainfall.includes('Normal')) return isSelected ? '#10B981' : '#059669';
      return isSelected ? '#EF4444' : '#B91C1C';
    }

    if (activeLayer === 'Disease Risk') {
      if (data.diseaseRisk === 'HIGH') return isSelected ? '#EF4444' : '#DC2626';
      if (data.diseaseRisk === 'MEDIUM') return isSelected ? '#FBBF24' : '#D97706';
      return isSelected ? '#10B981' : '#059669';
    }

    // Climate Risk
    if (data.climateRisk === 'CRITICAL') return isSelected ? '#EF4444' : '#B91C1C';
    if (data.climateRisk === 'HIGH') return isSelected ? '#F97316' : '#C2410C';
    if (data.climateRisk === 'MEDIUM') return isSelected ? '#FBBF24' : '#D97706';
    return isSelected ? '#10B981' : '#059669';
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2">
      {/* SVG Container */}
      <svg
        viewBox="50 50 320 440"
        className="w-full h-auto max-h-[380px] drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300"
      >
        {/* Subtle background glow */}
        <circle cx="210" cy="270" r="160" fill="rgba(16,185,129,0.04)" />

        {/* Ambient Map Base Outline */}
        <path
          d="M 160,60 L 210,55 L 240,75 L 290,110 L 360,120 L 350,190 L 280,240 L 240,360 L 220,480 L 170,470 L 130,360 L 110,250 L 70,170 L 130,80 Z"
          fill="#0B261B"
          stroke="#164E37"
          strokeWidth="1.5"
          opacity="0.4"
        />

        {/* Interactive State Regions */}
        {Object.entries(statePaths).map(([stateName, config]) => {
          const isSelected = selectedState === stateName;
          const fillColor = getFillColor(stateName);

          return (
            <g
              key={stateName}
              onClick={() => onSelectState(stateName)}
              className="cursor-pointer transition-all duration-300 group"
            >
              <path
                d={config.path}
                fill={fillColor}
                stroke={isSelected ? '#FDE047' : '#063B26'}
                strokeWidth={isSelected ? '2.5' : '1.2'}
                className="transition-all duration-200 hover:brightness-125 hover:stroke-white filter"
                style={{
                  filter: isSelected ? 'drop-shadow(0 0 8px rgba(34,197,94,0.7))' : undefined,
                }}
              />
              {/* State Label */}
              <text
                x={config.center[0]}
                y={config.center[1]}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isSelected ? '#FFFFFF' : '#E2E8F0'}
                fontSize="9"
                fontWeight={isSelected ? '700' : '500'}
                className="pointer-events-none select-none tracking-tight shadow-sm"
              >
                {config.label}
              </text>
            </g>
          );
        })}

        {/* Data telemetry pin on selected state */}
        {statePaths[selectedState] && (
          <g transform={`translate(${statePaths[selectedState].center[0]}, ${statePaths[selectedState].center[1] - 12})`}>
            <circle cx="0" cy="0" r="4" fill="#FBBF24" className="animate-ping opacity-75" />
            <circle cx="0" cy="0" r="3.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
          </g>
        )}
      </svg>

      {/* Map Legend */}
      <div className="flex items-center justify-center gap-4 text-xs mt-2 text-slate-300 font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          <span>Healthy / Favorable</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>Moderate Watch</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span>High Risk Alert</span>
        </div>
      </div>
    </div>
  );
};
