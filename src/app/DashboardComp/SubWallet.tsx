"use client";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Plus } from "lucide-react";
import { API_ENDPOINTS } from "../config/api";
import Link from "next/link";

const SubWallet = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Please login to view balance");

        const res = await fetch(API_ENDPOINTS.USER.USER_PROFILE, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch balance");
        const data = await res.json();
        setBalance(data.data?.subscriptionBalance || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Connection error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBalance();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  
  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
        <div className="h-8 w-20 bg-gray-600 rounded-md animate-pulse" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-sm">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-b from-[#141E323D] to-[#141E32] p-6 rounded-lg h-auto min-h-[170px">
       <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-gray-400">Balance:</span>
        <span className="font-medium">
          {showBalance ? formatCurrency(balance) : "••••••"}
        </span>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="text-gray-400 hover:text-white transition"
          aria-label={showBalance ? "Hide balance" : "Show balance"}
        >
          {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>

      <Link href='/deposit'
        className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-1 px-3 rounded-md transition"
      >
        <Plus size={14} />
        Deposit
      </Link>
    </div>
    </div>
   
  );
};

export default SubWallet;