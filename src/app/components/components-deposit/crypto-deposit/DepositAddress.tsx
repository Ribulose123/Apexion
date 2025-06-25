import React, { useState } from 'react';
import Image from 'next/image';
import { Loader } from '@/app/ui/Loader';
import { CoinDepost } from '@/app/data/data';
import { Copy, Check, ChevronDown } from 'lucide-react';

interface DepositAddressProps {
    depositAddress: string;
    selectedCoin: CoinDepost | null;
    isLoading: boolean;
    onNext: (amount: number) => Promise<void>;
    isSubmitting: boolean;
}

const DepositAddress: React.FC<DepositAddressProps> = ({
    depositAddress,
    selectedCoin,
    isLoading,
    onNext,
    isSubmitting
}) => {
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [amount, setAmount] = useState<number | ''>('');
    const [amountError, setAmountError] = useState<string | null>(null);

    const handleCopyAddress = () => {
        if (depositAddress) {
            navigator.clipboard.writeText(depositAddress);
            setCopiedAddress(true);
            setTimeout(() => setCopiedAddress(false), 2000);
        }
    };

    const handleNextButtonClick = async () => {
        if (typeof amount !== 'number' || amount <= 0) {
            setAmountError("Please enter a valid amount greater than 0");
            return;
        }
        setAmountError(null);
        await onNext(amount);
    };

    return (
        <div className="text-white p-4 rounded-lg -ml-3">
            <div className="flex items-center mb-4">
                <div className="bg-[#439A86] text-white rounded-full w-7 h-7 flex items-center justify-center text-xs mr-2">
                    3
                </div>
                <h3 className="font-semibold text-[20px] text-[#E8E8E8]">Paste address</h3>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Loader />
                </div>
            ) : depositAddress ? (
                <div className="space-y-4">
                    <div className="flex flex-col space-x-4">
                        <div className='flex justfity-between md:flex-row flex-col md:items-center gap-6'>
                            <div className="w-24 h-24">
                                <Image
                                    src="/img/vaadin_qrcode.png"
                                    alt="QR Code"
                                    width={96}
                                    height={96}
                                    className="w-full h-full"
                                />
                            </div>
                            <div className=''>
                                <h3 className='text-[#E8E8E8]'>Deposit Address</h3>
                                <div className="rounded-lg p-5 border border-[#439A8633] flex justify-between items-center">
                                    <div className="text-[16px] text-[#E8E8E8] font-semibold truncate flex-grow">
                                        {depositAddress}
                                    </div>
                                    <button
                                        onClick={handleCopyAddress}
                                        className="ml-2 text-gray-400 hover:text-white"
                                        aria-label="Copy address"
                                    >
                                        {copiedAddress ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="deposit-amount" className="block text-[#E8E8E8] text-base font-semibold mb-2">
                                Amount to Deposit ({selectedCoin?.symbol || 'N/A'})
                            </label>
                            <input
                                type="number"
                                id="deposit-amount"
                                value={amount}
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    setAmount(isNaN(val) ? '' : val);
                                    if (amountError) setAmountError(null);
                                }}
                                placeholder={`Enter amount in ${selectedCoin?.symbol || 'USDT'}`}
                                min="0.00000001"
                                step="any"
                                className={`w-full p-3 rounded-lg bg-[#1a232f] text-white border ${amountError ? 'border-red-500' : 'border-[#439A8633]'} focus:outline-none focus:ring-1 focus:ring-teal-500`}
                            />
                            {amountError && (
                                <p className="text-red-400 text-sm mt-1">{amountError}</p>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7D8491]">Minimum Deposit</span>
                                    <span className='text-[#E8E8E8]'>
                                        {selectedCoin?.id === 'btc' ? '0.0001' : '0.00001'} {selectedCoin?.symbol || "USDT"}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7D8491]">Transfer To</span>
                                    <span className="flex items-center gap-1 text-[#E8E8E8]">
                                        Spot Account <ChevronDown size={13}/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleNextButtonClick}
                        disabled={isSubmitting || isLoading || !depositAddress || amount === '' || amount <= 0}
                        className="mt-4 mb-3 bg-[#439A86] hover:bg-[#3d665c] w-full p-2 flex items-center justify-center rounded-lg text-white"
                    >
                        {isSubmitting ? 'Submitting...' : 'Next'}
                    </button>
                </div>
            ) : (
                <div className="py-8 text-center text-gray-400">
                    Please select a coin and network first
                </div>
            )}
        </div>
    );
};

export default DepositAddress;