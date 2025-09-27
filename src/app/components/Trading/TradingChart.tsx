'use client'
import React, { useEffect, useState } from "react";

import TradingPlatform from "./TradingPlatform";
import TradingInterface from "./TradingInterface";
import TradingPositions from "./TradingPositions";



interface ProcessedKlineData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface DrawnLine {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color?: string;
  width?: number;
}

// Generate fallback data when API fails
const generateFallbackData = (): ProcessedKlineData[] => {
  const now = Date.now();
  const data: ProcessedKlineData[] = [];
  let basePrice = 30000;

  for (let i = 0; i < 50; i++) {
    const time = now - (49 - i) * 4 * 60 * 60 * 1000; // 4 hour intervals
    const open = basePrice;
    const close = basePrice + (Math.random() - 0.5) * 1000;
    const high = Math.max(open, close) + Math.random() * 500;
    const low = Math.min(open, close) - Math.random() * 500;
    const volume = Math.random() * 100;

    data.push({
      time,
      open,
      high,
      low,
      close,
      volume,
    });

    basePrice = close;
  }

  return data;
};

const TradingChart = () => {
  const [selectedTool, setSelectedTool] = useState('crosshair');
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [drawnLines, setDrawnLines] = useState<DrawnLine[]>([]);
  const [data, setData] = useState<ProcessedKlineData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 25000, max: 35000 });
  const [apiError, setApiError] = useState<string | null>(null);
  
 
  
 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setApiError(null);
      
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=90');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const rawData = await response.json();

        type RawKlineData = [
          number, // time
          string, // open
          string, // high
          string, // low
          string, // close
          string, // volume
        ];

        const processedData: ProcessedKlineData[] = (rawData as RawKlineData[]).map((item: RawKlineData) => ({
          time: item[0],     // Timestamp
          open: Number(item[1]),
          high: Number(item[2]),
          low: Number(item[3]),
          close: Number(item[4]),
          volume: 0 
        }));
        
        setData(processedData);
        
        if (processedData.length > 0) {
          const allPrices = processedData.flatMap(d => [d.high, d.low]);
          const min = Math.min(...allPrices);
          const max = Math.max(...allPrices);
          const range = max - min;
          setPriceRange({ min: min - range * 0.1, max: max + range * 0.1 });
        }
      } catch(error) {
        console.error("Failed to fetch data:", error);
        setApiError("Failed to load market data. Using demo data.");
        // Use fallback data when API fails
        const fallbackData = generateFallbackData();
        setData(fallbackData);
        
        if (fallbackData.length > 0) {
          const allPrices = fallbackData.flatMap(d => [d.high, d.low]);
          const min = Math.min(...allPrices);
          const max = Math.max(...allPrices);
          const range = max - min;
          setPriceRange({ min: min - range * 0.1, max: max + range * 0.1 });
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const convertToCandleData = (klineData: ProcessedKlineData[]) => {
    return klineData.map(item => ({
      time: new Date(item.time).toISOString(),
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume,
    }));
  };

  const candleData = convertToCandleData(data);

  return (
    <div className=" md:px-2 w-full bg-[#01040F] text-white ">
         {apiError && (
          <div className="mx-4 mt-4 p-3 bg-yellow-900 border border-yellow-700 rounded-lg text-yellow-200">
            {apiError}
          </div>
        )}
      <div>
        <div >
         <TradingPlatform 
          data={candleData}
          priceRange={priceRange} 
          setPriceRange={setPriceRange} 
          selectedTool={selectedTool} 
          setMousePosition={setMousePosition} 
          mousePosition={mousePosition}
          drawnLines={drawnLines}
          setDrawnLines={setDrawnLines}
          isLoading={isLoading}
          setSelectedTool={setSelectedTool}
        />

       <div className="p-3 md:p-0 pt-6 -ml-2 md:-ml-0">
         <TradingPositions/>
       </div>
        <TradingInterface/>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;


      