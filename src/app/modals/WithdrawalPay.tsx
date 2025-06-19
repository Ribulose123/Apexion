import React from 'react'
import { X } from 'lucide-react';

const WithdrawalPay = () => {
  return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 w-96 max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-sm font-medium">Withdrawal Verification Code Modal</h2>
          <button
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-white text-xl font-semibold mb-4">Pay One-Time Fee</h3>
          <p className="text-gray-300 text-sm mb-6">
            To complete this transaction you have to pay a one-time withdrawal fee.
          </p>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-300 text-sm">Transaction Fee</span>
            <span className="text-orange-400 font-semibold">122</span>
          </div>
          
          <p className="text-gray-400 text-xs leading-relaxed">
            Lorem ipsum neque aliquet eleifum vulputate at vitae neque molestie et sit non molestendum ante sed.
          </p>
        </div>

        <button
         
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-md transition-colors"
        >
          Deposit
        </button>
      </div>
    </div>
  )
}

export default WithdrawalPay
