
import Chart from "@/app/DashboardComp/Chart"
import CoinTable from "@/app/DashboardComp/CoinTable"
import Navbar from "@/app/DashboardComp/Navbar"
import SiderBar from "@/app/DashboardComp/SiderBar"
import WalletConnect from "@/app/DashboardComp/WalletConnect"

export default function Dashboard(){
  return(
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex flex-1">
        <SiderBar />
        <main className="flex flex-1 flex-col p-2 sm:p-6">
          <div className="flex w-full gap-3">
            <Chart />
            <WalletConnect />
          </div>
          <CoinTable/>
        </main>
       
      </div>
    </div>
  )
}