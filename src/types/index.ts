export type Language = 'en' | 'hi' | 'bn' | 'mr' | 'ta' | 'te' | 'gu' | 'pa';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface LocationState {
  state: string;
  district: string;
  village: string;
}

export interface FarmerProfile {
  name: string;
  phone?: string;
  state: string;
  district: string;
  village: string;
  crop: string;
  variety: string;
  soilType: string;
  sowingDate: string;
  cropStage: string;
  irrigation: 'Canal' | 'Borewell' | 'Drip' | 'Rainfed' | 'Sprinkler';
  farmSize: string; // in acres
  farmingGoal?: string;
}

export interface AdvisoryData {
  id: string;
  timestamp: string;
  crop: string;
  state: string;
  district: string;
  cropStatus: string;
  weatherImpact: string;
  irrigationAdvice: string;
  soilAdvice: string;
  nutrientGuidance: {
    ureaKgPerAcre: number;
    dapKgPerAcre: number;
    mopKgPerAcre: number;
    micronutrients: string;
    applicationTiming: string;
  };
  pestDiseaseRisk: {
    riskLevel: RiskLevel;
    detectedRisks: string[];
    symptomsToWatch: string[];
    preventiveSprays: string[];
  };
  regenerativeRecommendation: {
    strategy: string;
    coverCropSuggestion: string;
    soilCarbonAction: string;
    waterConservationTip: string;
  };
  sevenDayPlan: Array<{
    day: string;
    activity: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
  }>;
  riskLevel: RiskLevel;
  explanation: string;
  isDemo: boolean;
  modelUsed: string;
}

export interface CropDiseaseResult {
  id: string;
  disease: string;
  scientificName?: string;
  confidence: number; // 0-100%
  riskLevel: RiskLevel;
  observedSymptoms: string[];
  recommendedNextSteps: string[];
  prevention: string[];
  organicRemedy: string;
  chemicalRemedy: string;
  expertDisclaimer: string;
  isDemo: boolean;
  analyzedAt: string;
  imageUrl?: string;
}

export interface WeatherDay {
  day: string;
  tempMax: number;
  tempMin: number;
  rainfallMm: number;
  humidity: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Thunderstorm' | 'Cloudy';
}

export interface WeatherData {
  currentTemp: number;
  feelsLike: number;
  humidity: number;
  rainfall24h: number;
  rainProbability: number;
  windSpeedKmH: number;
  windDirection: string;
  condition: string;
  forecast7Days: WeatherDay[];
  risks: {
    rainRisk: { level: RiskLevel; description: string };
    heatRisk: { level: RiskLevel; description: string };
    waterStress: { level: RiskLevel; description: string };
    fungalRisk: { level: RiskLevel; description: string };
  };
  lastUpdated: string;
  isLive: boolean;
}

export interface SoilData {
  pH: number;
  phStatus: 'Acidic' | 'Optimal' | 'Alkaline';
  nitrogenKgHa: number;
  nitrogenStatus: 'Deficient' | 'Optimal' | 'Surplus';
  phosphorusKgHa: number;
  phosphorusStatus: 'Deficient' | 'Optimal' | 'Surplus';
  potassiumKgHa: number;
  potassiumStatus: 'Deficient' | 'Optimal' | 'Surplus';
  organicCarbonPercent: number;
  organicCarbonStatus: 'Low' | 'Moderate' | 'High';
  moisturePercent: number;
  moistureStatus: 'Low' | 'Optimal' | 'Excess';
  soilType: string;
  aiAdvisory: string;
  lastTestedDate: string;
}

export interface SatelliteLayerData {
  cropHealthScore: number; // 0 - 100
  vegetationTrend: 'Improving' | 'Stable' | 'Declining';
  ndviValue: number; // 0.0 - 1.0
  waterStress: 'Low' | 'Moderate' | 'High' | 'Severe';
  diseaseRisk: 'Low' | 'Moderate' | 'High';
  rainfallStatus: 'Deficit' | 'Normal' | 'Excess';
  soilMoisturePercent: number;
}

export interface IndiaStateInfo {
  id: string;
  name: string;
  hindiName: string;
  majorCrops: string[];
  climateRisk: RiskLevel;
  diseaseRisk: RiskLevel;
  cropHealth: number;
  rainfall: string;
  soilMoisture: number;
  ndvi: number;
  waterStress: string;
  sharedModels: string[];
  activeFarmers: number;
  advisoriesIssued: number;
  coordinates: { x: number; y: number };
}

export interface RegenerativeStrategy {
  practice: string;
  hindiPractice: string;
  icon: string;
  what: string;
  why: string;
  expectedBenefit: string;
  costEfficiency: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
}

export interface DataSourceItem {
  id: string;
  name: string;
  category: 'Weather' | 'Soil' | 'Satellite' | 'Crop Health' | 'Market / Mandi' | 'Climate Risk';
  provider: string;
  type: 'LIVE API' | 'PUBLIC DATASET' | 'DEMO DATA';
  status: 'Operational' | 'Simulated' | 'Public Open Data';
  updateFrequency: string;
  description: string;
  endpointOrSource: string;
}
