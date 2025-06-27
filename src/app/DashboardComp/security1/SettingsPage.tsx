"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import NotifactionSettings from "./NotifactionSettings";
import Link from "next/link";

const SettingsPage = () => {
  const [timeZone, setTimeZone] = useState("Last 24hours");
  return (
    <div>
      <div>
        <h2 className="md:text-4xl text-3xl font-semibold">Settings</h2>

        {/* Setting content */}
        <div className="mt-10 flex flex-col gap-10">
          {/* preferences */}
          <div className="">
            <h3 className="text-xl text-white font-semibold">Preferences</h3>

            <div className="border-2 border-[#141E32] rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
              <div className="space-y-2 flex-1">
                <span className="block text-base text-white font-semibold">
                  Change basis
                </span>
                <p className="text-sm text-[#A4A4A4] font-medium md:w-1/2 w-full">
                  When you change your UTC time zone, the percentage change
                  calculations for price quotes in markets will adjust
                  accordingly. However, candlestick charts will remain
                  unchanged.
                </p>
              </div>

              <div className="relative w-full md:w-auto">
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="bg-[#10131F] border border-gray-700 rounded-full px-4 py-2 text-[#E8E8E8] appearance-none pr-10 text-sm w-full md:w-40 focus:outline-none transition-all"
                  aria-label="Select time zone basis"
                >
                  <option value="Last 24hours">Last 24 hours</option>
                  <option value="Last 2Days">Last 2 Days</option>
                  <option value="Last 1week">Last 1 week</option>
                  <option value="Last 1month">Last 1 month</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#E8E8E8] pointer-events-none" />
              </div>
            </div>
          </div>
           {/* Notifaction settings */}
        <div>
          <NotifactionSettings/>
        </div>

        {/* security */}

        <div>
          <h2 className="text-xl text-white font-semibold">security</h2>

          <div className="border-2 border-[#141E32] rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
            <div className="space-y-2 flex-1">
                <span className="block text-base text-white font-semibold">
                  Change basis
                </span>
                <p className="text-sm text-[#A4A4A4] font-medium md:w-[60%] w-full">
                Manage your account&#39;s security preferences, including password updates, two-factor authentication (2FA), wallet connection permissions, and session activity. Keep your assets and personal data safe with customizable protection options.
                </p>
              </div>

              <Link href='/security/settings' className="bg-[#439A86] px-4 py-2 text-sm rounded-lg text-center text-white">Manage</Link>
          </div>
        </div>

        {/* Identification */}

            <div>
          <h2 className="text-xl text-white font-semibold">Identification</h2>

          <div className="border-2 border-[#141E32] rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
            <div className="space-y-2 flex-1">
                <p className="text-sm text-[#A4A4A4] font-medium md:w-[60%] w-full">
                Control how your identity is verified and displayed across the platform. Manage KYC (Know Your Customer) details, linked identity documents, and on-chain identity preferences to meet compliance requirements and personalize your Web3 experience..
                </p>
              </div>

              <Link href='/security/verfication' className="bg-[#439A86] px-4 py-2 text-sm rounded-lg text-center text-white">Verify</Link>
          </div>
        </div>
        </div>

       
      </div>
    </div>
  );
};

export default SettingsPage;
