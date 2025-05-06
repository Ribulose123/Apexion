// Trades.tsx
import React, { useState, useEffect } from 'react';

interface Trade {
  id: string;
  time: string;
  price: number;
  amount: number;
  side: "buy" | "sell";
}

interface TradesProps {
  currentPrice?: number;
  updateInterval?: number;
  maxTrades?: number;
}

const RecentTrade: React.FC<TradesProps> = ({
  currentPrice = 73500,
  updateInterval = 5000,
  maxTrades = 20
}) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  // Format currency with 2 decimal places
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Format amount with 4 decimal places
  const formatAmount = (value: number): string => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });
  };

  // Generate initial trade data
  const generateTrades = React.useCallback((price: number): Trade[] => {
    const basePrice = price || 73500;
    const now = new Date();
    const trades: Trade[] = [];

    for (let i = 0; i < maxTrades; i++) {
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
  }, [maxTrades]);

  // Generate a single new trade
  const generateSingleTrade = (price: number): Trade => {
    return {
      id: `trade-${Date.now()}`,
      time: new Date().toISOString(),
      price: price + (Math.random() - 0.5) * 100,
      amount: Math.random() * 2 + 0.001,
      side: Math.random() > 0.5 ? "buy" : "sell",
    };
  };

  // Format time from ISO string
  const formatTime = (isoString: string): string => {
    return new Date(isoString).toLocaleTimeString("en-US", {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  useEffect(() => {
    // Initialize trades
    setTrades(generateTrades(currentPrice));

    // Set up interval to add new trades
    const interval = setInterval(() => {
      setTrades((prevTrades) => {
        const newTrade = generateSingleTrade(currentPrice);
        return [newTrade, ...prevTrades.slice(0, maxTrades - 1)];
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [currentPrice, updateInterval, maxTrades, generateTrades]);

  return (
    <div className="trades-container">
      <h2 className="text-lg font-semibold mb-2">Recent Trades</h2>
      
      <div className="grid grid-cols-4 text-sm font-medium text-gray-400 mb-1">
        <div>Time</div>
        <div>Price (USD)</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Side</div>
      </div>
      
      <div className="overflow-y-auto max-h-80">
        {trades.map((trade) => (
          <div 
            key={trade.id} 
            className="grid grid-cols-4 text-sm border-b border-gray-800 py-1"
          >
            <div>{formatTime(trade.time)}</div>
            <div className={trade.side === "buy" ? "text-green-500" : "text-red-500"}>
              {formatCurrency(trade.price)}
            </div>
            <div className="text-right">{formatAmount(trade.amount)}</div>
            <div className={`text-right ${trade.side === "buy" ? "text-green-500" : "text-red-500"}`}>
              {trade.side.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTrade;