import React, { useState, useEffect } from 'react';
import { 
  AirQualityData, 
  UserProfile, 
  CityPreset 
} from './types';
import { CITY_PRESETS, fetchLiveAirQuality, getFallbackData } from './services/airQualityService';
import { Header } from './components/Header';
import { CitySelector } from './components/CitySelector';
import { AirQualityHero } from './components/AirQualityHero';
import { UserProfileDrawer } from './components/UserProfileDrawer';
import { PersonalizedTimeline } from './components/PersonalizedTimeline';
import { DiyHacksGallery } from './components/DiyHacksGallery';
import { ImpactCounterfactualSimulator } from './components/ImpactCounterfactualSimulator';
import { AIAssistantChat } from './components/AIAssistantChat';
import { ApiKeyModal } from './components/ApiKeyModal';
import { 
  CalendarClock, 
  Activity, 
  Wrench, 
  Bot, 
  ShieldCheck, 
  AlertCircle
} from 'lucide-react';

export const App: React.FC = () => {
  // Initialize default city from localStorage or fallback to Delhi NCR
  const [selectedCity, setSelectedCity] = useState<CityPreset>(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('auraguard_selected_city');
      if (savedName) {
        const found = CITY_PRESETS.find((c) => c.name === savedName);
        if (found) return found;
      }
    }
    return CITY_PRESETS[0]; // Default: Delhi NCR
  });

  const [airData, setAirData] = useState<AirQualityData>(() => getFallbackData(selectedCity));
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'timeline' | 'simulator' | 'diy' | 'chat'>('timeline');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') || '' : '';
  });

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Priyag & Family',
    householdType: 'family_with_infants',
    vulnerability: 'asthma',
    housingType: 'standard_apartment_drafty',
    socioeconomicTier: 'tier2_low_cost',
    commuteMode: 'two_wheeler_motorcycle',
    cookingFuel: 'lpg_piped',
    hasPurifier: false
  });

  // Load fresh air quality data whenever selected city changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    // Persist selected city in localStorage so it stays selected on reload
    if (typeof window !== 'undefined') {
      localStorage.setItem('auraguard_selected_city', selectedCity.name);
    }

    fetchLiveAirQuality(selectedCity)
      .then((data) => {
        if (isMounted) {
          setAirData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load live air data for', selectedCity.name, err);
        if (isMounted) {
          setAirData(getFallbackData(selectedCity, 'Live data unavailable for this city right now'));
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCity]);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    if (typeof window !== 'undefined') {
      if (key) localStorage.setItem('gemini_api_key', key);
      else localStorage.removeItem('gemini_api_key');
    }
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header Deck */}
      <Header
        airData={airData}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={Boolean(apiKey)}
      />

      {/* Main Observatory Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Multi-City Station Selector (Directly Above AQI Hero) */}
        <CitySelector
          selectedCity={selectedCity}
          onCitySelect={setSelectedCity}
          loading={loading}
          isDemoData={airData.isDemoData}
          errorMessage={airData.errorMessage}
        />

        {/* Environmental Telemetry Horizon */}
        <AirQualityHero airData={airData} profile={profile} />

        {/* User Profile & Lifestyle Constraints Matrix */}
        <UserProfileDrawer profile={profile} onChange={setProfile} />

        {/* Cockpit Segmented Navigation Controls */}
        <div className="cinematic-panel rounded-xl p-1.5 border border-white/[0.08] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'timeline'
                ? 'bg-obs-800 text-white border border-white/[0.1] font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-obs-900/60'
            }`}
          >
            <CalendarClock className="w-4 h-4 text-emerald-400" />
            <span>24-Hour Smog Action Protocol</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'simulator'
                ? 'bg-obs-800 text-white border border-white/[0.1] font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-obs-900/60'
            }`}
          >
            <Activity className="w-4 h-4 text-teal-400" />
            <span>Health &amp; Counterfactual Impact</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('diy')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'diy'
                ? 'bg-obs-800 text-white border border-white/[0.1] font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-obs-900/60'
            }`}
          >
            <Wrench className="w-4 h-4 text-amber-400" />
            <span>DIY Clean Air Lab</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'chat'
                ? 'bg-obs-800 text-white border border-white/[0.1] font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-obs-900/60'
            }`}
          >
            <Bot className="w-4 h-4 text-sky-400" />
            <span>AuraGuard Oracle</span>
          </button>
        </div>

        {/* Tab Module Display Deck */}
        <div className="transition-all">
          {activeTab === 'timeline' && (
            <PersonalizedTimeline airData={airData} profile={profile} />
          )}

          {activeTab === 'simulator' && (
            <ImpactCounterfactualSimulator airData={airData} profile={profile} />
          )}

          {activeTab === 'diy' && (
            <DiyHacksGallery profile={profile} />
          )}

          {activeTab === 'chat' && (
            <AIAssistantChat airData={airData} profile={profile} apiKey={apiKey} />
          )}
        </div>

        {/* Public Health Scientific Disclaimer */}
        <div className="cinematic-panel rounded-xl p-4 flex items-start gap-3 text-xs text-slate-400 border border-white/[0.06]">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-sans">
            <strong className="text-slate-200 font-medium">Environmental Exposure &amp; Health Disclaimer:</strong> AuraGuard AI synthesizes real-time atmospheric boundary telemetry, peer-reviewed aerosol physics, and WHO/EPA indoor guidelines. It is an exposure reduction tool and does not constitute medical diagnosis or clinical prescription. If experiencing acute bronchospasm, cyanosis, or respiratory distress, contact local emergency services immediately.
          </p>
        </div>
      </main>

      {/* Footer Deck */}
      <footer className="border-t border-white/[0.08] bg-[#06090e] py-6 px-4 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AuraGuard AI • PromptWars Challenge 6: Urban Air Quality Assistant</span>
          </div>
          <div className="text-slate-500 text-[11px]">
            Engineered with Google Gemini GenAI &amp; Open-Meteo Global Atmospheric APIs
          </div>
        </div>
      </footer>

      {/* Credentials Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        currentKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />
    </div>
  );
};

export default App;
