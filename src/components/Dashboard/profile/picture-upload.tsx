"use client";
import { Camera, DocumentUpload, GalleryEdit } from "iconsax-react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

export const ProfileUpload = () => {
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
      // console.log("file upload:", userfile);
    }
  };
  return (
    <div>
      <div className="flex items-center gap-3">
        {!userfile ? (
          <Image
            src="/food.png"
            width={150}
            height={150}
            alt="user upload"
            className=" object-cover"
          />
        ) : (
          <Image
            src={URL.createObjectURL(userfile)}
            width={150}
            height={150}
            alt="user upload"
            className=" object-cover"
          />
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
    </div>
  );
};
