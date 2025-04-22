
import React from "react";
import { Sun, Cloud, CloudRain, CloudSnow } from "lucide-react";
import { WeatherDaily, WeatherUnits } from "@/hooks/useWeather";
import { format, addDays } from "date-fns";

function renderIcon(icon: string) {
  if (icon.includes("01")) return <Sun size={40} className="mx-auto text-yellow-400 drop-shadow" />;
  if (icon.includes("13")) return <CloudSnow size={40} className="mx-auto text-[#D3E4FD] drop-shadow" />;
  if (icon.includes("09") || icon.includes("10") || icon.includes("11"))
    return <CloudRain size={40} className="mx-auto text-[#1EAEDB] drop-shadow" />;
  return <Cloud size={40} className="mx-auto text-[#8E9196] drop-shadow" />;
}

interface Props {
  daily: WeatherDaily[];
  units?: WeatherUnits;
}

const ForecastCards: React.FC<Props> = ({ daily, units = "metric" }) => {
  if (!daily || daily.length < 2) return null;

  const today = new Date();
  const tomorrowDate = addDays(today, 1);
  const tomorrow = daily.find(d => {
    const dDate = new Date(d.dt * 1000);
    return dDate.getDate() === tomorrowDate.getDate() &&
      dDate.getMonth() === tomorrowDate.getMonth() &&
      dDate.getFullYear() === tomorrowDate.getFullYear();
  }) || daily[1];

  const nextTwo = daily
    .filter(d => {
      const dDate = new Date(d.dt * 1000);
      return dDate > tomorrowDate;
    })
    .sort((a, b) => a.dt - b.dt)
    .slice(0, 2);

  // Unit symbol for temperature
  const tempUnit = units === "metric" ? "°C" : "°F";

  return (
    <div className="mb-2 w-full max-w-2xl mx-auto">
      {/* Tomorrow */}
      <div
        className="max-w-lg mx-auto my-4 rounded-3xl px-6 py-8 bg-gradient-to-br from-[#FAFAFD]/90 via-[#E5DEFF]/90 to-[#D3E4FD]/90 shadow-2xl border border-purple-100/60 relative animate-fade-in transition-all flex-1"
        style={{ zIndex: 2 }}
      >
        <div className="font-bold text-lg sm:text-xl text-[#6E59A5] mb-2 text-center tracking-wide drop-shadow">
          Tomorrow ({format(tomorrowDate, "d MMMM, EEEE")})
        </div>
        <div className="flex flex-col items-center space-y-2">
          {renderIcon(tomorrow.weather[0].icon)}
          <div className="text-[#403E43] text-base mt-1 font-semibold leading-tight capitalize">
            {tomorrow.weather[0].description}
          </div>
          <div className="font-playfair text-2xl text-[#0EA5E9] mt-2 drop-shadow">
            {Math.round(tomorrow.temp.min)}{tempUnit} / {Math.round(tomorrow.temp.max)}{tempUnit}
          </div>
        </div>
      </div>
      {/* Next two days */}
      <div className="flex flex-row gap-7 justify-center mt-3 animate-fade-in flex-wrap">
        {nextTwo.map(day => {
          const date = new Date(day.dt * 1000);
          return (
            <div
              key={day.dt}
              className="flex flex-col w-36 sm:w-40 rounded-2xl bg-gradient-to-br from-[#FFDEE2]/90 via-[#FDE1D3]/95 to-[#FEF7CD]/85 shadow-lg border border-gray-200/60 px-5 py-6 items-center hover:scale-105 hover:shadow-xl transition-all glass-morphism"
            >
              <div className="font-extrabold text-[1rem] mb-1 text-[#D946EF] px-1">
                {format(date, "dd MMM, EEE")}
              </div>
              {renderIcon(day.weather[0].icon)}
              <div className="text-xs text-gray-700 mt-1 font-semibold select-none">
                {day.weather[0].main}
              </div>
              <div className="font-playfair mt-2 text-lg text-[#F97316]">
                {Math.round(day.temp.min)}{tempUnit} / {Math.round(day.temp.max)}{tempUnit}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCards;
