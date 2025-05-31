import NewPassword1 from "@/app/components/NewPassword"
import { Suspense } from "react"
export default function NewPassword(){
    return(
        <div className="flex-col p-2 sm:p-4 mt-14">
            
            <Suspense fallback={<div>Loading...</div>}>
                <NewPassword1/>
        </Suspense>
        </div>
    )
}