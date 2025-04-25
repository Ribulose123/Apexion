'use client';
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SmsAuth = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleSendCode = () => {
    // send SMS logic here
    console.log('Sending code to:', phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle code verification
    console.log('Verifying code:', code);
  };

  return (
    <div className="min-h-screen  text-white px-6 py-8 md:px-16">
      <button onClick={() => router.back()} className="mb-4 text-gray-400 hover:text-white flex items-center">
        <ArrowLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <h1 className="text-2xl font-semibold mb-1">SMS Authentication</h1>
      <p className="text-sm text-gray-400 mb-6 max-w-xl">
        SMS Authentication enhances your account security by sending a unique, time-sensitive verification code to your registered mobile number. This code is required to confirm actions like logging in, withdrawing funds, or modifying security settings—keeping your account safe and under your control.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
        <div>
          <label className="text-sm mb-1 block">Mobile number</label>
          <div className="flex items-center bg-[#151823] rounded px-3 py-2 border border-gray-700 focus-within:ring-2 ring-indigo-500">
            <select
              className="bg-transparent text-white text-sm outline-none mr-2"
              defaultValue="+234"
            >
              <option value="+234">+234</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              {/* Add more countries as needed */}
            </select>
            <input
              type="text"
              placeholder="Mobile number"
              className="bg-transparent flex-1 text-sm outline-none placeholder-gray-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm mb-1 block">Mobile verification code</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter your mobile verification code"
              className="bg-[#151823] px-3 py-2 rounded border border-gray-700 w-full text-sm placeholder-gray-500 outline-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              type="button"
              onClick={handleSendCode}
              className="text-sm bg-indigo-600 text-white px-3 py-2 rounded"
            >
              Send
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 transition text-white py-2 rounded text-sm font-medium"
        >
          Submit
        </button>

        <p className="text-xs text-gray-400 text-center">
          Didn&apos;t receive the verification code?
        </p>
      </form>
    </div>
  );
};

export default SmsAuth;
