import React, { useState } from 'react';
import { 
  Wrench, 
  Fan, 
  Droplets, 
  Flame, 
  CheckCircle
} from 'lucide-react';
import { UserProfile } from '../types';

interface DiyHacksGalleryProps {
  profile: UserProfile;
}

export const DiyHacksGallery: React.FC<DiyHacksGalleryProps> = ({ profile: _profile }) => {
  const [roomSize, setRoomSize] = useState<number>(180); // sq ft
  const [selectedFilter, setSelectedFilter] = useState<'merv13' | 'hepa'>('merv13');

  const estimatedCadr = selectedFilter === 'merv13' ? 220 : 180;
  const roomVolume = roomSize * 8; // 8ft ceiling
  const ach = Math.round(((estimatedCadr * 60) / roomVolume) * 10) / 10;
  const minutesToClear = Math.round(2.3 / (ach / 60));

  return (
    <div className="bg-white rounded-xl border border-[#DBEAFE] p-5 sm:p-7 shadow-xs space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#DBEAFE]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#E9EEF6] border border-[#DBEAFE] flex items-center justify-center text-[#D97706]">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-serif font-bold text-[#1E3A8A]">
                Clean Air Engineering Lab &amp; DIY Alternatives
              </h2>
              <span className="text-xs font-bold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#FDE68A]">
                स्वदेशी वायु शोधक
              </span>
            </div>
            <p className="text-xs text-[#475569] font-sans mt-0.5">
              Open-source filtration engineering &amp; zero-cost physical infiltration countermeasures
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-[#1E40AF] px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] w-fit">
          Benchmark: UC Davis / EPA
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Corsi-Rosenthal Clean Air Engineering Bench */}
        <div className="lg:col-span-6 bg-[#F8FAFC] rounded-xl border border-[#DBEAFE] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Fan className="w-4 h-4 text-[#1E40AF]" />
                <h3 className="text-sm font-bold text-[#1E3A8A] font-sans">
                  DIY Corsi-Rosenthal Filtration Chamber
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-[#E9EEF6] text-[#1E40AF] border border-[#DBEAFE]">
                Cost: ~$18–$24 (₹1,500)
              </span>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed mb-4 font-sans">
              A peer-reviewed open-source air cleaner constructed from an ordinary 20-inch box fan and MERV-13 furnace filter media. Provides CADR airflow matching commercial HEPA units costing over $300.
            </p>

            {/* Parameter Slider */}
            <div className="bg-white rounded-lg border border-[#DBEAFE] p-4 space-y-3 mb-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#475569] font-bold">Room Floor Area:</span>
                <span className="text-[#1E40AF] font-bold metric-num">
                  {roomSize} sq ft <span className="text-slate-400 font-normal">(~{(roomSize * 0.0929).toFixed(1)} m²)</span>
                </span>
              </div>
              
              <input 
                type="range" 
                min="80" 
                max="450" 
                step="10" 
                value={roomSize}
                onChange={(e) => setRoomSize(Number(e.target.value))}
                className="w-full accent-[#1E40AF] cursor-pointer h-2 bg-[#E2E8F0] rounded-lg"
              />

              <div className="flex items-center justify-between pt-2 border-t border-[#DBEAFE] text-xs font-mono">
                <span className="text-[#475569] font-bold">Filter Media:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedFilter('merv13')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all border min-h-[36px] ${
                      selectedFilter === 'merv13'
                        ? 'bg-[#1E40AF] text-white border-[#1E40AF] font-bold'
                        : 'bg-[#F8FAFC] text-[#475569] border-[#DBEAFE] hover:text-[#1E3A8A]'
                    }`}
                  >
                    MERV-13 (Optimum CFM)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFilter('hepa')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all border min-h-[36px] ${
                      selectedFilter === 'hepa'
                        ? 'bg-[#1E40AF] text-white border-[#1E40AF] font-bold'
                        : 'bg-[#F8FAFC] text-[#475569] border-[#DBEAFE] hover:text-[#1E3A8A]'
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
            <div className="bg-white p-3 rounded-lg border border-[#DBEAFE]">
              <div className="text-[10px] uppercase text-[#475569] tracking-wider font-bold">CADR Flow</div>
              <div className="text-lg font-serif font-black text-[#1E3A8A] mt-1 metric-num">
                {estimatedCadr} <span className="text-xs font-normal text-[#475569]">CFM</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-[#DBEAFE]">
              <div className="text-[10px] uppercase text-[#475569] tracking-wider font-bold">Turnover</div>
              <div className="text-lg font-serif font-black text-[#3B82F6] mt-1 metric-num">
                {ach}x <span className="text-xs font-normal text-[#475569]">/hr</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-[#DBEAFE]">
              <div className="text-[10px] uppercase text-[#475569] tracking-wider font-bold">90% Scrub</div>
              <div className="text-lg font-serif font-black text-[#16A34A] mt-1 metric-num">
                {minutesToClear} <span className="text-xs font-normal text-[#475569]">mins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Zero-Cost Behavioral Countermeasures */}
        <div className="lg:col-span-6 space-y-3.5">
          <div className="bg-[#F8FAFC] rounded-xl border border-[#DBEAFE] p-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1E40AF] mb-1.5 uppercase">
              <Droplets className="w-4 h-4 shrink-0" />
              <span>Countermeasure 01: Damp Towel Perimeter Infiltration Barrier</span>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed font-sans">
              In typical urban apartments, 40–60% of indoor PM2.5 infiltrates via threshold gaps. A rolled damp cotton towel creates a physical seal, while ambient water tension attracts and binds passing aerosolized particulate before room dispersion.
            </p>
          </div>

          <div className="bg-[#F8FAFC] rounded-xl border border-[#DBEAFE] p-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D97706] mb-2 uppercase">
              <Flame className="w-4 h-4 shrink-0" />
              <span>Countermeasure 02: Indoor Combustion Substitutions</span>
            </div>
            <div className="space-y-2 text-xs font-sans">
              <div className="flex items-start justify-between bg-white p-2.5 rounded-lg border border-[#DBEAFE]">
                <div>
                  <span className="font-bold text-[#DC2626] line-through">Incense / Mosquito Coils</span>
                  <div className="text-[11px] font-mono text-[#475569] mt-0.5">Emits &gt;800 µg/m³ PM2.5 + Benzene</div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#16A34A]">Ultrasonic Diffuser / Mesh</span>
                  <div className="text-[11px] font-mono text-[#16A34A] mt-0.5">Zero particulate emission</div>
                </div>
              </div>

              <div className="flex items-start justify-between bg-white p-2.5 rounded-lg border border-[#DBEAFE]">
                <div>
                  <span className="font-bold text-[#DC2626] line-through">Dry Broom Resuspension</span>
                  <div className="text-[11px] font-mono text-[#475569] mt-0.5">Resuspends settled ultrafine soot</div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#16A34A]">Damp Microfiber Mop</span>
                  <div className="text-[11px] font-mono text-[#16A34A] mt-0.5">Captures 75% settled matter</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F8FAFC] rounded-xl border border-[#DBEAFE] p-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1E40AF] mb-1.5 uppercase">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Countermeasure 03: N95 Paper-Bag Decontamination Cycle</span>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed font-sans">
              Respirators retain electrostatic capture efficacy for 40+ cumulative hours. Storing masks in a dry, breathable paper bag for 72 hours dissipates viral moisture while preserving filter fibers, allowing safe 5-to-7-cycle reuse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
