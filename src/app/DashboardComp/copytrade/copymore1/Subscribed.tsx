import { API_ENDPOINTS } from "@/app/config/api";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { Copy, ChevronRight, ChevronLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import CopySuccess from "@/app/modals/CopySuccess";
import CopyTradeModal from "@/app/modals/CopyTradeModal";
import UncopyConfirmModal from "@/app/modals/UncopyConfirmModal";

interface TradersProps {
  id: string;
  username: string;
  profilePicture?: string;
  status: string;
  maxCopiers: number;
  currentCopiers: number;
  totalCopiers: number;
  minCopyAmount: number;
  maxCopyAmount: number;
  totalPnL: number;
  copiersPnL: number;
  aum: number;
  profitPercentage?: number;
  completedOrders?: number;
  online?: boolean;
  closedPnL?: number;
  openPnL?: number;
  isCopied?: boolean;
  isFavorited?: boolean;
  copied?: boolean;
  favorited?: boolean;
  commissionRate: number;
}

const Subscribed = ({ searchQuery = "" }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null);
  const [traders, setTraders] = useState<TradersProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showUncopyConfirm, setShowUncopyConfirm] = useState(false); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(14);

  // Filter traders based on search query
  const filteredTraders = useMemo(() => {
    if (!searchQuery.trim()) return traders;

    const query = searchQuery.toLowerCase().trim();
    return traders.filter(
      (trader) =>
        trader.username.toLowerCase().includes(query) ||
        trader.status.toLowerCase().includes(query) ||
        trader.profitPercentage?.toString().includes(query) ||
        trader.totalCopiers.toString().includes(query)
    );
  }, [traders, searchQuery]);

  // Memoized pagination calculations
  const { currentTraders, totalPages, startIndex, endIndex } = useMemo(() => {
    const totalItems = filteredTraders.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTraders = filteredTraders.slice(startIndex, endIndex);

    return { currentTraders, totalPages, startIndex, endIndex };
  }, [filteredTraders, currentPage, itemsPerPage]);

  useEffect(() => {
    const fetchTraders = async () => {
      const token = localStorage.getItem("authToken");
      setIsLoading(true);
      setError(null);

      if (!token) {
        setError("Authentication failed: No token found. Please login again.");
        setIsLoading(false);
        return;
      }

      try {
        const url = `${API_ENDPOINTS.TRADERS.GET_ALL_TRADERS}?limit=100&filter=top_balanced`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("authToken");
            router.push("/login");
            throw new Error("Authentication failed: Your session has expired.");
          }
          throw new Error(`Failed to fetch traders: ${response.status}`);
        }

        const result = await response.json();

        if (result.data && Array.isArray(result.data.traders)) {
          const mappedTraders = result.data.traders
          .filter((trader: TradersProps) => trader.favorited || trader.isFavorited)
          .map(
            (trader: TradersProps) => ({
              ...trader,
              isCopied: trader.copied,
              isFavorited: trader.favorited,
              profitPercentage: trader.profitPercentage ?? 0,
              completedOrders: trader.completedOrders ?? "N/A",
              online: trader.online ?? false,
            })
          );
          setTraders(mappedTraders);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        console.error("Failed to fetch traders", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTraders();
  }, [router]);

  // Pagination handlers
  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const renderPaginationButtons = useCallback(() => {
    const pagesToShow = 7;
    const buttons = [];
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 rounded-md hover:bg-gray-700 text-[#7D8491DE]"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="dots-start" className="px-3 py-1 text-[#7D8491DE]">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i
              ? "bg-[#7D849114] text-white"
              : "text-[#7D8491DE] hover:bg-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="dots-end" className="px-3 py-1 text-[#7D8491DE]">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 rounded-md hover:bg-gray-700 text-[#7D8491DE]"
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  }, [currentPage, totalPages, handlePageChange]);

  const handleCopyClick = (traderId: string, isCopied:boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTrader(traderId);
    if(!isCopied){
      setShowUncopyConfirm(true)
    }else{
      setShowModal(true)
    }
  };

  const handleConfirmCopy = async (copySettings: {
    copyAmount: number;
    copyRatio: number;
    stopLossEnabled: boolean;
    stopLossPercent: number;
    takeProfitEnabled: boolean;
    takeProfitPercent: number;
  }) => {
    const token = localStorage.getItem("authToken");

    if (!token || !selectedTrader) return;

    try {
      setIsLoading(true);

      const copyData = {
        traderId: selectedTrader,
        ...copySettings,
      };

      const res = await fetch(API_ENDPOINTS.TRADERS.COPY_TRADER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(copyData),
      });

      if (!res.ok) {
        throw new Error(`Failed to copy trader: ${res.status}`);
      }

      const result = await res.json();
      if (
        result.status === 201 ||
        result.message === "Successfully started copying trader"
      ) {
        setTraders((prevTraders) =>
          prevTraders.map((trader) =>
            trader.id === selectedTrader
              ? { ...trader, isCopied: true }
              : trader
          )
        );
        setShowModal(false);
        setSuccessMessage(
          result.message || "Successfully started copying trader"
        );
        setError(null);
      } else {
        throw new Error(result.message || "Failed to copy trader");
      }
    } catch (err) {
      console.error("Copy failed:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

 const handleUnCopy=async()=>{
    const token = localStorage.getItem("authToken");
 
   if (!token || !selectedTrader) return;
 
   // Close the confirmation modal immediately
   setShowUncopyConfirm(false); 
 
      try{
       const response = await fetch (API_ENDPOINTS.TRADERS.UNCOPY_TRADER, {
         method:'POST',
         headers:{
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`, 
         },
         body:JSON.stringify({traderId:selectedTrader})
       })
 
        if (!response.ok) {
       throw new Error(`Failed to uncopy trader: ${response.status}`);
     }
       const result = await response.json()
 
       if( result.status === 201 ||
         result.message === "Successfully started copying trader"){
           setTraders((prevTrader)=>
             prevTrader.map((trader)=>
               trader.id === selectedTrader
             ?{...trader, isCopied:false}
             :trader
             )
           )
         }
          setSelectedTrader(null);
     setSuccessMessage(result.message || `Successfully stopped copying trader ${selectedTraderData?.username || ''}.`)
      }catch(err){
       console.error('Uncopy failed:', err);
     setError(err instanceof Error ? err.message : 'An unknown error occurred during uncopy.');
      }finally{
       setShowUncopyConfirm(false)
      }
   } 
   const closeModal = () => {
     setShowModal(false);
     setShowUncopyConfirm(false)
     setSelectedTrader(null);
   };

  const handleFavourite = async (traderId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authentication failed: No token found. Please login again.");

      return;
    }

    try {
      setTraders((prevTraders) =>
        prevTraders.map((trader) =>
          trader.id === traderId
            ? { ...trader, isFavorited: !trader.isFavorited }
            : trader
        )
      );

      const resFavourite = await fetch(API_ENDPOINTS.TRADERS.COPY_FAVOURITE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ traderId }),
      });

      if (!resFavourite.ok) {
        // Revert UI if API call fails
        setTraders((prevTraders) =>
          prevTraders.map((trader) =>
            trader.id === traderId
              ? { ...trader, isFavorited: !trader.isFavorited }
              : trader
          )
        );
        throw new Error(`Failed to favorite trader: ${resFavourite.status}`);
      }

      const result = await resFavourite.json();

      if (result.success) {
        setTraders((prevTraders) =>
          prevTraders.map((trader) =>
            trader.id === traderId
              ? { ...trader, isFavorited: result.data.isFavorited }
              : trader
          )
        );
      }
    } catch (err) {
      console.error("Favorite toggle failed:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    }
  };

  const handleNavigation = (traderId: string) => {
    router.push(`/copy/${traderId}`);
  };

  const selectedTraderData = selectedTrader
    ? traders.find((trader) => trader.id === selectedTrader)
    : null;

  if (isLoading) {
    return (
      <div className="mt-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-white">Loading traders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {showModal && selectedTraderData && (
        <CopyTradeModal
          traderName={selectedTraderData.username}
          minAmount={selectedTraderData.minCopyAmount}
          maxAmount={selectedTraderData.maxCopyAmount}
          commissionRate={selectedTraderData.commissionRate}
          onClose={closeModal}
          onConfirmCopy={handleConfirmCopy}
        />
      )}

      {showUncopyConfirm && selectedTraderData && (
         <UncopyConfirmModal
         onClose={closeModal}
           onConfirm ={handleUnCopy}
          traderName={selectedTraderData.username}
         />
      )}

      {successMessage && (
        <CopySuccess
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}
      {/* Search Results Info */}
      {searchQuery && (
        <div className="mb-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
          <p className="text-blue-400">
            Found {filteredTraders.length} traders matching &quot;{searchQuery}
            &quot;
          </p>
        </div>
      )}

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-900/20 border border-green-700 rounded-lg">
          <p className="text-green-400">{successMessage}</p>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-[#141E32] border-b border-t py-1">
            <tr>
              <th className="px-6 py-4 text-left text-gray-300 text-[13px] font-medium"></th>
              <th className="px-6 py-4 text-left text-gray-300 text-[13px] font-medium">
                Name
              </th>
              <th className="px-4 py-4 text-center text-gray-300 text-[13px] font-medium">
                ROI %
              </th>
              <th className="px-4 py-4 text-center text-gray-300 text-[13px] font-medium">
                Maxdown PnL %
              </th>
              <th className="px-4 py-4 text-center text-gray-300 text-[13px] font-medium">
                Followers&apos; PnL %
              </th>
              <th className="px-4 py-4 text-center text-gray-300 text-[13px] font-medium">
                Win Rate %
              </th>
              <th className="px-4 py-4 text-center text-gray-300 text-[13px] font-medium">
                Stability Index
              </th>
              <th className="px-4 py-4 text-center text-gray-300 text-[13px] font-medium">
                Followers
              </th>
              <th className="px-4 py-4 text-center text-gray-300 text-[13px] font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#141E32]">
            {currentTraders.length > 0 ? (
              currentTraders.map((trader) => (
                <tr
                  key={trader.id}
                  onClick={() => handleNavigation(trader.id)}
                  className="hover:bg-gray-750 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => handleFavourite(trader.id, e)}
                      className={`${
                        trader.isFavorited ? "text-yellow-400" : "text-gray-400"
                      } hover:text-yellow-400 transition-colors flex-shrink-0`}
                    >
                      <Star
                        size={16}
                        fill={trader.isFavorited ? "currentColor" : "none"}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={trader.profilePicture || "/img/Avatar DP.png"}
                            alt={`${trader.username}'s avatar`}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        {trader.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium flex items-center space-x-1">
                          <span>{trader.username}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-[#01BC8D1F] text-[8px] text-[#01BC8D] px-1 rounded">
                            stable
                          </span>
                          <span className="bg-[#01BC8D1F] text-[8px] text-[#01BC8D] px-1 rounded">
                            win streak
                          </span>
                          <span className="bg-[#6967AE1F] text-[8px] text-[#6967AE] px-1 rounded">
                            trend trader
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <div
                      className={`${
                        trader.totalPnL >= 0 ? "text-green-400" : "text-red-400"
                      } font-medium`}
                    >
                      {trader.totalPnL >= 0 ? "+" : ""}
                      {trader.totalPnL}%
                    </div>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <div className="text-white">
                      +{(trader.profitPercentage || 0).toFixed(2)}%
                    </div>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <div className="text-white">
                      +{(trader.copiersPnL || 0).toFixed(2)}%
                    </div>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <div className="text-white">
                      {trader.totalCopiers > 0
                        ? Math.round(
                            (trader.currentCopiers / trader.totalCopiers) * 100
                          )
                        : 0}
                      %
                    </div>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <div className="text-white">3.50/5</div>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <div className="text-white">
                      {trader.totalCopiers.toLocaleString()}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={(e) => handleCopyClick(trader.id, !!trader.isCopied, e)}
                      className="bg-[#6967AE36] border border-[#282740] text-[#6967AE] px-4 py-2 rounded text-sm font-medium transition-colors flex items-center space-x-2 mx-auto hover:bg-[#6967AE50]"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{trader.isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-400">
                  No traders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {!isLoading && traders.length > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 text-sm text-gray-300">
          <div className="mb-4 md:mb-0">
            <span className="text-[#7D8491DE]">
              {startIndex + 1} - {Math.min(endIndex, traders.length)} of{" "}
              {traders.length} traders
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-[#7D8491DE]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex space-x-1">{renderPaginationButtons()}</div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-[#7D8491DE]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscribed;
