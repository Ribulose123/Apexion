'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type FormValues = {
  phone: string;
  code: string;
};

const SmsAuth = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(0);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  



  const handleSendCode = () => {
    const currentPhone = watch('phone'); // get the latest value dynamically
    if (!currentPhone) return;
  
    console.log('Sending code to:', currentPhone);
    setCountdown(60);
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSubmit = (data: FormValues) => {
    console.log('Verifying code:', data.code);
  };

  return (
    <div className="min-h-screen text-white px-6 py-8 md:px-10">
     
    <div className="p-4 flex items-center -ml-3">
             <button onClick={() => router.back()} className=" text-gray-400 hover:text-white   md:block hidden">
                    <ArrowLeft className=" mr-1 " size={30}/>
                  </button>
            <h1 className="text-2xl sm:text-4xl font-semibold text-[#E8E8E8]">SMS Authentication</h1>
          </div>
      <p className="text-sm text-gray-400 mb-6 max-w-xl">
        SMS Authentication enhances your account security by sending a unique,
        time-sensitive verification code to your registered mobile number.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-md">
        {/* Phone input */}
        <div>
          <label className="text-sm mb-1 block">Mobile number</label>
          <div className="flex items-center  rounded px-3 py-2 border border-[#141E32] focus-within:ring-2 ring-indigo-500">
            <select
              className="bg-transparent text-white text-sm outline-none mr-2"
              defaultValue="+234"
            >
              <option value="+234">+234</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              type="text"
              placeholder="Mobile number"
              className="bg-transparent flex-1 text-sm outline-none placeholder-gray-500 "
              {...register('phone', { required: 'Phone number is required' })}
            />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Code input with inline "Send" */}
        <div>
          <label className="text-sm mb-1 block">Verification code</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter verification code"
              className="w-full bg-transparent text-sm text-white placeholder-gray-500 border border-[#141E32] rounded px-3 py-2 pr-20 outline-none"
              {...register('code', { required: 'Code is required' })}
            />
            <button
              type="button"
              onClick={handleSendCode}
              disabled={countdown > 0}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[#439A86] text-sm font-medium hover:underline disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          {errors.code && (
            <p className="text-red-400 text-xs mt-1">{errors.code.message}</p>
          )}
        </div>

        {/* Resend text / countdown */}
        <div className="text-xs text-start text-gray-400">
          {countdown > 0 ? (
            <span>Resend in {countdown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleSendCode}
              className="hover:underline text-gray-300"
            >
              Didn’t receive the verification code?
            </button>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#439A86] transition text-white py-2 rounded text-sm font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SmsAuth;
