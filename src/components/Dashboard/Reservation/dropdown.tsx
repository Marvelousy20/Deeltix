"use client";
import { Edit2, SearchStatus1, Trash } from "iconsax-react";
import React from "react";
import { useRouter } from "next/navigation";

export const ReservationDropDown = ({
  onAccept,
  onReject,
}: {
  onAccept: any;
  onReject: any;
}) => {
  const { push } = useRouter();
  return (
    <section className=" p-[15px] flex flex-col gap-3">
      <div onClick={onAccept} className="cursor-pointer">
        <p className="text-base font-medium text-[#2C2929]">Accept</p>
      </div>
      <div onClick={onReject} className=" cursor-pointer">
        <p className="text-base font-medium text-[#2C2929]">Reject</p>
      </div>
    </section>
  );
};
