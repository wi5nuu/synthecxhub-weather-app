import React from 'react';
import { 
  Sun, Cloud, CloudSun, CloudRain, 
  CloudDrizzle, CloudFog, CloudLightning, 
  CloudSnow 
} from 'lucide-react';
import { getWeatherDescription } from '../services/weatherService';

const iconMap = {
  Sun, Cloud, CloudSun, CloudRain, 
  CloudDrizzle, CloudFog, CloudLightning, 
  CloudSnow
};

const Forecast = ({ data }) => {
  if (!data || !data.daily) return null;

  const { daily } = data;

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in mt-12 mb-16 px-4 md:px-0">
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-xl font-bold tracking-tight text-white/90">Upcoming Forecast</h2>
        <span className="text-[10px] uppercase font-bold tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">7 Days</span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-8 pt-2 scroll-smooth no-scrollbar snap-x">
        {daily.time.map((date, index) => {
          const code = daily.weather_code[index];
          const description = getWeatherDescription(code);
          const Icon = iconMap[description.icon] || Cloud;
          const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
          const dayShort = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
          const isToday = index === 0;

          return (
            <div 
              key={date}
              className={`glass-card flex-shrink-0 min-w-[140px] md:min-w-[170px] p-6 text-center flex flex-col items-center gap-5 snap-center transition-all duration-300 ${isToday ? 'border-accent bg-white/20' : 'bg-white/8'}`}
            >
              <div className="flex flex-col gap-1">
                <span className={`text-base font-bold ${isToday ? 'text-accent' : 'text-white'}`}>
                  {isToday ? 'Today' : dayShort}
                </span>
                <span className="text-[10px] uppercase tracking-tighter opacity-50 font-medium">
                  {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <div className="relative group-hover:scale-110 transition-transform">
                <div className={`absolute inset-0 blur-2xl rounded-full opacity-40 ${isToday ? 'bg-accent' : 'bg-white'}`} />
                <Icon size={40} className={`relative ${isToday ? 'text-accent' : 'text-white'}`} />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold tracking-tighter">{Math.round(daily.temperature_2m_max[index])}°</span>
                <div className="w-8 h-[2px] bg-white/10 mx-auto rounded-full" />
                <span className="text-sm font-medium opacity-60">{Math.round(daily.temperature_2m_min[index])}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
