import BuyNav from "@/app/DashboardComp/BuyNav";
import ApeaxonP2P from "@/app/DashboardComp/P2pContent";

export default function P2p(){
    return(
        <div className="">
            <div>
               <div className="md:-ml-50 ml-0 mt-20">
               <BuyNav/>
               </div >
                <ApeaxonP2P/>
            </div>
        </div>
    )
}