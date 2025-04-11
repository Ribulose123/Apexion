
import Chart from "@/app/DashboardComp/Chart"
import CoinTable from "@/app/DashboardComp/CoinTable"
import Footer from "@/app/DashboardComp/Footer"
import WalletConnect from "@/app/DashboardComp/WalletConnect"

export default function Dashboard(){
  return(
    <main className="flex flex-1 flex-col p-2 sm:p-6">
    <div className="flex w-full gap-3">
      <Chart />
      <WalletConnect />
    </div>
    <CoinTable/>

    <Footer/>
  </main>
  )
}


