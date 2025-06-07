import React from 'react'

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}
const ToggleBotton:React.FC<ToggleSwitchProps> = ({id, checked, onChange, disabled}) => {
  return (
    <div className="flex items-center space-x-3">
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            className="sr-only"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
          />
          <div 
            className={`block w-14 h-8 rounded-full transition-colors duration-200 ease-in-out ${
              checked 
                ? 'bg-[#439A86] shadow-lg' 
                : 'bg-gray-300'
            } ${
              disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-md'
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 bg-[#D9D9D9] w-6 h-6 rounded-full transition-transform duration-200 ease-in-out shadow-sm ${
              checked ? 'transform translate-x-6' : ''
            }`}
          ></div>
        </div>
      </label>

    </div>
  )
}

export default ToggleBotton
