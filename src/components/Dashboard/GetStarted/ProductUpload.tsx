"use client";
import { DocumentUpload, GalleryEdit } from "iconsax-react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface ProductProps {
  fileName: string | null;
  onFileNameChange: (newFileName: string | null) => void;
}

export const Product = ({ fileName, onFileNameChange }: ProductProps) => {
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
      onFileNameChange(file.name);
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
    <div>
      <h3 className="font-bold text-xl text-grayBlack2 pb-8">Product name</h3>
      <div className="flex flex-col gap-3">
        {!userfile ? (
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
            <Image
              src={URL.createObjectURL(userfile)}
              width={220}
              height={220}
              alt="user upload"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {userfile && (
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
                  {userfile?.name.slice(0, 10)}
                </div>
              </div>

              <div className="text-base font-normal text-grayBlack2">
                {" "}
                {userfile?.size}
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
  );
};
