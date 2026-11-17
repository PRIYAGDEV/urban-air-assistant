import React from 'react';
import { 
  User, 
  Heart, 
  Home, 
  Coins, 
  Bike, 
  Flame, 
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { UserProfile, HouseholdType, VulnerabilityCondition, HousingTypology, SocioeconomicTier, CommuteMode } from '../types';

interface UserProfileDrawerProps {
  profile: UserProfile;
  onChange: (updated: UserProfile) => void;
}

export const UserProfileDrawer: React.FC<UserProfileDrawerProps> = ({ profile, onChange }) => {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Personal Context & Constraints</h2>
            <p className="text-xs text-slate-400">Tailors low-emission routines and indoor hacks to your family & budget</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Socioeconomic Resource Tier */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>Socioeconomic Resource Tier</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {[
              { id: 'tier1_zero_cost', label: 'Zero-Cost', desc: 'Behavioral only' },
              { id: 'tier2_low_cost', label: 'Low-Cost DIY', desc: '< $20 Hacks' },
              { id: 'tier3_appliance', label: 'Appliance', desc: 'HEPA / HVAC' }
            ].map((tier) => (
              <button
                key={tier.id}
                onClick={() => onChange({ ...profile, socioeconomicTier: tier.id as SocioeconomicTier })}
                className={`py-2 px-1 text-center rounded-lg text-xs font-medium transition-all ${
                  profile.socioeconomicTier === tier.id
                    ? 'bg-emerald-600 text-white shadow-md font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div>{tier.label}</div>
                <div className="text-[10px] opacity-75 font-normal">{tier.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Health Vulnerabilities */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Health & Pulmonary Vulnerabilities</span>
          </label>
          <select
            value={profile.vulnerability}
            onChange={(e) => onChange({ ...profile, vulnerability: e.target.value as VulnerabilityCondition })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none cursor-pointer"
          >
            <option value="none">Healthy / General Population</option>
            <option value="asthma">Asthma / Hyper-reactive Airways</option>
            <option value="copd">COPD / Chronic Bronchitis</option>
            <option value="cardiovascular">Cardiovascular Condition / Hypertension</option>
            <option value="pregnant">Pregnant Household Member</option>
          </select>
        </div>

        {/* Household Cohort */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span>Household Composition</span>
          </label>
          <select
            value={profile.householdType}
            onChange={(e) => onChange({ ...profile, householdType: e.target.value as HouseholdType })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none cursor-pointer"
          >
            <option value="single">Single Individual</option>
            <option value="couple">Adult Couple</option>
            <option value="family_with_infants">Family with Toddlers / Infants (&lt;5 yrs)</option>
            <option value="family_with_elderly">Family with Senior Citizens (&gt;65 yrs)</option>
            <option value="multi_generation">Multi-generational Household</option>
          </select>
        </div>

        {/* Housing Fabric */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-indigo-400" />
            <span>Housing Typology & Sealing</span>
          </label>
          <select
            value={profile.housingType}
            onChange={(e) => onChange({ ...profile, housingType: e.target.value as HousingTypology })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none cursor-pointer"
          >
            <option value="informal_unsealed">Informal / High Draft (Perimeter gaps)</option>
            <option value="standard_apartment_drafty">Standard Apartment (Single glazed, slight leaks)</option>
            <option value="modern_sealed_double_glazed">Modern Double-Glazed / Sealed Windows</option>
          </select>
        </div>

        {/* Commute Mode */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Bike className="w-3.5 h-3.5 text-emerald-400" />
            <span>Primary Commute Mode</span>
          </label>
          <select
            value={profile.commuteMode}
            onChange={(e) => onChange({ ...profile, commuteMode: e.target.value as CommuteMode })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none cursor-pointer"
          >
            <option value="walking">Walking / Outdoor Foot Commute</option>
            <option value="bicycle">Bicycle (High Cardio Exertion)</option>
            <option value="two_wheeler_motorcycle">Motorcycle / Scooter (Direct Plume Exposure)</option>
            <option value="open_auto_bus">Open Bus / Auto-Rickshaw</option>
            <option value="metro_transit">AC Underground Metro Transit (Safest)</option>
            <option value="sealed_car">Private Car (Cabin Recirculation)</option>
          </select>
        </div>

        {/* Cooking Fuel & Purifier Asset */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Indoor Cooking Fuel & Assets</span>
          </label>
          <div className="flex items-center gap-2">
            <select
              value={profile.cookingFuel}
              onChange={(e) => onChange({ ...profile, cookingFuel: e.target.value as any })}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none cursor-pointer"
            >
              <option value="lpg_piped">LPG Gas / Piped Natural Gas</option>
              <option value="electric_induction">Electric Induction Stove</option>
              <option value="biomass_wood">Biomass / Firewood / Coal Chulha</option>
            </select>

            <button
              onClick={() => onChange({ ...profile, hasPurifier: !profile.hasPurifier })}
              className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                profile.hasPurifier
                  ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle if you own a mechanical HEPA purifier"
            >
              <Check className={`w-3.5 h-3.5 ${profile.hasPurifier ? 'opacity-100' : 'opacity-30'}`} />
              <span>Purifier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
