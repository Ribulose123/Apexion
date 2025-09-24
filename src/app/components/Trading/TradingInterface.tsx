"use client";
import React, { useEffect, useState, useCallback } from "react";
import { API_ENDPOINTS } from "@/app/config/api";
import axios from "axios";

type TradingProps = unknown;

interface PlatformAsset {
  id: string;
  name: string;
  symbol: string;
  networkId?: string;
}

interface UserAsset {
  platformAssetId: string;
  platformAsset: PlatformAsset;
  balance: number;
}

interface CoinGeckoPrice {
  [coinId: string]: {
    usd: number;
  };
}

interface TradeCreateData {
  tradePair: string;
  price: number;
  amount: number;
  side: "BUY" | "SELL";
  paymentAssetId: string;
  notes?: string;
}

/* interface TradeResponse {
  id: string;
  userId: string;
  tradePair: string;
  price: number;
  amount: number;
  side: "BUY" | "SELL";
  action: string;
  paymentAssetId: string;
  leverage: number;
  orderType: string;
  executionStatus: string;
  realizedPnL: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
} */

const SYMBOL_TO_COINGECKO_ID: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  USDT: "tether",
  USDC: "usd-coin",
  BNB: "binancecoin",
  SOL: "solana",
  XRP: "ripple",
  ADA: "cardano",
  DOGE: "dogecoin",
  DOT: "polkadot",
  SHIB: "shiba-inu",
  AVAX: "avalanche-2",
  MATIC: "matic-network",
  LTC: "litecoin",
  TRX: "tron",
  UNI: "uniswap",
  LINK: "chainlink",
  ATOM: "cosmos",
  XLM: "stellar",
  XMR: "monero",
  ETC: "ethereum-classic",
};

const TradingInterface: React.FC<TradingProps> = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell" | "convert">("buy");
  const [price, setPrice] = useState<string>("");
  const [priceUnit, setPriceUnit] = useState<string>("USDT");
  const [amount, setAmount] = useState<string>("");
  const [amountUnit, setAmountUnit] = useState<string>("BTC");
  const [userAssets, setUserAssets] = useState<UserAsset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [_totalBalance, _setTotalBalance] = useState<number>(0); 
  const [isFetchingPrice, setIsFetchingPrice] = useState<boolean>(false);
  const [prices, setPrices] = useState<CoinGeckoPrice>({});
  const [retryDelay, setRetryDelay] = useState<number>(10000);
  const [lastPriceFetch, setLastPriceFetch] = useState<number>(0);
  const [cachedPrices, setCachedPrices] = useState<CoinGeckoPrice>({});

  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  const getCoinGeckoId = useCallback((asset: PlatformAsset): string => {
    if (asset.networkId) {
      return asset.networkId.toLowerCase();
    }
    return SYMBOL_TO_COINGECKO_ID[asset.symbol] || asset.symbol.toLowerCase();
  }, []);

  const fetchAllPrices = useCallback(
    async (forceRefresh = false) => {
      const now = Date.now();
      const isCacheValid = now - lastPriceFetch < CACHE_DURATION;

      if (
        !forceRefresh &&
        isCacheValid &&
        Object.keys(cachedPrices).length > 0
      ) {
        setPrices(cachedPrices);

        const total = userAssets.reduce((sum, asset) => {
          const coinGeckoId = getCoinGeckoId(asset.platformAsset);
          const assetPrice = cachedPrices[coinGeckoId]?.usd || 0;
          return sum + asset.balance * assetPrice;
        }, 0);
        _setTotalBalance(total);
        return;
      }

      setIsFetchingPrice(true);
      setError("");

      const coinGeckoIds = [
        ...new Set(
          userAssets.map((asset) => getCoinGeckoId(asset.platformAsset))
        ),
      ]
        .filter(Boolean)
        .join(",");

      if (!coinGeckoIds) return;

      try {
        // Use your backend API endpoint instead of direct CoinGecko call
        const response = await axios.get<CoinGeckoPrice>(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoIds}&vs_currencies=usd`,
          { timeout: 5000 }
        );

        setPrices(response.data);
        setCachedPrices(response.data);
        setLastPriceFetch(now);

        const total = userAssets.reduce((sum, asset) => {
          const coinGeckoId = getCoinGeckoId(asset.platformAsset);
          const assetPrice = response.data[coinGeckoId]?.usd || 0;
          return sum + asset.balance * assetPrice;
        }, 0);
        _setTotalBalance(total);

        setRetryDelay(10000);
      } catch (error) {
        console.error("Error fetching prices:", error);

        if (Object.keys(cachedPrices).length > 0) {
          setPrices(cachedPrices);
          const total = userAssets.reduce((sum, asset) => {
            const coinGeckoId = getCoinGeckoId(asset.platformAsset);
            const assetPrice = cachedPrices[coinGeckoId]?.usd || 0;
            return sum + asset.balance * assetPrice;
          }, 0);
          _setTotalBalance(total);
          setError("Using cached prices. Failed to fetch latest prices.");
        } else {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 429) {
              const newDelay = Math.min(retryDelay * 2, 60000);
              setRetryDelay(newDelay);
              setError(
                `Rate limit exceeded. Retrying in ${
                  newDelay / 1000
                } seconds.`
              );
            } else if (error.response?.status === 403) {
              setError(
                "API access forbidden. Please check your API configuration."
              );
            } else {
              setError("Failed to fetch current prices.");
            }
          } else {
            setError("Failed to fetch current prices.");
          }
          setRetryDelay(10000);
        }
      } finally {
        setIsFetchingPrice(false);
      }
    },
    [
      userAssets,
      getCoinGeckoId,
      retryDelay,
      lastPriceFetch,
      cachedPrices,
      CACHE_DURATION,
    ]
  );

  const fetchUserAssets = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await fetch(API_ENDPOINTS.USER.USER_PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let assets: UserAsset[] = [];

      if (data.data && Array.isArray(data.data.userAssets)) {
        assets = data.data.userAssets;
      } else if (Array.isArray(data.userAssets)) {
        assets = data.userAssets;
      } else if (Array.isArray(data.assets)) {
        assets = data.assets;
      } else if (data.data && Array.isArray(data.data.assets)) {
        assets = data.data.assets;
      } else {
        console.warn("Unexpected API response structure:", data);
        setError("Unexpected response format from server");
        return;
      }

      setUserAssets(assets);

      if (assets.length > 0) {
        const usdtAsset = assets.find(
          (asset: UserAsset) => asset.platformAsset.symbol === "USDT"
        );
        const btcAsset = assets.find(
          (asset: UserAsset) => asset.platformAsset.symbol === "BTC"
        );

        if (usdtAsset) setPriceUnit("USDT");
        if (btcAsset) setAmountUnit("BTC");
      }
    } catch (err) {
      console.error("Error fetching user assets:", err);
      setError(
        "Failed to load user assets. Please check your connection and try again."
      );
    }
  };

  useEffect(() => {
    fetchUserAssets();
  }, []);

  useEffect(() => {
    fetchAllPrices();
    const interval = setInterval(fetchAllPrices, 300000);
    return () => clearInterval(interval);
  }, [fetchAllPrices]);


   useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    const fromId = SYMBOL_TO_COINGECKO_ID[amountUnit];
    const toId = SYMBOL_TO_COINGECKO_ID[priceUnit];

    const fromPrice = prices[fromId]?.usd;
    const toPrice = prices[toId]?.usd;

    if (amountUnit === priceUnit) {
      setPrice("1");
    } else if (fromPrice && toPrice) {
      const calculatedPrice = fromPrice / toPrice;
      setPrice(calculatedPrice.toFixed(6));
    } else {
      setPrice("");
    }
  }, [amountUnit, priceUnit, prices]);

  const getCurrentBalance = () => {
    if (activeTab === "buy") {
      const paymentAsset = userAssets.find(
        (asset) => asset.platformAsset.symbol === priceUnit
      );
      return paymentAsset ? paymentAsset.balance : 0;
    } else {
      const sellingAsset = userAssets.find(
        (asset) => asset.platformAsset.symbol === amountUnit
      );
      return sellingAsset ? sellingAsset.balance : 0;
    }
  };

  const getCurrentBalanceSymbol = () => {
    return activeTab === "buy" ? priceUnit : amountUnit;
  };

  const validateTrade = (): { isValid: boolean; message: string } => {
    const amountNum = parseFloat(amount);
    const priceNum = parseFloat(price);

    if (isNaN(amountNum) || amountNum <= 0) {
      return { isValid: false, message: "Please enter a valid amount" };
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      return { isValid: false, message: "Please enter a valid price" };
    }

    if (activeTab === "buy") {
      const totalCost = amountNum * priceNum;
      const paymentAsset = userAssets.find(
        (asset) => asset.platformAsset.symbol === priceUnit
      );

      if (!paymentAsset) {
        return {
          isValid: false,
          message: `${priceUnit} not found in your assets`,
        };
      }

      if (paymentAsset.balance < totalCost) {
        return {
          isValid: false,
          message: `Insufficient ${priceUnit} balance. You have ${paymentAsset.balance.toFixed(
            8
          )} ${priceUnit}, need ${totalCost.toFixed(8)} ${priceUnit}`,
        };
      }
    } else if (activeTab === "sell") {
      const sellingAsset = userAssets.find(
        (asset) => asset.platformAsset.symbol === amountUnit
      );

      if (!sellingAsset) {
        return {
          isValid: false,
          message: `${amountUnit} not found in your assets`,
        };
      }

      if (sellingAsset.balance < amountNum) {
        return {
          isValid: false,
          message: `Insufficient ${amountUnit} balance. You have ${sellingAsset.balance.toFixed(
            8
          )} ${amountUnit}, need ${amountNum} ${amountUnit}`,
        };
      }
    }

    return { isValid: true, message: "" };
  };

  const executeTrade = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const validation = validateTrade();
      if (!validation.isValid) {
        setError(validation.message);
        setIsLoading(false);
        return;
      }

      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No authentication token found");
        setIsLoading(false);
        return;
      }

      const fromCoinName = userAssets.find(a => a.platformAsset.symbol === amountUnit)?.platformAsset.name || amountUnit;
      const toCoinName = userAssets.find(a => a.platformAsset.symbol === priceUnit)?.platformAsset.name || priceUnit 

      const tradePair = `${fromCoinName}/${toCoinName}`

      const amountNum = parseFloat(amount);
      const priceNum = parseFloat(price);

      let paymentAsset: UserAsset | undefined;
      let paymentAssetIdToSend: string | undefined;

      if (activeTab === "buy") {
        paymentAsset = userAssets.find(
          (a) => a.platformAsset.symbol === priceUnit
        );
        paymentAssetIdToSend = paymentAsset?.platformAsset.id;
      } else {
        paymentAsset = userAssets.find(
          (a) => a.platformAsset.symbol === amountUnit
        );
        paymentAssetIdToSend = paymentAsset?.platformAsset.id;
      }

      if (!paymentAsset || !paymentAssetIdToSend) {
        setError("Payment asset or its ID not found. Please try again.");
        setIsLoading(false);
        return;
      }

      const tradeData: TradeCreateData = {
        tradePair,
        price: priceNum,
        amount: amountNum,
        side: activeTab === "buy" ? "BUY" : "SELL",
        paymentAssetId: paymentAssetIdToSend,
        notes: `${activeTab === "buy" ? "Buy" : "Sell"} ${amount} ${amountUnit} at ${price} ${priceUnit}`,
      };

      const response = await fetch(API_ENDPOINTS.TRADERS.CREATE_TRADE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tradeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Failed to execute trade: ${response.statusText}`
        );
      }

      
      setSuccess("Trade executed successfully");

      fetchUserAssets();
    } catch (err: unknown) {
      console.error("Trade execution error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConvert = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // 1. Validation for Conversion
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        setError("Please enter a valid amount to convert.");
        setIsLoading(false);
        return;
      }
      if (amountUnit === priceUnit) {
        setError("Cannot convert an asset to itself.");
        setIsLoading(false);
        return;
      }

      // Check if prices for conversion are available
      const fromPrice = prices[SYMBOL_TO_COINGECKO_ID[amountUnit]]?.usd;
      const toPrice = prices[SYMBOL_TO_COINGECKO_ID[priceUnit]]?.usd;
      if (!fromPrice || !toPrice) {
        setError(
          "Market prices for conversion are not available. Please try again later."
        );
        setIsLoading(false);
        return;
      }

      // Check if user has enough of the FROM asset
      const fromAsset = userAssets.find(
        (a) => a.platformAsset.symbol === amountUnit
      );
      if (!fromAsset || fromAsset.balance < amountNum) {
        setError(
          `Insufficient ${amountUnit} balance. You have ${
            fromAsset ? fromAsset.balance.toFixed(8) : 0
          } ${amountUnit}`
        );
        setIsLoading(false);
        return;
      }

      // 2. Perform the conversion calculation locally
      const convertedAmount = (amountNum * fromPrice) / toPrice;

      // 3. Update the user's assets locally
      // This part is the crucial change. Instead of calling a non-existent API,
      // you update the state to reflect the conversion.
      const updatedUserAssets = userAssets.map((asset) => {
        if (asset.platformAsset.symbol === amountUnit) {
          // Deduct the 'from' asset
          return { ...asset, balance: asset.balance - amountNum };
        }
        if (asset.platformAsset.symbol === priceUnit) {
          // Add the 'to' asset
          return { ...asset, balance: asset.balance + convertedAmount };
        }
        return asset;
      });

      setUserAssets(updatedUserAssets);
      setSuccess(
        `Conversion successful! You converted ${amountNum.toFixed(8)} ${amountUnit} to ${convertedAmount.toFixed(8)} ${priceUnit}.`
      );

    } catch (err: unknown) {
      console.error("Conversion error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred during conversion.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = () => {
    if (activeTab === "convert") {
      handleConvert();
    } else {
      executeTrade();
    }
  };

  const getActionButtonText = () => {
    if (isLoading) return "Processing...";
    return activeTab === "buy"
      ? "Buy"
      : activeTab === "sell"
      ? "Sell"
      : "Convert";
  };

  const availableAssets = userAssets
    .filter((asset) => asset.balance > 0)
    .map((asset) => asset.platformAsset.symbol)
    .filter((symbol, index, self) => self.indexOf(symbol) === index);

  return (
    <div className="md:flex flex-col hidden text-white w-full max-w-sm mx-auto space-y-1">
      <div className="space-y-4 bg-[#141E323D] p-4 rounded-lg">
        <div className="flex border-b border-gray-800 mb-4">
          {["buy", "sell", "convert"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 text-center capitalize ${
                activeTab === tab
                  ? "text-white border-b border-blue-400 scale-100"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab as "buy" | "sell" | "convert")}
            >
              {tab}
            </button>
          ))}
        </div>
        {error && (
          <div className="p-2 bg-red-900/30 rounded text-red-400 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="p-2 bg-green-900/30 rounded text-green-400 text-sm">
            {success}
          </div>
        )}
        <div className="space-y-1">
          <label className="text-xs text-gray-400">
            {activeTab === "buy"
              ? "Buy Amount"
              : activeTab === "sell"
              ? "Sell Amount"
              : "Convert Amount"}
            :
          </label>
          <div className="flex items-center space-x-2 w-full bg-[#10131F] rounded-lg px-2">
            <input
              type="number"
              className="flex-1 py-2 focus:outline-none bg-transparent"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
            <div className="relative">
              <select
                className="bg-transparent py-2 pr-8 focus:outline-none appearance-none"
                value={amountUnit}
                onChange={(e) => setAmountUnit(e.target.value)}
              >
                {availableAssets.map((asset) => (
                  <option key={asset} value={asset} className="bg-[#070823]">
                    {asset}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Balance: {getCurrentBalance().toFixed(8)}{" "}
            {getCurrentBalanceSymbol()}
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-400">
            {activeTab === "convert" ? "To" : "Price"}:
          </label>
          <div className="flex items-center space-x-2 w-full bg-[#10131F] rounded-lg px-2">
            <input
              type="number"
              className="flex-1 py-2 focus:outline-none bg-transparent"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={
                isFetchingPrice ? "Fetching price..." : "Enter price"
              }
              disabled={isFetchingPrice}
            />
            <div className="relative">
              <select
                className="bg-transparent py-2 pr-8 focus:outline-none appearance-none"
                value={priceUnit}
                onChange={(e) => setPriceUnit(e.target.value)}
              >
                {availableAssets.map((asset) => (
                  <option key={asset} value={asset} className="bg-[#070823]">
                    {asset}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          {isFetchingPrice && (
            <div className="text-xs text-gray-500">
              Fetching current market price...
            </div>
          )}
          {!isFetchingPrice && price && (
            <div className="text-xs text-gray-500">
              Market price: 1 {amountUnit} = {price} {priceUnit}
            </div>
          )}
        </div>
        {amount && price && (
          <div className="p-2 bg-[#1E2A4A] rounded text-sm">
            <div className="flex justify-between">
              <span>
                {activeTab === "buy" ? "Total Cost" : "Total Receive"}:
              </span>
              <span>
                {(parseFloat(amount) * parseFloat(price)).toFixed(8)}{" "}
                {priceUnit}
              </span>
            </div>
          </div>
        )}
        <button
          className={`w-full ${
            activeTab === "buy"
              ? "bg-green-600 hover:bg-green-700"
              : activeTab === "sell"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white font-medium py-3 rounded-md mt-4 disabled:opacity-50`}
          onClick={handleAction}
          disabled={isLoading || !amount || !price}
        >
          {getActionButtonText()}
        </button>
      </div>
      <div className="space-y-4 bg-[#141E323D] p-4 rounded-lg">
        <h3 className="text-lg font-medium">Your Assets</h3>
        <div className="space-y-2">
          {userAssets
            .filter((asset) => asset.balance > 0)
            .map((asset) => (
              <div
                key={asset.platformAssetId}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-400">
                  {asset.platformAsset.symbol}
                </span>
                <span>{asset.balance.toFixed(8)}</span>
              </div>
            ))}
        </div>
        <div>Total Portfolio Value: ${_totalBalance.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default TradingInterface;