"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2Icon,
  Star,
} from "lucide-react";
import { sellers } from "../data/data";
import { usePathname } from "next/navigation";

interface Seller {
  id: number;
  name: string;
  completedOrders: number;
  completionRate: string;
  price: number;
  availableUSDT: number;
  minAmount: number;
  maxAmount: number;
  paymentMethods: string[];
  online?: boolean;
  lastSeen?: string;
  avgReleaseTime?: string;
  positiveRating?: number;
  totalCompletedOrders?: number;
  totalOrders?: number;
  completionRateWithin30Days?: number;
  positiveRatingIn12?: number;
  avgReleaseTimeMinutes?: number;
  verified?: boolean;
  trusted?: boolean;
  identityVerification?: boolean;
  discord?: boolean;
  sms?: boolean;
  type: string;
  coin: string;
  email: boolean;
  buy: number;
  sell: number;
}

interface TopTradersProps {
  params?: { id: string }; // Made params optional
}

const getSellerById = (id: number): Seller | undefined => {
  return sellers.find((seller) => seller.id === id);
};

const TopTraders = ({ params }: TopTradersProps) => {
  const pathname = usePathname();
  const [seller, setSeller] = useState<Seller | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("advertisements");

  useEffect(() => {
    const extractIdFromPath = () => {
      if (!pathname) return null;
      const parts = pathname.split("/");
      const lastPart = parts[parts.length - 1];
      const id = parseInt(lastPart);
      return isNaN(id) ? null : id;
    };

    setLoading(true);
    const id = params?.id ? parseInt(params.id) : extractIdFromPath();

    if (id === null) {
      setSeller(undefined);
      setLoading(false);
      console.error("Invalid ID in URL");
      return;
    }

    const foundSeller = getSellerById(id);
    setSeller(foundSeller);
    setLoading(false);


  }, [params, pathname]); 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p>Loading trader details...</p>
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <div className="text-center p-8 bg-[#0c1422] rounded-lg border border-gray-800 max-w-md">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-2">Trader Not Found</h1>
          <p className="text-gray-400 mb-6">
            We couldn&#39;t find any trader with the ID:{" "}
            {params?.id || "unknown"}
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-teal-700 hover:bg-teal-600 text-white px-6 py-2 rounded transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen p-4">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
            {seller.name.substring(0, 1)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-xl font-bold">{seller.name}</h1>
              <span className="text-xs text-[#1DA2B4] underline">Black</span>
              <span className="text-xs text-[#1DA2B4] underline">
                Reputable
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs mt-1 flex-wrap">
              {seller.email && (
                <div className="flex items-center gap-1">
                  <div className="text-green-600">
                    <CheckCircle2Icon size={14} />
                  </div>
                  <span>Email</span>
                </div>
              )}
              {seller.discord && (
                <div className="flex items-center gap-1">
                  <div className="text-green-600">
                    <CheckCircle2Icon size={14} />
                  </div>
                  <span>Discord</span>
                </div>
              )}
              {seller.sms && (
                <div className="flex items-center gap-1">
                  <div className="text-green-600">
                    <CheckCircle2Icon size={14} />
                  </div>
                  <span>Identity Verification</span>
                </div>
              )}
              {seller.trusted && (
                <div className="flex items-center gap-1">
                  <div className="text-green-600">
                    <CheckCircle2Icon size={14} />
                  </div>
                  <span>Trusted</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <button className="mt-2 sm:mt-0 sm:ml-auto bg-transparent border border-gray-700 text-white px-3 py-2 rounded-md flex items-center gap-1 text-xs w-[100px]">
          <Star size={12} />
          <span>Follow</span>
        </button>
      </div>

      {/* Display Seller ID for debugging */}
      <div className="text-xs text-gray-400 mb-4">Trader ID: {seller.id}</div>

      {/* Stats Grid */}
      <div className="flex md:flex-row flex-col gap-4 justify-between p-1 md:border-b border-gray-800 mb-8">
        <div className="">
          <div className="text-gray-400 text-xs mb-1">
            Completed Orders in 30 Days
          </div>
          <div className="flex items-end gap-1">
            <div className="text-xl font-bold">{seller.completedOrders}</div>
            <div className="text-xs text-gray-400">orders</div>
          </div>
          <div className="flex items-center text-xs mt-2">
            <span className="text-green-500 mr-2">this month</span>
            <span className="text-red-500">last month</span>
          </div>
        </div>

        <div className="">
          <div className="text-gray-400 text-xs mb-1">All Completed Orders</div>
          <div className="flex items-end gap-1">
            <div className="text-xl font-bold">
              {seller.totalCompletedOrders || 0}
            </div>
            <div className="text-xs text-gray-400">orders</div>
          </div>
        </div>

        <div className="">
          <div className="text-gray-400 text-xs mb-1">
            Completion Rate Within 30 Days
          </div>
          <div className="text-xl font-bold">
            {seller.completionRateWithin30Days || 90}%
          </div>
        </div>

        <div className="">
          <div className="text-gray-400 text-xs mb-1">
            Positive Rating in 12
          </div>
          <div className="text-xl font-bold">
            {seller.positiveRatingIn12 || 90}%
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs mt-2">
              <ThumbsUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 mr-2">
                {Math.floor(
                  ((seller.positiveRatingIn12 || 90) *
                    (seller.totalCompletedOrders || 100)) /
                    100
                )}
              </span>
              <ThumbsDown className="h-3 w-3 text-red-500 mr-1" />
              <span className="text-red-500">
                {Math.floor(
                  ((100 - (seller.positiveRatingIn12 || 90)) *
                    (seller.totalCompletedOrders || 100)) /
                    100
                )}
              </span>
            </div>
            <div className="md:hidden">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <ArrowRight size={20} />
        </div>
      </div>

      {/* Tabs */}
      <div className="md:border-b border-[#141E32] mb-4 mt-13">
        <div className="flex gap-6">
          <button
            className={`pb-3 px-1 ${
              activeTab === "advertisements"
                ? "text-white border-b-2 border-teal-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("advertisements")}
          >
            Advertisements
          </button>
          <button
            className={`pb-3 px-1 ${
              activeTab === "reviews"
                ? "text-white border-b-2 border-teal-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Leave A Review({Math.floor(seller.totalCompletedOrders || 345)})
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "advertisements" && (
        <div>
          {/* Desktop View */}
          <div className="hidden md:block">
            {/* Buy Section */}
            <div className="mb-8 mt-17">
              <h2 className="text-lg font-bold mb-4">Buy</h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-t p- border-[#141E32]">
                    <th className="text-left py-4 font-normal">Coin</th>
                    <th className="text-left py-4 font-normal">Price</th>
                    <th className="text-left py-4 font-normal">
                      Amount Limit{" "}
                      <span className="text-[#1DA2B4]">(Low to High)</span>
                    </th>
                    <th className="text-left py-4 font-normal">
                      Payment methods
                    </th>
                    <th className="text-left py-4 font-normal">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2].map((_, i) => (
                    <tr key={`buy-${i}`} className="border-b border-[#141E32]">
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-teal-500"></div>
                          <span>USDT</span>
                        </div>
                      </td>
                      <td className="py-4">0.998 USD</td>
                      <td className="py-4">
                        <div>63.0015 USDT</div>
                        <div className="text-gray-500 text-xs">
                          100 - 1000 USD
                        </div>
                      </td>
                      <td className="py-4">Bank Transfer</td>
                      <td className="py-4">
                        <button className="currency-display text-white px-4 py-1 rounded">
                          Buy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sell Section */}
            <div className="mt-15">
              <h2 className="text-lg font-bold mb-4">Sell</h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-t p- border-[#141E32]">
                    <th className="text-left py-2 font-normal">Coin</th>
                    <th className="text-left py-2 font-normal">Price</th>
                    <th className="text-left py-2 font-normal">
                      Amount Limit{" "}
                      <span className="text-[#1DA2B4]">(Low to High)</span>
                    </th>
                    <th className="text-left py-2 font-normal">
                      Payment methods
                    </th>
                    <th className="text-left py-2 font-normal">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2].map((_, i) => (
                    <tr key={`sell-${i}`} className="border-b border-[#141E32]">
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-teal-500"></div>
                          <span>USDT</span>
                        </div>
                      </td>
                      <td className="py-4">0.998 USD</td>
                      <td className="py-4">
                        <div>63.0015 USDT</div>
                        <div className="text-gray-500 text-xs">
                          100 - 1000 USD
                        </div>
                      </td>
                      <td className="py-4">Bank Transfer</td>
                      <td className="py-4">
                        <button className="currency-display text-white px-4 py-1 rounded">
                          Sell
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile View */}
          <div className="block md:hidden">
            {/* Category Headers: Buy/Sell */}
            <div className="mb-4">
              <h2 className="text-lg font-bold">Buy</h2>
            </div>

            {/* Card-based Buy Listings */}
            {[1, 2, 3].map((_, index) => (
              <div 
                key={`buy-card-${index}`} 
                className="block rounded-lg px-4 py-3 text-white border-b border-[#141E32] hover:bg-[#0c1422] cursor-pointer overflow-hidden"
              >
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-xs font-bold">
                        A
                      </div>
                      <div>
                        <div className="text-sm font-medium">Alex_Top</div>
                        <div className="text-xs text-gray-400">Online 20 min ago</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-xs text-gray-400">Completes most orders in</div>
                      <div className="text-xs text-gray-400">30 min</div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-gray-400">Amount</div>
                      <div className="text-sm">$3,000-10,000</div>
                      <div className="mt-2 text-xs text-gray-400">Limit</div>
                      <div className="text-sm">$100-1,000 USD</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-500">92.4%</span>
                      </div>
                      <div className="text-base font-bold text-right mt-1">$1,003.80 USD</div>
                      <button className="mt-2 currency-display text-white text-xs px-3 py-1 rounded">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Sell Category Header */}
            <div className="mb-4 mt-6">
              <h2 className="text-lg font-bold">Sell</h2>
            </div>

            {/* Card-based Sell Listings */}
            {[1, 2, 3].map((_, index) => (
              <div 
                key={`sell-card-${index}`} 
                className="block rounded-lg px-4 py-3 text-white border-b border-[#141E32] hover:bg-[#0c1422] cursor-pointer overflow-hidden"
              >
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-xs font-bold">
                        A
                      </div>
                      <div>
                        <div className="text-sm font-medium">Alex_Top</div>
                        <div className="text-xs text-gray-400">Online 20 min ago</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-xs text-gray-400">Completes most orders in</div>
                      <div className="text-xs text-gray-400">30 min</div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-gray-400">Amount</div>
                      <div className="text-sm">$3,000-10,000</div>
                      <div className="mt-2 text-xs text-gray-400">Limit</div>
                      <div className="text-sm">$100-1,000 USD</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-500">92.4%</span>
                      </div>
                      <div className="text-base font-bold text-right mt-1">$1,003.80 USD</div>
                      <button className="mt-2 currency-display text-white text-xs px-3 py-1 rounded">
                        Sell
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="py-10 text-center text-gray-400">
          Reviews will be displayed here
        </div>
      )}
    </div>
  );
};

export default TopTraders;