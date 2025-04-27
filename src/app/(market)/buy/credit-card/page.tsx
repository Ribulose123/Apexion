
import BuyNav from "@/app/DashboardComp/BuyNav";
import CryptoInterface from "@/app/DashboardComp/Credit";
export default function CreditCard(){
    return(
        <div className="flex flex-1 flex-col p-2 sm:p-4 md:-ml-10 min-h-screen">
        <div className="mt-20">
        <BuyNav/>
        <CryptoInterface/>
        </div>

    </div>
    )
}