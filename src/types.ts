export type AQICategory = 'Good' | 'Moderate' | 'Poor' | 'Severe' | 'Hazardous' | 'Unhealthy for Sensitive' | 'Unhealthy' | 'Very Unhealthy';

export interface AirQualityData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  aqi: number;
  category: AQICategory;
  color: string;
  pm25: number; // ug/m3
  pm10: number; // ug/m3
  no2: number; // ug/m3
  ozone: number; // ug/m3
  temperature: number | null; // Celsius or null if unavailable
  humidity: number | null; // % or null if unavailable
  windSpeed: number | null; // km/h or null if unavailable
  boundaryLayerHeight: number; // meters
  thermalInversionActive: boolean;
  optimalVentilationWindow: {
    start: string;
    end: string;
    reason: string;
    currentSafe: boolean;
  };
  hourly: {
    time: string;
    hourLabel: string;
    pm25: number;
    aqi: number;
    isVentilationWindow?: boolean;
  }[];
  isLive?: boolean;
  isDemoData?: boolean;
  errorMessage?: string;
  lastFetchError?: string;
  weatherUnavailable?: boolean;
  weatherError?: string;
}

export type HouseholdType = 
  | 'single' 
  | 'couple' 
  | 'family_with_infants' 
  | 'family_with_elderly' 
  | 'multi_generation';

export type VulnerabilityCondition = 
  | 'none' 
  | 'asthma' 
  | 'copd' 
  | 'cardiovascular' 
  | 'pregnant' 
  | 'allergic_rhinitis';

export type HousingTypology = 
  | 'informal_unsealed' 
  | 'standard_apartment_drafty' 
  | 'modern_sealed_double_glazed';

export type SocioeconomicTier = 
  | 'tier1_zero_cost' 
  | 'tier2_low_cost' 
  | 'tier3_appliance';

export type CommuteMode = 
  | 'walking' 
  | 'bicycle' 
  | 'two_wheeler_motorcycle' 
  | 'open_auto_bus' 
  | 'metro_transit' 
  | 'sealed_car';

export interface UserProfile {
  name: string;
  householdType: HouseholdType;
  vulnerability: VulnerabilityCondition;
  housingType: HousingTypology;
  socioeconomicTier: SocioeconomicTier;
  commuteMode: CommuteMode;
  cookingFuel: 'lpg_piped' | 'biomass_wood' | 'electric_induction';
  hasPurifier: boolean;
}

export interface ActionCard {
  id: string;
  timeSlot: string;
  title: string;
  category: 'ventilation' | 'commute' | 'indoor_hack' | 'night_prep' | 'community';
  action: string;
  scienceRationale: string;
  impactBadge: string;
  socioeconomicTier: 'zero_cost' | 'low_cost' | 'advanced';
  urgency: 'high' | 'medium' | 'info';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  impactMetrics?: {
    pm25AvoidedUg?: number;
    secondhandCigarettesAvoided?: number;
    co2SavedG?: number;
  };
}

export interface CityPreset {
  name: string;
  country: string;
  lat: number;
  lon: number;
  regionDescription: string;
}
