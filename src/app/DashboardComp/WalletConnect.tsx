"use client";
import React, { useState, useEffect } from "react";
import { Copy, WalletMinimal } from "lucide-react";
import { API_ENDPOINTS } from "../config/api";

interface UserProfileData {
  id: string;
  fullName: string;
  email: string;
  isEmailVerified: boolean;
  referralCode: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  status: number;
  message: string;
  data: UserProfileData;
}

const WalletConnect = () => {
  const [copied, setCopied] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const referralCodeToDisplay = userProfile?.referralCode;

  const handleCopy = () => {
    if (!referralCodeToDisplay) return;
    navigator.clipboard.writeText(referralCodeToDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchUserProfile = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await fetch(API_ENDPOINTS.USER.USER_PROFILE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      
      const result: ApiResponse = await response.json();
      

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch profile");
      }

      console.log("Setting user profile:", result.data);
      setUserProfile(result.data);
      
    } catch (err) {
      console.error("Fetch error:", err);
     
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

 
  return (
    <div className="md:w-90 h-100 flex-col gap-6 w-full mt-3 md:mt-0">
      {/* Connect wallet card */}
      <div
        className="bg-gradient-to-br from-black to-purple-900 text-white rounded-xl p-4 flex-1 h-1/2 flex flex-col"
        style={{
          background: "linear-gradient(to bottom right, #000000, #4C1D95)",
        }}
      >
        <h2 className="text-sm text-gray-400 mb-3">Bidvest Wallet</h2>
        <h1 className="text-lg font-bold mb-3">Connect Your Wallet</h1>
        <p className="text-xs text-gray-400 mb-4">
          Securely Link Your Wallet To Start Trading, Managing Assets, And
          Accessing All Features Effortlessly.
        </p>

        <button className="w-full py-2 bg-purple-600 rounded-md flex items-center justify-center space-x-2 text-white text-sm">
          <span>Connect with wallet</span>
          <WalletMinimal size={15} className="bg-black" />
        </button>
      </div>

      {/* Referrals card */}
      <div className="bg-[#DB5A42] rounded-xl p-4 flex-1 h-1/2 mt-3 flex flex-col">
        <h2 className="text-lg font-bold mb-2">Referrals</h2>
        <p className="text-sm text-white mb-4">
          Become a premier inviter and enjoy a 25% rebate.
        </p>

        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold mb-1 flex flex-col">
            {loading ? (
              <span className="text-base text-gray-200">Loading...</span>
            ) : fetchError ? (
              <span className="text-base text-red-700">{fetchError}</span>
            ) : referralCodeToDisplay ? (
              <span data-testid="referral-code">{referralCodeToDisplay}</span>
            ) : (
              "No referral code available"
            )}
            <span className="text-xs">Your referral code</span>
          </h3>
          
          {referralCodeToDisplay && (
            <button
              onClick={handleCopy}
              className="ml-2 relative"
              disabled={!referralCodeToDisplay || copied}
              aria-label="Copy referral code"
            >
              <Copy size={26} color="white" />
              {copied && (
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-white bg-black bg-opacity-70 px-1 py-0.5 rounded">
                  Copied!
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      
     
    </div>
  );
};

export default WalletConnect;