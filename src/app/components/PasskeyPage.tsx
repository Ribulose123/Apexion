'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, LockKeyhole, ShieldCheck, Smartphone } from 'lucide-react';

const PasskeyPage = () => {
  const router = useRouter();

  const handleAddPasskey = () => {
    // Handle passkey creation logic here
    console.log('Passkey added!');
  };

  return (
    <div className="min-h-screen px-6 py-8 md:px-16 text-white">
      <button
        onClick={() => router.back()}
        className="mb-6 text-gray-400 hover:text-white flex items-center"
      >
        <ArrowLeft className=" mr-1 " size={30} /> <h2 className="text-2xl sm:text-4xl font-semibold text-[#E8E8E8]">Passkey</h2>
      </button>

      <div className="max-w-md">
        <div className="mb-4">
          {/* Lock icon (you can replace with an actual lock image or SVG) */}
          <div className="p-4 inline-block">
            <Image src='/img/Glass padlock 1.png' alt='padlock' width={200} height={200}/>
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-2">Passkey</h1>

        <ul className="text-sm text-gray-400 space-y-5 mt-6 mb-8 text-left">
          <li className="flex items-start gap-3">
            <ShieldCheck className="text-white w-5 h-5 mt-1" />
            <span>
              <strong className="text-white">No password or verification code required</strong><br />
              Add a passkey to sign in with ease using fingerprints or facial recognition.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <LockKeyhole className="text-white w-5 h-5 mt-1" />
            <span>
              <strong className="text-white">More secure than passwords</strong><br />
              Enhanced security based on your hardware device.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Smartphone className="text-white w-5 h-5 mt-1" />
            <span>
              <strong className="text-white">Cross-device use and verification</strong><br />
              Passkeys will automatically be available on your synced devices.
            </span>
          </li>
        </ul>

        <button
          onClick={handleAddPasskey}
          className="bg-[#439A86] transition w-full text-white py-2 rounded text-sm font-medium"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default PasskeyPage;
