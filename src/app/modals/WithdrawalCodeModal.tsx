import React,{useState} from 'react'
import { X } from 'lucide-react';

const WithdrawalCodeModal = () => {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.preventDefault();
   console.log('sumbiting.....')
  };

  const handleResend = () => {
    
    console.log('Resending OTP...');
  };

  

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
          <h3 className="text-white text-xl font-semibold mb-4">Enter OTP Code</h3>
          <p className="text-gray-300 text-sm mb-2">
            A token phrase has been sent to your registered email to facilitate your withdrawal process.
          </p>
          <p className="text-gray-400 text-xs">
            Please enter passcode phrase
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP code"
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleResend}
              className="text-teal-400 text-sm hover:text-teal-300 transition-colors"
            >
              Resend
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-md transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default WithdrawalCodeModal
