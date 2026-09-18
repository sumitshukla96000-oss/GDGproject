import { FarmerProfile, AdvisoryData, CropDiseaseResult, WeatherData, SoilData, SatelliteLayerData } from '../types';
import { SAMPLE_CROP_DISEASES } from './mockData';

export async function generateAdvisory(
  profile: FarmerProfile,
  weather: WeatherData,
  soil: SoilData,
  satellite: SatelliteLayerData
): Promise<AdvisoryData> {
  try {
    const response = await fetch('/api/gemini/advisory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, weather, soil, satellite }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.advisory) {
        return data.advisory;
      }
    }
  } catch (err) {
    console.warn('Backend Gemini API not reachable, using local fallback generator:', err);
  }

  // Fallback demo response generator with dynamic realism
  return generateDemoAdvisory(profile, weather, soil, satellite);
}

export function generateDemoAdvisory(
  profile: FarmerProfile,
  weather: WeatherData,
  soil: SoilData,
  satellite: SatelliteLayerData
): AdvisoryData {
  const isRainHigh = weather.rainProbability > 40;
  const isSoilMoist = soil.moisturePercent > 60;
  const isNitrogenLow = soil.nitrogenKgHa < 250;

  const crop = profile.crop || 'Wheat';
  const state = profile.state || 'Uttar Pradesh';
  const stage = profile.cropStage || 'Tillering (40-45 DAS)';

  return {
    id: `adv-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    crop,
    state,
    district: profile.district || 'Prayagraj',
    cropStatus: `${crop} is currently at the crucial '${stage}' vegetative stage in ${profile.district}. Canopy greenness (NDVI: ${satellite.ndviValue}) reflects healthy cellular turgor. Root proliferation is currently active in the top 15-20cm of the soil profile.`,
    weatherImpact: isRainHigh
      ? `Forecast models predict ${weather.rainProbability}% precipitation (${weather.forecast7Days[1]?.rainfallMm || 6}mm) in the next 48 hours with high relative humidity (${weather.humidity}%). This will replenish surface capillary reserves but elevates foliar fungal disease incubation risks.`
      : `Weather outlook is predominantly clear with ambient daytime temperatures of ${weather.currentTemp}°C. Evapotranspiration will remain moderate at 3.8 mm/day.`,
    irrigationAdvice: isRainHigh
      ? `HOLD IRRIGATION IMMEDIATELY for the next 48 to 72 hours. Soil moisture is already optimal at ${soil.moisturePercent}%. Additional flood or furrow irrigation risks root asphyxiation, nutrient leaching, and lodging.`
      : `Provide light irrigation (30-35mm depth) within the next 3 days, preferably during early morning hours to minimize evaporative loss.`,
    soilAdvice: isNitrogenLow
      ? `Soil test indicates available nitrogen is deficient (${soil.nitrogenKgHa} kg/ha). Top-dress urea only after the rain event clears to prevent volatile ammonia loss. Incorporate organic mulch to enhance active carbon.`
      : `Soil organic carbon (${soil.organicCarbonPercent}%) and pH (${soil.pH}) are within favorable agronomic ranges. Maintain soil structure with minimal inter-row tillage.`,
    nutrientGuidance: {
      ureaKgPerAcre: isNitrogenLow ? 35 : 25,
      dapKgPerAcre: 15,
      mopKgPerAcre: 10,
      micronutrients: 'Zinc Sulphate (ZnSO4 21%) @ 5 kg/acre + 0.5% Ferrous Sulphate foliar spray if interveinal chlorosis appears.',
      applicationTiming: 'Split application: 50% basal (completed), 25% at tillering, remaining 25% prior to boot leaf initiation.',
    },
    pestDiseaseRisk: {
      riskLevel: isRainHigh ? 'MEDIUM' : 'LOW',
      detectedRisks: isRainHigh
        ? ['Yellow Rust (Puccinia striiformis)', 'Aphid / Jassid Colonies', 'Collar Rot']
        : ['Termite incidence in dry patches', 'Minor Thrip feeding'],
      symptomsToWatch: [
        'Powdery yellow pustule lines on flag leaves',
        'Stunted tillering with curled pale leaf margins',
        'Water-soaked lesions near the crown root junction',
      ],
      preventiveSprays: [
        'Prophylactic spray of Neem Seed Kernel Extract (NSKE 5%) @ 50ml/10L pump',
        'If rust lesions exceed 3% leaf area: Propiconazole 25% EC @ 1ml/L',
      ],
    },
    regenerativeRecommendation: {
      strategy: 'Legume Intercropping & In-situ Residue Mulching',
      coverCropSuggestion: 'Broadcast short-duration Moong (Green Gram) or Cowpea along boundary rows to stimulate indigenous mycorrhizal fungi.',
      soilCarbonAction: 'Retain 4 inches of harvest residue across the furrow floor to cushion soil against heat radiation and retain 30% more moisture.',
      waterConservationTip: 'Transition from border-strip flooding to alternate-furrow or drip fertigation to conserve up to 45% aquifer water.',
    },
    sevenDayPlan: [
      { day: 'Day 1 (Today)', activity: 'Scout field borders for initial fungal pustules and suspend all irrigation canals.', priority: 'HIGH' },
      { day: 'Day 2 (Tomorrow)', activity: 'Monitor incoming precipitation; ensure drainage channels from low-lying field corners are unblocked.', priority: 'HIGH' },
      { day: 'Day 3', activity: 'Assess post-rain soil moisture and check for water stagnation around crown roots.', priority: 'MEDIUM' },
      { day: 'Day 4', activity: 'Prepare bio-fungicide mixture (Trichoderma viride @ 5g/L) for protective border application.', priority: 'MEDIUM' },
      { day: 'Day 5', activity: 'Top-dress split dose of Urea (25 kg/acre) once soil surface attains workable moisture (Vapsa condition).', priority: 'HIGH' },
      { day: 'Day 6', activity: 'Inspect leaf undersides for aphid colonies using yellow sticky cards.', priority: 'LOW' },
      { day: 'Day 7', activity: 'Evaluate vegetative tiller count; log weekly crop height in Krishi portal.', priority: 'LOW' },
    ],
    riskLevel: isRainHigh ? 'MEDIUM' : 'LOW',
    explanation: `This advisory was synthesized by cross-referencing satellite vegetation indices (${satellite.cropHealthScore}% vigor), IMD precipitation probabilities (${weather.rainProbability}%), and ICAR soil fertility indices (${soil.pH} pH). By holding irrigation before the impending rain, you preserve approximately ₹850 in diesel pumping costs while safeguarding root aeration.`,
    isDemo: true,
    modelUsed: 'Demo Mode (Local Agronomic Engine)',
  };
}

export async function diagnoseCropImage(
  imageDataUrl: string,
  cropName: string
): Promise<CropDiseaseResult> {
  try {
    const response = await fetch('/api/gemini/crop-doctor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageDataUrl, crop: cropName }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.diagnosis) {
        return data.diagnosis;
      }
    }
  } catch (err) {
    console.warn('Backend Gemini Vision API not reachable, using matching sample disease diagnosis:', err);
  }

  // Pick suitable sample disease based on crop or random realistic sample
  const sample = SAMPLE_CROP_DISEASES.find(d => d.disease.toLowerCase().includes(cropName.toLowerCase())) || SAMPLE_CROP_DISEASES[0];

  return {
    ...sample,
    id: `diag-${Date.now()}`,
    analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    isDemo: true,
  };
}

export interface KisanAIResponse {
  answer: string;
  language: 'hi-IN' | 'en-IN';
  languageName: 'Hindi' | 'English';
  isDemo: boolean;
}

export async function askKisanAI(
  question: string,
  farmerContext: any,
  lang: string,
  inputMode: 'voice' | 'text' = 'text'
): Promise<KisanAIResponse> {
  const isHindi =
    lang === 'hi' ||
    lang === 'hi-IN' ||
    lang === 'Hindi' ||
    /[\u0900-\u097F]/.test(question);

  const targetLang = isHindi ? 'hi-IN' : 'en-IN';
  const targetLangName = isHindi ? 'Hindi' : 'English';

  try {
    const response = await fetch('/api/gemini/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: question,
        question,
        context: farmerContext,
        language: targetLang,
        languageName: targetLangName,
        inputMode,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.answer) {
        return {
          answer: data.answer,
          language: data.language || targetLang,
          languageName: data.languageName || targetLangName,
          isDemo: Boolean(data.isDemo),
        };
      }
    }
  } catch (err) {
    console.warn('Backend query API unreachable, using natural localized engine:', err);
  }

  // Realistic natural fallback responses (strictly no English for Hindi)
  let fallbackAnswer = '';
  if (isHindi) {
    if (question.includes('पीले') || question.includes('पीला')) {
      fallbackAnswer = `गेहूं के पत्ते पीले होने के मुख्य कारण और समाधान:\n\n1. नाइट्रोजन की कमी: यदि निचली पत्तियां पीली पड़ रही हैं, तो यूरिया (25-30 किग्रा/एकड़) का संतुलित प्रयोग करें।\n2. अत्यधिक नमी/जलभराव: खेत में पानी जमा न रहने दें, जलनिकासी का उचित प्रबंध करें।\n3. पीला रतुआ (Yellow Rust): यदि पत्तियों पर हल्दी जैसा चूर्ण दिखे, तो प्रोपिकोनाज़ोल 25% EC (1 मिली प्रति लीटर) का छिड़काव करें।\n\nसटीक जांच के लिए फसल डॉक्टर में पत्ती की फोटो अपलोड करें।`;
    } else if (question.includes('बारिश') || question.includes('मौसम') || question.includes('पानी') || question.includes('सिंचाई')) {
      fallbackAnswer = `मौसम और सिंचाई सलाह (${farmerContext?.district || 'प्रयागराज'}):\n\n1. अगले 48 घंटों में वर्षा की संभावना को देखते हुए खुली सिंचाई स्थगित रखें।\n2. खेत की मेड़ों और जलनिकासी नालियों को साफ रखें ताकि पानी न भरे।\n3. वर्षा के बाद मिट्टी के वापस सूखने (वापसा स्थिति) पर ही आवश्यक खाद का छिड़काव करें।`;
    } else {
      fallbackAnswer = `नमस्ते! किसानAI सहायक में आपका स्वागत है। आपके खेत (${farmerContext?.district || 'प्रयागराज'}, फसल: ${farmerContext?.crop || 'गेहूं'}) के लिए:\n\n1. वर्तमान मौसम को देखते हुए सिंचाई में सावधानी बरतें और जलभराव से बचें।\n2. फसल की पत्तियों और तने का नियमित निरीक्षण करें ताकि किसी भी रोग का समय पर पता चल सके।\n3. जैविक मल्चिंग अपनाएं जिससे मिट्टी की नमी और सूक्ष्मजीव सुरक्षित रहें।\n\nअपनी फसल से जुड़े किसी भी सवाल के लिए बेझिझक पूछें।`;
    }
  } else {
    fallbackAnswer = `Hello! Based on agricultural telemetry for ${farmerContext?.crop || 'Wheat'} in ${farmerContext?.district || 'Prayagraj'}:\n\n1. Hold irrigation today as precipitation (42% probability) is forecasted in the next 48 hours.\n2. Atmospheric humidity is high (68%), so scout the crop for early yellow rust stripes or fungal signs.\n3. Apply the next split nitrogen dose only after the soil reaches the ideal workable moisture (Vapsa) state.`;
  }

  return {
    answer: fallbackAnswer,
    language: targetLang,
    languageName: targetLangName,
    isDemo: true,
  };
}

export async function askKrishiAssistant(
  question: string,
  farmerContext: any,
  lang: string,
  inputMode: 'voice' | 'text' = 'text'
): Promise<string> {
  const res = await askKisanAI(question, farmerContext, lang, inputMode);
  return res.answer;
}

