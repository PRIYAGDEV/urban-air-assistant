import React, { useState, useEffect } from 'react';
import { 
  AirQualityData, 
  UserProfile, 
  CityPreset 
} from './types';
import { CITY_PRESETS, fetchLiveAirQuality, getFallbackData } from './services/airQualityService';
import { Header } from './components/Header';
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
  HeartHandshake,
  AlertCircle
} from 'lucide-react';

export const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityPreset>(CITY_PRESETS[0]);
  const [airData, setAirData] = useState<AirQualityData>(getFallbackData(CITY_PRESETS[0]));
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

  // Load air quality data on city change
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchLiveAirQuality(selectedCity)
      .then((data) => {
        if (isMounted) {
          setAirData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load air data:', err);
        if (isMounted) setLoading(false);
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header
        airData={airData}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={Boolean(apiKey)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Environmental Telemetry Hero */}
        <AirQualityHero airData={airData} profile={profile} />

        {/* User Profile & Lifestyle Constraints */}
        <UserProfileDrawer profile={profile} onChange={setProfile} />

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'timeline'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <CalendarClock className="w-4 h-4" />
            <span>24-Hour Smog Action Plan</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'simulator'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Science & Impact Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('diy')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'diy'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>DIY Hacks & Alternatives</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'chat'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Ask AuraGuard AI</span>
          </button>
        </div>

        {/* Tab Content Panes */}
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

        {/* Bottom Safety & Environmental Medical Disclaimer */}
        <div className="bg-slate-900/40 border border-slate-850 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-400">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-300">Public Health & Environmental Exposure Disclaimer:</strong> AuraGuard AI provides environmental exposure mitigation strategies based on real-time atmospheric modeling, WHO/EPA guidelines, and peer-reviewed physical interventions. It does not provide medical diagnoses or replace physician consultations. If you or a family member experience acute breathing difficulty, persistent chest tightness, or respiratory distress, seek immediate medical attention.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-850 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Built for PromptWars Virtual 2026 • Challenge 6: Urban Air Quality Assistant</span>
          </div>
          <div className="text-slate-400">
            Designed with Google Gemini GenAI & Real-Time OpenAQ/Open-Meteo Telemetry
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
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
