import React from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import Forecast from './components/Forecast/Forecast';
import ErrorDisplay from './components/ErrorDisplay/ErrorDisplay';
import { WeatherProvider } from './context/WeatherContext';
import { useWeather } from './context/WeatherContext';
import styles from './App.module.css';

const AppContent = () => {
  const { weatherData } = useWeather();
  const weatherClass = weatherData?.weather[0].main.toLowerCase() || 'clear';
  
  return (
    <div className={`${styles.app} ${weatherClass}`}>
      <div className={styles.appContainer}>
        <h1 className={styles.title}>WeatherBoard</h1>
        <SearchBar />
        <ErrorDisplay />
        <WeatherDisplay />
        <Forecast />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <WeatherProvider>
      <AppContent />
    </WeatherProvider>
  );
};

export default App;