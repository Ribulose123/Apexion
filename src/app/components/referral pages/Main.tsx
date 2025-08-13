'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { API_ENDPOINTS } from '@/app/config/api'


interface UserProfileData{
  referralCode: string;
}
const Main = () => {
const [copyCode, setCopyCode] = useState(false)
const [copyLink, setCopyLink] = useState(false)
const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);


 const referralCode = userProfile?.referralCode
  const referralLink = `https://www.bidvest.com/invite?ref=${referralCode}`

useEffect(()=>{
   const fetchUserProfile = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found");
        }
        const response = await fetch(API_ENDPOINTS.USER.USER_PROFILE, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch profile");
        }
  
        setUserProfile(result.data);
        
      } catch (err) {
        console.error("Fetch error:", err);
        setFetchError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
},[])

  
const handleCopyCode = async ()=>{
    if (!referralCode) {
    console.error('No referral code available to copy');
    return;
  }

    try{
       await navigator.clipboard.writeText(referralCode)
    setCopyCode(true)
    setTimeout(() => {
        setCopyCode(false)
    }, 1000);
    } catch(err){
         console.error('Failed to copy code: ', err)
    }
    
}
const handleCopyLinK = async()=>{
   if (!referralLink) {
    console.error('No referral link available to link');
    return;
  }
    try{
         navigator.clipboard.writeText(referralLink)
    setCopyLink(true)
    setTimeout(() => {
        setCopyLink(false)
    }, 1000);
    } catch(err){
        console.error("Failed to copy link:", err)
    }
   
}

  return (
    <div className='py-12 px-4'>
      <div className='max-w-7xl mx-auto'>
         <div className="text-center mb-12">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
            How Our Referral
          </h1>
          <h2 className="text-white text-3xl md:text-4xl font-bold">
            Program Works
          </h2>
        </div>

        <div className='flex flex-col md:flex-row justify-center items-center gap-6'>
            <Image src='/img/Card.png' alt='card' width={300} height={300}/>
            <Image src='/img/Card.png' alt='card' width={300} height={300}/>
            <Image src='/img/Card.png' alt='card' width={300} height={300}/>
        </div>

          {/* Referral Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 mt-4 p-4">
          <div className="">
            <h3 className="text-white text-lg font-semibold mb-4">My Referral Code:</h3>
            <div className="flex items-center justify-between bg-[#080A1A] rounded-lg p-3">
               {loading ? (
              <span className="text-base text-gray-200">Loading...</span>
            ) : fetchError ? (
              <span className="text-base text-red-700">{fetchError}</span>
            ) : referralCode ? (
              <span data-testid="referral-code">{referralCode}</span>
            ) : (
              "No referral code available"
            )}
              <button className="text-white hover:text-purple-300 transition-colors" onClick={handleCopyCode}>

                {copyCode ? <Check className='text-green-600'/> : <Copy/>}                
              </button>
            </div>
          </div>
          
          <div className="">
            <h3 className="text-white text-lg font-semibold mb-4">My Referral Link:</h3>
            <div className="flex items-center justify-between bg-[#080A1A] rounded-lg p-3">
              <span className="text-white text-sm truncate">{referralLink}</span>
              <button className="text-white hover:text-purple-300 transition-colors ml-2" onClick={handleCopyLinK}>
                 {copyLink ? <Check className='text-green-600'/> : <Copy/>} 
                
              </button>
            </div>
          </div>
        </div>
         {/* Terms and Conditions */}
        <div className="  p-8  ">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">Terms And Conditions</h2>
          <div className="space-y-4 text-gray-300 text-sm">
            <p><span className="font-semibold">1.</span> Bidvest Not Covered Referral Programs In Germany, The United Kingdom, France, Belgium, Hong Kong And All Regions Where Bidvest Does Not Operate.</p>
            <p><span className="font-semibold">2.</span> Referrers Will Start Earning Commission When A Referee Signs Up With Bidvest And Wherever Their Bidvest Complete A Trade On The Bidvest Platform Upon The Registration Of A Referee, Referrers Will Be Able To Receive Commissions For The Trade Of Their Referrers For 365 Days.</p>
            <p><span className="font-semibold">3.</span> Referral Commissions Will Be Distributed In USDT Or Daily Referral Commission Are Distributed From The Referee&apos;s Trading Fee | Net Trading Fee = Trading Fee - Bonus Coupon + Other Could Net Trading From Will Be Calculated In USDT.</p>
            <p><span className="font-semibold">4.</span> Capital Deposit Including One Click Buy, Fiat Trading, Crypto Deposits, And Fiat Deposits, External Transfer Of Funds Will Not Be Considered For This Event.</p>
            <p><span className="font-semibold">5.</span> Spot Trading Fees With Zero Fees Will Not Be Counted Toward Commission.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
