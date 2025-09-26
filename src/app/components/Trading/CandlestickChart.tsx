"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

type PriceRange = {
  min: number;
  max: number;
};

const SimpleCandlestickChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(900);
  const [canvasHeight, setCanvasHeight] = useState(400);
  const [candles, setCandles] = useState<Candle[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 0 });

  const margin = React.useMemo(() => ({ top: 20, right: 40, bottom: 30, left: 40 }), []);
  const chartHeight = canvasHeight - margin.top - margin.bottom;

  // Scale price to Y
  const priceToY = useCallback(
    (price: number) => {
      const { min, max } = priceRange;
      if (max === min) return chartHeight / 2;
      const scale = chartHeight / (max - min);
      return margin.top + (max - price) * scale;
    },
    [priceRange, chartHeight, margin.top]
  );

  // Draw grid + candles
  const drawChart = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw background
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Grid lines
      const gridLines = 6;
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 0.5;
      ctx.setLineDash([5, 3]);
      ctx.font = "10px sans-serif";
      ctx.fillStyle = "#9CA3AF";

      for (let i = 0; i <= gridLines; i++) {
        const y = margin.top + (chartHeight / gridLines) * i;
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(canvasWidth - margin.right, y);
        ctx.stroke();

        // Price labels
        const price = priceRange.max - ((priceRange.max - priceRange.min) / gridLines) * i;
        ctx.fillText(price.toFixed(2), canvasWidth - margin.right + 5, y + 4);
      }
      ctx.setLineDash([]);

      // Candlesticks
      if (candles.length > 0) {
        const candleWidth = Math.max(6, (canvasWidth - margin.left - margin.right) / candles.length * 0.7);
        const spacing = (canvasWidth - margin.left - margin.right) / candles.length * 0.3;
        
        candles.forEach((candle, i) => {
          const x = margin.left + i * (candleWidth + spacing) + spacing / 2;
          if (x > canvasWidth - margin.right) return;

          const openY = priceToY(candle.open);
          const closeY = priceToY(candle.close);
          const highY = priceToY(candle.high);
          const lowY = priceToY(candle.low);

          const minBodyHeight = 2;
          const bodyHeight = Math.max(minBodyHeight, Math.abs(closeY - openY));
          const bodyY = Math.min(openY, closeY);

          // Wick
          ctx.beginPath();
          ctx.moveTo(x + candleWidth / 2, highY);
          ctx.lineTo(x + candleWidth / 2, lowY);
          ctx.strokeStyle = candle.close >= candle.open ? "#10b981" : "#ef4444";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Body
          ctx.fillStyle = candle.close >= candle.open ? "#10b981" : "#ef4444";
          ctx.fillRect(x, bodyY, candleWidth, bodyHeight);
        });
      }
    },
    [candles, priceToY, canvasWidth, canvasHeight, margin, chartHeight, priceRange]
  );

  // Simulate price data
  useEffect(() => {
    // Initial data
    const initialCandles: Candle[] = [];
    let basePrice = 30000;
    
    for (let i = 0; i < 30; i++) { // Fewer candles for mobile
      const open = basePrice;
      const close = open + (Math.random() - 0.5) * 800;
      const high = Math.max(open, close) + Math.random() * 400;
      const low = Math.min(open, close) - Math.random() * 400;
      
      initialCandles.push({
        time: Date.now() - (30 - i) * 60000,
        open,
        high,
        low,
        close,
      });
      
      basePrice = close;
    }
    
    setCandles(initialCandles);

    const interval = setInterval(() => {
      setCandles((prev) => {
        if (prev.length === 0) return prev;
        
        const lastCandle = prev[prev.length - 1];
        const open = lastCandle.close;
        const close = open + (Math.random() - 0.5) * 150;
        const high = Math.max(open, close) + Math.random() * 80;
        const low = Math.min(open, close) - Math.random() * 80;

        const newCandle: Candle = { 
          time: Date.now(), 
          open, 
          high, 
          low, 
          close 
        };
        
        const updated = [...prev.slice(1), newCandle];

        // Update price range
        const prices = updated.flatMap((c) => [c.high, c.low]);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const range = max - min || 100;

        setPriceRange({
          min: min - range * 0.1,
          max: max + range * 0.1,
        });

        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Resize chart for mobile
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setCanvasWidth(containerRef.current.offsetWidth);
        setCanvasHeight(containerRef.current.offsetHeight || 400);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Redraw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawChart(ctx);
  }, [candles, drawChart]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[300px]">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="w-full h-full"
      />
    </div>
  );
};

export default SimpleCandlestickChart;