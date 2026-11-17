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
        console.error('Failed to load air data:', err);
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E3A8A] flex flex-col font-sans selection:bg-[#3B82F6] selection:text-white">
      {/* Top Header Deck */}
      <Header
        airData={airData}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={Boolean(apiKey)}
      />

      {/* Main Container - Sections separated by 48px */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-12">
        {/* Section 1: Multi-City Station Selector (Above AQI Hero) */}
        <section aria-label="City Selector">
          <CitySelector
            selectedCity={selectedCity}
            onCitySelect={setSelectedCity}
            loading={loading}
            isDemoData={airData.isDemoData}
            errorMessage={airData.errorMessage}
          />
        </section>

        {/* Section 2: Environmental Telemetry Hero Banner & Real Diurnal Chart */}
        <section aria-label="AQI Environmental Telemetry">
          <AirQualityHero airData={airData} profile={profile} />
        </section>

        {/* Section 3: Household Context & Lifestyle Constraints */}
        <section aria-label="Personal Context">
          <UserProfileDrawer profile={profile} onChange={setProfile} />
        </section>

        {/* Section 4: Operational Action Tabs & Modules */}
        <section aria-label="Action Modules" className="space-y-6">
          {/* Segmented Control Tabs */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-1.5 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 min-h-[44px] ${
                activeTab === 'timeline'
                  ? 'bg-[#1E40AF] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#1E3A8A] hover:bg-[#F8FAFC]'
              }`}
            >
              <CalendarClock className="w-4 h-4" />
              <span>24-Hour Smog Action Protocol</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 min-h-[44px] ${
                activeTab === 'simulator'
                  ? 'bg-[#1E40AF] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#1E3A8A] hover:bg-[#F8FAFC]'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Health &amp; Counterfactual Impact</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('diy')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 min-h-[44px] ${
                activeTab === 'diy'
                  ? 'bg-[#1E40AF] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#1E3A8A] hover:bg-[#F8FAFC]'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>DIY Clean Air Lab</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 min-h-[44px] ${
                activeTab === 'chat'
                  ? 'bg-[#1E40AF] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#1E3A8A] hover:bg-[#F8FAFC]'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AuraGuard Oracle</span>
            </button>
          </div>

          {/* Tab Pane Display */}
          <div>
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
        </section>

        {/* Section 5: Public Health Medical Disclaimer */}
        <section aria-label="Medical Disclaimer">
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-4 flex items-start gap-3 text-xs text-[#1E3A8A]">
            <AlertCircle className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
            <p className="leading-relaxed font-sans">
              <strong className="font-bold">Public Health &amp; Environmental Exposure Disclaimer:</strong> AuraGuard AI synthesizes real-time atmospheric boundary telemetry, peer-reviewed aerosol physics, and WHO/EPA indoor guidelines. It is an exposure reduction tool and does not constitute medical diagnosis or clinical prescription. If experiencing acute bronchospasm, persistent chest tightness, or respiratory distress, contact local emergency services immediately.
            </p>
          </div>
        </section>
      </main>

      {/* Footer Deck */}
      <footer className="border-t border-[#DBEAFE] bg-white py-6 px-4 text-xs font-mono text-[#475569]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[#1E3A8A]">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span className="font-bold">Built for PromptWars Virtual 2026 • Challenge 6: Urban Air Quality Assistant</span>
          </div>
          <div className="text-[#64748B]">
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
