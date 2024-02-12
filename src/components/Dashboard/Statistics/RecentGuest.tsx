"use client";
import React from "react";
import { UserRound, Bookmark, ChevronRight } from "lucide-react";
import { ShoppingBag, Note1, LogoutCurve } from "iconsax-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export const Guest = () => {
  const userDetails = [
    {
      name: "12th March, 2024",
      para: "Olivia Martins",
      icon: "/olivia.svg",
      chevron: <ChevronRight strokeWidth={1.5} size={18} color="black" />,
      route: "/profile",
    },
    {
      name: "12th March, 2024",
      para: "Olivia Martins",
      icon: "/olivia.svg",
      chevron: <ChevronRight strokeWidth={1.5} size={18} color="black" />,
      route: "/orders",
    },
    {
      name: "12th March, 2024",
      para: "Olivia Martins",
      icon: "/olivia.svg",
      chevron: <ChevronRight strokeWidth={1.5} size={18} color="black" />,
      route: "/reservations",
    },
    {
      name: "12th March, 2024",
      para: "Olivia Martins",
      icon: "/olivia.svg",
      chevron: <ChevronRight strokeWidth={1.5} size={18} color="black" />,
      route: "/bookmarks",
    },
  ];
  return (
    <div className=" rounded-[20px] border border-[#574DFF0D] flex flex-col gap-6 p-5 w-[316px]">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg text-comment">
          Recent Seated Guests
        </h3>
        <p className="font-normal text-sm text-[#574DFF]">View all</p>
      </div>
      <div className="flex flex-col gap-4">
        {userDetails.map((items, idx) => (
          <div key={idx} className="flex gap-3 items-start">
            <div className="">
              <Avatar>
                <AvatarImage src={items?.icon} alt="user-image" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex w-full justify-between border-b border-[#F2F4F7] pb-4">
              <div className="flex flex-col gap-1">
                <h3 className=" text-base font-normal text-grayBlack">
                  {items.para}
                </h3>
                <p>{items.name}</p>
              </div>
              <div className="">{items.chevron}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
