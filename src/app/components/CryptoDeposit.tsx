// src/app/components/CryptoDeposit.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { useDepositData } from '../hooks/useDepositData';
import CoinSelector from "./components-deposit/crypto-deposit/CoinSelector";
import DepositAddress from "./components-deposit/crypto-deposit/DepositAddress";
import DepositFAQ from "./components-deposit/crypto-deposit/DepositFAQ";
import DepositHistoryComponent from "./components-deposit/crypto-deposit/DepositHistoryComponent";
import DepositTips from "./components-deposit/crypto-deposit/DepositTips";
import NetworkSelector from "./components-deposit/crypto-deposit/NetworkSelector";
import DepositStatusModal from '../modals/DepositApprovedModal';
import { API_ENDPOINTS } from '../config/api';
import { DateRange, TransactionType } from '../data/data';

const CryptoDeposit = () => {
    const {
        coins,
        networks,
        depositHistory,
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
    } = useDepositData();

    const [showDepositStatusModal, setShowDepositStatusModal] = useState(false);
    const [modalStatus, setModalStatus] = useState<'approved' | 'pending' | 'failed'>('pending');
    const [isSubmittingDeposit, setIsSubmittingDeposit] = useState(false);
    const [depositSubmissionError, setDepositSubmissionError] = useState<string | null>(null);
    const [submittedAmount, setSubmittedAmount] = useState<number | undefined>(undefined);
    const [transactionStatusFilter, setTransactionStatusFilter] = useState<string>('all');
    const [selectedHistoryCoinId, setSelectedHistoryCoinId] = useState<string>('all'); // State for history coin filter

    const handleNextClick = async (amount: number) => {
        if (!selectedCoin || !selectedNetwork || !depositAddress || amount <= 0) {
            setDepositSubmissionError("Please fill all required fields including amount");
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
            const response = await fetch(API_ENDPOINTS.TRANSACTION.CREATE_TRANCSACTION, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: getUserIdFromToken(),
                    platformAssetId: selectedCoin.id,
                    amount: amount,
                    type: TransactionType.DEPOSIT,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Deposit failed: ${response.status}`);
            }

            setSubmittedAmount(amount);
            setModalStatus('approved');
            setShowDepositStatusModal(true);
            
            // Re-fetch history after a successful deposit
            fetchDepositHistory(
                currentPage,
                10,
                TransactionType.DEPOSIT,
                transactionStatusFilter,
                selectedHistoryCoinId
            );
        } catch (err: unknown) {
            console.error("Deposit failed:", err);
            setModalStatus('failed');
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
            10,
            TransactionType.DEPOSIT,
            transactionStatusFilter,
            selectedHistoryCoinId
        );
    };

    const handleFilterCoinChange = (coinId: string) => {
        setSelectedHistoryCoinId(coinId);
        setCurrentPage(1); 
        fetchDepositHistory(
            1, // Fetch page 1
            10,
            TransactionType.DEPOSIT,
            transactionStatusFilter,
            coinId // Pass the selected coinId
        );
    };

    const handleTransactionStatusFilterChange = (status: string) => {
        setTransactionStatusFilter(status);
        setCurrentPage(1); 
        fetchDepositHistory(
            1, // Fetch page 1
            10,
            TransactionType.DEPOSIT,
            status,
            selectedHistoryCoinId
        );
    };

    const handleDateRangeChange = (field: keyof DateRange, value: string) => {
        setDateRange(prev => ({ ...prev, [field]: value }));
        setCurrentPage(1); 
      
    };

    // This useEffect will now correctly re-fetch history whenever filters or page change
    useEffect(() => {
        fetchDepositHistory(
            currentPage,
            10,
            TransactionType.DEPOSIT,
            transactionStatusFilter,
            selectedHistoryCoinId
        );
    }, [
        currentPage,
        dateRange, // This dependency correctly triggers when startDate/endDate change
        transactionStatusFilter,
        selectedHistoryCoinId,
        fetchDepositHistory // useCallback ensures stable reference
    ]);

    return (
        <div className="text-gray-200 min-h-screen w-full">
            <div className="w-full max-w-6xl mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4">
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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                    <div className="lg:col-span-7 bg-gradient-to-t from-[rgba(20,30,50,0.0576)] to-[rgba(61,70,104,0.24)] rounded-xl p-4 sm:p-6 border border-[#439A8633]">
                        <CoinSelector
                            coins={coins}
                            selectedCoin={selectedCoin}
                            isloading={isLoadingCoins}
                            onSelctCoin={setSelectedCoin}
                        />

                        <NetworkSelector
                            networks={networks}
                            selectedCoin={selectedCoin}
                            selectedNetwork={selectedNetwork}
                            isLoading={isLoadingCoins}
                            onSelect={setSelectedNetwork}
                        />

                        <DepositAddress
                            depositAddress={depositAddress}
                            selectedCoin={selectedCoin}
                            isLoading={isLoadingAddress}
                            onNext={handleNextClick}
                            isSubmitting={isSubmittingDeposit}
                        />
                    </div>

                    <div className="lg:col-span-5 space-y-4">
                        <DepositTips selectedCoin={selectedCoin} selectedNetwork={selectedNetwork} />
                        <DepositFAQ />
                    </div>
                </div>

                <DepositHistoryComponent
                    depositHistory={depositHistory}
                    selectedCoin={selectedCoin} 
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

            {showDepositStatusModal && (
                <DepositStatusModal
                    status={modalStatus}
                    onClose={handleCloseModal}
                    amount={submittedAmount}
                    selectedCoin={selectedCoin}
                />
            )}
        </div>
    );
};

export default CryptoDeposit;