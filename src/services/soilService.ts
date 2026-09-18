import { SoilData } from '../types';

export const getSoilData = (state: string, district: string, soilType: string): SoilData => {
  let pH = 6.8;
  let nitrogenKgHa = 280;
  let phosphorusKgHa = 45;
  let potassiumKgHa = 190;
  let organicCarbonPercent = 0.72;
  let moisturePercent = 64;

  if (state === 'Punjab') {
    pH = 7.6;
    nitrogenKgHa = 220;
    phosphorusKgHa = 58;
    potassiumKgHa = 210;
    organicCarbonPercent = 0.55;
    moisturePercent = 52;
  } else if (state === 'Maharashtra') {
    pH = 7.4;
    nitrogenKgHa = 240;
    phosphorusKgHa = 38;
    potassiumKgHa = 290;
    organicCarbonPercent = 0.65;
    moisturePercent = 58;
  } else if (state === 'Rajasthan') {
    pH = 8.2;
    nitrogenKgHa = 160;
    phosphorusKgHa = 28;
    potassiumKgHa = 175;
    organicCarbonPercent = 0.35;
    moisturePercent = 38;
  } else if (state === 'Tamil Nadu') {
    pH = 6.5;
    nitrogenKgHa = 310;
    phosphorusKgHa = 42;
    potassiumKgHa = 180;
    organicCarbonPercent = 0.78;
    moisturePercent = 66;
  }

  return {
    pH,
    phStatus: pH < 6.0 ? 'Acidic' : pH > 7.5 ? 'Alkaline' : 'Optimal',
    nitrogenKgHa,
    nitrogenStatus: nitrogenKgHa < 250 ? 'Deficient' : nitrogenKgHa > 400 ? 'Surplus' : 'Optimal',
    phosphorusKgHa,
    phosphorusStatus: phosphorusKgHa < 30 ? 'Deficient' : phosphorusKgHa > 60 ? 'Surplus' : 'Optimal',
    potassiumKgHa,
    potassiumStatus: potassiumKgHa < 150 ? 'Deficient' : potassiumKgHa > 300 ? 'Surplus' : 'Optimal',
    organicCarbonPercent,
    organicCarbonStatus: organicCarbonPercent < 0.5 ? 'Low' : organicCarbonPercent > 0.8 ? 'High' : 'Moderate',
    moisturePercent,
    moistureStatus: moisturePercent < 45 ? 'Low' : moisturePercent > 75 ? 'Excess' : 'Optimal',
    soilType: soilType || 'Alluvial Loam',
    aiAdvisory: organicCarbonPercent < 0.6
      ? 'Soil organic carbon is sub-optimal. Incorporate Sesbania (Dhaincha) green manure and avoid stubble burning to restore soil microbial ecology.'
      : 'Soil health parameters are well-balanced. Maintain organic matter through suitable crop rotation, residue management and organic inputs.',
    lastTestedDate: 'August 2026 (Soil Health Card Registry #SHC-UP-2026-894)',
  };
};
