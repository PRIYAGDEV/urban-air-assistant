import React from 'react';
import { Wind, MapPin, Key, AlertTriangle, Code, ChevronDown, CheckCircle2 } from 'lucide-react';
import { AirQualityData, CityPreset } from '../types';
import { CITY_PRESETS } from '../services/airQualityService';

interface HeaderProps {
  airData: AirQualityData;
  selectedCity: CityPreset;
  onCityChange: (city: CityPreset) => void;
  onOpenApiKeyModal: () => void;
  hasApiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  airData,
  selectedCity,
  onCityChange,
  onOpenApiKeyModal,
  hasApiKey,
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
          {/* Quick Station Dropdown */}
          <div className="relative flex items-center bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-lg border border-[#DBEAFE] px-3 py-1.5 text-xs transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#1E40AF] mr-1.5 shrink-0" />
            <select
              value={selectedCity.name}
              onChange={(e) => {
                const found = CITY_PRESETS.find((c) => c.name === e.target.value);
                if (found) onCityChange(found);
              }}
              className="bg-transparent text-[#1E3A8A] font-semibold focus:outline-none cursor-pointer appearance-none pr-5 text-xs font-sans"
              aria-label="Select City Monitor"
            >
              {CITY_PRESETS.map((c) => (
                <option key={c.name} value={c.name} className="bg-white text-[#1E3A8A]">
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#475569] absolute right-2.5 pointer-events-none" />
          </div>

          {/* Thermal Inversion Status */}
          {airData.thermalInversionActive && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-mono font-semibold">
              <AlertTriangle className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
              <span>INVERSION (BLH &lt; 300m)</span>
            </div>
          )}

          {/* Gemini API Key */}
          <button
            type="button"
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              hasApiKey
                ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#93C5FD] font-semibold'
                : 'bg-white text-[#475569] border-[#DBEAFE] hover:bg-[#F8FAFC]'
            }`}
            title="Configure Google Gemini API Key"
          >
            {hasApiKey ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            ) : (
              <Key className="w-3.5 h-3.5 text-[#475569]" />
            )}
            <span>{hasApiKey ? 'Gemini Active' : 'API Key'}</span>
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/PRIYAGDEV/urban-air-assistant"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white text-[#475569] border border-[#DBEAFE] hover:bg-[#F8FAFC] hover:text-[#1E3A8A] transition-colors"
            title="View Public GitHub Repository"
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Repo</span>
          </a>
        </div>
      </div>
    </header>
  );
};
