import Footer from "@/app/DashboardComp/Footer"
import PoolGrid from "@/app/DashboardComp/PoolCard"
import StakingWallet from "@/app/DashboardComp/StakingWallet"
export default function Staking (){
    return(
        <div className="flex flex-1 flex-col p-2 sm:p-4 mt-14">
            <div className="mt-">
                <StakingWallet/>
                <PoolGrid/>
            </div>
            <Footer/>
        </div>
    )
}