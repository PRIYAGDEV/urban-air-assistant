import React from 'react';
import { 
  CalendarClock, 
  Wind, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  Zap,
  Info
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
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CalendarClock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Dynamic 24-Hour Smog Action Plan</h2>
            <p className="text-xs text-slate-400">
              Personalized interventions synchronized to diurnal smog inversions & your profile
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-medium">
            Tier: {profile.socioeconomicTier === 'tier1_zero_cost' ? 'Zero-Cost Behavioral' : profile.socioeconomicTier === 'tier2_low_cost' ? 'Low-Cost DIY' : 'Advanced Appliance'}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            AI Optimized
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {cards.map((card, idx) => (
          <div
            key={card.id || idx}
            className={`p-4 sm:p-5 rounded-xl border transition-all ${
              card.urgency === 'high'
                ? 'bg-slate-950/90 border-rose-900/40 hover:border-rose-700/60'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                  {card.timeSlot}
                </span>
                <h3 className="text-sm font-bold text-white">{card.title}</h3>
              </div>

              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${
                  card.socioeconomicTier === 'zero_cost'
                    ? 'bg-teal-950/40 border-teal-500/30 text-teal-300'
                    : card.socioeconomicTier === 'low_cost'
                    ? 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                    : 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300'
                }`}>
                  {card.socioeconomicTier.replace('_', ' ')}
                </span>
                {card.urgency === 'high' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5" /> High Urgency
                  </span>
                )}
              </div>
            </div>

            {/* Action Statement */}
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed mb-3">
              {card.action}
            </p>

            {/* Science Rationale & Impact Badge */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 pt-3 border-t border-slate-900 text-xs">
              <div className="md:col-span-8 flex items-start gap-2 text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-850">
                <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-snug">
                  <strong className="text-slate-300">Why it works:</strong> {card.scienceRationale}
                </span>
              </div>

              <div className="md:col-span-4 flex items-center gap-2 text-emerald-300 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-500/20 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] leading-tight font-semibold">
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
