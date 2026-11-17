import React, { useState } from 'react';
import { 
  Activity, 
  Cigarette, 
  Leaf, 
  CheckSquare, 
  Square, 
  ShieldCheck, 
  ArrowUpRight
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
    <div className="cinematic-panel rounded-2xl p-5 sm:p-7 border border-white/[0.08]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.07] mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-obs-850 border border-white/[0.08] flex items-center justify-center text-teal-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white font-sans">
              Quantitative Health &amp; Counterfactual Impact Engine
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Calculates biological alveolar shielding &amp; emissions abated by daily interventions
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-teal-300 px-2.5 py-1 rounded bg-obs-950 border border-teal-500/30 w-fit">
          Model: Berkeley Earth &amp; WHO Health Metrics
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Countermeasure Toggles */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Simulate Active Interventions:
          </div>

          {/* Toggle 1: N95 Respirator */}
          <button
            type="button"
            onClick={() => setN95Active(!n95Active)}
            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
              n95Active
                ? 'bg-obs-950/90 border-emerald-500/40 shadow-sm'
                : 'bg-obs-950/40 border-white/[0.05] text-slate-500'
            }`}
          >
            {n95Active ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-xs font-bold text-white font-sans">Certified N95 Mask during Transit</div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                Filters 95%+ of ultrafine combustion soot (&lt;2.5 µm) compared to 15–20% in cloth/surgical masks.
              </p>
            </div>
          </button>

          {/* Toggle 2: Bedroom Clean Air Sanctuary */}
          <button
            type="button"
            onClick={() => setSanctuaryActive(!sanctuaryActive)}
            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
              sanctuaryActive
                ? 'bg-obs-950/90 border-emerald-500/40 shadow-sm'
                : 'bg-obs-950/40 border-white/[0.05] text-slate-500'
            }`}
          >
            {sanctuaryActive ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-xs font-bold text-white font-sans">Sealed Bedroom Sanctuary (8-hr sleep)</div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                Threshold draft-sealing or Corsi-Rosenthal unit maintains bedroom air under 45 µg/m³.
              </p>
            </div>
          </button>

          {/* Toggle 3: Commute Mode Shift */}
          <button
            type="button"
            onClick={() => setCommuteShift(!commuteShift)}
            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
              commuteShift
                ? 'bg-obs-950/90 border-emerald-500/40 shadow-sm'
                : 'bg-obs-950/40 border-white/[0.05] text-slate-500'
            }`}
          >
            {commuteShift ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-xs font-bold text-white font-sans">Shift 10km Commute to Filtered Metro</div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                Bypasses ground-level tailpipe exhaust plumes and avoids motorcycle engine inhalation.
              </p>
            </div>
          </button>
        </div>

        {/* Right: Quantified Counterfactual Results */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Metric 1: Alveolar Deposition Spared */}
            <div className="bg-obs-950/80 p-4 rounded-xl border border-white/[0.06] flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Alveolar PM2.5 Spared
              </span>
              <div className="my-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono num-metric">
                  {impact.pm25AvoidedUg.toLocaleString()}
                </span>
                <span className="text-xs font-mono text-slate-400 ml-1">µg</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400/90">
                Prevented from capillary entry
              </span>
            </div>

            {/* Metric 2: Secondhand Cigarette Equivalent */}
            <div className="bg-obs-950/80 p-4 rounded-xl border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-mono uppercase tracking-wider">Cigarette Equivalent</span>
                <Cigarette className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="my-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono num-metric">
                  {impact.cigarettesAvoided}
                </span>
                <span className="text-xs font-mono text-slate-400 ml-1">cigs</span>
              </div>
              <span className="text-[10px] font-mono text-amber-400/90">
                Berkeley Earth toxic equivalence
              </span>
            </div>

            {/* Metric 3: Tailpipe Carbon Offset */}
            <div className="bg-obs-950/80 p-4 rounded-xl border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-mono uppercase tracking-wider">Emissions Abated</span>
                <Leaf className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <div className="my-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono num-metric">
                  {impact.co2SavedG}
                </span>
                <span className="text-xs font-mono text-slate-400 ml-1">g CO₂</span>
              </div>
              <span className="text-[10px] font-mono text-teal-400/90">
                +1.4g VOC tailpipe reduction
              </span>
            </div>
          </div>

          {/* Biological Pathophysiology Insight */}
          <div className="bg-obs-950/60 p-4 rounded-xl border border-white/[0.06]">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2 mb-1.5 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Pulmonary Pathophysiology: PM2.5 Alveolar Translocation</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Coarse dust (&gt;10 µm) is arrested in the nasal cavity. Winter combustion smog particulates (&lt;2.5 µm) penetrate deeply into the pulmonary alveoli, translocating directly across the alveolar-capillary membrane into systemic circulation. This triggers acute arterial vasoconstriction, elevated platelet activation, and bronchial inflammation. Your protocol shields cardiovascular integrity during peak stagnation hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
