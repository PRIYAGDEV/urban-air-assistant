import React from 'react';
import { 
  User, 
  Heart, 
  Home, 
  Coins, 
  Bike, 
  Flame, 
  SlidersHorizontal,
  Check,
  ChevronDown
} from 'lucide-react';
import { UserProfile, HouseholdType, VulnerabilityCondition, HousingTypology, SocioeconomicTier, CommuteMode } from '../types';

interface UserProfileDrawerProps {
  profile: UserProfile;
  onChange: (updated: UserProfile) => void;
}

export const UserProfileDrawer: React.FC<UserProfileDrawerProps> = ({ profile, onChange }) => {
  return (
    <section className="cinematic-panel rounded-2xl p-5 sm:p-6 border border-white/[0.08] transition-all">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.07] mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-obs-850 border border-white/[0.08] flex items-center justify-center text-emerald-400">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white font-sans">
              Household Context &amp; Vulnerability Matrix
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Calibrates exposure indices, filter calculations, and timed interventions
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Active Profile: {profile.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Socioeconomic Resource Tier */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>Economic Resource Tier</span>
          </label>
          <div className="grid grid-cols-3 gap-1 bg-obs-950 p-1 rounded-xl border border-white/[0.06]">
            {[
              { id: 'tier1_zero_cost', label: 'Zero-Cost', desc: 'Behavioral' },
              { id: 'tier2_low_cost', label: 'Low-Cost', desc: '< $20 DIY' },
              { id: 'tier3_appliance', label: 'Appliance', desc: 'HEPA unit' }
            ].map((tier) => (
              <button
                key={tier.id}
                onClick={() => onChange({ ...profile, socioeconomicTier: tier.id as SocioeconomicTier })}
                className={`py-2 px-1 text-center rounded-lg text-xs font-mono transition-all ${
                  profile.socioeconomicTier === tier.id
                    ? 'bg-obs-800 text-white border border-white/[0.1] font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-obs-900'
                }`}
              >
                <div className="text-[11px]">{tier.label}</div>
                <div className="text-[9px] opacity-70 font-normal">{tier.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Health Vulnerabilities */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Pulmonary &amp; Cardiac Vulnerability</span>
          </label>
          <div className="relative">
            <select
              value={profile.vulnerability}
              onChange={(e) => onChange({ ...profile, vulnerability: e.target.value as VulnerabilityCondition })}
              className="w-full bg-obs-950 border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-slate-200 font-sans focus:ring-1 focus:ring-emerald-500/50 focus:outline-none cursor-pointer appearance-none pr-8"
            >
              <option value="none">Healthy / General Adult</option>
              <option value="asthma">Asthma / Hyper-reactive Bronchi</option>
              <option value="copd">COPD / Chronic Bronchitis</option>
              <option value="cardiovascular">Cardiovascular / Hypertension</option>
              <option value="pregnant">Maternal / Pregnant Resident</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Household Composition */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <User className="w-3.5 h-3.5 text-sky-400" />
            <span>Household Composition</span>
          </label>
          <div className="relative">
            <select
              value={profile.householdType}
              onChange={(e) => onChange({ ...profile, householdType: e.target.value as HouseholdType })}
              className="w-full bg-obs-950 border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-slate-200 font-sans focus:ring-1 focus:ring-emerald-500/50 focus:outline-none cursor-pointer appearance-none pr-8"
            >
              <option value="single">Single Individual</option>
              <option value="couple">Adult Couple</option>
              <option value="family_with_infants">Infants / Children (&lt;5 yrs)</option>
              <option value="family_with_elderly">Senior Citizens (&gt;65 yrs)</option>
              <option value="multi_generation">Multi-generational Household</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Housing Typology */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Home className="w-3.5 h-3.5 text-indigo-400" />
            <span>Building Envelope &amp; Leakage</span>
          </label>
          <div className="relative">
            <select
              value={profile.housingType}
              onChange={(e) => onChange({ ...profile, housingType: e.target.value as HousingTypology })}
              className="w-full bg-obs-950 border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-slate-200 font-sans focus:ring-1 focus:ring-emerald-500/50 focus:outline-none cursor-pointer appearance-none pr-8"
            >
              <option value="informal_unsealed">High Draft / Perimeter Window Gaps</option>
              <option value="standard_apartment_drafty">Standard Apartment (Single glazed, slight leaks)</option>
              <option value="modern_sealed_double_glazed">Modern Double-Glazed / Weather-stripped</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Commute Mode */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Bike className="w-3.5 h-3.5 text-emerald-400" />
            <span>Primary Commute Route</span>
          </label>
          <div className="relative">
            <select
              value={profile.commuteMode}
              onChange={(e) => onChange({ ...profile, commuteMode: e.target.value as CommuteMode })}
              className="w-full bg-obs-950 border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-slate-200 font-sans focus:ring-1 focus:ring-emerald-500/50 focus:outline-none cursor-pointer appearance-none pr-8"
            >
              <option value="walking">Walking / Outdoor Foot Commute</option>
              <option value="bicycle">Bicycle (Aerobic Inhalation Spike)</option>
              <option value="two_wheeler_motorcycle">Motorcycle / Scooter (Direct Exhaust Plume)</option>
              <option value="open_auto_bus">Open Bus / Auto-Rickshaw</option>
              <option value="metro_transit">Underground AC Metro Transit (Filtered)</option>
              <option value="sealed_car">Private Vehicle (Cabin Recirculation)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Indoor Cooking & Asset Switch */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Indoor Kitchen Fuel &amp; Purifier</span>
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <select
                value={profile.cookingFuel}
                onChange={(e) => onChange({ ...profile, cookingFuel: e.target.value as any })}
                className="w-full bg-obs-950 border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-slate-200 font-sans focus:ring-1 focus:ring-emerald-500/50 focus:outline-none cursor-pointer appearance-none pr-8"
              >
                <option value="lpg_piped">LPG / Piped Gas</option>
                <option value="electric_induction">Electric Induction Stove</option>
                <option value="biomass_wood">Biomass / Firewood Chulha</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>

            <button
              type="button"
              onClick={() => onChange({ ...profile, hasPurifier: !profile.hasPurifier })}
              className={`px-3 py-2.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
                profile.hasPurifier
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-obs-950 border-white/[0.08] text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle mechanical HEPA unit ownership"
            >
              <Check className={`w-3.5 h-3.5 ${profile.hasPurifier ? 'text-emerald-400' : 'opacity-20'}`} />
              <span>HEPA Asset</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
