import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Megaphone } from "lucide-react";
import MainTable from "./MainTable";
import ProductCard from "./ProductCard";
import ExecutionSection from "./ExecutionSection";
import FAQSection from "./FAQSection";
import ConTab from "./ConTab";
import LogoCarousel from "./LogoCarousel";

const Mainpage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className=" bg-[#1C1254] py-8 px-3">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-6 md:mb-0 flex flex-col md:block md:items-center ">
            <h1 className="text-3xl md:text-6xl text-[#E8E8E8] md:text-start text-center font-bold mb-2">
              Bidvest NFT Marketplace: Trade, Collect & Earn!
            </h1>
            <p className="text-[#F4F5F7] mb-6 md:text-start text-center">
              Buy, sell and trade exclusive NFTs—coming soon to Bidvest!
            </p>
            <button className="bg-[#F2AF29] text-white font-bold py-2 px-6 rounded">
              Get Started
            </button>
          </div>
          <div className="md:w-1/2 md:flex justify-center hidden ">
            <Image
              src="/img/NFT image.png"
              alt="NFT"
              width={400}
              height={500}
            />
          </div>
        </div>
      </div>
      <div className=" bg-[#060A17]   text-xs text-gray-400 md:flex hidden flex-wrap items-center justify-center md:justify-start p-4  ">
        <div className="flex items-center mx-auto ">
          <div>
            <span className="mr-4 flex items-center space-x-0.5 text-[#E8E8E8] text-[13px]">
              <Megaphone />
              [Selected Regions Only] New listings: USDQ/USDT + BTC/USDQ
            </span>
          </div>

          <div className="text-[#E8E8E8] text-[13px]">
            <span>
              {" "}
              Legends of Trade: VIP Arena, Compete for a Share of 1,000,000 USDT
              and Exclusive Rewards
            </span>
          </div>
        </div>
      </div>

      {/* link */}
      <div className="block md:hidden py-8 px-4">
  <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
    {/* Deposit */}
    <div className="flex flex-col items-center">
      <Link href='#' className="flex flex-col items-center hover:rotate-5">
      <div className="bg-gray-800 rounded-lg p-4 mb-2 w-13 h-13 flex items-center justify-center">
       <Image src='/img/Group 1010.png' alt="lock" width={200} height={200}/>
      </div>
      <span className="text-[#F4F5F7] text-xs font-medium">Deposit</span>
      </Link>
    </div>

    {/* Copy trade */}
    <div className="flex flex-col items-center">
      <Link href='copy' className="flex flex-col items-center hover:rotate-5">
      <div className="bg-gray-800 rounded-lg p-4 mb-2 w-13 h-13 flex items-center justify-center">
      <Image src='/img/Group 11712.png' alt="lock" width={100} height={100}/>
      </div>
      <span className="text-[#F4F5F7] text-xs font-medium">Copy trade</span>
      </Link>
    </div>

    {/* Referral */}
    <div className="flex flex-col items-center">
      <Link href='#' className="flex flex-col items-center hover:rotate-5">
      <div className="bg-gray-800 rounded-lg p-4 mb-2 w-13 h-13 flex items-center justify-center">
      <Image src='/img/refral.png' alt="lock" width={200} height={200}/>

      </div>
      <span className="text-[#F4F5F7] text-xs font-medium">Referral</span>
      </Link>
    </div>

    {/* Bidvest card */}
    <div className="flex flex-col items-center">
     <Link href='#' className="flex flex-col items-center hover:rotate-5">
     <div className="bg-gray-800 rounded-lg p-4 mb-2 w-13 h-13 flex items-center justify-center">
      <Image src='/img/Group 1011.png' alt="lock" width={200} height={200}/>

      </div>
      <span className="text-white text-xs font-medium">Bidvest card</span>
     </Link>
    </div>

    {/* Quick buy */}
    <div className="flex flex-col items-center">
      <Link href='/buy/credit-card'  className="flex flex-col items-center hover:rotate-5">
      <div className="bg-gray-800 rounded-lg p-4 mb-2 w-13 h-13 flex items-center justify-center">
      <Image src='/img/Group 1012.png' alt="lock" width={200} height={200}/>
      </div>
      <span className="text-[#F4F5F7] text-xs font-medium">Quick buy</span>
      </Link>
    </div>

    {/* Market */}
    <div className="flex flex-col items-center">
     <Link href='#' className="flex flex-col items-center hover:rotate-5">
     <div className="bg-gray-800 rounded-lg p-4 mb-2 w-13 h-13 flex items-center justify-center ">
      <Image src='/img/Group 1012.png' alt="lock" width={200} height={200}/>
      </div>
      <span className="text-[#F4F5F7] text-xs font-medium text-center">Market</span>
     </Link>
    </div>
  </div>
</div>

      {/* coin */}
      <div className="mt-6 md:flex hidden items-center justify-center gap-8 mx-auto">
        <div className="flex items-center space-x-2 max-w-[300px]">
          <Image src="/img/Bank 1.png" alt="Token" width={70} height={70} />
          <p className="text-[16px] text-[#E8E8E8]">
            Bidvest Earn & Refer: Get Rewarded for Every Friend You Bring!
          </p>
        </div>
        <div className="flex items-center space-x-2 max-w-[300px]">
          <Image src="/img/Bank 1.png" alt="Token" width={60} height={60} />
          <p className="text-[16px] text-[#E8E8E8]">
            Bidvest Earn & Refer: Get Rewarded for Every Friend You Bring!
          </p>
        </div>
        <div className="flex items-center space-x-2 max-w-[300px]">
          <Image src="/img/Bank 1.png" alt="Token" width={60} height={60} />
          <p className="text-[16px] text-[#E8E8E8]">
            Bidvest Earn & Refer: Get Rewarded for Every Friend You Bring!
          </p>
        </div>
      </div>

      {/* table */}

      <div className="mt-6">
        <MainTable />
      </div>

      {/* Get started */}
      <div className=" py-12 px-4 text-white hidden md:block">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Get Started in 30 Seconds!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-[#E8E8E8] rounded-lg p-5 flex flex-col h-full w-full max-w-[280px] mx-auto">
              <div className="flex justify-between items-start mb-3">
                <div className=" text-[#01040F] rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
                  1
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <Image
                  src="/img/phone.png"
                  alt="Create Account"
                  width={70}
                  height={70}
                  className="object-contain h-16"
                />
              </div>
              <h3 className="text-lg font-bold text-center mb-3 text-[#01040F]">
                Create Account
              </h3>
              <p className="text-[#01040F] text-center text-sm mb-4 flex-grow">
                Provide your email address and check your inbox for a 6-digit
                verification code. Simply enter the code on the verification
                page to complete your signup.
              </p>
              <Link href='/register' className="w-full bg-[#6967AE] text-white py-2 rounded-md font-medium transition-colors text-sm text-center">
                Sign Up Now
              </Link>
            </div>

            {/* Step 2 */}
            <div className="bg-[#E8E8E8] rounded-lg p-5 flex flex-col h-full w-full max-w-[280px] mx-auto">
              <div className="flex justify-between items-start mb-3">
                <div className=" text-[#01040F] rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
                  2
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <Image
                  src="/img/wallet.png"
                  alt="Make Deposit"
                  width={70}
                  height={70}
                  className="object-contain h-16"
                />
              </div>
              <h3 className="text-lg font-bold text-center mb-3 text-[#01040F]">
                Make Deposit
              </h3>
              <p className="text-[#01040F] text-center text-sm mb-4 flex-grow">
                Fund your account easily on the Bybit Web or App.
              </p>
              <Link href='/deposit' className="w-full bg-[#6967AE] text-white py-2 rounded-md font-medium transition-colors text-sm text-center">
                Deposit Now
              </Link>
            </div>

            {/* Step 3 */}
            <div className="bg-[#E8E8E8] rounded-lg p-5 flex flex-col h-full w-full max-w-[280px] mx-auto">
              <div className="flex justify-between items-start mb-3">
                <div className=" text-[#01040F] rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
                  3
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <Image
                  src="/img/trade.png"
                  alt="Start Trading"
                  width={70}
                  height={70}
                  className="object-contain h-16"
                />
              </div>
              <h3 className="text-lg font-bold text-center mb-3 text-[#01040F]">
                Start Trading
              </h3>
              <p className="text-[#01040F] text-center text-sm mb-4 flex-grow">
                Kick off your journey with your favorite Spot pairs or Futures
                contracts!
              </p>
              <Link  href='/trade' className="w-full bg-[#6967AE] text-white py-2 rounded-md font-medium transition-colors text-sm text-center">
                Trade Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Discover card */}
      <div className="max-w-6xl mx-auto">
        <ProductCard/>
      </div>

      {/* ExecutionSection */}
      <div className="max-w-6xl mx-auto">
        <ExecutionSection/>
      </div>

      {/* FAQ */}
      <div className="max-w-6xl mx-auto">
        <FAQSection/>
      </div>
      {/* CON*/}
      <div className="max-w-6xl mx-auto">
        <ConTab/>
      </div>
      <div className="w-full mt-0">
        <LogoCarousel />
      </div>
    </div>
  );
};

export default Mainpage;
