"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  FaRegFrown,
  FaRegMeh,
  FaRegSmile,
  FaRegGrin,
  FaRegAngry,
  FaPlus,
} from "react-icons/fa";

type feedbackForm = {
  feedback: string;
  rating: number;
  file?: FileList;
  contact?: string;
};

const emojis = [
  {
    value: "angry",
    icon: <FaRegAngry size={32} className="text-yellow-500" />,
  },
  { value: "bad", icon: <FaRegFrown size={32} className="text-yellow-500" /> },
  {
    value: "neutral",
    icon: <FaRegMeh size={32} className="text-yellow-400" />,
  },
  { value: "good", icon: <FaRegSmile size={32} className="text-yellow-500" /> },
  {
    value: "excellent",
    icon: <FaRegGrin size={32} className="text-yellow-400" />,
  },
];

const FeedBack = () => {
  const { register, handleSubmit } = useForm<feedbackForm>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onSubmit = (data: feedbackForm) => {
    console.log(data);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };
  
  return (
    <div className="min-h-screen text-white p-6 max-w-6xl ">
      {/* Header section with consistent padding */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-5 px-4 sm:px-6 py-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">Feedback</h1>
          <p className="text-[#6B6B6B] text-sm sm:text-base font-semibold mt-2">
            Let us know what you think.
          </p>
        </div>
        <Image
          src="/img/Feedback Illustration 1.png"
          alt="Feedback"
          width={300}
          height={100}
          className="w-auto h-auto"
        />
      </div>

      {/* Intro text with consistent padding */}
      <div className="px-4 sm:px-6 mb-8">
        <p>
          💡{" "}
          <span className="text-[#7D8491] text-sm sm:text-base">
            Got an idea to take our platform to the next level? We&apos;re always
            striving to improve, and your feedback is essential. Share your
            thoughts—we&apos;re excited to hear from you!
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-4 sm:px-6">
        {/* Rating Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">
            How Do You Like Our Product?
          </h3>
          <div className="flex space-x-4">
            {emojis.map((emoji) => (
              <label key={emoji.value} className="cursor-pointer">
                <input
                  type="radio"
                  value={emoji.value}
                  {...register("rating", { required: "Rating is required" })}
                  className="hidden"
                />
                <div className="p-2 hover:bg-[#141E32] rounded-lg transition-colors">
                  {emoji.icon}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="w-full lg:w-2/3 ">
          <div className="sm:border sm:border-[#141E32] sm:bg-[#01040F] rounded-lg sm:p-6 ">
            <h3 className="text-lg font-semibold mb-2">Details</h3>
            <p className="text-[#F0798B] text-xs sm:text-sm font-semibold mb-4">
              Do not enter any sensitive information, such as email, phone number,
              ID number, and contact details.
            </p>
            <textarea
              {...register("feedback", { required: "Feedback is required" })}
              className="w-full h-32 p-4 bg-[#0A101F] border border-gray-700 rounded-lg mt-2 text-white"
              placeholder="Enter your feedback. not more than 500 characters"
              maxLength={500}
            ></textarea>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Upload Picture (Optional)</h3>
              <p className="text-[#F0798B] text-xs sm:text-sm font-semibold mb-4">
                Do not upload images that contain sensitive information.
              </p>
              <label className="w-20 h-20 flex items-center justify-center border border-gray-700 bg-gray-800 rounded-lg cursor-pointer relative mb-2">
                <input
                  type="file"
                  accept="image/*"
                  {...register("file")}
                  className="hidden"
                  onChange={handleImageChange}
                />
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="Selected"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <FaPlus size={24} className="text-gray-400" />
                )}
              </label>
              <p className="text-[#7D8491] text-xs sm:text-sm font-semibold mb-4">
                Upload relevant screenshots, in JPG or PNG format, with a file
                size not exceeding 2MB.
              </p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Contact Details (Optional)</h3>
              <input
                type="text"
                {...register("contact")}
                className="w-full p-4 bg-[#0A101F] border border-gray-700 rounded-lg outline-none text-white"
                placeholder="Enter your details"
              />
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <button type="submit" className="bg-white px-10 py-3 rounded-full text-black text-sm font-medium hover:bg-gray-100 transition-colors">
                Submit
              </button>
              <button type="button" className="border border-gray-500 px-8 py-3 rounded-full text-white text-sm font-medium hover:bg-[#141E32] transition-colors">
                Save to Draft
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeedBack;