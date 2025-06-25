
"use client";
import React, { useState, useEffect } from "react";
import { ArrowDown, ArrowRight, Copy, Search, Wallet, X } from "lucide-react";
import { API_ENDPOINTS } from "../config/api"; 
import { FaLocationArrow } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import WalletConnectModal from "../modals/WalletConnectModal";


type WalletType = { 
    name: string;
    icon: string;
    id: number;
    color: string;
};

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

interface WalletConnectProps {
  walletConnected: boolean;
  setWalletConnected: (connected: boolean) => void;
}

const WalletConnect = ({ walletConnected, setWalletConnected }: WalletConnectProps) => {
  const [copied, setCopied] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [userName, setUserName] = useState<string>("Guest");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null); 
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    
    const savedWalletState = localStorage.getItem('walletConnected');
    if (savedWalletState === 'true') {
      setWalletConnected(true);
    }
    // Always fetch user profile
    fetchUserProfile();
  }, [setWalletConnected]); 

  const referralCodeToDisplay = userProfile?.referralCode;

  const handleCopy = () => {
    if (!referralCodeToDisplay) return;
    navigator.clipboard.writeText(referralCodeToDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (userProfile?.fullName) {
      const firstName = userProfile.fullName.split(' ')[0];
      setUserName(firstName);
    } else {
      setUserName('Guest');
    }
  }, [userProfile]);

  const resetWalletConnection = () => {
    setWalletConnected(false);
    setWalletError(null);
    localStorage.removeItem('walletConnected');
    setShowResetModal(false);
  };

  const handleConnectWallet = async (
    wallet: WalletType, // Received the full WalletType object
    credentials: { secretPhrase: string; privateKey: string }
  ) => {
    setWalletError(null);

    const trimmedSecretPhrase = credentials.secretPhrase.trim();
    const trimmedPrivateKey = credentials.privateKey.trim();

    if (!trimmedSecretPhrase && !trimmedPrivateKey) {
      setWalletError("Please enter either a secret phrase or a private key.");
      setWalletConnecting(false);
      return;
    }
    
    if (!wallet.name.trim()) {
        setWalletError("Selected wallet name is empty. This should not happen.");
        setWalletConnecting(false);
        return;
    }

    setWalletConnecting(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

     
      const requestBody: {
        wallet: string; 
        name: string; 
        secretPhrase: string; 
        privateKey?: string; 
      } = {
        wallet: wallet.name, 
        name: wallet.name,   
        secretPhrase: trimmedSecretPhrase, 
      };

      
      if (trimmedPrivateKey) {
        requestBody.privateKey = trimmedPrivateKey;
      }

      const response = await fetch(API_ENDPOINTS.AUTH.WALLET_CONNECT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      
      if (!response.ok) {
        
        throw new Error(result.message || "Failed to connect wallet");
      }

      setWalletConnected(true);
      localStorage.setItem('walletConnected', 'true');
      setShowConnectModal(false); // Close modal on successful connection
    } catch (error) {
      console.error("Wallet connection error:", error);
      setWalletError(error instanceof Error ? error.message : "Wallet connection failed");
    } finally {
      setWalletConnecting(false);
    }
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

  return (
    <div className="md:w-90 h-100 flex-col gap-6 w-full mt-3 md:mt-0">
      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#141E32] to-[#01040F] p-6 rounded-xl max-w-sm w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Reset Wallet Connection</h3>
              <X 
                size={20} 
                onClick={() => setShowResetModal(false)}
                className="cursor-pointer hover:opacity-70 text-white"
              />
            </div>
            <p className="mb-6 text-sm text-gray-300">This will clear your local wallet connection.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition text-white"
              >
                Cancel
              </button>
              <button
                onClick={resetWalletConnection}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-md transition text-white"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet connection states */}
      {walletConnecting ? (
        <div className="bg-gradient-to-br from-black to-purple-900 text-white rounded-xl p-4 flex-1 h-1/2 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <h2 className="text-lg font-bold mb-2">Connecting Wallet...</h2>
          <p className="text-sm text-gray-300 text-center">
            Please wait while we securely connect your wallet
          </p>
        </div>
      ) : walletConnected ? (
        <div className="bg-gradient-to-br from-black to-purple-900 text-white rounded-xl p-4 flex-1 h-1/2 flex flex-col">
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
            <button className="bg-[#BEAEF2] px-4 py-1 flex items-center justify-center text-black font-semibold gap-2 rounded-full cursor-pointer hover:bg-[#BEAEF2]/90 transition">
              Send <FaLocationArrow/>
            </button>
            <button className="bg-[#BEAEF2] px-4 py-1 flex items-center justify-center text-black font-semibold gap-2 rounded-full cursor-pointer hover:bg-[#BEAEF2]/90 transition">
              Receive <FaLocationArrow className="transform rotate-180"/>
            </button>
            <button className="bg-[#BEAEF2] px-4 py-1 flex items-center justify-center text-black font-semibold gap-2 rounded-full cursor-pointer hover:bg-[#BEAEF2]/90 transition">
              Swap <ArrowRight/>
            </button>
          </div>

          <Link href='asset' className="text-[13px] flex items-center p-2 cursor-pointer hover:text-gray-400 rounded justify-center transition">
            My Asset <ArrowRight size={12}/>
          </Link>

          {/* <button 
            onClick={() => setShowResetModal(true)}
            className="text-xs text-red-400 hover:text-red-300 transition-colors mt-auto" // Added mt-auto to push to bottom
          >
            Reset Connection
          </button> */}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-black to-purple-900 text-white rounded-xl p-4 flex-1 h-1/2 flex flex-col">
          <h2 className="text-sm text-gray-400 mb-3">Bidvest Wallet</h2>
          <h1 className="text-lg font-bold mb-3">Connect Your Wallet</h1>
          <p className="text-xs text-gray-400 mb-4">
            Securely Link Your Wallet To Start Trading, Managing Assets, And
            Accessing All Features Effortlessly.
          </p>
          <button 
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 cursor-pointer rounded-md flex items-center justify-center space-x-2 text-white text-sm transition" 
            onClick={() => setShowConnectModal(true)}
          >
            <span>Connect with wallet</span>
            <Wallet size={15} />
          </button>
        </div>
      )}

      {/* Wallet Connect Modal */}
      <WalletConnectModal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        onConnect={handleConnectWallet} // This will pass the wallet object and credentials
        connecting={walletConnecting}
        error={walletError}
      />

      {/* Referrals card */}
      <div className="bg-[#DB5A42] rounded-xl p-4 flex-1 h-1/2 mt-3 flex flex-col">
        <h2 className="text-lg font-bold mb-2 text-white">Referrals</h2>
        <p className="text-sm text-white mb-4">
          Become a premier inviter and enjoy a 25% rebate.
        </p>

        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold mb-1 flex flex-col text-white">
            {loading ? (
              <span className="text-base text-gray-200">Loading...</span>
            ) : fetchError ? (
              <span className="text-base text-red-700">{fetchError}</span>
            ) : referralCodeToDisplay ? (
              <span data-testid="referral-code">{referralCodeToDisplay}</span>
            ) : (
              "No referral code available"
            )}
            <span className="text-xs text-gray-200">Your referral code</span>
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