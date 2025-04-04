'use client';

import React, { useState } from 'react';
 
import { useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';

interface FormData {
    email: string;
    password: string;
    referralCode?: string;
    agreeToTerms: boolean;
}

interface SignupFormProps {
  onNext: (data: FormData) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onNext }) => {
  
  const [showPassword, setShowPassword] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      referralCode: '',
      agreeToTerms: false
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    onNext(data); 
  };

  return (
    <div className="flex items-center justify-center px-4 py-6 ">
      <div className="bg-white rounded-lg sm:shadow-md w-full max-w-md p-6 md:p-8">
        <h1 className="text-2xl text-black font-semibold text-start sm:text-center mb-8">Sign up with</h1>
        
        {/* Social Sign-up Options */}
        <div className="flex gap-3 mb-6 w-full flex-col sm:flex-row sm:items-center  justify-center">
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
                  <Image src='/img/meta.webp' alt='meta' width={15} height={10}/>
                </div>
              </button>
              <button type="button">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image src='/img/tonkeeper.png' alt='tonkeeper' width={15} height={10}/>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 border-t-2 border-[#E2E6F9]"></div>
          <span className="px-4 text-sm text-[#01040F]">or via</span>
          <div className="flex-1 border-t-2 border-[#E2E6F9]"></div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email/Mobile Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email/Mobile"
              className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-[#E2E6F9]'} rounded focus:outline-none placeholder:text-[#797A80] placeholder:text-[15px]`}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          
          {/* Password Input */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-[#E2E6F9]'} rounded focus:outline-none placeholder:text-[#797A80] placeholder:text-[15px] text-black`}
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoMdEye size={18} /> : <IoMdEyeOff size={18} />}
            </button>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          
          {/* Referral Code */}
          <div className="mb-6">
            <label className="text-sm text-gray-600 flex items-center">
              Referral code 
            </label>
            <input
              type="text"
              placeholder="Enter referral code (Case Sensitive)"
              className="w-full px-4 py-2 border border-[#E2E6F9] rounded focus:outline-none placeholder:text-[#797A80] placeholder:text-[15px]"
              {...register('referralCode')}
            />
          </div>
          
          {/* Terms Agreement */}
          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                className={`mt-1 ${errors.agreeToTerms ? 'border-red-500' : ''}`}
                {...register('agreeToTerms', { required: 'You must agree to the terms' })}
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the <a href="#" className="text-blue-600 hover:underline">User Agreement</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
              </span>
            </label>
            {errors.agreeToTerms && <p className="mt-1 text-xs text-red-500">{errors.agreeToTerms.message}</p>}
          </div>
          
          {/* Create Account Button */}
          <button type="submit" className="w-full py-3 bg-[#439A86] text-white rounded-2xl hover:bg-teal-600 transition-colors">
            Create Account
          </button>
        </form>
        
        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
