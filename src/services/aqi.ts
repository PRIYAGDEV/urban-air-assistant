import { AQICategory } from '../types';

export const WHO_LIMITS = {
  pm25: 15,
  pm10: 45,
  no2: 25,
  ozone: 100
} as const;

export function calculateWhoMultiplier(val: number, limit: number): number {
  return Math.round((val / limit) * 10) / 10;
}

export function getAQICategory(aqi: number): { category: AQICategory; color: string } {
  if (aqi <= 50) return { category: 'Good', color: '#16A34A' };
  if (aqi <= 100) return { category: 'Moderate', color: '#CA8A04' };
  if (aqi <= 150) return { category: 'Unhealthy for Sensitive', color: '#EA580C' };
  if (aqi <= 200) return { category: 'Unhealthy', color: '#DC2626' };
  if (aqi <= 300) return { category: 'Very Unhealthy', color: '#7C3AED' };
  return { category: 'Hazardous', color: '#7F1D1D' };
}

// Standard US EPA Air Quality Index Breakpoints calculation from PM2.5 (µg/m³)
export function computeUsAqiFromPm25(pm25: number): number {
  const c = Math.max(0, pm25);
  if (c <= 12.0) {
    return Math.round(((50 - 0) / (12.0 - 0.0)) * (c - 0.0) + 0);
  } else if (c <= 35.4) {
    return Math.round(((100 - 51) / (35.4 - 12.1)) * (c - 12.1) + 51);
  } else if (c <= 55.4) {
    return Math.round(((150 - 101) / (55.4 - 35.5)) * (c - 35.5) + 101);
  } else if (c <= 150.4) {
    return Math.round(((200 - 151) / (150.4 - 55.5)) * (c - 55.5) + 151);
  } else if (c <= 250.4) {
    return Math.round(((300 - 201) / (250.4 - 150.5)) * (c - 150.5) + 201);
  } else if (c <= 350.4) {
    return Math.round(((400 - 301) / (350.4 - 250.5)) * (c - 250.5) + 301);
  } else if (c <= 500.4) {
    return Math.round(((500 - 401) / (500.4 - 350.5)) * (c - 350.5) + 401);
  } else {
    return 500;
  }
}
