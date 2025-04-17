"use client";
import Image from 'next/image';
import React from 'react';

interface PoolCardProps {
  id: string;
  crypto: string;
  minimum: string;
  maximum: string;
  cycle: string;
}

const PoolCard: React.FC<PoolCardProps> = ({ crypto, minimum, maximum, cycle }) => {
  return (
    <div className="rounded-xl bg-gradient-to-b from-[#06023daf] from-25%   via-[#240a6b] to-[#644ca1]  overflow-hidden p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-4 gap-3">
        <Image src='/img/ethereum.png'alt='eth' width={20} height={20}/>
        <span className="text-white text-sm">{crypto}</span>
      </div>
      
      {/* Pool Info */}
      <div className="text-sm space-y-3 flex-grow">
        <div className="flex justify-between border-b border-indigo-800/30 pb-1">
          <span className="text-gray-300">Minimum</span>
          <span className="text-white">{minimum}</span>
        </div>
        
        <div className="flex justify-between border-b border-indigo-800/30 pb-1">
          <span className="text-gray-300">Maximum</span>
          <span className="text-white">{maximum}</span>
        </div>
        
        <div className="flex justify-between border-b border-indigo-800/30 pb-1">
          <span className="text-gray-300">Cycle</span>
          <span className="text-white">{cycle}</span>
        </div>
      </div>
      
      {/* Stake Button */}
      <button className="w-full mt-4 bg-indigo-700/50 hover:bg-indigo-700/70 text-white py-2 rounded-md text-sm transition">
        Stake
      </button>
    </div>
  );
};

const PoolGrid: React.FC = () => {
  // Dummy data similar to your subscription data
  const pools = [
    {
      id: '1',
      crypto: 'ETH',
      minimum: '16 ETH',
      maximum: '10 ETH',
      cycle: 'Daily',
    },
    {
      id: '2',
      crypto: 'ETH',
      minimum: '16 ETH',
      maximum: '10 ETH',
      cycle: 'Daily',
    },
    {
      id: '3',
      crypto: 'ETH',
      minimum: '16 ETH',
      maximum: '10 ETH',
      cycle: 'Daily',
    },
    {
      id: '4',
      crypto: 'ETH',
      minimum: '16 ETH',
      maximum: '10 ETH',
      cycle: 'Daily',
    },
    {
      id: '5',
      crypto: 'ETH',
      minimum: '16 ETH',
      maximum: '10 ETH',
      cycle: 'Daily',
    }
  ];

  return (
    <div className=" p-4 text-white">
      <h1 className="text-xl font-medium mb-4">Pools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pools.map(pool => (
          <PoolCard 
            key={pool.id}
            id={pool.id}
            crypto={pool.crypto}
            minimum={pool.minimum}
            maximum={pool.maximum}
            cycle={pool.cycle}
          />
        ))}
      </div>
    </div>
  );
};

export default PoolGrid;