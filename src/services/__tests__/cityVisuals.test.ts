import { describe, it, expect } from 'vitest';
import { getCityVisual } from '../cityVisuals';
import { CITY_PRESETS } from '../cityPresets';

describe('cityVisuals service — Landmark & Photography Provenance', () => {
  it('returns valid visual structures for all 59 presets in the catalog', () => {
    CITY_PRESETS.forEach(city => {
      const visual = getCityVisual(city.name);
      expect(visual).toBeDefined();
      expect(visual.imagePath).toMatch(/^\/cities\/[a-z0-9_-]+\.jpg$/);
      expect(visual.landmark).toBeTruthy();
      expect(visual.photoCredit).toBeTruthy();
    });
  });

  it('guarantees authentic photo mappings for key cities requested by users', () => {
    const delhi = getCityVisual('Delhi NCR');
    expect(delhi.landmark).toContain('India Gate');
    expect(delhi.photoCredit).toContain('Ashish Kushwaha');

    const nagpur = getCityVisual('Nagpur');
    expect(nagpur.landmark).toContain('Deekshabhoomi');

    const ahmedabad = getCityVisual('Ahmedabad');
    expect(ahmedabad.landmark).toContain('Sabarmati');

    const patna = getCityVisual('Patna');
    expect(patna.landmark).toContain('Ganges');

    const tokyo = getCityVisual('Tokyo');
    expect(tokyo.landmark).toContain('Kanto Plain');

    const london = getCityVisual('London');
    expect(london.landmark).toContain('Westminster');

    const newYork = getCityVisual('New York');
    expect(newYork.landmark).toContain('Manhattan');
  });

  it('falls back gracefully to default visual for unknown city query', () => {
    const unknown = getCityVisual('Atlantis Cyber City');
    expect(unknown.imagePath).toBe('/cities/delhi.jpg');
    expect(unknown.landmark).toContain('Urban Air Station');
  });
});
