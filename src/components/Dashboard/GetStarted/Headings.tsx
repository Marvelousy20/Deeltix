"use client";
import Image from "next/image";
import React from "react";

export const Headings = () => {
  return (
    <div className="flex items-center gap-4">
      <div>
        <Image
          src="/dashboard/restaurant.svg"
          width={60}
          height={60}
          alt="Restaurant logo"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-comment text-xl font-bold">Welcme Cilantro</h3>
        <p className="font-normal text-base text-grayInactive">
          We are glad to have you onboard. To get exposure you need a proper set
          up.
        </p>
      </div>
    </div>
  );
};
