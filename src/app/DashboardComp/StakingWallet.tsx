"use client";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, File } from "lucide-react";
import { API_ENDPOINTS } from "../config/api";

interface UserStaking {
  activeBalance: number;
  totalBalance: number;
  staking?: {
    id: string;
    min: number;
    max: number;
    price: number;
    cycle: string;
  };
}

interface UserProfileResponse {
  data: {
    userStaking?: UserStaking;
  };
}

const StakingWallet = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stakingData, setStakingData] = useState<UserStaking | null>(null);

  useEffect(() => {
    const fetchStakeBalance = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError('No authentication token found. Please log in.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.USER.USER_PROFILE, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch staking data');
        }

        const result: UserProfileResponse = await response.json();
        
        if (result.data.userStaking) {
          setStakingData(result.data.userStaking);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch staking data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStakeBalance();
  }, []);

  const handleBalance = () => {
    setShowBalance(!showBalance);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-[#141E323D] to-[#141E32] p-6 w-full h-40 rounded-lg flex items-center justify-center">
        <div className="animate-pulse text-white">Loading staking data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-[#141E323D] to-[#141E32] p-6 w-full h-40 rounded-lg">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#141E323D] to-[#141E32] p-6 w-full h-40 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex flex-col sm:flex-row space-x-24">
          <div className="">
            <div className="flex items-center space-x-2">
              <h2 className="text-gray-400 text-sm font-medium">
                Total Stakings
              </h2>
              <button
                onClick={handleBalance}
                className="text-gray-400 hover:text-white transition ml-2"
              >
                {showBalance ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
            </div>
            <div className="mt-2">
              <p className="text-white text-2xl">
                {showBalance 
                  ? stakingData?.totalBalance 
                    ? formatCurrency(stakingData.totalBalance) 
                    : "$0.00" 
                  : "********"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-0 items-center sm:flex-col sm:items-start">
            <h2 className="text-gray-400 text-sm font-medium">
              Active Stakings
            </h2>
            <div className="mt-2">
              <p className="text-white text-2xl">
                {showBalance 
                  ? stakingData?.activeBalance 
                    ? formatCurrency(stakingData.activeBalance) 
                    : "$0.00" 
                  : "********"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-0 items-center sm:flex-col sm:items-start">
            <h2 className="text-gray-400 text-sm font-medium">
              Closed Stakings
            </h2>
            <div className="mt-2">
              <p className="text-white text-2xl">
                {showBalance 
                  ? stakingData?.totalBalance && stakingData?.activeBalance
                    ? formatCurrency(stakingData.totalBalance - stakingData.activeBalance)
                    : "$0.00"
                  : "********"}
              </p>
            </div>
          </div>
        </div>

        <button className="bg-transparent currency-display text-gray-400 md:text-xs text-[11px] py-1 px-5 rounded -mt-28 gap-3 sm:mt-0">
          <File size={14}/>
          View Stakings
        </button>
      </div>
    </div>
  );
};

export default StakingWallet;