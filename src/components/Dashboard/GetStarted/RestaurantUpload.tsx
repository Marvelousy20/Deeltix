"use client";
import { DocumentUpload, GalleryEdit } from "iconsax-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MultipleUpload } from "./MultipleFiles";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { ProductProvider, useProduct } from "@/context/restaurant/product";

export const RestaurantBackground = () => {
  const [userfile, setUserFile] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { banner, setBanner } = useProduct();
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFile = Array.from(files);
      setUserFile([...userfile, ...selectedFile]);
    }
  };

  const handleDelete = () => {
    setUserFile([]);
    if (inputRef.current) {
      inputRef.current.value === "";
    }
  };

  const upload = () => {
    if (userfile) {
      console.log("file upload:", userfile);
    }
  };

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (data: FormData) =>
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/utilities/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ),

    mutationKey: ["picture-upload"],

    onSuccess({ data }) {
      setBanner(data?.data?.data?.urls[0]);
      toast.success("File uploaded successfully");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

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

  console.log("banner", banner);
  return (
    <section className="flex flex-col gap-[48px]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-5">
          <h3 className="font-bold text-xl text-grayBlack2">
            Restaurant photos
          </h3>
          <section className="flex items-center justify-between">
            <div className="flex flex-col gap-[2px]">
              <h4 className="font-medium text-base text-grayHelp">
                Background photo
              </h4>
              <p className="text-sm font-normal text-[#98A2B3]">
                First thing customers will see
              </p>
            </div>
            <div
              onClick={handleClick}
              className="flex items-center justify-center gap-2 cursor-pointer w-fit py-3 px-4 bg-[#EAECF0] rounded-[24px]"
            >
              <DocumentUpload color="#574DFF" size="16" />
              <p className="text-sm font-medium text-[#574DFF]">Upload</p>
            </div>
          </section>
        </div>
        <div className="flex flex-col gap-3">
          {userfile.length === 0 ? (
            <div className="w-[600px] h-[200px] overflow-hidden flex items-center justify-center border  border-spacing-6 border-dashed border-[#574DFF] rounded-sm"></div>
          ) : (
            <section>
              {userfile.map((image, _idx) => (
                <div
                  key={_idx}
                  className="w-full h-[200px] overflow-hidden flex items-center justify-center border border-white rounded-sm"
                >
                  <Image
                    src={URL.createObjectURL(image)}
                    width={600}
                    height={200}
                    alt="user upload"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </section>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            ref={inputRef}
            className="hidden"
          />
        </div>
      </div>

      {/* multiple upload */}
      <MultipleUpload />
    </section>
  );
};
