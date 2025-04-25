'use client';
import React from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, LockKeyhole, ShieldCheck, Smartphone } from 'lucide-react';

const PasskeyPage = () => {
  const router = useRouter();

  const handleAddPasskey = () => {
    // Handle passkey creation logic here
    console.log('Passkey added!');
  };

  return (
    <div className="min-h-screen bg-[#0e0f1a] text-white px-6 py-8 md:px-16">
      <button
        onClick={() => router.back()}
        className="mb-6 text-gray-400 hover:text-white flex items-center"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        Back
      </button>

      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="mb-4">
          {/* Lock icon (you can replace with an actual lock image or SVG) */}
          <div className="text-4xl bg-gray-800 rounded-full p-4 inline-block">
            <LockKeyhole className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-2">Passkey</h1>

        <ul className="text-sm text-gray-400 space-y-5 mt-6 mb-8 text-left">
          <li className="flex items-start gap-3">
            <ShieldCheck className="text-green-500 w-5 h-5 mt-1" />
            <span>
              <strong className="text-white">No password or verification code required</strong><br />
              Add a passkey to sign in with ease using fingerprints or facial recognition.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <LockKeyhole className="text-green-500 w-5 h-5 mt-1" />
            <span>
              <strong className="text-white">More secure than passwords</strong><br />
              Enhanced security based on your hardware device.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Smartphone className="text-green-500 w-5 h-5 mt-1" />
            <span>
              <strong className="text-white">Cross-device use and verification</strong><br />
              Passkeys will automatically be available on your synced devices.
            </span>
          </li>
        </ul>

        <button
          onClick={handleAddPasskey}
          className="bg-green-500 hover:bg-green-600 transition w-full text-white py-2 rounded text-sm font-medium"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default PasskeyPage;
