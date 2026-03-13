import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import { getCityCoordinates, getWeatherData, getWeatherDescription } from './services/weatherService';
import { AlertCircle, Loader2, Sparkles } from 'lucide-react';

function App() {
  const [city, setCity] = useState('Jakarta');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const coords = await getCityCoordinates(cityName);
      const data = await getWeatherData(coords.latitude, coords.longitude);
      setWeatherData(data);
      setCity(coords.name);
      
      const description = getWeatherDescription(data.current.weather_code);
      document.body.style.background = `var(--bg-gradient-${description.class})`;
    } catch (err) {
      console.error(err);
      setError(err.message || 'City not found. Try a different name.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <main className="min-h-screen pt-12 pb-8 flex flex-col items-center max-w-7xl mx-auto overflow-hidden">
      <header className="w-full text-center mb-10 animate-fade-in relative">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="text-accent animate-pulse" size={20} />
          <h1 className="text-5xl font-black text-display tracking-tighter">
            SKY<span className="text-accent">CAST</span>
          </h1>
        </div>
        <p className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] ml-1">Atmospheric Intelligence</p>
      </header>

      <SearchBar onSearch={fetchWeather} isLoading={loading} />

      {error && (
        <div className="glass-card border-red-500/30 bg-red-500/10 flex items-center gap-4 text-red-200 mb-10 max-w-sm w-[90%] animate-fade-in py-4">
          <AlertCircle className="flex-shrink-0 text-red-400" size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {loading && !weatherData && (
        <div className="flex flex-col items-center gap-6 my-32">
          <div className="relative">
             <div className="absolute inset-0 bg-accent/20 blur-3xl animate-pulse" />
             <Loader2 className="animate-spin text-accent relative" size={64} />
          </div>
          <p className="text-accent/80 font-bold uppercase tracking-widest text-xs animate-pulse">Syncing Satellites...</p>
        </div>
      )}

      {weatherData && (
        <div className="w-full px-4 md:px-0">
          <WeatherCard data={weatherData} city={city} />
          <Forecast data={weatherData} />
        </div>
      )}

      <footer className="mt-auto px-8 text-center opacity-30 text-[10px] font-bold uppercase tracking-[0.2em] space-y-2">
        <p>© 2026 SKYCAST GLOBAL • POWERED BY OPEN-METEO</p>
      </footer>
    </main>
  );
}

export default App;
