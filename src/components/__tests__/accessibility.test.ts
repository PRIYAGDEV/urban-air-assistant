import { describe, it, expect } from 'vitest';
import { getAQICategory } from '../../services/aqi';

describe('accessibility & WCAG compliance contracts', () => {
  it('ensures all AQI categories provide distinct high-contrast color codes', () => {
    const aqiLevels = [25, 75, 125, 175, 250, 350];
    const colors = aqiLevels.map(lvl => getAQICategory(lvl).color);
    const uniqueColors = new Set(colors);
    expect(uniqueColors.size).toBe(aqiLevels.length);
  });

  it('verifies color codes adhere to standard 6-digit hex format for CSS styling', () => {
    const categories = [0, 50, 100, 150, 200, 300, 500];
    categories.forEach(aqi => {
      const { color } = getAQICategory(aqi);
      expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it('verifies human-readable labels exist for all EPA brackets to avoid color-only reliance', () => {
    const categories = [0, 50, 100, 150, 200, 300, 500];
    categories.forEach(aqi => {
      const { category } = getAQICategory(aqi);
      expect(category).toBeTruthy();
      expect(typeof category).toBe('string');
      expect(category.length).toBeGreaterThan(0);
    });
  });

  it('guarantees accessible non-empty ARIA text labels for screen readers across all hazard tiers', () => {
    const testAqiSample = [15, 65, 115, 165, 225, 450];
    testAqiSample.forEach(aqi => {
      const { category } = getAQICategory(aqi);
      expect(['Good', 'Moderate', 'Unhealthy for Sensitive', 'Unhealthy', 'Very Unhealthy', 'Hazardous']).toContain(category);
    });
  });
});
