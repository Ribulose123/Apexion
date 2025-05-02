"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  BarChart2,
  
  ChevronRight,
  PanelLeft,
  Settings,
  List,
  Search,
  Bell,
  UserCircle,
  Moon,
  Menu,
  Eye,
  Activity,

  Maximize,
 
  Sliders,
  TrendingUp,
  LineChart,
} from "lucide-react";

interface Candle {
  time: string;
  open: number;
  high: number;
  close: number;
  low: number;
  volume: number;
}

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

interface Trade {
  id: string;
  time: string;
  price: number;
  amount: number;
  side: "buy" | "sell";
}

export default function ChartTrade() {
  const [isClient, setIsClient] = useState(false);
  const [candleData, setCandleData] = useState<Candle[]>([]);
  const [orderBook, setOrderBook] = useState<{
    asks: OrderBookEntry[];
    bids: OrderBookEntry[];
  }>({ asks: [], bids: [] });
  const [trades, setTrades] = useState<Trade[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [timeframe, setTimeframe] = useState<string>("5m");
  const [rightTabActive, setRightTabActive] = useState<"orderBook" | "trades">(
    "orderBook"
  );
  const [currentTime, setCurrentTime] = useState<string>("");
  const [chartMode, setChartMode] = useState<"candlestick" | "line">(
    "candlestick"
  );
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });

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

  const formatTime = useCallback((time: Date): string => {
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }, []);

  const generateCandleData = useCallback((): Candle[] => {
    const now = new Date();
    const data: Candle[] = [];
    let basePrice = 77500;

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
    (price: number): { asks: OrderBookEntry[]; bids: OrderBookEntry[] } => {
      const basePrice = price || 77500;
      const asks: OrderBookEntry[] = [];
      const bids: OrderBookEntry[] = [];

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
    const trades: Trade[] = [];
    const basePrice = price || 77500;

    for (let i = 0; i < 20; i++) {
      const time = new Date(Date.now() - i * 10000);
      const price = basePrice + (Math.random() - 0.5) * 500;
      const amount = Math.random() * 2 + 0.01;
      const side = Math.random() > 0.5 ? "buy" : "sell";

      trades.push({
        id: `trade-${i}`,
        time: time.toISOString(),
        price,
        amount,
        side,
      });
    }

    return trades;
  }, []);

  const updateTime = useCallback(() => {
    setCurrentTime(formatTime(new Date()));
  }, [formatTime]);

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

    updateTime();
  }, [generateCandleData, generateOrderBook, generateTrades, updateTime]);

  useEffect(() => {
    if (candleData.length > 0) {
      const lastCandle = candleData[candleData.length - 1];
      setCurrentPrice(lastCandle.close);
      setPriceChange(
        lastCandle.close -
          (candleData.length > 1
            ? candleData[candleData.length - 2].close
            : lastCandle.close)
      );
      const highestPrice = Math.max(...candleData.map((c) => c.high));
      const lowestPrice = Math.min(...candleData.map((c) => c.low));
      const range = highestPrice - lowestPrice;
      setPriceRange({
        min: lowestPrice - range * 0.2,
        max: highestPrice + range * 0.2,
      });
    }
  }, [candleData]);

  const candleDataRef = useRef(candleData);
  useEffect(() => {
    candleDataRef.current = candleData;
  }, [candleData]);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      updateTime();
      setCandleData((prevCandles) => {
        if (prevCandles.length === 0) return prevCandles;
        const newCandles = [...prevCandles];
        const lastCandle = newCandles[newCandles.length - 1];
        const priceChange = (Math.random() - 0.5) * 200;
        const newClose = lastCandle.close + priceChange;
        newCandles[newCandles.length - 1] = {
          ...lastCandle,
          high: Math.max(lastCandle.high, newClose),
          low: Math.min(lastCandle.low, newClose),
          close: newClose,
        };
        return newCandles;
      });

      const currentCandleData = candleDataRef.current;
      if (currentCandleData.length > 0) {
        const latestPrice =
          currentCandleData[currentCandleData.length - 1].close;
        setOrderBook(generateOrderBook(latestPrice));
        if (Math.random() > 0.5) {
          setTrades((prev) =>
            [
              {
                id: `trade-${Date.now()}`,
                time: new Date().toISOString(),
                price: latestPrice,
                amount: Math.random() * 2 + 0.01,
                side: (Math.random() > 0.5 ? "buy" : "sell") as "buy" | "sell",
              },
              ...prev,
            ].slice(0, 20)
          );
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isClient, updateTime, generateOrderBook, generateTrades]);

  const candlesToChartData = useCallback((candles: Candle[]) => {
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
  const lineChartData = useMemo(
    () => Array.from({ length: 164 }, (_, i) => i),
    []
  );

  const priceToY = useCallback(
    (price: number) => {
      if (priceRange.max === priceRange.min) return 50;
      return (
        100 -
        ((price - priceRange.min) / (priceRange.max - priceRange.min)) * 100
      );
    },
    [priceRange]
  );

  const Tab = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      className={`px-3 py-3 rounded-full text-xs font-medium ${
        active ? "text-white bg-[#10131F]" : "text-gray-400"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  if (!isClient) {
    return (
      <div className="flex flex-col w-full h-screen bg-gray-900 text-gray-200 overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-400">Loading trading interface...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen text-gray-200 overflow-hidden">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-2 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <Menu className="w-5 h-5 text-gray-400" />
          <div className="text-sm font-bold">BINANCE</div>
          <span className="text-gray-400">Last updated: {currentTime}</span>
          <div className="hidden md:flex space-x-2 text-gray-400 text-xs">
            {["Buy Crypto", "Markets", "Trade", "Derivatives", "Earn"].map(
              (item) => (
                <button key={item} className="hover:text-white">
                  {item}
                </button>
              )
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="w-4 h-4 text-gray-400" />
          <Bell className="w-4 h-4 text-gray-400" />
          <UserCircle className="w-4 h-4 text-gray-400" />
          <Moon className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Chart Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center">
          <h1 className="text-base font-bold mr-2">BTC/USDT</h1>
          <div
            className={`text-sm ${
              priceChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ${formatCurrency(currentPrice)}
            <span className="ml-2">
              {priceChange >= 0 ? "+" : ""}
              {formatCurrency(priceChange)}(
              {((priceChange / (currentPrice - priceChange)) * 100).toFixed(2)}
              %)
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            className={`px-2 py-1 text-xs ${
              chartMode === "candlestick" ? "bg-gray-700 text-white" : "text-gray-400"
            }`}
            onClick={() => setChartMode("candlestick")}
          >
            <BarChart2 className="inline w-3 h-3 mr-1" /> Candles
          </button>
          <button
            className={`px-2 py-1 text-xs ${
              chartMode === "line" ? "bg-gray-700 text-white" : "text-gray-400"
            }`}
            onClick={() => setChartMode("line")}
          >
            <LineChart className="inline w-3 h-3 mr-1" /> Line
          </button>
          <div className="bg-gray-800 rounded overflow-hidden flex">
            {["1m", "5m", "15m", "1h", "4h", "1d", "1w"].map((tf) => (
              <button
                key={tf}
                className={`px-2 py-1 text-xs ${
                  timeframe === tf ? "bg-gray-700 text-white" : "text-gray-400"
                }`}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-12 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 space-y-6">
          {[
            { icon: PanelLeft },
            { icon: TrendingUp },
            { icon: BarChart2 },
            { icon: Settings },
            { icon: List },
            { icon: Activity },
            { icon: Sliders },
          ].map((item, index) => (
            <button key={index} className="text-gray-400 hover:text-white">
              <item.icon className="w-5 h-5" />
            </button>
          ))}
          <div className="flex-1"></div>
          <button className="text-gray-400 hover:text-white">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Chart Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Chart */}
          <div className="flex-1 flex flex-col bg-black border border-gray-800">
            {/* Chart Header */}
            <div className="flex items-center justify-between p-1 px-2 bg-black border-b border-gray-800">
              <div className="flex items-center">
                <div className="mr-6 flex items-center">
                  <h1 className="text-xs font-bold mr-1">BTC/USDT</h1>
                  <span className="text-xs text-gray-500">1h</span>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                  {[
                    { label: "O", value: formatCurrency(67500) },
                    { label: "H", value: formatCurrency(68000) },
                    { label: "L", value: formatCurrency(67000) },
                    { label: "C", value: formatCurrency(currentPrice), color: priceChange >= 0 ? "text-green-500" : "text-red-500" },
                    { label: "Volume", value: formatAmount(candleData.reduce((acc, c) => acc + c.volume, 0)) },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center">
                      <span className="text-gray-500 mr-1">{item.label}</span>
                      <span className={item.color || "text-white"}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="text-gray-500 hover:text-white">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="text-gray-500 hover:text-white">
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chart Visualization */}
            <div className="flex-1 relative overflow-hidden">
              {/* Left Chart Controls */}
              <div className="absolute top-3 left-0 h-full z-10">
                <div className="flex flex-col items-center space-y-3 p-2">
                  {[
                    { icon: BarChart2, active: chartMode === "candlestick" },
                    { icon: LineChart, active: chartMode === "line" },
                    { icon: Activity },
                    { icon: Eye },
                    { icon: Sliders },
                  ].map((btn, i) => (
                    <button
                      key={i}
                      className={`${
                        btn.active ? "text-blue-500" : "text-gray-500"
                      } hover:text-white`}
                      onClick={() => btn.icon === BarChart2 ? setChartMode("candlestick") : btn.icon === LineChart ? setChartMode("line") : null}
                    >
                      <btn.icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Content */}
              <div className="w-full h-full bg-black">
                {chartMode === "candlestick" ? (
                  <div className="h-full w-full">
                    {chartData.length > 0 && (
                      <svg width="100%" height="100%" className="overflow-hidden">
                        <rect x="0" y="0" width="100%" height="100%" fill="#000000" />
                        
                        {/* Grid Lines */}
                        <g>
                          {Array.from({ length: 6 }).map((_, i) => (
                            <line
                              key={`hgrid-${i}`}
                              x1="0"
                              y1={`${(i + 1) * 16.67}%`}
                              x2="100%"
                              y2={`${(i + 1) * 16.67}%`}
                              stroke="#121212"
                              strokeWidth="1"
                            />
                          ))}
                          {Array.from({ length: 8 }).map((_, i) => (
                            <line
                              key={`vgrid-${i}`}
                              x1={`${(i + 1) * 12.5}%`}
                              y1="0"
                              x2={`${(i + 1) * 12.5}%`}
                              y2="100%"
                              stroke="#121212"
                              strokeWidth="1"
                            />
                          ))}
                        </g>

                        {/* Price Labels */}
                        <g>
                          {Array.from({ length: 6 }).map((_, i) => {
                            const yPos = (i + 1) * 16.67;
                            const price = priceRange.max - ((priceRange.max - priceRange.min) * (yPos / 100));
                            return (
                              <text
                                key={`price-${i}`}
                                x="98%"
                                y={`${yPos}%`}
                                fill="#555555"
                                fontSize="10"
                                textAnchor="end"
                                dominantBaseline="middle"
                              >
                                {formatCurrency(price)}
                              </text>
                            );
                          })}
                        </g>

                        {/* Candles */}
                        <g>
                          {chartData.slice(-20).map((candle, i) => {
                            const x = 5 + i * 4.5;
                            const candleColor = candle.direction === "up" ? "#00b15c" : "#ff3a31";
                            const yOpen = priceToY(candle.open);
                            const yClose = priceToY(candle.close);
                            const yHigh = priceToY(candle.high);
                            const yLow = priceToY(candle.low);
                            const candleHeight = Math.abs(yClose - yOpen);
                            
                            return (
                              <g key={`candle-${i}`}>
                                <line
                                  x1={`${x}%`}
                                  y1={`${yHigh}%`}
                                  x2={`${x}%`}
                                  y2={`${yLow}%`}
                                  stroke={candleColor}
                                  strokeWidth="1"
                                />
                                <rect
                                  x={`${x - 1}%`}
                                  y={`${Math.min(yOpen, yClose)}%`}
                                  width="2%"
                                  height={`${candleHeight}%`}
                                  fill={candleColor}
                                />
                              </g>
                            );
                          })}
                        </g>
                      </svg>
                    )}
                  </div>
                ) : (
                  <div className="h-full w-full">
                    <svg width="100%" height="100%" className="overflow-hidden">
                      <rect x="0" y="0" width="100%" height="100%" fill="#000000" />
                      
                      <polyline
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        points={lineChartData
                          .map((value, index) => 
                            `${(index / lineChartData.length) * 100}%,${Math.min(
                              Math.max(100 - (value / 163) * 100, 1),
                              99
                            )}%`
                          )
                          .join(" ")}
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Time Interval Controls */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gray-900 rounded-sm overflow-hidden flex">
                  {["1m", "5m", "15m", "1h", "4h", "1d", "1w"].map((tf) => (
                    <button
                      key={tf}
                      className={`px-2 py-1 text-xs ${
                        timeframe === tf ? "bg-blue-600 text-white" : "text-gray-400"
                      }`}
                      onClick={() => setTimeframe(tf)}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Book */}
          <div className="w-80 flex flex-col bg-[#141E323D] p-3 border-l border-gray-800">
            <div className="flex justify-evenly items-center mb-2">
              <Tab
                active={rightTabActive === "orderBook"}
                onClick={() => setRightTabActive("orderBook")}
              >
                Order Book
              </Tab>
              <Tab
                active={rightTabActive === "trades"}
                onClick={() => setRightTabActive("trades")}
              >
                Last Trade
              </Tab>
            </div>

            {rightTabActive === "orderBook" ? (
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="px-2 py-3 flex justify-between items-center">
                  <div className="text-xs text-gray-400">
                    Spread: {formatCurrency(orderBook.asks[0]?.price - orderBook.bids[0]?.price)} (
                    {((orderBook.asks[0]?.price - orderBook.bids[0]?.price) / currentPrice * 100).toFixed(2)}%)
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-white">
                      <Settings className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 text-xs text-gray-400 px-2 py-2 border-b border-[#6B6B6B33]">
                  <div className="text-left">Price (USDT)</div>
                  <div className="text-center">Quantity (BTC)</div>
                  <div className="text-right">Total (BTC)</div>
                </div>

                <div className="flex-shrink-0 overflow-y-auto">
                  {orderBook.asks.slice(0, 12).reverse().map((ask, index) => (
                    <div key={`ask-${index}`} className="grid grid-cols-3 px-2 text-xs py-1 relative hover:bg-gray-800">
                      <div className="text-left text-red-500">{formatCurrency(ask.price)}</div>
                      <div className="text-center text-gray-300">{formatAmount(ask.amount)}</div>
                      <div className="text-right text-gray-300">{formatAmount(ask.total)}</div>
                      <div 
                        className="absolute right-0 top-0 h-full bg-red-900 opacity-10"
                        style={{ width: `${ask.total / orderBook.asks[Math.min(6, orderBook.asks.length-1)].total * 100}%` }}
                      ></div>
                    </div>
                  ))}
                </div>

                <div className="px-2 py-2 text-base font-semibold text-center flex justify-between">
                  <span className="text-[#E8E8E8]">{formatCurrency(currentPrice)}</span>
                  <span className={`ml-2 text-xs ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {priceChange >= 0 ? "+" : ""}{formatCurrency(priceChange)} (
                    {((priceChange / (currentPrice - priceChange)) * 100).toFixed(2)}%)
                  </span>
                </div>

                <div className="flex-shrink-0 overflow-y-auto">
                  {orderBook.bids.slice(0, 12).map((bid, index) => (
                    <div key={`bid-${index}`} className="grid grid-cols-3 px-2 text-xs py-1 relative hover:bg-gray-800">
                      <div className="text-left text-green-500">{formatCurrency(bid.price)}</div>
                      <div className="text-center text-gray-300">{formatAmount(bid.amount)}</div>
                      <div className="text-right text-gray-300">{formatAmount(bid.total)}</div>
                      <div 
                        className="absolute right-0 top-0 h-full bg-green-900 opacity-10"
                        style={{ width: `${bid.total / orderBook.bids[Math.min(6, orderBook.bids.length-1)].total * 100}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="px-2 py-1 flex justify-between items-center border-b border-gray-800">
                  <div className="text-xs font-medium">Trade History</div>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-white">
                      <Settings className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 text-xs text-gray-400 px-2 py-1 bg-gray-800">
                  <div>Price (USDT)</div>
                  <div className="text-right">Amount (BTC)</div>
                  <div className="text-right">Time</div>
                </div>

                <div className="overflow-y-auto">
                  {trades.map((trade) => (
                    <div key={trade.id} className="grid grid-cols-3 px-2 py-px text-xs border-b border-gray-800 hover:bg-gray-800">
                      <div className={trade.side === "buy" ? "text-green-500" : "text-red-500"}>
                        {formatCurrency(trade.price)}
                      </div>
                      <div className="text-right text-gray-300">{formatAmount(trade.amount)}</div>
                      <div className="text-right text-gray-400">
                        {new Date(trade.time).toLocaleTimeString('en-US', { 
                          hour12: false, 
                          hour: '2-digit', 
                          minute: '2-digit', 
                          second: '2-digit' 
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}