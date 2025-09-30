"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { PiUsersThree } from "react-icons/pi";
import { BiSolidUpArrow } from "react-icons/bi";
import { useRouter } from "next/navigation";
import CopyTradeModal from "@/app/modals/CopyTradeModal";
import { API_ENDPOINTS } from "@/app/config/api";
import CopySuccess from "@/app/modals/CopySuccess";
import UncopyConfirmModal from "@/app/modals/UncopyConfirmModal";
interface ChartData {
  minValue: number;
  maxValue: number;
  dataPoints: number[];
}

interface TradersProps {
  id: string;
  username: string;
  profilePicture?: string;
  status: string;
  maxCopiers: number;
  currentCopiers: number;
  totalCopiers: number;
  minCopyAmount: number;
  maxCopyAmount: number;
  totalPnL: number;
  copiersPnL: number;
  aum: number;
  profitPercentage?: number;
  completedOrders?: number;
  online?: boolean;
  closedPnL?: number;
  openPnL?: number;
  isCopied?: boolean;
  isFavorited?: boolean;
  copied?: boolean;
  favorited?: boolean;
  commissionRate: number;
}

interface GenerateChartDataFn {
  (id: number, currentValue: number): ChartData;
}

const generateChartData: GenerateChartDataFn = (id, currentValue) => {
  const minValue: number = 0.1;
  const maxValue: number = 50 + (id % 50);
  const dataPoints: number[] = Array.from({ length: 10 }, (_, i) => {
    const progress = i / 9;
    const variation = ((id + i) % 10) * 0.02;
    return minValue + (currentValue - minValue) * progress * (0.9 + variation);
  });

  return { minValue, maxValue, dataPoints };
};

const HighRio = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null);
  const [traders, setTraders] = useState<TradersProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showUncopyConfirm, setShowUncopyConfirm] = useState(false);
  useEffect(() => {
    const fetchFavourite = async () => {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Authentication failed: No token found. Please login again.");
        setIsLoading(false);
      }
      try {
        const response = await fetch(API_ENDPOINTS.TRADERS.GET_ALL_TRADERS, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("authToken");
            router.push("/login");
            throw new Error("Authentication failed: Your session has expired.");
          }
          throw new Error(`Failed to fetch traders: ${response.status}`);
        }

        const result = await response.json();

        const favoriteTraders = result.data.traders
          .sort((a: TradersProps, b: TradersProps) => {
            const aRIO = a.profitPercentage ?? 0;
            const bRIO = b.profitPercentage ?? 0;
            return bRIO - aRIO;
          })
          .map((trader: TradersProps) => ({
            id: trader.id,
            username: trader.username,
            profilePicture: trader.profilePicture,
            status: trader.status,
            maxCopiers: trader.maxCopiers,
            currentCopiers: trader.currentCopiers,
            totalCopiers: trader.totalCopiers,
            minCopyAmount: trader.minCopyAmount,
            maxCopyAmount: trader.maxCopyAmount,
            totalPnL: trader.totalPnL,
            copiersPnL: trader.copiersPnL,
            aum: trader.aum,
            profitPercentage: trader.profitPercentage ?? 0,
            completedOrders: trader.completedOrders ?? "N/A",
            online: trader.online ?? false,
            commissionRate: trader.commissionRate,
            isFavorited: trader.favorited || trader.isFavorited || false,
            isCopied: trader.copied || trader.isCopied || false,
          }));

        setTraders(favoriteTraders);
      } catch (err) {
        console.error("Failed to fetch traders", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavourite();
  }, [router]);

  const handleCopyClick = (
    traderId: string,
    isCopied: boolean,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setSelectedTrader(traderId);
    if (isCopied) {
      setShowUncopyConfirm(true);
    } else {
      setShowModal(true);
    }
  };

  const handleConfirmCopy = async (copySettings: {
    copyAmount: number;
    copyRatio: number;
    stopLossEnabled: boolean;
    stopLossPercent: number;
    takeProfitEnabled: boolean;
    takeProfitPercent: number;
  }) => {
    const token = localStorage.getItem("authToken");

    if (!token || !selectedTrader) return;

    try {
      setIsLoading(true);

      const copyData = {
        traderId: selectedTrader,
        ...copySettings,
      };

      const res = await fetch(API_ENDPOINTS.TRADERS.COPY_TRADER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(copyData),
      });

      if (!res.ok) {
        throw new Error(`Failed to copy trader: ${res.status}`);
      }

      const result = await res.json();
      if (
        result.status === 201 ||
        result.message === "Successfully started copying trader"
      ) {
        setTraders((prevTraders) =>
          prevTraders.map((trader) =>
            trader.id === selectedTrader
              ? { ...trader, isCopied: true }
              : trader
          )
        );
        setShowModal(false);
        setSuccessMessage(
          result.message || "Successfully started copying trader"
        );
        setError(null);
      } else {
        throw new Error(result.message || "Failed to copy trader");
      }
    } catch (err) {
      console.error("Copy failed:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnCopy = async () => {
    const token = localStorage.getItem("authToken");

    if (!token || !selectedTrader) return;

    setShowUncopyConfirm(false);

    try {
      const response = await fetch(API_ENDPOINTS.TRADERS.UNCOPY_TRADER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ traderId: selectedTrader }),
      });

      if (!response.ok) {
        throw new Error(`Failed to uncopy trader: ${response.status}`);
      }
      const result = await response.json();

      if (
        result.status === 201 ||
        result.message === "Successfully started copying trader"
      ) {
        setTraders((prevTrader) =>
          prevTrader.map((trader) =>
            trader.id === selectedTrader
              ? { ...trader, isCopied: false }
              : trader
          )
        );
      }
      setSelectedTrader(null);
      setSuccessMessage(
        result.message ||
          `Successfully stopped copying trader ${
            selectedTraderData?.username || ""
          }.`
      );
    } catch (err) {
      console.error("Uncopy failed:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred during uncopy."
      );
    } finally {
      setShowUncopyConfirm(false);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setShowUncopyConfirm(false);
    setSelectedTrader(null);
  };

  const handleFavourite = async (traderId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authentication failed: No token found. Please login again.");

      return;
    }

    try {
      setTraders((prevTraders) =>
        prevTraders.map((trader) =>
          trader.id === traderId
            ? { ...trader, isFavorited: !trader.isFavorited }
            : trader
        )
      );

      const resFavourite = await fetch(API_ENDPOINTS.TRADERS.COPY_FAVOURITE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ traderId }),
      });

      if (!resFavourite.ok) {
        // Revert UI if API call fails
        setTraders((prevTraders) =>
          prevTraders.map((trader) =>
            trader.id === traderId
              ? { ...trader, isFavorited: !trader.isFavorited }
              : trader
          )
        );
        throw new Error(`Failed to favorite trader: ${resFavourite.status}`);
      }

      const result = await resFavourite.json();

      if (result.success) {
        setTraders((prevTraders) =>
          prevTraders.map((trader) =>
            trader.id === traderId
              ? { ...trader, isFavorited: result.data.isFavorited }
              : trader
          )
        );
      }
    } catch (err) {
      console.error("Favorite toggle failed:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    }
  };

  const handleNavigation = (traderId: string) => {
    router.push(`/copy/${traderId}`);
  };

  const selectedTraderData = selectedTrader
    ? traders.find((trader) => trader.id === selectedTrader)
    : null;

  if (isLoading) {
    return (
      <div className="mt-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-white">Loading traders...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="mt-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-white">Error getting subscribed traders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {showModal && selectedTraderData && (
        <CopyTradeModal
          traderName={selectedTraderData.username}
          minAmount={selectedTraderData.minCopyAmount}
          maxAmount={selectedTraderData.maxCopyAmount}
          commissionRate={selectedTraderData.commissionRate}
          onClose={closeModal}
          onConfirmCopy={handleConfirmCopy}
        />
      )}

      {showUncopyConfirm && selectedTraderData && (
        <UncopyConfirmModal
          onClose={closeModal}
          onConfirm={handleUnCopy}
          traderName={selectedTraderData.username}
        />
      )}

      {successMessage && (
        <CopySuccess
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}

      <div className="md:flex justify-between items-center hidden">
        <p className="text-[#7D8491] text-[16px] font-medium">
          Traders with highest RIO.
        </p>
        <Link
          href="/copymore"
          className="flex items-center text-16px text-[#F2AF29] gap-2 hover:text-[#f8c966] transition-colors"
        >
          view more <ArrowRight size={18} />
        </Link>
      </div>

      <div>
        {traders.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400">No traders available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {traders.slice(0, 6).map((trader) => {
              const currentValue = trader.profitPercentage || 0;
              const numericId = parseInt(trader.id) || 0;
              const { minValue, maxValue, dataPoints } = generateChartData(
                numericId,
                currentValue
              );

              return (
                <div
                  key={trader.id}
                  className="bg-[#141E323D] border-2 border-[#141E32] rounded-lg overflow-hidden p-2 hover:border-[#1e2a4a] transition-colors duration-300 cursor-pointer"
                  onClick={() => handleNavigation(trader.id)}
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-700 rounded-full overflow-hidden">
                          <Image
                            src={trader.profilePicture || "/img/Avatar DP.png"}
                            alt="profile"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {trader.online && (
                          <div className="absolute -right-0.5 -bottom-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#141E32]"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-2">
                          <h3 className="text-white text-sm font-medium truncate hover:text-[#F2AF29] transition-colors">
                            {trader.username}
                          </h3>
                          <button
                            onClick={(e) => handleFavourite(trader.id, e)}
                            className={`${
                              trader.isFavorited
                                ? "text-yellow-400"
                                : "text-gray-400"
                            } hover:text-yellow-400 transition-colors flex-shrink-0`}
                          >
                            <Star
                              size={16}
                              fill={
                                trader.isFavorited ? "currentColor" : "none"
                              }
                            />
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-1">
                          <div className="flex items-center gap-1 text-gray-400">
                            <PiUsersThree className="text-xs" />
                            <span className="text-xs">
                              {trader.completedOrders}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-green-500 text-xs font-medium">
                            <BiSolidUpArrow className="text-[10px]" />
                            <span>+{trader.profitPercentage || 0}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 flex justify-between items-center gap-2 border-b border-gray-800">
                    <div>
                      <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded inline-block mb-2">
                        ROI 30D
                      </div>
                      <div className="text-green-500 text-[16px] font-bold mt-6">
                        +{trader.profitPercentage || 0}%
                      </div>
                    </div>

                    <div className="w-1/2 md:w-full h-20">
                      <svg viewBox="0 0 100 40" className="w-full h-full">
                        <defs>
                          <linearGradient
                            id={`gradient-${trader.id}`}
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#10B981"
                              stopOpacity="0.2"
                            />
                            <stop
                              offset="100%"
                              stopColor="#10B981"
                              stopOpacity="0"
                            />
                          </linearGradient>
                          <pattern
                            id={`grid-dots-${trader.id}`}
                            width="4"
                            height="4"
                            patternUnits="userSpaceOnUse"
                          >
                            <circle cx="2" cy="2" r="1" fill="#2D3748" />
                          </pattern>
                        </defs>

                        <line
                          x1="0"
                          y1="35"
                          x2="100"
                          y2="35"
                          stroke={`url(#grid-dots-${trader.id})`}
                          strokeWidth="1"
                        />
                        <text
                          x="2"
                          y="35"
                          fill="#7D8491"
                          fontSize="4"
                          dy="3.5"
                          textAnchor="start"
                          className="font-sans"
                        >
                          {minValue.toFixed(1)}
                        </text>

                        <line
                          x1="0"
                          y1="5"
                          x2="100"
                          y2="5"
                          stroke={`url(#grid-dots-${trader.id})`}
                          strokeWidth="1"
                        />
                        <text
                          x="2"
                          y="5"
                          fill="#7D8491"
                          fontSize="4"
                          dy="-1"
                          textAnchor="start"
                          className="font-sans"
                        >
                          {maxValue.toFixed(1)}
                        </text>

                        <path
                          d={`M0,35 ${dataPoints
                            .map((value, i) => {
                              const x = i * 10;
                              const y =
                                35 -
                                ((value - minValue) / (maxValue - minValue)) *
                                  30;
                              return `L${x},${y}`;
                            })
                            .join(" ")} L100,35 Z`}
                          fill={`url(#gradient-${trader.id})`}
                        />

                        <path
                          d={`M0,35 ${dataPoints
                            .map((value, i) => {
                              const x = i * 10;
                              const y =
                                35 -
                                ((value - minValue) / (maxValue - minValue)) *
                                  30;
                              return `L${x},${y}`;
                            })
                            .join(" ")}`}
                          stroke="#10B981"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="p-4 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total PnL</span>
                      <span className="text-white">
                        ${trader.totalPnL?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Copiers PnL</span>
                      <span className="text-white">
                        ${trader.copiersPnL?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">AUM</span>
                      <span className="text-white">
                        ${trader.aum?.toLocaleString() || 0}
                      </span>
                    </div>
                  </div>

                  <button
                    className={`w-full py-3 ${
                      trader.isCopied
                        ? "bg-gray-600"
                        : "bg-[#439A86] hover:bg-[#3a8a77]"
                    } text-white font-medium transition-colors rounded-md mt-4 cursor-pointer`}
                    onClick={(e) =>
                      handleCopyClick(trader.id, !!trader.isCopied, e)
                    }
                    disabled={trader.isCopied}
                  >
                    {trader.isCopied ? "Copied" : "Copy"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HighRio;
