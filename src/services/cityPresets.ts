import { CityPreset } from '../types';

export const CITY_PRESETS: CityPreset[] = [
  // --- Top Indian Metros (Primary Hubs) ---
  { name: 'Delhi NCR', country: 'India', lat: 28.61, lon: 77.20, regionDescription: 'Severe winter thermal inversion basin, stubble smoke, and vehicular stagnation.' },
  { name: 'Mumbai', country: 'India', lat: 19.07, lon: 72.87, regionDescription: 'Coastal urban agglomeration with marine boundary layer and construction particulate.' },
  { name: 'Bengaluru', country: 'India', lat: 12.97, lon: 77.59, regionDescription: 'Deccan plateau urban hub with traffic congestion corridors and localized emissions.' },
  { name: 'Chennai', country: 'India', lat: 13.08, lon: 80.27, regionDescription: 'Coromandel coast metropolitan zone with sea breeze ventilation and industrial pockets.' },
  { name: 'Kolkata', country: 'India', lat: 22.57, lon: 88.36, regionDescription: 'Lower Gangetic delta basin prone to winter fog, diesel exhaust, and particulate trapping.' },
  { name: 'Hyderabad', country: 'India', lat: 17.38, lon: 78.48, regionDescription: 'Telangana plateau with vehicle exhaust plumes and seasonal dust resuspension.' },
  { name: 'Pune', country: 'India', lat: 18.52, lon: 73.85, regionDescription: 'Western Ghats valley topography with night-time thermal pooling and traffic soot.' },
  { name: 'Ahmedabad', country: 'India', lat: 23.02, lon: 72.57, regionDescription: 'Sabarmati industrial basin with chemical and textile manufacturing emissions.' },
  { name: 'Lucknow', country: 'India', lat: 26.84, lon: 80.94, regionDescription: 'Central Indo-Gangetic Plain with severe winter smog and low wind stagnation.' },
  { name: 'Jaipur', country: 'India', lat: 26.91, lon: 75.79, regionDescription: 'Semi-arid desert fringe with mineral dust resuspension and urban traffic smoke.' },
  { name: 'Kanpur', country: 'India', lat: 26.44, lon: 80.33, regionDescription: 'Industrial leather and coal cluster in the high-smog Gangetic inversion corridor.' },
  { name: 'Patna', country: 'India', lat: 25.59, lon: 85.13, regionDescription: 'Dense Gangetic floodplain basin with persistent winter particulate stagnation.' },
  // --- Expanded Indian Cities ---
  { name: 'Surat', country: 'India', lat: 21.17, lon: 72.83, regionDescription: 'Coastal textile and diamond industrial manufacturing center in Gujarat.' },
  { name: 'Indore', country: 'India', lat: 22.72, lon: 75.86, regionDescription: 'Malwa plateau commercial hub with active urban air action plans.' },
  { name: 'Bhopal', country: 'India', lat: 23.26, lon: 77.41, regionDescription: 'Central lake city with topography-driven nocturnal particulate settling.' },
  { name: 'Nagpur', country: 'India', lat: 21.15, lon: 79.08, regionDescription: 'Zero-mile geographic center with thermal power plant and transit emissions.' },
  { name: 'Chandigarh', country: 'India', lat: 30.73, lon: 76.78, regionDescription: 'Sub-Himalayan Shivalik foothills with seasonal agricultural biomass smoke.' },
  { name: 'Varanasi', country: 'India', lat: 25.32, lon: 82.97, regionDescription: 'Ancient Ganges riverside corridor with high population and biomass smoke.' },
  { name: 'Agra', country: 'India', lat: 27.18, lon: 78.01, regionDescription: 'Taj Trapezium Zone monitoring corridor with vehicular and glass emissions.' },
  { name: 'Kochi', country: 'India', lat: 9.93, lon: 76.27, regionDescription: 'Malabar coastal port with humid sea breezes and localized petrochemical emissions.' },
  { name: 'Visakhapatnam', country: 'India', lat: 17.69, lon: 83.22, regionDescription: 'Eastern Ghats coastal industrial hub with steel, port, and refinery emissions.' },
  { name: 'Guwahati', country: 'India', lat: 26.14, lon: 91.74, regionDescription: 'Brahmaputra valley gateway with valley entrapment of vehicular smoke.' },
  { name: 'Amritsar', country: 'India', lat: 31.63, lon: 74.87, regionDescription: 'Majha plains center with intense post-harvest agricultural stubble fires.' },
  { name: 'Srinagar', country: 'India', lat: 34.08, lon: 74.80, regionDescription: 'Kashmir mountain valley basin with severe winter heating smoke trapping.' },
  { name: 'Dehradun', country: 'India', lat: 30.32, lon: 78.03, regionDescription: 'Doon valley with thermal temperature inversions trapping hill traffic fumes.' },
  { name: 'Coimbatore', country: 'India', lat: 11.02, lon: 76.96, regionDescription: 'Palghat Gap western manufacturing cluster with active wind dispersion.' },
  { name: 'Thiruvananthapuram', country: 'India', lat: 8.52, lon: 76.94, regionDescription: 'Southern tip coastal evergreen corridor with high sea breeze dispersion.' },
  { name: 'Bhubaneswar', country: 'India', lat: 20.30, lon: 85.82, regionDescription: 'Eastern plain capital with rapid construction and mining transit plumes.' },
  { name: 'Ranchi', country: 'India', lat: 23.34, lon: 85.31, regionDescription: 'Chota Nagpur plateau with coal mining and industrial transport emissions.' },
  { name: 'Ludhiana', country: 'India', lat: 30.90, lon: 75.86, regionDescription: 'Industrial manufacturing capital of Punjab with intense winter smog episodes.' },
  { name: 'Noida', country: 'India', lat: 28.53, lon: 77.39, regionDescription: 'Yamuna flood basin suburban high-density construction and transit corridor.' },
  { name: 'Gurugram', country: 'India', lat: 28.46, lon: 77.03, regionDescription: 'Aravalli range foothill tech corridor with heavy diesel generator particulate.' },
  { name: 'Faridabad', country: 'India', lat: 28.41, lon: 77.32, regionDescription: 'Industrial heavy engineering cluster in the Southern NCR smog basin.' },
  { name: 'Ghaziabad', country: 'India', lat: 28.67, lon: 77.45, regionDescription: 'Hindon river corridor with dense metal and automotive manufacturing.' },
  { name: 'Jodhpur', country: 'India', lat: 26.24, lon: 73.02, regionDescription: 'Thar desert fringe with airborne mineral dust and handicraft manufacturing.' },
  { name: 'Udaipur', country: 'India', lat: 24.58, lon: 73.71, regionDescription: 'Mewar valley with zinc smelter transit and tourism vehicular traffic.' },
  { name: 'Gwalior', country: 'India', lat: 26.22, lon: 78.18, regionDescription: 'Chambal basin valley with high dry particulate resuspension.' },
  { name: 'Jabalpur', country: 'India', lat: 23.18, lon: 79.99, regionDescription: 'Narmada valley central railway hub with seasonal biomass burning.' },
  { name: 'Madurai', country: 'India', lat: 9.93, lon: 78.12, regionDescription: 'Vaigai river basin with agricultural transport and textile processing.' },
  // --- Top World Popular Metros ---
  { name: 'New York', country: 'USA', lat: 40.71, lon: -74.01, regionDescription: 'Atlantic coastal megalopolis with dense commuter traffic and seasonal wildfire smoke.' },
  { name: 'London', country: 'United Kingdom', lat: 51.51, lon: -0.13, regionDescription: 'Thames basin with Ultra Low Emission Zone (ULEZ) and winter wood-stove particulate.' },
  { name: 'Tokyo', country: 'Japan', lat: 35.68, lon: 139.69, regionDescription: 'Kanto Plain world megacity with low diesel emissions and marine wind ventilation.' },
  { name: 'Paris', country: 'France', lat: 48.86, lon: 2.35, regionDescription: 'Seine basin with periodic winter atmospheric stagnation and diesel NOx alerts.' },
  { name: 'Dubai', country: 'UAE', lat: 25.20, lon: 55.27, regionDescription: 'Arabian Gulf desert metropolis with airborne silica dust and high solar insolation.' },
  { name: 'Singapore', country: 'Singapore', lat: 1.35, lon: 103.82, regionDescription: 'Equatorial island state with maritime convective showers and regional haze surveillance.' },
  { name: 'Beijing', country: 'China', lat: 39.90, lon: 116.41, regionDescription: 'Northern plain basin enclosed by Yanshan mountains with strict emission controls.' },
  { name: 'Lahore', country: 'Pakistan', lat: 31.52, lon: 74.36, regionDescription: 'Indus plain center facing severe winter smog trapped by nocturnal low boundary layers.' },
  { name: 'Bangkok', country: 'Thailand', lat: 13.76, lon: 100.50, regionDescription: 'Chao Phraya delta basin with dry season agricultural burning and motor congestion.' },
  { name: 'Sydney', country: 'Australia', lat: -33.87, lon: 151.21, regionDescription: 'Tasman Sea coastal basin with ocean breezes and seasonal bushfire smoke surveillance.' },
  { name: 'Los Angeles', country: 'USA', lat: 34.05, lon: -118.24, regionDescription: 'South Coast air basin with mountain containment and photochemical ozone smog.' },
  { name: 'Seoul', country: 'South Korea', lat: 37.57, lon: 126.98, regionDescription: 'Han river valley basin affected by transboundary yellow dust and urban transit.' },
  { name: 'Cairo', country: 'Egypt', lat: 30.04, lon: 31.24, regionDescription: 'Nile delta basin with seasonal black smoke episodes from agricultural rice burning.' },
  { name: 'São Paulo', country: 'Brazil', lat: -23.55, lon: -46.63, regionDescription: 'Atlantic plateau basin with heavy flex-fuel vehicular traffic and winter dry inversions.' },
  { name: 'Mexico City', country: 'Mexico', lat: 19.43, lon: -99.13, regionDescription: 'High-altitude volcanic basin (2,240m) trapping photochemical ozone and motor exhaust.' },
  { name: 'Toronto', country: 'Canada', lat: 43.65, lon: -79.38, regionDescription: 'Lake Ontario lakefront corridor with summer heat inversions and regional haze.' },
  { name: 'Berlin', country: 'Germany', lat: 52.52, lon: 13.40, regionDescription: 'Northern European plain with low-emission environmental zones and district heating.' },
  { name: 'Rome', country: 'Italy', lat: 41.90, lon: 12.50, regionDescription: 'Mediterranean central valley with summer ozone spikes and historic center traffic caps.' },
  { name: 'Istanbul', country: 'Turkey', lat: 41.01, lon: 28.98, regionDescription: 'Bosphorus maritime strait with shipping channel emissions and hills creating microclimates.' },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.21, lon: 106.85, regionDescription: 'Java coastal basin with intense motorcycle and coal power transboundary particulate.' }
];

// Calculate geographical distance in km using Haversine formula
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Find closest city from CITY_PRESETS given user's coordinates
export function findNearestCity(lat: number, lon: number): { city: CityPreset; distanceKm: number } {
  let closest = CITY_PRESETS[0];
  let minDistance = Infinity;

  for (const preset of CITY_PRESETS) {
    const dist = calculateDistanceKm(lat, lon, preset.lat, preset.lon);
    if (dist < minDistance) {
      minDistance = dist;
      closest = preset;
    }
  }

  return { city: closest, distanceKm: minDistance };
}

export const FEATURED_VISUAL_CITY_NAMES = [
  'Delhi NCR', 'Mumbai', 'Bengaluru', 'Varanasi', 'Kolkata', 'Chennai', 'Hyderabad',
  'Jaipur', 'Amritsar', 'Srinagar', 'New York', 'London', 'Tokyo', 'Paris', 'Dubai', 'Singapore'
];

export function getFeaturedCityPresets(): CityPreset[] {
  return CITY_PRESETS.filter(c => FEATURED_VISUAL_CITY_NAMES.includes(c.name));
}
