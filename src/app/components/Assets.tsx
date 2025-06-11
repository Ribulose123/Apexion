"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { CgArrowsExchangeV } from "react-icons/cg";
import { Loader } from "../ui/Loader";



interface CoinGeckoAsset {
  id: string; 
  symbol: string; 
  name: string; 
  image: string; 
  current_price: number; 
  price_change_percentage_24h: number; 
  total_volume: number;
}

export default function Assets() {

  const [assets, setAssets] = useState<CoinGeckoAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

   const BASE_URL = "https://api.coingecko.com/api/v3";

  useEffect(()=>{
    const fetchAssetCoin=async()=>{
      setLoading(true)
      setError(null)
      try{
        const response = await fetch(`${BASE_URL}//coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
          { cache: "no-store" }
        )

        if(!response.ok){
           const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status} - ${errorText}`
          );
        }

        const data:CoinGeckoAsset[] = await response.json()
        setAssets(data)
      }catch(err){
         console.error("Failed to fetch cryptocurrency data:", err);
      } finally{
        setLoading(false)
      }
    }
    fetchAssetCoin()
  },[])

  const filteredAsset = assets.filter((asset)=>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              <th className="text-left p-4 sm:table-cell hidden">Quantity</th>
              <th className="text-left p-4 sm:table-cell hidden">Type</th>
              <th className="text-left p-4 sm:table-cell hidden">
                Current Price
              </th>
              <th className="p-4 table-cell sm:hidden sm:ml-0 ">
                <button className="flex gap-1">
                  <span className="flex items-center gap">
                    Last Price <CgArrowsExchangeV size={15} />
                  </span>
                  <br />
                  <span className="flex items-center">
                    24hr Change <CgArrowsExchangeV size={15} />
                  </span>
                </button>
              </th>
              <th className="text-right p-4 sm:table-cell hidden">Action</th>
              <th className="text-right p-4 sm:hidden table-cell">Action</th>
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
                key={asset.id}
                className={`${
                  index % 2 === 1 ? "bg-transparent" : "bg-gray-800/30"
                } w-full`}
              >
                <td className="py-2 sm:py-3 px-2 ">
                  <FaRegStar className="text-gray-500" />
                </td>
                <td className="p-2 flex items-center space-x-2">
                  <Image
                    src={asset.image}
                    alt={asset.name}
                    width={16}
                    height={16}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />

                  <span className="text-xs sm:text-sm">
                    {asset.name}
                    <p className="text-xs sm:text-sm text-gray-400">
                      {asset.symbol}
                    </p>
                  </span>
                </td>
                <td className="p-2 sm:table-cell hidden">{asset.current_price}</td>
                <td className="p-2 sm:table-cell hidden">{asset.total_volume.toLocaleString()}</td>
                <td className="p-2 text-center sm:text-start">
                  ${asset.price_change_percentage_24h.toFixed(2)}
                </td>
                <td className="p-2 text-right sm:table-cell hidden">
                  <button className="text-indigo-400 mr-2 Table px-2 py-1 text-xs">
                    Deposit
                  </button>
                  <button className="text-indigo-400 Table px-2 py-1 text-xs">
                    Withdraw
                  </button>
                </td>
                <td className="sm:hidden text-right">
                  <button className="rounded-full text-white sm:hidden">
                    ...
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
