import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import styles from './ErrorDisplay.module.css';

const ErrorDisplay: React.FC = () => {
  const { error } = useWeather();

  if (!error) return null;

  return (
    <div className={`${styles.errorContainer} glass-card`}>
      <p>{error}</p>
    </div>
  );
};

export default ErrorDisplay;