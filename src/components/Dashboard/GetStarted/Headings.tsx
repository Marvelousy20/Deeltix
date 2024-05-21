"use client";
import Image from "next/image";
import React from "react";
import { useUser } from "@/context/restaurant/user";

export const Headings = ({
  user,
  detail,
}: {
  user: string;
  detail: string;
}) => {
  const { managerName } = useUser();

  return (
    <div className="flex items-center lg:gap-4 lg:px-0">
      <div>
        {/* <Image
          src="/dashboard/restaurant.svg"
          width={50}
          height={50}
          alt="Restaurant logo"
          className="lg:block hidden"
        /> */}
      </div>
      <div className="flex  items-center gap-2">
        <Image
          src="/dashboard/restaurant.svg"
          width={40}
          height={40}
          alt="Restaurant logo"
          className=" block"
        />
        <div className="flex flex-col lg:gap-2 gap-1">
          <h3 className="text-comment text-xl font-bold flex items-center gap-2 whitespace-nowrap w-full">
            Welcome {managerName}
          </h3>
          <p className="font-normal lg:text-base text-sm text-grayInactive">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
};
