"use client";
import React, { useState, useEffect } from "react";
import { useWithdrawal } from "@/app/hooks/useWithdrawal";
import CoinSelector from "@/app/components/components-deposit/crypto-deposit/CoinSelector";
import NetworkSelector from "@/app/components/components-deposit/crypto-deposit/NetworkSelector";
import WithdrawalAddress from "./WithdrawalAddress";
import WithdrawalTips from "./WithdrawalTips";
import DepositFAQ from "@/app/components/components-deposit/crypto-deposit/DepositFAQ";
import { API_ENDPOINTS } from "@/app/config/api";
import { DateRange, TransactionType, WithdrawalType } from "@/app/data/data";
import WithdrawalStatusDemo from "@/app/modals/WithdrawalStatusModal";
import WithdrwalHistory from "./WithdrwalHistory";
import WithdrawalTypeSelector from "./WithdrawalTypeSelector";
import DepositRequiredModal from "@/app/modals/DepositRequiredModal";
import PasscodeModal from "@/app/modals/PasscodeModal";
import { useRouter } from "next/navigation";


interface WithdrawalRequestData {
  userId: string | null;
  amount: number;
  type: TransactionType;
  withdrawal: {
    type: string;
    details: string;
  };
  platformAssetId?: string;
  passcode?: string;
}

const CryptoWithdraw = () => {
  const {
    coins,
    networks,
    withdrawalHistory,
    selectedCoin,
    selectedNetwork,
    depositAddress,
    dateRange,
    totalPages,
    currentPage,
    isLoadingCoins,
    isLoadingAddress,
    isLoadingHistory,
    error: useDepositDataError,
    setSelectedCoin,
    setSelectedNetwork,
    setDateRange,
    fetchDepositHistory,
    setCurrentPage,
    getUserIdFromToken,
    userData,
    isLoadingUser,
  } = useWithdrawal();

  const [showDepositStatusModal, setShowDepositStatusModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<"approved" | "pending" | "failed">("pending");
  const [isSubmittingDeposit, setIsSubmittingDeposit] = useState(false);
  const [depositSubmissionError, setDepositSubmissionError] = useState<string | null>(null);
  const [submittedAmount, setSubmittedAmount] = useState<number | undefined>(undefined);
  const [transactionStatusFilter, setTransactionStatusFilter] = useState<string>("all");
  const [selectedHistoryCoinId, setSelectedHistoryCoinId] = useState<string>("all");
  const [withdrawalType, setWithdrawalType] = useState<WithdrawalType>(WithdrawalType.CRYPTO);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);

  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    accountName: ""
  });
  const [paypalAccount, setPaypalAccount] = useState("");
  const [cashappTag, setCashappTag] = useState("");
  const [gcashDetails, setGcashDetails] = useState({
    accountNumber: "",
    accountName: ""
  });

  const router = useRouter();

  const handleShowDepositModal = () => {
    setShowDepositModal(true);
    const timer = setTimeout(() => {
      setShowDepositModal(false);
      router.push("/deposit");
    }, 3000);
    return () => clearTimeout(timer);
  };

  const handleNextClick = async (amount: number, destinationAddress?: string) => {
    console.log("handleNextClick called with:", { amount, userData });
    
    if (amount <= 0) {
      setDepositSubmissionError("Please enter a valid amount");
      return;
    }

    if (userData) {
      console.log("User withdrawalType:", userData.withdrawalType);
      
      if (userData.withdrawalType === "AUTO") {
      
        await processWithdrawal(amount, destinationAddress);
        return;
      } else if (userData.withdrawalType === "DEPOSIT") {
       
        setSubmittedAmount(amount);
        setShowDepositModal(true);
        return;
      } else if (userData.withdrawalType === "PASSCODE") {
      
        setSubmittedAmount(amount);
        setShowPasscodeModal(true);
        return;
      }
    }

    await processWithdrawal(amount, destinationAddress);
  };

  const processWithdrawal = async (amount: number, destinationAddress?: string, passcode?: string) => {
    if (withdrawalType === WithdrawalType.CRYPTO && (!selectedCoin || !destinationAddress)) {
      setDepositSubmissionError("Please fill all required fields for crypto withdrawal");
      return;
    }

    if (withdrawalType === WithdrawalType.BANK_TRANSFER && (!bankDetails.bankName || !bankDetails.accountNumber)) {
      setDepositSubmissionError("Please fill all required bank details");
      return;
    }

    if (withdrawalType === WithdrawalType.PAYPAL && !paypalAccount) {
      setDepositSubmissionError("Please enter your PayPal account");
      return;
    }

    if (withdrawalType === WithdrawalType.CASHAPP && !cashappTag) {
      setDepositSubmissionError("Please enter your CashApp tag");
      return;
    }

    if (withdrawalType === WithdrawalType.GCASH && (!gcashDetails.accountNumber || !gcashDetails.accountName)) {
      setDepositSubmissionError("Please fill all required GCash details");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setDepositSubmissionError("Authentication token not found");
      return;
    }

    setIsSubmittingDeposit(true);
    setDepositSubmissionError(null);

    try {
      let withdrawalDetails = { type: '', details: '' };

      switch (withdrawalType) {
        case WithdrawalType.CRYPTO:
          withdrawalDetails = {
            type: 'crypto',
            details: `Withdrawal to ${selectedCoin?.symbol} address: ${destinationAddress?.substring(0, 15)}...`
          };
          break;
        case WithdrawalType.BANK_TRANSFER:
          withdrawalDetails = {
            type: 'bank_transfer',
            details: `Withdrawal to ${bankDetails.bankName} account ending in ${bankDetails.accountNumber.slice(-4)}`
          };
          break;
        case WithdrawalType.PAYPAL:
          withdrawalDetails = {
            type: 'paypal',
            details: `Withdrawal to PayPal account: ${paypalAccount}`
          };
          break;
        case WithdrawalType.CASHAPP:
          withdrawalDetails = {
            type: 'cashapp',
            details: `Withdrawal to CashApp tag: ${cashappTag}`
          };
          break;
        case WithdrawalType.GCASH:
          withdrawalDetails = {
            type: 'gcash',
            details: `Withdrawal to GCash account: ${gcashDetails.accountNumber}`
          };
          break;
        default:
          withdrawalDetails = { type: 'other', details: `Withdrawal request` };
      }

      const withdrawalData: WithdrawalRequestData = {
        userId: getUserIdFromToken(),
        amount: amount,
        type: TransactionType.WITHDRAWAL,
        withdrawal: withdrawalDetails,
      };

      if (withdrawalType === WithdrawalType.CRYPTO && selectedCoin) {
        withdrawalData.platformAssetId = selectedCoin.id;
      }

      if (passcode) {
        withdrawalData.passcode = passcode;
      }

      console.log("Sending withdrawal request:", withdrawalData);

      const response = await fetch(API_ENDPOINTS.TRANSACTION.CREATE_TRANCSACTION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(withdrawalData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Withdrawal failed: ${response.status}`);
      }

      setModalStatus("approved");
      setShowDepositStatusModal(true);

      fetchDepositHistory(currentPage, 10, TransactionType.WITHDRAWAL, transactionStatusFilter, selectedHistoryCoinId);
    } catch (err: unknown) {
      console.error("Withdrawal failed:", err);
      setModalStatus("failed");
      setDepositSubmissionError(err instanceof Error ? err.message : "An unexpected error occurred");
      setShowDepositStatusModal(true);
    } finally {
      setIsSubmittingDeposit(false);
    }
  };

  const handlePasscodeSubmit = (passcode: string) => {
    setShowPasscodeModal(false);
    processWithdrawal(submittedAmount!, undefined, passcode);
  };

  const handleCloseModal = () => {
    setShowDepositStatusModal(false);
    setSubmittedAmount(undefined);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchDepositHistory(page, 5, TransactionType.WITHDRAWAL, transactionStatusFilter, selectedHistoryCoinId);
  };

  const handleFilterCoinChange = (coinId: string) => {
    setSelectedHistoryCoinId(coinId);
    setCurrentPage(1);
    fetchDepositHistory(1, 5, TransactionType.WITHDRAWAL, transactionStatusFilter, coinId);
  };

  const handleTransactionStatusFilterChange = (status: string) => {
    setTransactionStatusFilter(status);
    setCurrentPage(1);
    fetchDepositHistory(1, 5, TransactionType.WITHDRAWAL, status, selectedHistoryCoinId);
  };

  const handleDateRangeChange = (field: keyof DateRange, value: string) => {
    setDateRange((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleBankDetailChange = (field: "bankName" | "accountNumber" | "accountName", value: string) => {
    setBankDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleGcashDetailChange = (field: "accountNumber" | "accountName", value: string) => {
    setGcashDetails(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    fetchDepositHistory(currentPage, 10, TransactionType.WITHDRAWAL, transactionStatusFilter, selectedHistoryCoinId);
  }, [currentPage, dateRange, transactionStatusFilter, selectedHistoryCoinId, fetchDepositHistory]);

  const handleNavigateToDeposit = () => {
    setShowDepositModal(false);
    router.push("/deposit");
  };

  return (
    <div className="text-gray-200 min-h-screen w-full">
      {useDepositDataError && (
        <div className="bg-red-600 text-white p-3 mb-4 rounded">{useDepositDataError}</div>
      )}
      {depositSubmissionError && (
        <div className="bg-red-600 text-white p-3 mb-4 rounded">{depositSubmissionError}</div>
      )}

      {isLoadingUser && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-7 bg-gradient-to-t from-[rgba(20,30,50,0.0576)] to-[rgba(61,70,104,0.24)] rounded-xl p-4 sm:p-6 border border-[#439A8633]">
            <WithdrawalTypeSelector selectedType={withdrawalType} onTypeChange={setWithdrawalType} />

            {withdrawalType === WithdrawalType.CRYPTO && (
              <>
                <CoinSelector coins={coins} selectedCoin={selectedCoin} isloading={isLoadingCoins} onSelctCoin={setSelectedCoin} />
                <NetworkSelector networks={networks} selectedCoin={selectedCoin} selectedNetwork={selectedNetwork} isLoading={isLoadingCoins} onSelect={setSelectedNetwork} />
              </>
            )}
            <WithdrawalAddress
              withdrawalAddress={depositAddress}
              selectedCoin={selectedCoin}
              withdrawalType={withdrawalType}
              onNext={handleNextClick}
              isSubmitting={isSubmittingDeposit}
              isLoading={isLoadingAddress}
              userData={userData}
              onShowDepositModal={handleShowDepositModal}
              bankDetails={bankDetails}
              paypalAccount={paypalAccount}
              cashappTag={cashappTag}
              gcashDetails={gcashDetails}
              onBankDetailChange={handleBankDetailChange}
              onPaypalAccountChange={setPaypalAccount}
              onCashappTagChange={setCashappTag}
              onGcashDetailChange={handleGcashDetailChange}
            />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <WithdrawalTips />
            <DepositFAQ />
          </div>
        </div>

        <div>
          <WithdrwalHistory
            withdrawalHistory={withdrawalHistory}
            selectedCoin={selectedCoin ? selectedCoin.id : ""}
            dateRange={dateRange}
            isLoading={isLoadingHistory}
            totalPages={totalPages}
            currentPage={currentPage}
            onDateRangeChange={handleDateRangeChange}
            onFilterCoinChange={handleFilterCoinChange}
            currentStatusFilter={transactionStatusFilter}
            onStatusFilterChange={handleTransactionStatusFilterChange}
            onPageChange={handlePageChange}
            allCoins={coins}
            selectedHistoryCoinId={selectedHistoryCoinId}
          />
        </div>
      </div>

      <DepositRequiredModal
        isOpen={showDepositModal}
        onNavigateToDeposit={handleNavigateToDeposit}
        amount={submittedAmount}
        withdrawalPercentage={userData?.withdrawalPercentage || 0}
        selectedCoin={selectedCoin}
      />

      <PasscodeModal
        isOpen={showPasscodeModal}
        onClose={() => setShowPasscodeModal(false)}
        onSubmit={handlePasscodeSubmit}
      />

      {showDepositStatusModal && selectedCoin && (
        <WithdrawalStatusDemo
          status={modalStatus}
          onClose={handleCloseModal}
          amount={submittedAmount}
          selectedCoin={selectedCoin}
        />
      )}
    </div>
  );
};

export default CryptoWithdraw;