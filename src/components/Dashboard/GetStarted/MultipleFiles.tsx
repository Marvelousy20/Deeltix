"use client";
import { DocumentUpload, GalleryEdit } from "iconsax-react";
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

export const MultipleUpload = () => {
  const [userfile, setUserFile] = useState<File[]>([]);
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

  //   const upload = () => {
  //     if (userfile) {
  //       console.log("file upload:", userfile);
  //     }
  //   };
  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-4">
        <section className="flex items-center justify-between">
          <div className="flex flex-col gap-[2px]">
            <h4 className="font-medium text-base text-grayHelp">
              Other photos
            </h4>
            <p className="text-sm font-normal text-[#98A2B3]">
              (Scenery, parking lots, bar and the likes)
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

        <div className="">
          {userfile.length === 0 ? (
            <div className="w-[80px] h-[80px] overflow-hidden flex items-center justify-center border  border-spacing-6 border-dashed border-[#574DFF] rounded-sm"></div>
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
                        width={80}
                        height={80}
                        alt="user upload"
                        className="w-full h-full object-cover overflow-hidden"
                      />
                    </div>
                  </div>
                ))}

                {/* {userfile && (
              <Image
                src={URL.createObjectURL(userfile)}
                width={80}
                height={80}
                alt="user upload"
                className="w-full h-full object-cover"
              />
            )} */}
              </div>
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
    </section>
  );
};

//    <div className="w-[15px] h-[15px] flex items-center justify-center rounded-full bg-red-500  border border-[#EAECF0]">
//   <X color="#636C71" strokeWidth="1.75px" />
// </div>
