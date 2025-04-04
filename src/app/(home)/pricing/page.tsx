import CoinPricing from "../../Content/CoinPricing";

export default function PricingPage() {
    return(
        <div className="crypto-layout">
            <h2 className="text-center mt-10 sm:text-[60px] text-[30px] capitalize">cryptocurrency prices today</h2>

            <div>
                <CoinPricing/>
            </div>
        </div>
    )
}