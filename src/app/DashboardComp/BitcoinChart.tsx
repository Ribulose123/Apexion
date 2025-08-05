'use client'
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TooltipItem,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface BitcoinPriceData {
  prices: [number, number][];
}

const BitcoinChart: React.FC = () => {
  const [priceData, setPriceData] = useState<BitcoinPriceData | null>(null);
  const [timeRange, setTimeRange] = useState<'7' | '30' | '90' | '365'>('30');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBitcoinData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<BitcoinPriceData>(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: timeRange,
          },
        }
      );
      setPriceData(response.data);
    } catch (err) {
      setError('Failed to fetch Bitcoin data. Please try again later.');
      console.error('Error fetching Bitcoin data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchBitcoinData();
  }, [fetchBitcoinData]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const chartData = {
    labels: priceData?.prices.map(([timestamp]) => formatDate(timestamp)) || [],
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: priceData?.prices.map((item) => item[1]) || [],
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        tension: 0.1,
        pointRadius: 2,
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            return `$${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeRange === '7' ? 'day' : 
                timeRange === '30' ? 'week' : 
                'month',
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => {
            if (typeof value === 'number') {
              return `$${value.toLocaleString()}`;
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Bitcoin Price Chart</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setTimeRange('7')}
          className={`px-4 py-2 rounded ${timeRange === '7' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        >
          7 Days
        </button>
        <button
          onClick={() => setTimeRange('30')}
          className={`px-4 py-2 rounded ${timeRange === '30' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        >
          30 Days
        </button>
        <button
          onClick={() => setTimeRange('90')}
          className={`px-4 py-2 rounded ${timeRange === '90' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        >
          90 Days
        </button>
        <button
          onClick={() => setTimeRange('365')}
          className={`px-4 py-2 rounded ${timeRange === '365' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        >
          1 Year
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : (
        <div className="h-96">
          <Line data={chartData} options={options} />
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        <p>Data provided by CoinGecko API</p>
        <p>Last updated: {priceData && formatDate(priceData.prices[priceData.prices.length - 1][0])}</p>
      </div>
    </div>
  );
};

export default BitcoinChart;