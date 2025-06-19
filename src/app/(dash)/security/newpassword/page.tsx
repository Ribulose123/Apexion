import { Suspense } from "react"
import NewPassword1 from "@/app/components/NewPassword"

export default function NewPassword(){
    return(
        <div className="flex-col p-2 sm:p-4 mt-14">
            
            <Suspense>
                <NewPassword1/>
            </Suspense>
        </div>
    )
}