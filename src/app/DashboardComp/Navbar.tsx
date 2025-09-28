// components/Navbar.tsx
'use client';

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, ChevronDown, CreditCard } from "lucide-react";
import { FaTimes } from "react-icons/fa";
import Flag from "react-world-flags";
import { toast } from "react-toastify";
import MenuBar, { DropdownMenuType } from "./MenuBar";
import Overview from "./Overview";
import { API_ENDPOINTS } from "../config/api";
import { useNotifications } from "@/app/context/NotificationContext";
import NotificationModal from "../modals/NotificationModal"; 

interface UserData {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
  verificationStatus: string;
}

const countryOptions = [
  { code: "gb", name: "English" },
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownMenuType | null>(null);
  const [country, setCountry] = useState("gb");
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Consume notification state from context
  const { settings, markNotificationsAsRead } = useNotifications();

  const checkAuthenticationAndRedirect = (): boolean => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.warning('Please log in to access this page.');
      router.push('/login');
      return false;
    }
    return true;
  };

  const fetchUserData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('authToken'); 
      
      if (!token) {
        setIsAuthenticated(false);
        setUserData(null);
        // Don't redirect here as this might be a public page
        return;
      }

      const response = await fetch(API_ENDPOINTS.USER.USER_PROFILE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (response.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setUserData(null);
        toast.error('Your session has expired. Please log in again.');
        router.push('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Navbar - Authentication error:', error);
      setIsAuthenticated(false);
      setUserData(null);
      
      if (error instanceof Error) {
        if (error.message === 'Session expired') {
          localStorage.removeItem('authToken');
          toast.error('Your session has expired. Please log in again.');
          router.push('/login');
        } else if (error.message !== 'No authentication token found in localStorage') {
          toast.error('Failed to load user data.');
        }
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleSignOut = (): void => {
    localStorage.removeItem('authToken'); 
    document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; 
    setUserData(null);
    setIsAuthenticated(false);
    router.push('/login');
    toast.success('Logged out successfully');
  };

  // Protected navigation handler
  const handleProtectedNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (checkAuthenticationAndRedirect()) {
      router.push(path);
    }
  };

  // Fetch user data once when the component mounts
  useEffect(() => {
    const initializeAuth = async () => {
      await fetchUserData();
    };
    
    initializeAuth();
  }, [fetchUserData]); 

  const toggleModal = () => setShowModal(!showModal);

  const toggleDropdown = (menu: DropdownMenuType) => {
  const protectedMenus: DropdownMenuType[] = ['buy', 'assest', 'tools', 'user'];
  if (protectedMenus.includes(menu) && !userData) {
    router.push('/login');
    toast.info('Please login to access this feature');
    return;
  }
  
  setActiveDropdown((prev) => (prev === menu ? null : menu));
};

  return (
    <header className="bg-gray-900 border-b border-gray-800 py-3 px-6 flex items-center w-full fixed top-0 z-50">
      {/* Logo - Left aligned */}
      <div className="flex-none">
        <Link
          href="/landingpage"
          className="text-white font-bold text-xl flex items-center"
        >
          <Image
            src="/img/logo1.png"
            alt="logo"
            width={100}
            height={100}
            className="mr-2"
          />
        </Link>
      </div>

      {/* Nav Links - Center aligned */}
      <nav className="hidden md:flex flex-1 items-center justify-center">
        <div className="flex items-center space-x-8">
          {/* Buy Crypto Dropdown */}
          <div className="relative">
            <button
              className="text-white font-medium flex items-center"
              onClick={() => toggleDropdown("buy")}
            >
              Buy Crypto
              <ChevronDown size={16} className="ml-1" />
            </button>

            {activeDropdown === "buy" && isAuthenticated && (
              <div className="absolute top-full left-0 mt-3 w-96 bg-[#0D1B2A] text-white rounded-2xl shadow-2xl z-50 p-6 space-y-5">
                <div className="flex item-end justify-end gap-2 text-sm text-gray-300 font-medium">
                  <span>Pay with</span>
                  <span className="flex items-center space-x-1">
                    <Image
                      src="/img/solar_dollar-bold.png"
                      alt="pay"
                      width={17}
                      height={17}
                      className="mr-1"
                    />{" "}
                    <span>USD</span>
                  </span>
                </div>

                <div className="space-y-4 text-sm">
                  <Link href="/buy/p2p" className="block" onClick={handleProtectedNavigation('/buy/p2p')}>
                    <div>
                      <p className="font-semibold flex items-center gap-2 hover:text-blue-400 transition">
                        <Image
                          src="/img/ri_p2p-fill.png"
                          alt="tit"
                          width={17}
                          height={17}
                          className="mr-1"
                        />{" "}
                        P2P Trading
                      </p>
                    </div>
                    <p className="text-gray-400 text-xs ml-6">
                      Buy crypto from verified merchants
                    </p>
                  </Link>

                  <Link href="/Apexion" className="block" onClick={handleProtectedNavigation('/Apexion')}>
                    <div>
                      <p className="font-semibold flex items-center gap-2 hover:text-blue-400 transition">
                       <CreditCard size={14}/> {" "}
                        Bidvest Card
                      </p>
                    </div>
                    <p className="text-gray-400 text-xs ml-6">
                      Spend globally with your card.
                    </p>
                  </Link>

                  <Link href="/buy/coin" className="block" onClick={handleProtectedNavigation('/buy/coin')}>
                    <div>
                      <p className="font-semibold flex items-center gap-2 hover:text-blue-400 transition">
                        <Image
                          src="/img/solar_add-circle-bold-duotone.png"
                          alt="tit"
                          width={17}
                          height={17}
                          className="mr-1"
                        />{" "}
                        Quick Buy
                      </p>
                    </div>
                    <p className="text-gray-400 text-xs ml-6">
                      Buy with card, e-wallet and third-party
                    </p>
                  </Link>

                  <Link href="/buy/credit-card" className="block" onClick={handleProtectedNavigation('/buy/credit-card')}>
                    <div className="flex flex-col">
                      <p className="font-semibold flex items-center gap-2 hover:text-blue-400 transition">
                        <Image
                          src="/img/uim_master-card.png"
                          alt="tit"
                          width={17}
                          height={17}
                          className="mr-1"
                        />{" "}
                        Credit/Debit Card
                      </p>
                    </div>
                    <p className="text-gray-400 text-xs ml-6">
                      Buy crypto via Visa or Mastercard
                    </p>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Market Link */}
          <Link 
            href="/market" 
            className="text-gray-300 hover:text-white"
            onClick={handleProtectedNavigation('/market')}
          >
            Market
          </Link>

          {/* Assets Dropdown */}
          <div className="relative">
            <button
              className="text-gray-300 hover:text-white flex items-center"
              onClick={() => toggleDropdown("assest")}
            >
              Assets
              <ChevronDown size={16} className="ml-1" />
            </button>
            {activeDropdown === "assest" && isAuthenticated && <Overview/>}
          </div>

          {/* Trade Link */}
          <Link 
            href="/trade" 
            className="text-gray-300 hover:text-white"
            onClick={handleProtectedNavigation('/trade')}
          >
            Trade
          </Link>

          {/* Tools Dropdown */}
          <div className="relative">
            <button
              className="text-gray-300 hover:text-white flex items-center"
              onClick={() => toggleDropdown("tools")}
            >
              Tools
              <ChevronDown size={16} className="ml-1" />
            </button>
            {activeDropdown === "tools" && isAuthenticated && (
              <div className="absolute top-full left-0 mt-3 w-[500px] bg-[#0D1B2A] text-white rounded-xl shadow-xl z-50 p-4 flex gap-4">
                <div className="w-1/2 space-y-4">
                  <div className="p-4 rounded-lg transition cursor-pointer ">
                    <Link href='/copy' className="font-semibold flex items-center gap-2" onClick={handleProtectedNavigation('/copy')}>
                      🔥 Copy Trading
                    </Link>
                    <p className="text-gray-400 text-xs">
                      Follow top trading experts
                    </p>
                  </div>

                  <Link
                    href="/tools/leaderboard"
                    className="block p-4 rounded-lg transition"
                    onClick={handleProtectedNavigation('/tools/leaderboard')}
                  >
                    <p className="font-semibold flex items-center gap-2">
                      📊 Leaderboard
                    </p>
                    <p className="text-gray-400 text-xs">
                      Fiat to crypto and crypto to fiat block trades
                    </p>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* More Dropdown */}
          <div className="relative">
            <button
              className="text-gray-300 hover:text-white flex items-center"
              onClick={() => toggleDropdown("more")}
            >
              More
              <ChevronDown size={16} className="ml-1" />
            </button>
            {activeDropdown === "more" && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                <div className="py-1">
                  <Link
                    href="/about-us"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    Support
                  </Link>
                  <Link
                    href="/blog"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    Blog
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile User Controls */}
      <div className="md:hidden flex-1 flex items-center justify-end space-x-4">
        <button 
          className="text-gray-300 hover:text-white"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <Search size={20} />
        </button>

        {isAuthenticated && (
          <div className="relative">
            <button
              className="flex items-center"
              onClick={() => toggleDropdown("user")}
            >
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden">
                <Image
                  src={userData?.avatar || "/img/Avatar DP.png"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            {activeDropdown === "user" && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                <div className="py-1">
                  <Link
                    href="security/verfication"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    onClick={handleProtectedNavigation('security/verfication')}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/security"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    onClick={handleProtectedNavigation('/security')}
                  >
                    Security
                  </Link>
                  <Link
                    href="security/settings"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    onClick={handleProtectedNavigation('security/settings')}
                  >
                    Settings
                  </Link>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <button
          className="text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <Image
              src="/img/bx_menu-alt-right.png"
              alt="Menu Toggle"
              width={30}
              height={30}
              className="h-6 w-6"
            />
          )}
        </button>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="fixed top-16 left-0 right-0 bg-gray-900 p-4 z-30 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 rounded-lg py-2 pl-9 pr-3 text-sm w-full text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowMobileSearch(false)}
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center space-x-4 flex-none">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 rounded-lg py-1 pl-9 pr-3 text-sm w-32 lg:w-48 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Language Selector */}
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleModal}
          >
            <Flag
              code={country.toUpperCase()} // This is line 149
              style={{ width: 34, height: 18 }}
            />
            <ChevronDown size={16} className="ml-1 text-gray-400" />
          </div>
        </div>

        {/* Notifications - Only show if authenticated */}
        {isAuthenticated && (
          <div className="relative">
            <button 
              className="relative p-1 rounded-full hover:bg-gray-800"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications && settings.hasUnreadNotifications) {
                  markNotificationsAsRead();
                }
              }}
            >
              <Bell size={20} className="text-gray-300" />
              {settings.showBadge && settings.hasUnreadNotifications && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </button>
            
            {showNotifications && (
              <NotificationModal onClose={() => setShowNotifications(false)} />
            )}
          </div>
        )}

        {/* User Profile */}
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
            <div className="hidden md:block text-left">
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-3 w-16 bg-gray-700 rounded animate-pulse mt-1"></div>
            </div>
          </div>
        ) : isAuthenticated && userData ? (
          <div className="relative">
            <button
              className="flex items-center space-x-2"
              onClick={() => toggleDropdown("user")}
            >
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden">
                <Image
                  src={userData.avatar || "/img/Avatar DP.png"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">
                  {userData.fullName || "User"}
                </p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {activeDropdown === "user" && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                <div className="py-1">
                  <Link
                    href="security/verfication"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    onClick={handleProtectedNavigation('security/verfication')}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/security"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    onClick={handleProtectedNavigation('/security')}
                  >
                    Security
                  </Link>
                  <Link
                    href="security/settings"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    onClick={handleProtectedNavigation('security/settings')}
                  >
                    Settings
                  </Link>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm text-gray-300 hover:text-white"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Language Modal */}
      {showModal && (
        <div className="absolute top-14 right-0 bg-white rounded-md shadow-lg p-4 w-80 z-20">
          <div className="flex justify-between items-center pb-2 mb-2">
            <h3 className="text-lg font-semibold text-black">
              Choose Your Language
            </h3>
            <button onClick={toggleModal} className="text-gray-600">
              ✖
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {countryOptions.map(({ code, name }) => (
              <button
                key={code}
                className={`text-left px-2 py-1 ${
                  country === code
                    ? "text-orange-500 font-bold"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  setCountry(code);
                  setShowModal(false);
                }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <MenuBar
            setIsOpen={setIsOpen}
            country={country}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;