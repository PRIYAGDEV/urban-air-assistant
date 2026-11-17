import { CityPreset } from '../types';

// Dynamically compute optimal ventilation window per city based on local solar noon and diurnal curve
export function calculateOptimalVentilationWindow(
  city: CityPreset,
  hourly?: { hourLabel?: string; pm25: number; aqi?: number; time?: string }[],
  currentAqi?: number
): { start: string; end: string; reason: string; currentSafe: boolean } {
  let stdMeridian = 82.5; // default IST for Indian cities
  if (city.country === 'India') {
    stdMeridian = 82.5;
  } else if (city.country === 'China' || city.country === 'Singapore') {
    stdMeridian = 120.0;
  } else if (city.country === 'Japan') {
    stdMeridian = 135.0;
  } else if (city.country === 'UAE') {
    stdMeridian = 60.0;
  } else if (city.country === 'United Kingdom') {
    stdMeridian = 0.0;
  } else if (city.country === 'France' || city.country === 'Germany' || city.country === 'Italy') {
    stdMeridian = 15.0;
  } else if (city.country === 'Egypt') {
    stdMeridian = 30.0;
  } else if (city.country === 'Turkey') {
    stdMeridian = 45.0;
  } else if (city.country === 'Pakistan') {
    stdMeridian = 75.0;
  } else if (city.country === 'Thailand' || city.country === 'Indonesia') {
    stdMeridian = 105.0;
  } else if (city.country === 'Australia') {
    stdMeridian = 150.0;
  } else if (city.country === 'USA') {
    if (city.lon < -114) stdMeridian = -120.0;
    else if (city.lon < -100) stdMeridian = -105.0;
    else if (city.lon < -85) stdMeridian = -90.0;
    else stdMeridian = -75.0;
  } else if (city.country === 'Canada') {
    stdMeridian = -75.0;
  } else if (city.country === 'Brazil') {
    stdMeridian = -45.0;
  } else if (city.country === 'Mexico') {
    stdMeridian = -90.0;
  } else {
    stdMeridian = Math.round(city.lon / 15) * 15;
  }

  // 1 deg longitude = 4 minutes of solar time
  const lonDiff = city.lon - stdMeridian;
  // Local solar noon in minutes from midnight (12:00 = 720 minutes)
  const solarNoonMinutes = 720 - (lonDiff * 4);

  // Analyze diurnal curve: check daytime hours (11:00 to 16:00) for minimum PM2.5 trough
  let diurnalShiftMinutes = 0;
  if (hourly && hourly.length > 0) {
    let minPm25 = Infinity;
    let minHour = -1;
    hourly.forEach((h) => {
      let hourNum = -1;
      if (h.time) {
        hourNum = new Date(h.time).getHours();
      } else if (h.hourLabel) {
        const m = h.hourLabel.match(/(\d+)\s*(AM|PM)/i);
        if (m) {
          let hr = parseInt(m[1], 10);
          if (m[2].toUpperCase() === 'PM' && hr !== 12) hr += 12;
          if (m[2].toUpperCase() === 'AM' && hr === 12) hr = 0;
          hourNum = hr;
        }
      }
      if (hourNum >= 11 && hourNum <= 16 && h.pm25 < minPm25) {
        minPm25 = h.pm25;
        minHour = hourNum;
      }
    });

    if (minHour >= 11 && minHour <= 16) {
      const dipMinutes = minHour * 60;
      diurnalShiftMinutes = Math.max(-25, Math.min(25, (dipMinutes - (solarNoonMinutes + 120)) * 0.25));
    }
  }

  // Atmospheric boundary layer expands to maximum vertical dilution ~75-90 min after solar noon, lasting ~100-110 min
  const startTotalMinutes = Math.round((solarNoonMinutes + 75 + diurnalShiftMinutes) / 5) * 5;
  const endTotalMinutes = Math.round((solarNoonMinutes + 180 + diurnalShiftMinutes) / 5) * 5;

  const startH = Math.floor(startTotalMinutes / 60) % 24;
  const startM = startTotalMinutes % 60;
  const endH = Math.floor(endTotalMinutes / 60) % 24;
  const endM = endTotalMinutes % 60;

  const startStr = `${String(startH).padStart(2, '0')}:${String(startM).padStart(2, '0')}`;
  const endStr = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;

  const noonH = Math.floor(solarNoonMinutes / 60);
  const noonM = Math.round(solarNoonMinutes % 60);
  const noonStr = `${noonH % 12 === 0 ? 12 : noonH % 12}:${String(noonM).padStart(2, '0')} ${noonH >= 12 ? 'PM' : 'AM'}`;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const aqiVal = currentAqi ?? 160;
  const currentSafe = currentMinutes >= startTotalMinutes && currentMinutes <= endTotalMinutes && aqiVal < 250;

  return {
    start: startStr,
    end: endStr,
    reason: `Solar thermal heating following local solar noon (~${noonStr}) expands the atmospheric boundary layer, dispersing ground-level particulate between ${startStr} and ${endStr}.`,
    currentSafe
  };
}
