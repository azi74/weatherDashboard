```
#🌦️ Weather Dashboard (React + TypeScript)

A responsive weather application that displays current weather conditions and 5-day forecasts using the OpenWeatherMap API.

## 🚀 Features

- 🔍 Search for any city worldwide
- 🌡️ Real-time weather data (temperature, humidity, wind speed)
- ☀️🌧️ Weather condition icons
- 📅 5-day weather forecast
- 🌡️ Unit toggle (Celsius/Fahrenheit)
- 🔄 Auto-refresh every 30 seconds
- 💾 Persistent search history (local storage)
- 📱 Fully responsive design

## 🛠 Technologies Used

- React 18 (with Hooks)
- TypeScript
- CSS Modules
- OpenWeatherMap API
- Vite (or Create React App)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   cd weather-dashboard
```

2. Install dependencies:
   **bash**

   ```
   npm install
   ```
3. Set up your OpenWeatherMap API key:

   * Create a `.env` file in the root directory
   * Add your API key:
     **env**

     ```
     VITE_APP_OPENWEATHER_API_KEY=your_api_key_here
     ```
4. Run the development server:
   **bash**

   ```
   npm run dev
   ```

## 🌐 API Configuration

This project uses the [OpenWeatherMap API](https://openweathermap.org/api):

* Sign up for a free API key
* Free tier provides:
  * 1,000 API calls/day
  * Current weather + 5-day forecast
  * 60 calls/minute rate limit

## 🎨 Styling

* CSS Modules for component-scoped styles
* Mobile-first responsive design
* Clean, minimalist UI

## 🚨 Troubleshooting

If you get a **401 Unauthorized** error:

1. Verify your API key is correct
2. Ensure the key is activated (may take 2-24 hours)
3. Check for typos in the `.env` file
4. Restart your development server after changing `.env`

## 🙏 Acknowledgments

* OpenWeatherMap for the weather data API
* React and Vite teams for amazing tools
