"use client";
import React, { useState } from "react";
import { CircleCheck } from "lucide-react";
import VerificationFAQ from "./VerificationFAQ";
import UnifiedVerificationModal from "../modals/UnifiedVerificationModal";

const VeriAuth = () => {
  const [activeTab, setActiveTab] = useState("individual");
  const [showVerificationModal, setShowVerificationModal] = useState(false); // State for modal visibility

  const individualVerificationItems = [
    { id: "withdrawals", name: "Withdrawals", completed: true },
    { id: "crypto", name: "Crypto deposit", completed: true },
    { id: "fiat", name: "Fiat deposit", completed: true },
    { id: "p2p", name: "P2P trading", completed: true },
  ];

  const corporateVerificationItems = [
    { id: "withdrawals", name: "Withdrawals", completed: true },
    { id: "crypto", name: "Crypto deposit", completed: true },
  ];

  const handleVerifyClick = () => {
    setShowVerificationModal(true);
  };

  const handleCloseModal = () => {
    setShowVerificationModal(false);
  };

  return (
    <div className="min-h-screen px-2 sm:px-4 w-full bg-[#01040F] text-white">
      {/* Verification Modal */}
      <UnifiedVerificationModal 
        isOpen={showVerificationModal} 
        onClose={handleCloseModal} 
      />

      {/* Tab navigation */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-120 md:ml-3 w-full mb-6 md:border-b-2 md:border-white/10 p-2">
        <h2 className="text-white text-2xl font-semibold">
          {activeTab === "corporate" ? "Corporate Verification" : "Individual Verification"}
        </h2>

        <div className="md:bg-[#10131F] rounded-lg p-2 flex gap-2 -ml-5 md:ml-0">
          <button
            className={`text-xs font-semibold px-4 py-3 ${
              activeTab === "corporate"
                ? "md:bg-[#01040F] text-[#F0B90B] md:text-white rounded-lg"
                : ""
            }`}
            onClick={() => setActiveTab("corporate")}
          >
            Corporate Verification
          </button>

          <button
            className={`text-xs font-semibold px-4 py-2 ${
              activeTab === "individual"
                ? "md:bg-[#01040F] text-[#F0B90B] md:text-white rounded-lg"
                : ""
            }`}
            onClick={() => setActiveTab("individual")}
          >
            Individual Verification
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-15 mt-4 md:ml-3">
        {/* Left section - Content changes based on active tab */}
        <div className="w-full md:w-1/2 p-4 border-b-2 border-white/10 md:border-b-0">
          {activeTab === "individual" ? (
            /* Individual Verification Content */
            <div>
              <h1 className="text-2xl font-bold mb-2">Individual Verification</h1>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">
                  Basic identity verification
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  To comply with local laws and regulations, please complete
                  identity verification to access all services.
                </p>

                <div className="mb-6 border-b-2 border-white/10 p-4">
                  <h3 className="font-medium mb-3">
                    Verify Your Account to Unlock Extra Benefits
                  </h3>
                  <div className="space-y-3">
                    {individualVerificationItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{item.name}</span>
                        {item.completed && (
                          <CircleCheck size={18} className="text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-medium mb-3">Verification requirements</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                    <li>Government-issued documents</li>
                    <li>Face Authentication</li>
                    <li>Estimated review time: 60m</li>
                  </ul>
                </div>

                <button 
                  className="bg-[#439A86] text-white py-3 px-6 rounded text-center w-full"
                  onClick={handleVerifyClick}
                >
                  Verify
                </button>
              </div>
            </div>
          ) : (
            /* Corporate Verification Content */
            <div>
              <h1 className="text-2xl font-bold mb-2">Corporate Verification</h1>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">
                  Basic identity verification
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  To comply with local laws and regulations, please complete
                  identity verification to access all services.
                </p>

                <div className="mb-6 border-b-2 border-white/10 p-4">
                  <h3 className="font-medium mb-3">
                    Verify Your Account to Unlock Extra Benefits
                  </h3>
                  <div className="space-y-3">
                    {corporateVerificationItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{item.name}</span>
                        {item.completed && (
                          <CircleCheck size={18} className="text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-medium mb-3">Verification requirements</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                    <li>Company documents</li>
                    <li>Estimated review time: 1-3 working day(s)</li>
                  </ul>
                </div>

                <button 
                  className="bg-[#439A86] text-white py-3 px-6 rounded text-center w-full"
                  onClick={handleVerifyClick}
                >
                  Verify
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right section - FAQ */}
        <div className="w-full md:w-1/2">
          {activeTab === "individual" ? (
            /* Individual Verification FAQ */
            <VerificationFAQ />
          ) : (
            /* Corporate Verification FAQ */
            <div className="bg-[#10131F] rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Useful Information</h3>
                <span className="text-sm text-gray-400 cursor-pointer">More</span>
              </div>

              <div className="mb-8 mt-20">
                <h4 className="font-medium mb-3">FAQ</h4>
                <p className="text-sm text-gray-400 mb-2">
                  To facilitate a better understanding of the business verification
                  process, we have compiled answers to FAQs. Click the link below for
                  more information.
                </p>
              </div>

              <div className="mb-8">
                <h4 className="font-medium mb-3">Step-by-step verification guide</h4>
                <p className="text-sm text-gray-400 mb-2">
                  We advise applicants to carefully review our step-by-step business
                  verification guide before entering the verification process. Click the
                  link below for detailed instructions.
                </p>
                <p className="text-sm text-[#439A86] mt-2 cursor-pointer">View details</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  If you have any questions, please contact: kyc@bigtglobal.com
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VeriAuth;