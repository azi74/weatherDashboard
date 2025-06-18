import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import styles from './Forecast.module.css';

const Forecast: React.FC = () => {
  const { forecastData, unit } = useWeather();

  if (!forecastData) return null;

  const dailyForecast = forecastData.list.reduce((acc: any, item: any) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const forecastDates = Object.keys(dailyForecast).slice(1, 6);
  const temperatureUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className={`${styles.forecastContainer} glass-card`}>
      <h3>5-Day Forecast</h3>
      <div className={styles.forecastDays}>
        {forecastDates.map((date) => {
          const dayForecast = dailyForecast[date];
          const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
          const avgTemp = Math.round(
            dayForecast.reduce((sum: number, item: any) => sum + item.main.temp, 0) / dayForecast.length
          );
          const mainWeather = dayForecast[0].weather[0].main;
          const icon = dayForecast[0].weather[0].icon;

          return (
            <div key={date} className={styles.forecastDay}>
              <p className={styles.dayName}>{dayName}</p>
              <img 
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
                alt={mainWeather} 
              />
              <p className={styles.dayTemp}>{avgTemp}{temperatureUnit}</p>
              <p className={styles.dayWeather}>{mainWeather}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;