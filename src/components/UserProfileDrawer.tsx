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
    <section className="bg-white rounded-xl border border-[#DBEAFE] p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#DBEAFE]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E9EEF6] border border-[#DBEAFE] flex items-center justify-center text-[#1E40AF]">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#1E3A8A] font-sans">
                Household Context &amp; Vulnerability Matrix
              </h2>
              <span className="text-xs font-semibold text-[#475569] bg-[#E9EEF6] px-2 py-0.5 rounded border border-[#DBEAFE]">
                पारिवारिक स्थिति
              </span>
            </div>
            <p className="text-xs text-[#475569] font-sans mt-0.5">
              Calibrates exposure indices, filter turnover rates, and scheduled interventions
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-[#475569]">
          Active Profile: <strong className="text-[#1E40AF]">{profile.name}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Socioeconomic Resource Tier */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-[#1E3A8A] flex items-center gap-1.5 uppercase tracking-wider">
            <Coins className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Economic Resource Tier</span>
          </label>
          <div className="grid grid-cols-3 gap-1 bg-[#F8FAFC] p-1 rounded-lg border border-[#DBEAFE]">
            {[
              { id: 'tier1_zero_cost', label: 'Zero-Cost', desc: 'Behavioral' },
              { id: 'tier2_low_cost', label: 'Low-Cost', desc: '< $20 DIY' },
              { id: 'tier3_appliance', label: 'Appliance', desc: 'HEPA unit' }
            ].map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => onChange({ ...profile, socioeconomicTier: tier.id as SocioeconomicTier })}
                className={`py-2 px-1 text-center rounded-lg text-xs font-mono transition-all min-h-[44px] ${
                  profile.socioeconomicTier === tier.id
                    ? 'bg-[#1E40AF] text-white font-bold shadow-xs'
                    : 'text-[#475569] hover:text-[#1E3A8A] hover:bg-white'
                }`}
              >
                <div className="text-[11px] font-bold">{tier.label}</div>
                <div className="text-[9px] opacity-80 font-normal">{tier.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Health Vulnerabilities */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-[#1E3A8A] flex items-center gap-1.5 uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Pulmonary &amp; Health Condition</span>
          </label>
          <div className="relative">
            <select
              value={profile.vulnerability}
              onChange={(e) => onChange({ ...profile, vulnerability: e.target.value as VulnerabilityCondition })}
              className="w-full bg-[#F8FAFC] border border-[#DBEAFE] rounded-lg px-3 py-2.5 text-xs text-[#1E3A8A] font-semibold focus:ring-2 focus:ring-[#3B82F6] focus:outline-none cursor-pointer appearance-none pr-8 min-h-[44px]"
            >
              <option value="none">Healthy / General Adult</option>
              <option value="asthma">Asthma / Hyper-reactive Bronchi</option>
              <option value="copd">COPD / Chronic Bronchitis</option>
              <option value="cardiovascular">Cardiovascular / Hypertension</option>
              <option value="pregnant">Maternal / Pregnant Resident</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#475569] absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Household Composition */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-[#1E3A8A] flex items-center gap-1.5 uppercase tracking-wider">
            <User className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Household Composition</span>
          </label>
          <div className="relative">
            <select
              value={profile.householdType}
              onChange={(e) => onChange({ ...profile, householdType: e.target.value as HouseholdType })}
              className="w-full bg-[#F8FAFC] border border-[#DBEAFE] rounded-lg px-3 py-2.5 text-xs text-[#1E3A8A] font-semibold focus:ring-2 focus:ring-[#3B82F6] focus:outline-none cursor-pointer appearance-none pr-8 min-h-[44px]"
            >
              <option value="single">Single Individual</option>
              <option value="couple">Adult Couple</option>
              <option value="family_with_infants">Infants / Children (&lt;5 yrs)</option>
              <option value="family_with_elderly">Senior Citizens (&gt;65 yrs)</option>
              <option value="multi_generation">Multi-generational Household</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#475569] absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Housing Typology */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-[#1E3A8A] flex items-center gap-1.5 uppercase tracking-wider">
            <Home className="w-3.5 h-3.5 text-[#1E40AF]" />
            <span>Building Envelope &amp; Sealing</span>
          </label>
          <div className="relative">
            <select
              value={profile.housingType}
              onChange={(e) => onChange({ ...profile, housingType: e.target.value as HousingTypology })}
              className="w-full bg-[#F8FAFC] border border-[#DBEAFE] rounded-lg px-3 py-2.5 text-xs text-[#1E3A8A] font-semibold focus:ring-2 focus:ring-[#3B82F6] focus:outline-none cursor-pointer appearance-none pr-8 min-h-[44px]"
            >
              <option value="informal_unsealed">High Draft / Perimeter Window Gaps</option>
              <option value="standard_apartment_drafty">Standard Apartment (Single glazed, slight leaks)</option>
              <option value="modern_sealed_double_glazed">Modern Double-Glazed / Weather-stripped</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#475569] absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Commute Mode */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-[#1E3A8A] flex items-center gap-1.5 uppercase tracking-wider">
            <Bike className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Primary Commute Route</span>
          </label>
          <div className="relative">
            <select
              value={profile.commuteMode}
              onChange={(e) => onChange({ ...profile, commuteMode: e.target.value as CommuteMode })}
              className="w-full bg-[#F8FAFC] border border-[#DBEAFE] rounded-lg px-3 py-2.5 text-xs text-[#1E3A8A] font-semibold focus:ring-2 focus:ring-[#3B82F6] focus:outline-none cursor-pointer appearance-none pr-8 min-h-[44px]"
            >
              <option value="walking">Walking / Foot Commute</option>
              <option value="bicycle">Bicycle (Aerobic Inhalation Spike)</option>
              <option value="two_wheeler_motorcycle">Motorcycle / Scooter (Direct Exhaust Plume)</option>
              <option value="open_auto_bus">Open Bus / Auto-Rickshaw</option>
              <option value="metro_transit">Underground AC Metro Transit (Filtered)</option>
              <option value="sealed_car">Private Vehicle (Cabin Recirculation)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#475569] absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Cooking Fuel & Purifier Asset */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-[#1E3A8A] flex items-center gap-1.5 uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Kitchen Fuel &amp; Purifier Asset</span>
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <select
                value={profile.cookingFuel}
                onChange={(e) => onChange({ ...profile, cookingFuel: e.target.value as UserProfile['cookingFuel'] })}
                className="w-full bg-[#F8FAFC] border border-[#DBEAFE] rounded-lg px-3 py-2.5 text-xs text-[#1E3A8A] font-semibold focus:ring-2 focus:ring-[#3B82F6] focus:outline-none cursor-pointer appearance-none pr-8 min-h-[44px]"
              >
                <option value="lpg_piped">LPG / Piped Gas</option>
                <option value="electric_induction">Electric Induction Stove</option>
                <option value="biomass_wood">Biomass / Firewood Chulha</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#475569] absolute right-3 top-3.5 pointer-events-none" />
            </div>

            <button
              type="button"
              onClick={() => onChange({ ...profile, hasPurifier: !profile.hasPurifier })}
              className={`px-3 py-2.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 transition-all min-h-[44px] ${
                profile.hasPurifier
                  ? 'bg-[#1E40AF] border-[#1E40AF] text-white shadow-xs'
                  : 'bg-[#F8FAFC] border-[#DBEAFE] text-[#475569] hover:text-[#1E3A8A]'
              }`}
              title="Toggle mechanical HEPA unit ownership"
            >
              <Check className={`w-3.5 h-3.5 ${profile.hasPurifier ? 'text-white' : 'opacity-30'}`} />
              <span>HEPA Asset</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
