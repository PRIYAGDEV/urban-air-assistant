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

      {/* Vertical Timeline - Left Rail with Time, Right Side with Details */}
      <div className="relative pl-4 sm:pl-6 space-y-8 before:absolute before:left-[19px] sm:before:left-[27px] before:top-4 before:bottom-4 before:w-0.5 before:bg-[#DBEAFE]">
        {cards.map((card, idx) => (
          <div key={card.id || idx} className="relative flex flex-col md:flex-row items-start gap-4 sm:gap-6">
            {/* Timeline node marker & Time rail */}
            <div className="flex items-center gap-3 shrink-0">
              <div className={`w-3.5 h-3.5 rounded-full border-2 bg-white z-10 ${
                card.urgency === 'high' ? 'border-[#DC2626] ring-4 ring-[#FEE2E2]' : 'border-[#1E40AF] ring-4 ring-[#EFF6FF]'
              }`} />
              <div className="font-mono text-xs font-bold text-[#1E40AF] bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#DBEAFE] whitespace-nowrap min-w-[110px] text-center">
                {card.timeSlot}
              </div>
            </div>

            {/* Right Side: Title + Description + Why it works */}
            <div className={`flex-1 bg-[#F8FAFC] rounded-xl border p-4 sm:p-5 transition-all w-full ${
              card.urgency === 'high'
                ? 'border-[#FCA5A5] bg-[#FEF2F2]/50'
                : 'border-[#DBEAFE] hover:border-[#93C5FD]'
            }`}>
              {/* Header row */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#1E3A8A]">
                  {card.title}
                </h3>

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
