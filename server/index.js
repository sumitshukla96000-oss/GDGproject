import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

const apiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
let genAI = null;
if (apiKey) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    console.log('✓ Google Gemini SDK initialized successfully with API key.');
  } catch (e) {
    console.warn('Failed to initialize GoogleGenerativeAI with provided key:', e);
  }
} else {
  console.log('ℹ No GOOGLE_GEMINI_API_KEY provided in environment. Running in full Demo Mode with realistic local engine.');
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    geminiLive: Boolean(genAI),
    timestamp: new Date().toISOString(),
    service: 'Krishi Intelligence API Server',
  });
});

// AI Agroadvisory Endpoint
app.post('/api/gemini/advisory', async (req, res) => {
  const { profile, weather, soil, satellite } = req.body;

  if (!profile) {
    return res.status(400).json({ error: 'Missing farmer profile' });
  }

  // If Gemini API is not configured, send back null advisory to let client fallback cleanly
  if (!genAI) {
    return res.json({ advisory: null, isDemo: true, message: 'Gemini API key not configured, using high-fidelity demo engine.' });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    });

    const prompt = `
You are the Krishi Intelligence Chief Agronomist and Climate AI for Indian agriculture.
Synthesize the provided farmer parameters, meteorological data, soil fertility test, and satellite telemetry into a comprehensive, practical, localized agroadvisory.

FARMER CONTEXT:
State: ${profile.state}
District: ${profile.district}
Village: ${profile.village || 'Local Panchayat'}
Crop: ${profile.crop}
Variety: ${profile.variety || 'Recommended regional hybrid'}
Soil Type: ${profile.soilType || 'Loam'}
Crop Stage: ${profile.cropStage || 'Vegetative'}
Sowing Date: ${profile.sowingDate || 'Recent season'}
Irrigation Availability: ${profile.irrigation || 'Borewell'}
Farm Size: ${profile.farmSize || '3'} Acres
Farming Goal: ${profile.farmingGoal || 'Maximize climate resilience and yield'}

METEOROLOGICAL TELEMETRY:
Current Temp: ${weather?.currentTemp || 29}°C
Humidity: ${weather?.humidity || 68}%
Rainfall in 24h: ${weather?.rainfall24h || 4}mm
Rain Probability: ${weather?.rainProbability || 42}%
Condition: ${weather?.condition || 'Partly Cloudy'}

SOIL HEALTH CARD DATA:
pH: ${soil?.pH || 6.8} (${soil?.phStatus || 'Optimal'})
Available Nitrogen: ${soil?.nitrogenKgHa || 280} kg/ha (${soil?.nitrogenStatus || 'Optimal'})
Phosphorus: ${soil?.phosphorusKgHa || 45} kg/ha
Potassium: ${soil?.potassiumKgHa || 190} kg/ha
Organic Carbon: ${soil?.organicCarbonPercent || 0.72}%
Moisture: ${soil?.moisturePercent || 64}%

SATELLITE REMOTE SENSING:
Crop Health Index: ${satellite?.cropHealthScore || 82}%
NDVI: ${satellite?.ndviValue || 0.74}
Vegetation Trend: ${satellite?.vegetationTrend || 'Improving'}
Water Stress: ${satellite?.waterStress || 'Moderate'}

You MUST return pure JSON matching this exact structure:
{
  "id": "adv-live",
  "timestamp": "Generated on demand",
  "crop": "${profile.crop}",
  "state": "${profile.state}",
  "district": "${profile.district}",
  "cropStatus": "detailed status of the crop and vegetative vigor",
  "weatherImpact": "how the specific temperature, rain, and humidity affect the crop",
  "irrigationAdvice": "clear actionable guidance on whether to irrigate or hold",
  "soilAdvice": "soil management, pH, and organic carbon care",
  "nutrientGuidance": {
    "ureaKgPerAcre": number,
    "dapKgPerAcre": number,
    "mopKgPerAcre": number,
    "micronutrients": "specific micronutrient recommendations (e.g. Zinc, Boron)",
    "applicationTiming": "timing instructions"
  },
  "pestDiseaseRisk": {
    "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
    "detectedRisks": ["risk 1", "risk 2"],
    "symptomsToWatch": ["symptom 1", "symptom 2"],
    "preventiveSprays": ["remedy 1", "remedy 2"]
  },
  "regenerativeRecommendation": {
    "strategy": "practice name",
    "coverCropSuggestion": "cover crop details",
    "soilCarbonAction": "residue and organic action",
    "waterConservationTip": "water conservation tip"
  },
  "sevenDayPlan": [
    { "day": "Day 1 (Today)", "activity": "task", "priority": "HIGH" },
    { "day": "Day 2", "activity": "task", "priority": "MEDIUM" },
    { "day": "Day 3", "activity": "task", "priority": "HIGH" },
    { "day": "Day 4", "activity": "task", "priority": "MEDIUM" },
    { "day": "Day 5", "activity": "task", "priority": "LOW" },
    { "day": "Day 6", "activity": "task", "priority": "LOW" },
    { "day": "Day 7", "activity": "task", "priority": "LOW" }
  ],
  "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "explanation": "Clear agronomic reasoning explaining why this advisory was recommended.",
  "isDemo": false,
  "modelUsed": "Google Gemini 1.5 Flash (Live)"
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text);
    return res.json({ advisory: parsed, isDemo: false });
  } catch (error) {
    console.error('Error in Gemini Advisory Generation:', error);
    return res.json({ advisory: null, isDemo: true, error: error.message });
  }
});

// Crop Doctor Multimodal Screening Endpoint
app.post('/api/gemini/crop-doctor', async (req, res) => {
  const { image, crop } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Missing image data' });
  }

  if (!genAI) {
    return res.json({ diagnosis: null, isDemo: true, message: 'Gemini API key not configured' });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    });

    // Extract base64 data
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.json({ diagnosis: null, isDemo: true, error: 'Invalid base64 image data' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    const prompt = `
Analyze this crop leaf / plant photo for visible agricultural diseases or nutrient deficiencies, specifically for crop: ${crop || 'field crop'}.
Return pure JSON with this exact schema:
{
  "disease": "Specific Common Name of Disease (Scientific Name)",
  "scientificName": "Scientific binomial name",
  "confidence": number between 65 and 98,
  "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "observedSymptoms": ["symptom 1", "symptom 2", "symptom 3"],
  "recommendedNextSteps": ["immediate step 1", "step 2", "step 3"],
  "prevention": ["preventive measure 1", "preventive measure 2"],
  "organicRemedy": "Organic / Bio-fungicide / Bio-pesticide remedy with exact dosage",
  "chemicalRemedy": "Recommended chemical fungicide or pesticide with dilution instructions",
  "expertDisclaimer": "AI-assisted screening. Confirm important diagnoses with a qualified agricultural expert.",
  "isDemo": false
}
`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      },
    ]);

    const text = result.response.text();
    const parsed = JSON.parse(text);
    return res.json({ diagnosis: parsed, isDemo: false });
  } catch (error) {
    console.error('Error in Gemini Crop Doctor Vision:', error);
    return res.json({ diagnosis: null, isDemo: true, error: error.message });
  }
});

// Conversational Ask KisanAI / Krishi Assistant Endpoint
app.post('/api/gemini/query', async (req, res) => {
  const { question, message, context, language, languageName, inputMode } = req.body;
  const userQuery = message || question;

  if (!userQuery) {
    return res.status(400).json({ error: 'Missing message or question' });
  }

  const isHindi =
    language === 'hi-IN' ||
    language === 'hi' ||
    languageName === 'Hindi' ||
    (typeof userQuery === 'string' && /[\u0900-\u097F]/.test(userQuery));

  const targetLang = isHindi ? 'hi-IN' : 'en-IN';
  const targetLangName = isHindi ? 'Hindi' : 'English';

  if (!genAI) {
    // High-fidelity natural fallback in target language
    let fallbackAnswer = '';
    if (isHindi) {
      if (userQuery.includes('पीले') || userQuery.includes('पीला')) {
        fallbackAnswer = `गेहूं के पत्ते पीले होने के कई मुख्य कारण हो सकते हैं:\n\n1. पोषक तत्वों की कमी: यदि पुरानी निचली पत्तियां पीली हो रही हैं, तो यह नाइट्रोजन की कमी का संकेत है। सिंचाई के बाद यूरिया की संतुलित मात्रा (25-30 किग्रा/एकड़) डालें।\n2. अधिक नमी या जलभराव: यदि खेत में पानी रुका है, तो जड़ें सांस नहीं ले पातीं। तुरंत जलनिकासी की व्यवस्था करें।\n3. पीला रतुआ (Yellow Rust): यदि पत्तियों पर हल्दी जैसा पीला पाउडर या धारियां दिखें, तो यह फफूंद रोग है। इसके लिए प्रोपिकोनाज़ोल (Propiconazole 25% EC) 1 मिली प्रति लीटर पानी में मिलाकर छिड़काव करें।\n\nसटीक जांच के लिए फसल डॉक्टर में प्रभावित पत्ती की फोटो अपलोड करें।`;
      } else if (userQuery.includes('सिंचाई') || userQuery.includes('पानी')) {
        fallbackAnswer = `आपके खेत (${context?.district || 'प्रयागराज'}) के लिए सिंचाई सलाह:\n\n1. मौसम पूर्वानुमान के अनुसार अगले 48 घंटों में वर्षा की संभावना है, इसलिए अभी सिंचाई रोक दें।\n2. जब मिट्टी की ऊपरी सतह सूखकर काम करने योग्य (वापसा स्थिति) हो जाए, तभी अगली हल्की सिंचाई करें।\n3. गेहूं में कल्ले फूटते समय (Tillering) और बालियां निकलते समय नमी बनाए रखना बहुत आवश्यक है।`;
      } else {
        fallbackAnswer = `नमस्ते! किसानAI में आपका स्वागत है। आपके खेत (${context?.district || 'प्रयागराज'}, फसल: ${context?.crop || 'गेहूं'}) के लिए:\n\n1. वर्तमान मौसम और मिट्टी की स्थिति को देखते हुए फसल की नियमित निगरानी रखें।\n2. खेत में खरपतवार और कीटों के शुरुआती लक्षणों पर नज़र रखें।\n3. आवश्यकतानुसार जैविक खाद और संतुलित पोषक तत्वों का प्रयोग करें।\n\nआप किसी भी विशिष्ट समस्या जैसे रोग, खाद की मात्रा या मौसम के बारे में खुलकर पूछ सकते हैं।`;
      }
    } else {
      fallbackAnswer = `Based on agricultural telemetry for ${context?.crop || 'Wheat'} in ${context?.district || 'Prayagraj'}:\n\n1. Precipitation is expected in the next 48 hours; hold open irrigation to prevent waterlogging.\n2. Ambient temperature is 29°C with 68% relative humidity; scout for early fungal signs.\n3. Apply nitrogen top-dressing only after soil drains to workable moisture.`;
    }

    return res.json({
      answer: fallbackAnswer,
      language: targetLang,
      languageName: targetLangName,
      isDemo: true,
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let prompt = '';
    if (isHindi) {
      prompt = `
You are KisanAI, an agricultural AI assistant for Indian farmers.

The user's selected language is Hindi (hi-IN).

You MUST respond entirely in natural Hindi.
Do NOT answer in English.
Do NOT translate the answer into English.
Do NOT mix English sentences into the answer.
Use simple Hindi that an Indian farmer can easily understand.
Use commonly understood agricultural terms.
If a technical agricultural term is necessary, explain it simply in Hindi.
Give practical, safe and easy-to-follow agricultural guidance.
The response must be written in Devanagari Hindi script.

Farmer Context:
State: ${context?.state || 'उत्तर प्रदेश'}
District: ${context?.district || 'प्रयागराज'}
Crop: ${context?.crop || 'गेहूं'}
Current Weather: तापमान 29°C, नमी 68%, वर्षा संभावना 42%

Farmer's Question:
"${userQuery}"
`;
    } else {
      prompt = `
You are KisanAI, an agricultural AI assistant for Indian farmers.
Language requested: English (en-IN).

Farmer Context:
State: ${context?.state || 'Uttar Pradesh'}
District: ${context?.district || 'Prayagraj'}
Crop: ${context?.crop || 'Wheat'}
Temperature: ${context?.temp || 29}°C

Farmer's Question:
"${userQuery}"

Provide a clear, actionable, and farmer-friendly answer in 3-4 bullet points.
`;
    }

    const result = await model.generateContent(prompt);
    const answerText = result.response.text();

    return res.json({
      answer: answerText,
      language: targetLang,
      languageName: targetLangName,
      isDemo: false,
    });
  } catch (error) {
    console.error('Error in Gemini Query:', error);

    // Provide natural Hindi fallback even if external Gemini call errors
    let errorFallback = '';
    if (isHindi) {
      if (userQuery.includes('पीले') || userQuery.includes('पीला')) {
        errorFallback = `गेहूं की पत्तियों के पीले होने के मुख्य समाधान:\n\n1. यदि निचली पत्तियां पीली हैं, तो यूरिया (25-30 किग्रा/एकड़) का संतुलित छिड़काव करें।\n2. खेत में अत्यधिक पानी जमा न होने दें, जलनिकासी का ध्यान रखें।\n3. यदि पीली धारियां हैं (पीला रतुआ), तो प्रोपिकोनाज़ोल 25% EC (1 मिली/लीटर पानी) का छिड़काव करें।`;
      } else {
        errorFallback = `नमस्ते! आपके खेत (${context?.district || 'प्रयागराज'}, फसल: ${context?.crop || 'गेहूं'}) के लिए सलाह:\n\n1. अगले 48 घंटों में बारिश की संभावना को देखते हुए सिंचाई रोकें।\n2. पत्तियों और कल्लों की नियमित जांच करें।\n3. मिट्टी में उचित नमी रहने पर ही यूरिया की अगली खुराक दें।`;
      }
    } else {
      errorFallback = `Field guidance for ${context?.crop || 'Wheat'} in ${context?.district || 'Prayagraj'}: Hold irrigation due to incoming rain; monitor soil moisture.`;
    }

    return res.json({
      answer: errorFallback,
      language: targetLang,
      languageName: targetLangName,
      isDemo: true,
      error: error.message,
    });
  }
});

// Serve frontend build if dist exists
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🌾 Krishi Intelligence Server running on http://localhost:${PORT}`);
});
