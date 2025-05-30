import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserData {
  email: string;
}

interface FinalizeSignUpProps {
  userData: UserData;
}

const FinalizeSignUp: React.FC<FinalizeSignUpProps> = ({ userData }) => {
  const router = useRouter();

  const handleGoToDashboard = () => {
    try {
      // You could add any final validation here if needed
      if (!userData?.email) {
        throw new Error("Missing user data - please sign up again");
      }
      
      // Optional: You might want to store userData in context/state/store here
      
      router.push("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to proceed to dashboard");
      console.error("Navigation error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
       
        <p className="text-gray-600 mb-6">
          Your account with {userData.email} has been successfully created.
        </p>
        
        <button
          onClick={handleGoToDashboard}
          className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go to Dashboard
        </button>
        
        <p className="mt-4 text-sm text-gray-500">
          You&#39;ll be redirected automatically in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default FinalizeSignUp;