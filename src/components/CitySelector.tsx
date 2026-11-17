import React, { useState, useRef, useEffect } from 'react';
import { Search, Navigation, MapPin, X, AlertTriangle, Loader2, Check, Globe } from 'lucide-react';
import { CityPreset } from '../types';
import { CITY_PRESETS, findNearestCity } from '../services/airQualityService';

interface CitySelectorProps {
  selectedCity: CityPreset;
  onCitySelect: (city: CityPreset) => void;
  loading: boolean;
  isDemoData?: boolean;
  errorMessage?: string;
}

export const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  onCitySelect,
  loading,
  isDemoData,
  errorMessage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [geoLocating, setGeoLocating] = useState(false);
  const [geoMessage, setGeoMessage] = useState<string | null>(null);
  const [activeChipRegion, setActiveChipRegion] = useState<'india' | 'world'>('india');
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

  // Top Indian hubs for quick chips
  const indianQuickHubs = CITY_PRESETS.filter(c => c.country === 'India').slice(0, 16);
  // Top world hubs for quick chips
  const worldQuickHubs = CITY_PRESETS.filter(c => c.country !== 'India').slice(0, 12);

  const displayChips = activeChipRegion === 'india' ? indianQuickHubs : worldQuickHubs;

  return (
    <div className="bg-white rounded-xl border border-[#DBEAFE] p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header bar with Hindi label & active status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DBEAFE]">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#1E40AF]" />
          <h2 className="text-sm font-bold text-[#1E3A8A] uppercase font-sans">
            Global &amp; Indian Monitoring Stations ({CITY_PRESETS.length} Cities)
          </h2>
          <span className="text-xs font-semibold text-[#475569] bg-[#E9EEF6] px-2 py-0.5 rounded-lg border border-[#DBEAFE]">
            शहर बदलें
          </span>
        </div>
        <div className="text-xs font-mono text-[#475569]">
          Active: <strong className="text-[#1E40AF]">{selectedCity.name}, {selectedCity.country}</strong> ({selectedCity.lat.toFixed(2)}°, {selectedCity.lon.toFixed(2)}°)
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
              placeholder="Search 60+ Indian & Global cities (e.g. Delhi NCR, Mumbai, New York, Tokyo, London, Varanasi)..."
              className="w-full bg-[#F8FAFC] border border-[#DBEAFE] focus:border-[#3B82F6] rounded-lg pl-9 pr-8 py-2.5 text-xs sm:text-sm text-[#1E3A8A] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] font-sans transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className="absolute right-3 text-[#475569] hover:text-[#1E3A8A] p-0.5 rounded"
                aria-label="Clear city search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-[#DBEAFE] rounded-lg shadow-lg max-h-72 overflow-y-auto">
              {filteredCities.length > 0 ? (
                <div className="p-1">
                  {filteredCities.map((c) => {
                    const isSelected = c.name === selectedCity.name;
                    return (
                      <button
                        key={`${c.name}-${c.country}`}
                        type="button"
                        onClick={() => handleSelectCity(c)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-[#EFF6FF] text-[#1E40AF] font-bold border border-[#93C5FD]'
                            : 'text-[#1E3A8A] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                          <span className="font-semibold">{c.name}</span>
                          <span className="text-[11px] font-mono text-[#64748B]">
                            {c.country} ({c.lat.toFixed(2)}, {c.lon.toFixed(2)})
                          </span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#1E40AF]" />}
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
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-semibold bg-[#1E40AF] hover:bg-[#1D4ED8] text-white border border-[#1E40AF] transition-all shrink-0 min-h-[44px] disabled:opacity-60 shadow-xs"
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
        <div className="text-xs font-mono text-[#1E40AF] bg-[#EFF6FF] border border-[#BFDBFE] px-3.5 py-2 rounded-lg flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-[#1E40AF] shrink-0" />
          <span>{geoMessage}</span>
        </div>
      )}

      {/* Quick-Pick Chips Row with Region Toggle */}
      <div className="pt-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#475569]">
            Quick Hubs:
          </span>
          <div className="flex items-center gap-1 bg-[#F1F5F9] p-0.5 rounded-lg border border-[#DBEAFE]">
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

        {/* Chips with flex-wrap - Never clipped, never cut off */}
        <div className="flex flex-wrap items-center gap-2">
          {displayChips.map((city) => {
            const isSelected = city.name === selectedCity.name;
            return (
              <button
                key={`${city.name}-${city.country}`}
                type="button"
                onClick={() => handleSelectCity(city)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all border shrink-0 min-h-[38px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#1E40AF] text-white border-[#1E40AF] font-bold shadow-xs'
                    : 'bg-[#F8FAFC] text-[#1E3A8A] border-[#DBEAFE] hover:bg-[#EFF6FF] hover:border-[#93C5FD]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-sm shrink-0 ${
                    isSelected ? 'bg-white' : 'bg-[#94A3B8]'
                  }`}
                />
                <span>{city.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Loading State Banner */}
      {loading && (
        <div className="bg-[#EFF6FF] border border-[#93C5FD] rounded-lg px-4 py-3 flex items-center justify-between text-xs font-mono text-[#1E40AF]">
          <div className="flex items-center gap-2.5">
            <Loader2 className="w-4 h-4 animate-spin text-[#1E40AF]" />
            <span className="font-semibold">Fetching live air data for {selectedCity.name}, {selectedCity.country}…</span>
          </div>
          <span className="text-[11px] text-[#475569] hidden sm:inline">
            Connecting to Open-Meteo Air Quality Telemetry
          </span>
        </div>
      )}

      {/* API Error & DEMO Data Warning Banner */}
      {isDemoData && !loading && (
        <div className="bg-[#FEF3C7] border-l-4 border-[#D97706] rounded-r-lg p-3.5 flex items-start gap-3 text-xs text-[#92400E]">
          <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-bold text-sm text-[#78350F]">
              Live data unavailable for this city right now
            </div>
            <p className="text-xs text-[#92400E] mt-1 leading-relaxed">
              {errorMessage || 'Satellite telemetry service connection timed out.'} The dashboard is currently displaying{' '}
              <strong className="uppercase underline font-bold">calibrated historical DEMO data</strong>{' '}
              modeled from regional winter smog baselines. This is simulated data, not real-time sensor measurements.
            </p>
          </div>
          <span className="text-[10px] uppercase font-mono font-bold px-2 py-1 rounded bg-[#D97706] text-white shrink-0">
            DEMO DATA
          </span>
        </div>
      )}
    </div>
  );
};
