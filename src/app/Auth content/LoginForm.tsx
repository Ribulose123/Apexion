'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../config/api';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
  </div>
);

interface LoginFormData {
  email?: string;
  password?: string;
  subAccountId?: string;
  rememberMe?: boolean;
}

const categories = ['Email/Mobile', 'Sub-Account', 'QR Account'];

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('Email/Mobile');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState({
    email: false,
    subAccount: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<LoginFormData>();

  // Get the redirect URL from the query parameters
  const redirectUrl = searchParams.get('redirect');

  
  useEffect(() => {
    // Only run this on the client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      // If a token exists, redirect to dashboard or the intended URL
      if (token) {
        const destination = redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard';
        router.replace(destination);
      }
    }
  }, [router, redirectUrl]);


  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      console.log("Attempting login with data:", data);

      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
        credentials: 'include',
      });

      console.log("Login response status:", response.status);
      console.log("Login response OK status:", response.ok);
      const result = await response.json();
      console.log("Login response JSON result:", result);

      if (!response.ok) {
        // --- MODIFIED LOGIC: Specific error messages ---
        if (response.status === 400 && result.message === 'Email not verified') {
          // Explicitly check for unverified email message from backend
          const email = getValues('email');
          router.push(`/emailverfi?email=${encodeURIComponent(email || '')}`);
          return;
        } else if (response.status === 401 && result.message === 'Incorrect Password') {
          // Explicitly check for incorrect password message from backend
          // We already have 'Incorrect Password' as a thrown error below, so this could be simplified
          throw new Error('Incorrect Password');
        } else {
          // Fallback for other errors, including a generic 401 if not 'Incorrect Password'
          throw new Error(result.message || 'Login failed');
        }
        // --- END MODIFIED LOGIC ---
      }

      // Token Storage: localStorage AND document.cookie
      if (result.data?.token) {
        localStorage.setItem('authToken', result.data.token);
        document.cookie = `authToken=${result.data.token}; path=/; secure; SameSite=Lax`;

        toast.success('Login successful!');

        const destination = redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard';
        router.push(destination);
      } else {
        router.push(`/emailverfi?email=${encodeURIComponent(data.email || '')}`);
        console.warn('Login successful but no token received, redirecting to email verification.');
        toast.error('Login successful but session could not be established, please verify your email.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      if (error instanceof Error && error.message === 'Incorrect Password') {
        toast.error('Incorrect Password');
      } else {
        // This will catch the generic 'Login failed' or other specific errors thrown
        toast.error(error instanceof Error ? error.message : 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex items-center justify-center px-4 py-6 relative">
      <div className="bg-white rounded-lg -mt-10 sm:mt-0 sm:shadow-md w-full max-w-md p-6 md:p-8">
        <h1 className="text-2xl text-black font-semibold text-start sm:text-center mb-8">Welcome back</h1>

        {/* Tabs */}
        <div className="relative flex border-b border-gray-300">
          {categories.map((category) => (
            <button
              key={category}
              className={`flex-1 text-center py-1 font-semibold transition-colors text-[17px] ${
                activeTab === category ? 'text-[#01040F]' : 'text-[#797A80]'
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
          {/* Underline Indicator */}
          <div
            className="absolute bottom-0 h-0.5 bg-[#439A86] transition-all duration-300"
            style={{
              width: `${100 / categories.length}%`,
              left: `${categories.indexOf(activeTab) * (100 / categories.length)}%`
            }}
          />
        </div>

        {/* Forms */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          {/* Email/Mobile Form */}
          {activeTab === 'Email/Mobile' && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Email or Mobile"
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none placeholder-black text-black`}
                  {...register('email', { required: 'Email or Mobile is required' })}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div className="mb-4 relative">
                <input
                  type={showPassword.email ? 'text' : 'password'}
                  placeholder="Password"
                  className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none placeholder-black text-black`}
                  {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' } })}
                />
                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword({ ...showPassword, email: !showPassword.email })}>
                  {showPassword.email ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
                </button>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
              </div>
            </>
          )}

          {/* Sub-Account Form */}
          {activeTab === 'Sub-Account' && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Sub-Account ID"
                  className={`w-full px-4 py-2 border ${errors.subAccountId ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none placeholder-gray-500`}
                  {...register('subAccountId', { required: 'Sub-Account ID is required' })}
                />
                {errors.subAccountId && <p className="mt-1 text-xs text-red-500">{errors.subAccountId.message}</p>}
              </div>

              <div className="mb-4 relative">
                <input
                  type={showPassword.subAccount ? 'text' : 'password'}
                  placeholder="Password"
                  className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none placeholder-gray-500`}
                  {...register('password', { required: 'Password is required' })}
                />
                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword({ ...showPassword, subAccount: !showPassword.subAccount })}>
                  {showPassword.subAccount ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
                </button>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
              </div>
            </>
          )}

          {/* QR Account Form */}
          {activeTab === 'QR Account' && (
            <div className="flex flex-col items-center justify-center mt-4">
              <p className="text-sm text-gray-600">Scan your QR code to log in</p>
              <div className="w-32 h-32 bg-gray-200 rounded-lg mt-4 flex items-center justify-center">
                📷 QR Scanner
              </div>
            </div>
          )}

          {/* Forgot Password / Signup Links */}
          <div className="mt-6 mb-3 text-end text-sm text-gray-600">
            <Link href="/forgot-password" className="text-[#439A86] hover:underline">Forgot password?</Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 bg-[#439A86] text-white cursor-pointer rounded-2xl hover:bg-teal-600 transition flex items-center justify-center ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span className="ml-2">Logging in...</span>
              </>
            ) : (
              activeTab === 'QR Account' ? 'Scan QR Code' : 'Log in'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center mb-6 mt-6">
          <div className="flex-1 border-t-2 border-[#E2E6F9]"></div>
          <span className="px-4 text-sm text-[#01040F]">or login</span>
          <div className="flex-1 border-t-2 border-[#E2E6F9]"></div>
        </div>

        {/* Social Sign-up Options */}
        <div className="flex gap-3 mb-6 w-full flex-col sm:flex-row items-center justify-center">
          {/* Social Buttons */}
          <div className="flex gap-3 items-center justify-center ">
            <button type="button" className="flex justify-center items-center border border-gray-200 rounded-full w-10 h-10 hover:bg-gray-50">
              <Image src="/img/facebook.png" alt="facebook" width={16} height={16} />
            </button>

            <button type="button" className="flex justify-center items-center border border-gray-200 rounded-full w-10 h-10 hover:bg-gray-50">
              <Image src="/img/apple.png" alt="apple" width={16} height={16} />
            </button>

            <button type="button" className="flex justify-center items-center border border-gray-200 rounded-full w-10 h-10 hover:bg-gray-50">
              <Image src="/img/search.png" alt="Google" width={16} height={16} />
            </button>
          </div>

          {/* Wallet Connect */}
          <div className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 flex sm:items-center gap-2 sm:gap-4 justify-between w-[70%]" onClick={toggleModal}>
            <span className="text-xs text-gray-500">Connect wallet</span>
            <div className="flex space-x-1">
              <button type="button">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image src='/img/meta.webp' alt='meta' width={15} height={10} />
                </div>
              </button>
              <button type="button">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image src='/img/tonkeeper.png' alt='tonkeeper' width={15} height={10} />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-2 text-center text-sm text-gray-600">
          Don’t have an account? <Link href="/register" className="text-[#439A86] hover:underline">Register</Link>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl w-full max-w-md mx-4 p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-center flex-1">
                <div className="text-lg font-semibold text-gray-900 mb-1">LOGO</div>
                <h2 className="text-xl font-semibold text-gray-900">Connect Wallet</h2>
                <p className="text-sm text-gray-500 mt-1">Choose a wallet to connect</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 hover:bg-opacity-70 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Wallet Options */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  console.log('Connecting to MetaMask...');
                  // Add your MetaMask connection logic here
                }}
                className="w-full flex items-center justify-between p-4 bg-white bg-opacity-80 hover:bg-opacity-90 rounded-xl transition-all border border-gray-200 border-opacity-50 shadow-sm"
              >
                <div className="flex items-center">
                  <Image src='/img/meta.webp' alt='MetaMask' width={24} height={24} className="mr-3" />
                  <span className="font-medium text-gray-800">Metamask Wallet</span>
                </div>
                <span className="text-orange-500 text-sm font-medium">Popular</span>
              </button>

              <button
                onClick={() => {
                  console.log('Connecting to TONkeeper...');
                  // Add your TONkeeper connection logic here
                }}
                className="w-full flex items-center p-4 bg-white bg-opacity-80 hover:bg-opacity-90 rounded-xl transition-all border border-gray-200 border-opacity-50 shadow-sm"
              >
                <Image src='/img/tonkeeper.png' alt='TONkeeper' width={24} height={24} className="mr-3" />
                <span className="font-medium text-gray-800">TONkeeper Wallet</span>
              </button>

              <button
                onClick={() => {
                  console.log('Connecting to MetaMask...');
                  // Add your MetaMask connection logic here
                }}
                className="w-full flex items-center p-4 bg-white bg-opacity-80 hover:bg-opacity-90 rounded-xl transition-all border border-gray-200 border-opacity-50 shadow-sm"
              >
                <Image src='/img/meta.webp' alt='MetaMask' width={24} height={24} className="mr-3" />
                <span className="font-medium text-gray-800">Metamask Wallet</span>
              </button>

              <button
                onClick={() => {
                  console.log('Connecting to TONkeeper...');
                  // Add your TONkeeper connection logic here
                }}
                className="w-full flex items-center p-4 bg-white bg-opacity-80 hover:bg-opacity-90 rounded-xl transition-all border border-gray-200 border-opacity-50 shadow-sm"
              >
                <Image src='/img/tonkeeper.png' alt='TONkeeper' width={24} height={24} className="mr-3" />
                <span className="font-medium text-gray-800">TONkeeper Wallet</span>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>New to wallets? <span className="text-[#439A86] hover:underline cursor-pointer">Learn more</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;