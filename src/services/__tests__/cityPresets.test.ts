import { describe, it, expect } from 'vitest';
import { 
  CITY_PRESETS, 
  calculateDistanceKm, 
  findNearestCity 
} from '../cityPresets';

describe('cityPresets service — Global Presets & Spatial Indexing', () => {
  describe('CITY_PRESETS dataset validation', () => {
    it('contains exactly 59 globally calibrated cities', () => {
      expect(CITY_PRESETS.length).toBe(59);
    });

    it('ensures every preset has valid coordinates within geographic ranges', () => {
      CITY_PRESETS.forEach(city => {
        expect(city.name).toBeTruthy();
        expect(city.country).toBeTruthy();
        expect(city.lat).toBeGreaterThanOrEqual(-90);
        expect(city.lat).toBeLessThanOrEqual(90);
        expect(city.lon).toBeGreaterThanOrEqual(-180);
        expect(city.lon).toBeLessThanOrEqual(180);
        expect(city.regionDescription).toBeTruthy();
      });
    });

    it('contains Delhi NCR as the primary default index 0 preset', () => {
      expect(CITY_PRESETS[0].name).toBe('Delhi NCR');
      expect(CITY_PRESETS[0].country).toBe('India');
    });

    it('contains diverse international megacities with severe smog or microclimates', () => {
      const cityNames = CITY_PRESETS.map(c => c.name);
      expect(cityNames).toContain('Beijing');
      expect(cityNames).toContain('London');
      expect(cityNames).toContain('Tokyo');
      expect(cityNames).toContain('New York');
      expect(cityNames).toContain('Dubai');
      expect(cityNames).toContain('Los Angeles');
      expect(cityNames).toContain('Lahore');
      expect(cityNames).toContain('Sydney');
    });
  });

  describe('calculateDistanceKm (Great-Circle Distance)', () => {
    it('returns zero for identical lat/lon coordinates', () => {
      expect(calculateDistanceKm(51.5074, -0.1278, 51.5074, -0.1278)).toBe(0);
    });

    it('calculates London to Paris distance (~343 km)', () => {
      const dist = calculateDistanceKm(51.5074, -0.1278, 48.8566, 2.3522);
      expect(dist).toBeGreaterThan(330);
      expect(dist).toBeLessThan(360);
    });

    it('calculates New York to Los Angeles transcontinental distance (~3935 km)', () => {
      const dist = calculateDistanceKm(40.7128, -74.006, 34.0522, -118.2437);
      expect(dist).toBeGreaterThan(3800);
      expect(dist).toBeLessThan(4100);
    });
  });

  describe('findNearestCity spatial lookup', () => {
    it('accurately resolves Connaught Place GPS to Delhi NCR', () => {
      const result = findNearestCity(28.6315, 77.2167);
      expect(result.city.name).toBe('Delhi NCR');
      expect(result.distanceKm).toBeLessThan(10);
    });

    it('accurately resolves Shibuya Tokyo GPS to Tokyo', () => {
      const result = findNearestCity(35.6595, 139.7005);
      expect(result.city.name).toBe('Tokyo');
      expect(result.distanceKm).toBeLessThan(15);
    });

    it('accurately resolves Manhattan GPS to New York', () => {
      const result = findNearestCity(40.7831, -73.9712);
      expect(result.city.name).toBe('New York');
      expect(result.distanceKm).toBeLessThan(15);
    });

    it('accurately resolves Marine Drive GPS to Mumbai', () => {
      const result = findNearestCity(18.9432, 72.8234);
      expect(result.city.name).toBe('Mumbai');
      expect(result.distanceKm).toBeLessThan(20);
    });
  });
});
