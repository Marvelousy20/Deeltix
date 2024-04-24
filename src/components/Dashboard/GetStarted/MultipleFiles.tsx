"use client";
import { api } from "@/axios-config";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/restaurant/user";
import { ErrorType, handleError } from "@/lib/handle-error";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosProgressEvent } from "axios";
import { DocumentUpload, GalleryEdit } from "iconsax-react";
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-toastify";
import { Loader } from "@mantine/core";

export const MultipleUpload = () => {
  const [userfile, setUserFile] = useState<File[]>([]);
  const [uploads, setUploads] = useState<string[]>([]);
  const [multiple, setMultiple] = useState([]);
  const [progress, setProgress] = useState({ pc: 0 });
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      setUserFile([...userfile, ...selectedFiles]);
    }
  };

  const handleDelete = (index: number, val: number) => {
    const imageDelete = [...userfile];
    imageDelete.splice(index, val);
    setUserFile(imageDelete);
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
      setMultiple(data?.data?.data?.urls);
      // toast.success("File uploaded successfully");
      // router.push(`/restaurant-profile?uploads=${data?.data?.data.urls}`);
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

  const { restaurantId } = useUser();

  // uploading restaurant profile
  interface IRestaurant {
    pictures: Array<string> | undefined;
  }
  const { mutate: resprofile, isLoading: profileLoading } = useMutation({
    mutationFn: async (data: IRestaurant) =>
      await api.patch(`/api/restaurants/profile/${restaurantId}`, data),
    mutationKey: ["multiple"],
    onSuccess() {
      toast.success("Restaurant images uploaded successfully");
      setUserFile([]);
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-4">
        <section className="flex items-center justify-between">
          <div className="flex flex-col gap-[2px]">
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

            <h4 className="font-medium text-base text-grayHelp">
              Other photos
            </h4>
            <p className="text-sm font-normal text-[#98A2B3]">
              (Scenery, parking lots, bar and the likes)
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
              onClick={() => resprofile({ pictures: multiple })}
              className="text-sm font-medium text-[#574DFF] w-fit py-3 px-4 bg-[#EAECF0] rounded-[24px]"
            >
              {profileLoading ? <Loader size={25} /> : <p> Submit</p>}
            </Button>
          </div>
        </section>

        <div className="">
          {userfile.length === 0 ? (
            <div className="w-[100px] h-[100px] overflow-hidden flex items-center justify-center border  border-spacing-6 border-dashed border-[#574DFF] rounded-sm"></div>
          ) : (
            <div className="">
              <div className="flex items-center gap-4">
                {userfile.map((image, _index) => (
                  <div key={_index} className="relative">
                    <div
                      onClick={() => handleDelete(_index, 1)}
                      className="w-[15px] cursor-pointer absolute right-0 h-[15px] flex items-center justify-center rounded-full bg-white  border-[2px] border-[#EAECF0]"
                    >
                      <X color="#636C71" strokeWidth="1.75px" />
                    </div>
                    <div className="w-[80px] h-[80px] overflow-hidden flex items-center justify-center border border-white rounded-md">
                      <Image
                        src={URL.createObjectURL(image)}
                        width={100}
                        height={100}
                        alt="user upload"
                        className="w-full h-full object-cover overflow-hidden"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <input
            type="file"
            multiple
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
