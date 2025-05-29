import React, { useState } from 'react';
import { useWeather } from '../../hooks/useWeather';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  const [city, setCity] = useState('');
  const { searchWeather, loading } = useWeather();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchWeather(city);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className={styles.searchInput}
        disabled={loading}
      />
      <button type="submit" className={styles.searchButton} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;