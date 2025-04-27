"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

type FormValues = {
  password: string;
  confirmPassword: string;
};

const NewPassword1 = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (date: FormValues) => {
    console.log(date);
    // Handle form submission logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="min-h-screen text-white px-6 py-8 md:px-10">
      <div className="p-4 flex items-center -ml-3">
        <button
          onClick={() => router.back()}
          className=" text-gray-400 hover:text-white   md:block hidden"
        >
          <ArrowLeft className=" mr-1 " size={30} />
        </button>
        <h1 className="text-2xl sm:text-4xl font-semibold text-[#E8E8E8]">
          Set Login Password
        </h1>
      </div>

      <form action="" className="space-y-5 max-w-md">
        <div >
          <label className="text-sm mb-1 block">New password</label>
          <div className="relative w-full max-w-4xl">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Please enter new password..."
              className="w-full max-w-4xl bg-transparent text-sm text-white placeholder-gray-500 md:placeholder:ml-0 placeholder:-ml-60 border border-[#141E32] rounded px-2 md:px-3 py-2 pr-20 outline-none relative"
              {...register("password", {
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
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm mb-1 block">Confirm new password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Please enter your new password again..."
              className="w-full bg-transparent text-sm text-white placeholder-gray-500 border border-[#141E32] rounded px-3 py-2 pr-10 outline-none"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: (value) => value === watch('password') || "Passwords don't match"
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
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#439A86] transition text-white py-2 rounded text-sm font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPassword1;
