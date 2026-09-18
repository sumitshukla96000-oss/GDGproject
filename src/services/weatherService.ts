import { WeatherData, RiskLevel } from '../types';

export const getWeatherData = (state: string, district: string): WeatherData => {
  // Determine state-specific realistic variations
  let baseTemp = 29;
  let humidity = 68;
  let rainfall24h = 4.2;
  let rainProbability = 42;
  let condition = 'Partly Cloudy';
  let rainRiskLevel: RiskLevel = 'MEDIUM';
  let heatRiskLevel: RiskLevel = 'LOW';
  let fungalRiskLevel: RiskLevel = 'HIGH';
  let waterStressLevel: RiskLevel = 'LOW';

  if (state === 'Rajasthan') {
    baseTemp = 36;
    humidity = 34;
    rainfall24h = 0;
    rainProbability = 8;
    condition = 'Sunny & Dry';
    rainRiskLevel = 'LOW';
    heatRiskLevel = 'HIGH';
    waterStressLevel = 'HIGH';
    fungalRiskLevel = 'LOW';
  } else if (state === 'Punjab') {
    baseTemp = 28;
    humidity = 58;
    rainfall24h = 1.8;
    rainProbability = 25;
    condition = 'Partly Cloudy';
    rainRiskLevel = 'LOW';
    heatRiskLevel = 'LOW';
    waterStressLevel = 'MEDIUM';
    fungalRiskLevel = 'MEDIUM';
  } else if (state === 'Bihar') {
    baseTemp = 31;
    humidity = 82;
    rainfall24h = 16.4;
    rainProbability = 78;
    condition = 'Heavy Showers';
    rainRiskLevel = 'HIGH';
    heatRiskLevel = 'LOW';
    fungalRiskLevel = 'HIGH';
    waterStressLevel = 'LOW';
  } else if (state === 'Tamil Nadu') {
    baseTemp = 32;
    humidity = 74;
    rainfall24h = 6.8;
    rainProbability = 54;
    condition = 'Scattered Clouds';
    rainRiskLevel = 'MEDIUM';
    heatRiskLevel = 'MEDIUM';
    fungalRiskLevel = 'MEDIUM';
    waterStressLevel = 'LOW';
  }

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const forecast7Days = days.map((d, index) => {
    const tempMax = Math.round(baseTemp + Math.sin(index) * 3);
    const tempMin = Math.round(baseTemp - 8 + Math.cos(index) * 2);
    const rain = index === 1 || index === 2 ? Math.round(rainfall24h * 1.5) : Math.round(rainfall24h * 0.4);
    return {
      day: d,
      tempMax,
      tempMin,
      rainfallMm: rain,
      humidity: Math.min(95, Math.max(30, humidity + index * 2)),
      condition: rain > 10 ? 'Rainy' : rain > 2 ? 'Partly Cloudy' : 'Sunny' as any,
    };
  });

  return {
    currentTemp: baseTemp,
    feelsLike: baseTemp + 2,
    humidity,
    rainfall24h,
    rainProbability,
    windSpeedKmH: 14,
    windDirection: 'ESE (112°)',
    condition,
    forecast7Days,
    risks: {
      rainRisk: {
        level: rainRiskLevel,
        description: rainRiskLevel === 'HIGH' ? 'Heavy downpours forecasted within 36 hours. Delay irrigation and pesticide application.' : 'Moderate rain expected. Soil moisture balance is stable.',
      },
      heatRisk: {
        level: heatRiskLevel,
        description: heatRiskLevel === 'HIGH' ? 'Extreme daytime heat stress (>36°C) can cause floral abortion or spikelet sterility.' : 'Ambient thermal regime is within standard agronomic physiological thresholds.',
      },
      waterStress: {
        level: waterStressLevel,
        description: waterStressLevel === 'HIGH' ? 'Subsurface root tension shows drought vulnerability. Supplemental micro-irrigation advised.' : 'Capillary water potential is adequate.',
      },
      fungalRisk: {
        level: fungalRiskLevel,
        description: fungalRiskLevel === 'HIGH' ? 'High relative humidity (>70%) paired with moderate temperatures creates prime incubation for fungal rusts and blights.' : 'Low atmospheric humidity suppresses spore germination.',
      },
    },
    lastUpdated: '10 mins ago (IMD Agro-met Grid)',
    isLive: false,
  };
};
