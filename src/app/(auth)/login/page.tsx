import LoginForm from "@/app/Auth content/LoginForm";
import { Suspense } from "react";

export default function Login() {
    return(
       <div className="sm:bg-[#E8E8E8] bg-white w-full min-h-screen p-4">
        <Suspense>
        <LoginForm/>
        </Suspense>
        </div>
    )
}