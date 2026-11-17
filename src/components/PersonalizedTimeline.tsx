import React from 'react';
import { 
  CalendarClock, 
  ShieldCheck, 
  AlertCircle, 
  Info,
  Clock
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
    <div className="bg-white rounded-xl border border-[#DBEAFE] p-5 sm:p-7 shadow-xs space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#DBEAFE]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#E9EEF6] border border-[#DBEAFE] flex items-center justify-center text-[#1E40AF]">
            <CalendarClock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-serif font-bold text-[#1E3A8A]">
                Dynamic 24-Hour Smog Action Protocol
              </h2>
              <span className="text-xs font-bold text-[#1E40AF] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                कार्य योजना
              </span>
            </div>
            <p className="text-xs text-[#475569] font-sans mt-0.5">
              Personalized interventions synchronized to diurnal solar heating &amp; boundary layer stagnation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] text-[#1E3A8A] border border-[#DBEAFE] font-bold">
            Tier: {profile.socioeconomicTier === 'tier1_zero_cost' ? 'Zero-Cost' : profile.socioeconomicTier === 'tier2_low_cost' ? 'Low-Cost DIY' : 'Appliance HEPA'}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] font-bold">
            {cards.length} Interventions Active
          </span>
        </div>
      </div>

      {/* Vertical Timeline - Balanced and Clean Layout */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-0.5 before:bg-[#DBEAFE]">
        {cards.map((card, idx) => (
          <div 
            key={card.id || idx} 
            className="relative animate-fade-up"
            style={{ animationDelay: `${idx * 75}ms` }}
          >
            {/* Timeline node marker centered on vertical line */}
            <div className={`absolute -left-[19px] sm:-left-[23px] top-4.5 w-3.5 h-3.5 rounded-full border-2 bg-white z-10 transition-transform duration-200 hover:scale-125 ${
              card.urgency === 'high' ? 'border-[#DC2626] ring-4 ring-[#FEE2E2]' : 'border-[#1E40AF] ring-4 ring-[#EFF6FF]'
            }`} />

            {/* Action Card with integrated Time Slot header */}
            <div className={`bg-[#F8FAFC] rounded-xl border p-4 sm:p-5 transition-all duration-200 w-full hover:-translate-y-0.5 hover:shadow-xs ${
              card.urgency === 'high'
                ? 'border-[#FCA5A5] bg-[#FEF2F2]/50 hover:border-[#F87171]'
                : 'border-[#DBEAFE] hover:border-[#93C5FD]'
            }`}>
              {/* Header row: Time slot, Title & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-[#1E40AF] bg-white px-2.5 py-1 rounded-lg border border-[#DBEAFE] shadow-2xs flex items-center gap-1.5 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>{card.timeSlot}</span>
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#1E3A8A]">
                    {card.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white text-[#475569] border border-[#DBEAFE] font-semibold">
                    {card.socioeconomicTier.replace('_', ' ')}
                  </span>
                  {card.urgency === 'high' && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#DC2626] text-white uppercase flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Urgent Priority
                    </span>
                  )}
                </div>
              </div>

              {/* Action Description */}
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed mb-4 font-sans font-medium">
                {card.action}
              </p>

              {/* Why it works & Impact */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-3 border-t border-[#DBEAFE] text-xs">
                <div className="lg:col-span-8 flex items-start gap-2 text-[#475569] bg-white p-3 rounded-lg border border-[#DBEAFE]">
                  <Info className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed font-sans">
                    <strong className="text-[#1E3A8A]">Why it works (वैज्ञानिक कारण):</strong> {card.scienceRationale}
                  </span>
                </div>

                <div className="lg:col-span-4 flex items-center gap-2 text-[#166534] bg-[#F0FDF4] p-3 rounded-lg border border-[#BBF7D0] font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span className="text-xs font-bold leading-snug">
                    {card.impactBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
