"use client";
import { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

import { Loader } from "../ui/Loader";
import { API_ENDPOINTS } from "../config/api";





interface PlatformAsset {
  id: string;
  name: string;
  symbol: string;
}

interface UserAsset {
  platformAsset: PlatformAsset;
  balance: number;
usdBalance:number


}

export default function Assets() {

  const [userAssets, setUserAssets] = useState<UserAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");



 useEffect(() => {
  const fetchAssetCoins = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const response = await fetch(API_ENDPOINTS.USER.USER_PROFILE, {
        method: "GET",
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

      const responseData = await response.json();

      const userAssets = responseData.data?.userAssets || [];
      setUserAssets(userAssets);
    } catch (err) {
      console.error("Failed to fetch user assets:", err);
      setError("Failed to fetch user assets");
    } finally {
      setLoading(false);
    }
  };
  fetchAssetCoins();
}, []);

const filteredAsset = userAssets.filter((userAsset) =>
  userAsset?.platformAsset?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  userAsset?.platformAsset?.symbol?.toLowerCase().includes(searchTerm.toLowerCase())
);

  if (loading) {
    return (
      <div className="mb-6 px-3 sm:border sm:border-[#141E32] rounded-xl p-6 text-center text-white">
        Loading your assets...<Loader/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6 px-3 sm:border sm:border-[#141E32] rounded-xl p-6 text-center text-red-500">
        Error: {error}
      </div>
    );
  }
  return (
    <div className="mb-6 px-3 sm:border sm:border-[#141E32] rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">My Assets</h3>
        <div className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search..."
            className="bg-gray-800 rounded-lg px-4 py-2 text-sm sm:block hidden"
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button className="sm:bg-[#6967AE] sm:text-white text-[#F2AF29] px-3 py-2 rounded-lg text-sm flex items-center">
            View All <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <div className=" rounded-xl ">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="text-left p-4 "></th>
              <th className="text-left p-4 ">Asset</th>
              <th className="text-left p-4">Quantity</th>
              <th className="text-left p-4 ">
                Current Price
              </th>
              <th className="text-right p-4 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAsset.length === 0 ? (
               <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  {searchTerm ? "No matching assets found." : "No assets to display."}
                </td>
              </tr>
            ):(
               filteredAsset.slice(0,6).map((asset, index) => (
              <tr
                key={asset.platformAsset.id}
                className={`${
                  index % 2 === 1 ? "bg-transparent" : "bg-gray-800/30"
                } w-full`}
              >
                <td className="py-2 sm:py-3 px-2 ">
                  <FaRegStar className="text-gray-500" />
                </td>
                <td className="py-2 sm:py-3 px-2 ">
                  
                  <span className="text-xs sm:text-sm">
                    {asset.platformAsset.name}
                  <p className="text-xs sm:text-sm text-gray-400">{asset.platformAsset.symbol}</p>
                  </span>
                  
                  </td>
                  <td className="py-2 sm:py-3 px-2 ">{asset.balance}</td>
                  <td className="py-2 sm:py-3 px-2 ">{asset.usdBalance}</td>
                
                <td className="p-2 text-right ">
                  <button className="text-indigo-400 mr-2 Table px-2 py-1 text-xs">
                    Deposit
                  </button>
                  <button className="text-indigo-400 Table px-2 py-1 text-xs">
                    Withdraw
                  </button>
                </td>
                
              </tr>
            ))
            )}
           
          </tbody>
        </table>
      </div>
    </div>
  );
}
