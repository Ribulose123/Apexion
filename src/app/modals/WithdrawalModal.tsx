import React from 'react'

const WithdrawalModal = () => {
  return (
   <div className="flex items-center justify-center p-4">
      <div className="bg-[#141E32] rounded-lg max-w-md w-full p-6 text-white relative">
        {/* Close button */}
        <button 
          onClick={() => console.log}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl text-[#E8E8E8] font-semibold mb-6">Withdrawal Fee Payment</h2>

        {/* Terms and Conditions */}
        <div className="border border-[#999B9F66] rounded-lg p-4 mb-6 text-sm text-[#E8E8E8A3] leading-relaxed">
          <p className="mb-4">
            By accessing and using this web page and the other web pages owned or operated by us or accessing and using our 
            online services or by accessing or using the Bitget Mobile App, you will be conclusively presumed to have notice of, 
            and you acknowledge that you agree to comply with and be bound by these Conditions, as amended from time to 
            time. These Conditions govern our relationship with you in relation to our Website and/or Mobile App. If you disagree 
            with any part of these Conditions, you must immediately discontinue your access or use of our Website and our 
            Mobile App as the case may be.
          </p>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-medium  mb-2">Customer Qualification</h4>
              <p className="mb-3">
                Please note that the regulatory requirements that we are exempted from when dealing with you as an Accredited 
                Investor:
              </p>
            </div>
            
            <div className="space-y-2">
              <p>
                <span className="font-medium">1.</span> The investor has reached the age of 18 years, has complete rights and behavioral capabilities; has sufficient 
                knowledge and experience to understand the nature and risks of financial products and concepts.
              </p>
              
              <p>
                <span className="font-medium">2.</span> You are the legal owner of the funds in Bitget account, and ensure the legality of the source of funds or digital 
                assets, and may not use the platform to operate illegal acts.
              </p>
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <button 
          onClick={() => alert('Payment processed!')}
          className="flex items-end justify-items-end bg-[#439A86] hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Pay
        </button>
      </div>
    </div>
  )
}

export default WithdrawalModal
