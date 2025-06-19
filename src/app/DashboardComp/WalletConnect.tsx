"use client";
import React, { useState, useEffect } from "react";
import { ArrowDown, ArrowRight, Copy, Search, WalletMinimal, X } from "lucide-react";
import { API_ENDPOINTS } from "../config/api";
import { FaLocationArrow } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

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
  const [userName, setUserName] = useState<string>("Guest");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [connectWallet, setConnectWallet] = useState(false);
  const [walletConnecting, setWalletConnecting] = useState(false);


  useEffect(() => {
    const savedWalletState = localStorage.getItem('walletConnected');
    if (savedWalletState === 'true') {
      setConnectWallet(true);
    }
  }, []);

  const referralCodeToDisplay = userProfile?.referralCode;

  useEffect(() => {
    if (userProfile?.fullName) {
      const firstName = userProfile.fullName.split(' ')[0];
      setUserName(firstName);
    } else {
      setUserName('Guest');
    }
  }, [userProfile]);

  const handleCopy = () => {
    if (!referralCodeToDisplay) return;
    navigator.clipboard.writeText(referralCodeToDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShowPrompt = () => {
    setShowPrompt(!showPrompt);
  };

  const handleConfirmConnection = () => {
    setShowPrompt(false);
    setWalletConnecting(true);
    
    setTimeout(() => {
      setWalletConnecting(false);
      setConnectWallet(true);
      localStorage.setItem('walletConnected', 'true');
    }, 3000); 
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

      setUserProfile(result.data);
      
    } catch (err) {
      console.error("Fetch error:", err);
      setFetchError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="md:w-90 h-100 flex-col gap-6 w-full mt-3 md:mt-0">
      {/* Connect wallet prompt modal */}
      {showPrompt && (
        <div className="fixed inset-0 bg-black/5 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-linear-to-bl from-[#141E32] to-[#01040F] max-w-sm mx-4 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <h2>Connect Your Wallet</h2>
              <X size={20} onClick={() => setShowPrompt(false)}/>
            </div>
            <p className="text-gray-600 mb-6">
              Do you want to connect your wallet to start trading and managing assets?
            </p>
            <div className="flex items-center gap-5">
              <button 
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer" 
                onClick={() => setShowPrompt(false)}
              >
                No
              </button>
              <button 
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer" 
                onClick={handleConfirmConnection}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet connection states */}
      {walletConnecting ? (
        <div
          className="bg-gradient-to-br from-black to-purple-900 text-white rounded-xl p-4 flex-1 h-1/2 flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(to bottom right, #000000, #4C1D95)",
          }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <h2 className="text-lg font-bold mb-2">Connecting Wallet...</h2>
          <p className="text-sm text-gray-300 text-center">
            Please wait while we securely connect your wallet
          </p>
        </div>
      ) : connectWallet ? (
        <div
          className="bg-gradient-to-br from-black to-purple-900 text-white rounded-xl p-4 flex-1 h-1/2 flex flex-col"
          style={{
            background: "linear-gradient(to bottom right, #000000, #4C1D95)",
          }}
        >
          <div className="bg-gray-500 flex items-center justify-between px-2 py-1 border border-[#FFFFFF33] rounded-lg">
            <Search size={15} className="text-[#E8E8E8]"/>
            <h3 className="text-[#E8E8E8] text-sm font-semibold">{userName} Wallet</h3>
            <Image src='/img/meta.webp' alt="Meta" width={20} height={20}/>
          </div>

          <div className="mx-auto flex flex-col mt-4">
            <p className="text-[#E8E8E8] text-xs font-medium text-center">Available Balance</p>
            <h2 className="text-[27px] text-center text-[#E8E8E8] font-semibold">$130000</h2>

            <span className="flex items-center text-[12px] text-center justify-center -mt-2 text-[#F23645]">
              <ArrowDown size={10}/>
              $1.05 (-2.98%)
            </span>
          </div>
          <div className="flex space-x-3 mt-2 mx-auto">
            <button className="bg-[#BEAEF2] px-4 py-1 flex items-center justify-center text-black font-semibold gap-2 rounded-full cursor-pointer">
              Send <FaLocationArrow/>
            </button>
            <button className="bg-[#BEAEF2] px-4 py-1 flex items-center justify-center text-black font-semibold gap-2 rounded-full cursor-pointer">
              Send <FaLocationArrow/>
            </button>
            <button className="bg-[#BEAEF2] px-4 py-1 flex items-center justify-center text-black font-semibold gap-2 rounded-full cursor-pointer">
              Send <FaLocationArrow/>
            </button>
          </div>

          <Link href='asset' className="text-[13px] flex items-center p-2 cursor-pointer">
            My Asset <ArrowRight size={12}/>
          </Link>
        </div>
      ) : (
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
          <button 
            className="w-full py-2 bg-purple-600 hover:bg-purple-900 cursor-pointer rounded-md flex items-center justify-center space-x-2 text-white text-sm" 
            onClick={handleShowPrompt}
          >
            <span>Connect with wallet</span>
            <WalletMinimal size={15} className="bg-black" />
          </button>
        </div>
      )}

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