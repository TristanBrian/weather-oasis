
import { useState, useCallback } from "react";

/**
 * OpenWeatherMap API key. (Move to env if deploying securely.)
 */
const OPENWEATHER_API_KEY = "d185864f9a52b05b436e1a73edfc12fc"; // Replace with env integration if using secrets

export type WeatherUnits = "metric" | "imperial";

/**
 * Type-safe structure for API geocode result.
 */
interface GeoData {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}

/**
 * Current weather type.
 */
export interface WeatherCurrent {
  temp: number;
  weather: { icon: string; main: string; description: string }[];
  dt: number;
  wind_speed: number;
  humidity: number;
}

export interface WeatherDaily {
  dt: number;
  temp: { min: number; max: number };
  weather: { icon: string; main: string; description: string }[];
}

/**
 * Aggregated weather data for the UI; motivates type safety.
 */
export interface WeatherData {
  timezone: string;
  current: WeatherCurrent;
  daily: WeatherDaily[];
  cityName: string;
  country: string;
}

/**
 * Fetch city coordinates from OpenWeather Geocoding API.
 */
async function fetchGeocode(city: string): Promise<GeoData | null> {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${OPENWEATHER_API_KEY}`;
  const resp = await fetch(url);
  const data = await resp.json();
  if (data && data.length > 0) {
    return {
      name: data[0].name,
      country: data[0].country,
      lat: data[0].lat,
      lon: data[0].lon,
      state: data[0].state,
    };
  }
  return null;
}

// Fetch current weather instead of onecall
async function fetchCurrentWeather(lat: number, lon: number, units: WeatherUnits): Promise<any> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}`;
  const resp = await fetch(url);
  return await resp.json();
}

// Fetch forecast (5 day / 3 hour) for daily forecast data
async function fetchForecast(lat: number, lon: number, units: WeatherUnits): Promise<any> {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}`;
  const resp = await fetch(url);
  return await resp.json();
}

/**
 * Extract array of WeatherDaily from OpenWeather forecast endpoint.
 */
function extractDailyForecast(forecastData: any): WeatherDaily[] {
  const dailyData: WeatherDaily[] = [];
  const uniqueDays = new Set();
  
  if (!forecastData || !forecastData.list) return [];

  // Choose one forecast per day
  forecastData.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const day = date.getDate();
    
    if (!uniqueDays.has(day)) {
      uniqueDays.add(day);
      dailyData.push({
        dt: item.dt,
        temp: {
          min: item.main.temp_min,
          max: item.main.temp_max
        },
        weather: [{
          icon: item.weather[0].icon,
          main: item.weather[0].main,
          description: item.weather[0].description
        }]
      });
    }
  });

  return dailyData;
}

/**
 * useWeather - main weather-fetch hook for all consumers.
 * Includes full type safety and error handling.
 */
export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Main method to trigger weather lookup.
   * @param city City name, e.g., "Nairobi"
   * @param units Units system, defaults to "metric"
   */
  const getWeather = useCallback(async (city: string, units: WeatherUnits = "metric") => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get geographic coordinates
      const geo = await fetchGeocode(city);
      if (!geo) throw new Error("City not found!");
      
      // 2. Get current conditions
      const currentWeather = await fetchCurrentWeather(geo.lat, geo.lon, units);
      if (!currentWeather) throw new Error("Weather info missing!");
      
      // 3. Get forecast data
      const forecastData = await fetchForecast(geo.lat, geo.lon, units);
      if (!forecastData) throw new Error("Forecast data missing!");
      
      // 4. Parse daily forecast
      const dailyForecast = extractDailyForecast(forecastData);

      // 5. Set aggregated weather state
      setWeather({
        timezone: currentWeather.timezone || "",
        current: {
          temp: currentWeather.main.temp,
          weather: currentWeather.weather,
          dt: currentWeather.dt,
          wind_speed: currentWeather.wind.speed,
          humidity: currentWeather.main.humidity
        },
        daily: dailyForecast,
        cityName: geo.name,
        country: geo.country,
      });
    } catch (e: any) {
      setError(e.message || "Error fetching weather");
      setWeather(null);
    }
    setLoading(false);
  }, []);

  return { weather, loading, error, getWeather };
}
