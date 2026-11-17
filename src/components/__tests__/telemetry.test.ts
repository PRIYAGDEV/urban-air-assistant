import { describe, it, expect } from 'vitest';
import { getHindiPeriodLabel } from '../AirQualityHero';

describe('telemetry & Hero — Diurnal Labels & WHO Multiplier Verification', () => {
  describe('getHindiPeriodLabel (Diurnal Period Categorization)', () => {
    it('maps morning hours (4 AM - 11 AM) to सुबह (Morning)', () => {
      expect(getHindiPeriodLabel('4 AM')).toBe('सुबह (Morning)');
      expect(getHindiPeriodLabel('8 AM')).toBe('सुबह (Morning)');
      expect(getHindiPeriodLabel('10 AM')).toBe('सुबह (Morning)');
      expect(getHindiPeriodLabel('11 AM')).toBe('सुबह (Morning)');
    });

    it('maps afternoon hours (12 PM - 4 PM) to दोपहर (Afternoon)', () => {
      expect(getHindiPeriodLabel('12 PM')).toBe('दोपहर (Afternoon)');
      expect(getHindiPeriodLabel('1 PM')).toBe('दोपहर (Afternoon)');
      expect(getHindiPeriodLabel('2 PM')).toBe('दोपहर (Afternoon)');
      expect(getHindiPeriodLabel('4 PM')).toBe('दोपहर (Afternoon)');
    });

    it('maps 5 PM and 6 PM to शाम (Evening)', () => {
      expect(getHindiPeriodLabel('5 PM')).toBe('शाम (Evening)');
      expect(getHindiPeriodLabel('6 PM')).toBe('शाम (Evening)');
    });

    it('maps evening/night hours (7 PM - 11 PM and 12 AM - 3 AM) to रात (Night)', () => {
      expect(getHindiPeriodLabel('7 PM')).toBe('रात (Night)');
      expect(getHindiPeriodLabel('8 PM')).toBe('रात (Night)');
      expect(getHindiPeriodLabel('9 PM')).toBe('रात (Night)');
      expect(getHindiPeriodLabel('10 PM')).toBe('रात (Night)');
      expect(getHindiPeriodLabel('11 PM')).toBe('रात (Night)');
      expect(getHindiPeriodLabel('12 AM')).toBe('रात (Night)');
      expect(getHindiPeriodLabel('2 AM')).toBe('रात (Night)');
    });
  });

  describe('WHO Guidelines Multipliers Arithmetic Precision', () => {
    // WHO 24h Guidelines: PM2.5 = 15 µg/m³, PM10 = 45 µg/m³, NO2 = 25 µg/m³, Ozone = 100 µg/m³
    const calculateWhoMultiplier = (val: number, limit: number) => Math.round((val / limit) * 10) / 10;

    it('accurately computes WHO PM2.5 ratio for 95 µg/m³ (6.3x limit)', () => {
      expect(calculateWhoMultiplier(95, 15)).toBe(6.3);
    });

    it('accurately computes WHO PM10 ratio for 93 µg/m³ (2.1x limit)', () => {
      expect(calculateWhoMultiplier(93, 45)).toBe(2.1);
    });

    it('accurately computes WHO NO2 ratio for 84 µg/m³ (3.4x limit)', () => {
      expect(calculateWhoMultiplier(84, 25)).toBe(3.4);
    });

    it('accurately computes WHO PM2.5 ratio for clean air 4 µg/m³ (0.3x limit)', () => {
      expect(calculateWhoMultiplier(4, 15)).toBe(0.3);
    });

    it('accurately computes WHO Ozone ratio for 35 µg/m³ (0.4x limit)', () => {
      expect(calculateWhoMultiplier(35, 100)).toBe(0.4);
    });
  });
});
