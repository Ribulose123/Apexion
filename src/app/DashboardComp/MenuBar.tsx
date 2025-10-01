'use client';

import React from 'react';
import Link from 'next/link';
import {  ChevronDown, DollarSign, X } from 'lucide-react';
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

export type DropdownMenuType = "buy" | "tools" | "more" | "user" | "assest" | null;

type MenuBarProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  country: string;
  activeDropdown: DropdownMenuType;
  toggleDropdown: (menu: DropdownMenuType) => void;
};

const sidebarMenuItems = [
  { name: 'Dashboard',  href: '/dashboard' },
      { name: 'Asset',  href: '/asset' },
      { name: 'Deposit',  href: 'deposit' },
      { name: 'Withdraw',  href: '/withdrawal' },
      { name: 'Subscribe',  href: '/subscription' },
      { name: 'Signal',  href: '/signal' },
      { name: 'Staking',  href: '/stake' },
      { name: 'Referrals',  href: 'referral' },
      { name: 'connect Wallet',  href: '#' },
      { name: 'Copy',  href: '/copy' },
      { name: 'Settings',  href: '/security' },
];

const MenuBar: React.FC<MenuBarProps> = ({
  setIsOpen,
  country,
  activeDropdown,
  toggleDropdown,
}) => {
  // Handler to close the menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

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
          <nav className="flex flex-col space-y-4 relative overflow-auto max-h-[70vh]">

            {/*sidebar menu items */}
            {sidebarMenuItems.map((item)=>(
              <div key={item.name } className='text-white py-2 border-b border-gray-800'>
                <Link href={item.href} onClick={handleLinkClick}>
                <span>{item.name}</span>
                </Link>
              </div>
            ))}
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
                  <Link href="/buy/credit-card" onClick={handleLinkClick} className="block py-2 hover:text-white">
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-xs text-gray-400">Buy crypto via Visa or Mastercard</p>
                  </Link>
                  <Link href="Apexion" onClick={handleLinkClick} className="block py-2 hover:text-white">
                    <p className="font-medium">Bidvest Card</p>
                    <p className="text-xs text-gray-400">Spend globally with your card.</p>
                  </Link>
                  <Link href="/buy/p2p" onClick={handleLinkClick} className="block py-2 hover:text-white">
                    <p className="font-medium">P2P Trading</p>
                    <p className="text-xs text-gray-400">Buy crypto from verified merchants</p>
                  </Link>
                  <Link href="/buy/quick" onClick={handleLinkClick} className="block py-2 hover:text-white">
                    <p className="font-medium">Quick Buy</p>
                    <p className="text-xs text-gray-400">Buy with card, e-wallet and third-party</p>
                  </Link>
                </div>
              )}
            </div>

            <div className="text-white py-2 border-b border-gray-800">
              <Link href="/market" onClick={handleLinkClick} className="block font-medium">Market</Link>
            </div>

            <div className="text-white py-2 border-b border-gray-800">
              <Link href="/trade" onClick={handleLinkClick} className="block font-medium">Trade</Link>
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
                  
                  <Link href="/tools/leaderboard" onClick={handleLinkClick} className="block py-2 hover:text-white">
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
                  <Link href="/about" onClick={handleLinkClick} className="block py-2 hover:text-white">
                    About Us
                  </Link>
                  <Link href="/support" onClick={handleLinkClick} className="block py-2 hover:text-white">
                    Support
                  </Link>
                  <Link href="/blog" onClick={handleLinkClick} className="block py-2 hover:text-white">
                    Blog
                  </Link>
                </div>
              )}
            </div>

            {/* User dropdown in mobile view */}
           {/*  <div className="text-white py-2 border-b border-gray-800">
              <button
                className="w-full flex justify-between items-center"
                onClick={() => toggleDropdown('user')}
              >
                <span className="font-medium">Account</span>
                <ChevronDown size={18} />
              </button>
              {activeDropdown === 'user' && (
                <div className="mt-2 ml-4 text-sm text-gray-300 space-y-1">
                  <Link href="/profile" onClick={handleLinkClick} className="block py-2 hover:text-white">
                    My Profile
                  </Link>
                  <Link href="/security" onClick={handleLinkClick} className="block py-2 hover:text-white">
                    Security
                  </Link>
                  <Link href="/settings" onClick={handleLinkClick} className="block py-2 hover:text-white">
                    Settings
                  </Link>
                </div>
              )}
            </div> */}

            <div className="flex items-center text-white py-2 border-b border-gray-800">
             {/*  <button onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications && settings.hasUnreadNotifications) {
                  markNotificationsAsRead();
                }
              }}></button>
              <Bell size={18} className="mr-3" />
               {settings.showBadge && settings.hasUnreadNotifications && (
                <span className="-ml-3 block h-2 w-2 rounded-full bg-red-500"></span>
              )}
               {showNotifications && (
              <NotificationModal onClose={() => setShowNotifications(false)} />
            )} */}
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
        </div>

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

        {/* Footer */}
        <div className="px-6 py-4 mt-auto">
          <div className="flex flex-col space-y-3">
            <Link href="/privacy" onClick={handleLinkClick} className="text-white text-sm">
              Privacy
            </Link>
            <Link href="/terms" onClick={handleLinkClick} className="text-white text-sm">
              Terms
            </Link>
            <Link href="/risk" onClick={handleLinkClick} className="text-white text-sm">
              Risk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
