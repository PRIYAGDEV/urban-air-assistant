import React from 'react';
import { Wind, MapPin, Key, AlertTriangle, ChevronDown, CheckCircle2, Code } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-[#06090e]/90 backdrop-blur-md border-b border-white/[0.08] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand & System Identity */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-obs-850 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-white font-sans">
                  AuraGuard <span className="text-emerald-400 font-mono font-medium">AI</span>
                </span>
                <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-300 border border-white/[0.08] uppercase">
                  Station v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                Atmospheric Intelligence &amp; Smog Mitigation Deck
              </p>
            </div>
          </div>

          {/* Mobile Status Tag */}
          <div className="sm:hidden flex items-center gap-1.5 text-xs font-mono px-2 py-0.5 rounded border border-white/[0.1] bg-obs-850">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: airData.color }}
            />
            <span className="text-slate-200">AQI {airData.aqi}</span>
          </div>
        </div>

        {/* Console Controls */}
        <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto justify-end">
          {/* Station / City Selector */}
          <div className="relative flex items-center bg-obs-850 hover:bg-obs-800 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-xs transition-colors">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
            <select
              value={selectedCity.name}
              onChange={(e) => {
                const found = CITY_PRESETS.find((c) => c.name === e.target.value);
                if (found) onCityChange(found);
              }}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer appearance-none pr-5 text-xs font-sans"
            >
              {CITY_PRESETS.map((c) => (
                <option key={c.name} value={c.name} className="bg-obs-900 text-slate-200">
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
          </div>

          {/* Thermal Inversion Alert Capsule */}
          {airData.thermalInversionActive && (
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>INVERSION ACTIVE (BLH &lt; 300m)</span>
            </div>
          )}

          {/* Gemini API Key Status */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              hasApiKey
                ? 'bg-emerald-950/30 text-emerald-300 border-emerald-500/30 hover:bg-emerald-950/50'
                : 'bg-obs-850 text-slate-300 border-white/[0.08] hover:bg-obs-800 hover:text-white'
            }`}
            title="Configure Gemini API Key"
          >
            {hasApiKey ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Key className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span>{hasApiKey ? 'Gemini Live' : 'API Key'}</span>
          </button>

          {/* GitHub Source Link */}
          <a
            href="https://github.com/PRIYAGDEV/urban-air-assistant"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-obs-850 text-slate-300 border border-white/[0.08] hover:bg-obs-800 hover:text-white transition-colors"
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
