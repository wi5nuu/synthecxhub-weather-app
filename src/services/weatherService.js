const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export const getCityCoordinates = async (city) => {
  try {
    const response = await fetch(`${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new Error(`City "${city}" not found.`);
    }
    
    return data.results[0];
  } catch (error) {
    throw error;
  }
};

export const getWeatherData = async (lat, lon) => {
  try {
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m',
      hourly: 'temperature_2m,weather_code',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
      timezone: 'auto',
      forecast_days: 7
    });

    const response = await fetch(`${WEATHER_URL}?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch weather data.');
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getWeatherDescription = (code) => {
  const codes = {
    0: { label: 'Clear sky', icon: 'Sun', class: 'clear' },
    1: { label: 'Mainly clear', icon: 'CloudSun', class: 'clear' },
    2: { label: 'Partly cloudy', icon: 'CloudSun', class: 'cloudy' },
    3: { label: 'Overcast', icon: 'Cloud', class: 'cloudy' },
    45: { label: 'Fog', icon: 'CloudFog', class: 'cloudy' },
    48: { label: 'Depositing rime fog', icon: 'CloudFog', class: 'cloudy' },
    51: { label: 'Light drizzle', icon: 'CloudDrizzle', class: 'rain' },
    53: { label: 'Moderate drizzle', icon: 'CloudDrizzle', class: 'rain' },
    55: { label: 'Dense drizzle', icon: 'CloudDrizzle', class: 'rain' },
    61: { label: 'Slight rain', icon: 'CloudRain', class: 'rain' },
    63: { label: 'Moderate rain', icon: 'CloudRain', class: 'rain' },
    65: { label: 'Heavy rain', icon: 'CloudRain', class: 'rain' },
    71: { label: 'Slight snow', icon: 'CloudSnow', class: 'cloudy' },
    73: { label: 'Moderate snow', icon: 'CloudSnow', class: 'cloudy' },
    75: { label: 'Heavy snow', icon: 'CloudSnow', class: 'cloudy' },
    95: { label: 'Thunderstorm', icon: 'CloudLightning', class: 'rain' },
  };
  
  return codes[code] || { label: 'Unknown', icon: 'Cloud', class: 'cloudy' };
};
