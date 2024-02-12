"use client";
import React from "react";
import { UserRound, Bookmark, ChevronRight } from "lucide-react";
import { ShoppingBag, Note1, LogoutCurve, Reserve } from "iconsax-react";
import clsx from "clsx";
import { ILoggedinUser } from "@/types";
import Link from "next/link";

export const DashboardReservation = () => {
  const userDetails = [
    {
      name: "My profile",
      para: "Olivia Martins",
      icon: <Reserve color="#565D62" />,
      chevron: <ChevronRight strokeWidth={1.5} size={18} color="#565D62" />,
      route: "/profile",
    },
    {
      name: "My orders",
      para: "Olivia Martins",
      icon: <Reserve color="#565D62" />,
      chevron: <ChevronRight strokeWidth={1.5} size={18} color="#565D62" />,
      route: "/orders",
    },
    {
      name: "My reservations",
      para: "Olivia Martins",
      icon: <Reserve color="#565D62" />,
      chevron: <ChevronRight strokeWidth={1.5} size={18} color="#565D62" />,
      route: "/reservations",
    },
    {
      name: "My bookmarks",
      para: "Olivia Martins",
      icon: <Reserve color="#565D62" />,
      chevron: <ChevronRight strokeWidth={1.5} size={18} color="#565D62" />,
      route: "/bookmarks",
    },
  ];
  return (
    <div className=" bg-[#574DFF0D] rounded-[20px] border border-[#574DFF0D] flex flex-col gap-6 p-5 w-[316px]">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg text-comment">
          Upcoming reservations
        </h3>
        <p className="font-normal text-sm text-[#574DFF]">View all</p>
      </div>
      <div className="flex flex-col gap-4">
        {userDetails.map((items, idx) => (
          <div
            key={idx}
            className="flex items-start justify-between border-b border-transparent pb-4"
          >
            <div className="flex items-start gap-3">
              <div className="">{items.icon}</div>
              <div className="flex flex-col gap-1">
                <h3 className=" text-base font-normal text-grayBlack">
                  {items.name}
                </h3>
                <p>{items.para}</p>
              </div>
            </div>

            <div className="text-[#565D62]">{items.chevron}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
