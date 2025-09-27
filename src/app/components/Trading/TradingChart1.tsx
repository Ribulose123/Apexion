"use client";
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Simple dynamic import without wrapper to avoid complexity
const ReactApexChart = dynamic(() => import('react-apexcharts'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-slate-800">
      <div className="text-slate-300">Loading chart...</div>
    </div>
  )
});

// Define types
interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

interface TransformedCandle {
  x: number;
  y: [number, number, number, number];
}

interface Props {
  timeframe?: string;
  symbol?: string;
}

const TradingChartApex: React.FC<Props> = ({ 
  timeframe = '1h', 
  symbol = 'EUR/USD' 
}) => {
  const [chartData, setChartData] = useState<TransformedCandle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [chartKey, setChartKey] = useState(0);
  const isMountedRef = useRef(true);
  const chartInitializedRef = useRef(false);

  // Mock API function
  const fetchChartData = async (): Promise<CandleData[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const data: CandleData[] = [];
    const basePrice = 1.10000;
    const now = Date.now();
    const hours = 50; // Reduced for better performance
    
    for (let i = hours; i >= 0; i--) {
      const timestamp = new Date(now - (i * 3600000));
      const volatility = 0.002;
      
      const previousClose = i === hours ? basePrice : data[data.length - 1].close;
      const change = (Math.random() - 0.5) * volatility;
      const open = previousClose;
      const close = open * (1 + change);
      const high = Math.max(open, close) * (1 + Math.random() * volatility * 0.3);
      const low = Math.min(open, close) * (1 - Math.random() * volatility * 0.3);
      
      data.push({
        time: timestamp.toISOString(),
        open: parseFloat(open.toFixed(5)),
        high: parseFloat(high.toFixed(5)),
        low: parseFloat(low.toFixed(5)),
        close: parseFloat(close.toFixed(5)),
        volume: Math.random() * 1000000
      });
    }
    
    return data;
  };

  // Load data with proper cleanup
  useEffect(() => {
    isMountedRef.current = true;
    chartInitializedRef.current = false;

    const initializeChart = async () => {
      if (!isMountedRef.current) return;
      
      setIsLoading(true);
      try {
        const apiData = await fetchChartData();
        
        if (!isMountedRef.current) return;
        
        const transformedData: TransformedCandle[] = apiData.map(candle => ({
          x: new Date(candle.time).getTime(),
          y: [candle.open, candle.high, candle.low, candle.close]
        }));
        
        setChartData(transformedData);
        setLastUpdate(new Date());
        chartInitializedRef.current = true;
        
        // Force re-render after short delay to ensure DOM is ready
        setTimeout(() => {
          if (isMountedRef.current) {
            setChartKey(prev => prev + 1);
          }
        }, 100);
        
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        if (isMountedRef.current) {
          setTimeout(() => {
            setIsLoading(false);
          }, 200);
        }
      }
    };

    // Delay initialization to ensure DOM is ready
    const initTimer = setTimeout(() => {
      initializeChart();
    }, 300);

    return () => {
      isMountedRef.current = false;
      chartInitializedRef.current = false;
      clearTimeout(initTimer);
    };
  }, [timeframe, symbol]);

  // Safe chart options without problematic properties
  const chartOptions: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 500,
      background: '#0f172a',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      zoom: {
        enabled: true,
        type: 'x'
      },
      animations: {
        enabled: false // Disable animations to prevent issues
      },
      events: {
        mounted: function() {
        },
        updated: function() {
         
        }
      }
    },
    theme: {
      mode: 'dark'
    },
    title: {
      text: `${symbol} • ${timeframe} Chart`,
      align: 'left',
      style: {
        color: '#f8fafc',
        fontSize: '16px',
        fontWeight: 'bold'
      }
    },
    grid: {
      borderColor: '#334155',
      strokeDashArray: 3
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#94a3b8'
        }
      },
      axisBorder: {
        color: '#334155'
      },
      axisTicks: {
        color: '#334155'
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          colors: '#94a3b8'
        },
        formatter: function(val: number) {
          return val.toFixed(5);
        }
      },
      axisBorder: {
        color: '#334155'
      }
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      x: {
        format: 'dd MMM yyyy HH:mm'
      }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#22c55e',
          downward: '#ef4444'
        },
        wick: {
          useFillColor: true
        }
      }
    },
    stroke: {
      width: 1
    }
  };

  const series = [{
    name: symbol,
    data: chartData
  }];

  // Calculate statistics
  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].y[3] : 0;
  const previousPrice = chartData.length > 1 ? chartData[chartData.length - 2].y[3] : currentPrice;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice !== 0 ? (priceChange / previousPrice) * 100 : 0;

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-900 rounded-lg border border-slate-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-slate-300 text-lg">Loading chart data...</div>
        </div>
      </div>
    );
  }

  // Show error state if no data
  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-900 rounded-lg border border-slate-700">
        <div className="text-center">
          <div className="text-slate-300 text-lg">Failed to load chart data</div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 shadow-xl">
      {/* Header with market info */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{symbol}</h1>
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <span>Timeframe: {timeframe}</span>
              <span>•</span>
              <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
              <span>•</span>
              <span>{chartData.length} candles</span>
            </div>
          </div>
          
          {/* Price display */}
          <div className="text-right">
            <div className="text-3xl font-mono font-bold text-white mb-1">
              {currentPrice.toFixed(5)}
            </div>
            <div className={`text-sm font-medium ${
              priceChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(5)} (
              {priceChange >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 mb-6">
        {chartData.length > 0 && (
          <ReactApexChart 
            key={chartKey}
            options={chartOptions} 
            series={series} 
            type="candlestick" 
            height={500}
          />
        )}
      </div> 
    </div>
  );
};

export default TradingChartApex;