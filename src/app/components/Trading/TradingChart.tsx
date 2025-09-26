'use client'
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Info, BarChart2, TrendingUp, CornerDownRight} from 'lucide-react';

import TradingPlatform from "./TradingPlatform";
import TradingSelect from "./TradingSelect";
import TradingPositions from "./TradingPositions";
import TradingInterface from "./TradingInterface";
import MobileTrading from "./MobileTrading";



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
  const [chartMode, setChartMode] = useState<'candlestick' | 'line'>('candlestick');
  const [data, setData] = useState<ProcessedKlineData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 25000, max: 35000 });
  const [apiError, setApiError] = useState<string | null>(null);
  
  type SelectButton = {
    id: string;
    label: string;
    svg: React.ReactElement;
  };
  
  const [selectButtons, setSelectButtons] = useState<SelectButton[]>([
    { id: 'indicator', label: 'Indicator', svg: <BarChart2 size={16} /> },
    { id: 'strategy', label: 'Strategy', svg: <TrendingUp size={16} /> },
    { id: 'candlestick', label: 'Candlestick', svg: <Info size={16} /> },
    { id: 'line', label: 'Line', svg: <Info size={16} /> },
    { id: 'order', label: 'Order', svg: <CornerDownRight size={16} /> },
  ]);

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
    <div className=" md:px-2 w-full bg-[#01040F] text-white mx-auto">
      <div className="">
        <div className="md:-ml-5">
          <Header />
        </div>

        {apiError && (
          <div className="mx-4 mt-4 p-3 bg-yellow-900 border border-yellow-700 rounded-lg text-yellow-200">
            {apiError}
          </div>
        )}

        <div className="mt-4">
          <TradingSelect 
            chartMode={chartMode} 
            setChartMode={setChartMode} 
            selectButtons={selectButtons} 
            setSelectButtons={setSelectButtons} 
          />
        </div>
        
        <div className="flex flex-col md:flex-row mt-4 md:ml-2 w-full gap-3">
          <div className="md:w-[80%] w-full">
            <div className="hidden md:block">
             <TradingPlatform 
          data={candleData}
          priceRange={priceRange} 
          setPriceRange={setPriceRange}
          chartMode={chartMode} 
          selectedTool={selectedTool} 
          setMousePosition={setMousePosition} 
          mousePosition={mousePosition}
          drawnLines={drawnLines}
          setDrawnLines={setDrawnLines}
          isLoading={isLoading}
          setSelectedTool={setSelectedTool}
        />
            </div>
            <div className="block md:hidden">
              <MobileTrading/>
            </div>
            <div className="ml md:ml-0">
              <TradingPositions />
            </div>
          </div>
          <div className="md:w-[30%] w-full h-full ">
            <TradingInterface/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;