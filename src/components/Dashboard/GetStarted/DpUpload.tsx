"use client";
import { DocumentUpload, GalleryEdit } from "iconsax-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MultipleUpload } from "./MultipleFiles";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosProgressEvent } from "axios";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { ProductProvider, useProduct } from "@/context/restaurant/product";
import { api } from "@/axios-config";
import { useUser } from "@/context/restaurant/user";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { Loader } from "@mantine/core";
interface IDp {
    displayPicture: string[];
}
export const DpUpload = ({displayPic}: any) => {
  const [userfile, setUserFile] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dp, setDp] = useState([]);
  const [progress, setProgress] = useState({ pc: 0 });
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

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (data: FormData) =>
      await axios.post(
        `https://deeltix-nserver.onrender.com/api/utilities/upload`,
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

    mutationKey: ["picture-upload"],

    onSuccess({ data }) {
      setDp(data?.data?.data?.urls[0]);
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

  // Uploading background image
  const { restaurantId } = useUser();

  const { mutate: resDp, isLoading: loadbackground } = useMutation({
    mutationFn: async (data: IDp) =>
      await api.patch(`/api/restaurants/profile/${restaurantId}`, data),
    mutationKey: ["background"],
    onSuccess() {
      toast.success("Restaurant background uploaded successfully");
      setUserFile([]);
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  return (
    <section className="flex flex-col gap-[48px]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-5">

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

          <section className="flex justify-between md:w-[600px]">
            <div className="flex flex-col gap-[2px]">
              <h4 className="font-medium text-base text-grayHelp">
                Card Photo
              </h4>
              <p className="text-sm font-normal text-[#98A2B3]">
              This image will compel potential customers to review your page <br/> and menu. 960x720px aspect ratio
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div
                onClick={handleClick}
                className="flex items-center justify-center gap-2 cursor-pointer w-fit py-3 px-4 bg-[#EAECF0] rounded-[24px]"
              >
                <DocumentUpload color="#574DFF" size="16" />
                <p className="text-sm font-medium text-[#574DFF]">Upload</p>
              </div>
              <Button
                onClick={() => resDp({ displayPicture: dp })}
                className="text-sm font-medium text-[#574DFF] w-fit py-3 px-4 bg-[#EAECF0] rounded-[24px]"
              >
                {loadbackground ? <Loader size={25} /> : <p> Submit</p>}
              </Button>
            </div>
          </section>
        </div>
        <div className="flex flex-col gap-3">
          {userfile.length === 0 ? (
            <div className="w-[400px] h-[200px] overflow-hidden flex items-center justify-center border  border-spacing-6 border-dashed border-[#574DFF] rounded-sm">
              <Image src={`${displayPic}`} width={400} height={200} alt="display-picture"/>
            </div>
          ) : (
            <section>
              {userfile.map((image, _idx) => (
                <div
                  key={_idx}
                  className="w-[400px] h-[200px] overflow-hidden flex items-center justify-center border border-white rounded-sm"
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
    </section>
  );
};
