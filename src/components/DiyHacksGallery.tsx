import React, { useState } from 'react';
import { 
  Wrench, 
  Sparkles, 
  Calculator, 
  Layers, 
  HelpCircle, 
  CheckCircle, 
  ArrowRight,
  Flame,
  Droplets,
  Fan
} from 'lucide-react';
import { UserProfile } from '../types';

interface DiyHacksGalleryProps {
  profile: UserProfile;
}

export const DiyHacksGallery: React.FC<DiyHacksGalleryProps> = ({ profile }) => {
  const [roomSize, setRoomSize] = useState<number>(180); // sq ft
  const [selectedFilter, setSelectedFilter] = useState<'merv13' | 'hepa'>('merv13');

  // Calculations for Corsi-Rosenthal box
  // CADR is roughly 220 CFM for single MERV13 20" box fan
  const estimatedCadr = selectedFilter === 'merv13' ? 220 : 180;
  // Air changes per hour (ACH) = (CADR * 60) / (Area * CeilingHeight=8ft)
  const roomVolume = roomSize * 8;
  const ach = Math.round(((estimatedCadr * 60) / roomVolume) * 10) / 10;
  // Minutes to achieve 90% particle reduction = ln(10) / (ACH/60)
  const minutesToClear = Math.round((2.3 / (ach / 60)));

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Socioeconomic Hacks & Sustainable Alternatives</h2>
            <p className="text-xs text-slate-400">
              Low-cost, physics-grounded clean air innovations requiring no expensive commercial hardware
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Corsi-Rosenthal CADR Calculator */}
        <div className="lg:col-span-6 bg-slate-950/80 rounded-xl border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Fan className="w-4 h-4 text-emerald-400 animate-spin" />
              <h3 className="text-sm font-bold text-white">DIY Corsi-Rosenthal Fan Box</h3>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              Cost: ~$15–$25
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            A peer-reviewed open-source air cleaner created by atmospheric scientists. Uses an ordinary box fan and a high-efficiency furnace filter to match or outperform $300 commercial HEPA units.
          </p>

          {/* Interactive Calculator Slider */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-3 mb-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Room Floor Area:</span>
              <span className="text-emerald-400 font-bold">{roomSize} sq ft (~{(roomSize * 0.0929).toFixed(1)} m²)</span>
            </div>
            <input 
              type="range" 
              min="80" 
              max="450" 
              step="10" 
              value={roomSize}
              onChange={(e) => setRoomSize(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400">Filter Media:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedFilter('merv13')}
                  className={`px-2 py-1 rounded text-[11px] font-semibold border ${
                    selectedFilter === 'merv13' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  MERV-13 (Recommended)
                </button>
                <button
                  onClick={() => setSelectedFilter('hepa')}
                  className={`px-2 py-1 rounded text-[11px] font-semibold border ${
                    selectedFilter === 'hepa' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  HEPA Sheet
                </button>
              </div>
            </div>
          </div>

          {/* Live Performance Simulation Output */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">Clean Air Delivery</div>
              <div className="text-base font-bold text-white mt-0.5">{estimatedCadr} <span className="text-[10px] text-slate-400 font-normal">CFM</span></div>
            </div>

            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">Air Changes / Hr</div>
              <div className="text-base font-bold text-teal-300 mt-0.5">{ach}x <span className="text-[10px] text-slate-400 font-normal">turnover</span></div>
            </div>

            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">90% Smog Clearance</div>
              <div className="text-base font-bold text-emerald-400 mt-0.5">{minutesToClear} <span className="text-[10px] text-slate-400 font-normal">mins</span></div>
            </div>
          </div>
        </div>

        {/* Right Column: Zero-Cost Behavioral Hacks & Sustainable Substitutes */}
        <div className="lg:col-span-6 space-y-3.5">
          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 mb-1.5">
              <Droplets className="w-4 h-4" />
              <span>Zero-Cost Hack: The Damp Towel Infiltration Seal</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In unsealed apartments, 40–60% of indoor PM2.5 enters through draft gaps under entryways and balconies. A rolled damp cotton cloth seals the air gap through physical blockage while electrostatic moisture attracts and captures passing aerosolized soot.
            </p>
          </div>

          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1.5">
              <Flame className="w-4 h-4" />
              <span>Sustainable Consumer Substitutions</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start justify-between bg-slate-900/60 p-2 rounded-lg">
                <div>
                  <span className="font-semibold text-rose-300 line-through">Incense / Dhoop / Mosquito Coils</span>
                  <div className="text-[11px] text-slate-400">Generates VOCs + &gt;800 µg/m³ PM2.5</div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-emerald-300">→ Ultrasonic Diffuser / Mesh Screen</span>
                  <div className="text-[11px] text-emerald-400/80">Zero PM emission alternative</div>
                </div>
              </div>

              <div className="flex items-start justify-between bg-slate-900/60 p-2 rounded-lg">
                <div>
                  <span className="font-semibold text-rose-300 line-through">Dry Broom Floor Sweeping</span>
                  <div className="text-[11px] text-slate-400">Aerosolizes settled ultrafine soot</div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-emerald-300">→ Microfiber Damp-Mop</span>
                  <div className="text-[11px] text-emerald-400/80">Caps resuspension by 75%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 mb-1.5">
              <CheckCircle className="w-4 h-4" />
              <span>N95 Paper-Bag Rotation Protocol (Cost-Saver)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Certified N95/FFP2 respirators do not expire after a single use. Store your mask in a clean, breathable brown paper bag for 72 hours between uses. Natural drying neutralizes trapped pathogens while electrostatic fibers retain particulate capture capability for 5–7 commutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
