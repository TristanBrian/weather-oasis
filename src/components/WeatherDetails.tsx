
import React from "react";
import { Wind, Navigation, Droplet } from "lucide-react";
import { WeatherData, WeatherUnits } from "@/hooks/useWeather";

const getWindDirection = (degrees: number): string => {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const idx = Math.round(degrees / 22.5) % 16;
  return directions[idx];
};

interface Props {
  weather: WeatherData;
  units?: WeatherUnits;
}

const WeatherDetails: React.FC<Props> = ({ weather, units = "metric" }) => {
  const { current } = weather;
  const windDegrees = (current as any).wind_deg ?? 0;
  const windDirection = getWindDirection(windDegrees);

  // Wind speed units
  const windSpeedUnit = units === "metric" ? "km/h" : "mph";

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 animate-fade-in">
      {/* Wind Status */}
      <div className="rounded-2xl bg-white/80 dark:bg-card border-2 border-blue-100 flex flex-col items-center transition-transform hover:scale-105 shadow-[0_2px_24px_rgba(139,92,246,0.07)] px-5 py-6 glass-morphism backdrop-blur-xl">
        <span className="text-lg font-semibold text-[#7E69AB] mb-2 tracking-wider">Wind Status</span>
        <Wind size={34} className="text-[#1EAEDB] mb-1 drop-shadow-sm" />
        <div className="flex items-end gap-2 mt-1 mb-2">
          <span className="text-4xl font-bold text-[#403E43]">{current.wind_speed}</span>
          <span className="text-lg font-medium text-[#9F9EA1] mb-1">{windSpeedUnit}</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 mt-2 bg-[#F1F0FB]/70 rounded-xl px-3 py-1 shadow-inner">
          <Navigation size={20} className="text-[#8B5CF6] transition-transform" style={{ transform: `rotate(${windDegrees}deg)` }} />
          <span className="text-base font-medium text-[#7E69AB]">{windDirection} ({windDegrees}°)</span>
        </div>
      </div>
      {/* Humidity */}
      <div className="rounded-2xl bg-white/80 dark:bg-card border-2 border-purple-100 flex flex-col items-center transition-transform hover:scale-105 shadow-[0_2px_24px_rgba(139,92,246,0.07)] px-5 py-6 glass-morphism backdrop-blur-xl">
        <span className="text-lg font-semibold text-[#7E69AB] mb-2 tracking-wider">Humidity</span>
        <Droplet size={28} className="text-[#8B5CF6] mb-1 drop-shadow-sm" />
        <div className="flex items-end gap-2 mt-1 mb-2">
          <span className="text-4xl font-bold text-[#403E43]">{current.humidity}</span>
          <span className="text-lg font-medium text-[#9F9EA1] mb-1">%</span>
        </div>
        <div className="w-full mt-3">
          <div className="h-3 bg-[#F1F0FB]/90 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#9b87f5] to-[#33C3F0]" style={{ width: `${Math.min(current.humidity, 100)}%`, transition: "width 1s cubic-bezier(.4,2,.6,1)" }} />
          </div>
          <div className="flex justify-between text-xs text-[#8E9196] mt-1 font-medium px-1 select-none">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
        <div className="text-xs text-[#7E69AB] mt-3 italic tracking-wide font-medium">
          {current.humidity < 30 ? "Low humidity – dry air" : current.humidity < 60 ? "Comfortable" : "High humidity – feels muggy"}
        </div>
      </div>
    </div>
  );
};
export default WeatherDetails;
