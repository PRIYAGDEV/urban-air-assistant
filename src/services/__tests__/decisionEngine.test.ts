import { describe, it, expect } from 'vitest';
import {
  calculateOERI,
  generateActionCards,
  calculateCounterfactualImpact
} from '../decisionEngine';
import { AirQualityData, UserProfile } from '../../types';

describe('decisionEngine — Scientific Exposure Risk & Personalized Action Rules', () => {
  const mockAirData: AirQualityData = {
    city: 'Delhi NCR',
    country: 'India',
    latitude: 28.61,
    longitude: 77.20,
    timestamp: '19:40',
    aqi: 385,
    category: 'Hazardous',
    color: '#7F1D1D',
    pm25: 288,
    pm10: 412,
    no2: 68,
    ozone: 32,
    temperature: 19,
    humidity: 62,
    windSpeed: 6,
    boundaryLayerHeight: 250,
    thermalInversionActive: true,
    optimalVentilationWindow: {
      start: '13:30',
      end: '15:15',
      reason: 'Boundary layer expansion',
      currentSafe: false
    },
    hourly: [],
    isLive: true,
    isDemoData: false
  };

  const defaultProfile: UserProfile = {
    name: 'Priyag',
    vulnerability: 'none',
    householdType: 'single',
    housingType: 'standard_apartment_drafty',
    commuteMode: 'metro_transit',
    cookingFuel: 'lpg_piped',
    socioeconomicTier: 'tier1_zero_cost',
    hasPurifier: false
  };

  describe('calculateOERI (Operational Exposure Risk Index)', () => {
    it('computes higher risk score for vulnerable individuals (asthma / copd)', () => {
      const generalResult = calculateOERI(mockAirData, defaultProfile);
      const asthmaResult = calculateOERI(mockAirData, {
        ...defaultProfile,
        vulnerability: 'asthma'
      });

      expect(asthmaResult.score).toBeGreaterThan(generalResult.score);
      expect(asthmaResult.level).toMatch(/Severe|Extreme/);
    });

    it('computes higher risk for outdoor active commuters (bicycle / walking)', () => {
      const metroResult = calculateOERI(mockAirData, defaultProfile);
      const bicycleResult = calculateOERI(mockAirData, {
        ...defaultProfile,
        commuteMode: 'bicycle'
      });

      expect(bicycleResult.score).toBeGreaterThan(metroResult.score);
    });

    it('clamps risk score between 0.0 and 10.0', () => {
      const result = calculateOERI(mockAirData, defaultProfile);
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(10);
    });

    it('classifies low pollutant air as Low risk level', () => {
      const cleanAir: AirQualityData = {
        ...mockAirData,
        pm25: 8,
        no2: 10,
        aqi: 30,
        category: 'Good'
      };
      const result = calculateOERI(cleanAir, defaultProfile);
      expect(result.level).toBe('Low');
      expect(result.score).toBeLessThan(2.0);
    });
  });

  describe('generateActionCards (Hyper-Local Interventions)', () => {
    it('generates thermal inversion morning lockdown card when inversion is active', () => {
      const cards = generateActionCards(mockAirData, defaultProfile);
      const morningCard = cards.find(c => c.id === 'morning_inversion');
      expect(morningCard).toBeDefined();
      expect(morningCard?.title).toContain('Morning Thermal Inversion Lockdown');
    });

    it('provides zero-cost damp cloth sanctuary protocol for tier1_zero_cost users', () => {
      const cards = generateActionCards(mockAirData, {
        ...defaultProfile,
        socioeconomicTier: 'tier1_zero_cost'
      });
      const indoorCard = cards.find(c => c.id === 'indoor_tier1');
      expect(indoorCard).toBeDefined();
      expect(indoorCard?.action).toContain('damp towel');
      expect(indoorCard?.socioeconomicTier).toBe('zero_cost');
    });

    it('provides DIY Corsi-Rosenthal box guidance for tier2_low_cost users', () => {
      const cards = generateActionCards(mockAirData, {
        ...defaultProfile,
        socioeconomicTier: 'tier2_low_cost'
      });
      const indoorCard = cards.find(c => c.id === 'indoor_tier2');
      expect(indoorCard).toBeDefined();
      expect(indoorCard?.title).toContain('Corsi-Rosenthal Box');
      expect(indoorCard?.socioeconomicTier).toBe('low_cost');
    });

    it('advises sealing external windows when AQI is extreme (> 350)', () => {
      const cards = generateActionCards(mockAirData, defaultProfile);
      const ventCard = cards.find(c => c.id === 'midday_ventilation');
      expect(ventCard).toBeDefined();
      expect(ventCard?.action).toContain('Keep external windows sealed');
    });
  });

  describe('calculateCounterfactualImpact (Preventive Inhalation Reductions)', () => {
    it('computes positive avoided PM2.5 and cigarette equivalence when interventions active', () => {
      const impact = calculateCounterfactualImpact({
        commuteModeShift: true,
        maskUsageN95: true,
        indoorSanctuaryActive: true,
        basePm25: 288
      });

      expect(impact.pm25AvoidedUg).toBeGreaterThan(0);
      expect(impact.cigarettesAvoided).toBeGreaterThan(0);
      expect(impact.co2SavedG).toBe(720);
    });

    it('computes 0 CO2 saved when commuteModeShift is false', () => {
      const impact = calculateCounterfactualImpact({
        commuteModeShift: false,
        maskUsageN95: true,
        indoorSanctuaryActive: false,
        basePm25: 150
      });

      expect(impact.co2SavedG).toBe(0);
      expect(impact.pm25AvoidedUg).toBeGreaterThan(0);
    });
  });
});
