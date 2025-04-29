'use client'

import React, { useEffect, useState } from 'react'
import { Clock } from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BuyNav = () => {
    const pathname = usePathname()
    const [activeNavTab, setActiveNavTab] = useState('credit-debit')
    
    useEffect(() => {
        if(pathname?.includes('/buy/credit-card')) setActiveNavTab('credit-debit')
        else if (pathname?.includes('/buy/p2p')) setActiveNavTab('p2p')
        else if (pathname?.includes('/buy/fast-otc')) setActiveNavTab('fast-otc')
        else if (pathname?.includes('/buy/quick-buy')) setActiveNavTab('quick-buy')
        else if (pathname?.includes('/buy/card')) setActiveNavTab('card')
        else if (pathname?.includes('/buy/third-party')) setActiveNavTab('third-party')
    }, [pathname])
    
    return (
        <nav className="mt-8">
            <div className="flex md:justify-evenly gap-3 items-center mb-6 md:-ml-10">
                <div className="flex space-x-3 md:space-x-6">
                    <Link href="/buy/credit-card"
                        className={`pb-2  ${activeNavTab === 'credit-debit' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'} hover:text-white transition-colors  text-[13px] sm:text-[18px]`}
                        onClick={() => setActiveNavTab('credit-debit')}
                    >
                        Credit/Debit card
                    </Link>
                    
                    <Link href="/buy/p2p"
                        className={`pb-2 ${activeNavTab === 'p2p' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'} hover:text-white transition-color  text-[13px] sm:text-[18px]s`}
                        onClick={() => setActiveNavTab('p2p')}
                    >
                        P2P trading
                    </Link>
                    
                    <Link href="/buy/fast-otc"
                        className={`pb-2 ${activeNavTab === 'fast-otc' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'} hover:text-white transition-colors  text-[13px] sm:text-[18px]`}
                        onClick={() => setActiveNavTab('fast-otc')}
                    >
                        Fast OTC
                    </Link>
                    
                    <Link href="/buy/quick-buy"
                        className={`pb-2 ${activeNavTab === 'quick-buy' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'} hover:text-white transition-colors  text-[13px] sm:text-[18px]`}
                        onClick={() => setActiveNavTab('quick-buy')}
                    >
                        Quick buy
                    </Link>
                    
                    <Link href="/buy/card"
                        className={`pb-2 ${activeNavTab === 'card' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'} hover:text-white transition-colors text-[13px] sm:text-[18px]`}
                        onClick={() => setActiveNavTab('card')}
                    >
                        Card
                    </Link>
                    
                  
                </div>
                
                <Link href="/transaction-history" className="flex items-center text-gray-400 hover:text-white transition-colors gap-2 -mt-3 sm:mt-0">
                    <Clock size={18} />
                   <p className='hidden sm:block'> Transaction History</p>
                </Link>
            </div>
        </nav>
    )
}

export default BuyNav