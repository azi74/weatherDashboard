import React from 'react';
import { useWeather } from '../../hooks/useWeather';
import styles from './WeatherDisplay.module.css';

const WeatherDisplay: React.FC = () => {
  const { weatherData, unit, toggleUnit } = useWeather();

  if (!weatherData) return null;

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const temperatureUnit = unit === 'metric' ? '°C' : '°F';
  const windSpeedUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.weatherHeader}>
        <h2>{weatherData.name}</h2>
        <button onClick={toggleUnit} className={styles.unitToggle}>
          Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
        </button>
      </div>
      
      <div className={styles.weatherMain}>
        <div className={styles.weatherIcon}>
          <img 
            src={getWeatherIcon(weatherData.weather[0].icon)} 
            alt={weatherData.weather[0].description} 
          />
          <p>{weatherData.weather[0].main}</p>
        </div>
        
        <div className={styles.weatherDetails}>
          <p className={styles.temperature}>
            {Math.round(weatherData.main.temp)}{temperatureUnit}
          </p>
          <p>Feels like: {Math.round(weatherData.main.feels_like)}{temperatureUnit}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind: {weatherData.wind.speed} {windSpeedUnit}</p>
          <p>Min: {Math.round(weatherData.main.temp_min)}{temperatureUnit}</p>
          <p>Max: {Math.round(weatherData.main.temp_max)}{temperatureUnit}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;