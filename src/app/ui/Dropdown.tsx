import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Loader } from './Loader';

interface DropdownProps<T> {
  value: T | null;
  options: T[];
  loading: boolean;
  loadingText: string;
  placeholder: string;
  renderOption: (option: T) => React.ReactNode;
  renderValue: (value: T) => React.ReactNode;
  onChange: (value: T) => void;
}

export function Dropdown<T>({
  value,
  options,
  loading,
  loadingText,
  placeholder,
  renderOption,
  renderValue,
  onChange
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        className="rounded-lg p-4 mb-4 border border-[#439A8633]  mt-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {loading ? (
          <div className="flex items-center">
            <Loader size={16} className="mr-2" />
            <span>{loadingText}</span>
          </div>
        ) : value ? (
          renderValue(value)
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <ChevronDown size={16} />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div 
              key={index}
              className="p-3 hover:bg-gray-600 cursor-pointer"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {renderOption(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}