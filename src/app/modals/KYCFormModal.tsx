import React, {useState} from 'react'
import { X } from 'lucide-react';

const KYCFormModal = () => {
     const [formData, setFormData] = useState({
    amount: '',
    country: '1-day',
    state: '8.4%'
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-600 text-sm font-medium">KYC Modal</h2>
          <button 
            
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-gray-600 text-sm">Stake</span>
            <span className="text-black font-semibold">AVAX</span>
          </div>
          
          <div className="space-y-4">
            {/* Amount Input */}
            <div>
              <label className="block text-gray-600 text-sm mb-2">Amount</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount"
                />
                <button className="absolute right-2 top-2 bg-slate-800 text-white px-2 py-1 rounded text-xs">
                  Max
                </button>
              </div>
            </div>

            {/* Warning Message */}
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-600 text-xs">
                You cannot substract 0.1 but you are attempting to stake 0.01 
                AVAX. Please enter an amount less than your balance.
              </p>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-gray-600 text-sm mb-2">Duration</label>
              <select 
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="1-day">1-day</option>
                <option value="7-day">7-day</option>
                <option value="30-day">30-day</option>
              </select>
            </div>

            {/* Rate */}
            <div>
              <label className="block text-gray-600 text-sm mb-2">Rate</label>
              <select 
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="8.4%">8.4%</option>
                <option value="12%">12%</option>
                <option value="15%">15%</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            console.log('Stake clicked', formData);
           
          }}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-md transition-colors"
        >
          Stake
        </button>
      </div>
    </div>
  )
}

export default KYCFormModal
