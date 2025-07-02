"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ArrowLeft,CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINTS } from "../config/api";

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};



const NewPassword1 = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try{
      const token = localStorage.getItem('authToken');
      if(!token){
        throw new Error("Authentication token not found. Please log in again.")
      }

      const response = await fetch (API_ENDPOINTS.USER.USER_UPDATEPASSWORD,{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          confirmNewPassword: data.confirmNewPassword
        })
      })

      const result = await response.json()
      if(!response.ok){
            throw new Error(result.message || `Password update failed: ${response.status}`);
      }
        reset();
      setShowSuccessModal(true);
      
    }catch(error){
       toast.error(
        error instanceof Error ? error.message : "An error occurred"
      );
      console.error("Password update error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  

  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.push('/security/settings')
  };

  return (
    <div className="min-h-screen text-white px-6 py-8 md:px-10">
      <div className="p-4 flex items-center -ml-3">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white md:block hidden"
        >
          <ArrowLeft className="mr-1" size={30} />
        </button>
        <h1 className="text-2xl sm:text-4xl font-semibold text-[#E8E8E8]">
          Set Login Password
        </h1>
      </div>

      <form className="space-y-5 max-w-md" onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label className="text-sm mb-1 block">Current password</label>
          <div className="relative w-full max-w-4xl">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Please enter your current password..."
              className="w-full max-w-4xl bg-transparent text-sm text-white placeholder-gray-500 md:placeholder:ml-0 placeholder:-ml-60 border border-[#141E32] rounded px-2 md:px-3 py-2 pr-20 outline-none relative"
              {...register("oldPassword", {
                required: "Current password is required",
              })}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
              onClick={toggleCurrentPasswordVisibility}
            >
              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-red-400 text-xs mt-1">
              {errors.oldPassword.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm mb-1 block">New password</label>
          <div className="relative w-full max-w-4xl">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Please enter new password..."
              className="w-full max-w-4xl bg-transparent text-sm text-white placeholder-gray-500 md:placeholder:ml-0 placeholder:-ml-60 border border-[#141E32] rounded px-2 md:px-3 py-2 pr-20 outline-none relative"
              {...register("newPassword", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-400 text-xs mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        
        <div>
          <label className="text-sm mb-1 block">Confirm new password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Please enter your new password again..."
              className="w-full bg-transparent text-sm text-white placeholder-gray-500 border border-[#141E32] rounded px-3 py-2 pr-10 outline-none"
              {...register("confirmNewPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords don't match",
              })}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmNewPassword && (
            <p className="text-red-400 text-xs mt-1">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#439A86] transition text-white py-2 rounded text-sm font-medium disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Submit"}
        </button>
      </form>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-[#1a232f] rounded-lg p-6 max-w-md w-full border border-[#439A8633]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Password Updated</h3>
        </div>
        
        <div className="text-center py-4">
          <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
          <p className="text-gray-300 mb-4">
            Your password has been successfully updated!
          </p>
          <p className="text-sm text-gray-400">
            Your account is now secured with your new password.
          </p>
        </div>
        
        <button
          onClick={handleModalClose}
          className="w-full bg-[#439A86] text-white py-2 rounded text-sm font-medium hover:bg-[#3a8273] transition"
        >
          Continue
        </button>
      </div>
    </div>
      )}
    </div>
  );
};

export default NewPassword1;
