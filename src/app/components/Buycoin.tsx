// app/components/Buycoin.tsx - Minimal Version
'use client';
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface WalletPlatform {
  id: string;
  name: string;
  url: string;
  icon: string;
}

const Buycoin = () => {
  const walletPlatforms: WalletPlatform[] = [
    {
      id: 'coinbase',
      name: 'Coinbase',
      url: 'https://www.coinbase.com',
      icon: '🟠'
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      url: 'https://trustwallet.com',
      icon: '🔵'
    },
    {
      id: 'binance',
      name: 'Binance',
      url: 'https://www.binance.com',
      icon: '🟡'
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      url: 'https://metamask.io',
      icon: '🦊'
    },
    {
      id: 'kraken',
      name: 'Kraken',
      url: 'https://www.kraken.com',
      icon: '🔴'
    },
    {
      id: 'exodus',
      name: 'Exodus',
      url: 'https://www.exodus.com',
      icon: '💠'
    }
  ];

  const handlePlatformClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen  text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Simple Header */}
        <div className="text-center mb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Buy Crypto</h1>
          <p className="text-gray-400">Choose a platform to get started</p>
        </div>
        </div>

        {/* Clean Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {walletPlatforms.map((platform) => (
              <div
                key={platform.id}
                className="bg-[#141E323D] border border-[#439A8633] rounded-xl p-6 hover:transform hover:scale-105 cursor-pointer group"
                onClick={() => handlePlatformClick(platform.url)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <span className="font-semibold">{platform.name}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simple Security Note */}
        <div className="max-w-md mx-auto mt-12 text-center">
          <p className="text-gray-400 text-sm">
            🔒 Links open official websites in new tabs
          </p>
        </div>
      </div>
    </div>
  );
};

export default Buycoin;