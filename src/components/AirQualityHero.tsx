import React, { useState } from 'react';
import { 
  Wind, 
  Layers, 
  Clock, 
  ShieldAlert, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { AirQualityData, UserProfile } from '../types';
import { calculateOERI } from '../services/decisionEngine';

interface AirQualityHeroProps {
  airData: AirQualityData;
  profile: UserProfile;
}

export const AirQualityHero: React.FC<AirQualityHeroProps> = ({ airData, profile }) => {
  const oeri = calculateOERI(airData, profile);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Pollutant WHO limits
  const pollutants = [
    {
      name: 'PM2.5',
      fullName: 'Fine Particulate',
      val: airData.pm25,
      whoLimit: 15,
      unit: 'µg/m³',
      ratio: Math.round((airData.pm25 / 15) * 10) / 10,
    },
    {
      name: 'PM10',
      fullName: 'Coarse Dust',
      val: airData.pm10,
      whoLimit: 45,
      unit: 'µg/m³',
      ratio: Math.round((airData.pm10 / 45) * 10) / 10,
    },
    {
      name: 'NO₂',
      fullName: 'Nitrogen Dioxide',
      val: airData.no2,
      whoLimit: 25,
      unit: 'µg/m³',
      ratio: Math.round((airData.no2 / 25) * 10) / 10,
    },
    {
      name: 'Ozone',
      fullName: 'Ground Ozone (O₃)',
      val: airData.ozone,
      whoLimit: 100,
      unit: 'µg/m³',
      ratio: Math.round((airData.ozone / 100) * 10) / 10,
    },
  ];

  // 6 diurnal points for real SVG chart
  const hourlyPoints = airData.hourly.slice(0, 6);
  const maxPm25 = Math.max(...hourlyPoints.map(p => p.pm25), 350);

  // SVG Chart Dimensions
  const chartWidth = 640;
  const chartHeight = 220;
  const paddingX = 45;
  const paddingY = 30;
  const usableWidth = chartWidth - paddingX * 2;
  const usableHeight = chartHeight - paddingY * 2;

  // Calculate coordinates for SVG line
  const pointsCoords = hourlyPoints.map((p, idx) => {
    const x = paddingX + (idx / (hourlyPoints.length - 1)) * usableWidth;
    const y = paddingY + usableHeight - (p.pm25 / maxPm25) * usableHeight;
    return { x, y, data: p, idx };
  });

  const lineD = pointsCoords.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaD = pointsCoords.length > 0
    ? `${lineD} L ${pointsCoords[pointsCoords.length - 1].x} ${chartHeight - paddingY} L ${pointsCoords[0].x} ${chartHeight - paddingY} Z`
    : '';

  // Ventilation window index (typically index 3 = 2 PM)
  const ventPoint = pointsCoords.find(pt => pt.data.isVentilationWindow) || pointsCoords[3];

  return (
    <div className="space-y-6">
      {/* 1. Full-Width Real Photo Banner Hero with Overlay */}
      <div className="relative rounded-xl overflow-hidden border border-[#DBEAFE] shadow-sm min-h-[360px] sm:min-h-[400px] flex flex-col justify-between">
        {/* Smog Photo Background with Darker Readable Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/delhi-smog.jpg')` }}
        />
        <div className="absolute inset-0 bg-slate-900/75 backdrop-contrast-125" />

        {/* Content on top of banner */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-1 text-white">
          {/* Top Bar: Brand & Station Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/20 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]" />
                <span className="font-bold">AuraGuard AI Monitor</span>
                <span>•</span>
                <span className="text-amber-300 font-sans font-bold">आज की हवा</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                {airData.city}, <span className="font-normal text-slate-300">{airData.country}</span>
              </h1>
            </div>

            {/* Inversion Badge & Timestamp */}
            <div className="flex flex-wrap items-center gap-2">
              {airData.isDemoData ? (
                <span className="px-2.5 py-1 rounded-lg bg-[#DC2626] text-white text-xs font-mono font-bold uppercase tracking-wider">
                  DEMO DATA • SENSOR OFFLINE
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-lg bg-[#16A34A] text-white text-xs font-mono font-bold uppercase tracking-wider">
                  LIVE TELEMETRY
                </span>
              )}
              <span className="px-2.5 py-1 rounded-lg bg-black/40 text-slate-300 border border-white/20 text-xs font-mono">
                {airData.timestamp}
              </span>
            </div>
          </div>

          {/* Main Huge AQI Core Readout + Dial */}
          <div className="py-6 sm:py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-300">
                US Air Quality Index (AQI)
              </div>
              
              <div className="flex items-baseline gap-4 mt-2">
                <span 
                  className="font-serif font-black text-7xl sm:text-8xl lg:text-[115px] leading-none tracking-tight"
                  style={{ color: airData.color }}
                >
                  {airData.aqi}
                </span>
                <div>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-white block">
                    AQI
                  </span>
                  <span 
                    className="inline-block mt-1 px-3 py-1 rounded-lg text-xs font-mono font-extrabold uppercase tracking-wider text-white"
                    style={{ backgroundColor: airData.color }}
                  >
                    {airData.category}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-xl font-sans leading-relaxed">
                {airData.category === 'Hazardous' || airData.category === 'Severe'
                  ? 'Severe winter atmospheric particulate entrapment. Ultrafine combustion soot is trapped at respiratory level. Outdoor exposure causes acute respiratory constriction.'
                  : 'Atmospheric particulate levels exceed safe WHO thresholds. Vulnerable residents must follow the timed indoor protocol.'}
              </p>
            </div>

            {/* SVG AQI Dial Gauge */}
            <div className="bg-black/50 border border-white/20 rounded-xl p-5 flex flex-col items-center justify-center shrink-0 w-full sm:w-auto">
              <div className="relative w-44 h-24 flex items-center justify-center">
                <svg viewBox="0 0 100 55" className="w-40 h-24">
                  {/* Gauge Background Arch */}
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  {/* Gauge Colored Value Arch */}
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke={airData.color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="126"
                    strokeDashoffset={Math.max(0, 126 - (Math.min(airData.aqi, 500) / 500) * 126)}
                  />
                </svg>
                <div className="absolute bottom-1 text-center font-mono">
                  <span className="text-xs uppercase text-slate-300 block font-bold">Severity Level</span>
                  <span className="text-sm font-extrabold" style={{ color: airData.color }}>
                    {airData.category}
                  </span>
                </div>
              </div>

              {/* Personal OERI Score */}
              <div className="mt-2 pt-2 border-t border-white/10 w-full text-center text-xs font-mono text-slate-300">
                Personal Risk (OERI): <strong className="text-amber-400 font-bold">{oeri.score}/10 ({oeri.level})</strong>
              </div>
            </div>
          </div>

          {/* Photo Credit line */}
          <div className="text-[11px] font-mono text-slate-400 border-t border-white/10 pt-2 flex items-center justify-between">
            <span>Photo: Delhi winter smog by Ashish Kushwaha / Unsplash</span>
            <span>Boundary Layer: ~{airData.boundaryLayerHeight}m • Wind: {airData.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      {/* 2. Pollutants as a Horizontal Strip of 4 Compact Stat Blocks */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E3A8A]">
            Critical Pollutant Concentrations vs WHO Limits:
          </div>
          <span className="text-xs font-sans text-[#475569]">WHO Global Guidelines (24-Hour)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {pollutants.map((p) => {
            const isExceeded = p.val > p.whoLimit;
            const barWidth = Math.min(100, (p.val / (p.whoLimit * 2)) * 100);
            return (
              <div 
                key={p.name}
                className="bg-white rounded-xl border border-[#DBEAFE] p-4 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#1E3A8A]">{p.name}</span>
                    <span className="text-[11px] text-[#475569]">{p.fullName}</span>
                  </div>

                  <div className="flex items-baseline gap-1.5 my-2">
                    <span className="text-2xl font-serif font-black text-[#1E3A8A] metric-num">
                      {p.val}
                    </span>
                    <span className="text-xs font-mono text-[#475569]">{p.unit}</span>
                  </div>
                </div>

                <div>
                  {/* Progress bar vs WHO limit */}
                  <div className="w-full bg-[#E9EEF6] h-2 rounded-sm overflow-hidden mb-1.5">
                    <div 
                      className="h-full rounded-sm transition-all"
                      style={{ 
                        width: `${barWidth}%`, 
                        backgroundColor: isExceeded ? (p.ratio >= 5 ? '#DC2626' : '#EA580C') : '#16A34A' 
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#475569]">
                    <span>WHO: {p.whoLimit} {p.unit}</span>
                    <span className={`font-bold ${isExceeded ? 'text-[#DC2626]' : 'text-[#16A34A]'}`}>
                      {p.ratio}x limit
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Optimal Ventilation Window Banner */}
      <div className={`rounded-xl border p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        airData.optimalVentilationWindow.currentSafe 
          ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#166534]' 
          : 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-lg shrink-0 ${
            airData.optimalVentilationWindow.currentSafe ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEF3C7] text-[#D97706]'
          }`}>
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider font-bold">
                Ventilation Window (हवा बदलने का समय):
              </span>
              <span className="text-xs font-mono font-black text-[#D97706] bg-white px-2 py-0.5 rounded border border-[#FDE68A]">
                {airData.optimalVentilationWindow.start} – {airData.optimalVentilationWindow.end}
              </span>
            </div>
            <p className="text-xs sm:text-sm mt-1 leading-relaxed text-[#475569] font-sans">
              {airData.optimalVentilationWindow.reason}
            </p>
          </div>
        </div>

        <div className="shrink-0 self-end sm:self-center">
          <span className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase border ${
            airData.optimalVentilationWindow.currentSafe 
              ? 'bg-[#16A34A] text-white border-[#16A34A]' 
              : 'bg-[#D97706] text-white border-[#D97706]'
          }`}>
            {airData.optimalVentilationWindow.currentSafe ? 'Safe to Ventilate' : 'Keep Windows Sealed'}
          </span>
        </div>
      </div>

      {/* 4. Diurnal Smog Curve — REAL SVG Line/Area Chart */}
      <div className="bg-white rounded-xl border border-[#DBEAFE] p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#DBEAFE] mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#1E3A8A] uppercase font-sans tracking-wide">
                24-Hour Diurnal Dispersion &amp; Particulate Curve
              </h3>
              <span className="text-xs font-bold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#FDE68A]">
                दैनिक प्रदूषण चक्र
              </span>
            </div>
            <p className="text-xs text-[#475569] font-sans mt-0.5">
              Hourly PM2.5 trajectory tracking solar thermal inversion dissipation &amp; evening re-capping
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#1E40AF]">
              <span className="w-3 h-0.5 bg-[#1E40AF]" />
              <span>PM2.5 (µg/m³)</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#D97706]">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#D97706]/20 border border-[#D97706]" />
              <span>Ventilation Window (2 PM)</span>
            </span>
          </div>
        </div>

        {/* Real SVG Line/Area Chart Canvas */}
        <div className="relative w-full overflow-x-auto pb-2">
          <svg 
            viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
            className="w-full h-auto min-w-[540px] max-w-full overflow-visible"
          >
            {/* Horizontal Grid lines */}
            {[0, 100, 200, 300].map((val) => {
              const y = paddingY + usableHeight - (val / maxPm25) * usableHeight;
              return (
                <g key={val}>
                  <line 
                    x1={paddingX} 
                    y1={y} 
                    x2={chartWidth - paddingX} 
                    y2={y} 
                    stroke="#E2E8F0" 
                    strokeDasharray="4 4" 
                    strokeWidth="1" 
                  />
                  <text 
                    x={paddingX - 8} 
                    y={y + 4} 
                    textAnchor="end" 
                    fontSize="10" 
                    fontFamily="monospace" 
                    fill="#94A3B8"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Amber Highlight Band for 2 PM Ventilation Window */}
            {ventPoint && (
              <g>
                <rect
                  x={ventPoint.x - 35}
                  y={paddingY}
                  width="70"
                  height={usableHeight}
                  fill="#D97706"
                  fillOpacity="0.12"
                  rx="4"
                />
                <text
                  x={ventPoint.x}
                  y={paddingY + 14}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill="#D97706"
                >
                  OPEN (खिड़की खोलें)
                </text>
              </g>
            )}

            {/* SVG Area Fill */}
            {areaD && (
              <path
                d={areaD}
                fill="#3B82F6"
                fillOpacity="0.18"
              />
            )}

            {/* SVG Trend Line */}
            {lineD && (
              <path
                d={lineD}
                fill="none"
                stroke="#1E40AF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Points & Value Labels */}
            {pointsCoords.map((pt) => {
              const isHovered = hoveredPoint === pt.idx;
              const isVent = pt.data.isVentilationWindow;
              return (
                <g 
                  key={pt.idx}
                  onMouseEnter={() => setHoveredPoint(pt.idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  className="cursor-pointer"
                >
                  {/* Point Circle */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? 6 : (isVent ? 5 : 4)}
                    fill={isVent ? '#D97706' : (isHovered ? '#1E40AF' : '#FFFFFF')}
                    stroke={isVent ? '#D97706' : '#1E40AF'}
                    strokeWidth="2.5"
                  />

                  {/* Direct PM2.5 Value Label above each point */}
                  <text
                    x={pt.x}
                    y={pt.y - 10}
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill={isVent ? '#D97706' : '#1E3A8A'}
                  >
                    {pt.data.pm25}
                  </text>

                  {/* X-Axis Time Label below */}
                  <text
                    x={pt.x}
                    y={chartHeight - paddingY + 16}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="600"
                    fill="#475569"
                  >
                    {pt.data.hourLabel}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hindi Diurnal Labels on X Axis */}
          <div className="flex items-center justify-between px-10 text-[11px] font-mono text-[#475569] pt-1">
            <span className="text-slate-500">सुबह (Morning)</span>
            <span className="text-[#D97706] font-bold">दोपहर (Afternoon Window)</span>
            <span className="text-slate-500">शाम (Evening Peak)</span>
          </div>
        </div>

        {/* Accessible Data Table below the chart */}
        <div className="mt-4 pt-4 border-t border-[#DBEAFE]">
          <div className="text-xs font-mono font-bold uppercase text-[#475569] mb-2">
            Diurnal Observation Data Table (डेटा तालिका):
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-[#475569]">
                  <th className="py-2 px-3">Time (समय)</th>
                  <th className="py-2 px-3">Period</th>
                  <th className="py-2 px-3">PM2.5 Concentration</th>
                  <th className="py-2 px-3">AQI Score</th>
                  <th className="py-2 px-3">Ventilation Status</th>
                </tr>
              </thead>
              <tbody>
                {hourlyPoints.map((pt, idx) => (
                  <tr 
                    key={idx}
                    className={`border-b border-[#DBEAFE] hover:bg-[#F8FAFC] ${
                      pt.isVentilationWindow ? 'bg-[#FFFBEB] font-bold text-[#92400E]' : 'text-[#1E3A8A]'
                    }`}
                  >
                    <td className="py-2 px-3 font-bold">{pt.hourLabel}</td>
                    <td className="py-2 px-3">
                      {idx < 2 ? 'सुबह (Morning)' : idx < 4 ? 'दोपहर (Afternoon)' : 'शाम (Evening)'}
                    </td>
                    <td className="py-2 px-3 metric-num">{pt.pm25} µg/m³</td>
                    <td className="py-2 px-3 metric-num">AQI {pt.aqi}</td>
                    <td className="py-2 px-3">
                      {pt.isVentilationWindow ? (
                        <span className="px-2 py-0.5 rounded bg-[#D97706] text-white text-[10px] uppercase font-bold">
                          Safe Window Open
                        </span>
                      ) : (
                        <span className="text-slate-500">Windows Sealed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
