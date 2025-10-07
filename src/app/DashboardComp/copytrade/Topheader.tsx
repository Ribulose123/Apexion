"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LuMegaphone } from "react-icons/lu";
import { ArrowRight, EyeOff, Eye, Info } from "lucide-react";
import SlideData from "@/app/Component/SlideData";
import { API_ENDPOINTS } from "@/app/config/api";
import { useRouter } from "next/navigation";

interface UserCopyStats {
  totalAssetsUSDT: number;
  profitUSDT: number;
  netProfitUSDT: number;
  copyTradingPnLUSDT: number;
  totalInvestedUSDT: number;
  activeCopyPositions: number;
  totalCopyTrades: number;
  successfulTrades: number;
  totalFeesPaidUSDT: number;
  winRate: number;
  averageReturnPercent: number;
  bestTradeUSDT: number;
  worstTradeUSDT: number;
}

interface UserData {
  fullName: string;
  copyStats: UserCopyStats | null;
}

const Topheader = () => {
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found");

        const response = await fetch(API_ENDPOINTS.USER.USER_PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const userData = responseData.data;
        
        setUserData({
          fullName: userData.fullName || "User",
          copyStats: userData.copyStats
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleBalance = () => {
    setShowBalance(!showBalance);
  };

  const handleNavigation = ()=>{
    router.push('/user')
  }

  if(error){
    return(
      <div>Error</div>
    )
  }

  return (
    <div className="text-white md:p-4 w-full mb-4 mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side */}
        <div className="flex-1">
          <h2 className="md:text-[50px] text-[30px] font-bold">
            Trade Smarter: <br className="md:block hidden" />
            Copy the Pros, <br />
            Earn Like One!
          </h2>
          <p className="flex items-center gap-2 text-[#7D8491] md:text-[14px] text-[14px] font-semibold">
            <LuMegaphone className="rotate-330" />
            Updating elite trader tier requirements and perks
          </p>

          {/* Balance Card  */}
          <div className="border-2 border-[#141E32] rounded-lg p-4 max-w-md w-full mt-10">
            {/* User info */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/img/Avatar DP.png"
                  alt="Avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-white font-medium">
                      {loading ? "Loading..." : userData?.fullName || "User"}
                    </h3>
                    <button onClick={handleBalance}>
                      {showBalance ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                  </div>
                  <span className="text-xs text-[#7D8491] bg-[#797A8029] px-2 py-1 rounded-md">
                    Copier
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 -mt-5">
                <div className="flex items-center bg-[#6967AE29] px-2 py-1 rounded-md gap-2 text-[#6967AE]">
                  <Info size={13} />
                  <span className="text-[12px] font-medium">
                    Insufficient balance
                  </span>
                </div>
                <button className="cursor-pointer" onClick={handleNavigation}>
                  <ArrowRight size={16} className="shrink-0" />
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-white text-[13px] font-semibold">
                  {showBalance ? 
                    `$${userData?.copyStats?.totalAssetsUSDT?.toFixed(2) || "0.00"}` : 
                    "*******"}
                </p>
                <p className="text-[#7D8491] text-[12px] font-semibold">
                  Total Assets(USDT)
                </p>
              </div>
              <div>
                <p className="text-white text-[13px] font-semibold">
                  {showBalance ? 
                    `$${userData?.copyStats?.profitUSDT?.toFixed(2) || "0.00"}` : 
                    "*******"}
                </p>
                <p className="text-[#7D8491] text-[12px] font-semibold">
                  Profit (USDT)
                </p>
              </div>
              <div>
                <p className="text-white text-[13px] font-semibold">
                  {showBalance ? 
                    `$${userData?.copyStats?.netProfitUSDT?.toFixed(2) || "0.00"}` : 
                    "*******"}
                </p>
                <p className="text-[#7D8491] text-[12px] font-semibold">
                  Net profit (USDT)
                </p>
              </div>
              <div>
                <p className="text-white text-[13px] font-semibold">
                  {showBalance ? 
                    `${userData?.copyStats?.winRate?.toFixed(2) || "0.00"}%` : 
                    "*******"}
                </p>
                <p className="text-[#7D8491] text-[12px] font-semibold">
                  Win Rate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <SlideData />
        </div>
      </div>
    </div>
  );
};

export default Topheader;