import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { GuidedDemoModal } from './components/GuidedDemoModal';
import { NotificationDrawer } from './components/NotificationDrawer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AgroadvisoryPage } from './pages/AgroadvisoryPage';
import { CropDoctorPage } from './pages/CropDoctorPage';
import { SatellitePage } from './pages/SatellitePage';
import { SoilHealthPage } from './pages/SoilHealthPage';
import { WeatherPage } from './pages/WeatherPage';
import { RegenerativePage } from './pages/RegenerativePage';
import { IndiaNetworkPage } from './pages/IndiaNetworkPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { AboutPage } from './pages/AboutPage';

// Services & Types
import { getWeatherData } from './services/weatherService';
import { getSoilData } from './services/soilService';
import { getSatelliteData } from './services/satelliteService';
import { FarmerProfile, AdvisoryData } from './types';
import { LanguageCode } from './i18n/translations';

export const App: React.FC = () => {
  // Navigation
  const [activeTab, setActiveTab] = useState('dashboard');

  // Geographic & Crop State
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState('Prayagraj');
  const [selectedVillage, setSelectedVillage] = useState('Soraon Panchayat');
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [activeLanguage, setActiveLanguage] = useState<LanguageCode>('en');

  // Farmer Profile
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>({
    name: 'Ram Charan Verma',
    phone: '+91 98390 12345',
    state: 'Uttar Pradesh',
    district: 'Prayagraj',
    village: 'Soraon Panchayat',
    crop: 'Wheat',
    variety: 'HD-2967 (Pusa Gautami)',
    soilType: 'Gangetic Alluvial Loam',
    sowingDate: '15 November 2026',
    cropStage: 'Tillering (40-45 DAS)',
    irrigation: 'Borewell',
    farmSize: '3.5',
    farmingGoal: 'Minimize climate risks and optimize fertilizer application',
  });

  // Active Advisory
  const [activeAdvisory, setActiveAdvisory] = useState<AdvisoryData | null>(null);

  // Modals
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Live telemetry computed reactively based on state and district
  const weather = useMemo(() => getWeatherData(selectedState, selectedDistrict), [selectedState, selectedDistrict]);
  const soil = useMemo(() => getSoilData(selectedState, selectedDistrict, farmerProfile.soilType), [selectedState, selectedDistrict, farmerProfile.soilType]);
  const satellite = useMemo(() => getSatelliteData(selectedState), [selectedState]);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setFarmerProfile((prev) => ({ ...prev, state }));
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setFarmerProfile((prev) => ({ ...prev, district }));
  };

  const handleVillageChange = (village: string) => {
    setSelectedVillage(village);
    setFarmerProfile((prev) => ({ ...prev, village }));
  };

  const handleUpdateProfile = (newProfile: FarmerProfile) => {
    setFarmerProfile(newProfile);
    setSelectedState(newProfile.state);
    setSelectedDistrict(newProfile.district);
    setSelectedCrop(newProfile.crop);
    if (newProfile.village) setSelectedVillage(newProfile.village);
  };

  const handleDemoComplete = (advisory: AdvisoryData) => {
    setActiveAdvisory(advisory);
    setActiveTab('agroadvisory');
  };

  return (
    <div className="min-h-screen bg-[#06130D] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar strictly matching theme.png */}
      <Navbar
        selectedState={selectedState}
        selectedDistrict={selectedDistrict}
        selectedVillage={selectedVillage}
        onStateChange={handleStateChange}
        onDistrictChange={handleDistrictChange}
        onVillageChange={handleVillageChange}
        isLive={false}
        activeLanguage={activeLanguage}
        onLanguageChange={(l) => setActiveLanguage(l)}
        onOpenVoice={() => setIsVoiceModalOpen(true)}
        onOpenDemo={() => setIsDemoModalOpen(true)}
        onOpenNotifications={() => setIsNotificationOpen(true)}
      />

      {/* Main Layout: Left Sidebar + Center Scrollable Content */}
      <div className="flex-1 flex max-w-[1680px] w-full mx-auto">
        {/* Left Sidebar (Desktop / Tablet) */}
        <div className="hidden md:block">
          <Sidebar
            activeTab={activeTab}
            onSelectTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            activeLanguage={activeLanguage}
          />
        </div>

        {/* Center Main View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl overflow-y-auto mb-14 md:mb-0">
          {activeTab === 'dashboard' && (
            <LandingPage
              selectedState={selectedState}
              selectedDistrict={selectedDistrict}
              selectedCrop={selectedCrop}
              onSelectTab={setActiveTab}
              onSelectState={handleStateChange}
              onOpenVoice={() => setIsVoiceModalOpen(true)}
              weather={weather}
              soil={soil}
              satellite={satellite}
              activeAdvisory={activeAdvisory}
              activeLanguage={activeLanguage}
            />
          )}

          {activeTab === 'agroadvisory' && (
            <AgroadvisoryPage
              currentProfile={farmerProfile}
              onUpdateProfile={handleUpdateProfile}
              activeAdvisory={activeAdvisory}
              onSaveAdvisory={(adv) => setActiveAdvisory(adv)}
              onOpenVoice={() => setIsVoiceModalOpen(true)}
              activeLanguage={activeLanguage}
            />
          )}

          {activeTab === 'crop-doctor' && (
            <CropDoctorPage
              selectedCrop={selectedCrop}
              activeLanguage={activeLanguage}
            />
          )}

          {activeTab === 'satellite' && (
            <SatellitePage
              selectedState={selectedState}
              onSelectState={handleStateChange}
              satelliteData={satellite}
            />
          )}

          {activeTab === 'soil-health' && (
            <SoilHealthPage
              selectedState={selectedState}
              selectedDistrict={selectedDistrict}
              soilData={soil}
              onSelectTab={setActiveTab}
            />
          )}

          {activeTab === 'weather' && (
            <WeatherPage
              selectedState={selectedState}
              selectedDistrict={selectedDistrict}
              selectedCrop={selectedCrop}
              weather={weather}
              activeLanguage={activeLanguage}
            />
          )}

          {activeTab === 'regenerative' && (
            <RegenerativePage
              selectedCrop={selectedCrop}
              selectedState={selectedState}
              activeLanguage={activeLanguage}
            />
          )}

          {activeTab === 'india-network' && (
            <IndiaNetworkPage
              selectedState={selectedState}
              onSelectState={handleStateChange}
              onSelectTab={setActiveTab}
            />
          )}

          {activeTab === 'architecture' && <ArchitecturePage />}

          {activeTab === 'about' && <AboutPage onSelectTab={setActiveTab} />}


        </main>
      </div>

      {/* Bottom Navigation for Mobile Devices */}
      <MobileNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenMore={() => setIsMobileDrawerOpen(true)}
      />

      {/* Mobile Drawer Menu for "More" */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden flex justify-end">
          <div className="w-64 bg-[#06140D] border-l border-emerald-500/30 p-5 h-full flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                <span className="font-bold text-white text-sm">Navigation Menu</span>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard' },
                  { id: 'agroadvisory', label: 'AI Agroadvisory' },
                  { id: 'crop-doctor', label: 'Crop Doctor' },
                  { id: 'satellite', label: 'Satellite Intelligence' },
                  { id: 'soil-health', label: 'Soil Health' },
                  { id: 'weather', label: 'Weather & Climate' },
                  { id: 'regenerative', label: 'Regenerative Farming' },
                  { id: 'india-network', label: 'India Agriculture Network' },
                  { id: 'architecture', label: 'Digital Public Good' },
                  { id: 'data-sources', label: 'Data Sources' },
                  { id: 'about', label: 'About & Impact' },
                  { id: 'judging', label: 'Judging View' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileDrawerOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                      activeTab === item.id
                        ? 'bg-emerald-500 text-black font-bold'
                        : 'text-slate-300 hover:bg-emerald-500/15'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-500/20">
              <button
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  setIsDemoModalOpen(true);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-lime-500 text-black font-extrabold text-xs rounded-xl text-center"
              >
                Launch 7-Step Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        farmerProfile={farmerProfile}
        activeLanguage={activeLanguage}
      />

      {/* 7-Step End-to-End Guided Demo Modal */}
      <GuidedDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onCompleteDemo={handleDemoComplete}
        onOpenVoice={() => setIsVoiceModalOpen(true)}
      />

      {/* Agricultural Alerts Drawer */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        state={selectedState}
        district={selectedDistrict}
      />
    </div>
  );
};
