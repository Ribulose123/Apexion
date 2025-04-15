import React from 'react';

interface SubProps {
  id: string;
  status: string;
  pair: string;
  minimum: string;
  maximum: string;
  duration: string;
  roi: string;
  signalStrength: number;
  amount: string;
  currency: string;
}

const SubCard: React.FC<SubProps> = ({
  pair,
  minimum,
  maximum,
  duration,
  roi,
  amount,
  currency
}) => {
  return (
    <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#6967AE] via-transparent to-[#6967AE] shadow-lg sm:w-[365px] h-[330px]">
      <div className="bg-[#12122b] rounded-2xl p-5 h-full flex flex-col justify-between text-white">
        
        {/* Header */}
        <h2 className="text-lg font-semibold text-[#D2D1EE] mb-4">{pair}</h2>
        
        {/* Info Section */}
        <div className="space-y-2 text-sm text-[#C4C4C4]">
          <div className="flex justify-between">
            <span>Minimum</span>
            <span className="text-white font-medium">{minimum}</span>
          </div>
          <div className="flex justify-between">
            <span>Maximum</span>
            <span className="text-white font-medium">{maximum}</span>
          </div>
          <div className="flex justify-between">
            <span>Plan Duration</span>
            <span className="text-white font-medium">{duration}</span>
          </div>
          <div className="flex justify-between">
            <span>ROI</span>
            <span className="text-green-400 font-medium">{roi}</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mt-3 bg-[#1f1e38] flex justify-between items-center p-2 rounded-md currency-display">
          <input
            type="text"
            value={amount}
            className="bg-transparent outline-none text-white w-full"
            readOnly
          />
          <span className="ml-2 text-gray-400">{currency}</span>
        </div>

        {/* Button */}
        <button className="w-full mt-4 bg-[#6967AE] hover:bg-[#7f7cd1] transition text-white py-2 rounded-lg  text-sm font-medium">
          Subscribe
        </button>
      </div>
    </div>
  );
};

const SubGrid: React.FC = () => {
  const signals: SubProps[] = [
    {
      id: '1',
      status: 'active',
      pair: 'BTC/USD',
      minimum: '0.01 BTC',
      maximum: '$19,000.00',
      duration: '3 Days',
      roi: '200%',
      signalStrength: 10,
      amount: '1,000,000',
      currency: 'USD'
    },
    {
      id: '2',
      status: 'active',
      pair: 'ETH/USD',
      minimum: '0.5 ETH',
      maximum: '$15,000.00',
      duration: '5 Days',
      roi: '180%',
      signalStrength: 9,
      amount: '750,000',
      currency: 'USD'
    },
    {
      id: '3',
      status: 'active',
      pair: 'LTC/USD',
      minimum: '10 LTC',
      maximum: '$12,000.00',
      duration: '7 Days',
      roi: '170%',
      signalStrength: 8,
      amount: '500,000',
      currency: 'USD'
    },
    {
      id: '4',
      status: 'active',
      pair: 'ADA/USD',
      minimum: '100 ADA',
      maximum: '$10,000.00',
      duration: '4 Days',
      roi: '160%',
      signalStrength: 9,
      amount: '300,000',
      currency: 'USD'
    },
    {
      id: '5',
      status: 'active',
      pair: 'XRP/USD',
      minimum: '500 XRP',
      maximum: '$9,000.00',
      duration: '6 Days',
      roi: '150%',
      signalStrength: 7,
      amount: '200,000',
      currency: 'USD'
    },
    {
      id: '6',
      status: 'active',
      pair: 'SOL/USD',
      minimum: '50 SOL',
      maximum: '$11,000.00',
      duration: '3 Days',
      roi: '175%',
      signalStrength: 8,
      amount: '350,000',
      currency: 'USD'
    }
  ];

  return (
    <div className="mt-6">
      <h2 className="text-white text-lg font-medium mb-4">Subscription</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {signals.map(signal => (
          <SubCard 
            key={signal.id}
            {...signal}
          />
        ))}
      </div>
    </div>
  );
};

export default SubGrid;
