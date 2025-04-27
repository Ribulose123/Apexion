'use client'

import { useDepositData } from '../hooks/useDepositData';
import CoinSelector from "./components-deposit/crypto-deposit/CoinSelector";
import DepositAddress from "./components-deposit/crypto-deposit/DepositAddress";
import DepositFAQ from "./components-deposit/crypto-deposit/DepositFAQ";
import DepositHistoryComponent from "./components-deposit/crypto-deposit/DepositHistoryComponent";
import DepositTips from "./components-deposit/crypto-deposit/DepositTips";
import NetworkSelector from "./components-deposit/crypto-deposit/NetworkSelector";

const CryptoDeposit = () => {
  const {
    // Data
    coins,
    networks,
    depositHistory,
    selectedCoin,
    selectedNetwork,
    depositAddress,
    dateRange,
    totalPages,
    
    // Loading states
    isLoadingCoins,
    isLoadingNetworks,
    isLoadingAddress,
    isLoadingHistory,
    
    // Error state
    error,
    
    // Actions
    setSelectedCoin,
    setSelectedNetwork,
    setDateRange,
    fetchDepositHistory,
  } = useDepositData();
  
  return (
    <div className="text-gray-200 min-h-screen w-full">
      <div className="w-full max-w-6xl mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4">
        {/* Display error message if any */}
        {error && (
          <div className="bg-red-600 text-white p-3 mb-4 rounded">
            {error}
          </div>
        )}
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Left Section - Deposit Form */}
          <div className="lg:col-span-7 bg-gradient-to-t from-[rgba(20,30,50,0.0576)] to-[rgba(61,70,104,0.24)]
            rounded-xl p-4 sm:p-6 border border-[#439A8633]">
            {/* Step 1 - Select a coin */}
            <CoinSelector 
              coins={coins}
              selectedCoin={selectedCoin}
              isloading={isLoadingCoins}
              onSelctCoin={setSelectedCoin}
            />
            
            {/* Step 2 - Choose a network */}
            <NetworkSelector 
              networks={networks}
              selectedCoin={selectedCoin}
              selectedNetwork={selectedNetwork}
              isLoading={isLoadingNetworks}
              onSelect={setSelectedNetwork}
            />
            
            {/* Step 3 - Paste address */}
            <DepositAddress 
              depositAddress={depositAddress}
              selectedCoin={selectedCoin}
              isLoading={isLoadingAddress}
            />
          </div>
        
          {/* Right Section - Tips & FAQ */}
          <div className="lg:col-span-5 space-y-4">
            {/* Deposit Tips Section */}
            <div className="
              ">
              <DepositTips 
                selectedCoin={selectedCoin} 
                selectedNetwork={selectedNetwork} 
              />
            </div>
            
            {/* FAQ Section */}
            <div>
              <DepositFAQ />
            </div>
          </div>
        </div>
        
        {/* Deposit History Section */}
        <div className="mt-6 sm:mt-8 overflow-x-auto">
          <div className="min-w-full">
            <DepositHistoryComponent 
              depositHistory={depositHistory}
              selectedCoin={selectedCoin}
              dateRange={dateRange}
              isLoading={isLoadingHistory}
              totalPages={totalPages}
              onDateRangeChange={(field, value) => setDateRange(prev => ({ ...prev, [field]: value }))}
              onFilterCoinChange={() => fetchDepositHistory()}
              onPageChange={() => fetchDepositHistory()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDeposit;