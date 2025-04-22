import React, { useState, useEffect } from "react";
import { Sun, Cloud, Thermometer, Info } from "lucide-react";
import { WeatherData, WeatherUnits } from "@/hooks/useWeather";
import { format } from "date-fns";
import { getWeatherExplanation } from "@/utils/weatherExplanation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Loader from "@/components/ui/Loader";

/**
 * Selects a Lucide icon to represent the current weather visually.
 * @param icon OpenWeather icon code
 */
function getWeatherIcon(icon: string) {
  if (icon.includes("01")) return <Sun size={60} className="text-yellow-400 drop-shadow-xl" />;
  if (icon.includes("02") || icon.includes("03") || icon.includes("04")) return <Cloud size={60} className="text-purple-300 drop-shadow-xl" />;
  if (icon.includes("09") || icon.includes("10"))
    // rain
    return <Cloud size={60} className="text-blue-400 drop-shadow-xl" />;
  return <Thermometer size={60} className="text-gray-300/80" />;
}
interface Props {
  weather: WeatherData;
  onSetUnits?: (units: WeatherUnits) => void;
  units?: WeatherUnits;
  loading?: boolean;
}

/**
 * WeatherMain: Today's weather with advanced visual styling and natural explanations.
 * - Main temperature, icon, date, city.
 * - "Today" info is wrapped in modern, elevated container.
 * - Includes new top-right toggle to switch between °C and °F directly.
 */
const WeatherMain: React.FC<Props> = ({
  weather,
  onSetUnits,
  units = "metric",
  loading = false
}) => {
  const {
    current,
    cityName,
    country
  } = weather;
  const today = new Date(current.dt * 1000);
  const [localUnits, setLocalUnits] = useState<WeatherUnits>(units);
  const [unitLoading, setUnitLoading] = useState(false);

  // Sync with prop (controlled mode)
  useEffect(() => {
    setLocalUnits(units);
  }, [units]);

  // Display the temperature unit symbol
  const tempUnitSymbol = (onSetUnits ? units : localUnits) === "metric" ? "°C" : "°F";

  // Slightly delay for effect when switching units (faster, but gives feedback)
  const handleUnitsChange = (u: WeatherUnits) => {
    if (onSetUnits && units === u || !onSetUnits && localUnits === u) return;
    setUnitLoading(true);
    setTimeout(() => {
      if (onSetUnits) {
        onSetUnits(u);
      } else {
        setLocalUnits(u);
      }
      setUnitLoading(false);
    }, 400); // brief shimmer
  };
  const activeUnits = onSetUnits ? units : localUnits;
  return <div className="relative flex flex-col items-center px-5 py-7 min-w-[260px] gap-7 bg-white/80 dark:bg-card/70 border-2 border-[#ebe7fd] dark:border-[#444] rounded-3xl shadow-[0_4px_26px_2px_rgba(139,92,246,0.10)] backdrop-blur-2xl transition-all glass-morphism hover:shadow-[0_8px_44px_2px_rgba(139,92,246,0.17)] overflow-hidden max-w-full w-[94vw] md:w-[340px] animate-scale-in">

      {/* Loading overlay for unit switching */}
      {(unitLoading || loading) && <div className="absolute inset-0 bg-white/60 dark:bg-[#1A1F2C]/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in">
          <Loader />
        </div>}

      {/* Top right: °C/°F Toggle */}
      <div className="absolute top-4 right-4 z-30">
        
      </div>

      {/* Subtle highlight rings */}
      <div className="absolute -left-16 -top-16 w-56 h-56 rounded-full bg-[#D3E4FD]/50 blur-3xl z-0" />
      <div className="absolute right-0 -bottom-16 w-56 h-48 rounded-full bg-[#F2FCE2]/60 blur-2xl z-0" />
      <div className="absolute right-4 top-[-34px] w-36 h-36 rounded-full bg-[#D946EF]/30 blur-2xl z-0" />

      {/* Weather Icon */}
      <div className="rounded-full bg-gradient-to-br from-[#fff] to-[#E5DEFF] p-8 shadow-xl border border-[#E5DEFF] mb-2 z-10 flex items-center justify-center animate-fade-in">
        {getWeatherIcon(current.weather[0].icon)}
      </div>

      <div className="flex items-end gap-2 font-playfair z-10 mt-2 animate-fade-in">
        <span className="text-7xl font-extrabold text-[#6E59A5] drop-shadow-[0_4px_16px_#E5DEFF60]">
          {Math.round(current.temp)}
        </span>
        <span className="text-3xl text-[#9F9EA1] font-semibold align-bottom ml-1">{tempUnitSymbol}</span>
      </div>

      <div className="text-2xl text-[#8B5CF6] font-playfair font-semibold capitalize tracking-wide z-10 mt-2 animate-fade-in">
        {current.weather[0].description}
      </div>

      {/* Date and Location */}
      <div className="w-full flex flex-col items-center mt-1 z-10">
        <div className="flex items-center justify-center bg-gradient-to-r from-[#F2FCE2] via-[#FEF7CD] to-[#E5DEFF] rounded-xl px-6 py-2 mb-1 shadow-sm font-semibold text-md text-[#9F9EA1] tracking-wide border border-[#ece7fb]">
          <span className="bg-[#8B5CF6]/90 text-white rounded-full px-3 py-1 font-semibold text-[1.05rem] mr-3 shadow border border-[#E5DEFF]">
            Today
          </span>
          <span className="text-[#6E59A5] font-bold">{format(today, "d MMMM yyyy")}</span>
        </div>
        <div className="text-[1rem] text-[#7E69AB] font-medium text-center">
          {cityName}{country ? `, ${country}` : ""}
        </div>
      </div>

      {/* Weather summary */}
      <div className="mt-6 w-full rounded-2xl border border-[#ddd9f7] bg-gradient-to-br from-[#E5DEFF] to-[#D3E4FD] px-4 py-5 shadow-inner flex flex-col text-center animate-fade-in z-10">
        <div className="flex justify-center items-center gap-1 text-[#8B5CF6] font-bold text-md mb-[-4px] tracking-widest">
          <Info size={20} className="mr-1 mt-[-2px]" />
          Weather Insights
        </div>
        <div className="text-[#403E43] text-[1.07rem] leading-normal font-medium mt-2">
          {getWeatherExplanation(weather, activeUnits)}
        </div>
      </div>
    </div>;
};
export default WeatherMain;