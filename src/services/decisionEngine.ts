import { AirQualityData, UserProfile, ActionCard } from '../types';

export function calculateOERI(airData: AirQualityData, profile: UserProfile): { score: number; level: 'Low' | 'Moderate' | 'High' | 'Severe' | 'Extreme' } {
  const pm25 = airData.pm25;
  const no2 = airData.no2;

  // WHO reference baselines
  const basePm25 = 15;
  const baseNo2 = 25;

  let vulnFactor = 1.0;
  if (profile.vulnerability === 'asthma' || profile.vulnerability === 'copd') {
    vulnFactor = 1.9;
  } else if (profile.vulnerability === 'cardiovascular') {
    vulnFactor = 1.6;
  } else if (profile.vulnerability === 'pregnant') {
    vulnFactor = 1.5;
  }

  if (profile.householdType === 'family_with_infants' || profile.householdType === 'family_with_elderly') {
    vulnFactor = Math.max(vulnFactor, 1.4);
  }

  let exertionFactor = 1.0;
  if (profile.commuteMode === 'bicycle' || profile.commuteMode === 'walking') {
    exertionFactor = 2.4;
  } else if (profile.commuteMode === 'two_wheeler_motorcycle') {
    exertionFactor = 1.7;
  } else if (profile.commuteMode === 'open_auto_bus') {
    exertionFactor = 1.4;
  } else {
    exertionFactor = 1.0; // metro transit or sealed car
  }

  const rawScore = ((pm25 / basePm25) * 0.75 + (no2 / baseNo2) * 0.25) * vulnFactor * (exertionFactor * 0.35);
  const score = Math.min(10, Math.round(rawScore * 10) / 10);

  let level: 'Low' | 'Moderate' | 'High' | 'Severe' | 'Extreme' = 'Low';
  if (score > 8.0) level = 'Extreme';
  else if (score > 6.0) level = 'Severe';
  else if (score > 4.0) level = 'High';
  else if (score > 2.0) level = 'Moderate';

  return { score, level };
}

export function generateActionCards(airData: AirQualityData, profile: UserProfile): ActionCard[] {
  const cards: ActionCard[] = [];
  const isSevere = airData.aqi >= 200;
  const isTier1 = profile.socioeconomicTier === 'tier1_zero_cost';
  const isTier2 = profile.socioeconomicTier === 'tier2_low_cost';

  // 1. Morning Routine Card (07:00 - 09:30 AM)
  if (airData.thermalInversionActive) {
    cards.push({
      id: 'morning_inversion',
      timeSlot: '07:00 AM – 09:30 AM',
      category: 'commute',
      title: 'Morning Thermal Inversion Lockdown',
      action: profile.commuteMode === 'two_wheeler_motorcycle' || profile.commuteMode === 'bicycle' || profile.commuteMode === 'walking'
        ? 'Wear a snug-fit N95 respirator. If possible, delay your departure until 09:45 AM when solar heating initiates surface air dispersion.'
        : 'Ensure public transit or vehicle windows are fully closed; set cabin air intake to Recirculation mode.',
      scienceRationale: 'Cold surface air trapped under a warm boundary layer caps pollutants within the lowest 200m of the city. Ground concentrations are at their diurnal peak.',
      impactBadge: 'Reduces acute morning PM2.5 inhalation by 82%',
      socioeconomicTier: isTier1 ? 'zero_cost' : 'low_cost',
      urgency: isSevere ? 'high' : 'medium'
    });
  }

  // 2. Midday Ventilation Window Card (01:30 - 03:00 PM)
  cards.push({
    id: 'midday_ventilation',
    timeSlot: `${airData.optimalVentilationWindow.start} – ${airData.optimalVentilationWindow.end}`,
    category: 'ventilation',
    title: 'Controlled Air-Exchange Window',
    action: airData.aqi > 350
      ? 'Extreme smog: Keep external windows sealed. Crack internal corridor doors for 15 minutes only to prevent CO2 buildup without admitting particulate.'
      : 'Open opposite windows for a brisk 20-minute cross-breeze to flush trapped indoor CO2 and cooking gases, then tightly re-seal before 4:30 PM.',
    scienceRationale: airData.optimalVentilationWindow.reason,
    impactBadge: 'Prevents indoor CO2 > 1200 ppm while keeping PM2.5 stable',
    socioeconomicTier: 'zero_cost',
    urgency: 'medium'
  });

  // 3. Indoor Air Quality Hack Card (Customized by Socioeconomic Tier & Housing)
  if (isTier1) {
    cards.push({
      id: 'indoor_tier1',
      timeSlot: 'Throughout the Day',
      category: 'indoor_hack',
      title: 'Zero-Cost "Clean Air Sanctuary" Hack',
      action: 'Designate your inner bedroom as the sealed safe zone. Place a rolled damp towel across the bottom of the balcony door, and damp-mop floors twice daily instead of sweeping with a dry broom.',
      scienceRationale: 'Dry brooms aerosolize settled sub-micron particles, increasing indoor PM2.5 by up to 300%. Damp fabric absorbs particulate electrostatic charges and seals negative-pressure draft gaps.',
      impactBadge: 'Cuts resuspended indoor dust by 74%',
      socioeconomicTier: 'zero_cost',
      urgency: 'high'
    });
  } else if (isTier2) {
    cards.push({
      id: 'indoor_tier2',
      timeSlot: 'Continuous Protection',
      category: 'indoor_hack',
      title: 'DIY Corsi-Rosenthal Box Deployment',
      action: 'Affix a MERV-13 furnace filter to a standard 20-inch box fan with duct tape. Run it in the center of the main family room on medium speed.',
      scienceRationale: 'Delivers a Clean Air Delivery Rate (CADR) of 200–280 CFM at 1/5th the capital cost of commercial purifiers, capturing 92% of airborne PM2.5 within 45 minutes.',
      impactBadge: 'CADR ~240 CFM for under $20',
      socioeconomicTier: 'low_cost',
      urgency: 'high'
    });
  } else {
    cards.push({
      id: 'indoor_tier3',
      timeSlot: 'Continuous Filtration',
      category: 'indoor_hack',
      title: 'HEPA Purifier & Airflow Optimization',
      action: 'Elevate your HEPA purifier 1 foot off the ground away from corners. Run your ceiling fan on low clockwise speed to distribute cleaned air without kicking up carpet dust.',
      scienceRationale: 'Placing purifiers in dead corners reduces effective room air turnover by 40%. Gentle stratification mixing ensures homogeneous filtration.',
      impactBadge: 'Maximizes effective CADR by +35%',
      socioeconomicTier: 'advanced',
      urgency: 'medium'
    });
  }

  // 4. Evening Cooking & Commute Card
  cards.push({
    id: 'evening_cooking',
    timeSlot: '06:00 PM – 08:30 PM',
    category: 'indoor_hack',
    title: 'Low-Emission Cooking Protocol',
    action: profile.cookingFuel === 'biomass_wood'
      ? 'Cook outdoors or near an open leeward patio; avoid burning damp wood or plastic scraps. Cover pots with lids to cook faster and cut fuel use by 30%.'
      : 'Keep the kitchen door closed to the rest of the living quarters while frying or boiling. Run the range exhaust hood and leave it running for 10 minutes post-cooking.',
    scienceRationale: 'Cooking oil aerosolization and biomass combustion generate high localized peaks of ultrafine particles and acrolein, reaching PM2.5 > 600 ug/m3 in unventilated kitchens.',
    impactBadge: 'Shields resting areas from kitchen smoke spikes',
    socioeconomicTier: isTier1 ? 'zero_cost' : 'low_cost',
    urgency: 'medium'
  });

  // 5. Night Bedroom Sanctuary Card
  cards.push({
    id: 'night_sanctuary',
    timeSlot: '09:30 PM – 07:00 AM',
    category: 'night_prep',
    title: 'Nocturnal Lung Rest Sanctuary',
    action: 'Close all external bedroom windows. If using a space heater, use oil/ceramic radiation rather than unvented combustion heaters. Sleep with head elevated if experiencing mild throat irritation.',
    scienceRationale: 'Humans breathe 7–8 hours continuously while asleep. Nocturnal thermal inversions trap industrial and vehicular cooling exhaust nearest to ground level.',
    impactBadge: 'Saves ~2,100 liters of toxic air inhalation during sleep',
    socioeconomicTier: 'zero_cost',
    urgency: 'high'
  });

  return cards;
}

export function calculateCounterfactualImpact(params: {
  commuteModeShift: boolean;
  maskUsageN95: boolean;
  indoorSanctuaryActive: boolean;
  basePm25: number;
}) {
  let pm25AvoidedUg = 0;
  let co2SavedG = 0;

  // Assuming 12,000 Liters of air breathed per day (approx 8.3 L/min)
  // Commute exposure: ~60 mins outdoors in high traffic
  if (params.maskUsageN95) {
    // N95 filters 95% of PM2.5 during 1 hr outdoor transit (500L air * (basePm25 * 1.5))
    pm25AvoidedUg += Math.round(500 * (params.basePm25 * 1.5) * 0.95 / 1000);
  }

  if (params.indoorSanctuaryActive) {
    // 8 hrs sleep in 40 ug/m3 bedroom vs 250 ug/m3 unsealed home
    const delta = Math.max(0, params.basePm25 - 45);
    pm25AvoidedUg += Math.round(4000 * delta / 1000);
  }

  if (params.commuteModeShift) {
    // Switching from 10km motorbike to metro transit
    co2SavedG += 720;
    pm25AvoidedUg += 45; // reduced direct vehicular tailpipe plume inhalation
  }

  // 22 ug/m3 24h PM2.5 roughly equates to 1 cigarette (Berkeley Earth)
  // Approx 1 cigarette ~ 12,000 ug inhaled particulate equivalence
  const cigarettesAvoided = Math.round((pm25AvoidedUg / 350) * 10) / 10;

  return {
    pm25AvoidedUg,
    cigarettesAvoided: Math.max(0.2, cigarettesAvoided),
    co2SavedG
  };
}
