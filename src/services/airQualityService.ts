import { AirQualityData, AQICategory, CityPreset } from '../types';

export const CITY_PRESETS: CityPreset[] = [
  // --- Top Indian Metros (Primary Hubs) ---
  {
    name: 'Delhi NCR',
    country: 'India',
    lat: 28.61,
    lon: 77.20,
    regionDescription: 'Severe winter thermal inversion basin, stubble smoke, and vehicular stagnation.'
  },
  {
    name: 'Mumbai',
    country: 'India',
    lat: 19.07,
    lon: 72.87,
    regionDescription: 'Coastal urban agglomeration with marine boundary layer and construction particulate.'
  },
  {
    name: 'Bengaluru',
    country: 'India',
    lat: 12.97,
    lon: 77.59,
    regionDescription: 'Deccan plateau urban hub with traffic congestion corridors and localized emissions.'
  },
  {
    name: 'Chennai',
    country: 'India',
    lat: 13.08,
    lon: 80.27,
    regionDescription: 'Coromandel coast metropolitan zone with sea breeze ventilation and industrial pockets.'
  },
  {
    name: 'Kolkata',
    country: 'India',
    lat: 22.57,
    lon: 88.36,
    regionDescription: 'Lower Gangetic delta basin prone to winter fog, diesel exhaust, and particulate trapping.'
  },
  {
    name: 'Hyderabad',
    country: 'India',
    lat: 17.38,
    lon: 78.48,
    regionDescription: 'Telangana plateau with vehicle exhaust plumes and seasonal dust resuspension.'
  },
  {
    name: 'Pune',
    country: 'India',
    lat: 18.52,
    lon: 73.85,
    regionDescription: 'Western Ghats valley topography with night-time thermal pooling and traffic soot.'
  },
  {
    name: 'Ahmedabad',
    country: 'India',
    lat: 23.02,
    lon: 72.57,
    regionDescription: 'Sabarmati industrial basin with chemical and textile manufacturing emissions.'
  },
  {
    name: 'Lucknow',
    country: 'India',
    lat: 26.84,
    lon: 80.94,
    regionDescription: 'Central Indo-Gangetic Plain with severe winter smog and low wind stagnation.'
  },
  {
    name: 'Jaipur',
    country: 'India',
    lat: 26.91,
    lon: 75.79,
    regionDescription: 'Semi-arid desert fringe with mineral dust resuspension and urban traffic smoke.'
  },
  {
    name: 'Kanpur',
    country: 'India',
    lat: 26.44,
    lon: 80.33,
    regionDescription: 'Industrial leather and coal cluster in the high-smog Gangetic inversion corridor.'
  },
  {
    name: 'Patna',
    country: 'India',
    lat: 25.59,
    lon: 85.13,
    regionDescription: 'Dense Gangetic floodplain basin with persistent winter particulate stagnation.'
  },
  // --- Expanded Indian Cities ---
  {
    name: 'Surat',
    country: 'India',
    lat: 21.17,
    lon: 72.83,
    regionDescription: 'Coastal textile and diamond industrial manufacturing center in Gujarat.'
  },
  {
    name: 'Indore',
    country: 'India',
    lat: 22.72,
    lon: 75.86,
    regionDescription: 'Malwa plateau commercial hub with active urban air action plans.'
  },
  {
    name: 'Bhopal',
    country: 'India',
    lat: 23.26,
    lon: 77.41,
    regionDescription: 'Central lake city with topography-driven nocturnal particulate settling.'
  },
  {
    name: 'Nagpur',
    country: 'India',
    lat: 21.15,
    lon: 79.08,
    regionDescription: 'Zero-mile geographic center with thermal power plant and transit emissions.'
  },
  {
    name: 'Chandigarh',
    country: 'India',
    lat: 30.73,
    lon: 76.78,
    regionDescription: 'Sub-Himalayan Shivalik foothills with seasonal agricultural biomass smoke.'
  },
  {
    name: 'Varanasi',
    country: 'India',
    lat: 25.32,
    lon: 82.97,
    regionDescription: 'Ancient Ganges riverside corridor with high population and biomass smoke.'
  },
  {
    name: 'Agra',
    country: 'India',
    lat: 27.18,
    lon: 78.01,
    regionDescription: 'Taj Trapezium Zone monitoring corridor with vehicular and glass emissions.'
  },
  {
    name: 'Kochi',
    country: 'India',
    lat: 9.93,
    lon: 76.27,
    regionDescription: 'Malabar coastal port with humid sea breezes and localized petrochemical emissions.'
  },
  {
    name: 'Visakhapatnam',
    country: 'India',
    lat: 17.69,
    lon: 83.22,
    regionDescription: 'Eastern Ghats coastal industrial hub with steel, port, and refinery emissions.'
  },
  {
    name: 'Guwahati',
    country: 'India',
    lat: 26.14,
    lon: 91.74,
    regionDescription: 'Brahmaputra valley gateway with valley entrapment of vehicular smoke.'
  },
  {
    name: 'Amritsar',
    country: 'India',
    lat: 31.63,
    lon: 74.87,
    regionDescription: 'Majha plains center with intense post-harvest agricultural stubble fires.'
  },
  {
    name: 'Srinagar',
    country: 'India',
    lat: 34.08,
    lon: 74.80,
    regionDescription: 'Kashmir mountain valley basin with severe winter heating smoke trapping.'
  },
  {
    name: 'Dehradun',
    country: 'India',
    lat: 30.32,
    lon: 78.03,
    regionDescription: 'Doon valley with thermal temperature inversions trapping hill traffic fumes.'
  },
  {
    name: 'Coimbatore',
    country: 'India',
    lat: 11.02,
    lon: 76.96,
    regionDescription: 'Palghat Gap western manufacturing cluster with active wind dispersion.'
  },
  {
    name: 'Thiruvananthapuram',
    country: 'India',
    lat: 8.52,
    lon: 76.94,
    regionDescription: 'Southern tip coastal evergreen corridor with high sea breeze dispersion.'
  },
  {
    name: 'Bhubaneswar',
    country: 'India',
    lat: 20.30,
    lon: 85.82,
    regionDescription: 'Eastern plain capital with rapid construction and mining transit plumes.'
  },
  {
    name: 'Ranchi',
    country: 'India',
    lat: 23.34,
    lon: 85.31,
    regionDescription: 'Chota Nagpur plateau with coal mining and industrial transport emissions.'
  },
  {
    name: 'Ludhiana',
    country: 'India',
    lat: 30.90,
    lon: 75.86,
    regionDescription: 'Industrial manufacturing capital of Punjab with intense winter smog episodes.'
  },
  {
    name: 'Noida',
    country: 'India',
    lat: 28.53,
    lon: 77.39,
    regionDescription: 'Yamuna flood basin suburban high-density construction and transit corridor.'
  },
  {
    name: 'Gurugram',
    country: 'India',
    lat: 28.46,
    lon: 77.03,
    regionDescription: 'Aravalli range foothill tech corridor with heavy diesel generator particulate.'
  },
  {
    name: 'Faridabad',
    country: 'India',
    lat: 28.41,
    lon: 77.32,
    regionDescription: 'Industrial heavy engineering cluster in the Southern NCR smog basin.'
  },
  {
    name: 'Ghaziabad',
    country: 'India',
    lat: 28.67,
    lon: 77.45,
    regionDescription: 'Hindon river corridor with dense metal and automotive manufacturing.'
  },
  {
    name: 'Jodhpur',
    country: 'India',
    lat: 26.24,
    lon: 73.02,
    regionDescription: 'Thar desert fringe with airborne mineral dust and handicraft manufacturing.'
  },
  {
    name: 'Udaipur',
    country: 'India',
    lat: 24.58,
    lon: 73.71,
    regionDescription: 'Mewar valley with zinc smelter transit and tourism vehicular traffic.'
  },
  {
    name: 'Gwalior',
    country: 'India',
    lat: 26.22,
    lon: 78.18,
    regionDescription: 'Chambal basin valley with high dry particulate resuspension.'
  },
  {
    name: 'Jabalpur',
    country: 'India',
    lat: 23.18,
    lon: 79.99,
    regionDescription: 'Narmada valley central railway hub with seasonal biomass burning.'
  },
  {
    name: 'Madurai',
    country: 'India',
    lat: 9.93,
    lon: 78.12,
    regionDescription: 'Vaigai river basin with agricultural transport and textile processing.'
  },

  // --- Top World Popular Metros ---
  {
    name: 'New York',
    country: 'USA',
    lat: 40.71,
    lon: -74.01,
    regionDescription: 'Atlantic coastal megalopolis with dense commuter traffic and seasonal wildfire smoke.'
  },
  {
    name: 'London',
    country: 'United Kingdom',
    lat: 51.51,
    lon: -0.13,
    regionDescription: 'Thames basin with Ultra Low Emission Zone (ULEZ) and winter wood-stove particulate.'
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    lat: 35.68,
    lon: 139.69,
    regionDescription: 'Kanto Plain world megacity with low diesel emissions and marine wind ventilation.'
  },
  {
    name: 'Paris',
    country: 'France',
    lat: 48.86,
    lon: 2.35,
    regionDescription: 'Seine basin with periodic winter atmospheric stagnation and diesel NOx alerts.'
  },
  {
    name: 'Dubai',
    country: 'UAE',
    lat: 25.20,
    lon: 55.27,
    regionDescription: 'Arabian Gulf desert metropolis with airborne silica dust and high solar insolation.'
  },
  {
    name: 'Singapore',
    country: 'Singapore',
    lat: 1.35,
    lon: 103.82,
    regionDescription: 'Equatorial island state with maritime convective showers and regional haze surveillance.'
  },
  {
    name: 'Beijing',
    country: 'China',
    lat: 39.90,
    lon: 116.41,
    regionDescription: 'Northern plain basin enclosed by Yanshan mountains with strict emission controls.'
  },
  {
    name: 'Lahore',
    country: 'Pakistan',
    lat: 31.52,
    lon: 74.36,
    regionDescription: 'Indus plain center facing severe winter smog trapped by nocturnal low boundary layers.'
  },
  {
    name: 'Bangkok',
    country: 'Thailand',
    lat: 13.76,
    lon: 100.50,
    regionDescription: 'Chao Phraya delta basin with dry season agricultural burning and motor congestion.'
  },
  {
    name: 'Sydney',
    country: 'Australia',
    lat: -33.87,
    lon: 151.21,
    regionDescription: 'Tasman Sea coastal basin with ocean breezes and seasonal bushfire smoke surveillance.'
  },
  {
    name: 'Los Angeles',
    country: 'USA',
    lat: 34.05,
    lon: -118.24,
    regionDescription: 'South Coast air basin with mountain containment and photochemical ozone smog.'
  },
  {
    name: 'Seoul',
    country: 'South Korea',
    lat: 37.57,
    lon: 126.98,
    regionDescription: 'Han river valley basin affected by transboundary yellow dust and urban transit.'
  },
  {
    name: 'Cairo',
    country: 'Egypt',
    lat: 30.04,
    lon: 31.24,
    regionDescription: 'Nile delta basin with seasonal black smoke episodes from agricultural rice burning.'
  },
  {
    name: 'São Paulo',
    country: 'Brazil',
    lat: -23.55,
    lon: -46.63,
    regionDescription: 'Atlantic plateau basin with heavy flex-fuel vehicular traffic and winter dry inversions.'
  },
  {
    name: 'Mexico City',
    country: 'Mexico',
    lat: 19.43,
    lon: -99.13,
    regionDescription: 'High-altitude volcanic basin (2,240m) trapping photochemical ozone and motor exhaust.'
  },
  {
    name: 'Toronto',
    country: 'Canada',
    lat: 43.65,
    lon: -79.38,
    regionDescription: 'Lake Ontario lakefront corridor with summer heat inversions and regional haze.'
  },
  {
    name: 'Berlin',
    country: 'Germany',
    lat: 52.52,
    lon: 13.40,
    regionDescription: 'Northern European plain with low-emission environmental zones and district heating.'
  },
  {
    name: 'Rome',
    country: 'Italy',
    lat: 41.90,
    lon: 12.50,
    regionDescription: 'Mediterranean central valley with summer ozone spikes and historic center traffic caps.'
  },
  {
    name: 'Istanbul',
    country: 'Turkey',
    lat: 41.01,
    lon: 28.98,
    regionDescription: 'Bosphorus maritime strait with shipping channel emissions and hills creating microclimates.'
  },
  {
    name: 'Jakarta',
    country: 'Indonesia',
    lat: -6.21,
    lon: 106.85,
    regionDescription: 'Java coastal basin with intense motorcycle and coal power transboundary particulate.'
  }
];

export function getAQICategory(aqi: number): { category: AQICategory; color: string } {
  if (aqi <= 50) return { category: 'Good', color: '#16A34A' };
  if (aqi <= 100) return { category: 'Moderate', color: '#CA8A04' };
  if (aqi <= 200) return { category: 'Poor', color: '#EA580C' };
  if (aqi <= 300) return { category: 'Severe', color: '#DC2626' };
  return { category: 'Hazardous', color: '#7C3AED' };
}

export interface CityVisual {
  imagePath: string;
  photoCredit: string;
  landmark: string;
}

export function getCityVisual(cityName: string): CityVisual {
  const norm = (cityName || '').toLowerCase();
  
  // Specific Indian City mappings
  if (norm.includes('delhi') || norm.includes('noida') || norm.includes('gurugram') || norm.includes('ghaziabad') || norm.includes('faridabad')) {
    return {
      imagePath: '/cities/delhi.jpg',
      photoCredit: 'Photo: India Gate winter smog, Delhi by Ashish Kushwaha / Unsplash',
      landmark: 'India Gate & NCR Corridor'
    };
  }
  if (norm.includes('mumbai')) {
    return {
      imagePath: '/cities/mumbai.jpg',
      photoCredit: 'Photo: Gateway of India & Coastal Skyline by Hardik Joshi / Unsplash',
      landmark: 'Gateway of India & Marine Drive'
    };
  }
  if (norm.includes('bengaluru') || norm.includes('bangalore')) {
    return {
      imagePath: '/cities/bengaluru.jpg',
      photoCredit: 'Photo: Vidhana Soudha, Bengaluru by Naveen / Unsplash',
      landmark: 'Vidhana Soudha & Central Corridor'
    };
  }
  if (norm.includes('chennai')) {
    return {
      imagePath: '/cities/chennai.jpg',
      photoCredit: 'Photo: Chennai Central & Marina Skyline by Balaji Srinivasan / Unsplash',
      landmark: 'Chennai Central & Marina Bay'
    };
  }
  if (norm.includes('kolkata')) {
    return {
      imagePath: '/cities/kolkata.jpg',
      photoCredit: 'Photo: Howrah Bridge over Hooghly, Kolkata by Anirban Ghosh / Unsplash',
      landmark: 'Howrah Bridge & Hooghly Basin'
    };
  }
  if (norm.includes('hyderabad')) {
    return {
      imagePath: '/cities/hyderabad.jpg',
      photoCredit: 'Photo: Charminar & Historic Hub, Hyderabad by Pradeep Kumar / Unsplash',
      landmark: 'Charminar & Hussain Sagar'
    };
  }
  if (norm.includes('pune')) {
    return {
      imagePath: '/cities/pune.jpg',
      photoCredit: 'Photo: Western Ghats Valley & Pune Skyline on Unsplash',
      landmark: 'Shaniwar Wada & Pune Valley'
    };
  }
  if (norm.includes('ahmedabad') || norm.includes('surat')) {
    return {
      imagePath: '/cities/ahmedabad.jpg',
      photoCredit: 'Photo: Sabarmati Riverfront, Ahmedabad by Bhargav Patel / Unsplash',
      landmark: 'Sabarmati Riverfront & Western Hub'
    };
  }
  if (norm.includes('lucknow') || norm.includes('kanpur') || norm.includes('varanasi') || norm.includes('agra') || norm.includes('gwalior')) {
    return {
      imagePath: norm.includes('kanpur') ? '/cities/kanpur.jpg' : '/cities/lucknow.jpg',
      photoCredit: 'Photo: Indo-Gangetic Basin Corridor on Unsplash',
      landmark: norm.includes('kanpur') ? 'Ganga Barrage & Industrial Belt' : 'Rumi Darwaza & Gangetic Corridor'
    };
  }
  if (norm.includes('jaipur') || norm.includes('jodhpur') || norm.includes('udaipur')) {
    return {
      imagePath: '/cities/jaipur.jpg',
      photoCredit: 'Photo: Hawa Mahal, Rajasthan by Annie Spratt / Unsplash',
      landmark: 'Hawa Mahal & Aravalli Basin'
    };
  }
  if (norm.includes('patna') || norm.includes('ranchi') || norm.includes('bhubaneswar')) {
    return {
      imagePath: '/cities/patna.jpg',
      photoCredit: 'Photo: Ganges Floodplain & Riverfront on Unsplash',
      landmark: 'Ganges Floodplain Corridor'
    };
  }
  if (norm.includes('amritsar') || norm.includes('chandigarh') || norm.includes('ludhiana') || norm.includes('dehradun') || norm.includes('srinagar')) {
    return {
      imagePath: '/cities/delhi.jpg',
      photoCredit: 'Photo: Sub-Himalayan Winter Plain by Unsplash Contributors',
      landmark: 'Sub-Himalayan & Shivalik Plains'
    };
  }
  if (norm.includes('kochi') || norm.includes('thiruvananthapuram') || norm.includes('coimbatore') || norm.includes('madurai')) {
    return {
      imagePath: '/cities/chennai.jpg',
      photoCredit: 'Photo: Southern Peninsular Corridor on Unsplash',
      landmark: 'Peninsular Coastal Air Basin'
    };
  }
  if (norm.includes('indore') || norm.includes('bhopal') || norm.includes('nagpur') || norm.includes('jabalpur')) {
    return {
      imagePath: '/cities/pune.jpg',
      photoCredit: 'Photo: Central Indian Plateau by Unsplash Contributors',
      landmark: 'Central Plateau Air Zone'
    };
  }
  if (norm.includes('guwahati')) {
    return {
      imagePath: '/cities/patna.jpg',
      photoCredit: 'Photo: Brahmaputra Valley on Unsplash',
      landmark: 'Brahmaputra Valley Gateway'
    };
  }

  // World City mappings
  if (norm.includes('new york')) {
    return {
      imagePath: '/cities/new-york.jpg',
      photoCredit: 'Photo: New York City Skyline by Unsplash Contributors',
      landmark: 'Manhattan & Hudson River Megalopolis'
    };
  }
  if (norm.includes('london')) {
    return {
      imagePath: '/cities/london.jpg',
      photoCredit: 'Photo: London Skyline & Big Ben on Unsplash',
      landmark: 'Thames Basin & Westminster'
    };
  }
  if (norm.includes('tokyo')) {
    return {
      imagePath: '/cities/tokyo.jpg',
      photoCredit: 'Photo: Tokyo Tower & Megacity on Unsplash',
      landmark: 'Kanto Plain & Tokyo Bay'
    };
  }
  if (norm.includes('paris')) {
    return {
      imagePath: '/cities/paris.jpg',
      photoCredit: 'Photo: Eiffel Tower & Seine Basin, Paris on Unsplash',
      landmark: 'Eiffel Tower & Seine Basin'
    };
  }
  if (norm.includes('dubai')) {
    return {
      imagePath: '/cities/dubai.jpg',
      photoCredit: 'Photo: Burj Khalifa & Dubai Skyline on Unsplash',
      landmark: 'Burj Khalifa & Arabian Gulf Corridor'
    };
  }
  if (norm.includes('singapore')) {
    return {
      imagePath: '/cities/singapore.jpg',
      photoCredit: 'Photo: Marina Bay Sands, Singapore on Unsplash',
      landmark: 'Marina Bay & Maritime Strait'
    };
  }
  if (norm.includes('beijing')) {
    return {
      imagePath: '/cities/beijing.jpg',
      photoCredit: 'Photo: Beijing Central Architecture on Unsplash',
      landmark: 'Yanshan Basin & Central Plain'
    };
  }
  if (norm.includes('lahore')) {
    return {
      imagePath: '/cities/lahore.jpg',
      photoCredit: 'Photo: Badshahi Mosque & Lahore Historic Core on Unsplash',
      landmark: 'Indus Basin & Ravi Riverfront'
    };
  }
  if (norm.includes('bangkok')) {
    return {
      imagePath: '/cities/bangkok.jpg',
      photoCredit: 'Photo: Wat Arun & Bangkok Skyline on Unsplash',
      landmark: 'Chao Phraya River Basin'
    };
  }
  if (norm.includes('sydney')) {
    return {
      imagePath: '/cities/sydney.jpg',
      photoCredit: 'Photo: Sydney Opera House & Harbor on Unsplash',
      landmark: 'Sydney Harbor & Tasman Coast'
    };
  }
  if (norm.includes('los angeles')) {
    return {
      imagePath: '/cities/new-york.jpg',
      photoCredit: 'Photo: Urban Metropolitan Corridor on Unsplash',
      landmark: 'South Coast Air Basin'
    };
  }

  // Fallback default
  return {
    imagePath: '/cities/delhi.jpg',
    photoCredit: 'Photo: Atmospheric Urban Monitoring by Unsplash Contributors',
    landmark: 'Metropolitan Air Monitoring Zone'
  };
}

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

export async function fetchLiveAirQuality(city: CityPreset): Promise<AirQualityData> {
  try {
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.lat}&longitude=${city.lon}&current=pm10,pm2_5,nitrogen_dioxide,ozone,us_aqi&hourly=pm2_5,pm10,us_aqi&forecast_days=2`;
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    const [aqiRes, weatherRes] = await Promise.all([
      fetch(aqiUrl),
      fetch(weatherUrl)
    ]);

    if (!aqiRes.ok || !weatherRes.ok) {
      throw new Error(`Open-Meteo API returned HTTP status ${aqiRes.status} / ${weatherRes.status}`);
    }

    const aqiJson = await aqiRes.json();
    const weatherJson = await weatherRes.json();

    const currentAqi = Math.round(aqiJson.current?.us_aqi ?? 185);
    const pm25 = Math.round((aqiJson.current?.pm2_5 ?? 92.4) * 10) / 10;
    const pm10 = Math.round((aqiJson.current?.pm10 ?? 145.2) * 10) / 10;
    const no2 = Math.round((aqiJson.current?.nitrogen_dioxide ?? 48.1) * 10) / 10;
    const ozone = Math.round((aqiJson.current?.ozone ?? 32.0) * 10) / 10;

    const temp = Math.round(weatherJson.current?.temperature_2m ?? 24);
    const humidity = Math.round(weatherJson.current?.relative_humidity_2m ?? 60);
    const windSpeed = Math.round(weatherJson.current?.wind_speed_10m ?? 7);

    const { category, color } = getAQICategory(currentAqi);

    const currentHour = new Date().getHours();
    const isMorningOrNight = currentHour < 10 || currentHour >= 18;
    const thermalInversionActive = isMorningOrNight && windSpeed < 12;
    const boundaryLayerHeight = thermalInversionActive ? 220 : 850;

    // Build hourly trend
    const hourlyTimes = aqiJson.hourly?.time ?? [];
    const hourlyPm25 = aqiJson.hourly?.pm2_5 ?? [];
    const hourlyAqi = aqiJson.hourly?.us_aqi ?? [];

    const nowIndex = hourlyTimes.findIndex((t: string) => {
      const d = new Date(t);
      return d.getHours() === currentHour;
    });

    const startIndex = nowIndex >= 0 ? nowIndex : 0;
    const hourlySlice = hourlyTimes.slice(startIndex, startIndex + 12).map((t: string, idx: number) => {
      const d = new Date(t);
      const h = d.getHours();
      const hourLabel = `${h % 12 === 0 ? 12 : h % 12} ${h >= 12 ? 'PM' : 'AM'}`;
      const isVent = h >= 13 && h <= 15;
      return {
        time: t,
        hourLabel,
        pm25: Math.round(hourlyPm25[startIndex + idx] ?? pm25),
        aqi: Math.round(hourlyAqi[startIndex + idx] ?? currentAqi),
        isVentilationWindow: isVent
      };
    });

    const isCurrentVentSafe = currentHour >= 13 && currentHour <= 15 && currentAqi < 250;

    return {
      city: city.name,
      country: city.country,
      latitude: city.lat,
      longitude: city.lon,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      aqi: currentAqi,
      category,
      color,
      pm25,
      pm10,
      no2,
      ozone,
      temperature: temp,
      humidity,
      windSpeed,
      boundaryLayerHeight,
      thermalInversionActive,
      optimalVentilationWindow: {
        start: '13:30',
        end: '15:15',
        reason: 'Solar thermal heating expands the atmospheric boundary layer, dispersing ground-level particulate.',
        currentSafe: isCurrentVentSafe
      },
      hourly: hourlySlice.length > 0 ? hourlySlice : getMockHourly(pm25, currentAqi),
      isLive: true,
      isDemoData: false
    };
  } catch (err) {
    console.warn('Open-Meteo live API call failed; activating calibrated demo fallback dataset:', err);
    return getFallbackData(city, 'Live data unavailable for this city right now');
  }
}

function getMockHourly(basePm25: number, baseAqi: number) {
  const hours = ['8 AM', '10 AM', '12 PM', '2 PM (Window)', '4 PM', '6 PM', '8 PM', '10 PM'];
  const factors = [1.3, 1.1, 0.85, 0.65, 0.9, 1.25, 1.4, 1.35];
  return hours.map((hourLabel, i) => ({
    time: `2026-11-17T${i + 8}:00:00Z`,
    hourLabel,
    pm25: Math.round(basePm25 * factors[i]),
    aqi: Math.round(baseAqi * factors[i]),
    isVentilationWindow: i === 3
  }));
}

export function getFallbackData(city: CityPreset, errorMessage?: string): AirQualityData {
  // Calibrated city baseline estimates based on historical winter AQI trends
  const baselines: Record<string, { aqi: number; pm25: number; pm10: number; no2: number; ozone: number; temp: number }> = {
    'Delhi NCR': { aqi: 385, pm25: 288, pm10: 412, no2: 68, ozone: 32, temp: 19 },
    'Noida': { aqi: 375, pm25: 280, pm10: 405, no2: 66, ozone: 32, temp: 19 },
    'Ghaziabad': { aqi: 390, pm25: 295, pm10: 420, no2: 70, ozone: 30, temp: 19 },
    'Gurugram': { aqi: 360, pm25: 270, pm10: 390, no2: 64, ozone: 33, temp: 20 },
    'Faridabad': { aqi: 365, pm25: 275, pm10: 395, no2: 65, ozone: 33, temp: 20 },
    'Patna': { aqi: 340, pm25: 255, pm10: 360, no2: 58, ozone: 30, temp: 21 },
    'Kanpur': { aqi: 320, pm25: 240, pm10: 345, no2: 62, ozone: 34, temp: 20 },
    'Lucknow': { aqi: 310, pm25: 232, pm10: 330, no2: 56, ozone: 31, temp: 20 },
    'Varanasi': { aqi: 290, pm25: 218, pm10: 310, no2: 54, ozone: 32, temp: 21 },
    'Ludhiana': { aqi: 295, pm25: 220, pm10: 315, no2: 55, ozone: 30, temp: 18 },
    'Amritsar': { aqi: 280, pm25: 210, pm10: 300, no2: 52, ozone: 31, temp: 17 },
    'Kolkata': { aqi: 260, pm25: 195, pm10: 280, no2: 52, ozone: 28, temp: 23 },
    'Ahmedabad': { aqi: 220, pm25: 165, pm10: 240, no2: 48, ozone: 36, temp: 25 },
    'Jaipur': { aqi: 210, pm25: 158, pm10: 235, no2: 44, ozone: 38, temp: 22 },
    'Mumbai': { aqi: 175, pm25: 110, pm10: 185, no2: 42, ozone: 35, temp: 28 },
    'Surat': { aqi: 185, pm25: 120, pm10: 195, no2: 44, ozone: 34, temp: 27 },
    'Pune': { aqi: 160, pm25: 98, pm10: 170, no2: 38, ozone: 33, temp: 24 },
    'Hyderabad': { aqi: 145, pm25: 86, pm10: 155, no2: 36, ozone: 40, temp: 26 },
    'Chennai': { aqi: 115, pm25: 64, pm10: 125, no2: 30, ozone: 42, temp: 29 },
    'Bengaluru': { aqi: 95, pm25: 48, pm10: 105, no2: 28, ozone: 44, temp: 23 },
    'Kochi': { aqi: 75, pm25: 38, pm10: 85, no2: 24, ozone: 46, temp: 28 },
    'Chandigarh': { aqi: 180, pm25: 125, pm10: 200, no2: 40, ozone: 35, temp: 18 },
    // International
    'Lahore': { aqi: 395, pm25: 298, pm10: 425, no2: 68, ozone: 30, temp: 18 },
    'Beijing': { aqi: 190, pm25: 135, pm10: 210, no2: 50, ozone: 36, temp: 6 },
    'Dubai': { aqi: 135, pm25: 82, pm10: 175, no2: 35, ozone: 45, temp: 29 },
    'New York': { aqi: 48, pm25: 12, pm10: 25, no2: 22, ozone: 38, temp: 12 },
    'London': { aqi: 42, pm25: 10, pm10: 22, no2: 26, ozone: 35, temp: 9 },
    'Paris': { aqi: 52, pm25: 14, pm10: 26, no2: 28, ozone: 36, temp: 10 },
    'Tokyo': { aqi: 38, pm25: 9, pm10: 20, no2: 20, ozone: 40, temp: 14 },
    'Singapore': { aqi: 55, pm25: 15, pm10: 30, no2: 22, ozone: 38, temp: 28 },
    'Bangkok': { aqi: 140, pm25: 85, pm10: 150, no2: 36, ozone: 38, temp: 31 },
    'Sydney': { aqi: 32, pm25: 7, pm10: 18, no2: 15, ozone: 42, temp: 22 }
  };

  const matched = baselines[city.name] || { aqi: 160, pm25: 95, pm10: 165, no2: 38, ozone: 35, temp: 22 };
  const { category, color } = getAQICategory(matched.aqi);

  return {
    city: city.name,
    country: city.country,
    latitude: city.lat,
    longitude: city.lon,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    aqi: matched.aqi,
    category,
    color,
    pm25: matched.pm25,
    pm10: matched.pm10,
    no2: matched.no2,
    ozone: matched.ozone,
    temperature: matched.temp,
    humidity: 62,
    windSpeed: 6,
    boundaryLayerHeight: 250,
    thermalInversionActive: true,
    optimalVentilationWindow: {
      start: '13:30',
      end: '15:15',
      reason: 'Boundary layer expansion during peak sunlight disperses trapped surface smoke.',
      currentSafe: false
    },
    hourly: getMockHourly(matched.pm25, matched.aqi),
    isLive: false,
    isDemoData: true,
    errorMessage: errorMessage || 'Live data unavailable for this city right now'
  };
}
