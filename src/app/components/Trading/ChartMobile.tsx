"use client";
import React, { useCallback, useState, useEffect, useMemo } from "react";
import CandlestickChart from "./CandlestickChart";
import TimeframeSelector from "./TimeframeSelector "; 

interface Candle {
  time: string;
  open: number;
  high: number;
  close: number;
  low: number;
  volume: number;
}

interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  direction: "up" | "down";
}

const ChartMobile = () => {
  const [isClient, setIsClient] = useState(false);
  const [candleData, setCandleData] = useState<Candle[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [chartMode] = useState<"candlestick" | "line">("candlestick");

  const generateCandleData = useCallback(() => {
    const now = new Date();
    const data = [];
    let basePrice = 73500;

    for (let i = 0; i < 100; i++) {
      const time = new Date(now.getTime() - (99 - i) * 5 * 60000);
      const open = basePrice;
      const close = basePrice + (Math.random() - 0.5) * 1000;
      const high = Math.max(open, close) + Math.random() * 500;
      const low = Math.min(open, close) - Math.random() * 500;
      const volume = Math.floor(Math.random() * 100) + 10;

      data.push({
        time: time.toISOString(),
        open,
        high,
        low,
        close,
        volume,
      });

      basePrice = close;
    }

    return data;
  }, []);

  useEffect(() => {
    setIsClient(true);
    const candles = generateCandleData();
    setCandleData(candles);

    if (candles.length >= 2) {
      const highestPrice = Math.max(...candles.map((c) => c.high));
      const lowestPrice = Math.min(...candles.map((c) => c.low));
      const range = highestPrice - lowestPrice;
      setPriceRange({
        min: lowestPrice - range * 0.2,
        max: highestPrice + range * 0.2,
      });
    }
  }, [generateCandleData]);

  const candlesToChartData = useCallback((candles: Candle[]): ChartData[] => {
    return candles.map((candle) => ({
      time: new Date(candle.time).toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
      volume: candle.volume,
      direction: candle.close >= candle.open ? "up" : "down",
    }));
  }, []);

  const chartData = useMemo(
    () => candlesToChartData(candleData),
    [candleData, candlesToChartData]
  );

  const priceToY = useCallback(
    (price: number): number => {
      if (priceRange.max === priceRange.min) return 50;
      return (
        100 -
        ((price - priceRange.min) / (priceRange.max - priceRange.min)) * 100
      );
    },
    [priceRange]
  );

  return (
    <div className='mt-2 border-2 border-[#1E1E2F] rounded-lg bg-[#01040F] flex flex-col h-full w-full p-2'>
      <div className='flex flex-col'>
        <div className="ml-5">
          <TimeframeSelector />
        </div>
        <div className="flex flex-1">
          <div className="h-full">
            {isClient && chartData.length > 0 && (
              <CandlestickChart
                data={chartData}
                priceToY={priceToY}
                priceRange={priceRange}
                chartMode={chartMode}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartMobile;