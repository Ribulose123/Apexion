import React from 'react'
import { X, RefreshCcw } from 'lucide-react';

const KycConvertModal = () => {
    
  return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 w-80 max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-sm font-medium">KYC Modal</h2>
          <button 
            
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-white text-xl font-semibold mb-6">Convert</h3>
          
          <div className="space-y-1">
            {/* From Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-teal-400 text-sm">From</span>
                <span className="text-teal-400 text-xs">Available: 282E - Required Transaction</span>
              </div>
              
              <div className="bg-slate-700 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">₿</span>
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">Bitcoin</div>
                      <div className="text-gray-400 text-xs">BTC</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm font-medium">0.0000000</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-2">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <RefreshCcw size={12} className="text-black" />
              </div>
            </div>

            {/* To Section */}
            <div className="bg-slate-700 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">₿</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Bitcoin</div>
                    <div className="text-gray-400 text-xs">BTC</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm font-medium">0.0000000</div>
                </div>
              </div>
            </div>

            {/* Rate */}
            <div className="text-center pt-4">
              <span className="text-yellow-500 text-sm font-medium">1USDT = 1ATOM</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            console.log('Stake clicked');
           
          }}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-md transition-colors"
        >
          Stake
        </button>
      </div>
    </div>
  )
}

export default KycConvertModal
