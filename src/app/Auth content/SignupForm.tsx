'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '../config/api';


interface FormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    referralCode?: string;
    agreeToTerms: boolean;
}

/* interface SignupFormProps {
    onNext?: (data: FormData) => void;
} */

const SignupForm: React.FC = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { 
        register, 
        handleSubmit, 
        watch,
        formState: { errors } 
    } = useForm<FormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            referralCode: '',
            agreeToTerms: false
        }
    });

    const password = watch('password');

    

      console.log('Submitting to:', API_ENDPOINTS.AUTH.REGISTER);
    const onSubmit = async (data: FormData) => {

        const trimmedData ={
            ...data,
            email: data.email.trim(),
        fullName: data.fullName.trim(),
        password:data.password.trim(),
         confirmPassword:data.confirmPassword.trim(),
        referralCode: data.referralCode ? data.referralCode.trim() : '',
            
        }

        if (!trimmedData.agreeToTerms) {
            toast.error("You must agree to the terms and conditions.");
            return;
        }

        if (trimmedData.password !== trimmedData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        console.log('Registration Data:',{
            fullName: trimmedData.fullName,
            email: trimmedData.email,
            password: trimmedData.password,
            confirmPassword: trimmedData.confirmPassword,
            referralCode: trimmedData.referralCode
        });
        

        setIsSubmitting(true);
        try {
            const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token') || ''}`
                }, 
                body: JSON.stringify({
                    fullName: data.fullName,
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                    referralCode: data.referralCode || undefined
                })
            });

            const result = await response.json();
             console.log("Server response:", result);
            if (!response.ok) {
            // Handle case where email exists but unverified
                if(response.status ===400){
                    router.push('/emailverfi')
                }
                throw new Error(result.message || 'Registration failed');
            }
        
      
            if (response.ok) {
               router.push(`/emailverfi?email=${encodeURIComponent(data.email || '')}`)
            } else {
                toast.success('Registration successful! Please log in.');
                router.push('/login');
            }
        } catch (error: unknown) {
            let errorMessage = 'An error occurred during registration';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center px-4 py-6 ">
            <div className="bg-white rounded-lg sm:shadow-md w-full max-w-md p-6 md:p-8">
                <h1 className="text-2xl text-black font-semibold text-start sm:text-center mb-8">Sign up with</h1>
                
                {/* Social Sign-up Options */}
                <div className="flex gap-3 mb-6 w-full flex-col sm:flex-row sm:items-center justify-center">
                    {/* Social Buttons */}
                    <div className="flex gap-3 items-center justify-center">
                        <button type="button" className="flex justify-center items-center border border-gray-200 rounded-full w-10 h-10 hover:bg-gray-50">
                            <Image src="/img/facebook.png" alt="facebook" width={16} height={16} />
                        </button>

                        <button type="button" className="flex justify-center items-center border border-gray-200 rounded-full w-10 h-10 hover:bg-gray-50">
                            <Image src="/img/apple.png" alt="apple" width={16} height={16} />
                        </button>

                        <button type="button" className="flex justify-center items-center border border-gray-200 rounded-full w-10 h-10 hover:bg-gray-50">
                            <Image src="/img/search.png" alt="Google" width={16} height={16} />
                        </button>
                    </div>

                    {/* Wallet Connect */}
                    <div className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 flex sm:items-center gap-2 sm:gap-4 justify-between w-[70%]">
                        <span className="text-xs text-gray-500">Connect wallet</span>
                        <div className="flex space-x-1">
                            <button type="button">
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <Image src='/img/meta.webp' alt='meta' width={15} height={10}/>
                                </div>
                            </button>
                            <button type="button">
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <Image src='/img/tonkeeper.png' alt='tonkeeper' width={15} height={10}/>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-center mb-6">
                    <div className="flex-1 border-t-2 border-[#E2E6F9]"></div>
                    <span className="px-4 text-sm text-[#01040F]">or via</span>
                    <div className="flex-1 border-t-2 border-[#E2E6F9]"></div>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Full Name Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className={`w-full px-4 py-2 border ${errors.fullName ? 'border-red-500' : 'border-[#E2E6F9]'} rounded focus:outline-none placeholder:text-[#797A80] placeholder:text-[15px] text-black`}
                            {...register('fullName', { 
                                required: 'Full name is required',
                                minLength: {
                                    value: 3,
                                    message: 'Full name must be at least 3 characters'
                                }
                            })}
                        />
                        {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
                    </div>
                    
                    {/* Email Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Email"
                            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-[#E2E6F9]'} rounded focus:outline-none placeholder:text-[#797A80] placeholder:text-[15px] text-black`}
                            {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                    
                    {/* Password Input */}
                    <div className="mb-4 relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-[#E2E6F9]'} rounded focus:outline-none placeholder:text-[#797A80] placeholder:text-[15px] text-black`}
                            {...register('password', { 
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                }
                            })}
                        />
                        <button 
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <IoMdEye size={18} /> : <IoMdEyeOff size={18} />}
                        </button>
                        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                    </div>
                    
                    {/* Confirm Password Input */}
                    <div className="mb-4 relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-[#E2E6F9]'} rounded focus:outline-none placeholder:text-[#797A80] placeholder:text-[15px] text-black`}
                            {...register('confirmPassword', { 
                                required: 'Please confirm your password',
                                validate: value => value === password || 'Passwords do not match'
                            })}
                        />
                        <button 
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <IoMdEye size={18} /> : <IoMdEyeOff size={18} />}
                        </button>
                        {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
                    </div>
                    
                    {/* Referral Code */}
                    <div className="mb-6">
                        <label className="text-sm text-gray-600 flex items-center">
                            Referral code 
                        </label>
                        <input
                            type="text"
                            placeholder="Enter referral code (Case Sensitive)"
                            className="w-full px-4 py-2 border border-[#E2E6F9] rounded focus:outline-none placeholder:text-[#797A80] placeholder:text-[15px]"
                            {...register('referralCode')}
                        />
                    </div>
                    
                    {/* Terms Agreement */}
                    <div className="mb-6">
                        <label className="flex items-start">
                            <input
                                type="checkbox"
                                className={`mt-1 ${errors.agreeToTerms ? 'border-red-500' : ''}`}
                                {...register('agreeToTerms', { required: 'You must agree to the terms' })}
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                I agree to the <Link href="#" className="text-blue-600 hover:underline">User Agreement</Link> and <Link href="/policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                            </span>
                        </label>
                        {errors.agreeToTerms && <p className="mt-1 text-xs text-red-500">{errors.agreeToTerms.message}</p>}
                    </div>
                    
                    {/* Create Account Button */}
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-[#439A86] text-white rounded-2xl hover:bg-teal-600 transition-colors disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                
                {/* Login Link */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export default SignupForm;