import React, { useState } from 'react';
import { useWeather } from '../../context/WeatherContext';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  const [city, setCity] = useState('');
  const { searchWeather, loading } = useWeather();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      searchWeather(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.searchForm} glass-card`}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
        className={styles.searchInput}
        disabled={loading}
      />
      <button type="submit" className={styles.searchButton} disabled={loading || !city.trim()}>
        {loading ? (
          <span className={styles.spinner}></span>
        ) : (
          <span>Search</span>
        )}
      </button>
    </form>
  );
};

export default SearchBar;