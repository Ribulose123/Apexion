'use client';

import React, { useState } from 'react'; // Import useEffect
import { useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useRouter, useSearchParams } from 'next/navigation'; // Import useSearchParams
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../config/api';

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
  const [showPassword, setShowPassword] = useState({
    email: false,
    subAccount: false,
  });

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<LoginFormData>();

  // Get the redirect URL from the query parameters
  const redirectUrl = searchParams.get('redirect');

  const onSubmit = async (data: LoginFormData) => {
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
        // Check unverfired email
        if (response.status === 400) {
          const email = getValues('email');
          router.push(`/emailverfi?email=${encodeURIComponent(email || '')}`);
          return; 
        }

        // Check for Incorrect Password
        if (response.status === 401) {
          throw new Error('Incorrect Password');
        }
        throw new Error(result.message || 'Login failed');
      }

      // Token Storage: localStorage AND document.cookie
      if (result.data?.token) {
        localStorage.setItem('authToken', result.data.token);
        document.cookie = `authToken=${result.data.token}; path=/; secure; SameSite=Lax`;

        toast.success('Login successful!');

        // --- Redirect to the stored URL or a default dashboard ---
        const destination = redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard';
        router.push(destination);
       

      } else {
        console.warn('Login successful but no token received');
        toast.error('Login successful but session could not be established');
      }
    } catch (error) {
      console.error('Login Error:', error);
      if (error instanceof Error && error.message === 'Incorrect Password') {
        toast.error('Incorrect Password');
      } else {
        toast.error(error instanceof Error ? error.message : 'Login failed');
      }
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-6">
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
          <button type="submit" className="w-full py-3 bg-[#439A86] text-white rounded-2xl hover:bg-teal-600 transition">
            {activeTab === 'QR Account' ? 'Scan QR Code' : 'Log in'}
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
          <div className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 flex sm:items-center gap-2 sm:gap-4 justify-between w-[70%]">
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
    </div>
  );
};

export default LoginForm;