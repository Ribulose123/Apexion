
import Chart from "@/app/DashboardComp/Chart"
import CoinTable from "@/app/DashboardComp/CoinTable"
import Footer from "@/app/DashboardComp/Footer"
import WalletConnect from "@/app/DashboardComp/WalletConnect"

export default function Dashboard(){
  return(
    <main className="flex flex-1 flex-col p-2 sm:p-6 md:mt-14 mt-20 w-full">
    <div className="flex w-full gap-3">
      <Chart />
      <div className="hidden sm:block">
      <WalletConnect />
      </div>
    </div>
    <CoinTable/>
    <div className="sm:hidden block">
    <WalletConnect />
    </div>

    <Footer/>
  </main>
  )
}


