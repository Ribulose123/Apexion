"use client";
import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import TimeframeSelector from "./TimeframeSelector ";
import ChartSidebar from "./ChartSidebar";
import CandlestickChart from "./CandlestickChart";
import OrderBook from "./OrderBook";

interface Candle {
  time: string;
  open: number;
  high: number;
  close: number;
  low: number;
  volume: number;
}

interface Trade {
  id: string;
  time: string;
  price: number;
  amount: number;
  side: "buy" | "sell";
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

// Removed unused TradeData interface

const TradingPlatform = () => {
  const [isClient, setIsClient] = useState(false);
  const [candleData, setCandleData] = useState<Candle[]>([]);
  const [orderBook, setOrderBook] = useState<{
    asks: { price: number; amount: number; total: number }[];
    bids: { price: number; amount: number; total: number }[];
  }>({ asks: [], bids: [] });
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [chartMode] = useState<"candlestick" | "line">("candlestick");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [trades, setTrades] = useState<Trade[]>([]);

  const currentPriceRef = useRef(currentPrice);
  currentPriceRef.current = currentPrice;

  const formatCurrency = useCallback((value: number): string => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, []);

  const formatAmount = useCallback((value: number): string => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });
  }, []);

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

  const generateOrderBook = useCallback(
    (
      price: number
    ): {
      asks: { price: number; amount: number; total: number }[];
      bids: { price: number; amount: number; total: number }[];
    } => {
      const basePrice = price || 73500;
      const asks = [];
      const bids = [];

      let askPrice = basePrice + 10;
      let askTotal = 0;

      for (let i = 0; i < 15; i++) {
        const amount = Math.random() * 5 + 0.1;
        askTotal += amount;
        asks.push({
          price: askPrice,
          amount,
          total: askTotal,
        });
        askPrice += Math.floor(Math.random() * 100) + 10;
      }

      let bidPrice = basePrice - 10;
      let bidTotal = 0;

      for (let i = 0; i < 15; i++) {
        const amount = Math.random() * 5 + 0.1;
        bidTotal += amount;
        bids.push({
          price: bidPrice,
          amount,
          total: bidTotal,
        });
        bidPrice -= Math.floor(Math.random() * 100) + 10;
      }

      return { asks, bids };
    },
    []
  );

  interface TradeData {
    id: string;
    time: string;
    price: number;
    amount: number;
    side: "buy" | "sell";
  }

  const generateTrades = useCallback((price: number): TradeData[] => {
    const basePrice = price || 73500;
    const now = new Date();
    const trades: TradeData[] = [];

    for (let i = 0; i < 20; i++) {
      const time = new Date(now.getTime() - i * 15000);
      const side: "buy" | "sell" = Math.random() > 0.5 ? "buy" : "sell";
      const priceOffset = (Math.random() - 0.5) * 200;

      trades.push({
        id: `trade-${i}`,
        time: time.toISOString(),
        price: basePrice + priceOffset,
        amount: Math.random() * 2 + 0.001,
        side,
      });
    }

    return trades;
  }, []);

  useEffect(() => {
    setIsClient(true);

    const candles = generateCandleData();
    setCandleData(candles);

    if (candles.length >= 2) {
      const lastCandle = candles[candles.length - 1];
      const initialPrice = lastCandle.close;

      setCurrentPrice(initialPrice);
      setPriceChange(initialPrice - candles[candles.length - 2].close);

      const highestPrice = Math.max(...candles.map((c) => c.high));
      const lowestPrice = Math.min(...candles.map((c) => c.low));
      const range = highestPrice - lowestPrice;
      setPriceRange({
        min: lowestPrice - range * 0.2,
        max: highestPrice + range * 0.2,
      });

      setOrderBook(generateOrderBook(initialPrice));
      setTrades(generateTrades(initialPrice));
    }

    // Simulate live price updates
    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const newPrice = prev + (Math.random() - 0.5) * 100;
        setPriceChange(newPrice - prev);
        setOrderBook(generateOrderBook(newPrice));

        // Add a new trade
        setTrades((prevTrades) => {
          const newTrade = {
            id: `trade-${Date.now()}`,
            time: new Date().toISOString(),
            price: newPrice,
            amount: Math.random() * 2 + 0.001,
            side: (Math.random() > 0.5 ? "buy" : "sell") as "buy" | "sell",
          };
          return [newTrade, ...prevTrades.slice(0, 19)];
        });

        return newPrice;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [generateCandleData, generateOrderBook, generateTrades]);

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
    <div className="flex gap-2">
      <div className=" -ml-5 border-2 border-[#1E1E2F] rounded-lg bg-[#01040F] flex flex-col  h-full w-[70%] p-2">
        <div className="flex flex-col">
          <div className="ml-5">
            <TimeframeSelector />
          </div>
          <div className="flex flex-1">
            <div>
              <ChartSidebar />
            </div>
            {/* chart area */}
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
          {/* order book and trades area */}
         
        </div>
      </div>
      <div className="h-[40%] mt-4">
            <OrderBook
              orderBook={orderBook}
              trades={trades}
              currentPrice={currentPrice}
              priceChange={priceChange}
              formatCurrency={formatCurrency}
              formatAmount={formatAmount}
            />
          </div>
    </div>
  );
};

export default TradingPlatform;
