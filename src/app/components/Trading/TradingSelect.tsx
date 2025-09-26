'use client'
import React from 'react'
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { Reorder } from 'framer-motion';

interface SelectButton {
  id: string;
  label: string;
  svg: React.ReactElement; // Change back to ReactElement to match TradingChart
}

interface TradingSelectProps {
  chartMode: 'candlestick' | 'line';
  setChartMode: (mode: 'candlestick' | 'line') => void;
  selectButtons: SelectButton[];
  setSelectButtons: React.Dispatch<React.SetStateAction<SelectButton[]>>;
}

const TradingSelect: React.FC<TradingSelectProps> = ({ chartMode, setChartMode, selectButtons, setSelectButtons }) => {
  
  return (
    <Reorder.Group 
      axis="x" 
      values={selectButtons} 
      onReorder={setSelectButtons}
      className="border-[#141E32] p-2 rounded-xl shadow-lg border flex items-center justify-between text-white md:space-x-4 overflow-x-auto"
    >
      <div className="flex items-center space-x-4">
        {selectButtons.map((item) => (
          <Reorder.Item key={item.id} value={item} className="flex-shrink-0 cursor-grab">
            <button
              onClick={() => {
                if (item.id === 'candlestick' || item.id === 'line') {
                  setChartMode(item.id);
                }
              }}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                (item.id === 'candlestick' && chartMode === 'candlestick') || 
                (item.id === 'line' && chartMode === 'line')
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {item.svg}
              <span className="hidden md:inline">{item.label}</span>
            </button>
          </Reorder.Item>
        ))}
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="px-3 py-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700">
          <Plus size={16} />
        </button>
        <button className="px-3 py-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700">
          <Minus size={16} />
        </button>
        <button className="px-3 py-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700">
          <ChevronLeft size={16} />
        </button>
        <button className="px-3 py-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700">
          <ChevronRight size={16} />
        </button>
      </div>
    </Reorder.Group>
  )
}

export default TradingSelect;