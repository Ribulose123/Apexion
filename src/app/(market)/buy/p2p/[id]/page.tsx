import TopTraders from "@/app/components/TopTraders";
import BuyNav from "@/app/DashboardComp/BuyNav";

export default function P2pId(){

    return(
        <div className="flex flex-1 flex-col mt-14 p-2 sm:p-4">
            <div>
            <div className="md:-ml-60 ml-0 mt-10">
               <BuyNav/>
               </div >
                <TopTraders />
            </div>
        </div>
    )
}