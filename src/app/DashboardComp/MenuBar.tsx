'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, ChevronDown, DollarSign, X } from 'lucide-react';
import Flag from 'react-world-flags';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaDiscord,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa';

const socialIcons = [
  { id: 'tiktok', icon: <FaTiktok />, alt: 'TikTok' },
  { id: 'youtube', icon: <FaYoutube />, alt: 'YouTube' },
  { id: 'instagram', icon: <FaInstagram />, alt: 'Instagram' },
  { id: 'facebook', icon: <FaFacebookF />, alt: 'Facebook' },
  { id: 'twitter', icon: <FaTwitter />, alt: 'Twitter' },
  { id: 'linkedin', icon: <FaLinkedinIn />, alt: 'LinkedIn' },
  { id: 'discord', icon: <FaDiscord />, alt: 'Discord' },
];

// Updated the type definition to match the one used in Navbar
export type DropdownMenuType = "buy" | "tools" | "more" | "user" | null;

type MenuBarProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  country: string;
  activeDropdown: DropdownMenuType;
  toggleDropdown: (menu: DropdownMenuType) => void;
};

const MenuBar: React.FC<MenuBarProps> = ({
  setIsOpen,
  country,
  activeDropdown,
  toggleDropdown,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900 z-50">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-6">
          <nav className="flex flex-col space-y-4 relative">
            {/* Dropdown Item: Buy Crypto */}
            <div className="text-white py-2 border-b border-gray-800">
              <button
                className="w-full flex justify-between items-center"
                onClick={() => toggleDropdown('buy')}
              >
                <span className="font-medium">Buy Crypto</span>
                <ChevronDown size={18} />
              </button>
              {activeDropdown === 'buy' && (
                <div className="mt-2 ml-4 text-sm text-gray-300 space-y-3">
                  <Link href="/buy/credit-card" className="block py-2 hover:text-white">
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-xs text-gray-400">Buy crypto via Visa or Mastercard</p>
                  </Link>
                  <Link href="/buy/deposit" className="block py-2 hover:text-white">
                    <p className="font-medium">Bank Deposit</p>
                    <p className="text-xs text-gray-400">Fiat to crypto and crypto to fiat bank transfer</p>
                  </Link>
                  <Link href="/buy/p2p" className="block py-2 hover:text-white">
                    <p className="font-medium">P2P Trading</p>
                    <p className="text-xs text-gray-400">Buy crypto from verified merchants</p>
                  </Link>
                  <Link href="/buy/quick" className="block py-2 hover:text-white">
                    <p className="font-medium">Quick Buy</p>
                    <p className="text-xs text-gray-400">Buy with card, e-wallet and third-party</p>
                  </Link>
                </div>
              )}
            </div>

            <div className="text-white py-2 border-b border-gray-800">
              <Link href="/market" className="block font-medium">Market</Link>
            </div>

            <div className="text-white py-2 border-b border-gray-800">
              <Link href="/trade" className="block font-medium">Trade</Link>
            </div>

            {/* Dropdown Item: Tools */}
            <div className="text-white py-2 border-b border-gray-800">
              <button
                className="w-full flex justify-between items-center"
                onClick={() => toggleDropdown('tools')}
              >
                <span className="font-medium">Tools</span>
                <ChevronDown size={18} />
              </button>
              {activeDropdown === 'tools' && (
                <div className="mt-2 ml-4 text-sm text-gray-300 space-y-3">
                  <div className="block py-2 hover:text-white">
                    <p className="font-medium">🔥 Copy Trading</p>
                    <p className="text-xs text-gray-400">Follow top trading experts</p>
                    
                    <div className="mt-3 space-y-2">
                      {[1, 2, 3].map((_, idx) => (
                        <div key={idx} className="flex items-center justify-between py-1">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-orange-500"></div>
                            <p className="text-sm">Mr_porFit</p>
                          </div>
                          <p className="text-green-400 text-sm">+129.7%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link href="/tools/leaderboard" className="block py-2 hover:text-white">
                    <p className="font-medium">📊 Leaderboard</p>
                    <p className="text-xs text-gray-400">Fiat to crypto and crypto to fiat block trades</p>
                  </Link>
                </div>
              )}
            </div>

            {/* Dropdown Item: More */}
            <div className="text-white py-2 border-b border-gray-800">
              <button
                className="w-full flex justify-between items-center"
                onClick={() => toggleDropdown('more')}
              >
                <span className="font-medium">More</span>
                <ChevronDown size={18} />
              </button>
              {activeDropdown === 'more' && (
                <div className="mt-2 ml-4 text-sm text-gray-300 space-y-1">
                  <Link href="/about" className="block py-2 hover:text-white">
                    About Us
                  </Link>
                  <Link href="/support" className="block py-2 hover:text-white">
                    Support
                  </Link>
                  <Link href="/blog" className="block py-2 hover:text-white">
                    Blog
                  </Link>
                </div>
              )}
            </div>

            {/* User dropdown in mobile view */}
            <div className="text-white py-2 border-b border-gray-800">
              <button
                className="w-full flex justify-between items-center"
                onClick={() => toggleDropdown('user')}
              >
                <span className="font-medium">Account</span>
                <ChevronDown size={18} />
              </button>
              {activeDropdown === 'user' && (
                <div className="mt-2 ml-4 text-sm text-gray-300 space-y-1">
                  <Link href="/profile" className="block py-2 hover:text-white">
                    My Profile
                  </Link>
                  <Link href="/security" className="block py-2 hover:text-white">
                    Security
                  </Link>
                  <Link href="/settings" className="block py-2 hover:text-white">
                    Settings
                  </Link>
                  <button className="block py-2 text-red-400 hover:text-red-300">
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center text-white py-2 border-b border-gray-800">
              <Bell size={18} className="mr-3" />
              <span className="font-medium">Notifications</span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center text-white py-2 border-b border-gray-800">
              <Flag
                code={country?.toUpperCase()}
                style={{ width: 24, height: 16 }}
                className="mr-3"
              />
              <span className="font-medium">English</span>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center text-white py-2 border-b border-gray-800">
              <DollarSign size={18} className="mr-3" />
              <span className="font-medium">USD</span>
            </div>
          </nav>

          {/* Social Icons */}
          <div className="flex justify-center space-x-6 py-6">
            {socialIcons.map((icon) => (
              <a
                key={icon.id}
                href={`#${icon.id}`}
                className="text-gray-400 hover:text-white"
                aria-label={icon.alt}
              >
                <span>{icon.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 mt-auto">
          <div className="flex flex-col space-y-3">
            <a href="/privacy" className="text-white text-sm">
              Privacy
            </a>
            <a href="/terms" className="text-white text-sm">
              Terms
            </a>
            <a href="/risk" className="text-white text-sm">
              Risk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;