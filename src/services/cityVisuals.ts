export interface CityVisual {
  imagePath: string;
  photoCredit: string;
  landmark: string;
}

export function getCityVisual(cityName: string): CityVisual {
  const norm = (cityName || '').toLowerCase();

  // Specific Indian City mappings with authentic high-resolution local photos
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
      photoCredit: 'Photo: Chennai Central Heritage Railway Terminal (Wikimedia Commons CC)',
      landmark: 'Chennai Central Station'
    };
  }
  if (norm.includes('kolkata')) {
    return {
      imagePath: '/cities/kolkata.jpg',
      photoCredit: 'Photo: Howrah Bridge (Rabindra Setu) over Hooghly River (Wikimedia Commons CC)',
      landmark: 'Howrah Bridge'
    };
  }
  if (norm.includes('hyderabad')) {
    return {
      imagePath: '/cities/hyderabad.jpg',
      photoCredit: 'Photo: Historic Charminar Monument, Hyderabad (Wikimedia Commons CC)',
      landmark: 'Charminar & Old City Heritage Corridor'
    };
  }
  if (norm.includes('pune')) {
    return {
      imagePath: '/cities/pune.jpg',
      photoCredit: 'Photo: Shaniwar Wada Delhi Gate, Pune (Wikimedia Commons CC)',
      landmark: 'Shaniwar Wada'
    };
  }
  if (norm.includes('ahmedabad')) {
    return {
      imagePath: '/cities/ahmedabad.jpg',
      photoCredit: 'Photo: Sabarmati Riverfront Promenade, Ahmedabad (Wikimedia Commons CC)',
      landmark: 'Sabarmati Riverfront'
    };
  }
  if (norm.includes('surat')) {
    return {
      imagePath: '/cities/surat.jpg',
      photoCredit: 'Photo: Tapi River Cable-Stayed Bridge, Surat (Wikimedia Commons CC)',
      landmark: 'Tapi Riverfront Cable Bridge & Diamond City'
    };
  }
  if (norm.includes('lucknow')) {
    return {
      imagePath: '/cities/lucknow.jpg',
      photoCredit: 'Photo: Rumi Darwaza & Awadh Heritage by Unsplash',
      landmark: 'Rumi Darwaza & Gomti Basin'
    };
  }
  if (norm.includes('kanpur')) {
    return {
      imagePath: '/cities/kanpur.jpg',
      photoCredit: 'Photo: Historic Kanpur Central Heritage Landmark (Wikimedia Commons CC)',
      landmark: 'Kanpur Central & Ganga Industrial Corridor'
    };
  }
  if (norm.includes('varanasi')) {
    return {
      imagePath: '/cities/varanasi.jpg',
      photoCredit: 'Photo: Ghats of Kashi, Varanasi by Unsplash Contributors',
      landmark: 'Kashi Ghats & Ganges Inversion Basin'
    };
  }
  if (norm.includes('agra')) {
    return {
      imagePath: '/cities/agra.jpg',
      photoCredit: 'Photo: Taj Mahal, Agra by Unsplash Contributors',
      landmark: 'Taj Trapezium Zone & Yamuna Corridor'
    };
  }
  if (norm.includes('amritsar')) {
    return {
      imagePath: '/cities/amritsar.jpg',
      photoCredit: 'Photo: Golden Temple, Amritsar by Unsplash Contributors',
      landmark: 'Harmandir Sahib & Punjab Agricultural Plain'
    };
  }
  if (norm.includes('chandigarh')) {
    return {
      imagePath: '/cities/chandigarh.jpg',
      photoCredit: 'Photo: Chandigarh City & Shivalik by Unsplash',
      landmark: 'Capitol Complex & Shivalik Foothills'
    };
  }
  if (norm.includes('srinagar')) {
    return {
      imagePath: '/cities/srinagar.jpg',
      photoCredit: 'Photo: Dal Lake & Kashmir Valley by Unsplash',
      landmark: 'Dal Lake & Himalayan Inversion Basin'
    };
  }
  if (norm.includes('kochi')) {
    return {
      imagePath: '/cities/kochi.jpg',
      photoCredit: 'Photo: Kochi Backwaters & Harbour by Unsplash',
      landmark: 'Vembanad Backwaters & Marine Basin'
    };
  }
  if (norm.includes('bhopal')) {
    return {
      imagePath: '/cities/bhopal.jpg',
      photoCredit: 'Photo: Upper Lake (Bhojtal), Bhopal (Wikimedia Commons CC)',
      landmark: 'Upper Lake (Bhojtal) & Raja Bhoj Basin'
    };
  }
  if (norm.includes('indore')) {
    return {
      imagePath: '/cities/indore.jpg',
      photoCredit: 'Photo: Historic Rajwada Palace, Indore (Wikimedia Commons CC)',
      landmark: 'Rajwada Palace'
    };
  }
  if (norm.includes('dehradun')) {
    return {
      imagePath: '/cities/dehradun.jpg',
      photoCredit: 'Photo: Doon Valley & Mussoorie Foothills by Unsplash',
      landmark: 'Doon Valley & Shivalik Foothills'
    };
  }
  if (norm.includes('udaipur')) {
    return {
      imagePath: '/cities/udaipur.jpg',
      photoCredit: 'Photo: Lake Pichola, Udaipur by Unsplash',
      landmark: 'Lake Pichola & Aravalli Basin'
    };
  }
  if (norm.includes('jodhpur')) {
    return {
      imagePath: '/cities/jodhpur.jpg',
      photoCredit: 'Photo: Mehrangarh Fort, Jodhpur by Unsplash',
      landmark: 'Mehrangarh & Thar Desert Fringe'
    };
  }
  if (norm.includes('visakhapatnam')) {
    return {
      imagePath: '/cities/visakhapatnam.jpg',
      photoCredit: 'Photo: RK Beach & Eastern Ghats by Unsplash',
      landmark: 'Dolphin’s Nose & Coastal Industrial Belt'
    };
  }
  if (norm.includes('ludhiana')) {
    return {
      imagePath: '/cities/ludhiana.jpg',
      photoCredit: 'Photo: Punjab Industrial Heartland by Unsplash',
      landmark: 'Sutlej River Basin & Industrial Zone'
    };
  }
  if (norm.includes('coimbatore')) {
    return {
      imagePath: '/cities/coimbatore.jpg',
      photoCredit: 'Photo: Western Ghats Gap, Coimbatore by Unsplash',
      landmark: 'Palakkad Gap & Textile Corridor'
    };
  }
  if (norm.includes('jaipur')) {
    return {
      imagePath: '/cities/jaipur.jpg',
      photoCredit: 'Photo: Hawa Mahal, Rajasthan by Annie Spratt / Unsplash',
      landmark: 'Hawa Mahal & Aravalli Basin'
    };
  }
  if (norm.includes('patna')) {
    return {
      imagePath: '/cities/patna.jpg',
      photoCredit: 'Photo: River Ganges with Gandhi Bridge & Patna Riverbank (Wikimedia Commons CC)',
      landmark: 'Ganges Riverbank'
    };
  }
  if (norm.includes('nagpur')) {
    return {
      imagePath: '/cities/nagpur.jpg',
      photoCredit: 'Photo: Deekshabhoomi Stupa, Nagpur (Wikimedia Commons CC)',
      landmark: 'Deekshabhoomi'
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
      imagePath: '/cities/los-angeles.jpg',
      photoCredit: 'Photo: Downtown Los Angeles Skyline on Unsplash',
      landmark: 'South Coast Basin & Downtown LA'
    };
  }
  if (norm.includes('san francisco')) {
    return {
      imagePath: '/cities/san-francisco.jpg',
      photoCredit: 'Photo: Golden Gate Bridge & Bay on Unsplash',
      landmark: 'San Francisco Bay & Pacific Air Basin'
    };
  }
  if (norm.includes('seoul')) {
    return {
      imagePath: '/cities/seoul.jpg',
      photoCredit: 'Photo: Seoul Skyline & Han River on Unsplash',
      landmark: 'Han River Basin & N Seoul Tower'
    };
  }
  if (norm.includes('rome')) {
    return {
      imagePath: '/cities/rome.jpg',
      photoCredit: 'Photo: Colosseum & Historic Rome on Unsplash',
      landmark: 'Tiber Basin & Historic Centre'
    };
  }
  if (norm.includes('cairo')) {
    return {
      imagePath: '/cities/cairo.jpg',
      photoCredit: 'Photo: Nile Valley & Pyramids on Unsplash',
      landmark: 'Nile Delta Basin & Giza Corridor'
    };
  }
  if (norm.includes('berlin')) {
    return {
      imagePath: '/cities/berlin.jpg',
      photoCredit: 'Photo: Berlin Skyline & Brandenburg Gate on Unsplash',
      landmark: 'Spree Valley & Environmental Zone'
    };
  }
  if (norm.includes('toronto')) {
    return {
      imagePath: '/cities/toronto.jpg',
      photoCredit: 'Photo: Toronto Skyline & CN Tower on Unsplash',
      landmark: 'Lake Ontario Shore & Downtown'
    };
  }
  if (norm.includes('istanbul')) {
    return {
      imagePath: '/cities/istanbul.jpg',
      photoCredit: 'Photo: Bosphorus Strait & Historic Peninsula on Unsplash',
      landmark: 'Bosphorus Strait & Golden Horn'
    };
  }
  if (norm.includes('mexico city')) {
    return {
      imagePath: '/cities/mexico-city.jpg',
      photoCredit: 'Photo: Mexico City Valley Basin on Unsplash',
      landmark: 'High-Altitude Volcanic Valley Basin'
    };
  }

  // Fallback default
  return {
    imagePath: '/cities/delhi.jpg',
    photoCredit: 'Photo: Atmospheric Urban Monitoring by Unsplash Contributors',
    landmark: 'Urban Air Station'
  };
}
