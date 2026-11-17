import { describe, it, expect } from 'vitest';
import { getHindiPeriodLabel } from '../diurnal';

describe('diurnal utilities — Traditional Chronobiological Air Divisions', () => {
  it('identifies Subah (Morning: 4 AM - 11 AM)', () => {
    expect(getHindiPeriodLabel('4 AM')).toBe('सुबह (Morning)');
    expect(getHindiPeriodLabel('8 AM')).toBe('सुबह (Morning)');
    expect(getHindiPeriodLabel('11 AM')).toBe('सुबह (Morning)');
  });

  it('identifies Dopahar (Afternoon: 12 PM - 4 PM)', () => {
    expect(getHindiPeriodLabel('12 PM')).toBe('दोपहर (Afternoon)');
    expect(getHindiPeriodLabel('2 PM')).toBe('दोपहर (Afternoon)');
    expect(getHindiPeriodLabel('4 PM')).toBe('दोपहर (Afternoon)');
  });

  it('identifies Shaam (Evening: 5 PM - 6 PM)', () => {
    expect(getHindiPeriodLabel('5 PM')).toBe('शाम (Evening)');
    expect(getHindiPeriodLabel('6 PM')).toBe('शाम (Evening)');
  });

  it('identifies Raat (Night: 7 PM - 3 AM)', () => {
    expect(getHindiPeriodLabel('7 PM')).toBe('रात (Night)');
    expect(getHindiPeriodLabel('10 PM')).toBe('रात (Night)');
    expect(getHindiPeriodLabel('12 AM')).toBe('रात (Night)');
    expect(getHindiPeriodLabel('3 AM')).toBe('रात (Night)');
  });

  it('parses ISO date strings appropriately', () => {
    expect(getHindiPeriodLabel('2026-11-17T08:00:00')).toBe('सुबह (Morning)');
    expect(getHindiPeriodLabel('2026-11-17T14:00:00')).toBe('दोपहर (Afternoon)');
    expect(getHindiPeriodLabel('2026-11-17T18:00:00')).toBe('शाम (Evening)');
    expect(getHindiPeriodLabel('2026-11-17T22:00:00')).toBe('रात (Night)');
  });
});
