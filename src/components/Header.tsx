import React from 'react';
import { Wind, MapPin, AlertTriangle, ChevronDown, Radio } from 'lucide-react';
import { AirQualityData, CityPreset } from '../types';
import { CITY_PRESETS } from '../services/airQualityService';

interface HeaderProps {
  airData: AirQualityData;
  selectedCity: CityPreset;
  onCityChange: (city: CityPreset) => void;
  isLiveStream?: boolean;
  onToggleLiveStream?: () => void;
  packetCount?: number;
  onRetry?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  airData,
  selectedCity,
  onCityChange,
  isLiveStream = true,
  onToggleLiveStream,
  packetCount = 1,
  onRetry,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#DBEAFE] px-4 lg:px-8 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E9EEF6] border border-[#DBEAFE] flex items-center justify-center text-[#1E40AF]">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-lg text-[#1E3A8A] tracking-tight">
                  AuraGuard AI
                </span>
                <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-lg bg-[#E9EEF6] text-[#1E40AF] border border-[#DBEAFE] uppercase font-bold">
                  Console 2.5
                </span>
              </div>
              <p className="text-xs text-[#475569] font-sans hidden sm:block">
                Urban Air Quality &amp; Winter Smog Intelligence Console
              </p>
            </div>
          </div>

          {/* Mobile Status Tag */}
          <div className="sm:hidden flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg border border-[#DBEAFE] bg-[#F8FAFC]">
            <span
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: airData.color }}
            />
            <span className="font-bold text-[#1E3A8A]">AQI {airData.aqi}</span>
          </div>
        </div>

        {/* Right Station Controls */}
        <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto justify-end">
          {/* Status Indicator Button */}
          {airData.isDemoData ? (
            <button
              type="button"
              onClick={onRetry}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all shadow-xs cursor-pointer bg-[#FEF3C7] hover:bg-[#FDE68A] border-[#FDE68A] text-[#92400E]"
              title="Demo data active — click to retry live Open-Meteo telemetry"
            >
              <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              <span className="hidden md:inline">DEMO DATA — auto-refresh paused</span>
              <span className="md:hidden">DEMO PAUSED</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onToggleLiveStream}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all shadow-xs cursor-pointer ${
                isLiveStream
                  ? 'bg-[#F0FDF4] hover:bg-[#DCFCE7] border-[#86EFAC] text-[#166534]'
                  : 'bg-[#FFFBEB] hover:bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]'
              }`}
              title="Click to toggle 1s background telemetry auto-refresh"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isLiveStream ? 'animate-heartbeat-1s bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isLiveStream ? 'bg-emerald-600' : 'bg-amber-600'
                  }`}
                />
              </span>
              <span className="hidden md:inline">
                {isLiveStream ? `1s LIVE AUTO-REFRESH (#${packetCount})` : 'AUTO-REFRESH PAUSED'}
              </span>
              <span className="md:hidden">
                {isLiveStream ? `1s (#${packetCount})` : 'PAUSED'}
              </span>
            </button>
          )}

          {/* Quick Station Dropdown */}
          <div className="relative flex items-center bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-lg border border-[#DBEAFE] px-3 py-1.5 text-xs transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#1E40AF] mr-1.5 shrink-0" />
            <select
              value={selectedCity.name}
              onChange={(e) => {
                const found = CITY_PRESETS.find((c) => c.name === e.target.value);
                if (found) onCityChange(found);
              }}
              className="bg-transparent text-[#1E3A8A] font-semibold focus:outline-none cursor-pointer appearance-none pr-5 text-xs font-sans max-w-[180px] truncate"
              aria-label="Select City Monitor"
            >
              <optgroup label="Top Indian Metros">
                {CITY_PRESETS.filter(c => c.country === 'India').slice(0, 15).map((c) => (
                  <option key={c.name} value={c.name} className="bg-white text-[#1E3A8A]">
                    {c.name}, India
                  </option>
                ))}
              </optgroup>
              <optgroup label="Other Indian Cities">
                {CITY_PRESETS.filter(c => c.country === 'India').slice(15).map((c) => (
                  <option key={c.name} value={c.name} className="bg-white text-[#1E3A8A]">
                    {c.name}, India
                  </option>
                ))}
              </optgroup>
              <optgroup label="World Metros">
                {CITY_PRESETS.filter(c => c.country !== 'India').map((c) => (
                  <option key={c.name} value={c.name} className="bg-white text-[#1E3A8A]">
                    {c.name}, {c.country}
                  </option>
                ))}
              </optgroup>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#475569] absolute right-2.5 pointer-events-none" />
          </div>

          {/* Thermal Inversion Status */}
          {airData.thermalInversionActive && (
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-mono font-semibold">
              <AlertTriangle className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
              <span>INVERSION</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
