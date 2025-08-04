"use client";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { API_ENDPOINTS } from "../config/api";


interface ActiveSignal {
  id: string;
  name: string;
  amount: number; 
  price: number;
  strength: number;
}

interface UserSignal {
  activeSignal: ActiveSignal;
  activeSignalId: string;
  createdAt: string;
  id: string;
  stakings: number;
  strength: number;
  updatedAt: string;
  userId: string;
}
interface UserProfileResponse {
  data:{
    userSignal?: UserSignal;
  }
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
  </div>
);
const Signalbar = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
    const [userSignal, setUserSignal] = useState<UserSignal | null>(null);

  useEffect(()=>{
    const fetchSignalStrength = async()=> {
      setLoading(true);
      setError(null);

      try{
          const token = localStorage.getItem("authToken");
          if(!token){
            throw new Error("No token found in localStorage");
          }

          const response = await fetch (API_ENDPOINTS.USER.USER_PROFILE, {
            method:"GET",
             headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
          });

          
      if (!response.ok) {
  if (response.status === 401) {
    throw new Error("Authentication failed - please login again");
  } else if (response.status === 500) {
    throw new Error("Server error - please try again later");
  } else {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

const result:UserProfileResponse = await response.json()




if(result.data.userSignal){
  setUserSignal(result.data.userSignal);
}
      } catch(err){
        setError(err instanceof Error ? err.message : "Failed to fetch signal data");
      } finally{
        setLoading(false);
      }
    }
    fetchSignalStrength()
  },[])
   const handleBalance = () => {
    setShowBalance(!showBalance);
  };

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };;

if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 mb-6">
        <div className="mt-6 text-white text-center">
        <LoadingSpinner />
        <p className="mt-2">Loading...</p>
      </div>
       <div className="mt-6 text-white text-center">
        <LoadingSpinner />
        <p className="mt-2">Loading signals ...</p>
      </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 mb-6">
        <div className="bg-gradient-to-b from-[#141E323D] to-[#141E32] p-4 sm:rounded-lg h-[150px]">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  sm:gap-4 mb-6">
      <div className="bg-linear-to-b from-[#141E323D]  to-[#141E32] p-4 sm:rounded-lg h-[150px] gap-10">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <h2 className="text-gray-400 font-medium sm:text-lg">
                Total Balance
              </h2>
              <button
                onClick={handleBalance}
                className="text-gray-400 hover:text-white transition ml-2"
              >
                {showBalance ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
            </div>
            <div className="flex space-x-1 mt-5">
            <p> {showBalance 
                  ? userSignal?.activeSignal 
                    ? formatBalance(userSignal.activeSignal.amount) 
                    : "$0.00"
                  : "******"
                }</p>
            </div>
          </div>
         
        </div>
      </div>

      <div className="bg-[#141E323D] backdrop-blur-[24px] p-4 sm:rounded-lg h-[150px]">
        <div className="flex justify-between items-center mb-1 gap-3">
          <p className="text-[#A4A4A4] text-xs sm:text-[16px]">
            {userSignal?.activeSignal ? userSignal.activeSignal.name : "No active signal"}
          </p>
          <p className="text-[#F2AF29] text-xs sm:text-[16px]">View history</p>
        </div>
        <div className="mt-8 flex justify-between">
          <span className="text-[#A4A4A4] text-xs sm:text-[16px]">
            Signal strength
          </span>
          <span className="text-[#F23645] text-xs sm:text-[16px]">
            {userSignal?.strength || 0}%
          </span>
        </div>
        <div className="flex space-x-0.5 mt-3">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`h-7 w-7 flex-1 ${
                userSignal ? 
                  (i < (userSignal.strength / 7) ? "bg-[#F23645]" : "bg-gray-800")
                  : "bg-gray-800"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signalbar;
