"use client";
import React, { useState, useEffect } from "react";
import { useWithdrawal } from "@/app/hooks/useWithdrawal";
import WithdrawalAddress from "./WithdrawalAddress";
import WithdrawalTips from "./WithdrawalTips";
import DepositFAQ from "@/app/components/components-deposit/crypto-deposit/DepositFAQ";
import { API_ENDPOINTS } from "@/app/config/api";
import { DateRange, TransactionType, WithdrawalRequest, WithdrawalType } from "@/app/data/data";
import WithdrawalStatusDemo from "@/app/modals/WithdrawalStatusModal";
import WithdrwalHistory from "./WithdrwalHistory";
import WithdrawalTypeSelector from "./WithdrawalTypeSelector";

const CryptoWithdraw = () => {
  const {
    withdrawalHistory,
    dateRange,
    totalPages,
    currentPage,
    isLoadingHistory,
    error: useDepositDataError,
    setDateRange,
    fetchDepositHistory,
    setCurrentPage,
    getUserIdFromToken,
  } = useWithdrawal();

  const [showDepositStatusModal, setShowDepositStatusModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<
    "approved" | "pending" | "failed"
  >("pending");
  const [isSubmittingDeposit, setIsSubmittingDeposit] = useState(false);
  const [depositSubmissionError, setDepositSubmissionError] = useState<
    string | null
  >(null);
  const [submittedAmount, setSubmittedAmount] = useState<number | undefined>(
    undefined
  );
  const [transactionStatusFilter, setTransactionStatusFilter] =
    useState<string>("all");
  const [selectedHistoryCoinId, setSelectedHistoryCoinId] =
    useState<string>("all");
  const [withdrawalType, setWithdrawalType] = useState<WithdrawalType>(
    WithdrawalType.CRYPTO
  );

  const handleNextClick = async (
    amount: number,
    destinationAddress?: string
  ) => {
    if (amount <= 0) {
      setDepositSubmissionError("Please enter a valid amount");
      return;
    }

    // For crypto, ensure we have required fields
    if (
      withdrawalType === WithdrawalType.CRYPTO &&
      !destinationAddress
    ) {
      setDepositSubmissionError(
        "Please enter a destination address for crypto withdrawal"
      );
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
      const withdrawalData: WithdrawalRequest = {
        userId: getUserIdFromToken(),
        amount: amount,
        type: TransactionType.WITHDRAWAL,
        withdrawalMethod: withdrawalType,
      };

      // Add type-specific data
      if (withdrawalType === WithdrawalType.CRYPTO) {
        withdrawalData.destinationAddress = destinationAddress;
      } else if (withdrawalType === WithdrawalType.BANK_TRANSFER) {
        withdrawalData.bankDetails = {
          bankName: "Bank of America",
          accountNumber: "1234",
        };
      } else if (withdrawalType === WithdrawalType.PAYPAL) {
        withdrawalData.paypalEmail = "user@example.com";
      }

      const response = await fetch(
        API_ENDPOINTS.TRANSACTION.CREATE_TRANCSACTION,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(withdrawalData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Withdrawal failed: ${response.status}`
        );
      }

      setSubmittedAmount(amount);
      setModalStatus("approved");
      setShowDepositStatusModal(true);

      // Re-fetch history after a successful withdrawal
      fetchDepositHistory(
        currentPage,
        10,
        TransactionType.WITHDRAWAL,
        transactionStatusFilter,
        selectedHistoryCoinId
      );
    } catch (err: unknown) {
      console.error("Withdrawal failed:", err);
      setModalStatus("failed");
      setDepositSubmissionError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setShowDepositStatusModal(true);
    } finally {
      setIsSubmittingDeposit(false);
    }
  };

  const handleCloseModal = () => {
    setShowDepositStatusModal(false);
    setSubmittedAmount(undefined);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchDepositHistory(
      page,
      5,
      TransactionType.WITHDRAWAL,
      transactionStatusFilter,
      selectedHistoryCoinId
    );
  };

  const handleFilterCoinChange = (coinId: string) => {
    setSelectedHistoryCoinId(coinId);
    setCurrentPage(1);
    fetchDepositHistory(
      1, // Fetch page 1
      5,
      TransactionType.WITHDRAWAL,
      transactionStatusFilter,
      coinId // Pass the selected coinId
    );
  };

  const handleTransactionStatusFilterChange = (status: string) => {
    setTransactionStatusFilter(status);
    setCurrentPage(1);
    fetchDepositHistory(
      1, // Fetch page 1
      5,
      TransactionType.WITHDRAWAL,
      status,
      selectedHistoryCoinId
    );
  };

  const handleDateRangeChange = (field: keyof DateRange, value: string) => {
    setDateRange((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  // This useEffect will now correctly re-fetch history whenever filters or page change
  useEffect(() => {
    fetchDepositHistory(
      currentPage,
      10,
      TransactionType.WITHDRAWAL,
      transactionStatusFilter,
      selectedHistoryCoinId
    );
  }, [
    currentPage,
    dateRange,
    transactionStatusFilter,
    selectedHistoryCoinId,
    fetchDepositHistory,
  ]);

  return (
    <div className="text-gray-200 min-h-screen w-full">
      {useDepositDataError && (
        <div className="bg-red-600 text-white p-3 mb-4 rounded">
          {useDepositDataError}
        </div>
      )}
      {depositSubmissionError && (
        <div className="bg-red-600 text-white p-3 mb-4 rounded">
          {depositSubmissionError}
        </div>
      )}

      <div className="w-full max-w-6xl mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-7 bg-gradient-to-t from-[rgba(20,30,50,0.0576)] to-[rgba(61,70,104,0.24)] rounded-xl p-4 sm:p-6 border border-[#439A8633]">
            <WithdrawalTypeSelector
              selectedType={withdrawalType}
              onTypeChange={setWithdrawalType}
            />

            <WithdrawalAddress
              withdrawalAddress=""
              selectedCoin={null}
              withdrawalType={withdrawalType}
              onNext={handleNextClick}
              isSubmitting={isSubmittingDeposit}
              isLoading={false}
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
            selectedCoin=""
            dateRange={dateRange}
            isLoading={isLoadingHistory}
            totalPages={totalPages}
            currentPage={currentPage}
            onDateRangeChange={handleDateRangeChange}
            onFilterCoinChange={handleFilterCoinChange}
            currentStatusFilter={transactionStatusFilter}
            onStatusFilterChange={handleTransactionStatusFilterChange}
            onPageChange={handlePageChange}
            allCoins={[]}
            selectedHistoryCoinId={selectedHistoryCoinId}
          />
        </div>
      </div>
      {showDepositStatusModal && (
        <WithdrawalStatusDemo
          status={modalStatus}
          onClose={handleCloseModal}
          amount={submittedAmount}
        />
      )}
    </div>
  );
};

export default CryptoWithdraw;