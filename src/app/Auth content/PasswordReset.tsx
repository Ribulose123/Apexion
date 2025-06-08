"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../config/api';

interface FormData {
  newPassword: string;
  confirmPassword: string;
}
const PasswordReset = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const token = searchParams.get('token')

    const {register, handleSubmit, watch, formState:{errors}} = useForm<FormData>()

    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const onSubmit = async(data:FormData)=>{
        if(!email || token ){
            toast.error('Invalid Reset Link')
            return
        }
         if(data.newPassword !== data.confirmPassword){
            toast.error("Password don't match")
         }
        setIsSubmitting(true)
        try{
            const response = await fetch(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    email,
                    token,
                    newPassword: data.newPassword
                })
            })
             const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Password reset failed");
      }

      toast.success("Password reset successfully!");
      router.push("/login");
        }  catch (error) {
      toast.error(error instanceof Error && error.message || "Failed to reset password");
    } finally {
      setIsSubmitting(false);
    }
    }
  return (
   <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Reset Your Password
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords don't match",
                })}
                className="w-full px-3 py-2 mt-1 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colorsrounded-md shadow-sm "
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordReset
