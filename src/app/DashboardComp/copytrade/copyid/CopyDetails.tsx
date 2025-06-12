"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CopyProfiles } from "@/app/data/data";
import { Calendar, CircleDollarSign, Wallet, PieChart, Share2, Heart } from "lucide-react";
import Image from "next/image";
import Usersdetails from "./Usersdetails";

type CopyProfile = {
  id: number;
  name: string;
   completedOrders: number;
  completionRate: number;
  profitPercentage: string;
   totalPnL:string;
   openPnL:string;
  win:number;
  lose:number;
};

const CopyDetails = () => {
const pathname = usePathname();
  const [copyData, setCopyData] = useState<CopyProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const extractIdFromPath = () => {
      if (!pathname) return null;
      const parts = pathname.split("/");
      const lastPart = parts[parts.length - 1];
      const id = parseInt(lastPart);
      return isNaN(id) ? null : id;
    };

    const id = extractIdFromPath();

    if (!id) {
      setError("Invalid trader ID");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const copyTrader = CopyProfiles.find((profile) => profile.id === id);

      if (!copyTrader) {
        setError("Trader not found");
        setCopyData(null);
      } else {
        // Ensure data types match the CopyProfile type
        const formattedData: CopyProfile = {
          ...copyTrader,
          completedOrders: Number(copyTrader.completedOrders),
          completionRate: Number(copyTrader.completionRate),
          profitPercentage: String(copyTrader.profitPercentage),
          totalPnL: String(copyTrader.totalPnL),
          openPnL: String(copyTrader.openPnL),
          win: Number(copyTrader.win),
          lose: Number(copyTrader.lose)
        };
        setCopyData(formattedData);
        setError(null);
      }
    } catch (err) {
      setError(
        "Failed to load trader data" +
          (err instanceof Error ? `: ${err.message}` : "")
      );
      setCopyData(null);
    } finally {
      setLoading(false);
    }
  }, [pathname]);

  // Rest of your component remains the same...
  if (loading) {
    return <div className="p-4 text-gray-500">Loading trader details...</div>;
  }

if (error) {
  return <div className="p-4 text-red-500">{error}</div>;
}

  return (
    <div className="md:p-4 w-full ">
      {copyData ? (
        <div className=" rounded-lg p-6 shadow-lg">
          {/* User info section */}
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Left section - Profile info */}
            <div className="flex-1 flex flex-col sm:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Image
                  src="/img/Avatar DP.png"
                  alt="profile"
                  width={100}
                  height={100}
                  className="rounded-full border-2 border-[#439A86]"
                />
              </div>

              {/* Profile details */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-white text-xl font-bold">{copyData.name}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <p className="text-[#797A80] border-r border-[#797A80] pr-2">
                      @HappyPlanets
                    </p>
                    <p className="flex items-center text-[#797A80] gap-1">
                      <Calendar size={13} />
                      Registered 626 day(s) ago
                    </p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="border-r border-[#797A80] pr-4">
                    <p className="text-[#797A80] text-sm">Followers</p>
                    <h3 className="text-white text-lg font-bold">12</h3>
                  </div>
                  <div className="border-r border-[#797A80] pr-4">
                    <p className="text-[#797A80] text-sm">Trading Days</p>
                    <h3 className="text-white text-lg font-bold">33</h3>
                  </div>
                  <div className="border-r border-[#797A80] pr-4">
                    <p className="text-[#797A80] text-sm">Stability Index</p>
                    <h3 className="text-white text-lg font-bold">
                      255<span className="text-xs">/50</span>
                    </h3>
                  </div>
                  <div>
                    <p className="text-[#797A80] text-sm">7 Day(s)</p>
                    <h3 className="text-white text-lg font-bold">270</h3>
                  </div>
                </div>

                {/* Financial info */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-sm">
                  <div className="flex items-center gap-1 border-r border-[#797A80] pr-4">
                    <CircleDollarSign size={13} className="text-[#797A80]" />
                    <p className="text-[#797A80] font-medium">AUM 1,149.00 USDT</p>
                  </div>
                  <div className="flex items-center gap-1 border-r border-[#797A80] pr-4">
                    <Wallet size={13} className="text-[#797A80]" />
                    <p className="text-[#797A80] font-medium">Total Assets 933.20 USDT</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <PieChart size={13} className="text-[#797A80]" />
                    <p className="text-[#797A80] font-medium">Profit Sharing 10%</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Most popular", "High-frequency trading", "Conservative", "Multi-coin"].map((tag) => (
                    <span 
                      key={tag}
                      className="bg-[#141E325C] text-xs text-[#6278A3] px-3 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right section - Actions */}
            <div className="flex flex-col md:items-end items-start gap-4 mt-2 mb-4 md:mt-0 md:mb-0">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-[#E8E8E8] hover:text-white transition-colors">
                  <Share2 size={15} />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex items-center gap-1 text-[#E8E8E8] hover:text-white transition-colors">
                  <Heart size={15} />
                  <span className="text-sm">Subscribe</span>
                </button>
              </div>
              <button className="bg-[#439A86] hover:bg-[#3a8a77] text-white font-medium py-3 px-8 rounded-lg transition-colors">
                Copy Trader
              </button>
            </div>
          </div>
            
           {/* Copy Content */} 
          <div className="mt-3">
            <Usersdetails copyData={{
              completionRate: String(copyData.completionRate),
              profitPercentage: copyData.profitPercentage,
              totalPnL: copyData.totalPnL,
              openPnL: copyData.openPnL,
              win: copyData.win,
              lose: copyData.lose
            }}/>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">No trader data available</p>
      )}
    </div>
  );
};

export default CopyDetails;