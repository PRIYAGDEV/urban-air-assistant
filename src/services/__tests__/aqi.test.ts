import { describe, it, expect } from 'vitest';
import { 
  WHO_LIMITS, 
  calculateWhoMultiplier, 
  getAQICategory, 
  computeUsAqiFromPm25 
} from '../aqi';

describe('aqi service — Standards, Breakpoints & Multipliers', () => {
  describe('WHO_LIMITS constant specifications', () => {
    it('matches official World Health Organization 24-hour guidelines', () => {
      expect(WHO_LIMITS.pm25).toBe(15);
      expect(WHO_LIMITS.pm10).toBe(45);
      expect(WHO_LIMITS.no2).toBe(25);
      expect(WHO_LIMITS.ozone).toBe(100);
    });
  });

  describe('calculateWhoMultiplier arithmetic', () => {
    it('computes exact single-decimal ratio for PM2.5', () => {
      expect(calculateWhoMultiplier(15, WHO_LIMITS.pm25)).toBe(1.0);
      expect(calculateWhoMultiplier(30, WHO_LIMITS.pm25)).toBe(2.0);
      expect(calculateWhoMultiplier(95, WHO_LIMITS.pm25)).toBe(6.3);
      expect(calculateWhoMultiplier(4, WHO_LIMITS.pm25)).toBe(0.3);
    });

    it('computes exact single-decimal ratio for PM10', () => {
      expect(calculateWhoMultiplier(45, WHO_LIMITS.pm10)).toBe(1.0);
      expect(calculateWhoMultiplier(93, WHO_LIMITS.pm10)).toBe(2.1);
      expect(calculateWhoMultiplier(165, WHO_LIMITS.pm10)).toBe(3.7);
    });

    it('computes exact single-decimal ratio for NO2', () => {
      expect(calculateWhoMultiplier(25, WHO_LIMITS.no2)).toBe(1.0);
      expect(calculateWhoMultiplier(84, WHO_LIMITS.no2)).toBe(3.4);
      expect(calculateWhoMultiplier(38, WHO_LIMITS.no2)).toBe(1.5);
    });

    it('computes exact single-decimal ratio for Ozone', () => {
      expect(calculateWhoMultiplier(100, WHO_LIMITS.ozone)).toBe(1.0);
      expect(calculateWhoMultiplier(35, WHO_LIMITS.ozone)).toBe(0.4);
      expect(calculateWhoMultiplier(180, WHO_LIMITS.ozone)).toBe(1.8);
    });

    it('handles zero or near-zero concentrations without crashing', () => {
      expect(calculateWhoMultiplier(0, WHO_LIMITS.pm25)).toBe(0);
      expect(calculateWhoMultiplier(0.1, WHO_LIMITS.pm25)).toBe(0);
    });
  });

  describe('getAQICategory classifications and colors', () => {
    it('categorizes Good (0 - 50) with emerald green hex', () => {
      const res = getAQICategory(25);
      expect(res.category).toBe('Good');
      expect(res.color).toBe('#16A34A');
    });

    it('categorizes Moderate (51 - 100) with yellow/amber hex', () => {
      const res = getAQICategory(75);
      expect(res.category).toBe('Moderate');
      expect(res.color).toBe('#CA8A04');
    });

    it('categorizes Unhealthy for Sensitive (101 - 150) with orange hex', () => {
      const res = getAQICategory(125);
      expect(res.category).toBe('Unhealthy for Sensitive');
      expect(res.color).toBe('#EA580C');
    });

    it('categorizes Unhealthy (151 - 200) with red hex', () => {
      const res = getAQICategory(175);
      expect(res.category).toBe('Unhealthy');
      expect(res.color).toBe('#DC2626');
    });

    it('categorizes Very Unhealthy (201 - 300) with purple hex', () => {
      const res = getAQICategory(250);
      expect(res.category).toBe('Very Unhealthy');
      expect(res.color).toBe('#7C3AED');
    });

    it('categorizes Hazardous (> 300) with maroon hex', () => {
      const res = getAQICategory(350);
      expect(res.category).toBe('Hazardous');
      expect(res.color).toBe('#7F1D1D');
    });
  });

  describe('computeUsAqiFromPm25 EPA piecewise interpolation', () => {
    it('handles negative concentration by clamping to 0', () => {
      expect(computeUsAqiFromPm25(-10)).toBe(0);
    });

    it('handles max scale ceiling at 500', () => {
      expect(computeUsAqiFromPm25(500.4)).toBe(500);
      expect(computeUsAqiFromPm25(999)).toBe(500);
    });

    it('interpolates monotonically across all seven EPA brackets', () => {
      const concentrations = [5, 12, 20, 35.4, 45, 55.4, 100, 150.4, 200, 250.4, 300, 350.4, 450, 500.4];
      let prevAqi = -1;
      for (const c of concentrations) {
        const aqi = computeUsAqiFromPm25(c);
        expect(aqi).toBeGreaterThanOrEqual(prevAqi);
        prevAqi = aqi;
      }
    });
  });
});
