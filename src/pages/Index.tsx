
import React, { useEffect, useState } from "react";
import WeatherSearch from "@/components/WeatherSearch";
import WeatherMain from "@/components/WeatherMain";
import ForecastCards from "@/components/ForecastCards";
import WeatherDetails from "@/components/WeatherDetails";
import { useWeather, WeatherUnits } from "@/hooks/useWeather";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const {
    weather,
    loading,
    error,
    getWeather
  } = useWeather();
  
  // Track the units at the top level, so it can be shared across components
  const [units, setUnits] = useState<WeatherUnits>("metric");

  React.useEffect(() => {
    getWeather("Nairobi", units);
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (error) {
      toast({
        title: error
      });
    }
  }, [error]);

  // Handle unit changes at the top level
  const handleUnitChange = (newUnits: WeatherUnits) => {
    if (newUnits !== units) {
      setUnits(newUnits);
      // Re-fetch weather data with the new units
      if (weather) {
        getWeather(weather.cityName, newUnits);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#F2FCE2] via-[#E5DEFF] to-[#D3E4FD] transition-all">
      <div className="w-full max-w-7xl px-3 py-8 md:p-10 flex flex-col md:flex-row gap-10 items-stretch md:items-start animate-fade-in">
        {/* Main weather (left column) */}
        <div className="w-full md:w-[350px] flex-shrink-0 flex flex-col items-center justify-between mb-4 md:mb-0 z-10">
          {weather && <WeatherMain weather={weather} units={units} onSetUnits={handleUnitChange} />}
        </div>
        {/* Right content */}
        <div className="flex-1 flex flex-col gap-6 z-30">
          <WeatherSearch onSearch={getWeather} loading={loading} currentUnits={units} onUnitsChange={handleUnitChange} />
          {weather && (
            <>
              <ForecastCards daily={weather.daily} units={units} />
              <WeatherDetails weather={weather} units={units} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
