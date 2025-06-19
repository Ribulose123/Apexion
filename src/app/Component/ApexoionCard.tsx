'use client';
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import { ArrowRight, Lock, ArrowDown } from "lucide-react";
import { LuUsers } from "react-icons/lu";
import { BsShieldLock } from "react-icons/bs";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const ApexoionCard = () => {
    const [expandedItem, setExpandedItem] = useState<number | null>(null);

     const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What is a trading platform?",
      answer: "A trading platform is a software application that provides access to financial markets, allowing users to buy and sell various financial instruments such as stocks, forex, commodities, and cryptocurrencies. It serves as an interface between traders and the market, providing real-time data, charting tools, and order execution capabilities."
    },
    {
      id: 2,
      question: "The Platform Doesn't Load?",
      answer: "If the platform doesn't load, try these troubleshooting steps: 1) Clear your browser cache and cookies, 2) Check your internet connection, 3) Disable browser extensions that might interfere, 4) Try using a different browser or incognito mode, 5) Contact technical support if the issue persists."
    },
    {
      id: 3,
      question: "When Will Deposits Be Credited?",
      answer: "Deposit processing times vary by payment method: Bank transfers typically take 1-3 business days, credit/debit cards are usually instant to 24 hours, e-wallets like PayPal or Skrill are often instant, and cryptocurrency deposits are credited after network confirmations (usually 10-60 minutes depending on the currency)."
    },
    {
      id: 4,
      question: "Do I Need to Install Any Trading Software?",
      answer: "Most modern trading platforms offer web-based access through your browser, requiring no installation. However, many also provide downloadable desktop applications that offer enhanced features, faster execution, and offline access to account information. Mobile apps are also commonly available for trading on the go."
    },
    {
      id: 5,
      question: "What Should I Do If a System Error Occurs?",
      answer: "If you encounter a system error: 1) Take a screenshot of the error message, 2) Note the time and what you were doing when it occurred, 3) Try refreshing the page or restarting the application, 4) Check if the issue persists across different devices or browsers, 5) Contact customer support immediately with the error details and screenshot."
    },
    {
      id: 6,
      question: "What are bonuses?",
      answer: "Trading bonuses are promotional offers provided by brokers to attract new clients or reward existing ones. Common types include welcome bonuses (percentage of initial deposit), no-deposit bonuses (free trading credit), and loyalty bonuses. Always read the terms and conditions carefully, as bonuses often come with trading requirements and withdrawal restrictions."
    }
  ];

  const toggleExpansion = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };
  return (
    <div className="md:px-8 w-full font-semibold">
      {/* hero section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="flex flex-col gap-2 order-2 md:order-1">
          <h1 className="text-5xl md:text-start text-center">
            Experience the Future <br className="md:block hidden" /> of Payments
            with <br className="md:block hidden" />{" "}
            <span className="text-[#439A86]">Apexion Card</span>
          </h1>
          <p className="text-[#797A80] text-[13px] md:text-start text-center">
            Unlock exclusive rewards and seamless transactions with the Apexion
            Card today!
          </p>

          <button className="bg-[#439A86] px-2 py-3 md:w-[20%] w-full text-white text-[12px] rounded-md">
            Get Your Card
          </button>
        </div>
        <Image
          src="/img/Bidvest Card.png"
          alt="cards"
          width={350}
          height={300}
          className="max-w-3xl order-1 md:order-2"
        />
      </div>

      {/* Features section */}
      <div className="mt-15 relative border border-[#141E32] rounded-md p-4 md:p-8 overflow-hidden">
        {/* Background star image - now properly constrained */}
        <div className="absolute inset-0 overflow-hidden rounded-md z-0">
          <Image
            src="/img/Star specles 1 (1).png"
            alt="star decoration"
            width={1500}
            height={1500}
            className="absolute w-full"
            priority
          />
        </div>

        {/* Content container */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col gap-5">
            <h2 className="text-5xl text-[#E8E8E8]">
              Selected Users Only: <br />
              10% cashback
            </h2>
            <p className="text-[#C1C1C1] text-[13px]">
              Spend with your Bybit Card to earn 10% cashback, up to $300.
            </p>
            <Link
              href="#"
              className="text-[#439A86] text-[13px] font-semibold flex items-center"
            >
              Learn more <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>

          <div className="mx-auto md:mx-0">
            <Image
              src="/img/bid.png"
              alt="card"
              width={350}
              height={350}
              className="z-10"
            />
          </div>
        </div>
      </div>

      <div className="mt-25">
        <div className="flex justify-between items-center">
          <div className="mx-auto md:mx-0">
            <Image src="/img/phone12.png" alt="phone" width={350} height={350} />
          </div>
          <div className="md:flex flex-col hidden">
            <h2 className="text-5xl text-[#E8E8E8]">
              Pay Anytime, <br /> Anywhere With Your <br /> Crypto or Fiat
            </h2>
            <p className="text-[#C1C1C1] text-[13px] mt-2">
              Choose to pay using your crypto or fiat balance. <br />
              Supported fiat currencies: USD <br /> Supported crypto: BTC, ETH,
              XRP, TON, USDT, USDC, MNT, and BNB, <br /> with more options on
              the way!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-25">
        {/* Header */}
        <h1 className="text-white text-4xl font-bold text-start md:text-center mb-8">
          Unlock More Exciting Features
        </h1>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#10131F] rounded-2xl p-4 border-2 border-[#141E32]  flex flex-col">
            {/* Icon */}
            <div className="mb-4 h-16 flex items-center">
              <Image
                src="/img/Signal.png"
                alt="google icon"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col space-y-3">
              <h2 className="text-white text-xl font-semibold">
                Go Virtual & Spend<br />Instantly
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed">
                Begin Card is compatible with Apple Pay, Google Pay and Samsung
                Pay, so you can make purchases instantly
              </p>

              <div className="flex space-x-2 ">
                <Image
                  src="/img/logos_google-pay.png"
                  alt="google icon"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <Image
                  src="/img/logos_apple-pay.png"
                  alt="apple icon"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <Image
                  src="/img/simple-icons_samsungpay.png"
                  alt="samsung icon"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>

              <p className="text-gray-500 text-xs">
                Fast secure payment everywhere
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#10131F] rounded-2xl p-4 border-2 border-[#141E32]  flex flex-col">
            <div className="mb-4 h-16 flex items-center">
              <Image
                src="/img/akar-icons_percentage.png"
                alt="percentage icon"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            <div className="flex-grow flex flex-col space-y-3">
              <h2 className="text-white text-xl font-semibold">
                Earn Up To 8% APR<br />On Your Idle Funds
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed">
                Maximize your spare cash instead of letting your wealth sleep
                with up to 8% APR* on your Card balance and up to 6% APR* on
                your Savings account.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#10131F] rounded-2xl p-4 border-2 border-[#141E32]  flex flex-col">
            <div className="mb-4 h-16 flex items-center">
              <Image
                src="/img/Dollar Sign.png"
                alt="dollar icon"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            <div className="flex-grow flex flex-col space-y-3">
              <h2 className="text-white text-xl font-semibold">
                Free Card Issuance,<br />No Annual Fees
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed">
                Get your card for free — no more annual fees or any hidden
                charges.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Protection Section */}
      <div className="mt-20">
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-2 g-1ap2 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Your Asset, Our Protection
              </h2>
              <p className="text-[#9E9FA1] text-[14px] mb-12 leading-relaxed">
                With Bybit&#39;s cutting-edge protections, you can personalize your settings to 
                maintain total control over your account.
              </p>
              
              {/* Protection Features */}
              <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="text-center md:text-left">
                  <div className="w-16 h-16 bg-[#10131F] rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <LuUsers className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-[#C1C1C1] font-semibold mb-2 text-[11px] text-start">
                    Our dedicated fraud and security team works around the clock to keep your assets safe.
                  </p>
                </div>
                
                {/* Feature 2 */}
                <div className="text-center md:text-left">
                  <div className="w-16 h-16 bg-[#10131F] rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <BsShieldLock className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="text-[#C1C1C1] font-semibold mb-2 text-[11px] text-start">
                    Two-factor authentication adds an extra layer of security to protect your account.
                  </p>
                </div>
                
                {/* Feature 3 */}
                <div className="text-center md:text-left">
                  <div className="w-16 h-16 bg-[#10131F] rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-[#C1C1C1] font-semibold mb-2 text-[11px] text-start">
                    Card freezing or unfreezing is possible anytime with just a few taps on the Bybit App.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Image - Security Lock */}
            <div className="flex justify-center lg:justify-end">
              <Image src='/img/lock.png' alt="lock" width={350} height={350} className="hidden md:block"/>
            </div>
          </div>
        </div>
      </div>
     
      <div className="mt-25">
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image - Bitcoin */}
            <div className="">
              <Image src='/img/coin1.png' alt="bitcoin" width={350} height={350}/>
            </div>
            
            {/* Right Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl lg:text-4xl font-bold mb-8">
                Start Your Crypto Life in Minutes — Apply Now!
              </h2>
              
              {/* Steps */}
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className=" text-sm font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Step 1</h3>
                    <p className="text-gray-400 text-[13px]">Create a Bybit account in just a few minutes.</p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className=" text-sm font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Step 2</h3>
                    <p className="text-gray-400 text-[13px]">Verify your personal details and proof of address.</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className=" text-sm font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Step 3</h3>
                    <p className="text-gray-400 text-[13px]">Once approved, start using your Bybit Virtual Card immediately.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
       <div className="mt-25 w-full">
        <h1 className="text-4xl font-bold mb-12">FAQ</h1>
        
        <div className="space-y-1">
          {faqData.map((item) => (
            <div key={item.id} className="border-b border-gray-700">
              <button
                onClick={() => toggleExpansion(item.id)}
                className="w-full flex items-center justify-between py-6 text-left hover:bg-gray-800/50 transition-colors duration-200 px-2"
              >
                <span className="text-lg font-medium pr-4">{item.question}</span>
                <div className="flex items-center space-x-2">
                 
                  <ArrowDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      expandedItem === item.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
              
              {expandedItem === item.id && (
                <div className="pb-6 px-2">
                  <p className="text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApexoionCard;