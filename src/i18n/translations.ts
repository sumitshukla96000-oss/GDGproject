export const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
] as const;

export type LanguageCode = typeof languages[number]['code'];

export const translations = {
  en: {
    // Brand
    brandName: 'KRISHI INTELLIGENCE',
    brandTagline: 'AI-powered agricultural intelligence for a climate-resilient India.',
    builtForIndia: 'Built for Indian Agriculture',
    liveData: 'LIVE DATA',
    demoData: 'DEMO DATA',
    aiGenerated: 'AI Generated',

    // Navigation
    navDashboard: 'Dashboard',
    navAgroadvisory: 'AI Agroadvisory',
    navCropDoctor: 'Crop Doctor',
    navSatellite: 'Satellite Intelligence',
    navSoilHealth: 'Soil Health',
    navWeather: 'Weather & Climate',
    navRegenerative: 'Regenerative Farming',
    navIndiaNetwork: 'India Agriculture Network',
    navArchitecture: 'Digital Public Good',
    navDataSources: 'Data Sources',
    navAbout: 'About & Impact',
    navJudging: 'Judging View',

    // Hero
    heroHeadline: 'Intelligence for Every Field.',
    heroSubheadline: 'AI-powered agricultural intelligence helping Indian farmers make smarter, climate-resilient decisions.',
    ctaAdvisory: 'Get AI Agroadvisory',
    ctaDiagnose: 'Diagnose My Crop',
    ctaDemo: 'Try Full Demo',

    // Overview Cards
    locationOverview: 'Location Overview',
    weather: 'Weather',
    soilHealth: 'Soil Health',
    cropHealth: 'Crop Health',
    soilMoisture: 'Soil Moisture',
    diseaseRisk: 'Disease Risk',
    climateRisk: 'Climate Risk',
    vegetationIndex: 'Vegetation Index',
    optimalRange: 'Optimal Range',
    noMajorRisk: 'No major risk detected',
    rainfallExpected: 'Rainfall expected',
    healthy: 'Healthy',
    good: 'Good',
    moderate: 'Moderate',
    normal: 'Normal',
    low: 'Low',
    high: 'High',

    // Today's Advisory Card
    todayAdvisoryTitle: "Today's AI Advisory",
    todayAdvisoryText: 'Rain expected in the next 48 hours. Consider delaying irrigation and monitor fungal-risk conditions.',
    btnViewAdvisory: 'View Full Advisory',
    btnAskAi: 'Ask AI',
    btnListen: 'Listen',

    // Map Card
    mapTitle: 'Agricultural Intelligence Map',
    layerCropHealth: 'Crop Health',
    layerRainfall: 'Rainfall',
    layerSoilMoisture: 'Soil Moisture',
    layerDiseaseRisk: 'Disease Risk',
    layerClimateRisk: 'Climate Risk',
    majorCrops: 'Major Crops',
    viewStateDetails: 'View State Details',

    // How It Works
    howItWorksTitle: 'How It Works',
    stepFarmerData: 'Farmer Data',
    stepFarmerDataSub: '(Location + Crop)',
    stepAgriData: 'Agricultural Data',
    stepAgriDataSub: '(Weather + Soil + Satellite)',
    stepGemini: 'Google Gemini',
    stepGeminiSub: '(AI Analysis)',
    stepLocalized: 'Localized Advisory',
    stepLocalizedSub: '(Recommendations)',
    stepAction: 'Action',
    stepActionSub: '(Better Yield)',
    smartFarmingTag: 'Smart Farming, Stronger India',

    // Agroadvisory Form
    formTitle: 'Generate AI Agroadvisory',
    formSubtitle: 'Enter farm coordinates and crop parameters to synthesize satellite, soil and meteorological intelligence via Google Gemini.',
    fieldState: 'State',
    fieldDistrict: 'District',
    fieldVillage: 'Village / Tehsil',
    fieldCrop: 'Crop',
    fieldVariety: 'Crop Variety',
    fieldSoilType: 'Soil Type',
    fieldSowingDate: 'Sowing Date',
    fieldCropStage: 'Crop Stage',
    fieldIrrigation: 'Irrigation Availability',
    fieldFarmSize: 'Farm Size (Acres)',
    fieldGoal: 'Farming Goal (Optional)',
    btnGenerateAdvisory: '🌾 GENERATE AI AGROADVISORY',

    // AI Processing States
    aiAnalyzing: 'Krishi AI is synthesizing intelligence...',
    aiStepWeather: 'Weather & 7-day forecast analyzed',
    aiStepSoil: 'Soil health & NPK balances evaluated',
    aiStepCrop: 'Crop phenology & variety context parsed',
    aiStepRisk: 'Micro-climate & pest risk assessment complete',

    // Advisory Output
    cropStatus: 'Crop Status',
    weatherImpact: 'Weather Impact',
    irrigationAdvice: 'Irrigation Advice',
    soilAdvice: 'Soil Advice',
    nutrientGuidance: 'Nutrient Guidance',
    pestDiseaseRiskTitle: 'Pest / Disease Risk',
    regenerativeRec: 'Regenerative Farming Recommendation',
    sevenDayPlanTitle: 'Next 7 Days Action Plan',
    whyThisRec: 'Why this recommendation?',
    riskLevelLabel: 'Overall Field Risk Level',
    btnSave: 'Save Advisory',
    btnShare: 'Share (WhatsApp / SMS)',
    btnAskFollowup: 'Ask Follow-up',

    // Crop Doctor
    doctorTitle: '🦠 Crop Doctor - AI Disease Screening',
    doctorSubtitle: 'Upload or capture a leaf photo to screen for plant diseases using Google Gemini Computer Vision.',
    uploadPrompt: 'Drag and drop an image of the affected plant leaf, or click to browse',
    takePhoto: 'Take Photo on Mobile',
    btnAnalyze: 'ANALYZE CROP HEALTH',
    analyzingImage: 'Gemini Vision is inspecting leaf symptoms...',
    possibleDisease: 'Possible Disease',
    confidence: 'AI Confidence',
    symptomsObserved: 'Observed Symptoms',
    immediateSteps: 'Recommended Next Steps',
    preventionAdvice: 'Long-term Prevention',
    organicTreatment: 'Organic / Bio Remedy',
    chemicalTreatment: 'Integrated Management',
    doctorDisclaimer: 'AI-assisted screening. Confirm important diagnoses with a qualified agricultural expert.',
    sampleImagesTitle: 'Or test with realistic crop disease samples:',

    // Voice Assistant
    voiceTitle: 'Ask Krishi AI Assistant',
    voicePromptPlaceholder: 'Ask in Hindi or English (e.g., "मेरी गेहूं की फसल के लिए आज क्या करना चाहिए?")...',
    voiceListening: 'Listening to your voice...',
    voiceProcessing: 'Krishi AI is analyzing...',
    voiceReady: 'Response Ready',
    voiceStop: 'Stop Listening',

    // Footer
    footerSlogan: 'Healthy Soil. Healthy Crops. A Sustainable Future.',
    footerCopyright: '© 2026 Krishi Intelligence. Digital Public Good Architecture for Indian Agriculture.',
  },

  hi: {
    // Brand
    brandName: 'कृषि इंटेलिजेंस',
    brandTagline: 'जलवायु-सक्षम भारत के लिए एआई-संचालित कृषि आसूचना।',
    builtForIndia: 'भारतीय कृषि के लिए समर्पित',
    liveData: 'लाइव डेटा',
    demoData: 'डेमो डेटा',
    aiGenerated: 'एआई जनित',

    // Navigation
    navDashboard: 'डैशबोर्ड',
    navAgroadvisory: 'एआई कृषि सलाह',
    navCropDoctor: 'फसल डॉक्टर',
    navSatellite: 'उपग्रह आसूचना',
    navSoilHealth: 'मृदा स्वास्थ्य',
    navWeather: 'मौसम और जलवायु',
    navRegenerative: 'पुनर्योजी खेती',
    navIndiaNetwork: 'भारत कृषि नेटवर्क',
    navArchitecture: 'डिजिटल पब्लिक गुड',
    navDataSources: 'डेटा स्रोत',
    navAbout: 'परिचय एवं प्रभाव',
    navJudging: 'निर्णायक दृश्य',

    // Hero
    heroHeadline: 'हर खेत के लिए सटीक बुद्धिमत्ता।',
    heroSubheadline: 'भारतीय किसानों को जलवायु-सक्षम एवं लाभदायक निर्णय लेने में मदद करने वाली एआई-संचालित कृषि प्रणाली।',
    ctaAdvisory: 'एआई कृषि सलाह प्राप्त करें',
    ctaDiagnose: 'अपनी फसल की जांच करें',
    ctaDemo: 'पूर्ण डेमो देखें',

    // Overview Cards
    locationOverview: 'स्थान का विवरण',
    weather: 'मौसम',
    soilHealth: 'मृदा स्वास्थ्य',
    cropHealth: 'फसल स्वास्थ्य',
    soilMoisture: 'मृदा में नमी',
    diseaseRisk: 'रोग का जोखिम',
    climateRisk: 'जलवायु जोखिम',
    vegetationIndex: 'वनस्पति सूचकांक',
    optimalRange: 'अनुकूलतम स्तर',
    noMajorRisk: 'कोई बड़ा जोखिम नहीं',
    rainfallExpected: 'बारिश की संभावना',
    healthy: 'स्वस्थ',
    good: 'उत्कृष्ट',
    moderate: 'मध्यम',
    normal: 'सामान्य',
    low: 'कम',
    high: 'उच्च',

    // Today's Advisory Card
    todayAdvisoryTitle: "आज की एआई सलाह",
    todayAdvisoryText: 'अगले 48 घंटों में बारिश की संभावना है। सिंचाई टालने पर विचार करें और फफूंद रोग की निगरानी करें।',
    btnViewAdvisory: 'पूरी सलाह देखें',
    btnAskAi: 'एआई से पूछें',
    btnListen: 'सुनें',

    // Map Card
    mapTitle: 'कृषि आसूचना मानचित्र',
    layerCropHealth: 'फसल स्वास्थ्य',
    layerRainfall: 'वर्षा',
    layerSoilMoisture: 'मृदा नमी',
    layerDiseaseRisk: 'रोग जोखिम',
    layerClimateRisk: 'जलवायु जोखिम',
    majorCrops: 'प्रमुख फसलें',
    viewStateDetails: 'राज्य का विवरण देखें',

    // How It Works
    howItWorksTitle: 'यह कैसे काम करता है',
    stepFarmerData: 'किसान का डेटा',
    stepFarmerDataSub: '(स्थान + फसल)',
    stepAgriData: 'कृषि डेटा',
    stepAgriDataSub: '(मौसम + मिट्टी + उपग्रह)',
    stepGemini: 'गूगल जेमिनी',
    stepGeminiSub: '(एआई विश्लेषण)',
    stepLocalized: 'स्थानीय सलाह',
    stepLocalizedSub: '(कार्य योजना)',
    stepAction: 'कार्रवाई',
    stepActionSub: '(बेहतर पैदावार)',
    smartFarmingTag: 'स्मार्ट खेती, समृद्ध भारत',

    // Agroadvisory Form
    formTitle: 'एआई कृषि सलाह प्राप्त करें',
    formSubtitle: 'खेत और फसल की जानकारी दर्ज करें ताकि उपग्रह, मिट्टी और मौसम डेटा का गूगल जेमिनी द्वारा विश्लेषण किया जा सके।',
    fieldState: 'राज्य',
    fieldDistrict: 'ज़िला',
    fieldVillage: 'गाँव / तहसील',
    fieldCrop: 'फसल',
    fieldVariety: 'फसल की किस्म',
    fieldSoilType: 'मिट्टी का प्रकार',
    fieldSowingDate: 'बुवाई की तारीख',
    fieldCropStage: 'फसल की अवस्था',
    fieldIrrigation: 'सिंचाई सुविधा',
    fieldFarmSize: 'खेत का आकार (एकड़)',
    fieldGoal: 'खेती का लक्ष्य (वैकल्पिक)',
    btnGenerateAdvisory: '🌾 एआई सलाह तैयार करें',

    // AI Processing States
    aiAnalyzing: 'कृषि एआई डेटा का विश्लेषण कर रहा है...',
    aiStepWeather: 'मौसम और 7-दिवसीय पूर्वानुमान का विश्लेषण पूर्ण',
    aiStepSoil: 'मृदा स्वास्थ्य और पोषक तत्वों का मूल्यांकन पूर्ण',
    aiStepCrop: 'फसल विकास अवस्था का मिलान पूर्ण',
    aiStepRisk: 'जलवायु एवं कीट जोखिम विश्लेषण पूर्ण',

    // Advisory Output
    cropStatus: 'फसल की स्थिति',
    weatherImpact: 'मौसम का प्रभाव',
    irrigationAdvice: 'सिंचाई सलाह',
    soilAdvice: 'मृदा प्रबंधन सलाह',
    nutrientGuidance: 'पोषक तत्व और खाद मार्गदर्शन',
    pestDiseaseRiskTitle: 'कीट एवं रोग जोखिम',
    regenerativeRec: 'पुनर्योजी (जैविक) खेती सिफारिश',
    sevenDayPlanTitle: 'अगले 7 दिनों की कार्य योजना',
    whyThisRec: 'यह सलाह क्यों दी गई?',
    riskLevelLabel: 'खेत का कुल जोखिम स्तर',
    btnSave: 'सलाह सहेजें',
    btnShare: 'शेयर करें (व्हाट्सएप)',
    btnAskFollowup: 'आगे का सवाल पूछें',

    // Crop Doctor
    doctorTitle: '🦠 फसल डॉक्टर - एआई रोग पहचान',
    doctorSubtitle: 'गूगल जेमिनी कंप्यूटर विजन की मदद से पौधे की पत्ती की तस्वीर अपलोड कर रोग की तुरंत पहचान करें।',
    uploadPrompt: 'रोगग्रस्त पत्ती की फोटो यहाँ ड्रैग करें या फ़ाइल चुनें',
    takePhoto: 'मोबाइल से फोटो लें',
    btnAnalyze: 'फसल स्वास्थ्य की जांच करें',
    analyzingImage: 'जेमिनी विजन पत्ती के लक्षणों का विश्लेषण कर रहा है...',
    possibleDisease: 'संभावित रोग',
    confidence: 'एआई सटीकता',
    symptomsObserved: 'पहचाने गए लक्षण',
    immediateSteps: 'तुरंत करने योग्य कदम',
    preventionAdvice: 'भविष्य में रोकथाम के उपाय',
    organicTreatment: 'जैविक उपचार',
    chemicalTreatment: 'एकीकृत प्रबंधन',
    doctorDisclaimer: 'यह एआई आधारित प्राथमिक जांच है। महत्वपूर्ण निर्णयों के लिए कृषि विशेषज्ञ से पुष्टि करें।',
    sampleImagesTitle: 'या इन वास्तविक रोग नमूनों से तुरंत परीक्षण करें:',

    // Voice Assistant
    voiceTitle: 'कृषि एआई वॉइस सहायक से पूछें',
    voicePromptPlaceholder: 'हिंदी या अंग्रेजी में पूछें (जैसे: "मेरी गेहूं की फसल के लिए आज क्या करना चाहिए?")...',
    voiceListening: 'आपकी आवाज़ सुनी जा रही है...',
    voiceProcessing: 'कृषि एआई उत्तर तैयार कर रहा है...',
    voiceReady: 'उत्तर तैयार है',
    voiceStop: 'सुनना बंद करें',

    // Footer
    footerSlogan: 'स्वस्थ मिट्टी। स्वस्थ फसल। सुरक्षित भविष्य।',
    footerCopyright: '© 2026 कृषि इंटेलिजेंस। भारतीय कृषि के लिए डिजिटल पब्लिक गुड इंफ्रास्ट्रक्चर।',
  },
};

export const getTranslation = (lang: string, key: keyof typeof translations['en']): string => {
  const currentLang = (translations as any)[lang] || translations.en;
  return currentLang[key] || translations.en[key] || key;
};
