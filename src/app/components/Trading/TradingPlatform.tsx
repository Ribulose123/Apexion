"use client";
import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import OrderBook from "./OrderBook";
import TradingChartApex from "./TradingChart1";

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

interface TradingPlatformProps {
  data: Candle[];
  priceRange: { min: number; max: number };
  setPriceRange: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
  selectedTool: string;
  setSelectedTool: React.Dispatch<React.SetStateAction<string>>;
  setMousePosition: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>;
  mousePosition: { x: number; y: number } | null;
  drawnLines: { startX: number; startY: number; endX: number; endY: number; color?: string; width?: number }[];
  setDrawnLines: React.Dispatch<React.SetStateAction<{ startX: number; startY: number; endX: number; endY: number; color?: string; width?: number }[]>>;
  isLoading: boolean;
}

const TradingPlatform: React.FC<TradingPlatformProps> = ({
  data,
  setPriceRange,
  
}) => {
  const [orderBook, setOrderBook] = useState<{
    asks: { price: number; amount: number; total: number }[];
    bids: { price: number; amount: number; total: number }[];
  }>({ asks: [], bids: [] });
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
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



  const generateOrderBook = useCallback(
    (price: number) => {
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

  const generateTrades = useCallback((price: number): Trade[] => {
    const basePrice = price || 73500;
    const now = new Date();
    const trades: Trade[] = [];

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

  // FIX: Use useMemo to prevent unnecessary re-renders
  const initialDataSetup = useCallback(() => {
    if (data.length >= 2) {
      const lastCandle = data[data.length - 1];
      const initialPrice = lastCandle.close;

      setCurrentPrice(initialPrice);
      setPriceChange(initialPrice - data[data.length - 2].close);

      const highestPrice = Math.max(...data.map((c) => c.high));
      const lowestPrice = Math.min(...data.map((c) => c.low));
      const range = highestPrice - lowestPrice;
      
      // Only update price range if it's significantly different
      setPriceRange(prev => {
        const newMin = lowestPrice - range * 0.2;
        const newMax = highestPrice + range * 0.2;
        if (Math.abs(prev.min - newMin) > 1 || Math.abs(prev.max - newMax) > 1) {
          return { min: newMin, max: newMax };
        }
        return prev;
      });

      setOrderBook(generateOrderBook(initialPrice));
      setTrades(generateTrades(initialPrice));
    }
  }, [data, generateOrderBook, generateTrades, setPriceRange]);

  useEffect(() => {
    initialDataSetup();
  }, [initialDataSetup]);

  // FIX: Separate the interval effect to prevent re-creation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const newPrice = prev + (Math.random() - 0.5) * 100;
        setPriceChange(newPrice - prev);
        setOrderBook(generateOrderBook(newPrice));

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
  }, [generateOrderBook]); // Only depend on generateOrderBook

  

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 p-3 md:p-0 md:ml-0 -ml-2">
      
      <TradingChartApex/>
      <div className=" pt-4 py-5 min-h-0 border-[#1E1E2F] border rounded-lg ">
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