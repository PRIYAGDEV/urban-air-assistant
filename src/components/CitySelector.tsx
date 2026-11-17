import React, { useState, useRef, useEffect } from 'react';
import { Search, Navigation, MapPin, X, AlertTriangle, Loader2, Check } from 'lucide-react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered cities based on query
  const filteredCities = CITY_PRESETS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

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
        setGeoMessage(`Matched nearest station: ${city.name} (~${distanceKm} km)`);
        onCitySelect(city);

        setTimeout(() => setGeoMessage(null), 4000);
      },
      (err) => {
        setGeoLocating(false);
        let msg = 'Unable to retrieve location.';
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'Location permission denied. Please search or pick a city below.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = 'Location position unavailable.';
        } else if (err.code === err.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        setGeoMessage(msg);
        setTimeout(() => setGeoMessage(null), 5000);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="cinematic-panel rounded-2xl p-3.5 sm:p-5 border border-white/[0.08] space-y-3 transition-all">
      {/* Top Bar: Search Input & "Use my location" button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Autocomplete Search Input */}
        <div ref={dropdownRef} className="relative flex-1">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search Indian metropolitan hubs (e.g. Delhi, Mumbai, Bengaluru)..."
              className="w-full bg-obs-950 border border-white/[0.08] focus:border-emerald-500/50 rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 font-sans transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className="absolute right-3 text-slate-400 hover:text-white p-0.5 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Results Dropdown */}
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-obs-900 border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto backdrop-blur-md">
              {filteredCities.length > 0 ? (
                <div className="p-1">
                  {filteredCities.map((c) => {
                    const isSelected = c.name === selectedCity.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => handleSelectCity(c)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-obs-800 text-emerald-300 font-semibold border border-emerald-500/30'
                            : 'text-slate-200 hover:bg-obs-850 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{c.name}</span>
                          <span className="text-[10px] font-mono text-slate-500">
                            ({c.lat.toFixed(2)}, {c.lon.toFixed(2)})
                          </span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400 font-mono">
                  No registered stations match "{searchQuery}"
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
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono bg-obs-950 hover:bg-obs-900 border border-white/[0.08] hover:border-emerald-500/40 text-slate-200 hover:text-white transition-all shrink-0 disabled:opacity-50"
          title="Detect current coordinates and match nearest metropolitan monitor"
        >
          {geoLocating ? (
            <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
          ) : (
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
          )}
          <span>{geoLocating ? 'Detecting GPS...' : 'Use My Location'}</span>
        </button>
      </div>

      {/* Geolocation Feedback Message */}
      {geoMessage && (
        <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/30 border border-emerald-500/25 px-3 py-1.5 rounded-lg flex items-center gap-2 animate-fadeIn">
          <Navigation className="w-3 h-3 shrink-0" />
          <span>{geoMessage}</span>
        </div>
      )}

      {/* Quick-Pick City Chips (Scrollable row, works at 390px mobile) */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-0.5 pb-1">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 shrink-0 mr-1 hidden sm:inline">
          Quick Hubs:
        </span>
        {CITY_PRESETS.map((city) => {
          const isSelected = city.name === selectedCity.name;
          return (
            <button
              key={city.name}
              type="button"
              onClick={() => handleSelectCity(city)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-obs-800 text-emerald-300 border border-emerald-500/40 font-semibold shadow-sm'
                  : 'bg-obs-950 text-slate-400 border border-white/[0.06] hover:text-slate-200 hover:bg-obs-900'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSelected ? 'bg-emerald-400' : 'bg-slate-600'
                }`}
              />
              <span>{city.name}</span>
            </button>
          );
        })}
      </div>

      {/* Live Loading State Banner */}
      {loading && (
        <div className="bg-obs-950/90 border border-emerald-500/30 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs font-mono text-emerald-300 animate-pulse">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
            <span>Fetching live air data for {selectedCity.name}…</span>
          </div>
          <span className="text-[10px] text-slate-400 hidden sm:inline">
            Querying Open-Meteo Air Quality API ({selectedCity.lat}, {selectedCity.lon})
          </span>
        </div>
      )}

      {/* API Error & DEMO Data Warning Banner */}
      {isDemoData && !loading && (
        <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl px-4 py-2.5 flex items-start gap-2.5 text-xs text-amber-200 font-mono">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-bold text-amber-300">
              Live data unavailable for this city right now
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5 font-sans">
              {errorMessage || 'Satellite/ground station connection timed out.'} Falling back to{' '}
              <strong className="text-amber-300 uppercase underline">calibrated DEMO data</strong>{' '}
              modeled from historical winter smog baselines. This is simulated data, not real-time sensor telemetry.
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
            DEMO MODE
          </span>
        </div>
      )}
    </div>
  );
};
