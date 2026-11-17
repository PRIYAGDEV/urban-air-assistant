import React, { useState } from 'react';
import { 
  Sparkles, 
  Cigarette, 
  Leaf, 
  HeartHandshake, 
  CheckSquare, 
  Square, 
  HelpCircle,
  Activity,
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
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Science-Based Impact & Counterfactual Simulator</h2>
            <p className="text-xs text-slate-400">
              Calculate the biological & community outcomes of your daily behavioral shifts
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-teal-950 text-teal-300 border border-teal-500/30 flex items-center gap-1.5 w-fit">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          Berkeley Earth & WHO Model Grounded
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Intervention Toggles */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Simulate Your Interventions Today:
          </div>

          {/* Toggle 1: N95 Mask during Commute */}
          <button
            onClick={() => setN95Active(!n95Active)}
            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
              n95Active
                ? 'bg-slate-950/90 border-emerald-500/50 ring-1 ring-emerald-500/30'
                : 'bg-slate-950/40 border-slate-800 text-slate-400'
            }`}
          >
            {n95Active ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-xs font-bold text-white">Wear certified N95 during commute</div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Filters 95%+ of ultrafine PM2.5 in heavy traffic compared to 20% in cloth masks.
              </p>
            </div>
          </button>

          {/* Toggle 2: Sealed Bedroom Sanctuary */}
          <button
            onClick={() => setSanctuaryActive(!sanctuaryActive)}
            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
              sanctuaryActive
                ? 'bg-slate-950/90 border-emerald-500/50 ring-1 ring-emerald-500/30'
                : 'bg-slate-950/40 border-slate-800 text-slate-400'
            }`}
          >
            {sanctuaryActive ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-xs font-bold text-white">Sealed Bedroom Sanctuary (8-hr sleep)</div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Damp-cloth gap seal or DIY fan box keeping bedroom particulate below 45 µg/m³.
              </p>
            </div>
          </button>

          {/* Toggle 3: Commute Shift to Transit */}
          <button
            onClick={() => setCommuteShift(!commuteShift)}
            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
              commuteShift
                ? 'bg-slate-950/90 border-emerald-500/50 ring-1 ring-emerald-500/30'
                : 'bg-slate-950/40 border-slate-800 text-slate-400'
            }`}
          >
            {commuteShift ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-xs font-bold text-white">Switch 10km Commute to Metro Transit</div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Reduces direct road plume inhalation and eliminates motorcycle combustion exhaust.
              </p>
            </div>
          </button>
        </div>

        {/* Right: Counterfactual Impact Metrics & Biological Education */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Metric 1: PM2.5 Inhaled Particle Shielding */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-medium text-slate-400">PM2.5 Lung Deposition Avoided</span>
              <div className="my-2">
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {impact.pm25AvoidedUg.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 ml-1">µg</span>
              </div>
              <span className="text-[10px] text-emerald-500/90 font-medium">
                Prevented from reaching alveoli
              </span>
            </div>

            {/* Metric 2: Secondhand Cigarette Equivalent */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-medium">Equiv. Cigarettes Avoided</span>
                <Cigarette className="w-4 h-4 text-amber-400" />
              </div>
              <div className="my-2">
                <span className="text-2xl sm:text-3xl font-black text-amber-400">
                  {impact.cigarettesAvoided}
                </span>
                <span className="text-xs text-slate-400 ml-1">cigs</span>
              </div>
              <span className="text-[10px] text-amber-500/90 font-medium">
                Based on Berkeley Earth ratio
              </span>
            </div>

            {/* Metric 3: Community Tailpipe Emissions Offset */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-medium">Community Emission Offset</span>
                <Leaf className="w-4 h-4 text-teal-400" />
              </div>
              <div className="my-2">
                <span className="text-2xl sm:text-3xl font-black text-teal-400">
                  {impact.co2SavedG}
                </span>
                <span className="text-xs text-slate-400 ml-1">g CO₂</span>
              </div>
              <span className="text-[10px] text-teal-400/90 font-medium">
                +1.4g direct VOC reduction
              </span>
            </div>
          </div>

          {/* Biological Mechanism Education Card */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-1.5">
              <span>The Science Behind Your Lungs: PM2.5 Alveolar Penetration</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Coarse dust (&gt;10 µm) is trapped by nasal hairs and mucous membranes. In contrast, winter smog particulates (&lt;2.5 µm) travel unimpeded into terminal bronchioles and enter lung capillary circulation. This triggers systemic oxidative stress, blood vessel constriction, and acute bronchial hyper-reactivity. Your actions today shield your cardiovascular system from this acute inflammatory cascade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
