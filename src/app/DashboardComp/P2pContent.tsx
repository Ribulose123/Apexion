"use client";
import { useState, useEffect } from "react";
import {
 
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { sellers as allSellers } from "../data/data";
import Image from "next/image";
import TradingHeader from "../components/TradingHeader";
import P2PBenefits from "../components/P2PBenefits";
import TradingTable from "../components/TradingTable";

export default function ApeaxonP2P() {
  

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [sellersPerPage] = useState(4);
  const [displayedSellers, setDisplayedSellers] = useState<
    {
      id: number;
      name: string;
      completedOrders: number;
      completionRate: string;
      price: number;
      availableUSDT: number;
      minAmount: number;
      maxAmount: number;
      paymentMethods: string[];
    }[]
  >([]);
  const [totalPages, setTotalPages] = useState(1);

  // Calculate pagination whenever relevant states change
  useEffect(() => {
    // Calculate total pages
    const total = Math.ceil(allSellers.length / sellersPerPage);
    setTotalPages(total);

    // Get current sellers for the page
    const indexOfLastSeller = currentPage * sellersPerPage;
    const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
    const currentSellers = allSellers.slice(
      indexOfFirstSeller,
      indexOfLastSeller
    );

    setDisplayedSellers(currentSellers);
  }, [currentPage, sellersPerPage]);

  // Function to handle page changes
  const handlePageChange = (pageNumber: number): void => {
    // Ensure we stay within valid page range
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;

    setCurrentPage(pageNumber);
  };

  // Generate page numbers for pagination display
  const getPageNumbers = () => {
    const pageNumbers = [];

    

    // Special case for small number of pages
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }

    // Always add page 1
    pageNumbers.push(1);

    // Add ellipsis if current page is more than 3
    if (currentPage > 3) {
      pageNumbers.push("...");
    }

    // Add pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(i);
      }
    }

   
    if (currentPage < totalPages - 2) {
      pageNumbers.push("...");
    }

    
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="min-h-screen text-white ">
      {/* Header Section - Full Width Background */}
      <div className="w-full bg-[#060A17]">
        <div className="max-w-7xl  w-full mx-auto  py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center ">
            <div className=" hidden md:block">
              <h1 className="text-2xl font-bold mb-2">
                Use P2P To Buy And Sell USDT
              </h1>
              <p className="text-[#797A80] text-sm mb-4">
                Trade safely and easily with zero fees on Bitget P2P. Trade{" "}
                <br /> USDT via various payment methods such as bank transfers{" "}
                <br /> and e-wallets now.
              </p>
            </div>
            <div className="bg-[#01040F] p-3 rounded-lg flex items-center mx-auto md:mx-0 ">
              <p className="text-[20px]">
                Customer Support <br /> Will Never Ask You <br /> To Password or
                SMS
              </p>
              <Image
                src="/img/Caution.png"
                alt="caution"
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trading Tabs Section - Full Width Background */}
      <div className="w-full  mt-6">
        <div className=" max-w-7xl w-full mx-auto px-4 py-4">
          <TradingHeader />

         
          {/* Trading Table Header - Hidden on mobile, visible on md screens and up */}
          <TradingTable sellers={displayedSellers}/>

          {/* Pagination */}
          <div className="flex justify-center md:justify-end mt-6">
            <div className="flex items-center gap-2">
              {/* Previous page button */}
              <button
                className={`h-6 w-6 rounded-full ${
                  currentPage === 1
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-700 hover:bg-gray-600"
                } flex items-center justify-center text-xs`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={14} />
              </button>

              {/* Page number buttons */}
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  className={`h-6 ${
                    page === "..." ? "w-6" : "w-6"
                  } rounded-full 
                    ${
                      page === currentPage
                        ? "bg-blue-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    } 
                    flex items-center justify-center text-xs`}
                  onClick={() =>
                    typeof page === "number" ? handlePageChange(page) : null
                  }
                >
                  {page}
                </button>
              ))}

              {/* Next page button */}
              <button
                className={`h-6 w-6 rounded-full ${
                  currentPage === totalPages
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-700 hover:bg-gray-600"
                } flex items-center justify-center text-xs`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How To Get Started Section - Full Width Background */}
      <div className="w-full ">
        <div className="max-w-7xl w-full mx-auto px-4 py-12">
          <div className="flex justify-between md:items-center mb-6 flex-col md:flex-row">
           <div>
           <h2 className="md:text-2xl text-[20px] font-bold">
              How To Get Started With Bidvest P2P
            </h2>
            <p className="text-[#797A80] text-sm mb-4 mt-2">Ready to begin your P2P trading journey? Follow this step-by-step guide to complete your first <br /> P2P transaction on Bybit.
            </p>
           </div>
            <div className="flex gap-2 md:-mt-20">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                Get Started
              </button>
              <button className="border border-gray-600 text-white px-4 py-2 rounded-md text-sm">
                Get Trade
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col md:items-center">
              <div className="h-16 w-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Image src='/img/Download.png' alt="download" width={500} height={300} className="w-[200px]" />
              </div>
              <h3 className="text-lg font-medium mb-2">Place An Order</h3>
              <p className="text-sm text-gray-400 md:text-center">
                Select the crypto you want to buy, enter the amount, choose a
                payment method, and place your order. The funds will be held by
                Apeaxon P2P.
              </p>
            </div>

            <div className="flex flex-col md:items-center">
              <div className="h-16 w-16 rounded-full bg-blue-900 flex items-center justify-center mb-4 relative">
                <Image src='/img/Pay icon.png' alt='pay' width={300} height={300}/>
                <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-yellow-400"></div>
              </div>
              <h3 className="text-lg font-medium mb-2">Pay The Seller</h3>
              <p className="text-sm text-gray-400 md:text-center">
                Pay the seller via your selected payment method within the time
                limit. The seller will be notified once payment is confirmed
                through P2P portal.
              </p>
            </div>

            <div className="flex flex-col md:items-center">
              <div className="h-16 w-16 rounded-full bg-blue-900 flex items-center justify-center mb-4 relative">
                <Image src='/img/Coins icons.png' alt="coins" width={300} height={300}/>
                <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-400 transform rotate-45"></div>
              </div>
              <h3 className="text-lg font-medium mb-2">Get Your Coins</h3>
              <p className="text-sm text-gray-400 md:text-center">
                Once the seller confirms receipt of payment, your cryptocurrency
                will be released from the escrow and transferred to your wallet.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
        <P2PBenefits />
        </div>
      </div>
    </div>
  );
}
