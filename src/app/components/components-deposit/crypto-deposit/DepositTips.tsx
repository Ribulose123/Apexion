
import React from 'react';
import { CoinDepost, Network } from '@/app/data/data'; 
import Image from 'next/image';

interface DepositTipsProps {
  selectedCoin: CoinDepost | null;
  selectedNetwork: Network | null;
}

const DepositTips: React.FC<DepositTipsProps> = ({
  selectedCoin,
  selectedNetwork
}) => {
  return (
    <div className="bg-[#060A17] rounded-lg p-4 mb-4">
      <div className="flex items-center mb-4">
        <Image src='/img/ic_round-tips-and-updates.png' alt='tips' width={30} height={30}/>
        <span className="font-medium">Tips</span>
      </div>
      
      <ul className="text-sm text-[#7D8491] space-y-4">
        <li>Do not deposit assets on the {selectedCoin?.symbol || 'USDT'} address to any chain other than the {selectedNetwork?.name || 'BEP20'} network.</li>
        <li>Send the tokens to the correct network to avoid possible loss of funds.</li>
        <li>Make sure you choose the proper network to prevent potential losses.</li>
      </ul>
    </div>
  );
};

export default DepositTips;