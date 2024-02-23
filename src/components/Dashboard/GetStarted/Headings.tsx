"use client";
import Image from "next/image";
import React from "react";
import { useUser } from "@/context/user";

export const Headings = ({
  user,
  detail,
}: {
  user: string;
  detail: string;
}) => {
  const { managerName } = useUser();

  return (
    <div className="flex items-center gap-4">
      <div>
        <Image
          src="/dashboard/restaurant.svg"
          width={50}
          height={50}
          alt="Restaurant logo"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-comment text-xl font-bold">
          Welcome {managerName}
        </h3>
        <p className="font-normal text-base text-grayInactive">{detail}</p>
      </div>
    </div>
  );
};
