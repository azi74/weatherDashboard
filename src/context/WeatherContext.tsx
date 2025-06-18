import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`)
      ]);

      if (!weatherResponse.ok) throw new Error('Location not found');
      if (!forecastResponse.ok) throw new Error('Forecast not available');

      const [weatherData, forecastData] = await Promise.all([
        weatherResponse.json(),
        forecastResponse.json()
      ]);

      setWeatherData(weatherData);
      setForecastData(forecastData);
      localStorage.setItem('lastSearched', weatherData.name);
      setLastSearched(weatherData.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location weather');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, [unit]);

  const fetchWeatherByCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`)
      ]);

      if (!weatherResponse.ok) throw new Error('City not found');
      if (!forecastResponse.ok) throw new Error('Forecast not available');

      const [weatherData, forecastData] = await Promise.all([
        weatherResponse.json(),
        forecastResponse.json()
      ]);

      setWeatherData(weatherData);
      setForecastData(forecastData);
      localStorage.setItem('lastSearched', city);
      setLastSearched(city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, [unit]);

  const searchWeather = useCallback((city: string) => {
    if (city.trim()) {
      fetchWeatherByCity(city);
    }
  }, [fetchWeatherByCity]);

  const toggleUnit = useCallback(() => {
    setUnit(prev => {
      const newUnit = prev === 'metric' ? 'imperial' : 'metric';
      localStorage.setItem('weatherUnit', newUnit);
      return newUnit;
    });
  }, []);

  // Initialize weather data
  useEffect(() => {
    const loadInitialData = async () => {
      const savedUnit = localStorage.getItem('weatherUnit') as 'metric' | 'imperial' | null;
      if (savedUnit) setUnit(savedUnit);

      const lastCity = localStorage.getItem('lastSearched');
      if (lastCity) {
        await fetchWeatherByCity(lastCity);
        return;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
          },
          (error) => {
            console.error("Geolocation error:", error);
            fetchWeatherByCity("London");
          }
        );
      } else {
        fetchWeatherByCity("London");
      }
    };

    loadInitialData();
  }, [fetchWeatherByCity, fetchWeatherByCoords]);

  // Refetch data when unit changes
  useEffect(() => {
    if (lastSearched) {
      // const fetchData = unit === 'metric' ? fetchWeatherByCity : fetchWeatherByCoords;
      fetchWeatherByCity(lastSearched);
    }
  }, [unit, lastSearched, fetchWeatherByCity, fetchWeatherByCoords]);

  // Polling every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (lastSearched) {
        fetchWeatherByCity(lastSearched);
      }
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [lastSearched, fetchWeatherByCity]);

  const contextValue = React.useMemo(() => ({
    weatherData,
    forecastData,
    loading,
    error,
    unit,
    lastSearched,
    searchWeather,
    toggleUnit,
  }), [weatherData, forecastData, loading, error, unit, lastSearched, searchWeather, toggleUnit]);

  return (
    <WeatherContext.Provider value={contextValue}>
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