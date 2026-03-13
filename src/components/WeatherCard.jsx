import React from 'react';
import { 
  Sun, Cloud, CloudSun, CloudRain, 
  CloudDrizzle, CloudFog, CloudLightning, 
  CloudSnow, Wind, Droplets, MapPin, Thermometer
} from 'lucide-react';
import { getWeatherDescription } from '../services/weatherService';

const iconMap = {
  Sun, Cloud, CloudSun, CloudRain, 
  CloudDrizzle, CloudFog, CloudLightning, 
  CloudSnow
};

const WeatherCard = ({ data, city }) => {
  if (!data) return null;

  const { current } = data;
  const description = getWeatherDescription(current.weather_code);
  const Icon = iconMap[description.icon] || Cloud;

  return (
    <div className="glass-card w-full max-w-2xl mx-auto mb-8 animate-fade-in relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-col items-center text-center gap-6 relative z-10">
        <div className="flex items-center gap-2 text-text-secondary bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
          <MapPin size={16} className="text-accent" />
          <span className="text-sm font-semibold tracking-wide uppercase italic">{city}</span>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 bg-white/20 blur-[80px] rounded-full animate-pulse" />
          <Icon size={160} className="relative text-white weather-icon-glow drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
        </div>

        <div className="flex flex-col">
          <h1 className="text-9xl text-display leading-none">{Math.round(current.temperature_2m)}°</h1>
          <p className="text-2xl font-medium tracking-tight mt-2">{description.label}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-12 pt-8 border-t border-white/10 relative z-10">
        <div className="flex flex-col items-center p-3 rounded-2xl bg-white/5 border border-white/5">
          <Wind className="text-accent mb-2" size={20} />
          <span className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">Wind</span>
          <span className="text-sm font-bold">{current.wind_speed_10m} <span className="text-[10px] font-normal opacity-60">km/h</span></span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-2xl bg-white/5 border border-white/5">
          <Droplets className="text-accent mb-2" size={20} />
          <span className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">Humidity</span>
          <span className="text-sm font-bold">{current.relative_humidity_2m}%</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-2xl bg-white/5 border border-white/5">
          <Thermometer className="text-accent mb-2" size={20} />
          <span className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">RealFeel</span>
          <span className="text-sm font-bold">{Math.round(current.apparent_temperature)}°</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
