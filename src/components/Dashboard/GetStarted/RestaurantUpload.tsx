"use client";
import { DocumentUpload, GalleryEdit } from "iconsax-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { MultipleUpload } from "./MultipleFiles";

export const RestaurantBackground = () => {
  const [userfile, setUserFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUserFile(file);
    }
  };

  const handleDelete = () => {
    setUserFile(null);
    if (inputRef.current) {
      inputRef.current.value === "";
    }
  };

  const upload = () => {
    if (userfile) {
      console.log("file upload:", userfile);
    }
  };
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
          {!userfile ? (
            <div className="w-[600px] h-[200px] overflow-hidden flex items-center justify-center border  border-spacing-6 border-dashed border-[#574DFF] rounded-sm"></div>
          ) : (
            <div className="w-[600px] h-[200px] overflow-hidden flex items-center justify-center border border-white rounded-sm">
              <Image
                src={URL.createObjectURL(userfile)}
                width={600}
                height={200}
                alt="user upload"
                className="w-full h-full object-cover"
              />
            </div>
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
