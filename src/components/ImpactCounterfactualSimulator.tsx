import React, { useState } from 'react';
import { 
  Activity, 
  Cigarette, 
  Leaf, 
  CheckSquare, 
  Square, 
  ShieldCheck
} from 'lucide-react';
import { AirQualityData, UserProfile } from '../types';
import { calculateCounterfactualImpact } from '../services/decisionEngine';

interface ImpactCounterfactualSimulatorProps {
  airData: AirQualityData;
  profile: UserProfile;
}

export const ImpactCounterfactualSimulator: React.FC<ImpactCounterfactualSimulatorProps> = ({
  airData,
  profile,
}) => {
  const [n95Active, setN95Active] = useState<boolean>(true);
  const [sanctuaryActive, setSanctuaryActive] = useState<boolean>(true);
  const [commuteShift, setCommuteShift] = useState<boolean>(false);

  const impact = calculateCounterfactualImpact({
    commuteModeShift: commuteShift,
    maskUsageN95: n95Active,
    indoorSanctuaryActive: sanctuaryActive,
    basePm25: airData.pm25
  });

  return (
    <div className="bg-white rounded-xl border border-[#DBEAFE] p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#DBEAFE]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#E9EEF6] border border-[#DBEAFE] flex items-center justify-center text-[#1E40AF]">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-serif font-bold text-[#1E3A8A]">
                Quantitative Health &amp; Counterfactual Impact Engine
              </h2>
              <span className="text-xs font-bold text-[#1E40AF] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                स्वास्थ्य प्रभाव सिम्युलेटर
              </span>
            </div>
            <p className="text-xs text-[#475569] font-sans mt-0.5">
              Calculates biological alveolar shielding &amp; emissions abated by daily interventions
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-[#1E40AF] px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] w-fit">
          Model: Berkeley Earth &amp; WHO
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Countermeasure Toggles */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono font-bold text-[#1E3A8A] uppercase tracking-wider">
            Simulate Active Interventions (कार्रवाई चुनें):
          </div>

          {/* Toggle 1: N95 Respirator */}
          <button
            type="button"
            onClick={() => setN95Active(!n95Active)}
            className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 min-h-[44px] ${
              n95Active
                ? 'bg-[#EFF6FF] border-[#93C5FD] shadow-xs'
                : 'bg-[#F8FAFC] border-[#DBEAFE] text-[#64748B]'
            }`}
          >
            {n95Active ? (
              <CheckSquare className="w-4 h-4 text-[#1E40AF] shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-[#94A3B8] shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-xs font-bold text-[#1E3A8A] font-sans">Certified N95 Mask during Transit</div>
              <p className="text-[11px] text-[#475569] mt-0.5 leading-relaxed font-sans">
                Filters 95%+ of ultrafine combustion soot (&lt;2.5 µm) compared to 15–20% in cloth/surgical masks.
              </p>
            </div>
          </button>

          {/* Toggle 2: Bedroom Clean Air Sanctuary */}
          <button
            type="button"
            onClick={() => setSanctuaryActive(!sanctuaryActive)}
            className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 min-h-[44px] ${
              sanctuaryActive
                ? 'bg-[#EFF6FF] border-[#93C5FD] shadow-xs'
                : 'bg-[#F8FAFC] border-[#DBEAFE] text-[#64748B]'
            }`}
          >
            {sanctuaryActive ? (
              <CheckSquare className="w-4 h-4 text-[#1E40AF] shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-[#94A3B8] shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-xs font-bold text-[#1E3A8A] font-sans">Sealed Bedroom Sanctuary (8-hr sleep)</div>
              <p className="text-[11px] text-[#475569] mt-0.5 leading-relaxed font-sans">
                Threshold draft-sealing or Corsi-Rosenthal unit maintains bedroom air under 45 µg/m³.
              </p>
            </div>
          </button>

          {/* Toggle 3: Commute Mode Shift */}
          <button
            type="button"
            onClick={() => setCommuteShift(!commuteShift)}
            className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 min-h-[44px] ${
              commuteShift
                ? 'bg-[#EFF6FF] border-[#93C5FD] shadow-xs'
                : 'bg-[#F8FAFC] border-[#DBEAFE] text-[#64748B]'
            }`}
          >
            {commuteShift ? (
              <CheckSquare className="w-4 h-4 text-[#1E40AF] shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-[#94A3B8] shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-xs font-bold text-[#1E3A8A] font-sans">Shift 10km Commute to Filtered Metro</div>
              <p className="text-[11px] text-[#475569] mt-0.5 leading-relaxed font-sans">
                Bypasses ground-level tailpipe exhaust plumes and eliminates personal motorcycle emissions.
              </p>
            </div>
          </button>
        </div>

        {/* Right: Quantified Counterfactual Results */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Metric 1: Alveolar Deposition Spared */}
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#DBEAFE] flex flex-col justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#475569] font-bold">
                Alveolar PM2.5 Spared
              </span>
              <div className="my-2">
                <span className="text-3xl font-serif font-black text-[#16A34A] metric-num">
                  {impact.pm25AvoidedUg.toLocaleString()}
                </span>
                <span className="text-xs font-mono text-[#475569] ml-1">µg</span>
              </div>
              <span className="text-[10px] font-mono text-[#16A34A] font-bold">
                Prevented from capillary entry
              </span>
            </div>

            {/* Metric 2: Secondhand Cigarette Equivalent */}
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#DBEAFE] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#475569]">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold">Cigarette Equivalent</span>
                <Cigarette className="w-4 h-4 text-[#D97706]" />
              </div>
              <div className="my-2">
                <span className="text-3xl font-serif font-black text-[#D97706] metric-num">
                  {impact.cigarettesAvoided}
                </span>
                <span className="text-xs font-mono text-[#475569] ml-1">cigs</span>
              </div>
              <span className="text-[10px] font-mono text-[#D97706] font-bold">
                Berkeley Earth ratio
              </span>
            </div>

            {/* Metric 3: Tailpipe Carbon Offset */}
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#DBEAFE] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#475569]">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold">Emissions Abated</span>
                <Leaf className="w-4 h-4 text-[#1E40AF]" />
              </div>
              <div className="my-2">
                <span className="text-3xl font-serif font-black text-[#1E40AF] metric-num">
                  {impact.co2SavedG}
                </span>
                <span className="text-xs font-mono text-[#475569] ml-1">g CO₂</span>
              </div>
              <span className="text-[10px] font-mono text-[#1E40AF] font-bold">
                +1.4g VOC tailpipe reduction
              </span>
            </div>
          </div>

          {/* Biological Pathophysiology Insight */}
          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#DBEAFE]">
            <h4 className="text-xs font-bold text-[#1E3A8A] flex items-center gap-2 mb-1.5 font-sans">
              <span className="w-2 h-2 rounded-sm bg-[#1E40AF]" />
              <span>Pulmonary Pathophysiology: PM2.5 Alveolar Translocation</span>
            </h4>
            <p className="text-xs text-[#475569] leading-relaxed font-sans">
              Coarse dust (&gt;10 µm) is arrested in the nasal cavity. Winter combustion smog particulates (&lt;2.5 µm) penetrate deeply into the pulmonary alveoli, translocating directly across the alveolar-capillary membrane into systemic circulation. This triggers acute arterial vasoconstriction, elevated platelet activation, and bronchial inflammation. Your protocol shields cardiovascular integrity during peak stagnation hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
