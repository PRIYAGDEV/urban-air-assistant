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
import { logger } from './utils/logger';
import { 
  CalendarClock, 
  Activity, 
  Wrench, 
  Bot, 
  RefreshCw,
  Camera,
  RotateCw,
  Play,
  Pause
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

  const [hasLoadedOnce, setHasLoadedOnce] = useState<boolean>(false);
  const hasLoadedOnceRef = useRef<boolean>(false);
  const [airData, setAirData] = useState<AirQualityData>(() => {
    const fb = getFallbackData(selectedCity, 'Initial connection pending / live sensor offline');
    return {
      ...fb,
      isDemoData: true,
      isLive: false,
      isLoading: false
    };
  });
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

  // Auto-Tour 5-Second Cities Loop State (Enabled by default as requested)
  const [autoCycleCities, setAutoCycleCities] = useState<boolean>(true);
  const [cycleCountdown, setCycleCountdown] = useState<number>(5);
  const cityCacheRef = useRef<Record<string, AirQualityData>>({});

  // Compute next city in the continuous loop
  const nextCityIndex = (CITY_PRESETS.findIndex((c) => c.name === selectedCity.name) + 1) % CITY_PRESETS.length;
  const nextCity = CITY_PRESETS[nextCityIndex];

  const handleCitySelect = (city: CityPreset) => {
    setSelectedCity(city);
    setCycleCountdown(5); // Reset 5-second timer when user selects a city
  };

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

  // 5-Second Automatic City Rotation Loop Engine
  useEffect(() => {
    if (!autoCycleCities) return;

    const cycleTimer = setInterval(() => {
      setCycleCountdown((prev) => {
        if (prev <= 1) {
          // Time to rotate to next city in loop!
          setSelectedCity((curr) => {
            const currIdx = CITY_PRESETS.findIndex((c) => c.name === curr.name);
            const nextIdx = (currIdx + 1) % CITY_PRESETS.length;
            return CITY_PRESETS[nextIdx];
          });
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(cycleTimer);
  }, [autoCycleCities]);

  // Load fresh air quality data whenever selected city changes
  useEffect(() => {
    let isMounted = true;

    if (typeof window !== 'undefined') {
      localStorage.setItem('auraguard_selected_city', selectedCity.name);
    }

    // Instant optimistic render from cache if available, or fallback if past initial load
    if (cityCacheRef.current[selectedCity.name]) {
      const cached = cityCacheRef.current[selectedCity.name];
      baseAirDataRef.current = cached;
      setAirData(cached);
      setLoading(false);
    } else if (hasLoadedOnceRef.current) {
      const initial = getFallbackData(selectedCity);
      baseAirDataRef.current = initial;
      setAirData(initial);
      setLoading(true);
    } else {
      setLoading(true);
    }

    fetchLiveAirQuality(selectedCity)
      .then((data) => {
        if (isMounted) {
          cityCacheRef.current[selectedCity.name] = data;
          baseAirDataRef.current = data;
          setAirData(data);
          hasLoadedOnceRef.current = true;
          setHasLoadedOnce(true);
        }
      })
      .catch((err) => {
        logger.error('Failed to load air data:', err);
        if (isMounted) {
          const fallback = getFallbackData(selectedCity, 'Live data unavailable for this city right now');
          baseAirDataRef.current = fallback;
          setAirData(fallback);
          hasLoadedOnceRef.current = true;
          setHasLoadedOnce(true);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCity]);

  // Live 1-Second continuous background ticker & simulated telemetry engine
  useEffect(() => {
    if (!isLiveStream) return;

    const interval = setInterval(() => {
      setPacketCount((prev) => {
        const nextTick = prev + 1;
        setAirData((prevData) => {
          if (!prevData) return prevData;
          // When data is LIVE, do NOT jitter values: show exact received telemetry!
          if (prevData.isLive && !prevData.isDemoData) {
            return {
              ...prevData,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            };
          }
          // Only run simulated jitter on demo data
          if (prevData.isDemoData) {
            return applyLiveTelemetryJitter(prevData, nextTick);
          }
          return prevData;
        });
        return nextTick;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLiveStream]);

  // Periodic background re-anchor from Open-Meteo satellite API every 60 seconds
  useEffect(() => {
    if (!isLiveStream || airData.isDemoData) return;

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
  }, [isLiveStream, selectedCity, airData.isDemoData]);

  const handleManualRefresh = () => {
    setLoading(true);
    fetchLiveAirQuality(selectedCity)
      .then((data) => {
        baseAirDataRef.current = data;
        setAirData(data);
        setLoading(false);
      })
      .catch((_err) => {
        const fallback = getFallbackData(selectedCity, 'Live data unavailable for this city right now');
        baseAirDataRef.current = fallback;
        setAirData(fallback);
        setLoading(false);
      });
  };

  const isRealLive = !airData.isDemoData && !!airData.isLive;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E3A8A] flex flex-col font-sans selection:bg-[#3B82F6] selection:text-white">
      {/* Accessible Skip-to-Content Link for Keyboard & Screen Reader Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1E40AF] focus:text-white focus:rounded-lg focus:shadow-md focus:font-mono focus:text-xs focus:font-bold focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Top Header Deck */}
      <Header
        airData={airData}
        selectedCity={selectedCity}
        onCityChange={handleCitySelect}
        isLiveStream={isLiveStream}
        onToggleLiveStream={() => setIsLiveStream(!isLiveStream)}
        packetCount={packetCount}
        onRetry={handleManualRefresh}
        autoCycleCities={autoCycleCities}
        cycleCountdown={cycleCountdown}
        onToggleAutoCycle={() => {
          setAutoCycleCities(!autoCycleCities);
          if (!autoCycleCities) setCycleCountdown(5);
        }}
      />

      {/* Main Container - Sections separated by 48px */}
      <main id="main-content" tabIndex={-1} className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-12 focus:outline-none">
        {/* Live 1-Second Auto-Refresh & Motion Photos Control Deck */}
        <div className="bg-white rounded-xl border border-[#DBEAFE] p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 animate-fade-up">
          <div className="flex items-center gap-2.5 flex-wrap">
            {!isRealLive ? (
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-mono font-bold shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                  <span>DEMO DATA — auto-refresh paused</span>
                </div>
                {airData.lastFetchError && (
                  <span className="text-[11px] font-mono text-[#92400E] font-medium hidden sm:inline">
                    • Last fetch error: {airData.lastFetchError}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F0FDF4] border border-[#86EFAC] text-[#166534] text-xs font-mono font-bold shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isLiveStream ? 'animate-heartbeat-1s bg-emerald-500' : 'bg-amber-500'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${
                    isLiveStream ? 'bg-emerald-600' : 'bg-amber-600'
                  }`} />
                </span>
                <span>{isLiveStream ? `1s LIVE AUTO-REFRESH ACTIVE • ${airData.source || 'LIVE'}` : 'AUTO-REFRESH PAUSED'}</span>
              </div>
            )}

            {/* 5s Auto-Tour Indicator Badge */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono font-bold shadow-2xs transition-all ${
              autoCycleCities
                ? 'bg-[#EFF6FF] border-[#93C5FD] text-[#1E40AF]'
                : 'bg-[#F8FAFC] border-[#DBEAFE] text-[#64748B]'
            }`}>
              <RotateCw className={`w-3.5 h-3.5 ${autoCycleCities ? 'animate-spin' : ''}`} style={{ animationDuration: '5s' }} />
              <span>
                {autoCycleCities
                  ? `5s AUTO-TOUR: NEXT -> ${nextCity.name.toUpperCase()} (${cycleCountdown}s)`
                  : '5s AUTO-TOUR: PAUSED'}
              </span>
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
            {/* Auto-Cycle Cities (5s Loop) Toggle Button */}
            <button
              type="button"
              onClick={() => {
                setAutoCycleCities(!autoCycleCities);
                if (!autoCycleCities) setCycleCountdown(5);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                autoCycleCities
                  ? 'bg-[#1E40AF] text-white border-[#1E40AF] hover:bg-[#1D4ED8]'
                  : 'bg-[#F8FAFC] text-[#1E40AF] border-[#DBEAFE] hover:bg-[#EFF6FF]'
              }`}
              title="Toggle automatic 5-second continuous city rotation loop"
            >
              {autoCycleCities ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{autoCycleCities ? `5s Loop: ON (${cycleCountdown}s)` : 'Resume 5s Tour'}</span>
            </button>

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

            {/* Toggle 1s Stream Auto-Refresh or Retry Live Data if Demo */}
            {!isRealLive ? (
              <button
                type="button"
                onClick={handleManualRefresh}
                disabled={loading}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border flex items-center gap-1.5 shadow-2xs bg-[#D97706] text-white border-[#D97706] hover:bg-[#B45309] cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Retry live data</span>
              </button>
            ) : (
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
            )}

            {/* Force Sync Button */}
            {isRealLive && (
              <button
                type="button"
                onClick={handleManualRefresh}
                disabled={loading}
                className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#1E3A8A] border border-[#DBEAFE] transition-all disabled:opacity-50 cursor-pointer"
                title="Manually force fetch from Open-Meteo Satellite API"
              >
                Force Sync
              </button>
            )}
          </div>
        </div>

        {/* Section 1: Multi-City Station Selector (Above AQI Hero) */}
        <section aria-label="City Selector">
          <CitySelector
            selectedCity={selectedCity}
            onCitySelect={handleCitySelect}
            loading={loading}
            isDemoData={!isRealLive}
            errorMessage={airData.errorMessage}
            lastFetchError={airData.lastFetchError}
            onRetry={handleManualRefresh}
            autoCycleCities={autoCycleCities}
            cycleCountdown={cycleCountdown}
            nextCityName={nextCity.name}
            onToggleAutoCycle={() => {
              setAutoCycleCities(!autoCycleCities);
              if (!autoCycleCities) setCycleCountdown(5);
            }}
          />
        </section>

        {/* Section 2: Environmental Telemetry Hero Banner & Real Diurnal Chart */}
        <section aria-label="AQI Environmental Telemetry">
          <AirQualityHero 
            airData={airData} 
            profile={profile} 
            onCitySelect={setSelectedCity} 
            motionPhotosEnabled={motionPhotosEnabled}
            onRetry={handleManualRefresh}
            loading={loading && !hasLoadedOnce}
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
            <span>Air quality data: WeatherAPI.com (CAMS)</span>
            <span>•</span>
            <span>Open-Meteo Satellite Fallback</span>
            <span>•</span>
            <span>Zero-Cost Citizen Science</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
