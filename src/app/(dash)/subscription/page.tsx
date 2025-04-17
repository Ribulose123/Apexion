import Footer from "@/app/DashboardComp/Footer";
import SubGrid from "@/app/DashboardComp/SubCard";
import SubWallet from "@/app/DashboardComp/SubWallet";

export default function Subcription (){
    return(
        <div className="flex flex-1 flex-col p-2 sm:p-">
            <div>
                <SubWallet/>
                <SubGrid/>
            </div>
            <Footer/>
        </div>
    )
}