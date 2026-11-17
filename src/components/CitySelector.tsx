import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Navigation, 
  MapPin, 
  X, 
  AlertTriangle, 
  Loader2, 
  Check, 
  Globe, 
  Camera, 
  LayoutGrid, 
  ListFilter,
  RefreshCw,
  RotateCw,
  Play,
  Pause
} from 'lucide-react';
import { CityPreset } from '../types';
import { CITY_PRESETS, findNearestCity, getCityVisual } from '../services/airQualityService';

interface CitySelectorProps {
  selectedCity: CityPreset;
  onCitySelect: (city: CityPreset) => void;
  loading: boolean;
  isDemoData?: boolean;
  errorMessage?: string;
  lastFetchError?: string;
  onRetry?: () => void;
  autoCycleCities?: boolean;
  cycleCountdown?: number;
  nextCityName?: string;
  onToggleAutoCycle?: () => void;
}

export const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  onCitySelect,
  loading,
  isDemoData,
  errorMessage,
  lastFetchError,
  onRetry,
  autoCycleCities = true,
  cycleCountdown = 5,
  nextCityName,
  onToggleAutoCycle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [geoLocating, setGeoLocating] = useState(false);
  const [geoMessage, setGeoMessage] = useState<string | null>(null);
  const [activeChipRegion, setActiveChipRegion] = useState<'india' | 'world'>('india');
  const [viewMode, setViewMode] = useState<'photos' | 'chips'>('photos');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = CITY_PRESETS.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    return c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q);
  });

  const handleSelectCity = (city: CityPreset) => {
    onCitySelect(city);
    setSearchQuery('');
    setIsDropdownOpen(false);
    setGeoMessage(null);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setGeoMessage('Geolocation is not supported by your browser.');
      return;
    }

    setGeoLocating(true);
    setGeoMessage(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const { city, distanceKm } = findNearestCity(latitude, longitude);
        setGeoLocating(false);
        setGeoMessage(`Matched nearest station: ${city.name}, ${city.country} (~${distanceKm} km away)`);
        onCitySelect(city);
        setTimeout(() => setGeoMessage(null), 5000);
      },
      (err) => {
        setGeoLocating(false);
        let msg = 'Unable to retrieve location.';
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'Location permission denied. Please search or pick a city below.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = 'GPS satellite position unavailable.';
        } else if (err.code === err.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        setGeoMessage(msg);
        setTimeout(() => setGeoMessage(null), 6000);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Top Indian hubs for quick selection
  const indianQuickHubs = CITY_PRESETS.filter(c => c.country === 'India').slice(0, 16);
  // Top world hubs for quick selection
  const worldQuickHubs = CITY_PRESETS.filter(c => c.country !== 'India').slice(0, 12);

  const displayCities = activeChipRegion === 'india' ? indianQuickHubs : worldQuickHubs;

  return (
    <div className="bg-white rounded-xl border border-[#DBEAFE] p-4 sm:p-5 shadow-xs space-y-4 animate-fade-up">
      {/* Header bar with Hindi label, active status & 5s Auto-Loop Tour Controller */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#DBEAFE]">
        <div className="flex items-center gap-2 flex-wrap">
          <MapPin className="w-4 h-4 text-[#1E40AF]" />
          <h2 className="text-sm font-bold text-[#1E3A8A] uppercase font-sans">
            Global &amp; Indian Monitoring Stations ({CITY_PRESETS.length} Cities)
          </h2>
          <span className="text-xs font-semibold text-[#475569] bg-[#E9EEF6] px-2 py-0.5 rounded-lg border border-[#DBEAFE]">
            शहर बदलें
          </span>
        </div>

        {/* Active station & 5s Auto-Tour indicator */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="text-xs font-mono text-[#475569]">
            Active: <strong className="text-[#1E40AF]">{selectedCity.name}, {selectedCity.country}</strong> ({selectedCity.lat.toFixed(2)}°, {selectedCity.lon.toFixed(2)}°)
          </div>

          {onToggleAutoCycle && (
            <div className="flex items-center gap-2 bg-[#F1F5F9] border border-[#DBEAFE] rounded-lg px-2.5 py-1">
              <button
                type="button"
                onClick={onToggleAutoCycle}
                className={`flex items-center gap-1.5 text-xs font-mono font-bold px-2 py-0.5 rounded transition-all cursor-pointer ${
                  autoCycleCities
                    ? 'bg-[#1E40AF] text-white shadow-2xs hover:bg-[#1D4ED8]'
                    : 'bg-white text-[#475569] border border-[#CBD5E1] hover:text-[#1E3A8A]'
                }`}
                title="Toggle 5-second automatic city cycling loop"
              >
                {autoCycleCities ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Pause Tour</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Resume 5s Tour</span>
                  </>
                )}
              </button>

              {autoCycleCities && (
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#1E40AF]">
                  <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>Next: <strong>{nextCityName || 'Next'}</strong> ({cycleCountdown}s)</span>
                  <div className="w-12 h-1.5 bg-[#DBEAFE] rounded-full overflow-hidden hidden sm:block">
                    <div
                      className="h-full bg-[#3B82F6] transition-all duration-1000 ease-linear rounded-full"
                      style={{ width: `${Math.max(0, Math.min(100, ((5 - (cycleCountdown ?? 5)) / 5) * 100))}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search Input & Use My Location */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Autocomplete Search Input */}
        <div ref={dropdownRef} className="relative flex-1">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#475569] absolute left-3.5 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search 59 Indian & Global cities (e.g. Delhi NCR, Mumbai, New York, Tokyo, London, Varanasi)..."
              className="w-full bg-[#F8FAFC] border border-[#DBEAFE] focus:border-[#3B82F6] rounded-lg pl-9 pr-8 py-2.5 text-xs sm:text-sm text-[#1E3A8A] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] font-sans transition-all duration-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className="absolute right-3 text-[#475569] hover:text-[#1E3A8A] p-0.5 rounded transition-colors"
                aria-label="Clear city search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown with City Photo Previews */}
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-[#DBEAFE] rounded-lg shadow-xl max-h-80 overflow-y-auto animate-fade-up">
              {filteredCities.length > 0 ? (
                <div className="p-1 space-y-0.5">
                  {filteredCities.map((c) => {
                    const isSelected = c.name === selectedCity.name;
                    const visual = getCityVisual(c.name);
                    return (
                      <button
                        key={`${c.name}-${c.country}`}
                        type="button"
                        onClick={() => handleSelectCity(c)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm flex items-center justify-between gap-3 transition-all duration-150 ${
                          isSelected
                            ? 'bg-[#EFF6FF] text-[#1E40AF] font-bold border border-[#93C5FD]'
                            : 'text-[#1E3A8A] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Real city photo thumbnail */}
                          <div className="w-8 h-8 rounded-md overflow-hidden shrink-0 border border-[#DBEAFE] bg-slate-100 relative">
                            <img 
                              src={visual.imagePath} 
                              alt={c.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="truncate">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-[#1E3A8A]">{c.name}</span>
                              <span className="text-[11px] font-mono text-[#64748B]">({c.country})</span>
                            </div>
                            <div className="text-[10px] font-mono text-[#64748B] truncate">
                              {visual.landmark} • {c.lat.toFixed(2)}°, {c.lon.toFixed(2)}°
                            </div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#1E40AF] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-[#475569] font-mono">
                  No monitored station matches "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Use My Location Button */}
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={geoLocating}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-semibold bg-[#1E40AF] hover:bg-[#1D4ED8] text-white border border-[#1E40AF] transition-all duration-200 shrink-0 min-h-[44px] disabled:opacity-60 shadow-xs hover:shadow hover:-translate-y-0.5 active:translate-y-0"
        >
          {geoLocating ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Navigation className="w-4 h-4 text-white" />
          )}
          <span>{geoLocating ? 'Detecting GPS...' : 'Use My Location'}</span>
        </button>
      </div>

      {/* Geolocation feedback */}
      {geoMessage && (
        <div className="text-xs font-mono text-[#1E40AF] bg-[#EFF6FF] border border-[#BFDBFE] px-3.5 py-2 rounded-lg flex items-center gap-2 animate-fade-up">
          <Navigation className="w-3.5 h-3.5 text-[#1E40AF] shrink-0" />
          <span>{geoMessage}</span>
        </div>
      )}

      {/* Quick Selection Controls: Region Switcher & Visual View Toggle */}
      <div className="pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#475569]">
              Quick Hubs:
            </span>
            {/* View Mode Toggle: Photo Cards vs Chips */}
            <div className="flex items-center gap-1 bg-[#F1F5F9] p-0.5 rounded-lg border border-[#DBEAFE]">
              <button
                type="button"
                onClick={() => setViewMode('photos')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all flex items-center gap-1 ${
                  viewMode === 'photos'
                    ? 'bg-white text-[#1E40AF] shadow-xs border border-[#DBEAFE]'
                    : 'text-[#64748B] hover:text-[#1E3A8A]'
                }`}
                title="View with Living Motion City Photos"
              >
                <Camera className="w-3 h-3 text-[#3B82F6]" />
                <span>Motion Photos (मोशन तस्वीरें)</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('chips')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all flex items-center gap-1 ${
                  viewMode === 'chips'
                    ? 'bg-white text-[#1E40AF] shadow-xs border border-[#DBEAFE]'
                    : 'text-[#64748B] hover:text-[#1E3A8A]'
                }`}
                title="View as compact chips"
              >
                <ListFilter className="w-3 h-3" />
                <span>Chips</span>
              </button>
            </div>
          </div>

          {/* Region Toggle: Indian Cities vs World Metros */}
          <div className="flex items-center gap-1 bg-[#F1F5F9] p-0.5 rounded-lg border border-[#DBEAFE] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveChipRegion('india')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                activeChipRegion === 'india'
                  ? 'bg-[#1E40AF] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#1E3A8A]'
              }`}
            >
              Indian Cities
            </button>
            <button
              type="button"
              onClick={() => setActiveChipRegion('world')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                activeChipRegion === 'world'
                  ? 'bg-[#1E40AF] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#1E3A8A]'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>World Metros</span>
            </button>
          </div>
        </div>

        {/* 1. Visual City Photo Cards Mode (Living Motion Photos of Cities) */}
        {viewMode === 'photos' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 animate-fade-up">
            {displayCities.map((city) => {
              const isSelected = city.name === selectedCity.name;
              const visual = getCityVisual(city.name);
              return (
                <button
                  key={`photo-card-${city.name}-${city.country}`}
                  type="button"
                  onClick={() => handleSelectCity(city)}
                  className={`group relative h-28 sm:h-32 rounded-xl overflow-hidden border text-left transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md ${
                    isSelected
                      ? 'border-[#1E40AF] ring-2 ring-[#3B82F6] shadow-sm'
                      : 'border-[#DBEAFE] hover:border-[#93C5FD]'
                  }`}
                >
                  {/* Living Motion Photo with Multi-Axis Pan & Zoom Drift */}
                  <img
                    src={visual.imagePath}
                    alt={city.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115 ${
                      isSelected ? 'animate-motion-photo' : 'group-hover:animate-motion-photo'
                    }`}
                    loading="lazy"
                  />
                  {/* Atmospheric Smog Drift Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-haze pointer-events-none" />
                  
                  {/* Dark Contrast Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />

                  {/* Motion Tag Badge */}
                  <span className="absolute top-1.5 left-1.5 text-[8px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-white/90 border border-white/20 flex items-center gap-1 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    MOTION
                  </span>

                  {/* Active Indicator Badge */}
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 bg-[#1E40AF] text-white rounded-md p-1 shadow-xs z-10">
                      <Check className="w-3 h-3" />
                    </div>
                  )}

                  {/* City Name & Landmark Info */}
                  <div className="absolute inset-x-0 bottom-0 p-2 z-10">
                    <div className="text-white font-bold text-xs font-sans drop-shadow-xs flex items-center justify-between">
                      <span className="truncate">{city.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-300 font-mono leading-tight line-clamp-2 mt-0.5">
                      {visual.landmark.split('&')[0].trim()}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 2. Compact Chips Mode with Micro-Photo Avatars (Never clipped, flex-wrap) */}
        {viewMode === 'chips' && (
          <div className="flex flex-wrap items-center gap-2 animate-fade-up">
            {displayCities.map((city) => {
              const isSelected = city.name === selectedCity.name;
              const visual = getCityVisual(city.name);
              return (
                <button
                  key={`chip-${city.name}-${city.country}`}
                  type="button"
                  onClick={() => handleSelectCity(city)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 border shrink-0 min-h-[38px] flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 ${
                    isSelected
                      ? 'bg-[#1E40AF] text-white border-[#1E40AF] font-bold shadow-xs'
                      : 'bg-[#F8FAFC] text-[#1E3A8A] border-[#DBEAFE] hover:bg-[#EFF6FF] hover:border-[#93C5FD]'
                  }`}
                >
                  <img
                    src={visual.imagePath}
                    alt=""
                    className="w-4 h-4 rounded-full object-cover border border-white/50 shrink-0"
                    loading="lazy"
                  />
                  <span>{city.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Live Loading State Banner with Pulse Motion */}
      {loading && (
        <div className="bg-[#EFF6FF] border border-[#93C5FD] rounded-lg px-4 py-3 flex items-center justify-between text-xs font-mono text-[#1E40AF] animate-fade-up">
          <div className="flex items-center gap-2.5">
            <Loader2 className="w-4 h-4 animate-spin text-[#1E40AF]" />
            <span className="font-semibold">Fetching live air data for {selectedCity.name}, {selectedCity.country}…</span>
          </div>
          <span className="text-[11px] text-[#475569] hidden sm:inline">
            Connecting to Open-Meteo Air Quality Telemetry
          </span>
        </div>
      )}

      {/* API Error & DEMO Data Warning Banner with Real Error Display and Retry Button */}
      {isDemoData && !loading && (
        <div className="bg-[#FEF3C7] border-l-4 border-[#D97706] rounded-r-lg p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#92400E] animate-fade-up">
          <div className="flex items-start gap-3 flex-1">
            <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-bold text-sm text-[#78350F] flex items-center gap-2">
                <span>Live data unavailable for this city right now</span>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-[#D97706] text-white">
                  DEMO DATA
                </span>
              </div>
              <p className="text-xs text-[#92400E] mt-1 leading-relaxed">
                {errorMessage || 'Satellite telemetry service connection timed out.'} The dashboard is currently displaying{' '}
                <strong className="uppercase underline font-bold">calibrated historical DEMO data</strong>{' '}
                modeled from regional winter smog baselines. This is simulated data, not real-time sensor measurements.
              </p>
              {(lastFetchError || errorMessage) && (
                <div className="text-[11px] font-mono text-[#B45309] font-bold mt-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                  <span>Last fetch error: {lastFetchError || errorMessage}</span>
                </div>
              )}
            </div>
          </div>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="px-3 py-1.5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white font-mono text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry live data</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
