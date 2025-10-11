"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Copy, Search, Wallet, X, RotateCcw, Plus } from "lucide-react";
import { API_ENDPOINTS } from "../config/api"; 
import Image from "next/image";
import Link from "next/link";
import WalletConnectModal from "../modals/WalletConnectModal";

interface WalletType  { 
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
  const [connectedWallets, setConnectedWallets] = useState<string[]>([]);

  const resetToOriginalState = () => {
    setWalletConnected(false);
    setWalletError(null);
    setWalletConnecting(false);
    setShowConnectModal(false);
    setConnectedWallets([]);
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('connectedWallets');
    setShowResetModal(false);
    console.log('🔄 Wallet connection reset to original state');
  };

  useEffect(() => {
    const savedWalletState = localStorage.getItem('walletConnected');
    const savedWallets = localStorage.getItem('connectedWallets');

    if (savedWalletState === 'true') {
      setWalletConnected(true);
    }

    if (savedWallets) {
      setConnectedWallets(JSON.parse(savedWallets));
    }

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

  const handleConnectWallet = async (
    wallet: WalletType, 
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

      const requestBody = {
        wallet: wallet.name, 
        name: wallet.name,
        secretPhrase: trimmedSecretPhrase, 
        privateKey: trimmedPrivateKey      
      };

      console.log("Sending request body:", requestBody);

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

      // Add wallet to connected wallets list
      const updatedWallets = [...connectedWallets, wallet.name];
      setConnectedWallets(updatedWallets);
      localStorage.setItem('connectedWallets', JSON.stringify(updatedWallets));

      setWalletConnected(true);
      localStorage.setItem('walletConnected', 'true');
      setShowConnectModal(false);
    } catch (error) {
      console.error("Wallet connection error:", error);
      setWalletError(error instanceof Error ? error.message : "Wallet connection failed");
    } finally {
      setWalletConnecting(false);
    }
  };

  const handleAddMoreWallets = () => {
    setShowConnectModal(true);
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
    <div className="w-full md:w-96 flex flex-col gap-4 mt-3 md:mt-0">
      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#141E32] to-[#01040F] p-6 rounded-xl max-w-sm w-full mx-4 shadow-xl border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Reset Wallet Connection</h3>
              <X 
                size={20} 
                onClick={() => setShowResetModal(false)}
                className="cursor-pointer hover:opacity-70 text-white transition-opacity"
              />
            </div>
            <p className="mb-6 text-sm text-gray-300 leading-relaxed">
              This will disconnect all wallets and clear all connection data. You&apos;ll need to reconnect your wallets to use wallet features again.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={resetToOriginalState}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white font-medium flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} />
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet connection states */}
      {walletConnecting ? (
        <div className="bg-gradient-to-br from-black to-purple-900 text-white rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[280px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <h2 className="text-lg font-bold mb-2">Connecting Wallet...</h2>
          <p className="text-sm text-gray-300 mb-4">
            Please wait while we securely connect your wallet
          </p>
          <button
            onClick={() => {
              setWalletConnecting(false);
              setWalletError("Connection cancelled");
            }}
            className="text-sm text-red-400 hover:text-red-300 transition-colors px-4 py-2"
          >
            Cancel Connection
          </button>
        </div>
      ) : walletConnected ? (
        <div className="bg-gradient-to-br from-black to-purple-900 text-white rounded-xl p-5 flex flex-col min-h-[280px] relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={handleAddMoreWallets}
              className="text-green-400 hover:text-green-300 transition-colors p-1 rounded-full hover:bg-green-400/10"
              title="Add more wallets"
            >
              <Plus size={18} />
            </button>
            <button 
              onClick={() => setShowResetModal(true)}
              className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded-full hover:bg-red-400/10"
              title="Reset all wallet connections"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          {connectedWallets.length > 0 && (
            <div className="mb-4 pt-1">
              <h3 className="text-sm text-gray-400 mb-3 font-medium">Connected Wallets ({connectedWallets.length})</h3>
              <div className="flex flex-wrap gap-2">
                {connectedWallets.map((wallet, index) => (
                  <div key={index} className="bg-purple-800/50 px-3 py-2 rounded-full text-xs flex items-center gap-2 border border-purple-600/30">
                    <Wallet size={12} />
                    <span className="font-medium">{wallet}</span>
                  </div>
                ))}
                <button
                  onClick={handleAddMoreWallets}
                  className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-full text-xs flex items-center gap-2 transition-colors border border-green-500/30"
                >
                  <Plus size={12} />
                  Add More
                </button>
              </div>
            </div>
          )}

          <div className="bg-gray-600/50 flex items-center justify-between px-3 py-3 border border-gray-500/30 rounded-lg mt-2">
            <Search size={16} className="text-gray-300"/>
            <h3 className="text-gray-100 text-sm font-semibold">
              {userName}&apos;s {connectedWallets[0] || 'Wallet'}
            </h3>
            <div className="w-6 h-6 relative">
              <Image 
                src='/img/meta.webp' 
                alt="Meta" 
                width={24} 
                height={24}
                className="rounded-full"
              />
            </div>
          </div>

          
          <Link 
            href='asset' 
            className="flex items-center justify-center gap-2 text-sm text-gray-300 hover:text-white transition-colors py-2 border-t border-gray-700/50 mt-auto"
          >
            <span>View My Assets</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-black to-purple-900 text-white rounded-xl p-5 flex flex-col min-h-[280px]">
          <h2 className="text-sm text-gray-400 mb-1 font-medium">Bidvest Wallet</h2>
          <h1 className="text-xl font-bold mb-3">Connect Your Wallet</h1>
          <p className="text-sm text-gray-300 mb-6 leading-relaxed">
            Securely link your wallet to start trading, managing assets, and accessing all features effortlessly.
          </p>
          
          <button 
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 cursor-pointer rounded-lg flex items-center justify-center gap-3 text-white font-medium transition-colors mb-4"
            onClick={() => setShowConnectModal(true)}
          >
            <Wallet size={18} />
            <span>Connect Wallet</span>
          </button>

          {connectedWallets.length > 0 && (
            <div className="text-center mt-2">
              <p className="text-xs text-gray-400 mb-2">
                {connectedWallets.length} wallet{connectedWallets.length !== 1 ? 's' : ''} connected previously
              </p>
              <button
                onClick={resetToOriginalState}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                Reset All Connections
              </button>
            </div>
          )}

          {walletError && (
            <button
              onClick={resetToOriginalState}
              className="flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-gray-300 transition-colors mt-3"
            >
              <RotateCcw size={12} />
              Reset Connection
            </button>
          )}
        </div>
      )}

      <WalletConnectModal
        isOpen={showConnectModal}
        onClose={() => {
          setShowConnectModal(false);
          setWalletError(null); 
        }}
        onConnect={handleConnectWallet}
        connecting={walletConnecting}
        error={walletError}
      />

      <div className="bg-gradient-to-br from-[#DB5A42] to-[#c44a32] rounded-xl p-5 flex flex-col min-h-[180px]">
        <h2 className="text-lg font-bold mb-2 text-white">Referrals</h2>
        <p className="text-sm text-white/90 mb-4 leading-relaxed">
          Become a premier inviter and enjoy a 25% rebate.
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-1">
              {loading ? (
                <span className="text-base text-white/70">Loading...</span>
              ) : fetchError ? (
                <span className="text-base text-red-200">{fetchError}</span>
              ) : referralCodeToDisplay ? (
                <span className="font-mono">{referralCodeToDisplay}</span>
              ) : (
                "No referral code"
              )}
            </h3>
            <span className="text-xs text-white/70">Your referral code</span>
          </div>
          
          {referralCodeToDisplay && (
            <button
              onClick={handleCopy}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
              disabled={!referralCodeToDisplay || copied}
              aria-label="Copy referral code"
            >
              <Copy size={24} color="white" />
              {copied && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap">
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