'use client'
import { useState, useEffect } from "react";
import BuyNav from "@/app/DashboardComp/BuyNav";
/* import ApeaxonP2P from "@/app/DashboardComp/P2pContent"; */

export default function P2p(){
    const [showRegionModal, setShowRegionModal] = useState(true);
    const [countdown, setCountdown] = useState(0); 
       // Countdown timer for automatic redirect
        useEffect(() => {
          if (showRegionModal) {
            const timer = setInterval(() => {
              setCountdown((prev) => {
                if (prev <= 1) {
                  clearInterval(timer);
                 
                  window.history.back(); 
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
      
            return () => clearInterval(timer);
          }
        }, [showRegionModal]);
      
        const handleCloseModal = () => {
          setShowRegionModal(false);
          window.history.back(); 
        };
      
        if (showRegionModal) {
          return (
            <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
              <div className="bg-[#141E32] border border-[#439A8633] rounded-xl p-8 max-w-md w-full mx-auto text-center">
                {/* Warning Icon */}
                <div className="mx-auto w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <svg 
                    className="w-8 h-8 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" 
                    />
                  </svg>
                </div>
                
                {/* Modal Title */}
                <h2 className="text-2xl font-bold text-white mb-3">
                  NOT AVAILABLE IN YOUR REGION
                </h2>
                
                {/* Modal Message */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  This service is currently not available in your geographic region. 
                  Please check back later or contact support for more information.
                </p>
                
                {/* Countdown Timer */}
                <div className="text-sm text-gray-400 mb-6">
                  Redirecting in <span className="text-[#439A86] font-bold">{countdown}</span> seconds...
                </div>
                
                {/* Action Button */}
                <button
                  onClick={handleCloseModal}
                  className="w-full bg-[#439A86] hover:bg-teal-600 text-white rounded-md py-3 transition duration-200 font-medium"
                >
                  Go Back Now
                </button>
              </div>
            </div>
          );
        }
    
    return(
        <div className="">
            <div>
               <div className="md:-ml-50 ml-0 mt-20">
               <BuyNav/>
               </div >
               {/*  <ApeaxonP2P/> */}
               <h2 className="text-2xl font-bold text-white mb-3">
          NOT AVAILABLE IN YOUR REGION
        </h2>
            </div>
        </div>
    )
}