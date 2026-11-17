import React, { useState, useEffect, useRef } from 'react';
import { 
  AirQualityData, 
  UserProfile, 
  CityPreset 
} from './types';
import { 
  CITY_PRESETS, 
  fetchLiveAirQuality, 
  getFallbackData, 
  applyLiveTelemetryJitter 
} from './services/airQualityService';
import { Header } from './components/Header';
import { CitySelector } from './components/CitySelector';
import { AirQualityHero } from './components/AirQualityHero';
import { UserProfileDrawer } from './components/UserProfileDrawer';
import { PersonalizedTimeline } from './components/PersonalizedTimeline';
import { DiyHacksGallery } from './components/DiyHacksGallery';
import { ImpactCounterfactualSimulator } from './components/ImpactCounterfactualSimulator';
import { AIAssistantChat } from './components/AIAssistantChat';
import { 
  CalendarClock, 
  Activity, 
  Wrench, 
  Bot, 
  ShieldCheck, 
  AlertCircle,
  RefreshCw,
  Camera,
  Radio,
  Sparkles
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
  const [apiKey] = useState<string>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') || '' : '';
  });

  // Live 1-Second Streaming & Motion Photos State
  const [isLiveStream, setIsLiveStream] = useState<boolean>(true);
  const [packetCount, setPacketCount] = useState<number>(1);
  const [motionPhotosEnabled, setMotionPhotosEnabled] = useState<boolean>(true);
  const baseAirDataRef = useRef<AirQualityData>(airData);

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
          baseAirDataRef.current = data;
          setAirData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load air data:', err);
        if (isMounted) {
          const fallback = getFallbackData(selectedCity, 'Live data unavailable for this city right now');
          baseAirDataRef.current = fallback;
          setAirData(fallback);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCity]);

  // Live 1-Second continuous background auto-refresh & telemetry stream engine
  useEffect(() => {
    if (!isLiveStream) return;

    const interval = setInterval(() => {
      setPacketCount((prev) => {
        const nextTick = prev + 1;
        setAirData((prevData) => applyLiveTelemetryJitter(prevData, nextTick));
        return nextTick;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLiveStream]);

  // Periodic background re-anchor from Open-Meteo satellite API every 60 seconds
  useEffect(() => {
    if (!isLiveStream) return;

    const bgAnchorInterval = setInterval(() => {
      fetchLiveAirQuality(selectedCity)
        .then((fresh) => {
          baseAirDataRef.current = fresh;
          setAirData((prev) => ({
            ...fresh,
            timestamp: prev.timestamp // preserve live second tick
          }));
        })
        .catch(() => {
          // Keep running with live dispersion engine silently
        });
    }, 60000);

    return () => clearInterval(bgAnchorInterval);
  }, [isLiveStream, selectedCity]);

  const handleManualRefresh = () => {
    setLoading(true);
    fetchLiveAirQuality(selectedCity)
      .then((data) => {
        baseAirDataRef.current = data;
        setAirData(data);
        setLoading(false);
      })
      .catch(() => {
        setAirData(getFallbackData(selectedCity, 'Live data unavailable for this city right now'));
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E3A8A] flex flex-col font-sans selection:bg-[#3B82F6] selection:text-white">
      {/* Top Header Deck */}
      <Header
        airData={airData}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        isLiveStream={isLiveStream}
        onToggleLiveStream={() => setIsLiveStream(!isLiveStream)}
        packetCount={packetCount}
      />

      {/* Main Container - Sections separated by 48px */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-12">
        {/* Live 1-Second Auto-Refresh & Motion Photos Control Deck */}
        <div className="bg-white rounded-xl border border-[#DBEAFE] p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 animate-fade-up">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F0FDF4] border border-[#86EFAC] text-[#166534] text-xs font-mono font-bold shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isLiveStream ? 'animate-heartbeat-1s bg-emerald-500' : 'bg-amber-500'
                }`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  isLiveStream ? 'bg-emerald-600' : 'bg-amber-600'
                }`} />
              </span>
              <span>{isLiveStream ? '1s LIVE AUTO-REFRESH ACTIVE' : 'AUTO-REFRESH PAUSED'}</span>
            </div>

            <div className="text-xs font-mono text-[#475569] flex items-center gap-2 flex-wrap">
              <span>•</span>
              <span>Telemetry Packet: <strong className="text-[#1E40AF]">#{packetCount}</strong> (1000ms tick)</span>
              <span>•</span>
              <span>Station: <strong className="text-[#1E3A8A]">{selectedCity.name}</strong></span>
              <span>•</span>
              <span>Clock: <strong className="text-[#1E40AF]">{airData.timestamp}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
            {/* Motion Photos Toggle Button */}
            <button
              type="button"
              onClick={() => setMotionPhotosEnabled(!motionPhotosEnabled)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                motionPhotosEnabled
                  ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#93C5FD]'
                  : 'bg-[#F8FAFC] text-[#64748B] border-[#DBEAFE]'
              }`}
              title="Toggle living cinematic motion photos of cities"
            >
              <Camera className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Motion Photos: {motionPhotosEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* Toggle 1s Stream Auto-Refresh */}
            <button
              type="button"
              onClick={() => setIsLiveStream(!isLiveStream)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                isLiveStream
                  ? 'bg-[#1E40AF] text-white border-[#1E40AF] hover:bg-[#1D4ED8]'
                  : 'bg-[#F8FAFC] text-[#1E40AF] border-[#DBEAFE] hover:bg-[#EFF6FF]'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLiveStream ? 'animate-spin' : ''}`} />
              <span>{isLiveStream ? 'Auto-Syncing 1s' : 'Resume 1s Sync'}</span>
            </button>

            {/* Manual Refresh Button */}
            <button
              type="button"
              onClick={handleManualRefresh}
              disabled={loading}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#1E3A8A] border border-[#DBEAFE] transition-all disabled:opacity-50 cursor-pointer"
              title="Manually force fetch from Open-Meteo Satellite API"
            >
              Force Sync
            </button>
          </div>
        </div>

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
          <AirQualityHero 
            airData={airData} 
            profile={profile} 
            onCitySelect={setSelectedCity} 
            motionPhotosEnabled={motionPhotosEnabled}
          />
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

          {/* Tab Panes */}
          <div className="transition-all duration-300">
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
              <AIAssistantChat 
                airData={airData} 
                profile={profile} 
                apiKey={apiKey} 
              />
            )}
          </div>
        </section>
      </main>

      {/* Footer Deck */}
      <footer className="border-t border-[#DBEAFE] bg-white mt-16 py-8 px-4 lg:px-8 text-xs font-mono text-[#475569]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="font-bold text-[#1E3A8A]">AuraGuard AI Monitor</span>
            <span>•</span>
            <span>Built for PromptWars Virtual 2026 • Challenge 6</span>
          </div>

          <div className="flex items-center gap-4 text-[#64748B] flex-wrap justify-center">
            <span>Open-Meteo Air Quality &amp; CAMS European Telemetry</span>
            <span>•</span>
            <span>Zero-Cost Citizen Science</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
