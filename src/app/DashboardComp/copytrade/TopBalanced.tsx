import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { PiUsersThree } from "react-icons/pi";
import { BiSolidUpArrow } from "react-icons/bi";
import { CopyProfiles } from "@/app/data/data";
import { useRouter } from 'next/navigation'; 
import CopyTradeModal from "@/app/modals/CopyTradeModal";

interface ChartData {
  minValue: number;
  maxValue: number;
  dataPoints: number[];
}

interface GenerateChartDataFn {
  (id: number, currentValue: number): ChartData;
}

const generateChartData: GenerateChartDataFn = (id, currentValue) => {
  const minValue: number = 0.1;
  const maxValue: number = 50 + (id % 50);
  const dataPoints: number[] = Array.from({ length: 10 }, (_, i) => {
    const progress = i / 9;
    const variation = ((id + i) % 10) * 0.02;
    return minValue + (currentValue - minValue) * progress * (0.9 + variation);
  });

  return { minValue, maxValue, dataPoints };
};

const TopBalanced = () => {
  const router = useRouter();
   const [showModal, setShowModal] = useState(false);
   const [selectedTrader, setSelectedTrader] = useState<number | null>(null)



   const handleCopyClick = (copyId:number, e:React.MouseEvent)=>{
    e.stopPropagation()
    setSelectedTrader(copyId)
    setShowModal(true)
   }

    const closeModal = () => {
    setShowModal(false);
    setSelectedTrader(null);
  };
  const handleNavigation = (copyId: number) => {
    router.push(`/copy/${copyId}`);
  };

  const traderData = selectedTrader 
    ? CopyProfiles.find(copy => copy.id === selectedTrader)
    : null;

  return (
    <div className="mt-6">

       {/* Modal - only show when trader is selected */}
      {showModal && traderData && (
        <CopyTradeModal 
          traderName={traderData.name}
          onClose={closeModal}
        />
      )}
      <div className="md:flex justify-between items-center hidden">
        <p className="text-[#7D8491] text-[16px] font-medium">
          Traders that balance profit and risk.
        </p>
        <Link
          href="/copymore"
          className="flex items-center text-16px text-[#F2AF29] gap-2 hover:text-[#f8c966] transition-colors"
        >
          view more <ArrowRight size={18} />
        </Link>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CopyProfiles.map((copy) => {
            const currentValue = parseFloat(
              copy.profitPercentage.replace("+", "")
            );
            const { minValue, maxValue, dataPoints } = generateChartData(
              copy.id,
              currentValue
            );

            return (
              <div
                key={copy.id}
                className="bg-[#141E323D] border-2 border-[#141E32] rounded-lg overflow-hidden p-2 hover:border-[#1e2a4a] transition-colors duration-300"
                onClick={() => handleNavigation(copy.id)}
              >
                {/* Header profile */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-700 rounded-full overflow-hidden">
                        <Image
                          src="/img/Avatar DP.png"
                          alt="profile"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {copy.online && (
                        <div className="absolute -right-0.5 -bottom-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#141E32]"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2">
                        <h3 className="text-white text-sm font-medium truncate hover:text-[#F2AF29] transition-colors">
                          {copy.name}
                        </h3>
                        <button className="text-gray-400 hover:text-yellow-400 transition-colors flex-shrink-0">
                          <Star size={16} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-1">
                        <div className="flex items-center gap-1 text-gray-400">
                          <PiUsersThree className="text-xs" />
                          <span className="text-xs">
                            {copy.completedOrders}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-green-500 text-xs font-medium">
                          <BiSolidUpArrow className="text-[10px]" />
                          <span>{copy.profitPercentage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROI section */}
                <div className="p-2 flex justify-between items-center gap-2 border-b border-gray-800">
                  <div>
                    <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded inline-block mb-2">
                      ROI 30D
                    </div>
                    <div className="text-green-500 text-[16px] font-bold mt-6">
                      {copy.profitPercentage}
                    </div>
                  </div>
                  
                  <div className="w-1/2 md:w-full h-20">
                    <svg viewBox="0 0 100 40" className="w-full h-full">
                      <defs>
                        <linearGradient
                          id={`gradient-${copy.id}`}
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                        </linearGradient>
                        <pattern 
                          id={`grid-dots-${copy.id}`} 
                          width="4" 
                          height="4" 
                          patternUnits="userSpaceOnUse"
                        >
                          <circle cx="2" cy="2" r="1" fill="#2D3748" />
                        </pattern>
                      </defs>
                      
                      {/* Bottom grid line (min value) */}
                      <line
                        x1="0"
                        y1="35"
                        x2="100"
                        y2="35"
                        stroke={`url(#grid-dots-${copy.id})`}
                        strokeWidth="1"
                      />
                      <text
                        x="2"
                        y="35"
                        fill="#7D8491"
                        fontSize="4"
                        dy="3.5"
                        textAnchor="start"
                        className="font-sans"
                      >
                        {minValue.toFixed(1)}
                      </text>
                      
                      {/* Top grid line (max value) */}
                      <line
                        x1="0"
                        y1="5"
                        x2="100"
                        y2="5"
                        stroke={`url(#grid-dots-${copy.id})`}
                        strokeWidth="1"
                      />
                      <text
                        x="2"
                        y="5"
                        fill="#7D8491"
                        fontSize="4"
                        dy="-1"
                        textAnchor="start"
                        className="font-sans"
                      >
                        {maxValue.toFixed(1)}
                      </text>
                      
                      {/* Area fill */}
                      <path
                        d={`M0,35 ${dataPoints.map((value, i) => {
                          const x = i * 10;
                          const y = 35 - ((value - minValue) / (maxValue - minValue)) * 30;
                          return `L${x},${y}`;
                        }).join(' ')} L100,35 Z`}
                        fill={`url(#gradient-${copy.id})`}
                      />
                      
                      {/* Line */}
                      <path
                        d={`M0,35 ${dataPoints.map((value, i) => {
                          const x = i * 10;
                          const y = 35 - ((value - minValue) / (maxValue - minValue)) * 30;
                          return `L${x},${y}`;
                        }).join(' ')}`}
                        stroke="#10B981"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>

                {/* Financial details */}
                <div className="p-4 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total PnL</span>
                    <span className="text-white">{copy.totalPnL}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Closed PnL</span>
                    <span className="text-white">{copy.closedPnL}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Open PnL</span>
                    <span className="text-white">{copy.openPnL}</span>
                  </div>
                </div>

                {/* Copy button */}
                <button
                  className="w-full py-3 bg-[#439A86] hover:bg-[#3a8a77] text-white font-medium transition-colors rounded-md mt-4 cursor-pointer"
                  onClick={(e)=>handleCopyClick(copy.id, e)}
                >
                  Copy
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopBalanced;