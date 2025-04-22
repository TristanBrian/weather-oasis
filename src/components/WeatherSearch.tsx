
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { WeatherUnits } from "@/hooks/useWeather";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Props {
  onSearch: (city: string, units: WeatherUnits) => void;
  loading: boolean;
  currentUnits?: WeatherUnits; // Add to sync with parent
  onUnitsChange?: (units: WeatherUnits) => void; // Add to notify parent
}

const WeatherSearch: React.FC<Props> = ({ onSearch, loading, currentUnits, onUnitsChange }) => {
  const [city, setCity] = useState("");
  const [units, setUnits] = useState<WeatherUnits>("metric");
  
  // Sync with parent component if it provides units
  useEffect(() => {
    if (currentUnits) {
      setUnits(currentUnits);
    }
  }, [currentUnits]);

  // Triggers the weather search
  function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!city) {
      toast({ title: "Enter a city name" });
      return;
    }
    onSearch(city, units);
  }

  // When toggling units, update and search immediately (if city is present)
  function handleUnitsChange(val: WeatherUnits) {
    setUnits(val);
    
    // Notify parent component if callback provided
    if (onUnitsChange) {
      onUnitsChange(val);
    } else if (city) {
      // Only call onSearch directly if parent doesn't handle units
      onSearch(city, val);
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-wrap gap-2 items-center justify-center mb-5">
      <Input
        placeholder="Search city..."
        disabled={loading}
        value={city}
        onChange={e => setCity(e.target.value)}
        className="max-w-xs rounded-lg shadow"
      />
      <Button
        type="submit"
        variant="secondary"
        disabled={loading}
        className="h-10 px-4"
      >
        GO
      </Button>
      {/* Sleek toggle group for units */}
      <ToggleGroup
        type="single"
        value={units}
        onValueChange={(val) => val && handleUnitsChange(val as WeatherUnits)}
        className="ml-2 flex bg-[#ede9fe] border border-[#c4b5fd] rounded-full px-1 py-1 h-12 items-center shadow-inner gap-1 transition-colors duration-200 min-w-[120px]"
      >
        <ToggleGroupItem
          value="metric"
          aria-label="Celsius"
          className={`rounded-l-full font-bold flex-1 px-8 py-2.5 text-lg transition-all
            ${units === "metric"
              ? "bg-[#8B5CF6] text-white shadow drop-shadow-md scale-105"
              : "bg-transparent text-[#8B5CF6] hover:bg-[#f3e8ff]/90"}
            outline-none focus:ring-2 focus:ring-[#7E69AB]
          `}
          disabled={loading}
        >
          °C
        </ToggleGroupItem>
        <ToggleGroupItem
          value="imperial"
          aria-label="Fahrenheit"
          className={`rounded-r-full font-bold flex-1 px-8 py-2.5 text-lg transition-all
            ${units === "imperial"
              ? "bg-[#8B5CF6] text-white shadow drop-shadow-md scale-105"
              : "bg-transparent text-[#8B5CF6] hover:bg-[#f3e8ff]/90"}
            outline-none focus:ring-2 focus:ring-[#7E69AB]
          `}
          disabled={loading}
        >
          °F
        </ToggleGroupItem>
      </ToggleGroup>
    </form>
  );
};

export default WeatherSearch;
