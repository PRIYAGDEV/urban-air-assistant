import React from 'react';
import { 
  CalendarClock, 
  ShieldCheck, 
  AlertCircle, 
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';
import { ActionCard, AirQualityData, UserProfile } from '../types';
import { generateActionCards } from '../services/decisionEngine';

interface PersonalizedTimelineProps {
  airData: AirQualityData;
  profile: UserProfile;
}

export const PersonalizedTimeline: React.FC<PersonalizedTimelineProps> = ({ airData, profile }) => {
  const cards: ActionCard[] = generateActionCards(airData, profile);

  return (
    <div className="cinematic-panel rounded-2xl p-5 sm:p-7 border border-white/[0.08]">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.07] mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-obs-850 border border-white/[0.08] flex items-center justify-center text-emerald-400">
            <CalendarClock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white font-sans">
              Dynamic 24-Hour Smog Action Protocol
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Diurnal intervention sequence synchronized to solar boundary-layer cycles
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-obs-950 text-slate-300 border border-white/[0.08]">
            Tier: {profile.socioeconomicTier === 'tier1_zero_cost' ? 'Zero-Cost' : profile.socioeconomicTier === 'tier2_low_cost' ? 'Low-Cost DIY' : 'Appliance HEPA'}
          </span>
          <span className="px-2 py-1 rounded bg-obs-950 text-emerald-400 border border-emerald-500/30 text-[11px]">
            {cards.length} Interventions Active
          </span>
        </div>
      </div>

      {/* Action Cards Timeline Sequence */}
      <div className="relative space-y-4 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-white/[0.08]">
        {cards.map((card, idx) => (
          <div
            key={card.id || idx}
            className={`relative ml-7 sm:ml-9 p-4 sm:p-5 rounded-xl border transition-all ${
              card.urgency === 'high'
                ? 'bg-obs-950/90 border-rose-900/40 hover:border-rose-700/50'
                : 'bg-obs-950/70 border-white/[0.06] hover:border-white/[0.12]'
            }`}
          >
            {/* Timeline node marker */}
            <div className={`absolute -left-[23px] sm:-left-[31px] top-5 w-3 h-3 rounded-full border-2 ${
              card.urgency === 'high' 
                ? 'bg-rose-500 border-obs-950 ring-2 ring-rose-500/20' 
                : 'bg-emerald-400 border-obs-950'
            }`} />

            {/* Card Header & Time Slot */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
                  {card.timeSlot}
                </span>
                <h3 className="text-sm font-bold text-white font-sans">{card.title}</h3>
              </div>

              <div className="flex items-center gap-1.5 font-mono">
                <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-obs-900 text-slate-300 border border-white/[0.08]">
                  {card.socioeconomicTier.replace('_', ' ')}
                </span>
                {card.urgency === 'high' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5" /> High Urgency
                  </span>
                )}
              </div>
            </div>

            {/* Prescribed Action */}
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3.5 font-sans">
              {card.action}
            </p>

            {/* Science Rationale & Quantified Impact */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 pt-3 border-t border-white/[0.06] text-xs">
              <div className="md:col-span-8 flex items-start gap-2 text-slate-400 bg-obs-900/80 p-2.5 rounded-lg border border-white/[0.04]">
                <Info className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-snug">
                  <strong className="text-slate-200">Atmospheric Physics:</strong> {card.scienceRationale}
                </span>
              </div>

              <div className="md:col-span-4 flex items-center gap-2 text-emerald-300 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[11px] leading-tight font-medium">
                  {card.impactBadge}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
