import Footer from "@/app/DashboardComp/Footer";
import Signalbar from "@/app/DashboardComp/Signalbar";
import SignalCard from "@/app/DashboardComp/SignalCard";

export default function signal(){
    return(
        <div className="flex flex-1 flex-col p-2 sm:p-4">
            <div>
                <Signalbar/>
                <SignalCard/>
            </div>
            <Footer/>
        </div>
    )
}