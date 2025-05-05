"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  BarChart2,
  LineChart,
  TrendingUp,
  Camera,
  Settings,
  Expand
} from "lucide-react";
import { CiCirclePlus } from "react-icons/ci";

const TimeframeSelector = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1h");
  const [timeframeDropdownOpen, setTimeframeDropdownOpen] = useState(false);

  const timeframes = [
    { value: "1m", label: "1m" },
    { value: "5m", label: "5m" },
    { value: "15m", label: "15m" },
    { value: "30m", label: "30m" },
    { value: "1h", label: "1h" },
    { value: "4h", label: "4h" },
    { value: "1d", label: "1D" },
    { value: "1w", label: "1W" },
  ];

  const handleTimeframeSelect = (value: string): void => {
    setSelectedTimeframe(value);
    setTimeframeDropdownOpen(false);
  };

  return (
    <div className="flex space-x-7 items-cente text-gray-300 w-full px-4 py-2">
      {/* Timeframe Options */}
      <div className="flex items-center space-x-4 mr-6">
        <div className="text-gray-400 font-medium text-sm px-2">1m</div>
        <div className="text-gray-400 font-medium text-sm px-2">30m</div>

        {/* Dropdown for selected timeframe */}
        <div className="relative">
          <div
            className="flex items-center cursor-pointer bg-blue-600 text-white rounded px-2 py-1"
            onClick={() => setTimeframeDropdownOpen(!timeframeDropdownOpen)}
          >
            <span className="font-medium text-sm">{selectedTimeframe}</span>
            <ChevronDown
              size={16}
              className={`ml-1 ${
                timeframeDropdownOpen ? "rotate-180" : ""
              } transition-transform`}
            />
          </div>

          {/* Dropdown Menu */}
          {timeframeDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg z-10 w-20">
              {timeframes.map((timeframe) => (
                <div
                  key={timeframe.value}
                  className={`px-4 py-1 hover:bg-gray-700 cursor-pointer text-sm
                    ${
                      selectedTimeframe === timeframe.value ? "bg-blue-900" : ""
                    }`}
                  onClick={() => handleTimeframeSelect(timeframe.value)}
                >
                  {timeframe.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart Type Buttons */}
      <div className="flex space-x-1 md:ml-5">
        <button className="text-green-500 hover:text-green-400">
          <BarChart2 size={20} />
        </button>
        <button className="text-gray-500 hover:text-gray-400">
          <LineChart size={20} />
        </button>
        <button className="text-gray-500 hover:text-gray-400">
          <TrendingUp size={20} />
        </button>
      </div>

      <div className="flex items-center space-x-1 cursor-pointer">
       <div className="flex items-center space-x-1">
       <TrendingUp size={20} className="text-gray-400" />
       <span className="text-gray-400 text-sm">Indicators</span>
       </div>
       <div className="flex items-center space-x-1">
       <CiCirclePlus size={20} className="text-gray-400" />
       <span className="text-gray-400 text-sm">Compare</span>
       </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="cursor-pointer">
            <Expand size={17} className="text-gray-400" />
          </div>

          <div className="cursor-pointer">
            <Camera size={17} className="text-gray-400" />
          </div>

          <div className="cursor-pointer">
            <Settings size={17} className="text-gray-400" />
          </div>
        </div>

        {/* Indicators and other options */}
      </div>
    </div>
  );
};

export default TimeframeSelector;
