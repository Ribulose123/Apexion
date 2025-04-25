"use client";
import React from "react";
import Image from "next/image";



const paymentMethods = [
  { name: "Bank Transfer", icon: <Image src='/img/ant-design_credit-card-filled2.png' alt="Binance Smart Chain" width={16} height={16} /> },
  { name: "Paypal", icon: <Image src='/img/logos_paypal.png' alt="Paypal" width={16} height={16} /> },
  { name: "Wise", icon: <Image src='/img/lineicons_wise.png' alt="wise" width={16} height={16} /> },
  { name: "Bank Transfer", icon:  <Image src='/img/ant-design_credit-card-filled2.png' alt="Binance Smart Chain" width={16} height={16}/> },
  { name: "Zelle", icon: <Image src='/img/simple-icons_zelle.png' alt="Binance Smart Chain" width={16} height={16} /> },
  { name: "Wise", icon: <Image src='/img/lineicons_wise.png' alt="wise" width={16} height={16} /> }
];

const P2PBenefits = () => {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-12">
      {/* Benefits Header */}
      <h2 className="text-3xl text-[#E8E8E8] font-bold mb-8 text-center md:text-start">
        Benefits Of P2P
      </h2>

      {/* Why Choose P2P Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-20 mt-35">
        <div className="w-full md:w-5/12  ">
          <div className="w-full h-40 -mt-15">
            <Image
              src="/img/Mesa de trabajo 1 3.png"
              alt="P2P Network Illustration"
              width={300}
              height={200}
              className="-mt-30 mx-auto md:mx-0"
            />
          </div>
        </div>

        <div className="w-full md:w-5/12 mt-35 md:mt-0 ">
          <h3 className="text-[24px] font-semibold mb-4 text-[#E8E8E8]">
            Why Choose Bybit P2P?
          </h3>
          <div >
            <p className="text-[#E8E8E8] text-[16px] font-medium">
              Lower Fees: Save on transaction fees compared to traditional
              exchanges.
            </p>
            <p className="text-[#E8E8E8] text-[16px] font-medium">
              Global Accessibility: Trade anytime, anywhere, 24/7.
            </p>
            <p className="text-[#E8E8E8] text-[16px] font-medium">
              Customizable Trading: Filter ads by price, payment method, and
              other preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Bybit P2P Section */}

      <div className="flex flex-col md:flex-row justify-between items-center mb-20 mt-35">
  <div className="w-full md:w-5/12">
    <h3 className="text-[24px] font-semibold mb-4 text-[#E8E8E8]">
      Why Choose P2P?
    </h3>
    <div>
      <p className="text-[#E8E8E8] text-[16px] font-medium">
        Zero Fees: Enjoy zero fees on crypto transactions.
      </p>
      <p className="text-[#E8E8E8] text-[16px] font-medium">
        Diverse Payment Options: Choose from over 600 payment options.
      </p>
      <p className="text-[#E8E8E8] text-[16px] font-medium">
        24/7 Customer Support: Access multilingual support anytime and
        find instant solutions in our Help Center.
      </p>
      <p className="text-[#E8E8E8] text-[16px] font-medium">
        Secure Escrow System: Trade with confidence — your assets will
        only be released upon your confirmation.
      </p>
    </div>
  </div>

  <div className="w-full md:w-5/12 flex justify-center items-center">
    <div className="w-full h-40 mx-auto">
      <Image
        src="/img/Mesa de trabajo 1 2.png"
        alt="P2P Network Illustration"
        width={300}
        height={200}
        className="mx-auto md:mx-0"
      />
    </div>
  </div>
</div>

      {/* Payment Methods Section */}
      <div className="w-full  h-[300px] mx-auto relative bg-[#03040f] text-white p-8 rounded-2xl shadow-lg border border-gray-800 overflow-hidden mt-60">
      {/* Content */}
      <div className="relative z-10 mx-auto flex flex-col md:flex-row jutify-evenly md:mt-10 md:ml-10 md:gap-10 items-center">
        {/* Header */}
        <div className="mb-6 md:ml-0 -ml-10">
          <h2 className="text-2xl font-semibold text-[#E8E8E8] mb-2">Payment Methods</h2>
          <p className="text-gray-400 text-sm">Trade effortlessly with popular payment methods</p>
        </div>
        
        {/* Payment Methods Grid */}
        <div className="space-y-4">
          {/* First Row */}
          <div className="flex flex-wrap gap-3">
            {paymentMethods.slice(3, 6).map((method, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-70 px-4 py-2 rounded-lg flex items-center gap-2">
                {method.icon}
                <span className="text-sm text-white">{method.name}</span>
              </div>
            ))}
          </div>
          
          {/* Second Row */}
          <div className="flex flex-wrap gap-3">
            {paymentMethods.slice(2,4).map((method, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-70 px-4 py-2 rounded-lg flex items-center gap-2">
                {method.icon}
                <span className="text-sm text-white">{method.name}</span>
              </div>
            ))}
          </div>
          
          {/* Third Row */}
          <div className="flex flex-wrap gap-3">
            {paymentMethods.slice(5,6).map((method, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-70 px-4 py-2 rounded-lg flex items-center gap-2">
                {method.icon}
                <span className="text-sm text-white">{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom-left hexagon image */}
      <Image
        src="/img/hexagon.png" 
        alt="Hexagon pattern"
        width={350}
        height={250}
        className="absolute -left-30 md:-left-10 -bottom-15 md:-bottom-10 opacity-30"
      />

      {/* Top-right hexagon image */}
      <Image
        src="/img/hexagon.png" 
        alt="Hexagon pattern"
        width={350}
        height={250}
        className="absolute -right-40 -top-10 opacity-40"
      />
    </div>
    </div>
  );
};

export default P2PBenefits;
