import React, { createContext, useContext, useState, useEffect } from 'react';
import { WeatherContextType, WeatherData, ForecastData } from '../types/weather';

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [lastSearched, setLastSearched] = useState('');

  const API_KEY = 'b863d7e75efdd831f9f65fc913debb8f';

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      // Current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }
      
      const weatherData: WeatherData = await weatherResponse.json();
      setWeatherData(weatherData);
      
      // Forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Forecast not available');
      }
      
      const forecastData: ForecastData = await forecastResponse.json();
      setForecastData(forecastData);
      
      // Save to localStorage
      localStorage.setItem('lastSearched', city);
      setLastSearched(city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const searchWeather = (city: string) => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  // Load last searched city on initial render
  useEffect(() => {
    const lastCity = localStorage.getItem('lastSearched');
    if (lastCity) {
      searchWeather(lastCity);
    }
  }, []);

  // Refetch data when unit changes
  useEffect(() => {
    if (lastSearched) {
      fetchWeather(lastSearched);
    }
  }, [unit]);

  // Polling every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (lastSearched) {
        fetchWeather(lastSearched);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [lastSearched, unit]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
        loading,
        error,
        unit,
        lastSearched,
        searchWeather,
        toggleUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};