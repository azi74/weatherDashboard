import React from 'react';
import { useWeather } from '../../hooks/useWeather';
import styles from './ErrorDisplay.module.css';

const ErrorDisplay: React.FC = () => {
  const { error } = useWeather();

  if (!error) return null;

  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>{error}</p>
    </div>
  );
};

export default ErrorDisplay;