import React, { useState } from 'react';
import { 
  Wrench, 
  Fan, 
  Droplets, 
  Flame, 
  ShieldCheck, 
  ArrowRight,
  Sliders,
  Cpu
} from 'lucide-react';
import { UserProfile } from '../types';

interface DiyHacksGalleryProps {
  profile: UserProfile;
}

export const DiyHacksGallery: React.FC<DiyHacksGalleryProps> = ({ profile }) => {
  const [roomSize, setRoomSize] = useState<number>(180); // sq ft
  const [selectedFilter, setSelectedFilter] = useState<'merv13' | 'hepa'>('merv13');

  // Calculations for Corsi-Rosenthal box
  // CADR is roughly 220 CFM for single MERV13 20" box fan, ~180 CFM for HEPA sheet
  const estimatedCadr = selectedFilter === 'merv13' ? 220 : 180;
  const roomVolume = roomSize * 8; // 8ft ceiling
  const ach = Math.round(((estimatedCadr * 60) / roomVolume) * 10) / 10;
  const minutesToClear = Math.round(2.3 / (ach / 60));

  return (
    <div className="cinematic-panel rounded-2xl p-5 sm:p-7 border border-white/[0.08]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.07] mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-obs-850 border border-white/[0.08] flex items-center justify-center text-amber-400">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white font-sans">
              Clean Air Engineering Lab &amp; DIY Filtration
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Open-source atmospheric filtration and physical infiltration countermeasures
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-emerald-400 px-2.5 py-1 rounded bg-obs-950 border border-emerald-500/25 w-fit">
          Engineering Benchmark: UC Davis / EPA
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Corsi-Rosenthal Clean Air Engineering Bench */}
        <div className="lg:col-span-6 bg-obs-950/80 rounded-xl border border-white/[0.07] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Fan className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white font-sans">
                  DIY Corsi-Rosenthal Air Chamber
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-300 border border-emerald-500/30">
                Unit Cost: $18 – $24 (₹1,500)
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
              Constructed with a standard 20-inch box fan sealed to MERV-13 furnace filter media. Provides higher Clean Air Delivery Rate (CADR) than typical entry-level commercial purifiers costing $300+.
            </p>

            {/* Chamber Parameter Controls */}
            <div className="bg-obs-900/90 rounded-xl border border-white/[0.06] p-4 space-y-3.5 mb-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Room Floor Area:</span>
                <span className="text-emerald-400 font-bold num-metric">
                  {roomSize} sq ft <span className="text-slate-500 text-[11px]">(~{(roomSize * 0.0929).toFixed(1)} m²)</span>
                </span>
              </div>
              
              <input 
                type="range" 
                min="80" 
                max="450" 
                step="10" 
                value={roomSize}
                onChange={(e) => setRoomSize(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-obs-800 rounded-lg"
              />

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.05] text-xs font-mono">
                <span className="text-slate-400 text-[11px]">Filter Media:</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedFilter('merv13')}
                    className={`px-2 py-1 rounded text-[10px] font-mono transition-all ${
                      selectedFilter === 'merv13'
                        ? 'bg-obs-800 text-emerald-300 border border-emerald-500/40 font-semibold'
                        : 'bg-obs-950 text-slate-400 border border-white/[0.05] hover:text-white'
                    }`}
                  >
                    MERV-13 (Optimum CFM)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFilter('hepa')}
                    className={`px-2 py-1 rounded text-[10px] font-mono transition-all ${
                      selectedFilter === 'hepa'
                        ? 'bg-obs-800 text-emerald-300 border border-emerald-500/40 font-semibold'
                        : 'bg-obs-950 text-slate-400 border border-white/[0.05] hover:text-white'
                    }`}
                  >
                    HEPA H13 Sheet
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chamber Output Readout Grid */}
          <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
            <div className="bg-obs-900/80 p-3 rounded-lg border border-white/[0.05]">
              <div className="text-[10px] uppercase text-slate-400 tracking-wider">CADR Flow</div>
              <div className="text-lg font-bold text-white mt-1 num-metric">
                {estimatedCadr} <span className="text-[10px] font-normal text-slate-400">CFM</span>
              </div>
            </div>

            <div className="bg-obs-900/80 p-3 rounded-lg border border-white/[0.05]">
              <div className="text-[10px] uppercase text-slate-400 tracking-wider">Turnover</div>
              <div className="text-lg font-bold text-sky-300 mt-1 num-metric">
                {ach}x <span className="text-[10px] font-normal text-slate-400">/hr</span>
              </div>
            </div>

            <div className="bg-obs-900/80 p-3 rounded-lg border border-white/[0.05]">
              <div className="text-[10px] uppercase text-slate-400 tracking-wider">90% Scrub</div>
              <div className="text-lg font-bold text-emerald-400 mt-1 num-metric">
                {minutesToClear} <span className="text-[10px] font-normal text-slate-400">mins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Zero-Cost Behavioral Countermeasures */}
        <div className="lg:col-span-6 space-y-3.5">
          <div className="bg-obs-950/80 rounded-xl border border-white/[0.07] p-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-400 mb-1.5">
              <Droplets className="w-4 h-4 shrink-0" />
              <span>Countermeasure 01: Damp Towel Perimeter Infiltration Barrier</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              In typical urban apartments, 40–60% of indoor PM2.5 infiltrates via threshold gaps. A rolled damp cotton towel creates a physical seal, while ambient water tension attracts and binds passing aerosolized particulate before room dispersion.
            </p>
          </div>

          <div className="bg-obs-950/80 rounded-xl border border-white/[0.07] p-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-2">
              <Flame className="w-4 h-4 shrink-0" />
              <span>Countermeasure 02: Indoor Combustion Substitutions</span>
            </div>
            <div className="space-y-2 text-xs font-sans">
              <div className="flex items-start justify-between bg-obs-900/60 p-2.5 rounded-lg border border-white/[0.04]">
                <div>
                  <span className="font-semibold text-rose-300 line-through">Incense / Mosquito Coils</span>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">Emits &gt;800 µg/m³ PM2.5 + Benzene</div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-emerald-400">Ultrasonic Diffuser / Mesh</span>
                  <div className="text-[10px] font-mono text-emerald-400/80 mt-0.5">Zero particulate emission</div>
                </div>
              </div>

              <div className="flex items-start justify-between bg-obs-900/60 p-2.5 rounded-lg border border-white/[0.04]">
                <div>
                  <span className="font-semibold text-rose-300 line-through">Dry Broom Resuspension</span>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">Resuspends settled ultrafine soot</div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-emerald-400">Damp Microfiber Mop</span>
                  <div className="text-[10px] font-mono text-emerald-400/80 mt-0.5">Captures 75% settled matter</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-obs-950/80 rounded-xl border border-white/[0.07] p-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400 mb-1.5">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Countermeasure 03: N95 Paper-Bag Decontamination Cycle</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Respirators retain electrostatic capture efficacy for 40+ cumulative hours. Storing masks in a dry, breathable paper bag for 72 hours dissipates viral moisture while preserving filter fibers, allowing safe 5-to-7-cycle reuse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
