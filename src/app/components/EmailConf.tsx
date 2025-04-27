'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type FormValues = {
    email: string;
    code: string;
  };

const EmailConf = () => {
    const router = useRouter();
  const [countdown, setCountdown] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const handleSendCode = () => {
    const currentEmail = watch('email');
    if (!currentEmail) return;
    
    console.log('Sending code to:', currentEmail);
    
    setCountdown(60);
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    // Implement your form submission logic here
  };

  return (
    <div className="min-h-screen text-white px-4 py-6">
    <div className="flex items-center mb-4">
      <button onClick={() => router.back()} className="text-white mr-2">
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-2xl font-bold">Email Authentication</h1>
    </div>
    
    <p className="text-xs text-gray-400 mb-6">
      Email Authentication Enhances Your Account Security By Sending A Unique, Time-Sensitive Verification Code To Your Registered Email Address. This Code Is Required To Complete Withdrawing Funds Or Modifying Security Settings—Keeping Your Account Safe And Under Your Control.
    </p>
    
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-md">
        <div>
          <label className="text-sm mb-1 block">Enter email address</label>
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full bg-[#0d1117] border border-[#1e2836] rounded px-3 py-2 text-white text-sm"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label className="text-sm mb-1 block">Enter verification code</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your email verification code"
              className="w-full bg-[#0d1117] border border-[#1e2836] rounded px-3 py-2 pr-16 text-white text-sm"
              {...register('code', { required: 'Verification code is required' })}
            />
            <button
              type="button"
              onClick={handleSendCode}
              disabled={countdown > 0 || !watch('email')}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[#439A86] text-sm hover:underline disabled:text-gray-500"
            >
              {countdown > 0 ? `${countdown}s` : 'Send'}
            </button>
          </div>
          {errors.code && (
            <p className="text-red-400 text-xs mt-1">{errors.code.message}</p>
          )}
        </div>
        
        <div 
          className="text-xs text-[#439A86] hover:underline cursor-pointer"
          onClick={countdown === 0 ? handleSendCode : undefined}
        >
          <p>{countdown > 0 ? `Resend in ${countdown}s` : "Didn't receive the verification code?"}</p>
        </div>
        
        <div className="text-xs text-gray-400">
          <p>If you can&#39;t find the Biget verification code in your email, please check your spam folder.</p>
        </div>
        
        <button
          type="submit"
          className="w-full bg-[#439A86] text-white py-2 rounded font-medium"
        >
          Submit
        </button>
      </form>
  </div>
  )
}

export default EmailConf
