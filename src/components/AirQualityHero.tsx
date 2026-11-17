import React from 'react';
import { 
  Wind, 
  Layers, 
  Clock, 
  ShieldAlert, 
  Activity, 
  Compass,
  ArrowUpRight
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
    <section className="cinematic-panel rounded-2xl p-5 sm:p-7 border border-white/[0.08] transition-all">
      {/* Top Telemetry Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.07]">
        <div>
          <div className="flex items-center flex-wrap gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
            <span className={`inline-block w-2 h-2 rounded-full ${airData.isDemoData ? 'bg-amber-400' : 'bg-emerald-400'}`} />
            <span className={airData.isDemoData ? 'text-amber-300 font-semibold' : 'text-slate-300'}>
              {airData.isDemoData ? 'DEMO SIMULATION DATA' : 'Station Telemetry'}
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Observation Time: {airData.timestamp}</span>
            {airData.isDemoData && (
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                DEMO MODE • LIVE API UNAVAILABLE
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              {airData.city}
            </h1>
            <span className="text-sm font-mono text-slate-400 uppercase tracking-wide">
              {airData.country}
            </span>
          </div>
        </div>

        {/* Diurnal Smart Ventilation Pill */}
        <div className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl border transition-colors ${
          airData.optimalVentilationWindow.currentSafe 
            ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' 
            : 'bg-obs-850 border-white/[0.08] text-slate-200'
        }`}>
          <div className={`p-2 rounded-lg ${airData.optimalVentilationWindow.currentSafe ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/[0.05] text-slate-400'}`}>
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400 uppercase text-[10px] tracking-wider">Optimal Window</span>
              <span className="text-emerald-400 font-bold">
                {airData.optimalVentilationWindow.start} – {airData.optimalVentilationWindow.end}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {airData.optimalVentilationWindow.currentSafe 
                ? 'Solar heating has expanded the boundary layer. Safe for cross-ventilation.' 
                : 'Thermal inversion active. Keep windows sealed until peak afternoon sun.'}
            </p>
          </div>
        </div>
      </div>

      {/* Primary Instrumentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-6">
        {/* Left Column: AQI Core Metric & Exposure Index */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* AQI HUD Block */}
          <div className="bg-obs-950/80 rounded-xl border border-white/[0.07] p-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  US Air Quality Index
                </span>
                <div className="flex items-baseline gap-2.5 mt-1.5">
                  <span 
                    className="text-5xl sm:text-6xl font-black font-mono tracking-tighter"
                    style={{ color: airData.color }}
                  >
                    {airData.aqi}
                  </span>
                  <span className="text-xs font-mono uppercase text-slate-400">AQI Std</span>
                </div>
              </div>

              <div 
                className="px-2.5 py-1 rounded text-xs font-mono font-semibold uppercase tracking-wider border"
                style={{ 
                  backgroundColor: `${airData.color}15`, 
                  borderColor: `${airData.color}40`,
                  color: airData.color 
                }}
              >
                {airData.category}
              </div>
            </div>

            {/* OERI Exposure Score */}
            <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Personal Exposure Risk:</span>
              </div>
              <div className="flex items-center gap-2 font-bold">
                <span className={oeri.level === 'Extreme' || oeri.level === 'Severe' ? 'text-rose-400' : 'text-amber-400'}>
                  {oeri.score} / 10
                </span>
                <span className="text-slate-400 font-normal">({oeri.level})</span>
              </div>
            </div>
          </div>

          {/* Atmospheric Physics Sub-Panel */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-obs-950/60 rounded-xl border border-white/[0.06] p-3.5">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1 text-[11px]">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span className="uppercase tracking-wider">Boundary Layer</span>
              </div>
              <div className="text-base font-bold text-slate-100 num-metric">
                ~{airData.boundaryLayerHeight} m
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {airData.thermalInversionActive ? 'Ground trapping cap' : 'Normal convective lift'}
              </div>
            </div>

            <div className="bg-obs-950/60 rounded-xl border border-white/[0.06] p-3.5">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1 text-[11px]">
                <Wind className="w-3.5 h-3.5 text-emerald-400" />
                <span className="uppercase tracking-wider">Dispersion Wind</span>
              </div>
              <div className="text-base font-bold text-slate-100 num-metric">
                {airData.windSpeed} km/h
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {airData.windSpeed < 8 ? 'Stagnant boundary layer' : 'Ventilating breeze'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 4 Pollutants & Diurnal PM2.5 Curve */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* 4-Pollutants Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-obs-950/60 rounded-xl border border-white/[0.06] p-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">PM2.5 (Fine)</div>
              <div className="text-lg font-bold text-rose-400 mt-1 num-metric">
                {airData.pm25} <span className="text-[10px] font-normal text-slate-400">µg/m³</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-1">WHO: 15 µg</div>
            </div>

            <div className="bg-obs-950/60 rounded-xl border border-white/[0.06] p-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">PM10 (Coarse)</div>
              <div className="text-lg font-bold text-amber-300 mt-1 num-metric">
                {airData.pm10} <span className="text-[10px] font-normal text-slate-400">µg/m³</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-1">WHO: 45 µg</div>
            </div>

            <div className="bg-obs-950/60 rounded-xl border border-white/[0.06] p-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">NO₂ (Combustion)</div>
              <div className="text-lg font-bold text-orange-400 mt-1 num-metric">
                {airData.no2} <span className="text-[10px] font-normal text-slate-400">µg/m³</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-1">WHO: 25 µg</div>
            </div>

            <div className="bg-obs-950/60 rounded-xl border border-white/[0.06] p-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Ozone (O₃)</div>
              <div className="text-lg font-bold text-sky-400 mt-1 num-metric">
                {airData.ozone} <span className="text-[10px] font-normal text-slate-400">µg/m³</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-1">WHO: 100 µg</div>
            </div>
          </div>

          {/* Diurnal Trend Curve */}
          <div className="bg-obs-950/80 rounded-xl border border-white/[0.07] p-4">
            <div className="flex items-center justify-between text-xs font-mono mb-3">
              <span className="text-slate-300 uppercase tracking-wider text-[11px]">
                24-Hour Diurnal Dispersion &amp; Particulate Curve
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Ventilation Window
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {airData.hourly.slice(0, 6).map((item, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center p-2.5 rounded-lg border text-center transition-all ${
                    item.isVentilationWindow 
                      ? 'bg-emerald-950/30 border-emerald-500/40' 
                      : 'bg-obs-900 border-white/[0.05]'
                  }`}
                >
                  <span className="text-[10px] font-mono text-slate-400">{item.hourLabel}</span>
                  <span className={`text-xs font-bold font-mono mt-1 ${item.isVentilationWindow ? 'text-emerald-300' : 'text-slate-200'}`}>
                    {item.pm25} <span className="text-[9px] font-normal text-slate-400">µg</span>
                  </span>
                  {item.isVentilationWindow ? (
                    <span className="mt-1.5 text-[9px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                      Open
                    </span>
                  ) : (
                    <span className="mt-1.5 text-[9px] font-mono text-slate-500">
                      AQI {item.aqi}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
