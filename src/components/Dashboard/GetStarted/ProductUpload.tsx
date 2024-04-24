"use client";
import { useProduct } from "@/context/restaurant/product";
import { ProductProvider } from "@/context/restaurant/product";
import { ErrorType, handleError } from "@/lib/handle-error";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosProgressEvent } from "axios";
import { DocumentUpload, GalleryEdit } from "iconsax-react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Router from "next/router";
import React, { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Progress } from "@/components/ui/progress";
export const Product = () => {
  interface product {
    urls: string[];
    fetchProduct: () => void;
  }
  const [progress, setProgress] = useState({ pc: 0 });
  const productContext = createContext<product | undefined>(undefined);
  const { url, setUrl } = useProduct();
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
        `https://deeltix-nserver-1.onrender.com/api/utilities/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent?: AxiosProgressEvent) => {
            const uploadProgress = progressEvent?.progress;
            if (uploadProgress !== undefined) {
              // Use progress here
              setProgress((prevState) => {
                return { ...prevState, pc: uploadProgress * 100 };
              });
            }
          },
        }
      ),

    mutationKey: ["menu-upload"],

    onSuccess({ data }) {
      console.log("menu upload :", data?.data?.data?.urls[0]);
      setUrl(data?.data?.data?.urls[0]);
      // toast.success("File uploaded successfully");
      // Router.push(`/get-started/menu?menu=${data?.data?.data.urls[0]}`);
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  console.log("urls", url);

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
    <div>
      <h3 className="font-bold text-xl text-grayBlack2 pb-8">Product Image</h3>
      <div className="flex items-center gap-2">
        {userfile.length === 0 ? (
          ""
        ) : (
          <Progress
            max={100}
            value={progress.pc}
            indicatorColor="bg-[#574DFF]"
            className="bg-[#EAECF0]"
          />
        )}

        {userfile.length === 0 ? (
          ""
        ) : (
          <p className="text-[#574DFF]">{progress.pc.toFixed(0)}%</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {!userfile.length ? (
          <div className="w-[220px] overflow-hidden flex items-center justify-center h-[220px] border border-spacing-2 border-dashed border-[#574DFF] rounded-[40px]">
            <div
              onClick={handleClick}
              className="flex items-center justify-center gap-2 cursor-pointer w-fit py-3 px-4 bg-[#EAECF0] rounded-[24px]"
            >
              <DocumentUpload color="#574DFF" size="16" />
              <p className="text-sm font-medium text-[#574DFF]">Upload</p>
            </div>
          </div>
        ) : (
          <div className="w-[220px] overflow-hidden flex items-center justify-center h-[220px] border border-white rounded-[40px]">
            {userfile.map((item, idx) => (
              <Image
                key={idx}
                src={URL.createObjectURL(item)}
                width={400}
                height={400}
                alt="user upload"
                className=" object-cover w-full"
              />
            ))}
          </div>
        )}

        {userfile.length ? (
          <section className="border border-[#EAECF0] p-3 rounded-2xl w-[220px] flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Image
                  src="/dashboard/image.svg"
                  width={20}
                  height={20}
                  alt="upload logo"
                />
                <div className=" text-base font-normal text-grayBlack2">
                  {userfile?.map((item) => item?.name.slice(0, 10))}
                </div>
              </div>

              <div className="text-base font-normal text-grayBlack2">
                {" "}
                {userfile?.map((item) => item?.size)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                onClick={handleClick}
                className="h-[35px] cursor-pointer  w-[35px] bg-[#F7F7F7] border border-grayoutline rounded-full flex items-center justify-center"
              >
                <GalleryEdit size="20" />
              </span>
              <span
                onClick={handleDelete}
                className="h-[35px] w-[35px] cursor-pointer bg-[#F7F7F7] border border-grayoutline rounded-full flex items-center justify-center"
              >
                <Trash2 size={20} />
              </span>
            </div>
          </section>
        ) : null}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={inputRef}
          className="hidden"
        />
      </div>
    </div>
  );
};
