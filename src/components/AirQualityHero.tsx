import React from 'react';
import { 
  CloudRain, 
  Wind, 
  Gauge, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Thermometer, 
  Layers
} from 'lucide-react';
import { AirQualityData, UserProfile } from '../types';
import { calculateOERI } from '../services/decisionEngine';

interface AirQualityHeroProps {
  airData: AirQualityData;
  profile: UserProfile;
}

export const AirQualityHero: React.FC<AirQualityHeroProps> = ({ airData, profile }) => {
  const oeri = calculateOERI(airData, profile);

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-900/60 rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-xl">
      {/* Top Banner: City & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            <span>Hyper-Local Telemetry</span>
            <span>•</span>
            <span className="text-emerald-400">Live Updated: {airData.timestamp}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {airData.city}, <span className="text-slate-400 font-medium">{airData.country}</span>
          </h1>
        </div>

        {/* Optimal Ventilation Window Banner */}
        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${
          airData.optimalVentilationWindow.currentSafe 
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
            : 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200'
        }`}>
          <Clock className={`w-5 h-5 shrink-0 ${airData.optimalVentilationWindow.currentSafe ? 'text-emerald-400 animate-spin' : 'text-indigo-400'}`} />
          <div className="text-xs">
            <div className="font-semibold flex items-center gap-1.5">
              <span>Smart Ventilation Window:</span>
              <span className="underline decoration-indigo-400/50 font-bold">
                {airData.optimalVentilationWindow.start} – {airData.optimalVentilationWindow.end}
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              {airData.optimalVentilationWindow.currentSafe 
                ? 'Safe to ventilate now! Solar thermal boundary expanded.' 
                : 'Keep road windows sealed until afternoon sunlight dispels inversion.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left Column: AQI & OERI Gauge */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-slate-950/70 rounded-xl border border-slate-800/80 p-5 relative overflow-hidden">
            {/* Background ambient glow */}
            <div 
              className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: airData.color }}
            />

            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                  US Air Quality Index
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span 
                    className="text-5xl sm:text-6xl font-black tracking-tight"
                    style={{ color: airData.color }}
                  >
                    {airData.aqi}
                  </span>
                  <span className="text-sm font-semibold text-slate-400">AQI</span>
                </div>
              </div>

              <div 
                className="px-3 py-1 rounded-full text-xs font-bold border"
                style={{ 
                  backgroundColor: `${airData.color}20`, 
                  borderColor: `${airData.color}50`,
                  color: airData.color 
                }}
              >
                {airData.category}
              </div>
            </div>

            {/* OERI Exposure Score */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300 font-medium">Personal Exposure Risk (OERI):</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold">
                <span className={oeri.level === 'Extreme' || oeri.level === 'Severe' ? 'text-red-400' : 'text-amber-400'}>
                  {oeri.score} / 10
                </span>
                <span className="text-slate-400 font-normal">({oeri.level})</span>
              </div>
            </div>
          </div>

          {/* Environmental Physics: Boundary Layer & Inversion */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-3">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Boundary Layer</span>
              </div>
              <div className="font-bold text-slate-100 text-sm">
                ~{airData.boundaryLayerHeight} meters
              </div>
              <span className="text-[10px] text-slate-400">
                {airData.thermalInversionActive ? 'Severe ground capping' : 'Normal dispersion'}
              </span>
            </div>

            <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-3">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Wind className="w-3.5 h-3.5 text-teal-400" />
                <span>Dispersion Wind</span>
              </div>
              <div className="font-bold text-slate-100 text-sm">
                {airData.windSpeed} km/h
              </div>
              <span className="text-[10px] text-slate-400">
                {airData.windSpeed < 8 ? 'Stagnant air pocket' : 'Active breeze'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Pollutants & Hourly Trend */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* 4-Pollutants Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-3">
              <div className="text-[11px] text-slate-400 font-medium">PM2.5 (Fine)</div>
              <div className="text-lg font-bold text-rose-400 mt-0.5">{airData.pm25} <span className="text-[10px] font-normal text-slate-400">µg/m³</span></div>
              <div className="text-[10px] text-slate-500 mt-1">WHO limit: 15 µg</div>
            </div>

            <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-3">
              <div className="text-[11px] text-slate-400 font-medium">PM10 (Coarse)</div>
              <div className="text-lg font-bold text-amber-300 mt-0.5">{airData.pm10} <span className="text-[10px] font-normal text-slate-400">µg/m³</span></div>
              <div className="text-[10px] text-slate-500 mt-1">WHO limit: 45 µg</div>
            </div>

            <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-3">
              <div className="text-[11px] text-slate-400 font-medium">NO₂ (Vehicle)</div>
              <div className="text-lg font-bold text-orange-400 mt-0.5">{airData.no2} <span className="text-[10px] font-normal text-slate-400">µg/m³</span></div>
              <div className="text-[10px] text-slate-500 mt-1">WHO limit: 25 µg</div>
            </div>

            <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-3">
              <div className="text-[11px] text-slate-400 font-medium">Ozone (O₃)</div>
              <div className="text-lg font-bold text-sky-400 mt-0.5">{airData.ozone} <span className="text-[10px] font-normal text-slate-400">µg/m³</span></div>
              <div className="text-[10px] text-slate-500 mt-1">WHO limit: 100 µg</div>
            </div>
          </div>

          {/* Diurnal Trend Timeline */}
          <div className="bg-slate-950/70 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-semibold text-slate-300">Today's Diurnal Smog & PM2.5 Curve</span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                Green badge = Safe Ventilation Window
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-6 gap-2">
              {airData.hourly.slice(0, 6).map((item, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center p-2 rounded-lg border text-center transition-all ${
                    item.isVentilationWindow 
                      ? 'bg-emerald-950/50 border-emerald-500/50 ring-1 ring-emerald-500/30' 
                      : 'bg-slate-900/60 border-slate-800/80'
                  }`}
                >
                  <span className="text-[11px] text-slate-400 font-medium">{item.hourLabel}</span>
                  <span className={`text-xs font-bold mt-1 ${item.isVentilationWindow ? 'text-emerald-300' : 'text-slate-200'}`}>
                    {item.pm25} <span className="text-[9px] font-normal text-slate-400">µg</span>
                  </span>
                  {item.isVentilationWindow ? (
                    <span className="mt-1 text-[9px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 px-1 py-0.5 rounded">
                      Open
                    </span>
                  ) : (
                    <span className="mt-1 text-[9px] text-slate-500 font-medium">
                      AQI {item.aqi}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
