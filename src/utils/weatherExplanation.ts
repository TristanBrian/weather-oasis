
/**
 * weatherExplanation.ts
 * Generates a friendly, natural-sounding summary based on current weather data.
 * Demonstrates advanced TypeScript usage and code clarity.
 */
import { WeatherData } from "@/hooks/useWeather";

// Helper to get wind description from speed (metric: km/h, imperial: mph)
function windDescription(speed: number, units: "metric" | "imperial" = "metric") {
  // Beaufort scale (approximate, simplified)
  if (speed < 1) return "calm";
  if (speed < 10) return "a gentle breeze";
  if (speed < 20) return "a moderate wind";
  if (speed < 30) return "strong winds";
  return "very strong winds";
}

// Capitalize a string
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generates a plain-English explanation for the current weather.
 * @param weather WeatherData object
 * @param units Which units are used ("metric" or "imperial")
 */
export function getWeatherExplanation(
  weather: WeatherData,
  units: "metric" | "imperial" = "metric"
): string {
  const { current, cityName, country } = weather;
  const temp = current.temp;
  const desc = capitalize(current.weather[0]?.description ?? "weather");
  const wind = windDescription(current.wind_speed, units);
  const humidity = current.humidity;

  let tempDesc = "";
  if (units === "imperial") {
    if (temp < 45) tempDesc = "cold";
    else if (temp < 70) tempDesc = "mild";
    else if (temp < 85) tempDesc = "warm";
    else tempDesc = "hot";
  } else {
    // Celsius
    if (temp < 10) tempDesc = "cold";
    else if (temp < 20) tempDesc = "mild";
    else if (temp < 28) tempDesc = "warm";
    else tempDesc = "hot";
  }

  // Humidity impression
  let humidDesc = "";
  if (humidity < 40) humidDesc = "air feels dry";
  else if (humidity < 70) humidDesc = "comfortable humidity";
  else humidDesc = "rather humid";

  // Example explanation
  return `${desc} in ${cityName}${country ? ", " + country : ""}. 
It's currently ${Math.round(temp)}°${units === "imperial" ? "F" : "C"}, which feels ${tempDesc}. 
There is ${wind}, with humidity at ${humidity}%, making the ${humidDesc}.`;
}
