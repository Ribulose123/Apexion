'use client'
import React from 'react';
import { Copy , WalletMinimal} from 'lucide-react';

const WalletConnect = () => {
  return (
    <div className="md:w-90 h-100 flex-col gap-6 w-full mt-3 md:mt-0">
      {/* Connect wallet card */}
      <div 
        className="bg-gradient-to-br from-black to-purple-900 text-white rounded-xl p-4 flex-1 h-1/2 flex flex-col"
        style={{
          background: 'linear-gradient(to bottom right, #000000, #4C1D95)'
        }}
      >
        <h2 className="text-sm text-gray-400 mb-3">Bidvest Wallet</h2>
        <h1 className="text-lg font-bold mb-3">Connect Your Wallet</h1>
        <p className="text-xs text-gray-400 mb-4">
          Securely Link Your Wallet To Start Trading, Managing Assets, And Accessing All Features Effortlessly.
        </p>
        
        <button className="w-full py-2 bg-purple-600 rounded-md flex items-center justify-center space-x-2 text-white text-sm">
          <span>Connect with wallet</span>
          <WalletMinimal size={15} className='bg-black'/>
        </button>
      </div>
      
      {/* Referrals card */}
      <div className="bg-[#DB5A42] rounded-xl p-4 flex-1 h-1/2 mt-3 flex flex-col">
        <h2 className="text-lg font-bold mb-2">Referrals</h2>
        <p className="text-sm text-white mb-4">
          Become a premier inviter and enjoy a 25% rebate.
        </p>
        
        
        <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold mb-1 flex flex-col">TLANQAED
        <span className="text-xs">Your referral code</span>
        </h3>
          <button className="ml-2">
            <Copy size={26} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;