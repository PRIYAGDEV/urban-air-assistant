import { describe, it, expect } from 'vitest';
import {
  computeUsAqiFromPm25,
  getAQICategory,
  calculateOptimalVentilationWindow,
  calculateDistanceKm,
  findNearestCity,
  getFallbackData,
  applyLiveTelemetryJitter,
  getCityVisual,
  CITY_PRESETS
} from '../airQualityService';

describe('airQualityService — Core Telemetry & EPA Algorithms', () => {
  describe('computeUsAqiFromPm25 (EPA Standard Breakpoints)', () => {
    it('calculates AQI accurately in Good range (0 - 12.0 µg/m³)', () => {
      expect(computeUsAqiFromPm25(0)).toBe(0);
      expect(computeUsAqiFromPm25(6.0)).toBe(25);
      expect(computeUsAqiFromPm25(12.0)).toBe(50);
    });

    it('calculates AQI accurately in Moderate range (12.1 - 35.4 µg/m³)', () => {
      expect(computeUsAqiFromPm25(12.1)).toBe(51);
      expect(computeUsAqiFromPm25(23.75)).toBeGreaterThanOrEqual(74);
      expect(computeUsAqiFromPm25(35.4)).toBe(100);
    });

    it('calculates AQI accurately in Unhealthy for Sensitive Groups range (35.5 - 55.4 µg/m³)', () => {
      expect(computeUsAqiFromPm25(35.5)).toBe(101);
      expect(computeUsAqiFromPm25(45.45)).toBe(126);
      expect(computeUsAqiFromPm25(55.4)).toBe(150);
    });

    it('calculates AQI accurately in Unhealthy range (55.5 - 150.4 µg/m³)', () => {
      expect(computeUsAqiFromPm25(55.5)).toBe(151);
      expect(computeUsAqiFromPm25(95.0)).toBe(171);
      expect(computeUsAqiFromPm25(150.4)).toBe(200);
    });

    it('calculates AQI accurately in Very Unhealthy range (150.5 - 250.4 µg/m³)', () => {
      expect(computeUsAqiFromPm25(150.5)).toBe(201);
      expect(computeUsAqiFromPm25(200.0)).toBe(250);
      expect(computeUsAqiFromPm25(250.4)).toBe(300);
    });

    it('calculates AQI accurately in Hazardous range (250.5 - 350.4 µg/m³)', () => {
      expect(computeUsAqiFromPm25(250.5)).toBe(301);
      expect(computeUsAqiFromPm25(350.4)).toBe(400);
    });

    it('calculates AQI accurately in Deep Hazardous range (350.5 - 500.4 µg/m³)', () => {
      expect(computeUsAqiFromPm25(350.5)).toBe(401);
      expect(computeUsAqiFromPm25(500.4)).toBe(500);
    });

    it('caps AQI at 500 for extreme off-the-chart PM2.5 concentrations (> 500.4 µg/m³)', () => {
      expect(computeUsAqiFromPm25(550)).toBe(500);
      expect(computeUsAqiFromPm25(800)).toBe(500);
    });

    it('handles negative or zero PM2.5 gracefully', () => {
      expect(computeUsAqiFromPm25(-5)).toBe(0);
    });
  });

  describe('getAQICategory (Category & Hex Color Codes)', () => {
    it('returns Good for AQI 0 to 50', () => {
      expect(getAQICategory(0)).toEqual({ category: 'Good', color: '#16A34A' });
      expect(getAQICategory(17)).toEqual({ category: 'Good', color: '#16A34A' });
      expect(getAQICategory(50)).toEqual({ category: 'Good', color: '#16A34A' });
    });

    it('returns Moderate for AQI 51 to 100', () => {
      expect(getAQICategory(51)).toEqual({ category: 'Moderate', color: '#CA8A04' });
      expect(getAQICategory(85)).toEqual({ category: 'Moderate', color: '#CA8A04' });
      expect(getAQICategory(100)).toEqual({ category: 'Moderate', color: '#CA8A04' });
    });

    it('returns Unhealthy for Sensitive for AQI 101 to 150', () => {
      expect(getAQICategory(101)).toEqual({ category: 'Unhealthy for Sensitive', color: '#EA580C' });
      expect(getAQICategory(135)).toEqual({ category: 'Unhealthy for Sensitive', color: '#EA580C' });
      expect(getAQICategory(150)).toEqual({ category: 'Unhealthy for Sensitive', color: '#EA580C' });
    });

    it('returns Unhealthy for AQI 151 to 200', () => {
      expect(getAQICategory(151)).toEqual({ category: 'Unhealthy', color: '#DC2626' });
      expect(getAQICategory(160)).toEqual({ category: 'Unhealthy', color: '#DC2626' });
      expect(getAQICategory(200)).toEqual({ category: 'Unhealthy', color: '#DC2626' });
    });

    it('returns Very Unhealthy for AQI 201 to 300', () => {
      expect(getAQICategory(201)).toEqual({ category: 'Very Unhealthy', color: '#7C3AED' });
      expect(getAQICategory(255)).toEqual({ category: 'Very Unhealthy', color: '#7C3AED' });
      expect(getAQICategory(300)).toEqual({ category: 'Very Unhealthy', color: '#7C3AED' });
    });

    it('returns Hazardous for AQI > 300', () => {
      expect(getAQICategory(301)).toEqual({ category: 'Hazardous', color: '#7F1D1D' });
      expect(getAQICategory(385)).toEqual({ category: 'Hazardous', color: '#7F1D1D' });
      expect(getAQICategory(500)).toEqual({ category: 'Hazardous', color: '#7F1D1D' });
    });
  });

  describe('calculateOptimalVentilationWindow (Solar Noon & Boundary Layer)', () => {
    it('computes ventilation window format HH:MM for Delhi NCR', () => {
      const delhi = CITY_PRESETS.find(c => c.name === 'Delhi NCR')!;
      const window = calculateOptimalVentilationWindow(delhi);
      expect(window.start).toMatch(/^\d{2}:\d{2}$/);
      expect(window.end).toMatch(/^\d{2}:\d{2}$/);
      expect(window.reason).toContain('Solar thermal heating');
    });

    it('computes distinct windows for different longitudes worldwide (London vs Tokyo vs Delhi)', () => {
      const delhi = CITY_PRESETS.find(c => c.name === 'Delhi NCR')!;
      const london = CITY_PRESETS.find(c => c.name === 'London')!;
      const tokyo = CITY_PRESETS.find(c => c.name === 'Tokyo')!;

      const delhiWindow = calculateOptimalVentilationWindow(delhi);
      const londonWindow = calculateOptimalVentilationWindow(london);
      const tokyoWindow = calculateOptimalVentilationWindow(tokyo);

      // Verify each city receives its calculated window
      expect(delhiWindow.start).toBeDefined();
      expect(londonWindow.start).toBeDefined();
      expect(tokyoWindow.start).toBeDefined();
      expect(delhiWindow.reason).not.toBe(londonWindow.reason);
    });

    it('marks currentSafe as false when current AQI is Hazardous (> 250)', () => {
      const delhi = CITY_PRESETS.find(c => c.name === 'Delhi NCR')!;
      const window = calculateOptimalVentilationWindow(delhi, undefined, 385);
      expect(window.currentSafe).toBe(false);
    });
  });

  describe('calculateDistanceKm & findNearestCity (Haversine Formula)', () => {
    it('calculates 0 km distance between identical coordinates', () => {
      expect(calculateDistanceKm(28.61, 77.20, 28.61, 77.20)).toBe(0);
    });

    it('calculates accurate Haversine distance between Delhi and Mumbai (~1150 km)', () => {
      const dist = calculateDistanceKm(28.61, 77.20, 19.07, 72.87);
      expect(dist).toBeGreaterThan(1100);
      expect(dist).toBeLessThan(1200);
    });

    it('finds Delhi NCR as nearest preset when user is located at Connaught Place', () => {
      const nearest = findNearestCity(28.63, 77.22);
      expect(nearest.city.name).toBe('Delhi NCR');
      expect(nearest.distanceKm).toBeLessThan(10);
    });

    it('finds Bengaluru as nearest preset when user is located in Indiranagar', () => {
      const nearest = findNearestCity(12.97, 77.64);
      expect(nearest.city.name).toBe('Bengaluru');
      expect(nearest.distanceKm).toBeLessThan(10);
    });
  });

  describe('getFallbackData (Demo Fallback Integrity)', () => {
    it('always marks demo fallback data as isDemoData: true and isLive: false', () => {
      const delhi = CITY_PRESETS.find(c => c.name === 'Delhi NCR')!;
      const fallback = getFallbackData(delhi, 'WeatherAPI key not set');

      expect(fallback.isDemoData).toBe(true);
      expect(fallback.isLive).toBe(false);
      expect(fallback.errorMessage).toContain('WeatherAPI key not set');
      expect(fallback.lastFetchError).toContain('WeatherAPI key not set');
      expect(fallback.city).toBe('Delhi NCR');
      expect(fallback.aqi).toBeGreaterThan(0);
      expect(fallback.category).toBe(getAQICategory(fallback.aqi).category);
    });

    it('provides consistent calibrated historical values for cities without crashing', () => {
      CITY_PRESETS.slice(0, 10).forEach(city => {
        const fallback = getFallbackData(city);
        expect(fallback.aqi).toBeGreaterThan(0);
        expect(fallback.pm25).toBeGreaterThan(0);
        expect(fallback.hourly.length).toBeGreaterThan(0);
      });
    });
  });

  describe('applyLiveTelemetryJitter (Atmospheric Simulation Engine)', () => {
    it('applies micro-variations while preserving data structure and recalculating category', () => {
      const delhi = CITY_PRESETS.find(c => c.name === 'Delhi NCR')!;
      const base = getFallbackData(delhi);
      const jittered = applyLiveTelemetryJitter(base, 1);

      expect(jittered.timestamp).toBeDefined();
      expect(jittered.aqi).toBeGreaterThan(0);
      expect(jittered.pm25).toBeGreaterThan(0);
      expect(jittered.category).toBe(getAQICategory(jittered.aqi).category);
      expect(jittered.color).toBe(getAQICategory(jittered.aqi).color);
    });
  });

  describe('getCityVisual (Authentic Landmark & Photo Attribution)', () => {
    it('maps Delhi NCR to India Gate winter smog photo', () => {
      const visual = getCityVisual('Delhi NCR');
      expect(visual.imagePath).toBe('/cities/delhi.jpg');
      expect(visual.landmark).toContain('India Gate');
      expect(visual.photoCredit).toContain('Ashish Kushwaha');
    });

    it('maps Nagpur to Deekshabhoomi Stupa', () => {
      const visual = getCityVisual('Nagpur');
      expect(visual.imagePath).toBe('/cities/nagpur.jpg');
      expect(visual.landmark).toContain('Deekshabhoomi');
    });

    it('maps Ahmedabad to Sabarmati Riverfront', () => {
      const visual = getCityVisual('Ahmedabad');
      expect(visual.imagePath).toBe('/cities/ahmedabad.jpg');
      expect(visual.landmark).toContain('Sabarmati');
    });

    it('maps Patna to River Ganges', () => {
      const visual = getCityVisual('Patna');
      expect(visual.imagePath).toBe('/cities/patna.jpg');
      expect(visual.landmark).toContain('Ganges');
    });

    it('maps Kolkata to Howrah Bridge', () => {
      const visual = getCityVisual('Kolkata');
      expect(visual.imagePath).toBe('/cities/kolkata.jpg');
      expect(visual.landmark).toContain('Howrah Bridge');
    });

    it('maps Indore to Rajwada Palace', () => {
      const visual = getCityVisual('Indore');
      expect(visual.imagePath).toBe('/cities/indore.jpg');
      expect(visual.landmark).toContain('Rajwada Palace');
    });

    it('maps Pune to Shaniwar Wada', () => {
      const visual = getCityVisual('Pune');
      expect(visual.imagePath).toBe('/cities/pune.jpg');
      expect(visual.landmark).toContain('Shaniwar Wada');
    });
  });
});
