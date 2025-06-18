export interface WeatherMain {
  temp: number;
  humidity: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number; 
}

export interface Weather {
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
}

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  dt: number;
  timezone: number; // Add this line (timezone offset in seconds)
}

export interface ForecastMain {
  temp: number;
  humidity: number;
}

export interface ForecastItem {
  dt: number;
  main: ForecastMain;
  weather: Weather[];
  wind: Wind;
  dt_txt: string;
}

export interface ForecastData {
  list: ForecastItem[];
}

export interface WeatherContextType {
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  loading: boolean;
  error: string | null;
  unit: 'metric' | 'imperial';
  lastSearched: string;
  searchWeather: (city: string) => void;
  toggleUnit: () => void;
}