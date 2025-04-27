import React, { useState } from 'react';
import Image from 'next/image';
import { Loader } from '@/app/ui/Loader';
import { CoinDepost } from '@/app/data/data';
import { Copy, Check } from 'lucide-react';

interface DepositAddressProps {
  depositAddress: string;
  selectedCoin: CoinDepost | null;
  isLoading: boolean;
}

const DepositAddress: React.FC<DepositAddressProps> = ({
  depositAddress,
  selectedCoin,
  isLoading
}) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopiedAddress(true);
    setTimeout(() => {
      setCopiedAddress(false);
    }, 2000);
  };

  return (
    <div className=" text-white p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <div className="bg-[#439A86] text-white rounded-full w-7 h-7 flex items-center justify-center text-xs mr-2">
          3
        </div>
        <h3 className="font-semibold text-[20px] text-[#E8E8E8]">Paste address</h3>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader />
        </div>
      ) : depositAddress ? (
        <div className="space-y-4">
         

          <div className="flex flex-col space-x-4">
            <div className='flex justfity-between md:flex-row flex-col md:items-center gap-10'>
            <div className="">
              <div className="w-24 h-24">
                {/* QR code would go here */}
                <Image 
                  src="/img/vaadin_qrcode.png" 
                  alt="QR Code"
                  width={96}
                  height={96}
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className=''>
            <h3 className='text-[#E8E8E8]'>USSD</h3>
            <div className="rounded-lg p-5 border border-[#439A8633]  flex justify-between items-center">
              
                <div className="text-[20px] text-[#E8E8E8] font-semibold truncate">{depositAddress}</div>
                <button
                  onClick={handleCopyAddress}
                  className="ml-2 text-gray-400 hover:text-white "
                >
                  {copiedAddress ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            </div>

            <div className="flex-1">
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#7D8491]">Minimum Deposit</span>
                  <span className='text-[#E8E8E8]'>
                    {selectedCoin?.id === 'btc' ? '0.0001' : '0.00001'} {selectedCoin?.symbol || "USDT"}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#7D8491]">Transfer To</span>
                  <span className="flex items-center text-[#E8E8E8]">
                    Spot Account <span className="ml-1 text-xs">▼</span>
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#7D8491]">Contract Address</span>
                  <span className="ttext-[#E8E8E8]">***99gp6</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#7D8491]">Deposit Confirmation</span>
                  <span className='text-[#E8E8E8]'>20 Networks Confirmations</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#7D8491]">Withdrawal Unlocking</span>
                  <span className='text-[#E8E8E8]'>20 Networks Confirmations</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-yellow-500">
            <p>Minimum Deposit Amount: 0.001 USDT. Any Deposits Less Than The Minimum Will Not Be Credited Or Refunded.</p>
          </div>
        </div>
      ) : (
        <div className="py-8 text-center text-gray-400">
          Please select a coin and network first
        </div>
      )}
    </div>
  );
};

export default DepositAddress;