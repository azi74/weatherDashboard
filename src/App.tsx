import React from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import Forecast from './components/Forecast/Forecast';
import ErrorDisplay from './components/ErrorDisplay/ErrorDisplay';
import { WeatherProvider } from './context/WeatherContext';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <WeatherProvider>
      <div className={styles.app}>
        <h1 className={styles.title}>Weather Dashboard</h1>
        <SearchBar />
        <ErrorDisplay />
        <WeatherDisplay />
        <Forecast />
      </div>
    </WeatherProvider>
  );
};

export default App;