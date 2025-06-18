import React, { useEffect, useState } from 'react';
import { useWeather } from '../../context/WeatherContext';
import styles from './WeatherDisplay.module.css';

const WeatherDisplay: React.FC = () => {
  const { weatherData, unit, toggleUnit} = useWeather();
  const [localTime, setLocalTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    if (weatherData) {
      // Calculate local time using timezone offset (seconds to milliseconds)
      const localTimestamp = Date.now() + (weatherData.timezone * 1000);
      const localDate = new Date(localTimestamp);
      
      // Format time (HH:MM AM/PM)
      const timeString = localDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      // Format date (Weekday, Month Day)
      const dateString = localDate.toLocaleDateString([], {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
      
      setLocalTime(timeString);
      setDate(dateString);

      // Update time every minute
      const timer = setInterval(() => {
        const updatedTime = new Date(Date.now() + (weatherData.timezone * 1000))
          .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        setLocalTime(updatedTime);
      }, 60000);

      return () => clearInterval(timer);
    }
  }, [weatherData]);

  if (!weatherData) return null;

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const temperatureUnit = unit === 'metric' ? '°C' : '°F';
  const windSpeedUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className={`${styles.weatherContainer} glass-card`}>
      <div className={styles.weatherHeader}>
        <div>
          <h2>{weatherData.name}</h2>
          <div className={styles.timeDisplay}>
            <span className={styles.time}>{localTime}</span>
            <span className={styles.date}>{date}</span>
          </div>
        </div>
        <button onClick={toggleUnit} className={styles.unitToggle}>
          {unit === 'metric' ? '°F' : '°C'}
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
          <div className={styles.detailsGrid}>
            <div>
              <span>Feels like</span>
              <span>{Math.round(weatherData.main.feels_like)}{temperatureUnit}</span>
            </div>
            <div>
              <span>Humidity</span>
              <span>{weatherData.main.humidity}%</span>
            </div>
            <div>
              <span>Wind</span>
              <span>{weatherData.wind.speed} {windSpeedUnit}</span>
            </div>
            <div>
              <span>Min Temp</span>
              <span>{Math.round(weatherData.main.temp_min)}{temperatureUnit}</span>
            </div>
            <div>
              <span>Max Temp</span>
              <span>{Math.round(weatherData.main.temp_max)}{temperatureUnit}</span>
            </div>
            <div>
              <span>Pressure</span>
              <span>{weatherData.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;