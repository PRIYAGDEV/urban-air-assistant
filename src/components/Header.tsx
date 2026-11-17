import React from 'react';
import { Wind, MapPin, Key, Sparkles, AlertTriangle, Code } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30">
              <Wind className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-200 to-white">
                  AuraGuard AI
                </span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  GenAI 2.0
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Urban Air Quality & Winter Smog Assistant
              </p>
            </div>
          </div>

          {/* Mobile status indicator */}
          <div className="sm:hidden flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-700 bg-slate-800">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: airData.color }}
            />
            <span>AQI {airData.aqi}</span>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center flex-wrap sm:flex-nowrap gap-2.5 w-full sm:w-auto justify-end">
          {/* City Selector */}
          <div className="relative flex items-center bg-slate-800/90 rounded-lg border border-slate-700/80 px-2.5 py-1.5 text-xs shadow-inner">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0" />
            <select
              value={selectedCity.name}
              onChange={(e) => {
                const found = CITY_PRESETS.find((c) => c.name === e.target.value);
                if (found) onCityChange(found);
              }}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer pr-1"
            >
              {CITY_PRESETS.map((c) => (
                <option key={c.name} value={c.name} className="bg-slate-900 text-slate-200">
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
          </div>

          {/* Thermal Inversion Alert Pill */}
          {airData.thermalInversionActive && (
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Winter Inversion Active</span>
            </div>
          )}

          {/* Gemini API Key Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              hasApiKey
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30 hover:bg-emerald-900/50'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750 hover:text-white'
            }`}
            title="Configure Gemini API Key"
          >
            {hasApiKey ? <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> : <Key className="w-3.5 h-3.5 text-slate-400" />}
            <span>{hasApiKey ? 'Gemini Live' : 'API Key'}</span>
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/PRIYAGDEV/urban-air-assistant"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
            title="View Public GitHub Repository"
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
