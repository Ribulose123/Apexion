"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Calendar,
  CircleDollarSign,
  Wallet,
  PieChart,
  Share2,
  Heart,
  Users,
  Award,
  BarChart3,
  Target,
  Loader2,
  XCircle, // Added for uncopy button
} from "lucide-react";
import Image from "next/image";
import Usersdetails from "./Usersdetails";
import CopyTradeModal from "@/app/modals/CopyTradeModal";
import UncopyConfirmModal from "@/app/modals/UncopyConfirmModal"; // <--- NEW IMPORT
import { API_ENDPOINTS } from "@/app/config/api";
import { useRouter } from "next/navigation";
import CopySuccess from "@/app/modals/CopySuccess";

interface TraderDetails {
  id: string;
  username: string;
  profilePicture?: string;
  bio?: string;
  isVerified: boolean;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  maxCopiers: number;
  currentCopiers: number;
  totalCopiers: number;
  totalPnL: number;
  copiersPnL: number;
  aum: number;
  riskScore: number;
  isPublic: boolean;
  commissionRate: number;
  minCopyAmount: number;
  maxCopyAmount: number;
  tradingPairs: string[];
  createdAt: string;
  updatedAt: string;
  copied: boolean;
  favorited: boolean;
}

interface CopySettings {
  copyAmount: number;
  copyRatio: number;
  stopLossEnabled: boolean;
  stopLossPercent: number;
  takeProfitEnabled: boolean;
  takeProfitPercent: number;
}

const CopyDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [traderData, setTraderData] = useState<TraderDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copying, setCopying] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [showUncopyConfirm, setShowUncopyConfirm] = useState(false);
  const [uncopying, setUncopying] = useState(false); // Kept for button state in the main view

  useEffect(() => {
    const fetchTraderDetails = async () => {
      const traderId = params.id as string;
      const token = localStorage.getItem("authToken");

      if (!traderId) {
        setError("Invalid trader ID");
        setLoading(false);
        return;
      }

      if (!token) {
        setError("Authentication failed: No token found. Please login again.");
        setLoading(false);
        router.push("/login");
        return;
      }

      try {
        setLoading(true);
        const baseUrl = API_ENDPOINTS.TRADERS.GET_ALL_TRADERS_DETAILS.replace(
          "{traderId}",
          traderId
        );
        const url = `${baseUrl}?t=${new Date().getTime()}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 304) {
          console.log(
            "304 Not Modified - Using cached data. No action needed."
          );
          setLoading(false);
          return;
        }

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("authToken");
            router.push("/login");
            throw new Error("Authentication failed: Your session has expired.");
          }
          throw new Error(
            `Failed to fetch trader details: ${
              response.status
            } - ${await response.text()}`
          );
        }

        const result = await response.json();

        if (result) {
          setTraderData(result.data);
          setError(null);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        console.error("Failed to fetch trader details:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTraderDetails();
  }, [params.id, router]);

  const handleCopyClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  
  const closeUncopyModal = () => {
    setShowUncopyConfirm(false);
  };

  const handleConfirmCopy = async (copySettings: CopySettings) => {
    if (!traderData) return;
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to copy a trader.");
      router.push("/login");
      return;
    }

    const requestBody = {
      traderId: traderData.id,
      copyAmount: copySettings.copyAmount,
    };
    try {
      setCopying(true);
      const response = await fetch(API_ENDPOINTS.TRADERS.COPY_TRADER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        console.error(`Copy trade failed with status ${response.status}: ${errorDetail}`);
        throw new Error(`Failed to copy trade: ${errorDetail}`);
      }

      const result = await response.json();
      if (
        result.status === 201 ||
        result.message === "Successfully started copying trader"
      ) {
        setTraderData((prev) => (prev ? { ...prev, copied: true } : null));
        setSuccessMessage(" Successfully started copying the trader!");
      }
      closeModal();

    } catch (err) {
      console.error("Error copying trade:", err);
      alert(` Error copying trade. Please try again. Details: ${err instanceof Error ? err.message : "An unknown error occurred."}`);
    } finally {
      setCopying(false);
    }
  };

  const handleUncopyClick = () => {
    setShowUncopyConfirm(true);
  };



  const handleUnCopy = async () => {
    if (!traderData) return;
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to uncopy a trader.");
      router.push("/login");
      return;
    }

    closeUncopyModal(); 
    
    try {
      setUncopying(true); 
      
      const response = await fetch(API_ENDPOINTS.TRADERS.UNCOPY_TRADER, {
        method: "POST", // Standard for stop actions
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ traderId: traderData.id }),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Failed to uncopy trade: ${errorDetail}`);
      }

      // Update state to reflect that the user is no longer copying
      setTraderData((prev) => (prev ? { ...prev, copied: false } : null));
      setSuccessMessage("Successfully stopped copying the trader!");

    } catch (err) {
      console.error("Error uncopying trade:", err);
      setSuccessMessage(` Error stopping copy. Details: ${err instanceof Error ? err.message : "An unknown error occurred."}`);
    } finally {
      setUncopying(false); 
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto" />
        <p className="mt-2 text-gray-400">Loading trader details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
          <h3 className="text-red-400 font-semibold">
            Error Loading Trader Details
          </h3>
          <p className="text-red-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!traderData) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-400">No trader data available</p>
        <p className="text-gray-400">Trader ID: {params.id}</p>
      </div>
    );
  }

  const winRate =
    traderData.totalCopiers > 0
      ? Math.round((traderData.currentCopiers / traderData.totalCopiers) * 100)
      : 0;

  const daysSinceCreated = Math.floor(
    (new Date().getTime() - new Date(traderData.createdAt).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="p-4 md:p-6 w-full max-w-6xl mx-auto">
  {showModal && (
    <CopyTradeModal
      traderName={traderData.username}
      minAmount={traderData.minCopyAmount}
      maxAmount={traderData.maxCopyAmount}
      commissionRate={traderData.commissionRate}
      onClose={closeModal}
      onConfirmCopy={handleConfirmCopy}
    />
  )}

  {showUncopyConfirm && (
    <UncopyConfirmModal
      traderName={traderData.username}
      onClose={closeUncopyModal} 
      onConfirm={handleUnCopy} 
    />
  )}

  {successMessage && (
    <CopySuccess
      message={successMessage}
      onClose={() => setSuccessMessage(null)}
    />
  )}

  {/* Main Container with Enhanced Styling */}
  <div className="bg-gradient-to-br from-gray-900 to-gray-850 rounded-xl border border-gray-700 p-6 shadow-2xl backdrop-blur-sm">
    <div className="flex flex-col lg:flex-row justify-between gap-6 pb-6 border-b border-gray-700">
      <div className="flex-1 flex flex-col sm:flex-row gap-6">
        {/* Profile Image Section */}
        <div className="relative flex-shrink-0">
          <Image
            src={traderData.profilePicture || "/img/Avatar DP.png"}
            alt={traderData.username}
            width={120}
            height={120}
            className="rounded-full border-4 border-green-500/50 shadow-xl hover:scale-105 transition-transform duration-200"
          />
          {traderData.isVerified && (
            <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1 shadow-lg">
              <Award size={16} className="text-white" />
            </div>
          )}
        </div>

        {/* Trader Info Section */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-white text-2xl font-bold">
                {traderData.username}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  traderData.status === "ACTIVE"
                    ? "bg-green-500/20 text-green-300 border-green-500/30"
                    : "bg-red-500/20 text-red-300 border-red-500/30"
                }`}
              >
                {traderData.status}
              </span>
            </div>
            <p className="text-gray-400 mt-2">
              {traderData.bio || "No biography available"}
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                Joined {daysSinceCreated} day(s) ago
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users size={14} />
                {traderData.totalCopiers} total copiers
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="bg-gray-800/30 hover:bg-gray-700/40 transition-colors p-4 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">Current Copiers</p>
              <h3 className="text-white text-xl font-bold">
                {traderData.currentCopiers.toLocaleString()}
                <span className="text-green-400 text-sm ml-1">
                  /{traderData.maxCopiers}
                </span>
              </h3>
            </div>
            <div className="bg-gray-800/30 hover:bg-gray-700/40 transition-colors p-4 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">Win Rate</p>
              <h3 className="text-white text-xl font-bold">{winRate}%</h3>
            </div>
            <div className="bg-gray-800/30 hover:bg-gray-700/40 transition-colors p-4 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">Risk Score</p>
              <h3 className="text-white text-xl font-bold">
                {traderData.riskScore}/10
              </h3>
            </div>
            <div className="bg-gray-800/30 hover:bg-gray-700/40 transition-colors p-4 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">Commission</p>
              <h3 className="text-white text-xl font-bold">
                {traderData.commissionRate}%
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 justify-end">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors p-3 rounded-xl hover:bg-gray-800/60">
            <Share2 size={18} />
            <span className="text-sm">Share</span>
          </button>
          <button
            className={`flex items-center gap-2 p-3 rounded-xl transition-colors ${
              traderData.favorited
                ? "text-red-500 hover:text-red-400 bg-red-500/10 border border-red-500/20"
                : "text-gray-400 hover:text-white hover:bg-gray-800/60 border border-transparent"
            }`}
          >
            <Heart
              size={18}
              fill={traderData.favorited ? "currentColor" : "none"}
            />
            <span className="text-sm">Subscribe</span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {/* Conditional Button for Copy/Uncopy */}
          {traderData.copied ? (
            <button
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleUncopyClick}
              disabled={uncopying}
            >
              {uncopying ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Stopping Copy...
                </>
              ) : (
                <>
                  <XCircle size={18} />
                  Stop Copying
                </>
              )}
            </button>
          ) : (
            <button
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCopyClick}
              disabled={copying}
            >
              {copying ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Copying...
                </>
              ) : (
                <>
                  <Target size={18} />
                  Copy Trader
                </>
              )}
            </button>
          )}
          {/* End Conditional Button */}

          <div className="text-center text-xs text-gray-500 pt-2">
            Min: ${traderData.minCopyAmount} | Max: $
            {traderData.maxCopyAmount.toLocaleString()}
          </div>
        </div>
      </div>
    </div>

    {/* Performance Metrics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
      <div className="bg-gray-800/30 hover:bg-gray-700/40 transition-colors p-4 rounded-xl border border-gray-700">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <CircleDollarSign size={16} />
          <span className="text-xs font-medium uppercase tracking-wide">Total P&L</span>
        </div>
        <h2
          className={`text-2xl font-bold ${
            traderData.totalPnL >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          ${traderData.totalPnL >= 0 ? "+" : ""}{Math.abs(traderData.totalPnL).toLocaleString()}
        </h2>
      </div>

      <div className="bg-gray-800/30 hover:bg-gray-700/40 transition-colors p-4 rounded-xl border border-gray-700">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <Wallet size={16} />
          <span className="text-xs font-medium uppercase tracking-wide">Copiers P&L</span>
        </div>
        <h2
          className={`text-2xl font-bold ${
            traderData.copiersPnL >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          ${traderData.copiersPnL >= 0 ? "+" : ""}{Math.abs(traderData.copiersPnL).toLocaleString()}
        </h2>
      </div>

      <div className="bg-gray-800/30 hover:bg-gray-700/40 transition-colors p-4 rounded-xl border border-gray-700">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <PieChart size={16} />
          <span className="text-xs font-medium uppercase tracking-wide">Assets Under Mgt</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          ${traderData.aum.toLocaleString()}
        </h2>
      </div>

      <div className="bg-gray-800/30 hover:bg-gray-700/40 transition-colors p-4 rounded-xl border border-gray-700">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <BarChart3 size={16} />
          <span className="text-xs font-medium uppercase tracking-wide">Trading Pairs</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {traderData.tradingPairs.map((pair, index) => (
            <span
              key={index}
              className="bg-gray-700/80 text-gray-300 px-2 py-1 rounded-full text-xs border border-gray-600"
            >
              {pair}
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-6">
      <Usersdetails copyData={traderData} />
    </div>
  </div>
</div>
  );
};

export default CopyDetails;