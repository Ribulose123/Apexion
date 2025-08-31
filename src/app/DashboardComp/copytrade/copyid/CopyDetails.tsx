'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, CircleDollarSign, Wallet, PieChart, Share2, Heart, Users, Award, BarChart3, Target, Loader2 } from "lucide-react";
import Image from "next/image";
import Usersdetails from "./Usersdetails";
import CopyTradeModal from "@/app/modals/CopyTradeModal";
import { API_ENDPOINTS } from "@/app/config/api";
import { useRouter } from 'next/navigation';

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
                const baseUrl = API_ENDPOINTS.TRADERS.GET_ALL_TRADERS_DETAILS.replace("{traderId}", traderId);
                // FIX: Add a cache-busting parameter to the URL to avoid 304 status
                const url = `${baseUrl}?t=${new Date().getTime()}`;
                
                console.log("Fetching trader details...");
                console.log("Trader ID:", traderId);
                console.log("Request URL:", url);
                console.log("Authorization Token:", token ? "Token Found" : "Token Missing");

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 304) {
                    console.log("304 Not Modified - Using cached data. No action needed.");
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.removeItem("authToken");
                        router.push("/login");
                        throw new Error("Authentication failed: Your session has expired.");
                    }
                    throw new Error(`Failed to fetch trader details: ${response.status} - ${await response.text()}`);
                }

                const result = await response.json();
                console.log("API Response:", result);

                if (result) {
                    setTraderData(result.data);
                    setError(null);
                } else {
                    throw new Error("Invalid data format received from API");
                }
            } catch (err) {
                console.error("Failed to fetch trader details:", err);
                setError(err instanceof Error ? err.message : "An unknown error occurred.");
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

    const handleConfirmCopy = async (copySettings: CopySettings) => {
        if (!traderData) return;
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("You must be logged in to copy a trader.");
            router.push("/login");
            return;
        }

        try {
            setCopying(true);
            const response = await fetch(API_ENDPOINTS.TRADERS.COPY_TRADER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    traderId: traderData.id,
                    amount: copySettings.copyAmount,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to copy trade");
            }

            const result = await response.json();
            console.log("Copy trade successful:", result);
            alert("✅ You are now copying this trader!");
            closeModal();
            
            setTraderData(prev => prev ? { ...prev, copied: true } : null);

        } catch (err) {
            console.error("Error copying trade:", err);
            alert("❌ Error copying trade. Please try again.");
        } finally {
            setCopying(false);
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
                    <h3 className="text-red-400 font-semibold">Error Loading Trader Details</h3>
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

            <div className=" to-gray-850 rounded-xl border border-gray-800 p-6 shadow-xl">
                <div className="flex flex-col lg:flex-row justify-between gap-6 pb-6 border-b border-gray-800">
                    <div className="flex-1 flex flex-col sm:flex-row gap-6">
                        <div className="relative flex-shrink-0">
                            <Image
                                src={traderData.profilePicture || "/img/Avatar DP.png"}
                                alt={traderData.username}
                                width={120}
                                height={120}
                                className="rounded-full border-4 border-green-500/30 shadow-lg"
                            />
                            {traderData.isVerified && (
                                <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1">
                                    <Award size={16} className="text-white" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-white text-2xl font-bold">{traderData.username}</h1>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        traderData.status === "ACTIVE" 
                                            ? "bg-green-500/20 text-green-400" 
                                            : "bg-red-500/20 text-red-400"
                                        }`}>
                                        {traderData.status}
                                    </span>
                                </div>
                                <p className="text-gray-400 mt-2">{traderData.bio || "No biography available"}</p>
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

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                                <div className="bg-gray-800/50 p-3 rounded-lg">
                                    <p className="text-gray-400 text-sm">Current Copiers</p>
                                    <h3 className="text-white text-xl font-bold">
                                        {traderData.currentCopiers.toLocaleString()}
                                        <span className="text-green-400 text-sm ml-1">/{traderData.maxCopiers}</span>
                                    </h3>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded-lg">
                                    <p className="text-gray-400 text-sm">Win Rate</p>
                                    <h3 className="text-white text-xl font-bold">
                                        {winRate}%
                                    </h3>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded-lg">
                                    <p className="text-gray-400 text-sm">Risk Score</p>
                                    <h3 className="text-white text-xl font-bold">
                                        {traderData.riskScore}/10
                                    </h3>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded-lg">
                                    <p className="text-gray-400 text-sm">Commission</p>
                                    <h3 className="text-white text-xl font-bold">
                                        {traderData.commissionRate}%
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 justify-end">
                            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800">
                                <Share2 size={18} />
                                <span className="text-sm">Share</span>
                            </button>
                            <button className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                traderData.favorited 
                                    ? "text-red-500 hover:text-red-400 bg-red-500/10" 
                                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                                }`}>
                                <Heart 
                                    size={18} 
                                    fill={traderData.favorited ? "currentColor" : "none"} 
                                />
                                <span className="text-sm">Subscribe</span>
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <button
                                className="bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
                                onClick={handleCopyClick}
                                disabled={copying || traderData.copied}
                            >
                                {copying ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Copying...
                                    </>
                                ) : (
                                    <>
                                        <Target size={18} />
                                        {traderData.copied ? "Already Copied" : "Copy Trader"}
                                    </>
                                )}
                            </button>
                            
                            <div className="text-center text-xs text-gray-500">
                                Min: ${traderData.minCopyAmount} | Max: ${traderData.maxCopyAmount.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
                    <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-800">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <CircleDollarSign size={16} />
                            <span className="text-sm">Total P&L</span>
                        </div>
                        <h2 className={`text-2xl font-bold ${
                            traderData.totalPnL >= 0 ? "text-green-400" : "text-red-400"
                        }`}>
                            ${Math.abs(traderData.totalPnL).toLocaleString()}
                        </h2>
                    </div>
                    
                    <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-800">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <Wallet size={16} />
                            <span className="text-sm">Copiers P&L</span>
                        </div>
                        <h2 className={`text-2xl font-bold ${
                            traderData.copiersPnL >= 0 ? "text-green-400" : "text-red-400"
                        }`}>
                            ${Math.abs(traderData.copiersPnL).toLocaleString()}
                        </h2>
                    </div>
                    
                    <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-800">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <PieChart size={16} />
                            <span className="text-sm">Assets Under Mgt</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                            ${traderData.aum.toLocaleString()}
                        </h2>
                    </div>
                    
                    <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-800">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <BarChart3 size={16} />
                            <span className="text-sm">Trading Pairs</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {traderData.tradingPairs.map((pair, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
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