import { SatelliteLayerData } from '../types';

export const getSatelliteData = (state: string): SatelliteLayerData => {
  if (state === 'Punjab') {
    return {
      cropHealthScore: 78,
      vegetationTrend: 'Stable',
      ndviValue: 0.71,
      waterStress: 'High',
      diseaseRisk: 'Moderate',
      rainfallStatus: 'Deficit',
      soilMoisturePercent: 52,
    };
  } else if (state === 'Maharashtra') {
    return {
      cropHealthScore: 75,
      vegetationTrend: 'Improving',
      ndviValue: 0.68,
      waterStress: 'High',
      diseaseRisk: 'Low',
      rainfallStatus: 'Normal',
      soilMoisturePercent: 58,
    };
  } else if (state === 'Rajasthan') {
    return {
      cropHealthScore: 68,
      vegetationTrend: 'Declining',
      ndviValue: 0.54,
      waterStress: 'Severe',
      diseaseRisk: 'Low',
      rainfallStatus: 'Deficit',
      soilMoisturePercent: 38,
    };
  } else if (state === 'Tamil Nadu') {
    return {
      cropHealthScore: 86,
      vegetationTrend: 'Improving',
      ndviValue: 0.81,
      waterStress: 'Low',
      diseaseRisk: 'Moderate',
      rainfallStatus: 'Normal',
      soilMoisturePercent: 66,
    };
  }

  // Default Uttar Pradesh / Gangetic Plain
  return {
    cropHealthScore: 82,
    vegetationTrend: 'Improving',
    ndviValue: 0.74,
    waterStress: 'Moderate',
    diseaseRisk: 'Low',
    rainfallStatus: 'Normal',
    soilMoisturePercent: 64,
  };
};
