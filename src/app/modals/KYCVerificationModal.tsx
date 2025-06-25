import React from 'react'

const KYCVerificationModal = () => {
  return (
    <div className="min-h-screen bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-200 rounded-2xl max-w-sm w-full p-8 text-center relative">
        {/* Close button */}
        <button 
          onClick={() => console.log}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors text-xl"
        >
          ✕
        </button>

        {/* Info Icon */}
        <div className="flex justify-center mb-8 relative">
          {/* Animated glass background */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-indigo-200/30 rounded-full backdrop-blur-sm border border-white/30 animate-pulse shadow-lg"></div>
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-300/40 to-purple-300/40 rounded-full backdrop-blur-md border border-white/20 animate-ping animation-delay-1000 shadow-md"></div>
          </div>
          
          {/* Main icon */}
          <div className="relative z-10 w-16 h-16 bg-[#6967AE] rounded-full flex items-center justify-center shadow-lg ">
            <span className="text-white text-2xl font-bold">i</span>
          </div>
        </div>

        {/* Header */}
        <h2 className="text-xl font-semibold text-[#01040F] mb-6">
          kYC verification is required.
        </h2>

        {/* Description */}
        <p className="text-[#999B9F] text-sm mb-6 leading-relaxed">
          To access all Bitget services, complete KYC verification first. You need to:
        </p>

        {/* Requirements List */}
        <div className="text-left mb-8 space-y-2">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-[#999B9F] rounded-full mr-3"></div>
            <span className="text-[#999B9F] text-sm">Government-issued documents</span>
          </div>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-[#999B9F] rounded-full mr-3"></div>
            <span className="text-[#999B9F] text-sm">Face Authentication</span>
          </div>
        </div>

        {/* Learn More Link */}
        <div className="mb-8">
          <a 
            href="#" 
            className="text-[#3EC5FF] text-sm hover:text-[#545aadd8] transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Learn more about identity verification perks
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={() => console.log}
            className="flex-1 border border-[#999B9F66] text-[#01040F] font-medium py-3 px-4 rounded-full transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => alert('Starting KYC verification...')}
            className="flex-1 bg-[#6967AE] hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-full transition-colors"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  )
}

export default KYCVerificationModal
