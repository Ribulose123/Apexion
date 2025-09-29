import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  // FIX 1: Provide type and initial value to useRef
  const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "allow_symbol_change": true,
          "calendar": false,
          "details": false,
          "hide_side_toolbar": true,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "D",
          "locale": "en",
          "save_image": true,
          "style": "1",
          "symbol": "NASDAQ:AAPL",
          "theme": "dark",
          "timezone": "Etc/UTC",
          "backgroundColor": "#1E293B",
          "gridColor": "rgba(242, 242, 242, 0.06)",
          "watchlist": [],
          "withdateranges": false,
          "compareSymbols": [],
          "studies": [],
          "autosize": false,
          "width": "100%",
          "height": "100%"
        }`;
      
      // FIX 2 & 3: Add null check for container.current
      if (container.current) {
        container.current.appendChild(script);
      }
    },
    []
  );

  return (
    <div className="bg-slate-900 p-4 sm:p-6 rounded-lg border border-slate-700 shadow-xl">
      {/* Header with stock info */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">AAPL</h1>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400">
              <span>NASDAQ: AAPL</span>
              <span className="hidden sm:inline">•</span>
              <span>Daily Chart</span>
              <span className="hidden sm:inline">•</span>
              <span>Apple Inc</span>
            </div>
          </div>
          
          {/* Info badge */}
          <div className="text-right">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span className="text-blue-400 text-sm font-medium">Live TradingView</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart container with horizontal scroll */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-3 sm:p-4 overflow-x-auto">
        <div className="min-w-[800px] lg:min-w-full h-[500px] sm:h-[600px]">
          <div 
            className="tradingview-widget-container" 
            ref={container} 
            style={{ height: "100%", width: "100%" }}
          >
            <div 
              className="tradingview-widget-container__widget" 
              style={{ height: "100%", width: "100%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Copyright footer */}
      <div className="mt-4 text-center">
        <div className="tradingview-widget-copyright text-xs text-slate-500">
          <a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener nofollow" target="_blank">
            <span className="blue-text">AAPL stock chart</span>
          </a>
          <span className="trademark"> by TradingView</span>
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="sm:hidden mt-3 text-center">
        <div className="text-slate-400 text-xs animate-pulse">
          ← Scroll horizontally to view full chart →
        </div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);