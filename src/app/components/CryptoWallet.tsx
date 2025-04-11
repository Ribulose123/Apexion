'use client';
import Assets from './Assets';
import Transactions from './Transactions';
import TopSection from './TopSection';

export default function CryptoWallet() {
  return (
    <div className="min-h-screen text-white sm:p-2">
      
      <TopSection />

      
      <Assets />

     
      <Transactions />
    </div>
  );
}
