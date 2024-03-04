"use client";
import { ErrorType, handleError } from "@/lib/handle-error";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Camera } from "iconsax-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { RestaurantProfile } from "./restaurant";
import { Button } from "@/components/ui/button";

export const ProfileUpload = () => {
  const [userfile, setUserFile] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setUserFile(Array.from(file));
    }
  };

  const handleDelete = () => {
    setUserFile([]);
    if (inputRef.current) {
      inputRef.current.value === "";
    }
  };

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (data: FormData) =>
      await axios.post(
        `https://deeltix-nserver.onrender.com/api/utilities/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ),

    mutationKey: ["picture-upload"],

    onSuccess() {
      toast.success("File uploaded successfully");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const restaurantUpload = data?.data?.data?.data?.urls[0];
  // console.log("upload-image: ", data?.data?.data?.data?.urls[0]);
  const handleSubmit = () => {
    try {
      if (userfile) {
        const formData = new FormData();
        userfile.forEach((file) => {
          formData.append("files", file);
          mutate(formData);
        });
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [userfile]);

  return (
    <div className="flex flex-col items-center justify-center">
      <section className="border border-grayBottom rounded-[24px] p-9 w-fit flex flex-col gap-6">
        <div className="flex item-center justify-between">
          <h3 className="text-xl font-bold text-grayBlack2">
            Restaurant details
          </h3>
        </div>
        <div className=" flex items-center gap-4 w-fit h-fit">
          {!userfile.length ? (
            <Image
              src="/food.png"
              width={130}
              height={130}
              alt="user upload"
              className=" object-cover "
            />
          ) : (
            <div>
              {userfile.map((item) => (
                <Image
                  src={URL.createObjectURL(item)}
                  width={130}
                  height={130}
                  alt="user upload"
                  className=" object-cover"
                />
              ))}
            </div>
          )}

          <div
            onClick={handleClick}
            className="flex items-center  gap-2 cursor-pointer w-fit py-1 px-2 border border-grayoutline bg-grayoutline rounded-[40px]"
          >
            <Camera size={16} />
            <p className="text-sm font-normal text-[#121212]">Upload</p>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            ref={inputRef}
            className="hidden"
          />
        </div>
        <RestaurantProfile displayPicture={restaurantUpload} />
      </section>
    </div>
  );
};
