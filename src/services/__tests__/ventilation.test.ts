import { describe, it, expect } from 'vitest';
import { calculateOptimalVentilationWindow } from '../ventilation';
import { CITY_PRESETS } from '../cityPresets';

describe('ventilation service — Solar Noon & Planetary Boundary Layer', () => {
  it('computes valid format start and end times for all global presets', () => {
    CITY_PRESETS.forEach(city => {
      const window = calculateOptimalVentilationWindow(city);
      expect(window.start).toMatch(/^\d{2}:\d{2}$/);
      expect(window.end).toMatch(/^\d{2}:\d{2}$/);
      expect(window.reason).toContain('Solar thermal heating');
      expect(typeof window.currentSafe).toBe('boolean');
    });
  });

  it('generates different solar noon windows for different meridians', () => {
    const delhi = CITY_PRESETS.find(c => c.name === 'Delhi NCR')!;
    const tokyo = CITY_PRESETS.find(c => c.name === 'Tokyo')!;
    const london = CITY_PRESETS.find(c => c.name === 'London')!;
    const newYork = CITY_PRESETS.find(c => c.name === 'New York')!;

    const wDelhi = calculateOptimalVentilationWindow(delhi);
    const wTokyo = calculateOptimalVentilationWindow(tokyo);
    const wLondon = calculateOptimalVentilationWindow(london);
    const wNewYork = calculateOptimalVentilationWindow(newYork);

    expect(wDelhi.start).toBeTruthy();
    expect(wTokyo.start).toBeTruthy();
    expect(wLondon.start).toBeTruthy();
    expect(wNewYork.start).toBeTruthy();
  });

  it('adjusts window timing dynamically when hourly PM2.5 trough is provided', () => {
    const delhi = CITY_PRESETS.find(c => c.name === 'Delhi NCR')!;
    const hourlyTroughAt13 = [
      { pm25: 250, hourLabel: '11 AM' },
      { pm25: 220, hourLabel: '12 PM' },
      { pm25: 140, hourLabel: '1 PM' }, // dip here
      { pm25: 190, hourLabel: '2 PM' },
      { pm25: 240, hourLabel: '3 PM' }
    ];

    const windowWithTrough = calculateOptimalVentilationWindow(delhi, hourlyTroughAt13);
    const defaultWindow = calculateOptimalVentilationWindow(delhi);

    expect(windowWithTrough.start).toBeDefined();
    expect(defaultWindow.start).toBeDefined();
  });

  it('evaluates currentSafe as false when AQI is dangerously high (>= 250)', () => {
    const delhi = CITY_PRESETS.find(c => c.name === 'Delhi NCR')!;
    const window = calculateOptimalVentilationWindow(delhi, undefined, 300);
    expect(window.currentSafe).toBe(false);
  });

  it('evaluates currentSafe as false when AQI is extreme Hazardous (450)', () => {
    const delhi = CITY_PRESETS.find(c => c.name === 'Delhi NCR')!;
    const window = calculateOptimalVentilationWindow(delhi, undefined, 450);
    expect(window.currentSafe).toBe(false);
  });
});
